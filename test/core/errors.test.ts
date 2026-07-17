import { describe, it, expect } from 'vitest'
import {
  mapResponseToError, VtexAuthError, VtexNotFoundError,
  VtexValidationError, VtexRateLimitError, VtexServerError, VtexRequestError,
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
})
