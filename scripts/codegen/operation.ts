import { methodName } from './naming.js'
import { schemaToType } from './types.js'
import { DEFAULT_SERVER } from '../../src/core/url.js'

interface Ctx {
  httpMethod: string
  path: string
  op: any
  refName: (ref: string) => string
  /** Resolve a `$ref` (e.g. "#/components/parameters/X") to the referenced parameter object. */
  resolveRef?: (ref: string) => any
  /**
   * Override the computed method name (e.g. after a caller has run per-namespace
   * `dedupe()` across a batch of operations). When omitted, falls back to
   * `methodName(op, httpMethod, path)`.
   */
  name?: string
  /** Normalized server template from `pickServer()`; omit (or pass DEFAULT_SERVER) for the account host. */
  server?: string
}

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/
const SAFE_PATH_RE = /^\/[A-Za-z0-9\-._~!&'()*+,;=:@%/{}]*$/
const SAFE_PLACEHOLDER_RE = /^[A-Za-z0-9_.-]+$/
/** Headers managed by the SDK or by fetch; schema-declared params with these names are not exposed. */
const MANAGED_HEADERS = new Set([
  'accept', 'content-type', 'content-length', 'host',
  'x-vtex-api-appkey', 'x-vtex-api-apptoken', 'vtexidclientautcookie', 'cookie', 'authorization',
])

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

function isJsonMediaType(type: string): boolean {
  return /^application\/(?:[a-z0-9.!#$&^_-]+\+)?json(?:\s*;|\s*$)/i.test(type)
}

function jsonSchemaOf(container: any): any | undefined {
  const content = container?.content
  if (!content) return undefined
  const types = Object.keys(content)
  const key = types.find((t) => t.startsWith('application/json')) ?? types.find(isJsonMediaType)
  return key ? content[key].schema : undefined
}

interface BodyInfo {
  type: string
  /** Emitted only when it differs from the default application/json. */
  contentType?: string
}

function requestBodyInfo(requestBody: any, refName: (ref: string) => string): BodyInfo | undefined {
  const content = requestBody?.content
  if (!content || typeof content !== 'object') return undefined
  const types = Object.keys(content)
  const plainJson = types.find((t) => t.startsWith('application/json'))
  if (plainJson) return { type: schemaToType(content[plainJson].schema ?? {}, refName) }
  const vendorJson = types.find(isJsonMediaType)
  if (vendorJson) return { type: schemaToType(content[vendorJson].schema ?? {}, refName), contentType: vendorJson }
  // Declared so that a non-FormData body is rejected instead of being sent as JSON.
  if (types.some((t) => /^(multipart\/)?form-data$/i.test(t))) return { type: 'FormData', contentType: 'multipart/form-data' }
  const form = types.find((t) => /^application\/x-www-form-urlencoded/i.test(t))
  if (form) return { type: 'URLSearchParams | Record<string, string>', contentType: form }
  const text = types.find((t) => /^text\//i.test(t))
  if (text) return { type: 'string', contentType: text }
  return undefined
}

function successSchema(op: any): any | undefined {
  const responses = op.responses ?? {}
  const code = Object.keys(responses).find((c) => c.startsWith('2')) // 200/201/202/204
  if (!code) return undefined
  return jsonSchemaOf(responses[code])
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
  if (!SAFE_PATH_RE.test(path)) throw new Error(`Refusing to generate a method for unsafe path ${JSON.stringify(path)}`)
  const name = ctx.name ?? methodName(op, httpMethod, path)
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
  const headerParams: any[] = []
  const seenQueryNames = new Set<string>()
  const seenHeaderNames = new Set<string>()
  for (const p of resolvedParams) {
    if (!p || !p.name) continue
    const lowerName = String(p.name).toLowerCase()
    if (p.in === 'path') {
      inlinePathParams.set(p.name, p)
    } else if (p.in === 'query' && !seenQueryNames.has(p.name)) {
      seenQueryNames.add(p.name)
      queryParams.push(p)
    } else if (p.in === 'header' && !MANAGED_HEADERS.has(lowerName) && !seenHeaderNames.has(lowerName)) {
      seenHeaderNames.add(lowerName)
      headerParams.push(p)
    }
  }

  // The path template is the source of truth for what params the URL needs.
  const placeholders = pathPlaceholders(path)
  for (const p of placeholders) {
    if (!SAFE_PLACEHOLDER_RE.test(p)) {
      throw new Error(`Refusing to generate a method for unsafe placeholder ${JSON.stringify(p)} in ${JSON.stringify(path)}`)
    }
  }

  const body = requestBodyInfo(op.requestBody, refName)
  const retSchema = successSchema(op)
  const retType = retSchema ? schemaToType(retSchema, refName) : 'unknown'

  // Options-object type. Build with a used-keys set so path/query/header/body never collide.
  const usedKeys = new Set<string>()
  const optionFields: string[] = []
  let hasRequired = false

  for (const n of placeholders) {
    usedKeys.add(n)
    const inline = inlinePathParams.get(n)
    // A path segment can never be null, whatever the schema says.
    const type = inline ? schemaToType({ ...(inline.schema ?? {}), nullable: false }, refName) : 'string | number'
    optionFields.push(`  ${quoteKey(n)}: ${type}`)
    hasRequired = true
  }

  for (const p of queryParams) {
    if (usedKeys.has(p.name)) continue
    usedKeys.add(p.name)
    if (p.required) hasRequired = true
    optionFields.push(`  ${quoteKey(p.name)}${p.required ? '' : '?'}: ${schemaToType(p.schema ?? {}, refName)}`)
  }

  const emittedHeaders: any[] = []
  for (const p of headerParams) {
    if (usedKeys.has(p.name)) continue
    usedKeys.add(p.name)
    emittedHeaders.push(p)
    if (p.required) hasRequired = true
    optionFields.push(`  ${quoteKey(p.name)}${p.required ? '' : '?'}: ${schemaToType(p.schema ?? {}, refName)}`)
  }

  if (body && !usedKeys.has('body')) {
    usedKeys.add('body')
    hasRequired = true
    optionFields.push(`  body: ${body.type}`)
  }

  const optionsType = optionFields.length ? `{\n${optionFields.join('\n')}\n}` : 'Record<string, never>'
  const paramsDecl = hasRequired ? `params: ${optionsType}` : `params: ${optionsType} = {}`

  // Interpolated path: every placeholder goes through encodePathParam.
  const tsPath = path.replace(/\{([^}]+)\}/g, (_m, g) => `\${encodePathParam(${accessExpr(g)})}`)

  const queryObj = queryParams.length
    ? `{ ${queryParams.map((p) => `${quoteString(p.name)}: ${accessExpr(p.name)}`).join(', ')} }`
    : undefined
  const headersObj = emittedHeaders.length
    ? `{ ${emittedHeaders.map((p) => `${quoteString(p.name)}: ${accessExpr(p.name)}`).join(', ')} }`
    : undefined

  const callFields = [`method: '${httpMethod.toUpperCase()}'`, `path: \`${tsPath}\``]
  if (queryObj) callFields.push(`query: ${queryObj}`)
  if (headersObj) callFields.push(`headers: ${headersObj}`)
  if (body) callFields.push('body: params.body')
  if (body?.contentType) callFields.push(`contentType: ${quoteString(body.contentType)}`)
  if (ctx.server && ctx.server !== DEFAULT_SERVER) callFields.push(`server: ${quoteString(ctx.server)}`)

  return [
    `  ${name}(${paramsDecl}, opts?: CallOptions): Promise<${retType}> {`,
    `    return this.http.request<${retType}>(withCall({ ${callFields.join(', ')} }, opts))`,
    `  }`,
  ].join('\n')
}
