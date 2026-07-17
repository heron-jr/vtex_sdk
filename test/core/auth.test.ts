import { describe, it, expect } from 'vitest'
import { buildAuthHeaders } from '../../src/core/auth.js'

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
  it('throws when no credentials are provided', () => {
    expect(() => buildAuthHeaders({ account: 'x' })).toThrow(/credential/i)
  })
  it('throws when only appKey is provided', () => {
    expect(() => buildAuthHeaders({ account: 'x', appKey: 'K' })).toThrow(/appToken/i)
  })
})
