import type { VtexHttpClient } from '../core/http.js'

export class LogisticsFacade {
  constructor(private readonly http: VtexHttpClient) {}

  listWarehouses(): Promise<unknown> {
    return this.http.request({ method: 'GET', path: '/api/logistics/pvt/configuration/warehouses' })
  }

  getInventoryBySku(skuId: string): Promise<unknown> {
    return this.http.request({ method: 'GET', path: `/api/logistics/pvt/inventory/skus/${encodeURIComponent(skuId)}` })
  }
}
