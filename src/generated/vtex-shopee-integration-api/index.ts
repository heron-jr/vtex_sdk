import type { VtexHttpClient } from '../../core/http.js'
import type { CancelSuccessResponse, ShopeeOrderHookRequest, ShippingLabelDownloadResponse } from './types.js'

class VtexShopeeIntegrationApi_shopeeOrders {
  constructor(private http: VtexHttpClient) {}

  getApiShopeeintegrationOrderShippingLabel(params: {
  an: string
  shopeeOrderId: string
}): Promise<ShippingLabelDownloadResponse> {
    return this.http.request<ShippingLabelDownloadResponse>({ method: 'GET', path: `/api/shopeeintegration/order/shipping/label`, query: { 'an': params.an, 'shopeeOrderId': params.shopeeOrderId } })
  }
}
class VtexShopeeIntegrationApi_vtexOrderCallbacks {
  constructor(private http: VtexHttpClient) {}

  postApiShopeeintegrationByAccountNamePubOrdersByMktplaceOrderIdCancelDelivery(params: {
  accountName: string
  mktplaceOrderId: string
}): Promise<CancelSuccessResponse> {
    return this.http.request<CancelSuccessResponse>({ method: 'POST', path: `/api/shopeeintegration/${params.accountName}/pub/orders/${params.mktplaceOrderId}/cancelDelivery` })
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
