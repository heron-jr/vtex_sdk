import type { VtexClientConfig, RequestOptions } from './types.js'
import { resolveBaseUrl, buildQuery } from './url.js'
import { buildAuthHeaders } from './auth.js'
import { mapResponseToError } from './errors.js'
import { shouldRetry, computeBackoff } from './retry.js'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204 || res.status === 205) return undefined
  const ct = res.headers.get('content-type') ?? ''
  const text = await res.text()
  if (!text) return undefined
  if (ct.startsWith('application/json')) {
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }
  return text
}

export class VtexHttpClient {
  private readonly baseUrl: string
  private readonly authHeaders: Record<string, string>
  private readonly maxRetries: number
  private readonly timeoutMs: number
  private readonly doFetch: typeof fetch
  private readonly hooks: NonNullable<VtexClientConfig['hooks']>

  constructor(config: VtexClientConfig) {
    this.baseUrl = resolveBaseUrl(config.account, config.environment)
    this.authHeaders = buildAuthHeaders(config)
    this.maxRetries = config.maxRetries ?? 3
    this.timeoutMs = config.timeoutMs ?? 30000
    this.doFetch = config.fetch ?? fetch
    this.hooks = config.hooks ?? {}
  }

  async request<T>(opts: RequestOptions): Promise<T> {
    const url = this.baseUrl + opts.path + buildQuery(opts.query)
    const hasBody = opts.body !== undefined
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...this.authHeaders,
      ...opts.headers,
    }
    if (hasBody) headers['Content-Type'] = 'application/json'

    let attempt = 0
    for (;;) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? this.timeoutMs)
      const signal = opts.signal ? AbortSignal.any([opts.signal, controller.signal]) : controller.signal

      this.hooks.onRequest?.({ method: opts.method, url, attempt })

      let res: Response
      try {
        try {
          res = await this.doFetch(url, {
            method: opts.method,
            headers,
            body: hasBody ? JSON.stringify(opts.body) : undefined,
            signal,
          })
        } catch (err) {
          if (shouldRetry(undefined, attempt, this.maxRetries)) {
            const delay = computeBackoff(attempt, undefined, Math.random)
            this.hooks.onRetry?.({ method: opts.method, url, attempt, delayMs: delay, reason: 'network' })
            await sleep(delay)
            attempt++
            continue
          }
          throw err
        }
      } finally {
        clearTimeout(timeout)
      }

      this.hooks.onResponse?.({ method: opts.method, url, status: res.status, attempt })

      if (res.ok) return (await parseBody(res)) as T

      if (shouldRetry(res.status, attempt, this.maxRetries)) {
        const retryAfterHeader = res.headers.get('Retry-After')
        const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : undefined
        const delay = computeBackoff(attempt, Number.isFinite(retryAfter) ? retryAfter : undefined, Math.random)
        this.hooks.onRetry?.({ method: opts.method, url, attempt, delayMs: delay, reason: `status ${res.status}` })
        await sleep(delay)
        attempt++
        continue
      }
      const body = await parseBody(res)
      throw mapResponseToError(res.status, body, res.headers)
    }
  }
}
