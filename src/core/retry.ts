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
