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
