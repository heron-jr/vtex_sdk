import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { CancelSuccessResponse, ShopeeOrderHookRequest, ShippingLabelDownloadResponse } from './types.js'

class VtexShopeeIntegrationApi_shopeeOrders {
  constructor(private http: VtexHttpClient) {}

  async getApiShopeeintegrationOrderShippingLabel(params: {
  an: string
  shopeeOrderId: string
}, opts?: CallOptions): Promise<ShippingLabelDownloadResponse> {
    return this.http.request<ShippingLabelDownloadResponse>(withCall({ method: 'GET', path: `/api/shopeeintegration/order/shipping/label`, query: { 'an': params.an, 'shopeeOrderId': params.shopeeOrderId } }, opts))
  }
}
class VtexShopeeIntegrationApi_vtexOrderCallbacks {
  constructor(private http: VtexHttpClient) {}

  async postApiShopeeintegrationByAccountNamePubOrdersByMktplaceOrderIdCancelDelivery(params: {
  accountName: string
  mktplaceOrderId: string
}, opts?: CallOptions): Promise<CancelSuccessResponse> {
    return this.http.request<CancelSuccessResponse>(withCall({ method: 'POST', path: `/api/shopeeintegration/${encodePathParam(params.accountName)}/pub/orders/${encodePathParam(params.mktplaceOrderId)}/cancelDelivery` }, opts))
  }
}

export class VtexShopeeIntegrationApi {
  readonly shopeeOrders: VtexShopeeIntegrationApi_shopeeOrders
  readonly vtexOrderCallbacks: VtexShopeeIntegrationApi_vtexOrderCallbacks
  constructor(http: VtexHttpClient) {
    this.shopeeOrders = new VtexShopeeIntegrationApi_shopeeOrders(http)
    this.vtexOrderCallbacks = new VtexShopeeIntegrationApi_vtexOrderCallbacks(http)
  }
}
