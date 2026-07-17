import type { VtexClientConfig, RequestOptions } from './types.js'
import { resolveBaseUrl, buildQuery } from './url.js'
import { buildAuthHeaders } from './auth.js'
import { mapResponseToError } from './errors.js'
import { shouldRetry, computeBackoff } from './retry.js'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Combines multiple AbortSignals into one that aborts when any of them abort.
 * Equivalent to `AbortSignal.any(...)`, but works on all Node >=18 (that API
 * only landed in Node 18.17 / 20.3), matching this project's Node >=18 floor.
 *
 * Returns both the combined signal and a `dispose` callback that removes
 * every listener this function registered. Callers MUST invoke `dispose`
 * once the operation settles (success, failure, or abort) — otherwise a
 * long-lived input signal (e.g. one AbortController shared across many
 * `request()` calls) accumulates one permanent listener per call, an
 * unbounded leak that native `AbortSignal.any` does not have.
 */
function combineSignals(
  signals: Array<AbortSignal | undefined>,
): { signal: AbortSignal; dispose: () => void } {
  const valid = signals.filter((s): s is AbortSignal => Boolean(s))
  if (valid.length === 1) return { signal: valid[0], dispose: () => {} }
  const controller = new AbortController()
  const cleanups: Array<() => void> = []
  for (const s of valid) {
    if (s.aborted) {
      controller.abort(s.reason)
      break
    }
    const handler = () => controller.abort(s.reason)
    s.addEventListener('abort', handler)
    cleanups.push(() => s.removeEventListener('abort', handler))
  }
  return {
    signal: controller.signal,
    dispose: () => {
      for (const c of cleanups) c()
    },
  }
}

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
    return (await this.requestRaw<T>(opts)).data
  }

  async requestRaw<T>(opts: RequestOptions): Promise<{ data: T; headers: Headers; status: number }> {
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
      let dispose: () => void = () => {}

      try {
        const combined = combineSignals([opts.signal, controller.signal])
        const signal = combined.signal
        dispose = combined.dispose

        this.hooks.onRequest?.({ method: opts.method, url, attempt })

        let res: Response
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

        this.hooks.onResponse?.({ method: opts.method, url, status: res.status, attempt })

        if (res.ok) return { data: (await parseBody(res)) as T, headers: res.headers, status: res.status }

        if (shouldRetry(res.status, attempt, this.maxRetries)) {
          // Release the response body before looping back to fetch again; an
          // unconsumed keep-alive body can leave zombie sockets and exhaust
          // undici's connection pool under sustained 429/5xx retries.
          await res.body?.cancel().catch(() => {})
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
      } finally {
        clearTimeout(timeout)
        dispose()
      }
    }
  }
}
