function camelCase(input: string): string {
  const parts = input
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (parts.length === 0) return 'op'
  return parts
    .map((p, i) => {
      if (i === 0) {
        // First part: if all uppercase, fully lowercase; otherwise just lowercase first char
        return p === p.toUpperCase() ? p.toLowerCase() : p.charAt(0).toLowerCase() + p.slice(1)
      }
      // Other parts: capitalize first letter, keep the rest as-is
      return p.charAt(0).toUpperCase() + p.slice(1)
    })
    .join('')
}

export function methodName(op: { operationId?: string }, httpMethod: string, path: string): string {
  if (op.operationId && op.operationId.trim()) return camelCase(op.operationId)
  // Derive: method + path segments, turning {param} into "ByParam".
  const segments = path.split('/').filter(Boolean).map((seg) => {
    const m = seg.match(/^\{(.+)\}$/)
    return m ? `by ${m[1]}` : seg
  })
  return camelCase([httpMethod, ...segments].join(' '))
}

export function dedupe(names: string[]): string[] {
  const seen = new Map<string, number>()
  return names.map((name) => {
    const count = seen.get(name) ?? 0
    seen.set(name, count + 1)
    return count === 0 ? name : `${name}${count + 1}`
  })
}

export function tagToNamespace(tag: string): string {
  return camelCase(tag.replace(/&/g, ' '))
}
