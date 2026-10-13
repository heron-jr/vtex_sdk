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
  /**
   * Longest `Retry-After` (in ms) the SDK waits before retrying. A longer value
   * makes the request fail immediately with `VtexRateLimitError`. Default 30000.
   */
  maxRetryAfterMs?: number
  /** Injectable for tests; defaults to global fetch. */
  fetch?: typeof fetch
  hooks?: VtexHooks
}

/** Per-call options accepted by every generated method and facade method. */
export interface CallOptions {
  headers?: Record<string, string>
  signal?: AbortSignal
  timeoutMs?: number
  /** `false` disables retries for this call; `{ maxRetries }` overrides the client default. */
  retry?: false | { maxRetries?: number }
  /**
   * Overrides the method's default retry safety: `true` promotes a POST/PATCH (e.g. an
   * upsert keyed by a natural id); `false` demotes a command-style PUT/DELETE.
   */
  idempotent?: boolean
}

export interface RequestOptions extends Omit<CallOptions, 'headers'> {
  method: string
  path: string
  query?: Record<string, unknown>
  body?: unknown
  /** Request content type; defaults to application/json when a body is present. */
  contentType?: string
  headers?: Record<string, string | number | boolean | undefined>
  /** Server URL template (see DEFAULT_SERVER); must resolve to an allowlisted VTEX host. */
  server?: string
}
