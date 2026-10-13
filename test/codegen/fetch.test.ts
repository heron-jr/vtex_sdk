import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { fetchSchemas, listSchemaLock, MAX_SCHEMA_BYTES } from '../../scripts/codegen/fetch.js'
import { gitBlobSha, type SchemaLock } from '../../scripts/codegen/integrity.js'

const REF = '1ca3d11c8dfc9dd17484eabad051d364e767c50d'
const enc = (s: string) => new TextEncoder().encode(s)
const A = enc('{"a":1}\n')
const B = enc('{"b":2}\n')

let root: string
let out: string
beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'vtex-sdk-fetch-'))
  out = join(root, 'schemas')
})
afterEach(() => rmSync(root, { recursive: true, force: true }))

const lockOf = (files: Record<string, Uint8Array>): SchemaLock => ({
  repo: 'vtex/openapi-schemas',
  ref: REF,
  files: Object.fromEntries(Object.entries(files).map(([n, b]) => [n, gitBlobSha(b)])),
})

/** Fake fetch serving `bodies` by decoded file name from the pinned raw URL only. */
function fakeFetch(bodies: Record<string, Uint8Array>) {
  return vi.fn(async (input: string | URL | Request, _init?: RequestInit) => {
    const url = new URL(input instanceof Request ? input.url : String(input))
    const prefix = `/vtex/openapi-schemas/${REF}/`
    if (url.origin !== 'https://raw.githubusercontent.com' || !url.pathname.startsWith(prefix)) {
      return new Response('wrong source', { status: 404 })
    }
    const body = bodies[decodeURIComponent(url.pathname.slice(prefix.length))]
    return body ? new Response(body) : new Response('missing', { status: 404 })
  })
}

describe('fetchSchemas', () => {
  it('downloads from the pinned commit, verifies and writes every locked file', async () => {
    const fetchMock = fakeFetch({ 'A.json': A, 'B & C.json': B })
    const count = await fetchSchemas({ lock: lockOf({ 'A.json': A, 'B & C.json': B }), outDir: out, fetch: fetchMock })
    expect(count).toBe(2)
    expect(readdirSync(out).sort()).toEqual(['A.json', 'B & C.json'])
    expect(readFileSync(join(out, 'A.json'))).toEqual(Buffer.from(A))
    for (const [, init] of fetchMock.mock.calls) {
      expect(init?.redirect).toBe('error')
      expect(init?.signal).toBeInstanceOf(AbortSignal)
      expect((init?.headers as Record<string, string>).Authorization).toBeUndefined()
    }
    expect(readdirSync(root).sort()).toEqual(['schemas']) // no stage or .old left behind
  })

  it('replaces the whole directory, dropping files that are not in the lock', async () => {
    mkdirSync(out)
    writeFileSync(join(out, 'Stale.json'), '{}')
    await fetchSchemas({ lock: lockOf({ 'A.json': A }), outDir: out, fetch: fakeFetch({ 'A.json': A }) })
    expect(readdirSync(out)).toEqual(['A.json'])
  })

  it('leaves the existing directory untouched when any file fails verification', async () => {
    mkdirSync(out)
    writeFileSync(join(out, 'A.json'), 'old')
    const lock = lockOf({ 'A.json': A, 'B.json': B })
    await expect(
      fetchSchemas({ lock, outDir: out, fetch: fakeFetch({ 'A.json': A, 'B.json': enc('tampered') }) }),
    ).rejects.toThrow(/Integrity check failed for B.json/)
    expect(readdirSync(out)).toEqual(['A.json'])
    expect(readFileSync(join(out, 'A.json'), 'utf8')).toBe('old')
    expect(readdirSync(root).sort()).toEqual(['schemas'])
  })

  it('refuses an unsafe name in the lock before fetching anything', async () => {
    const fetchMock = fakeFetch({})
    const lock = { ...lockOf({ 'A.json': A }), files: { '../package.json': gitBlobSha(A) } }
    await expect(fetchSchemas({ lock, outDir: out, fetch: fetchMock })).rejects.toThrow(/unsafe/)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(existsSync(join(root, 'package.json'))).toBe(false)
  })

  it('fails on an HTTP error and on an oversized download', async () => {
    await expect(fetchSchemas({ lock: lockOf({ 'A.json': A }), outDir: out, fetch: fakeFetch({}) })).rejects.toThrow(
      /HTTP 404/,
    )
    const big = vi.fn(async () => new Response('x', { headers: { 'content-length': String(MAX_SCHEMA_BYTES + 1) } }))
    await expect(fetchSchemas({ lock: lockOf({ 'A.json': A }), outDir: out, fetch: big })).rejects.toThrow(/larger than/)
    expect(existsSync(out)).toBe(false)
  })

  it('stops reading a streamed body (no content-length) once it passes the cap', async () => {
    let pulls = 0
    const chunk = new Uint8Array(4 * 1024 * 1024)
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulls++
        controller.enqueue(chunk)
      },
    })
    const streaming = vi.fn(async () => new Response(stream))
    await expect(fetchSchemas({ lock: lockOf({ 'A.json': A }), outDir: out, fetch: streaming })).rejects.toThrow(
      /Download failed for A.json: .*larger than/,
    )
    expect(pulls).toBeLessThan(MAX_SCHEMA_BYTES / chunk.byteLength + 4)
  })

  it('names the file and the cause when the request itself fails', async () => {
    const failing = vi.fn(async () => {
      throw new TypeError('fetch failed', { cause: new Error('unexpected redirect') })
    })
    await expect(fetchSchemas({ lock: lockOf({ 'A.json': A }), outDir: out, fetch: failing })).rejects.toThrow(
      'Download failed for A.json: fetch failed (unexpected redirect)',
    )
  })

  it('validates the whole lock before fetching anything', async () => {
    const fetchMock = fakeFetch({ 'A.json': A })
    const unsafeSecond = { ...lockOf({ 'A.json': A }), files: { 'A.json': gitBlobSha(A), '../x.json': gitBlobSha(A) } }
    await expect(fetchSchemas({ lock: unsafeSecond, outDir: out, fetch: fetchMock })).rejects.toThrow(/unsafe/)
    const empty = { ...lockOf({ 'A.json': A }), files: {} }
    await expect(fetchSchemas({ lock: empty, outDir: out, fetch: fetchMock })).rejects.toThrow(/no files/)
    const caseDup = { ...lockOf({ 'A.json': A }), files: { 'A.json': gitBlobSha(A), 'a.json': gitBlobSha(A) } }
    await expect(fetchSchemas({ lock: caseDup, outDir: out, fetch: fetchMock })).rejects.toThrow(/Duplicate/)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(existsSync(out)).toBe(false)
  })
})

