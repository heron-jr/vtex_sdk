import { methodName } from './naming.js'
import { schemaToType } from './types.js'
import { DEFAULT_SERVER } from '../../src/core/url.js'
import { isJsonContentType, mediaType } from '../../src/core/body.js'
import { isValidHeaderName, isValidHeaderValue } from '../../src/core/headers.js'

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
const HTTP_METHOD_RE = /^(get|put|post|patch|delete|head|options)$/
const SAFE_PATH_RE = /^\/[A-Za-z0-9\-._~!&'()*+,;=:@%/{}]*$/
const SAFE_PLACEHOLDER_RE = /^[A-Za-z0-9_.-]+$/
/** Headers managed by the SDK or by fetch; schema-declared params with these names are not exposed. */
const MANAGED_HEADERS = new Set([
  'accept', 'content-type', 'content-length', 'host',
  'x-vtex-api-appkey', 'x-vtex-api-apptoken', 'vtexidclientautcookie', 'cookie', 'authorization',
])
/** Method names that would clash with the generated class itself. */
const RESERVED_METHOD_NAMES = new Set(['constructor', 'http'])
/**
 * Option keys that object literals or the `= {}` default would mishandle: every
 * Object.prototype member (`__proto__`, `constructor`, `toString`, `valueOf`...), since an
 * omitted optional param would otherwise read the inherited function.
 */
const RESERVED_PARAM_NAMES = new Set(Object.getOwnPropertyNames(Object.prototype))
/** Header values must be primitives the runtime accepts (string, number, boolean or a literal union of them). */
const PRIMITIVE_TYPE_RE =
  /^(?:string|number|boolean|true|false|-?\d+(?:\.\d+)?|"(?:[^"\\]|\\.)*")(?: \| (?:string|number|boolean|true|false|-?\d+(?:\.\d+)?|"(?:[^"\\]|\\.)*"))*$/
/** Path values must be strings or numbers (what encodePathParam accepts). */
const PATH_TYPE_RE = /^(?:string|number|-?\d+(?:\.\d+)?|"(?:[^"\\]|\\.)*")(?: \| (?:string|number|-?\d+(?:\.\d+)?|"(?:[^"\\]|\\.)*"))*$/

function isSafeIdent(name: string): boolean {
  return IDENT_RE.test(name)
}

