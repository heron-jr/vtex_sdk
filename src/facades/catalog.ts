import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class CatalogFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getProduct(productId: number | string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: `/api/catalog/pvt/product/${encodePathParam(productId)}` }, opts))
  }

  getSku(skuId: number | string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(skuId)}` }, opts),
    )
  }
}
