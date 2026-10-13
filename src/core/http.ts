import { inspect } from 'node:util'
import type { RequestOptions, VtexClientConfig, VtexEnvironment, VtexHooks } from './types.js'
import {
  DEFAULT_SERVER, buildRequestUrl, normalizeAccount, resolveServer, validateEnvironment, type ResolvedServer,
} from './url.js'
import { buildAuthHeaders } from './auth.js'
import { VtexNetworkError, VtexRequestError, VtexTimeoutError, VtexUsageError, mapResponseToError } from './errors.js'
import {
  MAX_TIMER_MS, backoffDelay, isConnectPhaseError, parseRetryAfterMs, shouldRetryFailure, sleep, type Failure,
} from './retry.js'
import { isJsonContentType, serializeBody } from './body.js'

const MAX_REDIRECTS = 3

/** Rejects NaN, Infinity, negatives and (optionally) fractions in numeric options. */
function checkedNumber(name: string, value: unknown, min: number, integer = false): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || (integer && !Number.isInteger(value))) {
    throw new VtexUsageError(`${name} must be a finite ${integer ? 'integer' : 'number'} >= ${min} (got ${String(value)})`)
  }
  return value
}

/**
 * Combines multiple AbortSignals into one that aborts when any of them abort.
 *
 * Returns both the combined signal and a `dispose` callback that removes
 * every listener this function registered. Callers MUST invoke `dispose`
 * once the operation settles (success, failure, or abort) — otherwise a
 * long-lived input signal (e.g. one AbortController shared across many
 * `request()` calls) accumulates one permanent listener per call.
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
  if (isJsonContentType(ct)) {
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }
  return text
}

/** Sets a header, replacing any existing header with the same name in a different case. */
function setHeader(headers: Record<string, string>, name: string, value: string): void {
  const lower = name.toLowerCase()
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === lower) delete headers[key]
  }
  headers[name] = value
}

/** Next URL for a redirect the SDK may follow, or undefined when it must be blocked. */
function redirectTarget(currentUrl: string, res: Response, method: string): string | undefined {
  const location = res.headers.get('location')
  if (!location) return undefined
  let next: URL
  try {
    next = new URL(location, currentUrl)
  } catch {
    return undefined
  }
  if (next.origin !== new URL(currentUrl).origin) return undefined
  if (res.status === 307 || res.status === 308) return next.href
  if ((res.status === 301 || res.status === 302 || res.status === 303) && (method === 'GET' || method === 'HEAD')) {
    return next.href
  }
  return undefined
}

export class VtexHttpClient {
  readonly account: string
  readonly environment: VtexEnvironment
  readonly #authHeaders: Record<string, string>
  readonly #maxRetries: number
  readonly #timeoutMs: number
  readonly #maxRetryAfterMs: number
  readonly #fetch: typeof fetch
  readonly #hooks: VtexHooks
  readonly #servers = new Map<string, ResolvedServer>()

  constructor(config: VtexClientConfig) {
    this.account = normalizeAccount(config.account)
    this.environment = validateEnvironment(config.environment ?? 'vtexcommercestable')
    this.#authHeaders = buildAuthHeaders(config)
    this.#maxRetries = checkedNumber('maxRetries', config.maxRetries ?? 3, 0, true)
    this.#timeoutMs = Math.min(checkedNumber('timeoutMs', config.timeoutMs ?? 30_000, 1), MAX_TIMER_MS)
    this.#maxRetryAfterMs = Math.min(checkedNumber('maxRetryAfterMs', config.maxRetryAfterMs ?? 30_000, 0), MAX_TIMER_MS)
    this.#fetch = config.fetch ?? fetch
    this.#hooks = config.hooks ?? {}
    this.#server(DEFAULT_SERVER)
  }

  toJSON(): { account: string; environment: VtexEnvironment } {
    return { account: this.account, environment: this.environment }
  }

  [inspect.custom](): string {
    return `VtexHttpClient ${JSON.stringify(this.toJSON())}`
  }

