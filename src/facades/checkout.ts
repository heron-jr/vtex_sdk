import type { VtexHttpClient } from '../core/http.js'

export class CheckoutFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getCart(orderFormId: string): Promise<unknown> {
    return this.http.request({ method: 'GET', path: `/api/checkout/pub/orderForm/${encodeURIComponent(orderFormId)}` })
  }

  simulate(body: unknown): Promise<unknown> {
    return this.http.request({ method: 'POST', path: '/api/checkout/pub/orderForms/simulation', body })
  }
}
