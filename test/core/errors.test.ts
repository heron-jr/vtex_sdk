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
