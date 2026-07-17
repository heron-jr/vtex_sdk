import type { VtexHttpClient } from '../../core/http.js'
import type { DeliveryZonesSearchRequest, PickupPointsSearchRequest, DeliveryZonesResponse, PickupPointsResponse, DeliverySuggestionRequest, DeliverySuggestionResponse, ErrorResponse } from './types.js'

class DeliveryPromiseSuggestionsApi_logisticsShipping {
  constructor(private http: VtexHttpClient) {}

  postApiLogisticsShippingDeliveryZonesSearchV2(params: {
  body: DeliveryZonesSearchRequest
}): Promise<DeliveryZonesResponse> {
    return this.http.request<DeliveryZonesResponse>({ method: 'POST', path: `/api/logistics-shipping/delivery-zones/_search/v2`, body: params.body })
  }

  postApiLogisticsShippingPickuppointsSearch(params: {
  maxDistance?: number
  body: PickupPointsSearchRequest
}): Promise<PickupPointsResponse> {
    return this.http.request<PickupPointsResponse>({ method: 'POST', path: `/api/logistics-shipping/pickuppoints/_search`, query: { 'maxDistance': params.maxDistance }, body: params.body })
  }
}
class DeliveryPromiseSuggestionsApi_deliverySuggestions {
  constructor(private http: VtexHttpClient) {}

  postApiDeliveryPromiseSuggestionsSearch(params: {
  body: DeliverySuggestionRequest
}): Promise<DeliverySuggestionResponse> {
    return this.http.request<DeliverySuggestionResponse>({ method: 'POST', path: `/api/delivery-promise-suggestions/_search`, body: params.body })
  }

  getApiDeliveryPromiseSuggestions(params: {
  'products[0].productId': string
  'products[0].itemId'?: string
  deliveryZonesHash: string
  pickupsHash: string
}): Promise<DeliverySuggestionResponse> {
    return this.http.request<DeliverySuggestionResponse>({ method: 'GET', path: `/api/delivery-promise-suggestions`, query: { 'products[0].productId': params['products[0].productId'], 'products[0].itemId': params['products[0].itemId'], 'deliveryZonesHash': params.deliveryZonesHash, 'pickupsHash': params.pickupsHash } })
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
