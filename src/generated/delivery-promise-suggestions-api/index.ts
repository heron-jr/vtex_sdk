import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { withCall } from '../../core/call.js'
import type { DeliveryZonesSearchRequest, PickupPointsSearchRequest, DeliveryZonesResponse, PickupPointsResponse, DeliverySuggestionRequest, DeliverySuggestionResponse, ErrorResponse } from './types.js'

class DeliveryPromiseSuggestionsApi_logisticsShipping {
  constructor(private http: VtexHttpClient) {}

  postApiLogisticsShippingDeliveryZonesSearchV2(params: {
  body: DeliveryZonesSearchRequest
}, opts?: CallOptions): Promise<DeliveryZonesResponse> {
    return this.http.request<DeliveryZonesResponse>(withCall({ method: 'POST', path: `/api/logistics-shipping/delivery-zones/_search/v2`, body: params.body }, opts))
  }

  postApiLogisticsShippingPickuppointsSearch(params: {
  maxDistance?: number
  body: PickupPointsSearchRequest
}, opts?: CallOptions): Promise<PickupPointsResponse> {
    return this.http.request<PickupPointsResponse>(withCall({ method: 'POST', path: `/api/logistics-shipping/pickuppoints/_search`, query: { 'maxDistance': params.maxDistance }, body: params.body }, opts))
  }
}
class DeliveryPromiseSuggestionsApi_deliverySuggestions {
  constructor(private http: VtexHttpClient) {}

  postApiDeliveryPromiseSuggestionsSearch(params: {
  body: DeliverySuggestionRequest
}, opts?: CallOptions): Promise<DeliverySuggestionResponse> {
    return this.http.request<DeliverySuggestionResponse>(withCall({ method: 'POST', path: `/api/delivery-promise-suggestions/_search`, body: params.body }, opts))
  }

  getApiDeliveryPromiseSuggestions(params: {
  'products[0].productId': string
  'products[0].itemId'?: string
  deliveryZonesHash: string
  pickupsHash: string
}, opts?: CallOptions): Promise<DeliverySuggestionResponse> {
    return this.http.request<DeliverySuggestionResponse>(withCall({ method: 'GET', path: `/api/delivery-promise-suggestions`, query: { 'products[0].productId': params['products[0].productId'], 'products[0].itemId': params['products[0].itemId'], 'deliveryZonesHash': params.deliveryZonesHash, 'pickupsHash': params.pickupsHash } }, opts))
  }
}

export class DeliveryPromiseSuggestionsApi {
  readonly logisticsShipping: DeliveryPromiseSuggestionsApi_logisticsShipping
  readonly deliverySuggestions: DeliveryPromiseSuggestionsApi_deliverySuggestions
  constructor(http: VtexHttpClient) {
    this.logisticsShipping = new DeliveryPromiseSuggestionsApi_logisticsShipping(http)
    this.deliverySuggestions = new DeliveryPromiseSuggestionsApi_deliverySuggestions(http)
  }
}
