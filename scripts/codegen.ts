/**
 * Codegen driver.
 *
 * Reads every OpenAPI document in `schemas/*.json` and emits, per API:
 *   - `src/generated/<slug>/types.ts`  — every `components.schemas` entry as an exported type.
 *   - `src/generated/<slug>/index.ts`  — a class per tag (namespace), grouping generated
 *     methods, aggregated into one exported `<Api>` class constructed from a `VtexHttpClient`.
 * plus `src/generated/index.ts` exporting `class RawNamespaces` that instantiates every
 * per-API class from a single `VtexHttpClient`.
 *
 * This file consumes the (already validated) `naming`, `types`, and `operation` codegen
 * modules — it does not reimplement their logic. It DOES handle integration concerns those
 * modules intentionally leave to the caller:
 *
 *  1. Wiring `resolveRef` so `$ref` query/header parameters resolve against each schema
 *     file's own `components.parameters`.
 *  2. Deduping method names *per namespace* by generating each method directly with its
 *     final, deduped name (via `generateMethod`'s `name` override) rather than
 *     string-patching already-generated code.
 *  3. Guaranteeing every generated identifier that matters for `tsc` is unique:
 *       - the per-API directory slug (two schema titles can be identical — see the
 *         "Marketplace Protocol" quartet below),
 *       - the per-API exported class name (derived from the slug, so it inherits the
 *         slug's uniqueness — this also prevents duplicate import bindings in the
 *         top-level aggregator),
 *       - the top-level `RawNamespaces` field name for each API.
 *  4. Making every bare type name emitted by `schemaToType`/`generateMethod` resolve:
 *       - sanitizing `components.schemas` keys that aren't valid TS identifiers
 *         (real examples in this dataset: "1.RetrieveTokenRequest", "file-data",
 *         "Success-Manifest", "403Expiredtoken"),
 *       - emitting `export type X = unknown` fallbacks for any referenced name that
 *         doesn't correspond to a declared schema (dangling/nested `$ref`s), and
 *       - importing every declared (or fallback) type name into that API's `index.ts` as
 *         a named `import type`, since `schemaToType` embeds bare identifiers rather than
 *         a namespaced access.
 */
import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { methodName, dedupe, tagToNamespace } from './codegen/naming.js'
import { schemaToType } from './codegen/types.js'
import { generateMethod } from './codegen/operation.js'

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const
type HttpMethod = (typeof HTTP_METHODS)[number]

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
 * (from another schema's `$ref`, or from an operation's parameter/body/response schema)
 * that doesn't match a declared key is treated as dangling and assigned a name lazily,
 * on first sight, from the same collision-free pool.
 */
function makeRefResolver(schemas: Record<string, unknown>) {
  const used = new Set<string>()
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
}

async function main() {
  const dir = 'schemas'
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json')).sort()
  await rm('src/generated', { recursive: true, force: true })
  await mkdir('src/generated', { recursive: true })

  const usedSlugs = new Set<string>()
  const usedApiClasses = new Set<string>()
  const usedTopNamespaces = new Set<string>()

  const rawImports: string[] = []
  const rawFields: { ns: string; cls: string }[] = []

  let totalMethods = 0
  let totalNamespaces = 0

  for (const file of files) {
    const doc = JSON.parse(await readFile(join(dir, file), 'utf8'))
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
    const { refName, declared, dangling } = makeRefResolver(schemas)
    const resolveRef = (ref: string) => {
      const name = ref.split('/').pop()!
      return parameters[name]
    }

    // --- Group operations by namespace (first tag) --------------------------------
    const groups = new Map<string, OpEntry[]>()
    for (const [path, item] of Object.entries<any>(doc.paths ?? {})) {
      for (const httpMethod of HTTP_METHODS) {
        const op = item[httpMethod]
        if (!op) continue
        const tag = (op.tags && op.tags[0]) || title
        const ns = tagToNamespace(tag)
        if (!groups.has(ns)) groups.set(ns, [])
        groups.get(ns)!.push({ httpMethod, path, op })
      }
    }

    // --- Emit one class per namespace, deduping method names within it ------------
    const nsClasses: string[] = []
    const nsFieldNames: string[] = []
    for (const [ns, entries] of groups) {
      const rawNames = entries.map((e) => methodName(e.op, e.httpMethod, e.path))
      const finalNames = dedupe(rawNames)
      const methodsCode = entries.map((e, i) =>
        generateMethod({
          httpMethod: e.httpMethod,
          path: e.path,
          op: e.op,
          refName,
          resolveRef,
          name: finalNames[i],
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
    totalNamespaces += groups.size

    // --- types.ts: declared schemas + fallback `unknown` aliases for dangling refs -
    const typeLines: string[] = []
    for (const [raw, schema] of Object.entries(schemas)) {
      typeLines.push(`export type ${declared.get(raw)} = ${schemaToType(schema, refName)}\n`)
    }
    for (const [, finalName] of dangling) {
      typeLines.push(`export type ${finalName} = unknown\n`)
    }
    await mkdir(join('src/generated', slug), { recursive: true })
    await writeFile(join('src/generated', slug, 'types.ts'), typeLines.join('\n') || 'export {}\n')

    // --- index.ts: namespace classes + aggregating <Api> class ---------------------
    const allTypeNames = [...new Set([...declared.values(), ...dangling.values()])]
    const typeImport = allTypeNames.length
      ? `import type { ${allTypeNames.join(', ')} } from './types.js'\n`
      : ''

    const indexSource = [
      `import type { VtexHttpClient } from '../../core/http.js'`,
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

    await writeFile(join('src/generated', slug, 'index.ts'), indexSource)

    rawImports.push(`import { ${apiClass} } from './${slug}/index.js'`)
    rawFields.push({ ns: topNs, cls: apiClass })
  }

  // --- Top-level RawNamespaces aggregator ---------------------------------------
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
  await writeFile('src/generated/index.ts', aggregator)

  console.log(
    `Generated ${files.length} API namespaces into src/generated/ ` +
      `(${totalNamespaces} tag-namespaces, ${totalMethods} methods)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
