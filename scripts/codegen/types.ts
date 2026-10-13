const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/
/** Keys such as "{fieldName}" stand for "any key" in VTEX schemas. */
const PLACEHOLDER_KEY_RE = /^\{[^}]+\}$/

function wrap(type: string): string {
  return type.includes(' | ') || type.includes(' & ') ? `(${type})` : type
}

export function schemaToType(schema: any, refName: (ref: string) => string): string {
  if (!schema || typeof schema !== 'object') return 'unknown'
  const base = baseType(schema, refName)
  if (schema.nullable === true && base !== 'unknown' && base !== 'null') return `${base} | null`
  return base
}

function baseType(schema: any, refName: (ref: string) => string): string {
  if (schema.$ref) return refName(schema.$ref)
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
    const parts = schema.type.map((t: unknown) =>
      t === 'null' ? 'null' : schemaToType({ ...schema, type: t, nullable: false }, refName),
    )
    return [...new Set(parts)].join(' | ')
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
