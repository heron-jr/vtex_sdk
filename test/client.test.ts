import { describe, it, expect, vi } from 'vitest'
import { VtexClient } from '../src/client.js'

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
})