  #server(template: string): ResolvedServer {
    let resolved = this.#servers.get(template)
    if (!resolved) {
      resolved = resolveServer(template, this.account, this.environment)
      this.#servers.set(template, resolved)
    }
    return resolved
  }

  async request<T>(opts: RequestOptions): Promise<T> {
    return (await this.requestRaw<T>(opts)).data
  }

  async requestRaw<T>(opts: RequestOptions): Promise<{ data: T; headers: Headers; status: number }> {
    const method = opts.method.toUpperCase()
    const server = this.#server(opts.server ?? DEFAULT_SERVER)
    let url = buildRequestUrl(server, opts.path, opts.query)
    const route = server.basePath + opts.path
    const { body, contentType } = serializeBody(opts.body, opts.contentType)

    const headers: Record<string, string> = { Accept: 'application/json', ...this.#authHeaders }
    if (contentType) setHeader(headers, 'Content-Type', contentType)
    for (const [name, value] of Object.entries(opts.headers ?? {})) {
      if (value !== undefined) setHeader(headers, name, String(value))
    }

    const maxRetries =
      opts.retry === false ? 0 : checkedNumber('retry.maxRetries', opts.retry?.maxRetries ?? this.#maxRetries, 0, true)
    const timeoutMs =
      opts.timeoutMs === undefined ? this.#timeoutMs : Math.min(checkedNumber('timeoutMs', opts.timeoutMs, 1), MAX_TIMER_MS)
    let attempt = 0
    let redirects = 0

    for (;;) {
      const controller = new AbortController()
      let timedOut = false
      const timer = setTimeout(() => {
        timedOut = true
        controller.abort()
      }, timeoutMs)
      let dispose: () => void = () => {}

      try {
        const combined = combineSignals([opts.signal, controller.signal])
        dispose = combined.dispose
        this.#hooks.onRequest?.({ method, url, attempt })

        let res: Response
        try {
          res = await this.#fetch(url, { method, headers, body, signal: combined.signal, redirect: 'manual' })
        } catch (err) {
          if (opts.signal?.aborted) throw opts.signal.reason ?? err
          const failure: Failure = timedOut ? { kind: 'timeout' } : { kind: 'network', connectPhase: isConnectPhaseError(err) }
          if (shouldRetryFailure({ method, idempotent: opts.idempotent, attempt, maxRetries }, failure)) {
            const delayMs = backoffDelay(attempt, undefined, this.#maxRetryAfterMs)
            this.#hooks.onRetry?.({ method, url, attempt, delayMs, reason: failure.kind })
            await sleep(delayMs, opts.signal)
            attempt++
            continue
          }
          throw this.#networkError(err, timedOut, method, route, attempt + 1)
        }

        this.#hooks.onResponse?.({ method, url, status: res.status, attempt })

        if (res.status >= 300 && res.status < 400 && res.headers.has('location')) {
          await res.body?.cancel().catch(() => {})
          const next = redirects < MAX_REDIRECTS ? redirectTarget(url, res, method) : undefined
          if (!next) {
            throw new VtexRequestError(`VTEX redirect blocked (status ${res.status})`, { status: res.status, body: undefined })
          }
          url = next
          redirects++
          continue
        }

        if (res.ok) {
          const data = (await this.#readBody(res, opts.signal, () => timedOut, method, route, attempt)) as T
          return { data, headers: res.headers, status: res.status }
        }

        const retryAfterMs = parseRetryAfterMs(res.headers.get('retry-after'))
        const waitTooLong = retryAfterMs !== undefined && retryAfterMs > this.#maxRetryAfterMs
        const failure: Failure = { kind: 'status', status: res.status }
        if (!waitTooLong && shouldRetryFailure({ method, idempotent: opts.idempotent, attempt, maxRetries }, failure)) {
          await res.body?.cancel().catch(() => {})
          const delayMs = backoffDelay(attempt, retryAfterMs, this.#maxRetryAfterMs)
          this.#hooks.onRetry?.({ method, url, attempt, delayMs, reason: `status ${res.status}` })
          await sleep(delayMs, opts.signal)
          attempt++
          continue
        }
        const errorBody = await this.#readBody(res, opts.signal, () => timedOut, method, route, attempt)
        throw mapResponseToError(res.status, errorBody, res.headers)
      } finally {
        clearTimeout(timer)
        dispose()
      }
    }
  }

  async #readBody(
    res: Response, signal: AbortSignal | undefined, isTimedOut: () => boolean, method: string, route: string, attempt: number,
  ): Promise<unknown> {
    try {
      return await parseBody(res)
    } catch (err) {
      if (signal?.aborted) throw signal.reason ?? err
      throw this.#networkError(err, isTimedOut(), method, route, attempt + 1)
    }
  }

  #networkError(cause: unknown, timedOut: boolean, method: string, route: string, attempts: number): VtexNetworkError {
    const what = timedOut ? 'timed out' : 'failed before a complete response was received'
    const message = `VTEX request ${method} ${route} ${what} (attempts: ${attempts})`
    return timedOut
      ? new VtexTimeoutError(message, { cause, method, route, attempts })
      : new VtexNetworkError(message, { cause, method, route, attempts })
  }
}
