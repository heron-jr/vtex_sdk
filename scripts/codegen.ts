/**
 * Codegen driver.
 *
 * Reads every OpenAPI document in `schemas/*.json` (downloaded by `npm run fetch-schemas`;
 * not committed), after checking that the set and every git blob SHA match
 * `scripts/schemas.lock.json`, and emits, per API:
 *   - `src/generated/<slug>/types.ts`  — every `components.schemas` entry as an exported type.
 *   - `src/generated/<slug>/index.ts`  — a class per tag (namespace), grouping generated
 *     methods, aggregated into one exported `<Api>` class constructed from a `VtexHttpClient`.
 *     Only emitted for APIs with at least one operation served by an allowlisted VTEX host.
 * plus `src/generated/index.ts` exporting `class RawNamespaces`, and
 * `src/generated/types-index.ts` exporting one type namespace per API.
 *
 * Integration concerns handled here:
 *
 *  1. Wiring `resolveRef` so `$ref` query/header parameters resolve against each schema
 *     file's own `components.parameters`.
 *  2. Deduping method names *per namespace* over ALL operations (including excluded ones),
 *     so excluding an operation never renames another.
 *  3. Guaranteeing every generated identifier that matters for `tsc` is unique (slugs,
 *     API classes, top-level namespaces), computed for every file in a fixed order so
 *     names stay stable when an API is excluded.
 *  4. Making every bare type name emitted by `schemaToType`/`generateMethod` resolve
 *     (sanitized keys, `unknown` fallbacks for dangling refs, named type imports).
 *  5. Applying targeted schema overrides (`codegen/overrides.ts`) before anything else.
 *  6. Choosing each operation's server (`codegen/servers.ts`). Operations without an
 *     allowlisted VTEX server are excluded from `raw.*` and reported.
 */
