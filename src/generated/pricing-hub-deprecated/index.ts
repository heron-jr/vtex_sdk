import type { VtexHttpClient } from '../../core/http.js'
import type { GetPricesRequestObject, Items, Response2, Item1, ConfigExternalPriceSourceRequest } from './types.js'

class PricingHubDeprecatedApi_pricingHubPrices {
  constructor(private http: VtexHttpClient) {}

  postApiPricingHubPrices(params: {
  an: string
  body: GetPricesRequestObject
}): Promise<Response2> {
    return this.http.request<Response2>({ method: 'POST', path: `/api/pricing-hub/prices`, query: { 'an': params.an }, body: params.body })
  }

  configExternalPriceSource(params: {
  an?: string
  body: ConfigExternalPriceSourceRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/pricing-hub/prices/config`, query: { 'an': params.an }, body: params.body })
  }
}

export class PricingHubDeprecatedApi {
  readonly pricingHubPrices: PricingHubDeprecatedApi_pricingHubPrices
  constructor(http: VtexHttpClient) {
    this.pricingHubPrices = new PricingHubDeprecatedApi_pricingHubPrices(http)
  }
}
