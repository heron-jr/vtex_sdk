import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { CheckoutFacade } from '../../src/facades/checkout.js'

describe('CheckoutFacade', () => {
  it('getCart() reads an order form by id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ orderFormId: 'of1' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await new CheckoutFacade(http).getCart('of1')
    expect((out as any).orderFormId).toBe('of1')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/checkout/pub/orderForm/of1')
  })
})
