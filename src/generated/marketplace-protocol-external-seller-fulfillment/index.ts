import type { VtexHttpClient } from '../../core/http.js'
import type { FulfillmentItem, OrderPlacement, ResponseOrderPlacement, BundleItemsItem, ItemAttachment, RequestFulfillmentSimulation, ResponseFulfillmentSimulation, RequestOrderId, RepsonseOrderId, ConnectorResponses } from './types.js'

class MarketplaceProtocolExternalSellerFulfillmentApi_externalSeller {
  constructor(private http: VtexHttpClient) {}

  fulfillmentSimulation(params: {
  body: RequestFulfillmentSimulation
}): Promise<ResponseFulfillmentSimulation> {
    return this.http.request<ResponseFulfillmentSimulation>({ method: 'POST', path: `/pvt/orderForms/simulation`, body: params.body })
  }

  orderPlacement(params: {
  body: OrderPlacement
}): Promise<ResponseOrderPlacement> {
    return this.http.request<ResponseOrderPlacement>({ method: 'POST', path: `/pvt/orders`, body: params.body })
  }

  authorizeFulfillment(params: {
  sellerOrderId: string
  body: RequestOrderId
}): Promise<RepsonseOrderId> {
    return this.http.request<RepsonseOrderId>({ method: 'POST', path: `/pvt/orders/${params.sellerOrderId}/fulfill`, body: params.body })
  }

  mkpOrderCancellation(params: {
  orderId: string
  body: RequestOrderId
}): Promise<RepsonseOrderId> {
    return this.http.request<RepsonseOrderId>({ method: 'POST', path: `/pvt/orders/${params.orderId}/cancel`, body: params.body })
  }
}

export class MarketplaceProtocolExternalSellerFulfillmentApi {
  readonly externalSeller: MarketplaceProtocolExternalSellerFulfillmentApi_externalSeller
  constructor(http: VtexHttpClient) {
    this.externalSeller = new MarketplaceProtocolExternalSellerFulfillmentApi_externalSeller(http)
  }
}
