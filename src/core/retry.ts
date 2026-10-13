/** Largest delay setTimeout honors; larger values fire after about 1 ms. */
export const MAX_TIMER_MS = 2_147_483_647

export interface RetryContext {
  method: string
  idempotent?: boolean
  /** Retries already performed (0 on the first failure). */
  attempt: number
  maxRetries: number
}

export type Failure =
  | { kind: 'status'; status: number }
  | { kind: 'timeout' }
  | { kind: 'network'; connectPhase: boolean }

const RETRY_SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'])
const CONNECT_PHASE_CODES = new Set(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])

/**
 * GET/HEAD/OPTIONS/PUT/DELETE are retry-safe by default. An explicit `idempotent`
 * wins: `true` promotes a POST/PATCH, `false` demotes a command-style PUT/DELETE.
 */
export function isRetrySafe(method: string, idempotent?: boolean): boolean {
  return idempotent ?? RETRY_SAFE_METHODS.has(method.toUpperCase())
}

/** True when a fetch rejection happened before any request bytes were written. */
export function isConnectPhaseError(err: unknown): boolean {
  const error = err as { code?: unknown; cause?: { code?: unknown } | null } | null | undefined
  const code = error?.cause?.code ?? error?.code
  return typeof code === 'string' && CONNECT_PHASE_CODES.has(code)
}

/**
 * 429 is always retried. 5xx, timeouts and mid-flight network errors are retried only
 * for retry-safe requests, because a non-idempotent write may already have been applied.
 * Connect-phase failures are always retried: no request bytes were written.
 */
export function shouldRetryFailure(ctx: RetryContext, failure: Failure): boolean {
  if (ctx.attempt >= ctx.maxRetries) return false
  const safe = isRetrySafe(ctx.method, ctx.idempotent)
  switch (failure.kind) {
    case 'status':
      return failure.status === 429 || (safe && failure.status >= 500 && failure.status <= 599)
    case 'timeout':
      return safe
    case 'network':
      return safe || failure.connectPhase
  }
}

/**
 * Parses Retry-After into milliseconds. Accepts delta-seconds and HTTP-dates
 * (IMF-fixdate or RFC 850, both ending in "hh:mm:ss GMT"); anything else is
 * ignored, because Date.parse also accepts junk such as "abc 5".
 */
export function parseRetryAfterMs(value: string | null | undefined, now: number = Date.now()): number | undefined {
  if (value === null || value === undefined) return undefined
  const trimmed = value.trim()
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const ms = Math.round(Number(trimmed) * 1000)
    return Number.isFinite(ms) ? ms : undefined
  }
  if (!/\d{2}:\d{2}:\d{2} GMT$/.test(trimmed)) return undefined
  const at = Date.parse(trimmed)
  if (Number.isNaN(at)) return undefined
  return Math.max(0, at - now)
}

/**
 * Delay before the next attempt (`attempt` = retries already performed, 0-based):
 * Retry-After when given, else exponential backoff with full jitter. Callers must
 * reject a Retry-After above `capMs` before calling; the clamp here is a safety net.
 */
export function backoffDelay(
  attempt: number,
  retryAfterMs: number | undefined,
  capMs: number,
  rand: () => number = Math.random,
): number {
  if (retryAfterMs !== undefined) return Math.min(retryAfterMs, capMs)
  const ceiling = Math.min(capMs, 200 * 2 ** attempt)
  return Math.floor(rand() * ceiling)
}

/**
 * setTimeout-based sleep that rejects with the signal's reason (or an AbortError when
 * the signal has none) as soon as it aborts. `ms` is clamped to [0, MAX_TIMER_MS];
 * NaN counts as 0.
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const abortReason = () => signal?.reason ?? new DOMException('This operation was aborted', 'AbortError')
    if (signal?.aborted) {
      reject(abortReason())
      return
    }
    const onAbort = () => {
      clearTimeout(timer)
      reject(abortReason())
    }
    const delay = Math.min(Math.max(Number.isNaN(ms) ? 0 : ms, 0), MAX_TIMER_MS)
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, delay)
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
