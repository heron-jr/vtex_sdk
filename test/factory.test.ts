import { describe, it, expect, vi } from 'vitest'
import { createVtexFactory } from '../src/factory.js'
import { VtexAuthError, VtexRateLimitError, VtexUsageError } from '../src/core/errors.js'

const json200 = () => new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })

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

  it('takes only credentials from the resolver, never the account, environment, fetch or hooks', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(json200()))
    const evilFetch = vi.fn()
    const evilHook = vi.fn()
    const credentials = vi.fn().mockResolvedValue({
      appKey: 'K', appToken: 'T', account: 'other-tenant', environment: 'vtexcommercebeta',
      fetch: evilFetch, hooks: { onRequest: evilHook },
    })
    const factory = createVtexFactory({ credentials, fetch: fetchMock })
    const client = await factory.forAccount('tenant-a')
    expect(client.account).toBe('tenant-a')
    expect(client.environment).toBe('vtexcommercestable')
    await client.orders.get('1')
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(fetchMock.mock.calls[0][0]).toMatch(/^https:\/\/tenant-a\.vtexcommercestable\.com\.br\//)
    expect(evilFetch).not.toHaveBeenCalled()
    expect(evilHook).not.toHaveBeenCalled()
  })

  it('passes environment and maxRetryAfterMs through to the client', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response('{}', { status: 429, headers: { 'retry-after': '2' } })),
    )
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({
      credentials, fetch: fetchMock, environment: 'vtexcommercebeta', maxRetryAfterMs: 1000, maxRetries: 1,
    })
    const client = await factory.forAccount('x')
    expect(client.environment).toBe('vtexcommercebeta')
    await expect(client.orders.get('1')).rejects.toBeInstanceOf(VtexRateLimitError)
    // 2 s is above the 1 s cap but below the 30 s default: only a passed-through cap stops the retry.
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('keeps prototype hook methods (class instances) and their this', async () => {
    const seen: string[] = []
    class Telemetry {
      prefix = 't'
      onRequest() { seen.push(`${this.prefix}:request`) }
      onRetry() { seen.push(`${this.prefix}:retry`) }
      onResponse() { seen.push(`${this.prefix}:response`) }
    }
    let calls = 0
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(
        calls++ === 0 ? new Response('{}', { status: 429, headers: { 'retry-after': '0' } }) : json200(),
      ),
    )
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchMock, hooks: new Telemetry() })
    const client = await factory.forAccount('x')
    await client.orders.get('1')
    expect(seen).toEqual(['t:request', 't:response', 't:retry', 't:request', 't:response'])
  })

  it('validates the factory config up front and snapshots it', async () => {
    expect(() => createVtexFactory({ credentials: 'nope' as never })).toThrow(VtexUsageError)
    expect(() => createVtexFactory({ credentials: vi.fn(), environment: 'evil.example' as never })).toThrow(
      VtexUsageError,
    )
    const config = { credentials: vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' }) }
    const factory = createVtexFactory(config)
    Object.assign(config, { environment: 'vtexcommercebeta' })
    expect((await factory.forAccount('x')).environment).toBe('vtexcommercestable')
  })

  it('reports a non-string credential without echoing it', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: { toString: () => 'K-SECRET' }, appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const err = await factory.forAccount('x').catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexUsageError)
    expect((err as Error).message).toMatch(/appKey must be/)
    expect((err as Error).message).not.toContain('K-SECRET')
  })

  it('clear(undefined) is a no-op; clear() drops every client', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const a = await factory.forAccount('a')
    factory.clear(undefined as unknown as string) // what a JS caller with a missing param would do
    expect(await factory.forAccount('a')).toBe(a)
    factory.clear()
    expect(await factory.forAccount('a')).not.toBe(a)
  })

  it('serves a pending build to existing waiters after clear() and rebuilds for new callers', async () => {
    let release!: (v: unknown) => void
    const credentials = vi
      .fn()
      .mockImplementationOnce(() => new Promise((r) => { release = r }))
      .mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const pending = factory.forAccount('x')
    factory.clear('x')
    const fresh = factory.forAccount('x')
    release({ appKey: 'K', appToken: 'T' })
    const [old, next] = await Promise.all([pending, fresh])
    expect(old).not.toBe(next)
    expect(await factory.forAccount('x')).toBe(next)
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

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, '10' as never, null as never, Object.create(null)])(
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

  it('evicts even when the user onResponse hook throws, and only for the failing account', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) =>
      Promise.resolve(url.includes('://a.') ? new Response('{}', { status: 401 }) : json200()),
    )
    const onResponse = vi.fn(() => {
      throw new Error('hook failed')
    })
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchMock, maxRetries: 0, hooks: { onResponse } })
    const a = await factory.forAccount('a')
    const b = await factory.forAccount('b')
    await expect(a.orders.get('1')).rejects.toThrow('hook failed')
    expect(await factory.forAccount('a')).not.toBe(a)
    expect(await factory.forAccount('b')).toBe(b)
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
