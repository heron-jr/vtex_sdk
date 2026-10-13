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
})
