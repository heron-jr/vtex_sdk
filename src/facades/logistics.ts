import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class LogisticsFacade {
  constructor(private readonly http: VtexHttpClient) {}

  async listWarehouses(opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: '/api/logistics/pvt/configuration/warehouses' }, opts))
  }

  async getInventoryBySku(skuId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/skus/${encodePathParam(skuId)}` }, opts),
    )
  }
}
