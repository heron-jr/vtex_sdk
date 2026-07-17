import type { VtexHttpClient } from '../core/http.js'

export class CatalogFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getProduct(productId: number | string): Promise<unknown> {
    return this.http.request({ method: 'GET', path: `/api/catalog/pvt/product/${encodeURIComponent(String(productId))}` })
  }

  getSku(skuId: number | string): Promise<unknown> {
    return this.http.request({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodeURIComponent(String(skuId))}` })
  }
}