/** Single-quoted string literal: backslashes and quotes escaped, control and line-separator characters as \uXXXX. */
function quoteString(value: string): string {
  const escaped = value
    .replace(/[\\']/g, '\\$&')
    .replace(/[\u0000-\u001f\u007f\u2028\u2029]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`)
  return `'${escaped}'`
}

/** Key for an object type literal / value, quoting it when it isn't a valid identifier. */
function quoteKey(name: string): string {
  return isSafeIdent(name) ? name : quoteString(name)
}

/** Expression to read `name` off the `params` object, using bracket access when needed. */
function accessExpr(name: string): string {
  return isSafeIdent(name) ? `params.${name}` : `params[${quoteString(name)}]`
}

function jsonSchemaOf(container: any): any | undefined {
  const content = container?.content
  if (!content) return undefined
  const types = Object.keys(content)
  const key = types.find((t) => mediaType(t) === 'application/json') ?? types.find(isJsonContentType)
  return key ? content[key].schema : undefined
}

interface BodyInfo {
  type: string
  /** Emitted only when it differs from the default application/json. */
  contentType?: string
}

/**
 * Body type and content type, by fixed priority: plain JSON, vendor JSON, multipart form-data,
 * form-urlencoded, text, then any other declared type as a binary body.
 */
function requestBodyInfo(requestBody: any, refName: (ref: string) => string): BodyInfo | undefined {
  const content = requestBody?.content
  if (!content || typeof content !== 'object') return undefined
  const types = Object.keys(content)
  if (types.length === 0) return undefined
  for (const t of types) {
    // The chosen type is sent as the Content-Type header, which the runtime would reject.
    if (!isValidHeaderValue(t)) throw new Error(`Refusing to generate a request body with content type ${JSON.stringify(t)}`)
  }
  const plainJson = types.find((t) => mediaType(t) === 'application/json')
  if (plainJson) return { type: schemaToType(content[plainJson].schema ?? {}, refName) }
  const vendorJson = types.find(isJsonContentType)
  if (vendorJson) return { type: schemaToType(content[vendorJson].schema ?? {}, refName), contentType: vendorJson }
  // Typed as FormData so TypeScript callers can't pass a plain object; fetch sets the boundary.
  if (types.some((t) => /^(multipart\/)?form-data$/.test(mediaType(t)))) {
    return { type: 'FormData', contentType: 'multipart/form-data' }
  }
  const form = types.find((t) => mediaType(t) === 'application/x-www-form-urlencoded')
  if (form) return { type: 'URLSearchParams | Record<string, string>', contentType: form }
  const text = types.find((t) => mediaType(t).startsWith('text/'))
  if (text) return { type: 'string', contentType: text }
  // Anything else (octet-stream, images, xml...) is sent as bytes with its declared type.
  const other = types[0]
  return { type: 'Blob | ArrayBuffer | Uint8Array | string', contentType: other.includes('*') ? 'application/octet-stream' : other }
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

/** Paths the runtime would reject or rewrite: empty or dot segments, stray braces, malformed escapes. */
function assertSafePath(path: string): void {
  const refuse = () => new Error(`Refusing to generate a method for unsafe path ${JSON.stringify(path)}`)
  if (!SAFE_PATH_RE.test(path)) throw refuse()
  if (/%(?![0-9A-Fa-f]{2})/.test(path)) throw refuse()
  if (/[{}]/.test(path.replace(/\{[^{}]+\}/g, ''))) throw refuse()
  const segments = path.slice(1).split('/')
  for (const [i, segment] of segments.entries()) {
    if (segment === '' && i < segments.length - 1) throw refuse()
    const decoded = segment.replace(/%2e/gi, '.')
    if (decoded === '.' || decoded === '..') throw refuse()
  }
}

export function generateMethod(ctx: Ctx): string {
  const { httpMethod, path, op, refName, resolveRef } = ctx
  if (!HTTP_METHOD_RE.test(httpMethod)) throw new Error(`Refusing to generate a method for HTTP method ${JSON.stringify(httpMethod)}`)
  assertSafePath(path)
  const name = ctx.name ?? methodName(op, httpMethod, path)
  if (!IDENT_RE.test(name) || RESERVED_METHOD_NAMES.has(name)) {
    throw new Error(`Refusing to generate a method named ${JSON.stringify(name)} for ${httpMethod.toUpperCase()} ${path}`)
  }
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
  // Only params that become option keys are checked against reserved names (path names are
  // checked with the placeholders below); ignored ones, e.g. cookie params, can't clash.
  const refuseReserved = (name: string) => {
    if (RESERVED_PARAM_NAMES.has(name)) {
      throw new Error(`Refusing to generate a method with a parameter named ${JSON.stringify(name)} (${path})`)
    }
  }
  for (const p of resolvedParams) {
    if (!p || !p.name) continue
    const paramName = String(p.name)
    const lowerName = paramName.toLowerCase()
    if (p.in === 'path') {
      inlinePathParams.set(paramName, p)
    } else if (p.in === 'query' && !seenQueryNames.has(paramName)) {
      refuseReserved(paramName)
      seenQueryNames.add(paramName)
      queryParams.push(p)
    } else if (p.in === 'header') {
      if (!isValidHeaderName(paramName)) {
        throw new Error(`Refusing to generate a method with invalid header name ${JSON.stringify(paramName)} (${path})`)
      }
      if (!MANAGED_HEADERS.has(lowerName) && !seenHeaderNames.has(lowerName)) {
        refuseReserved(paramName)
        seenHeaderNames.add(lowerName)
        headerParams.push(p)
      }
    }
  }

  // The path template is the source of truth for what params the URL needs.
  const placeholders = pathPlaceholders(path)
  for (const p of placeholders) {
    if (!SAFE_PLACEHOLDER_RE.test(p) || RESERVED_PARAM_NAMES.has(p)) {
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
    // A path segment can never be null, whatever the schema says, and must be a string or number.
    const computed = inline ? schemaToType({ ...(inline.schema ?? {}), nullable: false }, refName) : ''
    const type = PATH_TYPE_RE.test(computed) ? computed : 'string | number'
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
    const computed = schemaToType({ ...(p.schema ?? {}), nullable: false }, refName)
    const type = PRIMITIVE_TYPE_RE.test(computed) ? computed : 'string'
    optionFields.push(`  ${quoteKey(p.name)}${p.required ? '' : '?'}: ${type}`)
  }

  if (body) {
    if (usedKeys.has('body')) {
      throw new Error(`Refusing to generate ${httpMethod.toUpperCase()} ${path}: a parameter is named "body"`)
    }
    usedKeys.add('body')
    // Always required: VTEX schemas often omit requestBody.required even when the API needs a body.
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
    `  async ${name}(${paramsDecl}, opts?: CallOptions): Promise<${retType}> {`,
    `    return this.http.request<${retType}>(withCall({ ${callFields.join(', ')} }, opts))`,
    `  }`,
  ].join('\n')
}
