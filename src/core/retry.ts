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

/** Parses Retry-After (delta-seconds or HTTP-date) into milliseconds. */
export function parseRetryAfterMs(value: string | null | undefined, now: number = Date.now()): number | undefined {
  if (value === null || value === undefined) return undefined
  const trimmed = value.trim()
  if (trimmed === '') return undefined
  if (/^\d+(\.\d+)?$/.test(trimmed)) return Math.round(Number(trimmed) * 1000)
  const at = Date.parse(trimmed)
  if (Number.isNaN(at)) return undefined
  return Math.max(0, at - now)
}
