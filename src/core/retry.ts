export function shouldRetry(status: number | undefined, attempt: number, maxRetries: number): boolean {
  if (attempt >= maxRetries) return false
  if (status === undefined) return true // network error
  if (status === 429) return true
  return status >= 500
}

export function computeBackoff(attempt: number, retryAfter: number | undefined, rand: () => number): number {
  if (retryAfter !== undefined) return retryAfter * 1000
  const base = Math.pow(2, attempt) * 200
  const jitter = Math.floor(rand() * 100)
  return base + jitter
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

/** GET/HEAD/OPTIONS/PUT/DELETE, or any request the caller marked idempotent. */
export function isRetrySafe(method: string, idempotent?: boolean): boolean {
  return idempotent === true || RETRY_SAFE_METHODS.has(method.toUpperCase())
}

/** True when a fetch rejection happened before the request reached the server. */
export function isConnectPhaseError(err: unknown): boolean {
  const code = (err as { cause?: { code?: unknown } } | null | undefined)?.cause?.code
  return typeof code === 'string' && CONNECT_PHASE_CODES.has(code)
}

/**
 * 429 is always retried. 5xx, timeouts and mid-flight network errors are retried only
 * for retry-safe requests, because a non-idempotent write may already have been applied.
 * Connect-phase failures are always retried: the request never left the machine.
 */
export function shouldRetryFailure(ctx: RetryContext, failure: Failure): boolean {
  if (ctx.attempt >= ctx.maxRetries) return false
  const safe = isRetrySafe(ctx.method, ctx.idempotent)
  switch (failure.kind) {
    case 'status':
      return failure.status === 429 || (safe && failure.status >= 500)
    case 'timeout':
      return safe
    case 'network':
      return safe || failure.connectPhase
  }
}

/** Delay before the next attempt: Retry-After when given, else exponential backoff with full jitter. */
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

/** setTimeout-based sleep that rejects with the signal's reason as soon as it aborts. */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason)
      return
    }
    const onAbort = () => {
      clearTimeout(timer)
      reject(signal?.reason)
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
