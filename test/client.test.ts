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

  it('never prints or serializes credentials (client, facade, raw namespace)', () => {
    const c = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T-SECRET' })
    expect(inspect(c)).not.toContain('T-SECRET')
    expect(JSON.stringify(c)).toBe('{"account":"lojax","environment":"vtexcommercestable"}')
    expect(inspect(c.orders, { depth: 5 })).not.toContain('T-SECRET')
    expect(JSON.stringify(c.orders)).not.toContain('T-SECRET')
    expect(inspect(c.raw.ordersAPI, { depth: 5 })).not.toContain('T-SECRET')
    expect(JSON.stringify(c.raw.ordersAPI)).not.toContain('T-SECRET')
  })

  it('exposes request() and requestRaw() with the same safety checks', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json', 'REST-Content-Range': 'resources 0-0/1' },
      }),
    )
    const c = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const raw = await c.requestRaw<{ ok: boolean }>({
      method: 'GET', path: '/api/dataentities/CL/search', headers: { 'REST-Range': 'resources=0-0' },
    })
    expect(raw.data).toEqual({ ok: true })
    expect(raw.headers.get('REST-Content-Range')).toBe('resources 0-0/1')
    expect(fetchMock.mock.calls[0][1].headers['REST-Range']).toBe('resources=0-0')
    await expect(c.request({ method: 'GET', path: '/x', server: 'https://evil.example' })).rejects.toBeInstanceOf(
      VtexUsageError,
    )
  })
})
