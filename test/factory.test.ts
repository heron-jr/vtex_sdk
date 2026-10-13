import { describe, it, expect, vi } from 'vitest'
import { createVtexFactory } from '../src/factory.js'
import { VtexAuthError, VtexUsageError } from '../src/core/errors.js'

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
    expect(a).toBe(b)
    expect(credentials).toHaveBeenCalledTimes(1)
  })

  it('evicts failed entries on build rejection', async () => {
    let callCount = 0
    const credentials = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) throw new Error('First call fails')
      return { appKey: 'K', appToken: 'T' }
    })
    const factory = createVtexFactory({ credentials })
    await expect(factory.forAccount('bad')).rejects.toThrow('First call fails')
    const client = await factory.forAccount('bad')
    expect(client).toBeDefined()
    expect(credentials).toHaveBeenCalledTimes(2)
  })

  it('passes the configured fetch through to the client', async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchSpy })
    const client = await factory.forAccount('x')
    await client.orders.get('1')
    expect(fetchSpy).toHaveBeenCalledOnce()
  })

  it('normalizes the account used as cache key', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const a = await factory.forAccount('LojaX')
    const b = await factory.forAccount('lojax')
    expect(a).toBe(b)
    expect(credentials).toHaveBeenCalledWith('lojax')
  })

  it('rejects an invalid account without calling the resolver', async () => {
    const credentials = vi.fn()
    const factory = createVtexFactory({ credentials })
    await expect(factory.forAccount('attacker.example#')).rejects.toBeInstanceOf(VtexUsageError)
    expect(credentials).not.toHaveBeenCalled()
  })

  it('takes only credentials from the resolver, never the account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T', account: 'other-tenant' })
    const factory = createVtexFactory({ credentials })
    const client = await factory.forAccount('tenant-a')
    expect(client.account).toBe('tenant-a')
  })

  it('bounds the cache, dropping the least recently used client', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, maxCachedClients: 2 })
    await factory.forAccount('a')
    await factory.forAccount('b')
    await factory.forAccount('a') // a is now the most recently used
    await factory.forAccount('c') // evicts b
    await factory.forAccount('a') // still cached
    expect(credentials).toHaveBeenCalledTimes(3)
    await factory.forAccount('b') // rebuilt
    expect(credentials).toHaveBeenCalledTimes(4)
  })

  it('keeps 100 clients by default', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    for (let i = 0; i <= 100; i++) await factory.forAccount(`loja${i}`) // 101 accounts: loja0 is dropped
    expect(credentials).toHaveBeenCalledTimes(101)
    await factory.forAccount('loja100')
    expect(credentials).toHaveBeenCalledTimes(101)
    await factory.forAccount('loja0')
    expect(credentials).toHaveBeenCalledTimes(102)
  })

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, '10' as never, null as never])(
    'rejects maxCachedClients %j',
    (maxCachedClients) => {
      expect(() => createVtexFactory({ credentials: vi.fn(), maxCachedClients })).toThrow(VtexUsageError)
    },
  )

  it('rejects a resolver that returns a non-object and does not cache the failure', async () => {
    const credentials = vi.fn().mockResolvedValueOnce(null).mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    await expect(factory.forAccount('x')).rejects.toBeInstanceOf(VtexUsageError)
    await expect(factory.forAccount('x')).resolves.toBeDefined()
  })

  it('evicts a client after an auth failure so rotated credentials are picked up', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response('{}', { status: 401, headers: { 'content-type': 'application/json' } })),
    )
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchMock, maxRetries: 0 })
    const first = await factory.forAccount('x')
    await expect(first.orders.get('1')).rejects.toBeInstanceOf(VtexAuthError)
    const second = await factory.forAccount('x')
    expect(second).not.toBe(first)
    expect(credentials).toHaveBeenCalledTimes(2)
  })

  it('evicts on 403 and still calls the user onResponse hook', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response('{}', { status: 403, headers: { 'content-type': 'application/json' } })),
    )
    const onResponse = vi.fn()
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchMock, maxRetries: 0, hooks: { onResponse } })
    const first = await factory.forAccount('x')
    await expect(first.orders.get('1')).rejects.toBeInstanceOf(VtexAuthError)
    expect(onResponse).toHaveBeenCalledWith(expect.objectContaining({ status: 403 }))
    expect(await factory.forAccount('x')).not.toBe(first)
  })

  it('does not evict a newer client when a stale one gets a 401', async () => {
    let status = 200
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response('{}', { status, headers: { 'content-type': 'application/json' } })),
    )
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchMock, maxRetries: 0 })
    const stale = await factory.forAccount('x')
    factory.clear('x')
    const fresh = await factory.forAccount('x')
    status = 401
    await expect(stale.orders.get('1')).rejects.toBeInstanceOf(VtexAuthError)
    expect(await factory.forAccount('x')).toBe(fresh)
    expect(credentials).toHaveBeenCalledTimes(2)
  })
})
