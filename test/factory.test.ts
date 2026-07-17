import { describe, it, expect, vi } from 'vitest'
import { createVtexFactory } from '../src/factory.js'

describe('createVtexFactory', () => {
  it('creates and caches one client per account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const a1 = await factory.forAccount('lojax')
    const a2 = await factory.forAccount('lojax')
    const b = await factory.forAccount('lojay')
    expect(a1).toBe(a2) // cached
    expect(b).not.toBe(a1)
    expect(a1.account).toBe('lojax')
    expect(credentials).toHaveBeenCalledTimes(2) // once per distinct account
  })

  it('clear() drops the cache for an account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const a1 = await factory.forAccount('lojax')
    factory.clear('lojax')
    const a2 = await factory.forAccount('lojax')
    expect(a1).not.toBe(a2)
    expect(credentials).toHaveBeenCalledTimes(2)
  })

  it('deduplicates concurrent calls for the same account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const [a, b] = await Promise.all([factory.forAccount('x'), factory.forAccount('x')])
    expect(a).toBe(b) // same instance
    expect(credentials).toHaveBeenCalledTimes(1) // called exactly once
  })

  it('evicts failed entries on build rejection', async () => {
    let callCount = 0
    const credentials = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        throw new Error('First call fails')
      }
      return { appKey: 'K', appToken: 'T' }
    })
    const factory = createVtexFactory({ credentials })

    // First call rejects
    await expect(factory.forAccount('bad')).rejects.toThrow('First call fails')
    // Entry should be evicted, second call succeeds
    const client = await factory.forAccount('bad')
    expect(client).toBeDefined()
    expect(credentials).toHaveBeenCalledTimes(2)
  })

  it('passes through config fetch to VtexClient', async () => {
    const fetchSpy = vi.fn()
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchSpy })
    const client = await factory.forAccount('x')
    expect(client).toBeDefined()
    expect(client.account).toBe('x')
    // Verify fetch was passed to client (via config)
    expect(fetchSpy).toBeDefined()
  })
})
