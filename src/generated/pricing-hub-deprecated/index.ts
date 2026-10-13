import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { withCall } from '../../core/call.js'
import type { GetPricesRequestObject, Items, Response2, Item1, ConfigExternalPriceSourceRequest } from './types.js'

class PricingHubDeprecatedApi_pricingHubPrices {
  constructor(private http: VtexHttpClient) {}

  async postApiPricingHubPrices(params: {
  an: string
  body: GetPricesRequestObject
}, opts?: CallOptions): Promise<Response2> {
    return this.http.request<Response2>(withCall({ method: 'POST', path: `/api/pricing-hub/prices`, query: { 'an': params.an }, body: params.body, server: 'https://prchub.{environment}.com.br' }, opts))
  }

  async configExternalPriceSource(params: {
  an?: string
  body: ConfigExternalPriceSourceRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/pricing-hub/prices/config`, query: { 'an': params.an }, body: params.body, server: 'https://prchub.{environment}.com.br' }, opts))
  }
}

export class PricingHubDeprecatedApi {
  readonly pricingHubPrices: PricingHubDeprecatedApi_pricingHubPrices
  constructor(http: VtexHttpClient) {
    this.pricingHubPrices = new PricingHubDeprecatedApi_pricingHubPrices(http)
  }
}
