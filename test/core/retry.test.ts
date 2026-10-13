import { getEventListeners } from 'node:events'
import { performance } from 'node:perf_hooks'
import { describe, it, expect } from 'vitest'
import {
  isRetrySafe, isConnectPhaseError, shouldRetryFailure, parseRetryAfterMs, backoffDelay, sleep, MAX_TIMER_MS,
} from '../../src/core/retry.js'

describe('isRetrySafe', () => {
  it('treats GET/HEAD/OPTIONS/PUT/DELETE as retry-safe', () => {
    for (const method of ['GET', 'head', 'OPTIONS', 'PUT', 'DELETE']) expect(isRetrySafe(method)).toBe(true)
  })
  it('treats POST/PATCH as unsafe unless marked idempotent', () => {
    expect(isRetrySafe('POST')).toBe(false)
    expect(isRetrySafe('PATCH')).toBe(false)
    expect(isRetrySafe('POST', true)).toBe(true)
  })
  it('lets idempotent: false demote a command-style PUT/DELETE', () => {
    expect(isRetrySafe('PUT', false)).toBe(false)
    expect(isRetrySafe('DELETE', false)).toBe(false)
  })
})

describe('isConnectPhaseError', () => {
  const withCode = (code: string) =>
    Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(code), { code }) })

  it.each(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])('recognizes %s', (code) => {
    expect(isConnectPhaseError(withCode(code))).toBe(true)
  })
  it.each(['ECONNRESET', 'UND_ERR_SOCKET', 'EPIPE', 'ETIMEDOUT'])('does not treat %s as connect-phase', (code) => {
    expect(isConnectPhaseError(withCode(code))).toBe(false)
  })
  it('reads a top-level code (AggregateError from undici, or an injected fetch)', () => {
    expect(isConnectPhaseError(Object.assign(new AggregateError([], 'connect'), { code: 'ECONNREFUSED' }))).toBe(true)
    expect(isConnectPhaseError(Object.assign(new Error('refused'), { code: 'ECONNREFUSED' }))).toBe(true)
  })
  it('handles values without a usable code', () => {
    expect(isConnectPhaseError(new Error('x'))).toBe(false)
    expect(isConnectPhaseError(undefined)).toBe(false)
    expect(isConnectPhaseError(null)).toBe(false)
    expect(isConnectPhaseError('ECONNREFUSED')).toBe(false)
    expect(isConnectPhaseError({ cause: null })).toBe(false)
  })
})

describe('shouldRetryFailure', () => {
  const ctx = (method: string, extra: { idempotent?: boolean; attempt?: number; maxRetries?: number } = {}) => ({
    method, attempt: 0, maxRetries: 3, ...extra,
  })

  it('retries 429 for every method', () => {
    expect(shouldRetryFailure(ctx('POST'), { kind: 'status', status: 429 })).toBe(true)
  })
  it('retries 5xx only for retry-safe requests', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('POST'), { kind: 'status', status: 503 })).toBe(false)
    expect(shouldRetryFailure(ctx('POST', { idempotent: true }), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('PUT', { idempotent: false }), { kind: 'status', status: 503 })).toBe(false)
  })
  it('only treats 500-599 as server errors', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 500 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 599 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 600 })).toBe(false)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 408 })).toBe(false)
  })
  it('never retries other 4xx', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 404 })).toBe(false)
  })
  it('retries timeouts only for retry-safe requests', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'timeout' })).toBe(true)
    expect(shouldRetryFailure(ctx('PATCH'), { kind: 'timeout' })).toBe(false)
    expect(shouldRetryFailure(ctx('PATCH', { idempotent: true }), { kind: 'timeout' })).toBe(true)
  })
  it('retries connect-phase errors for every method, other network errors only when safe', () => {
    expect(shouldRetryFailure(ctx('POST'), { kind: 'network', connectPhase: true })).toBe(true)
    expect(shouldRetryFailure(ctx('POST'), { kind: 'network', connectPhase: false })).toBe(false)
    expect(shouldRetryFailure(ctx('POST', { idempotent: true }), { kind: 'network', connectPhase: false })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'network', connectPhase: false })).toBe(true)
  })
  it('stops exactly when the retry budget is spent', () => {
    expect(shouldRetryFailure(ctx('GET', { attempt: 2 }), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET', { attempt: 3 }), { kind: 'status', status: 503 })).toBe(false)
    expect(shouldRetryFailure(ctx('GET', { maxRetries: 0 }), { kind: 'status', status: 429 })).toBe(false)
  })
})

