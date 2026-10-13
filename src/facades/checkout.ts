import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class CheckoutFacade {
  constructor(private readonly http: VtexHttpClient) {}

  async getCart(orderFormId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'GET', path: `/api/checkout/pub/orderForm/${encodePathParam(orderFormId)}` }, opts),
    )
  }

  /** A read-like POST, so it is retried like a GET unless the caller overrides `idempotent`. */
  async simulate(body: unknown, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'POST', path: '/api/checkout/pub/orderForms/simulation', body, idempotent: true }, opts),
    )
  }
}
