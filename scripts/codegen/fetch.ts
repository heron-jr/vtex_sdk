import { mkdir, mkdtemp, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import {
  SCHEMA_REPO, assertSchemaFileName, assertSha, gitBlobSha, schemaDownloadUrl, type SchemaLock,
} from './integrity.js'

/** Largest accepted schema; the biggest VTEX schema today is about 3 MB. */
export const MAX_SCHEMA_BYTES = 32 * 1024 * 1024
/** Repository files that are tooling, not API schemas. */
const SKIP = new Set(['config.json', 'package.json', 'package-lock.json', 'rating-config.json'])
/** GitHub's contents API truncates a directory listing at 1,000 entries. */
const MAX_LISTING_ENTRIES = 1000
const USER_AGENT = 'vtex-sdk-codegen'

export interface FetchSchemasOptions {
  lock: SchemaLock
  outDir: string
  fetch?: typeof fetch
  timeoutMs?: number
  log?: (line: string) => void
}

async function readCapped(res: Response, name: string): Promise<Uint8Array> {
  const declared = Number(res.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > MAX_SCHEMA_BYTES) throw new Error(`${name} is larger than ${MAX_SCHEMA_BYTES} bytes`)
  if (!res.body) return new Uint8Array(0)
  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > MAX_SCHEMA_BYTES) {
      await reader.cancel()
      throw new Error(`${name} is larger than ${MAX_SCHEMA_BYTES} bytes`)
    }
    chunks.push(value)
  }
  const out = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    out.set(chunk, offset)
    offset += chunk.byteLength
  }
  return out
}

/**
 * Downloads every schema in the lock from the pinned commit, verifies each git blob SHA, and
 * only then replaces `outDir` as a whole. Any failure leaves `outDir` untouched, and files
 * that are not in the lock never survive a successful run.
 */
export async function fetchSchemas(opts: FetchSchemasOptions): Promise<number> {
  const doFetch = opts.fetch ?? fetch
  const log = opts.log ?? (() => {})
  const target = resolve(opts.outDir)
  const parent = dirname(target)
  await mkdir(parent, { recursive: true })
  const stage = await mkdtemp(join(parent, '.schemas-'))
  let count = 0
  try {
    for (const [name, expected] of Object.entries(opts.lock.files)) {
      const file = assertSchemaFileName(name)
      const res = await doFetch(schemaDownloadUrl(opts.lock.ref, file), {
        headers: { 'User-Agent': USER_AGENT },
        redirect: 'error',
        signal: AbortSignal.timeout(opts.timeoutMs ?? 60_000),
      })
      if (!res.ok) throw new Error(`Download failed for ${file}: HTTP ${res.status}`)
      const content = await readCapped(res, file)
      const actual = gitBlobSha(content)
      if (actual !== expected) throw new Error(`Integrity check failed for ${file}: expected blob ${expected}, got ${actual}`)
      const dest = join(stage, file)
      if (dirname(dest) !== stage) throw new Error(`Refusing unsafe schema file name ${JSON.stringify(file)}`)
      await writeFile(dest, content, { flag: 'wx' })
      log(`verified ${file}`)
      count++
    }
    const old = `${target}.old`
    await rm(old, { recursive: true, force: true })
    let hadPrevious = true
    try {
      await rename(target, old)
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
      hadPrevious = false
    }
    try {
      await rename(stage, target)
    } catch (err) {
      if (hadPrevious) await rename(old, target)
      throw err
    }
    await rm(old, { recursive: true, force: true })
    return count
  } catch (err) {
    await rm(stage, { recursive: true, force: true })
    throw err
  }
}

export interface ListSchemaLockOptions {
  ref: string
  fetch?: typeof fetch
  token?: string
  timeoutMs?: number
}

/**
 * Builds a lock from GitHub's listing of the repository root at `ref` (a full commit SHA).
 * Used only to re-pin: the resulting lock file is a reviewed diff, and downloads trust it alone.
 */
export async function listSchemaLock(opts: ListSchemaLockOptions): Promise<SchemaLock> {
  const ref = assertSha(opts.ref, 'ref')
  const headers: Record<string, string> = { 'User-Agent': USER_AGENT, Accept: 'application/vnd.github+json' }
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`
  const res = await (opts.fetch ?? fetch)(`https://api.github.com/repos/${SCHEMA_REPO}/contents?ref=${ref}`, {
    headers,
    redirect: 'error',
    signal: AbortSignal.timeout(opts.timeoutMs ?? 60_000),
  })
  if (!res.ok) throw new Error(`GitHub listing failed: HTTP ${res.status}`)
  const entries: unknown = await res.json()
  if (!Array.isArray(entries)) throw new Error('GitHub listing is not an array')
  if (entries.length >= MAX_LISTING_ENTRIES) throw new Error('GitHub listing may be truncated (1,000 entries)')
  const files: Record<string, string> = {}
  for (const entry of entries as Array<{ type?: unknown; name?: unknown; sha?: unknown }>) {
    if (entry?.type !== 'file' || typeof entry.name !== 'string' || !entry.name.endsWith('.json')) continue
    if (SKIP.has(entry.name)) continue
    const name = assertSchemaFileName(entry.name)
    files[name] = assertSha(entry.sha, `blob SHA for ${name}`)
  }
  if (Object.keys(files).length === 0) throw new Error('GitHub listing has no schema files')
  const sorted = Object.fromEntries(Object.entries(files).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
  return { repo: SCHEMA_REPO, ref, files: sorted }
}
