import { createHash } from 'node:crypto'

/** The only repository schemas are downloaded from. */
export const SCHEMA_REPO = 'vtex/openapi-schemas'

const SAFE_SCHEMA_NAME = /^[A-Za-z0-9][A-Za-z0-9 &.-]*\.json$/
const COMMIT_SHA = /^[0-9a-f]{40}$/

/** Reviewed list of schema files and their git blob SHAs at one pinned commit. */
export interface SchemaLock {
  repo: string
  ref: string
  files: Record<string, string>
}

/** Git blob SHA-1 of `content`, the value GitHub's contents API reports as `sha`. */
export function gitBlobSha(content: Uint8Array): string {
  return createHash('sha1').update(`blob ${content.byteLength}\0`).update(content).digest('hex')
}

/**
 * A schema file name is a plain `*.json` base name: no separators, no `..`, no leading dot,
 * no control or terminal escape characters. Anything else could write outside schemas/.
 */
export function assertSchemaFileName(name: unknown): string {
  if (typeof name !== 'string' || !SAFE_SCHEMA_NAME.test(name) || name.includes('..')) {
    throw new Error(`Refusing unsafe schema file name ${JSON.stringify(name)}`)
  }
  return name
}

export function assertSha(value: unknown, what: string): string {
  if (typeof value !== 'string' || !COMMIT_SHA.test(value)) {
    throw new Error(`Invalid ${what}: expected 40 lowercase hex characters`)
  }
  return value
}

/** Validates a parsed lock file: the pinned repo, a full commit SHA and a non-empty set of safe names. */
export function parseSchemaLock(json: unknown): SchemaLock {
  const lock = json as Partial<SchemaLock> | null
  if (typeof lock !== 'object' || lock === null) throw new Error('Schema lock must be an object')
  if (lock.repo !== SCHEMA_REPO) throw new Error(`Schema lock must pin ${SCHEMA_REPO}`)
  const ref = assertSha(lock.ref, 'schema lock ref')
  if (typeof lock.files !== 'object' || lock.files === null || Array.isArray(lock.files)) {
    throw new Error('Schema lock files must be an object of name to blob SHA')
  }
  const files: Record<string, string> = {}
  const seen = new Set<string>()
  for (const [name, sha] of Object.entries(lock.files)) {
    const key = assertSchemaFileName(name).toLowerCase()
    // Case variants collide on Windows and macOS file systems.
    if (seen.has(key)) throw new Error(`Duplicate schema file name ${JSON.stringify(name)} (names must be unique ignoring case)`)
    seen.add(key)
    files[name] = assertSha(sha, `blob SHA for ${name}`)
  }
  if (Object.keys(files).length === 0) throw new Error('Schema lock lists no files')
  return { repo: SCHEMA_REPO, ref, files }
}

/** Download URL built from the pinned commit; the GitHub listing never chooses where bytes come from. */
export function schemaDownloadUrl(ref: string, name: string): URL {
  return new URL(
    `https://raw.githubusercontent.com/${SCHEMA_REPO}/${assertSha(ref, 'ref')}/${encodeURIComponent(assertSchemaFileName(name))}`,
  )
}
