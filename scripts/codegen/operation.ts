import { methodName } from './naming.js'
import { schemaToType } from './types.js'

interface Ctx {
  httpMethod: string
  path: string
  op: any
  refName: (ref: string) => string
  /** Resolve a `$ref` (e.g. "#/components/parameters/X") to the referenced parameter object. */
  resolveRef?: (ref: string) => any
}

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/

function isSafeIdent(name: string): boolean {
  return IDENT_RE.test(name)
}

/** Single-quoted string literal, escaping backslashes/quotes as needed. */
function quoteString(name: string): string {
  return `'${name.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

/** Key for an object type literal / value, quoting it when it isn't a valid identifier. */
function quoteKey(name: string): string {
  return isSafeIdent(name) ? name : quoteString(name)
}

/** Expression to read `name` off the `params` object, using bracket access when needed. */
function accessExpr(name: string): string {
  return isSafeIdent(name) ? `params.${name}` : `params[${quoteString(name)}]`
}

function jsonContent(container: any): any | undefined {
  const content = container?.content
  if (!content) return undefined
  const key = Object.keys(content).find((k) => k.startsWith('application/json'))
  return key ? content[key].schema : undefined
}

function successSchema(op: any): any | undefined {
  const responses = op.responses ?? {}
  const code = Object.keys(responses).find((c) => c.startsWith('2')) // 200/201/202/204
  if (!code) return undefined
  return jsonContent(responses[code])
}

/** Extract the `{name}` placeholders from a path template, in order of first appearance. */
function pathPlaceholders(path: string): string[] {
  const names: string[] = []
  const seen = new Set<string>()
  for (const m of path.matchAll(/\{([^}]+)\}/g)) {
    const n = m[1]
    if (!seen.has(n)) {
      seen.add(n)
      names.push(n)
    }
  }
  return names
}

export function generateMethod(ctx: Ctx): string {
  const { httpMethod, path, op, refName, resolveRef } = ctx
  const name = methodName(op, httpMethod, path)
  const rawParams: any[] = op.parameters ?? []

  // Resolve `$ref` parameter entries (best-effort; unresolved/no-resolver entries are dropped —
  // path placeholders are covered independently via the path template itself).
  const resolvedParams: any[] = []
  for (const p of rawParams) {
    if (p && typeof p === 'object' && typeof p.$ref === 'string') {
      const resolved = resolveRef ? resolveRef(p.$ref) : undefined
      if (resolved) resolvedParams.push(resolved)
    } else if (p) {
      resolvedParams.push(p)
    }
  }

  const inlinePathParams = new Map<string, any>()
  const queryParams: any[] = []
  const seenQueryNames = new Set<string>()
  for (const p of resolvedParams) {
    if (!p || !p.name) continue
    if (p.in === 'path') {
      inlinePathParams.set(p.name, p)
    } else if (p.in === 'query' && !seenQueryNames.has(p.name)) {
      seenQueryNames.add(p.name)
      queryParams.push(p)
    }
  }

  // The path template is the source of truth for what params the URL needs.
  const placeholders = pathPlaceholders(path)

  const bodySchema = jsonContent(op.requestBody)
  const retSchema = successSchema(op)
  const retType = retSchema ? schemaToType(retSchema, refName) : 'unknown'

  // Options-object type. Build with a used-keys set so path/query/body never collide.
  const usedKeys = new Set<string>()
  const optionFields: string[] = []

  for (const n of placeholders) {
    usedKeys.add(n)
    const inline = inlinePathParams.get(n)
    const type = inline ? schemaToType(inline.schema ?? {}, refName) : 'string | number'
    optionFields.push(`  ${quoteKey(n)}: ${type}`)
  }

  for (const p of queryParams) {
    if (usedKeys.has(p.name)) continue
    usedKeys.add(p.name)
    const opt = p.required ? '' : '?'
    optionFields.push(`  ${quoteKey(p.name)}${opt}: ${schemaToType(p.schema ?? {}, refName)}`)
  }

  if (bodySchema && !usedKeys.has('body')) {
    usedKeys.add('body')
    optionFields.push(`  body: ${schemaToType(bodySchema, refName)}`)
  }

  const optionsType = optionFields.length ? `{\n${optionFields.join('\n')}\n}` : 'Record<string, never>'

  // Interpolated path
  const tsPath = path.replace(/\{([^}]+)\}/g, (_m, g) => `\${${accessExpr(g)}}`)

  const queryObj = queryParams.length
    ? `{ ${queryParams.map((p) => `${quoteString(p.name)}: ${accessExpr(p.name)}`).join(', ')} }`
    : undefined

  const callFields = [
    `method: '${httpMethod.toUpperCase()}'`,
    `path: \`${tsPath}\``,
  ]
  if (queryObj) callFields.push(`query: ${queryObj}`)
  if (bodySchema) callFields.push(`body: params.body`)

  return [
    `  ${name}(params: ${optionsType}): Promise<${retType}> {`,
    `    return this.http.request<${retType}>({ ${callFields.join(', ')} })`,
    `  }`,
  ].join('\n')
}
