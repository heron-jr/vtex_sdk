import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { PricingFacade } from '../../src/facades/pricing.js'

describe('PricingFacade', () => {
  it('getPrice() reads a SKU price', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ costPrice: 10 }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await new PricingFacade(http).getPrice('42')
    expect((out as any).costPrice).toBe(10)
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/pricing/prices/42')
  })

  it('setPrice() updates a SKU price with body forwarding', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ costPrice: 1000, basePrice: 1200 }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const payload = { costPrice: 1000, basePrice: 1200 }
    const out = await new PricingFacade(http).setPrice('42', payload)
    expect((out as any).costPrice).toBe(1000)
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/pricing/prices/42')
    expect(fetchMock.mock.calls[0][1].method).toBe('PUT')
    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(payload))
  })
})