describe('listSchemaLock', () => {
  const listing = (entries: unknown) => vi.fn(async (_input: string | URL | Request, _init?: RequestInit) => Response.json(entries))

  it('builds a sorted lock from the listing, skipping tooling files and directories', async () => {
    const fetchMock = listing([
      { type: 'file', name: 'VTEX - B.json', sha: gitBlobSha(B) },
      { type: 'file', name: 'VTEX - A.json', sha: gitBlobSha(A) },
      { type: 'file', name: 'package.json', sha: gitBlobSha(A) },
      { type: 'dir', name: 'docs', sha: gitBlobSha(A) },
      { type: 'file', name: 'README.md', sha: gitBlobSha(A) },
    ])
    const lock = await listSchemaLock({ ref: REF, fetch: fetchMock, token: 'ghp_SECRET' })
    expect(lock).toEqual({ repo: 'vtex/openapi-schemas', ref: REF, files: { 'VTEX - A.json': gitBlobSha(A), 'VTEX - B.json': gitBlobSha(B) } })
    const [url, init] = fetchMock.mock.calls[0]
    expect(String(url)).toBe(`https://api.github.com/repos/vtex/openapi-schemas/contents?ref=${REF}`)
    expect(init?.redirect).toBe('error')
    expect((init?.headers as Record<string, string>).Authorization).toBe('Bearer ghp_SECRET')
  })

  it.each([
    ['a traversal name', [{ type: 'file', name: '../package.json', sha: gitBlobSha(A) }], /unsafe/],
    ['a bad sha', [{ type: 'file', name: 'A.json', sha: 'nope' }], /blob SHA/],
    ['a non-array body', { message: 'rate limited' }, /not an array/],
    ['names differing only in case', [
      { type: 'file', name: 'A.json', sha: gitBlobSha(A) },
      { type: 'file', name: 'a.json', sha: gitBlobSha(A) },
    ], /Duplicate/],
    ['no schemas', [{ type: 'file', name: 'package.json', sha: gitBlobSha(A) }], /no schema files/],
    ['a truncated listing', Array.from({ length: 1000 }, (_, i) => ({ type: 'file', name: `F${i}.json`, sha: gitBlobSha(A) })), /truncated/],
  ])('rejects %s', async (_label, entries, error) => {
    await expect(listSchemaLock({ ref: REF, fetch: listing(entries) })).rejects.toThrow(error)
  })

  it('requires a full commit SHA', async () => {
    await expect(listSchemaLock({ ref: 'main', fetch: listing([]) })).rejects.toThrow(/ref/)
  })
})
