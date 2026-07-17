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
})
