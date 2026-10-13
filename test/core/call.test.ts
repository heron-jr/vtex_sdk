import { describe, it, expect } from 'vitest'
import { withCall, encodePathParam } from '../../src/core/call.js'

describe('withCall', () => {
  const base = { method: 'GET', path: '/x', headers: { 'REST-Range': 'resources=0-9' } }

  it('returns the base request when there are no call options', () => {
    expect(withCall(base)).toBe(base)
  })
  it('merges headers, caller last', () => {
    expect(withCall(base, { headers: { 'REST-Range': 'resources=0-1', 'X-A': '1' } }).headers).toEqual({
      'REST-Range': 'resources=0-1', 'X-A': '1',
    })
  })
  it('copies signal, timeout, retry and idempotent', () => {
    const signal = new AbortController().signal
    const merged = withCall({ ...base, idempotent: true }, { signal, timeoutMs: 5, retry: false })
    expect(merged.signal).toBe(signal)
    expect(merged.timeoutMs).toBe(5)
    expect(merged.retry).toBe(false)
    expect(merged.idempotent).toBe(true)
  })
  it('lets the caller override a facade default', () => {
    expect(withCall({ ...base, idempotent: true }, { idempotent: false }).idempotent).toBe(false)
  })
  it('re-exports encodePathParam for generated code', () => {
    expect(encodePathParam('a/b')).toBe('a%2Fb')
  })
})
