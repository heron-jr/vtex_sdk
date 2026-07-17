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
  const used = new Set<string>()
  const counts = new Map<string, number>()
  return names.map((name) => {
    let n = counts.get(name) ?? 0
    let candidate = n === 0 ? name : `${name}${n + 1}`
    while (used.has(candidate)) {
      n += 1
      candidate = `${name}${n + 1}`
    }
    counts.set(name, n)
    used.add(candidate)
    return candidate
  })
}

export function tagToNamespace(tag: string): string {
  return camelCase(tag.replace(/&/g, ' '))
}
