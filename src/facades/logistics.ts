import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class LogisticsFacade {
  constructor(private readonly http: VtexHttpClient) {}

  listWarehouses(opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: '/api/logistics/pvt/configuration/warehouses' }, opts))
  }

  getInventoryBySku(skuId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/skus/${encodePathParam(skuId)}` }, opts),
    )
  }
}
