import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class PricingFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getPrice(skuId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: `/api/pricing/prices/${encodePathParam(skuId)}` }, opts))
  }

  setPrice(skuId: string, body: unknown, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'PUT', path: `/api/pricing/prices/${encodePathParam(skuId)}`, body }, opts))
  }
}
