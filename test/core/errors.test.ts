import { inspect } from 'node:util'
import { describe, it, expect, vi } from 'vitest'
import {
  mapResponseToError, VtexAuthError, VtexNotFoundError,
  VtexValidationError, VtexRateLimitError, VtexServerError, VtexRequestError,
  VtexError, VtexNetworkError, VtexTimeoutError, VtexUsageError,
  VtexPaginationLimitError, VtexUnexpectedResponseError,
} from '../../src/core/errors.js'

const h = (init: Record<string, string> = {}) => new Headers(init)

describe('mapResponseToError', () => {
  it('maps 401/403 to VtexAuthError', () => {
    expect(mapResponseToError(401, {}, h())).toBeInstanceOf(VtexAuthError)
    expect(mapResponseToError(403, {}, h())).toBeInstanceOf(VtexAuthError)
  })
  it('maps 404 to VtexNotFoundError', () => {
    expect(mapResponseToError(404, {}, h())).toBeInstanceOf(VtexNotFoundError)
  })
  it('maps 400/422 to VtexValidationError', () => {
    expect(mapResponseToError(400, {}, h())).toBeInstanceOf(VtexValidationError)
    expect(mapResponseToError(422, {}, h())).toBeInstanceOf(VtexValidationError)
  })
  it('maps 429 to VtexRateLimitError with retryAfter from header', () => {
    const err = mapResponseToError(429, {}, h({ 'Retry-After': '30' })) as VtexRateLimitError
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect(err.retryAfter).toBe(30)
  })
  it('maps 5xx to VtexServerError', () => {
    expect(mapResponseToError(500, {}, h())).toBeInstanceOf(VtexServerError)
    expect(mapResponseToError(503, {}, h())).toBeInstanceOf(VtexServerError)
  })
  it('carries status, body and requestId', () => {
    const err = mapResponseToError(400, { error: 'bad' }, h({ 'x-request-id': 'abc' }))
    expect(err.status).toBe(400)
    expect(err.body).toEqual({ error: 'bad' })
    expect(err.requestId).toBe('abc')
    expect(err).toBeInstanceOf(VtexRequestError)
  })
  it('requestId falls back to x-vtex-request-id when x-request-id is absent', () => {
    const err = mapResponseToError(400, {}, h({ 'x-vtex-request-id': 'vtex-123' }))
    expect(err.requestId).toBe('vtex-123')
  })
  it('429 with no Retry-After header yields retryAfter as undefined', () => {
    const err = mapResponseToError(429, {}, h()) as VtexRateLimitError
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect(err.retryAfter).toBeUndefined()
  })
  it('429 with non-numeric Retry-After header yields retryAfter as undefined', () => {
    const err = mapResponseToError(429, {}, h({ 'Retry-After': 'abc' })) as VtexRateLimitError
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect(err.retryAfter).toBeUndefined()
  })
  it('converts delta-seconds Retry-After to whole seconds, rounding up', () => {
    const retryAfter = (value: string) => (mapResponseToError(429, {}, h({ 'Retry-After': value })) as VtexRateLimitError).retryAfter
    expect(retryAfter('1.5')).toBe(2)
    expect(retryAfter('0')).toBe(0)
  })
  it('parses an HTTP-date Retry-After into seconds', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-12T12:00:00Z'))
    try {
      const retryAfter = (value: string) => (mapResponseToError(429, {}, h({ 'Retry-After': value })) as VtexRateLimitError).retryAfter
      expect(retryAfter('Mon, 12 Oct 2026 12:00:10 GMT')).toBe(10)
      expect(retryAfter('Mon, 12 Oct 2026 11:00:00 GMT')).toBe(0)
    } finally {
      vi.useRealTimers()
    }
  })
  it('ignores Retry-After values that are neither delta-seconds nor an HTTP-date', () => {
    for (const value of ['abc 5', '-5', '.5', '2026-10-12', '9'.repeat(400)]) {
      expect((mapResponseToError(429, {}, h({ 'Retry-After': value })) as VtexRateLimitError).retryAfter).toBeUndefined()
    }
  })
  it('unmapped status code (405) maps to plain VtexRequestError, not a subclass', () => {
    const err = mapResponseToError(405, {}, h())
    expect(err).toBeInstanceOf(VtexRequestError)
    expect(err).not.toBeInstanceOf(VtexAuthError)
    expect(err).not.toBeInstanceOf(VtexNotFoundError)
    expect(err).not.toBeInstanceOf(VtexValidationError)
    expect(err).not.toBeInstanceOf(VtexRateLimitError)
    expect(err).not.toBeInstanceOf(VtexServerError)
    expect(err.constructor.name).toBe('VtexRequestError')
  })
  it('each error class reports its own name', () => {
    expect(mapResponseToError(401, {}, h()).name).toBe('VtexAuthError')
    expect(mapResponseToError(404, {}, h()).name).toBe('VtexNotFoundError')
    expect(mapResponseToError(400, {}, h()).name).toBe('VtexValidationError')
    expect(mapResponseToError(429, {}, h()).name).toBe('VtexRateLimitError')
    expect(mapResponseToError(500, {}, h()).name).toBe('VtexServerError')
    expect(mapResponseToError(405, {}, h()).name).toBe('VtexRequestError')
  })
})

describe('error hierarchy', () => {
  it('every SDK error extends VtexError', () => {
    const net = { cause: new Error('c'), method: 'GET', route: '/r', attempts: 1 }
    expect(mapResponseToError(404, {}, h())).toBeInstanceOf(VtexError)
    expect(new VtexNetworkError('x', net)).toBeInstanceOf(VtexError)
    expect(new VtexTimeoutError('x', net)).toBeInstanceOf(VtexNetworkError)
    expect(new VtexUsageError('x')).toBeInstanceOf(VtexError)
    expect(new VtexPaginationLimitError('x')).toBeInstanceOf(VtexError)
    expect(new VtexUnexpectedResponseError('x', [])).toBeInstanceOf(VtexError)
  })

  it('network errors carry cause, method, route and attempts', () => {
    const cause = new Error('socket hang up')
    const err = new VtexNetworkError('failed', { cause, method: 'POST', route: '/api/x', attempts: 3 })
    expect(err.cause).toBe(cause)
    expect(err.method).toBe('POST')
    expect(err.route).toBe('/api/x')
    expect(err.attempts).toBe(3)
    expect(err.name).toBe('VtexNetworkError')
    expect(new VtexTimeoutError('t', { cause, method: 'GET', route: '/r', attempts: 1 }).name).toBe('VtexTimeoutError')
  })

  it('keeps the response body readable but out of default serialization', () => {
    const err = mapResponseToError(400, { email: 'shopper@example.com' }, h())
    expect(err.body).toEqual({ email: 'shopper@example.com' })
    expect(Object.keys(err)).not.toContain('body')
    expect(JSON.stringify(err)).not.toContain('shopper@example.com')
    expect(inspect(err)).not.toContain('shopper@example.com')
  })

  it('VtexUnexpectedResponseError hides its body the same way', () => {
    const err = new VtexUnexpectedResponseError('bad', { email: 'shopper@example.com' })
    expect(err.body).toEqual({ email: 'shopper@example.com' })
    expect(JSON.stringify(err)).not.toContain('shopper@example.com')
  })
})
