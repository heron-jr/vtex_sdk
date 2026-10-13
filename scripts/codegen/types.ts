const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/
/** Keys such as "{fieldName}" stand for "any key" in VTEX schemas. */
const PLACEHOLDER_KEY_RE = /^\{[^}]+\}$/

/**
 * Splits an emitted type on its top-level `|` (outside brackets and JSON string literals)
 * and reports whether it has a top-level `&`.
 */
function topLevel(type: string): { members: string[]; intersection: boolean } {
  const members: string[] = []
  let depth = 0
  let start = 0
  let intersection = false
  for (let i = 0; i < type.length; i++) {
    const c = type[i]
    if (c === '"') {
      for (i++; i < type.length && type[i] !== '"'; i++) if (type[i] === '\\') i++
    } else if (c === '{' || c === '(' || c === '[' || c === '<') depth++
    else if (c === '}' || c === ')' || c === ']' || c === '>') depth--
    else if (depth === 0 && c === '|') {
      members.push(type.slice(start, i).trim())
      start = i + 1
    } else if (depth === 0 && c === '&') intersection = true
  }
  members.push(type.slice(start).trim())
  return { members, intersection }
}

function wrap(type: string): string {
  const { members, intersection } = topLevel(type)
  return members.length > 1 || intersection ? `(${type})` : type
}

/**
 * Renders an OpenAPI schema as a TypeScript type expression. Property names and enum values
 * are emitted through JSON.stringify; `refName` output is emitted as-is, so it must return a
 * valid TypeScript identifier.
 */
export function schemaToType(schema: any, refName: (ref: string) => string): string {
  if (!schema || typeof schema !== 'object') return 'unknown'
  const base = baseType(schema, refName)
  if (schema.nullable !== true || base === 'unknown' || topLevel(base).members.includes('null')) return base
  return `${base} | null`
}

function baseType(schema: any, refName: (ref: string) => string): string {
  if (schema.$ref !== undefined) {
    if (typeof schema.$ref !== 'string' || schema.$ref === '') {
      throw new Error(`Invalid $ref ${JSON.stringify(schema.$ref)}: expected a non-empty string`)
    }
    return refName(schema.$ref)
  }
  if (Array.isArray(schema.enum) && schema.enum.length > 0) {
    return schema.enum.map((v: unknown) => JSON.stringify(v)).join(' | ')
  }
  if (Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    return schema.allOf.map((s: any) => wrap(schemaToType(s, refName))).join(' & ')
  }
  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return schema.oneOf.map((s: any) => schemaToType(s, refName)).join(' | ')
  }
  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    return schema.anyOf.map((s: any) => schemaToType(s, refName)).join(' | ')
  }
  if (Array.isArray(schema.type)) {
    // Map each entry to the branch it takes below, so every branch (and the subtree it
    // walks) is visited at most once, however long or repetitive the array is.
    const branches = new Set<unknown>(
      schema.type.map((t: unknown) =>
        t === 'integer' ? 'number' : ['string', 'number', 'boolean', 'null', 'array'].includes(t as string) ? t : 'object',
      ),
    )
    if (branches.size === 0) return objectType(schema, refName)
    return [...branches].map((t) => baseType({ ...schema, type: t }, refName)).join(' | ')
  }
  switch (schema.type) {
    case 'string': return 'string'
    case 'number':
    case 'integer': return 'number'
    case 'boolean': return 'boolean'
    case 'null': return 'null'
    case 'array': return `${wrap(schemaToType(schema.items ?? {}, refName))}[]`
    case 'object':
    default: return objectType(schema, refName)
  }
}

function objectType(schema: any, refName: (ref: string) => string): string {
  const props: Record<string, any> =
    schema.properties && typeof schema.properties === 'object' ? schema.properties : {}
  const required: string[] = Array.isArray(schema.required) ? schema.required : []
  const lines: string[] = []
  const indexTypes: string[] = []
  for (const [key, sub] of Object.entries(props)) {
    if (PLACEHOLDER_KEY_RE.test(key)) {
      indexTypes.push(schemaToType(sub, refName))
      continue
    }
    const opt = required.includes(key) ? '' : '?'
    const safeKey = IDENT_RE.test(key) ? key : JSON.stringify(key)
    lines.push(`  ${safeKey}${opt}: ${schemaToType(sub, refName)}`)
  }
  const extra = schema.additionalProperties
  if (extra === true || (extra && typeof extra === 'object' && Object.keys(extra).length === 0)) {
    indexTypes.push('unknown')
  } else if (extra && typeof extra === 'object') {
    indexTypes.push(schemaToType(extra, refName))
  }
  if (lines.length === 0 && indexTypes.length === 0) {
    if (extra === false) return 'Record<string, never>'
    return schema.type === 'object' || schema.properties ? 'Record<string, unknown>' : 'unknown'
  }
  if (indexTypes.length > 0) {
    // Named properties must be assignable to the index signature, so mixing them widens it.
    const unique = [...new Set(indexTypes)]
    const indexType = lines.length > 0 || unique.includes('unknown') ? 'unknown' : unique.join(' | ')
    lines.push(`  [key: string]: ${indexType}`)
  }
  return `{\n${lines.join('\n')}\n}`
}
