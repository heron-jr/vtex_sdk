import { Readable } from 'node:stream'
import { describe, it, expect } from 'vitest'
import { isJsonContentType, mediaType, serializeBody } from '../../src/core/body.js'
import { VtexUsageError } from '../../src/core/errors.js'

describe('mediaType', () => {
  it('drops parameters, trims and lowercases', () => {
    expect(mediaType(' Application/JSON ; charset=UTF-8')).toBe('application/json')
  })
})

describe('isJsonContentType', () => {
  it.each([
    'application/json', 'application/json; charset=utf-8', 'APPLICATION/JSON', ' application/json ',
    'application/json ;charset=utf-8', 'application/vnd.vtex.giftcard.v1+json', 'application/problem+json',
    'application/json-patch+json',
  ])('accepts %j', (ct) => {
    expect(isJsonContentType(ct)).toBe(true)
  })
  it.each([
    'text/plain', 'application/jsonp', 'multipart/form-data', 'application/x-www-form-urlencoded', '',
    'application/json-seq', 'application/jsonl', 'text/json', 'xapplication/json', 'application/json, application/xml',
  ])('rejects %j', (ct) => {
    expect(isJsonContentType(ct)).toBe(false)
  })
})

describe('serializeBody', () => {
  it('returns no body for undefined', () => {
    expect(serializeBody(undefined)).toStrictEqual({ body: undefined, contentType: undefined })
  })
  it('JSON-encodes objects with the default content type', () => {
    expect(serializeBody({ a: 1 })).toStrictEqual({ body: '{"a":1}', contentType: 'application/json' })
  })
  it('JSON-encodes with a vendor JSON content type', () => {
    expect(serializeBody({ a: 1 }, 'application/vnd.vtex.giftcard.v1+json')).toStrictEqual({
      body: '{"a":1}', contentType: 'application/vnd.vtex.giftcard.v1+json',
    })
  })
  it('JSON-encodes a string when the content type is JSON (VTEX has bare-string JSON bodies)', () => {
    expect(serializeBody('2025-12-09T08:00:00')).toStrictEqual({ body: '"2025-12-09T08:00:00"', contentType: 'application/json' })
  })
  it('JSON-encodes falsy values and null instead of dropping them', () => {
    expect(serializeBody(0).body).toBe('0')
    expect(serializeBody(false).body).toBe('false')
    expect(serializeBody('').body).toBe('""')
    expect(serializeBody(null).body).toBe('null')
  })
  it('rejects values JSON cannot represent', () => {
    const circular: Record<string, unknown> = {}
    circular.self = circular
    expect(() => serializeBody(circular)).toThrow(VtexUsageError)
    expect(() => serializeBody(1n)).toThrow(VtexUsageError)
    expect(() => serializeBody(() => 1)).toThrow(VtexUsageError)
  })
  it('passes strings through for text content types', () => {
    expect(serializeBody('a,b', 'text/csv')).toStrictEqual({ body: 'a,b', contentType: 'text/csv' })
  })
  it('rejects non-string bodies for text and other non-JSON content types', () => {
    expect(() => serializeBody({ a: 1 }, 'text/csv')).toThrow(VtexUsageError)
    expect(() => serializeBody({ f: 'v' }, 'multipart/form-data')).toThrow(VtexUsageError)
  })
  it('form-encodes flat objects for x-www-form-urlencoded, in any case and with parameters', () => {
    const out = serializeBody({ a: '1', b: 'x y', c: 2, d: true, skip: undefined }, 'Application/X-WWW-Form-Urlencoded; charset=UTF-8')
    expect(out.contentType).toBe('Application/X-WWW-Form-Urlencoded; charset=UTF-8')
    expect(String(out.body)).toBe('a=1&b=x+y&c=2&d=true')
  })
  it('passes a pre-encoded string form body through untouched', () => {
    expect(serializeBody('a=%ff&b=c%20d', 'application/x-www-form-urlencoded')).toStrictEqual({
      body: 'a=%ff&b=c%20d', contentType: 'application/x-www-form-urlencoded',
    })
  })
  it('rejects form bodies that are not flat objects of primitives', () => {
    expect(() => serializeBody({ a: { nested: 1 } }, 'application/x-www-form-urlencoded')).toThrow(VtexUsageError)
    expect(() => serializeBody({ a: null }, 'application/x-www-form-urlencoded')).toThrow(VtexUsageError)
    expect(() => serializeBody(['a'], 'application/x-www-form-urlencoded')).toThrow(VtexUsageError)
  })
  it('passes URLSearchParams through as a form', () => {
    const params = new URLSearchParams({ a: '1' })
    const out = serializeBody(params)
    expect(out.body).toBe(params)
    expect(out.contentType).toBe('application/x-www-form-urlencoded')
  })
  it('leaves the FormData content type to fetch (multipart boundary)', () => {
    const form = new FormData()
    form.append('f', 'v')
    const out = serializeBody(form, 'multipart/form-data')
    expect(out.body).toBe(form)
    expect(out.contentType).toBeUndefined()
  })
  it('recognizes a FormData from another realm or library by its tag', () => {
    class ForeignFormData {
      get [Symbol.toStringTag]() {
        return 'FormData'
      }
    }
    const foreign = new ForeignFormData()
    const out = serializeBody(foreign, 'multipart/form-data')
    expect(out.body).toBe(foreign)
    expect(out.contentType).toBeUndefined()
  })
  it('sends Blobs as is; a declared content type wins over the Blob type', () => {
    const blob = new Blob(['x'], { type: 'text/plain' })
    expect(serializeBody(blob).body).toBe(blob)
    expect(serializeBody(blob).contentType).toBe('text/plain')
    expect(serializeBody(blob, 'text/csv').contentType).toBe('text/csv')
    expect(serializeBody(new Blob(['x'])).contentType).toBe('application/octet-stream')
  })
  it('sends binary buffers as is', () => {
    const bytes = new Uint8Array([1, 2, 3])
    expect(serializeBody(bytes)).toStrictEqual({ body: bytes, contentType: 'application/octet-stream' })
  })
  it('refuses streaming bodies, web or Node', () => {
    expect(() => serializeBody(new ReadableStream())).toThrow(VtexUsageError)
    expect(() => serializeBody(Readable.from(['a']))).toThrow(VtexUsageError)
    expect(() => serializeBody({ async *[Symbol.asyncIterator]() { yield 'a' } })).toThrow(VtexUsageError)
  })
})
