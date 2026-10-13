import { mkdir, mkdtemp, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import {
  SCHEMA_REPO, assertSchemaFileName, assertSha, gitBlobSha, parseSchemaLock, schemaDownloadUrl, type SchemaLock,
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

/** Message plus its cause: undici reports DNS, TLS and redirect failures as "fetch failed" with a cause. */
function describe(err: unknown): string {
  if (!(err instanceof Error)) return String(err)
  return err.cause instanceof Error ? `${err.message} (${err.cause.message})` : err.message
}

async function readCapped(res: Response, name: string): Promise<Uint8Array> {
  const declared = Number(res.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > MAX_SCHEMA_BYTES) {
    await res.body?.cancel()
    throw new Error(`${name} is larger than ${MAX_SCHEMA_BYTES} bytes`)
  }
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
  // Validate the whole lock up front, so an unsafe name is refused before anything is fetched.
  const lock = parseSchemaLock(opts.lock)
  const doFetch = opts.fetch ?? fetch
  const log = opts.log ?? (() => {})
  const target = resolve(opts.outDir)
  const parent = dirname(target)
  await mkdir(parent, { recursive: true })
  const stage = await mkdtemp(join(parent, '.schemas-'))
  let count = 0
  try {
    for (const [file, expected] of Object.entries(lock.files)) {
      let content: Uint8Array
      try {
        const res = await doFetch(schemaDownloadUrl(lock.ref, file), {
          headers: { 'User-Agent': USER_AGENT },
          redirect: 'error',
          signal: AbortSignal.timeout(opts.timeoutMs ?? 60_000),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        content = await readCapped(res, file)
      } catch (err) {
        throw new Error(`Download failed for ${file}: ${describe(err)}`, { cause: err })
      }
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
  let entries: unknown
  try {
    const res = await (opts.fetch ?? fetch)(`https://api.github.com/repos/${SCHEMA_REPO}/contents?ref=${ref}`, {
      headers,
      redirect: 'error',
      signal: AbortSignal.timeout(opts.timeoutMs ?? 60_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    entries = await res.json()
  } catch (err) {
    throw new Error(`GitHub listing failed: ${describe(err)}`, { cause: err })
  }
  if (!Array.isArray(entries)) throw new Error('GitHub listing is not an array')
  if (entries.length >= MAX_LISTING_ENTRIES) throw new Error('GitHub listing may be truncated (1,000 entries)')
  const files: Record<string, string> = {}
  for (const entry of entries as Array<{ type?: unknown; name?: unknown; sha?: unknown }>) {
    if (entry?.type !== 'file' || typeof entry.name !== 'string' || !entry.name.endsWith('.json')) continue
    if (SKIP.has(entry.name)) continue
    const name = assertSchemaFileName(entry.name)
    if (Object.keys(files).some((n) => n.toLowerCase() === name.toLowerCase())) {
      throw new Error(`Duplicate schema file name ${JSON.stringify(name)} (names must be unique ignoring case)`)
    }
    files[name] = assertSha(entry.sha, `blob SHA for ${name}`)
  }
  if (Object.keys(files).length === 0) throw new Error('GitHub listing has no schema files')
  const sorted = Object.fromEntries(Object.entries(files).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
  return { repo: SCHEMA_REPO, ref, files: sorted }
}
