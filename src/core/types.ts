export type VtexEnvironment = 'vtexcommercestable' | 'vtexcommercebeta'

export interface VtexHooks {
  onRequest?: (info: { method: string; url: string; attempt: number }) => void
  onResponse?: (info: { method: string; url: string; status: number; attempt: number }) => void
  onRetry?: (info: { method: string; url: string; attempt: number; delayMs: number; reason: string }) => void
}

export interface VtexClientConfig {
  account: string
  environment?: VtexEnvironment
  appKey?: string
  appToken?: string
  authCookie?: string
  maxRetries?: number
  timeoutMs?: number
  /** Injectable for tests; defaults to global fetch. */
  fetch?: typeof fetch
  hooks?: VtexHooks
}

export interface RequestOptions {
  method: string
  path: string
  query?: Record<string, unknown>
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
  timeoutMs?: number
}
