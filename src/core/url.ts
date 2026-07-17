import type { VtexEnvironment } from './types.js'

export function resolveBaseUrl(account: string, environment: VtexEnvironment = 'vtexcommercestable'): string {
  if (!account) throw new Error('VTEX account is required')
  return `https://${account}.${environment}.com.br`
}

export function buildQuery(query?: Record<string, unknown>): string {
  if (!query) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, String(v))
    } else {
      params.append(key, String(value))
    }
  }
  const s = params.toString()
  return s ? `?${s}` : ''
}
