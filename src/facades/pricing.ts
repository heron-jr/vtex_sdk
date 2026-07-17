import type { VtexHttpClient } from '../core/http.js'

export class PricingFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getPrice(skuId: string): Promise<unknown> {
    return this.http.request({ method: 'GET', path: `/api/pricing/prices/${encodeURIComponent(skuId)}` })
  }

  setPrice(skuId: string, body: unknown): Promise<unknown> {
    return this.http.request({ method: 'PUT', path: `/api/pricing/prices/${encodeURIComponent(skuId)}`, body })
  }
}
