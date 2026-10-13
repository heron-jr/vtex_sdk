import { describe, it, expect } from 'vitest'
import { buildAuthHeaders } from '../../src/core/auth.js'
import { VtexUsageError } from '../../src/core/errors.js'

describe('buildAuthHeaders', () => {
  it('builds appKey/appToken headers', () => {
    const h = buildAuthHeaders({ account: 'x', appKey: 'K', appToken: 'T' })
    expect(h['X-VTEX-API-AppKey']).toBe('K')
    expect(h['X-VTEX-API-AppToken']).toBe('T')
  })
  it('builds the cookie header', () => {
    const h = buildAuthHeaders({ account: 'x', authCookie: 'C' })
    expect(h['VtexIdclientAutCookie']).toBe('C')
  })
  it('throws a usage error when no credentials are provided', () => {
    expect(() => buildAuthHeaders({ account: 'x' })).toThrow(VtexUsageError)
    expect(() => buildAuthHeaders({ account: 'x' })).toThrow(/credential/i)
  })
  it('throws a usage error when only appKey is provided', () => {
    expect(() => buildAuthHeaders({ account: 'x', appKey: 'K' })).toThrow(VtexUsageError)
    expect(() => buildAuthHeaders({ account: 'x', appKey: 'K' })).toThrow(/appToken/i)
  })
  it.each(['SUPER-SECRET\nX', 'SUPER-SECRET\r\nX-Injected: 1', 'SUPER\0SECRET', ''])(
    'rejects an invalid appToken without echoing it (%j)',
    (appToken) => {
      let caught: unknown
      try {
        buildAuthHeaders({ account: 'x', appKey: 'K', appToken })
      } catch (err) {
        caught = err
      }
      expect(caught).toBeInstanceOf(VtexUsageError)
      expect(String((caught as Error).message)).not.toContain('SECRET')
      expect((caught as Error).cause).toBeUndefined()
    },
  )
  it('rejects a non-string or control-character cookie', () => {
    expect(() => buildAuthHeaders({ account: 'x', authCookie: 'a\nb' })).toThrow(VtexUsageError)
    expect(() => buildAuthHeaders({ account: 'x', authCookie: 123 as never })).toThrow(VtexUsageError)
  })
  it('strips leading/trailing whitespace such as a secret file newline', () => {
    const h = buildAuthHeaders({ account: 'x', appKey: ' K\t', appToken: 'T\n' })
    expect(h['X-VTEX-API-AppKey']).toBe('K')
    expect(h['X-VTEX-API-AppToken']).toBe('T')
    expect(buildAuthHeaders({ account: 'x', authCookie: 'C\r\n' })['VtexIdclientAutCookie']).toBe('C')
  })
  it('rejects a whitespace-only credential', () => {
    expect(() => buildAuthHeaders({ account: 'x', appKey: 'K', appToken: ' \n' })).toThrow(VtexUsageError)
  })
  it('treats blank or null app keys as unset and falls back to the cookie', () => {
    const blank = buildAuthHeaders({ account: 'x', appKey: '', appToken: '', authCookie: 'C' })
    expect(blank).toEqual({ VtexIdclientAutCookie: 'C' })
    const nulls = buildAuthHeaders({ account: 'x', appKey: null as never, appToken: null as never, authCookie: 'C' })
    expect(nulls).toEqual({ VtexIdclientAutCookie: 'C' })
  })
  it('reports missing credentials when every value is blank', () => {
    expect(() => buildAuthHeaders({ account: 'x', appKey: '', appToken: '', authCookie: '' })).toThrow(
      /No VTEX credentials/,
    )
  })
})