describe('parseRetryAfterMs', () => {
  it('parses delta-seconds', () => {
    expect(parseRetryAfterMs('3')).toBe(3000)
    expect(parseRetryAfterMs('0')).toBe(0)
    expect(parseRetryAfterMs('1.5')).toBe(1500)
  })
  it('parses an HTTP-date relative to now', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Mon, 12 Oct 2026 12:00:30 GMT', now)).toBe(30_000)
  })
  it('clamps past dates to zero', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Mon, 12 Oct 2026 11:00:00 GMT', now)).toBe(0)
  })
  it('accepts the obsolete RFC 850 date form', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Monday, 12-Oct-26 12:00:30 GMT', now)).toBe(30_000)
  })
  it('returns undefined for missing or invalid values', () => {
    expect(parseRetryAfterMs(null)).toBeUndefined()
    expect(parseRetryAfterMs('')).toBeUndefined()
    expect(parseRetryAfterMs('soon')).toBeUndefined()
  })
  it('rejects values that only look like dates or numbers', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    for (const value of ['abc 5', '-5', '+5', '.5', '1.', '2026-10-12', 'Mon Oct 12 12:00:30 2026', '9'.repeat(400)]) {
      expect(parseRetryAfterMs(value, now)).toBeUndefined()
    }
  })
})

describe('backoffDelay', () => {
  it('uses Retry-After when present, capped', () => {
    expect(backoffDelay(0, 2_000, 30_000)).toBe(2_000)
    expect(backoffDelay(0, 60_000, 30_000)).toBe(30_000)
  })
  it('uses full-jitter exponential backoff otherwise', () => {
    expect(backoffDelay(0, undefined, 30_000, () => 0.5)).toBe(100)
    expect(backoffDelay(2, undefined, 30_000, () => 0.5)).toBe(400)
    expect(backoffDelay(20, undefined, 1_000, () => 0.999)).toBe(999)
    expect(backoffDelay(0, undefined, 30_000, () => 0)).toBe(0)
  })
  it('keeps a huge attempt count under the cap', () => {
    expect(backoffDelay(5_000, undefined, 15_000, () => 0.999)).toBe(14_985)
  })
})

describe('sleep', () => {
  it('resolves after the delay and removes its abort listener', async () => {
    const controller = new AbortController()
    const started = performance.now()
    const pending = sleep(20, controller.signal)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(1)
    await pending
    expect(performance.now() - started).toBeGreaterThanOrEqual(15)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)
  })
  it('rejects promptly with the abort reason and removes its listener', async () => {
    const controller = new AbortController()
    const started = performance.now()
    const pending = sleep(5_000, controller.signal).catch((e: unknown) => e)
    setTimeout(() => controller.abort(), 10)
    const err = await pending
    expect((err as Error).name).toBe('AbortError')
    expect(performance.now() - started).toBeLessThan(1_000)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)
  })
  it('passes a custom abort reason through unchanged', async () => {
    const controller = new AbortController()
    const reason = new Error('shutting down')
    const pending = sleep(5_000, controller.signal).catch((e: unknown) => e)
    controller.abort(reason)
    expect(await pending).toBe(reason)
  })
  it('rejects immediately when already aborted', async () => {
    const controller = new AbortController()
    controller.abort()
    const err = await sleep(5_000, controller.signal).catch((e: unknown) => e)
    expect((err as Error).name).toBe('AbortError')
  })
  it('falls back to an AbortError when a signal has no reason', async () => {
    const signal = { aborted: true, reason: undefined } as unknown as AbortSignal
    const err = await sleep(5_000, signal).catch((e: unknown) => e)
    expect((err as Error).name).toBe('AbortError')
  })
  it('exposes the setTimeout ceiling', () => {
    expect(MAX_TIMER_MS).toBe(2_147_483_647)
  })
})