import { existsSync } from 'node:fs'
import { readdir, readFile, mkdir, writeFile, rename, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { methodName, dedupe, tagToNamespace } from './codegen/naming.js'
import { schemaToType } from './codegen/types.js'
import { generateMethod } from './codegen/operation.js'
import { applyOverrides, OVERRIDES } from './codegen/overrides.js'
import { pickServer, trimBasePathOverlap } from './codegen/servers.js'
import { gitBlobSha, parseSchemaLock } from './codegen/integrity.js'

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const
type HttpMethod = (typeof HTTP_METHODS)[number]

/**
 * Names schema types must not take: identifiers imported by every generated index.ts, and
 * globals used in generated signatures (a schema type named `FormData` would silently retype
 * multipart bodies). The API's own class name is reserved per file.
 */
const RESERVED_TYPE_NAMES = [
  'VtexHttpClient', 'CallOptions',
  'Promise', 'Record', 'FormData', 'URLSearchParams', 'Blob', 'ArrayBuffer', 'Uint8Array',
]

// ---------------------------------------------------------------------------
// Identifier helpers
// ---------------------------------------------------------------------------

/** Directory-safe slug: lowercase, non-alnum runs collapsed to single hyphens. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Splits on runs of non-alphanumeric characters, dropping empties. */
function identifierParts(input: string): string[] {
  return input
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

/** PascalCase identifier, safe for a leading digit. Already-clean names pass through unchanged. */
function pascalCase(input: string): string {
  const parts = identifierParts(input)
  if (parts.length === 0) return 'X'
  const result = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  return /^[0-9]/.test(result) ? `_${result}` : result
}

/**
 * Sanitizes a `components.schemas` key (or any `$ref` last-segment) into a valid TS
 * type identifier. Idempotent on names that are already clean (e.g. "Order" -> "Order").
 */
function sanitizeTypeName(raw: string): string {
  return pascalCase(raw)
}

/** First candidate not already in `used`; if all given candidates collide, numeric-suffix the first. */
function uniqueName(candidates: string[], used: Set<string>): string {
  for (const c of candidates) {
    if (c && !used.has(c)) {
      used.add(c)
      return c
    }
  }
  const base = candidates[0] || 'x'
  let n = 2
  let candidate = `${base}${n}`
  while (used.has(candidate)) {
    n += 1
    candidate = `${base}${n}`
  }
  used.add(candidate)
  return candidate
}

/** Per-API class name, derived from the (already-unique) slug so it inherits that uniqueness. */
function apiClassName(slug: string): string {
  const base = pascalCase(slug)
  return /Api$/.test(base) ? base : `${base}Api`
}

// ---------------------------------------------------------------------------
// Per-file $ref resolution (type names + parameter refs)
// ---------------------------------------------------------------------------

/**
 * Builds a `refName` resolver scoped to one schema document: declared `components.schemas`
 * keys are sanitized + deduped up front (in declaration order); any ref seen later
 * that doesn't match a declared key is treated as dangling and assigned a name lazily,
 * on first sight, from the same collision-free pool.
 */
function makeRefResolver(schemas: Record<string, unknown>, extraReserved: string[]) {
  const used = new Set<string>([...RESERVED_TYPE_NAMES, ...extraReserved])
  const declared = new Map<string, string>() // raw schema key -> final type name
  for (const raw of Object.keys(schemas)) {
    declared.set(raw, uniqueName([sanitizeTypeName(raw)], used))
  }
  const dangling = new Map<string, string>() // raw ref last-segment -> final type name

  const refName = (ref: string): string => {
    const raw = ref.split('/').pop()!
    const known = declared.get(raw)
    if (known) return known
    const existing = dangling.get(raw)
    if (existing) return existing
    const assigned = uniqueName([sanitizeTypeName(raw)], used)
    dangling.set(raw, assigned)
    return assigned
  }

  return { refName, declared, dangling }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

interface OpEntry {
  httpMethod: HttpMethod
  path: string
  op: any
  /** undefined when the operation has no allowlisted VTEX server (excluded from raw). */
  server: string | undefined
}

async function main() {
  const dir = 'schemas'
  if (!existsSync(dir)) {
    throw new Error('schemas/ is missing: run `npm run fetch-schemas` first (schemas are not committed).')
  }
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json')).sort()
  // Generate only from exactly the reviewed, locked schemas: no stale, extra or edited files.
  let lockJson: unknown
  try {
    lockJson = JSON.parse(await readFile('scripts/schemas.lock.json', 'utf8'))
  } catch (err) {
    throw new Error(`scripts/schemas.lock.json is unreadable: ${err instanceof Error ? err.message : String(err)}`, {
      cause: err,
    })
  }
  const lock = parseSchemaLock(lockJson)
  const locked = Object.keys(lock.files).sort()
  if (files.join('\n') !== locked.join('\n')) {
    throw new Error('schemas/ does not match scripts/schemas.lock.json: run `npm run fetch-schemas`.')
  }
  const orphanOverrides = OVERRIDES.filter((o) => !Object.hasOwn(lock.files, o.file))
  if (orphanOverrides.length > 0) {
    throw new Error(
      `Schema overrides target files that are not in the lock: ${orphanOverrides.map((o) => `${o.file} ${o.pointer}`).join('; ')}`,
    )
  }
  const contents = new Map<string, Buffer>()
  for (const file of files) {
    const bytes = await readFile(join(dir, file))
    if (gitBlobSha(bytes) !== lock.files[file]) {
      throw new Error(`schemas/${file} differs from the locked blob: run \`npm run fetch-schemas\`.`)
    }
    contents.set(file, bytes)
  }
  // Everything is built in memory; src/generated is only replaced once every check has passed.
  const outputs = new Map<string, string>() // path relative to src/generated -> content

  const usedSlugs = new Set<string>()
  const usedApiClasses = new Set<string>()
  const usedTopNamespaces = new Set<string>(['constructor'])

  const rawImports: string[] = []
  const rawFields: { ns: string; cls: string }[] = []
  const typeExports: string[] = []
  const excludedOps: string[] = []
  const excludedApis: string[] = []

  let totalMethods = 0
  let totalNamespaces = 0
  let overridesApplied = 0
  let basePathsTrimmed = 0

  for (const file of files) {
    try {
      const doc = JSON.parse(contents.get(file)!.toString('utf8'))
      overridesApplied += applyOverrides(file, doc)
      const title: string = doc.info?.title ?? file.replace(/\.json$/, '')
      // Disambiguation source for collisions: several files legitimately share an
      // identical `info.title` (e.g. four "Marketplace Protocol" documents that only
      // differ by filename/description), so fall back to the filename when needed.
      const fileBase = file.replace(/\.json$/, '').replace(/^VTEX\s*-\s*/, '')

      const slug = uniqueName([slugify(title), slugify(fileBase)], usedSlugs)
      const apiClass = uniqueName([apiClassName(slug)], usedApiClasses)
      const topNs = uniqueName([tagToNamespace(title), tagToNamespace(fileBase)], usedTopNamespaces)

      const schemas: Record<string, any> = doc.components?.schemas ?? {}
      const parameters: Record<string, any> = doc.components?.parameters ?? {}
      const { refName, declared, dangling } = makeRefResolver(schemas, [apiClass])
      const resolveRef = (ref: string) => {
        const name = ref.split('/').pop()!
        return parameters[name]
      }

      // --- Group operations by namespace (first tag), choosing each operation's server ---
      const groups = new Map<string, OpEntry[]>()
      for (const [path, item] of Object.entries<any>(doc.paths ?? {})) {
        for (const httpMethod of HTTP_METHODS) {
          const op = item[httpMethod]
          if (!op) continue
          const picked = pickServer([op.servers, item.servers, doc.servers])
          let server: string | undefined
          if (picked === undefined) {
            excludedOps.push(`${fileBase}: ${httpMethod.toUpperCase()} ${path}`)
          } else {
            server = trimBasePathOverlap(picked, path)
            if (server !== picked) basePathsTrimmed++
          }
          const tag = (op.tags && op.tags[0]) || title
          const ns = tagToNamespace(tag)
          // A `constructor` field would be emitted as `readonly constructor: ...`, which doesn't compile.
          if (ns === 'constructor') throw new Error(`Refusing the namespace name "constructor" (tag ${JSON.stringify(tag)})`)
          if (!groups.has(ns)) groups.set(ns, [])
          groups.get(ns)!.push({ httpMethod, path, op, server })
        }
      }

      // --- Emit one class per namespace; names are deduped over all operations ---------
      const nsClasses: string[] = []
      const nsFieldNames: string[] = []
      for (const [ns, entries] of groups) {
        const finalNames = dedupe(entries.map((e) => methodName(e.op, e.httpMethod, e.path)))
        const included = entries
          .map((e, i) => ({ ...e, name: finalNames[i] }))
          .filter((e): e is OpEntry & { name: string; server: string } => e.server !== undefined)
        if (included.length === 0) continue
        const methodsCode = included.map((e) =>
          generateMethod({
            httpMethod: e.httpMethod,
            path: e.path,
            op: e.op,
            refName,
            resolveRef,
            name: e.name,
            server: e.server,
          }),
        )
        totalMethods += methodsCode.length
        const className = `${apiClass}_${ns}`
        nsClasses.push(
          [
            `class ${className} {`,
            `  constructor(private http: VtexHttpClient) {}`,
            ``,
            methodsCode.join('\n\n'),
            `}`,
          ].join('\n'),
        )
        nsFieldNames.push(ns)
      }
      totalNamespaces += nsFieldNames.length

      // --- types.ts: declared schemas + fallback `unknown` aliases for dangling refs -
      const typeLines: string[] = []
      for (const [raw, schema] of Object.entries(schemas)) {
        typeLines.push(`export type ${declared.get(raw)} = ${schemaToType(schema, refName)}\n`)
      }
      for (const [, finalName] of dangling) {
        typeLines.push(`export type ${finalName} = unknown\n`)
      }
      outputs.set(`${slug}/types.ts`, typeLines.join('\n') || 'export {}\n')
      typeExports.push(`export type * as ${apiClass}Types from './${slug}/types.js'`)

      if (nsClasses.length === 0) {
        excludedApis.push(fileBase)
        continue
      }

      // --- index.ts: namespace classes + aggregating <Api> class ---------------------
      const allTypeNames = [...new Set([...declared.values(), ...dangling.values()])]
      const typeImport = allTypeNames.length
        ? `import type { ${allTypeNames.join(', ')} } from './types.js'\n`
        : ''
      const usesPathParams = nsClasses.some((c) => c.includes('encodePathParam('))

      const indexSource = [
        `import type { VtexHttpClient } from '../../core/http.js'`,
        `import type { CallOptions } from '../../core/types.js'`,
        `import { ${usesPathParams ? 'encodePathParam, withCall' : 'withCall'} } from '../../core/call.js'`,
        typeImport ? typeImport.trimEnd() : undefined,
        ``,
        ...nsClasses,
        ``,
        `export class ${apiClass} {`,
        ...nsFieldNames.map((ns) => `  readonly ${ns}: ${apiClass}_${ns}`),
        `  constructor(http: VtexHttpClient) {`,
        ...nsFieldNames.map((ns) => `    this.${ns} = new ${apiClass}_${ns}(http)`),
        `  }`,
        `}`,
        ``,
      ]
        .filter((line): line is string => line !== undefined)
        .join('\n')

      outputs.set(`${slug}/index.ts`, indexSource)

      rawImports.push(`import { ${apiClass} } from './${slug}/index.js'`)
      rawFields.push({ ns: topNs, cls: apiClass })
    } catch (err) {
      // Name the schema file, so a failure after a re-pin points at its source.
      throw new Error(`${file}: ${err instanceof Error ? err.message : String(err)}`, { cause: err })
    }
  }

  if (overridesApplied !== OVERRIDES.length) {
    throw new Error(`Expected ${OVERRIDES.length} schema overrides to apply, applied ${overridesApplied}`)
  }

  // --- Top-level RawNamespaces aggregator + type namespaces ----------------------
  const aggregator = [
    `import type { VtexHttpClient } from '../core/http.js'`,
    ...rawImports,
    ``,
    `export class RawNamespaces {`,
    ...rawFields.map(({ ns, cls }) => `  readonly ${ns}: ${cls}`),
    `  constructor(http: VtexHttpClient) {`,
    ...rawFields.map(({ ns, cls }) => `    this.${ns} = new ${cls}(http)`),
    `  }`,
    `}`,
    ``,
  ].join('\n')
  outputs.set('index.ts', aggregator)
  outputs.set('types-index.ts', `${typeExports.join('\n')}\n`)

  // Write a sibling directory first and swap it in, so a write error can't leave a partial tree.
  const staging = 'src/generated.tmp'
  await rm(staging, { recursive: true, force: true })
  for (const [path, content] of outputs) {
    const target = join(staging, path)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, content)
  }
  await rm('src/generated', { recursive: true, force: true })
  await rename(staging, 'src/generated')

  // Operations dropped from APIs that are otherwise generated; a re-pin that changes this shows up here.
  const partial = excludedOps.filter((op) => !excludedApis.some((api) => op.startsWith(`${api}: `)))

  console.log(
    `Generated ${rawFields.length} raw APIs (${totalNamespaces} namespaces, ${totalMethods} methods) ` +
      `and ${files.length} type modules into src/generated/.\n` +
      `Excluded ${excludedOps.length} operations served by non-VTEX or variable hosts ` +
      `(${excludedApis.length} APIs in full: ${excludedApis.join(', ')}).\n` +
      `Applied ${overridesApplied} schema overrides; trimmed ${basePathsTrimmed} overlapping base paths.\n` +
      `Excluded from included APIs: ${partial.join('; ') || 'none'}.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
