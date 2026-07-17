import { describe, it, expect } from 'vitest'
import { shouldRetry, computeBackoff } from '../../src/core/retry.js'

describe('shouldRetry', () => {
  it('retries 429, 500, and network errors within budget', () => {
    expect(shouldRetry(429, 0, 3)).toBe(true)
    expect(shouldRetry(503, 1, 3)).toBe(true)
    expect(shouldRetry(undefined, 0, 3)).toBe(true)
  })
  it('does not retry 4xx (except 429) or 2xx', () => {
    expect(shouldRetry(400, 0, 3)).toBe(false)
    expect(shouldRetry(404, 0, 3)).toBe(false)
    expect(shouldRetry(200, 0, 3)).toBe(false)
  })
  it('stops when attempts are exhausted', () => {
    expect(shouldRetry(500, 3, 3)).toBe(false)
  })
})

describe('computeBackoff', () => {
  it('honors Retry-After (seconds to ms)', () => {
    expect(computeBackoff(0, 30, () => 0)).toBe(30000)
  })
  it('uses exponential backoff with jitter otherwise', () => {
    // 2^1 * 200 = 400, jitter = rand()*100
    expect(computeBackoff(1, undefined, () => 0.5)).toBe(450)
    expect(computeBackoff(0, undefined, () => 0)).toBe(200)
  })
})
