export function schemaToType(schema: any, refName: (ref: string) => string): string {
  if (!schema || typeof schema !== 'object') return 'unknown'
  if (schema.$ref) return refName(schema.$ref)
  if (schema.enum && Array.isArray(schema.enum) && schema.enum.length > 0) {
    return schema.enum.map((v: unknown) => JSON.stringify(v)).join(' | ')
  }
  if (schema.allOf && Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    return schema.allOf.map((s: any) => schemaToType(s, refName)).join(' & ')
  }
  if (schema.oneOf && Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return schema.oneOf.map((s: any) => schemaToType(s, refName)).join(' | ')
  }
  if (schema.anyOf && Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    return schema.anyOf.map((s: any) => schemaToType(s, refName)).join(' | ')
  }

  switch (schema.type) {
    case 'string': return 'string'
    case 'number':
    case 'integer': return 'number'
    case 'boolean': return 'boolean'
    case 'array': return `${schemaToType(schema.items ?? {}, refName)}[]`
    case 'object':
    default: {
      const props = schema.properties
      if (!props) return schema.type === 'object' ? 'Record<string, unknown>' : 'unknown'
      const required: string[] = schema.required ?? []
      const lines = Object.entries(props).map(([key, sub]) => {
        const opt = required.includes(key) ? '' : '?'
        const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key)
        return `  ${safeKey}${opt}: ${schemaToType(sub, refName)}`
      })
      return `{\n${lines.join('\n')}\n}`
    }
  }
}
