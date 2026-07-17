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

  it('simulate() creates a simulation order with body forwarding', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ items: [{ id: '1', quantity: 1, seller: '1' }], country: 'BRA' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const payload = { items: [{ id: '1', quantity: 1, seller: '1' }], country: 'BRA' }
    const out = await new CheckoutFacade(http).simulate(payload)
    expect((out as any).items[0].id).toBe('1')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/checkout/pub/orderForms/simulation')
    expect(fetchMock.mock.calls[0][1].method).toBe('POST')
    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(payload))
  })
})
