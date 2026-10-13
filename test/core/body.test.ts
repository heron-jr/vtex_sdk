import { describe, it, expect } from 'vitest'
import { isJsonContentType, serializeBody } from '../../src/core/body.js'

describe('isJsonContentType', () => {
  it.each([
    'application/json', 'application/json; charset=utf-8', 'APPLICATION/JSON',
    'application/vnd.vtex.giftcard.v1+json', 'application/problem+json',
  ])('accepts %s', (ct) => {
    expect(isJsonContentType(ct)).toBe(true)
  })
  it.each(['text/plain', 'application/jsonp', 'multipart/form-data', 'application/x-www-form-urlencoded', ''])(
    'rejects %j',
    (ct) => {
      expect(isJsonContentType(ct)).toBe(false)
    },
  )
})

describe('serializeBody', () => {
  it('returns no body for undefined', () => {
    expect(serializeBody(undefined)).toEqual({ body: undefined, contentType: undefined })
  })
  it('JSON-encodes objects with the default content type', () => {
    expect(serializeBody({ a: 1 })).toEqual({ body: '{"a":1}', contentType: 'application/json' })
  })
  it('JSON-encodes with a vendor JSON content type', () => {
    expect(serializeBody({ a: 1 }, 'application/vnd.vtex.giftcard.v1+json')).toEqual({
      body: '{"a":1}', contentType: 'application/vnd.vtex.giftcard.v1+json',
    })
  })
  it('JSON-encodes a string when the content type is JSON', () => {
    expect(serializeBody('abc')).toEqual({ body: '"abc"', contentType: 'application/json' })
  })
  it('passes strings through for text content types', () => {
    expect(serializeBody('a,b', 'text/csv')).toEqual({ body: 'a,b', contentType: 'text/csv' })
  })
  it('form-encodes plain objects for x-www-form-urlencoded', () => {
    const out = serializeBody({ a: '1', b: 'x y' }, 'application/x-www-form-urlencoded')
    expect(out.contentType).toBe('application/x-www-form-urlencoded')
    expect(String(out.body)).toBe('a=1&b=x+y')
  })
  it('passes URLSearchParams through as a form', () => {
    const params = new URLSearchParams({ a: '1' })
    expect(serializeBody(params)).toEqual({ body: params, contentType: 'application/x-www-form-urlencoded' })
  })
  it('leaves the FormData content type to fetch (multipart boundary)', () => {
    const form = new FormData()
    form.append('f', 'v')
    expect(serializeBody(form, 'multipart/form-data')).toEqual({ body: form, contentType: undefined })
  })
  it('passes Blobs through with their own type', () => {
    const blob = new Blob(['x'], { type: 'text/plain' })
    expect(serializeBody(blob)).toEqual({ body: blob, contentType: 'text/plain' })
  })
})
