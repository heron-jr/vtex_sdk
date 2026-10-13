import { inspect } from 'node:util'
import { describe, it, expect, vi } from 'vitest'
import { VtexClient } from '../src/client.js'
import { VtexUsageError } from '../src/core/errors.js'

describe('VtexClient', () => {
  it('exposes account and a raw namespace', () => {
    const client = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T' })
    expect(client.account).toBe('lojax')
    expect(client.raw).toBeDefined()
  })

  it('routes a raw call through the injected fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ orderId: '9' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const client = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await client.raw.ordersAPI.orders.getOrder({ orderId: '9' })
    expect(out).toBeDefined()
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('exposes the ergonomic facades', () => {
    const c = new VtexClient({ account: 'x', appKey: 'K', appToken: 'T' })
    expect(c.orders).toBeDefined()
    expect(c.catalog).toBeDefined()
    expect(c.masterData).toBeDefined()
    expect(c.pricing).toBeDefined()
    expect(c.logistics).toBeDefined()
    expect(c.checkout).toBeDefined()
  })

  it('normalizes the account and exposes the environment', () => {
    const c = new VtexClient({ account: 'LojaX', appKey: 'K', appToken: 'T' })
    expect(c.account).toBe('lojax')
    expect(c.environment).toBe('vtexcommercestable')
  })

  it('keeps account and environment read-only at runtime', () => {
    const c = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T' })
    expect(() => {
      ;(c as unknown as { account: string }).account = 'other'
    }).toThrow(TypeError)
    expect(() => {
      ;(c as unknown as { environment: string }).environment = 'vtexcommercebeta'
    }).toThrow(TypeError)
    expect(c.account).toBe('lojax')
    expect(c.environment).toBe('vtexcommercestable')
  })

  it('does not expose the transport', () => {
    const c = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T' })
    expect(Object.keys(c)).not.toContain('http')
    expect((c as unknown as Record<string, unknown>)['http']).toBeUndefined()
  })

  it.each([
    ['app key', { account: 'lojax', appKey: 'K-SECRET', appToken: 'T-SECRET' }],
    ['cookie', { account: 'lojax', authCookie: 'C-SECRET' }],
  ])('never prints or serializes credentials (%s auth)', (_label, config) => {
    const c = new VtexClient(config)
    const deep = { customInspect: false, showHidden: true, depth: Infinity }
    const outputs = [
      inspect(c),
      inspect(c, deep),
      inspect(structuredClone(c), deep),
      JSON.stringify(c),
      JSON.stringify({ ...c }),
      inspect(c.orders, deep),
      JSON.stringify(c.orders),
      inspect(c.raw.ordersAPI, deep),
      JSON.stringify(c.raw.ordersAPI),
    ]
    for (const out of outputs) expect(out).not.toMatch(/[KTC]-SECRET/)
    expect(JSON.stringify(c)).toBe('{"account":"lojax","environment":"vtexcommercestable"}')
  })

  it('exposes request() and requestRaw() with the same safety checks', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json', 'REST-Content-Range': 'resources 0-0/1' },
        }),
      ),
    )
    const c = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const raw = await c.requestRaw<{ ok: boolean }>({
      method: 'GET', path: '/api/dataentities/CL/search', headers: { 'REST-Range': 'resources=0-0' },
    })
    expect(raw.status).toBe(200)
    expect(raw.data).toEqual({ ok: true })
    expect(raw.headers.get('REST-Content-Range')).toBe('resources 0-0/1')
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://lojax.vtexcommercestable.com.br/api/dataentities/CL/search')
    expect(init.headers['REST-Range']).toBe('resources=0-0')
    expect(init.headers['X-VTEX-API-AppToken']).toBe('T')
    await expect(c.request<{ ok: boolean }>({ method: 'GET', path: '/api/x' })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)

    await expect(c.request({ method: 'GET', path: '/x', server: 'https://evil.example' })).rejects.toBeInstanceOf(
      VtexUsageError,
    )
    await expect(c.request({ method: 'GET', path: '/api/../x' })).rejects.toBeInstanceOf(VtexUsageError)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
