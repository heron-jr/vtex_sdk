import type { VtexHttpClient } from '../../core/http.js'
import type { RequestSendInvoice, ResponseFulfill, RequestSendTracking, RequestUpdateTrackingStatus, RequestCancelOrderMarketplace } from './types.js'

class MarketplaceProtocolExternalSellerMarketplaceApi_externalSeller {
  constructor(private http: VtexHttpClient) {}

  sendInvoice(params: {
  marketplaceOrderId: string
  body: RequestSendInvoice
}): Promise<ResponseFulfill> {
    return this.http.request<ResponseFulfill>({ method: 'POST', path: `/pvt/orders/${params.marketplaceOrderId}/invoice`, body: params.body })
  }

  sendTrackingInformation(params: {
  marketplaceOrderId: string
  invoiceNumber: string
  body: RequestSendTracking
}): Promise<ResponseFulfill> {
    return this.http.request<ResponseFulfill>({ method: 'POST', path: `/pvt/orders/${params.marketplaceOrderId}/invoice/${params.invoiceNumber}`, body: params.body })
  }

  updateTrackingStatus(params: {
  marketplaceOrderId: string
  invoiceNumber: string
  body: RequestUpdateTrackingStatus
}): Promise<ResponseFulfill> {
    return this.http.request<ResponseFulfill>({ method: 'POST', path: `/pvt/orders/${params.marketplaceOrderId}/invoice/${params.invoiceNumber}/tracking`, body: params.body })
  }

  cancelOrderInMarketplace(params: {
  marketplaceOrderId: string
  body: RequestCancelOrderMarketplace
}): Promise<ResponseFulfill> {
    return this.http.request<ResponseFulfill>({ method: 'POST', path: `/pvt/orders/${params.marketplaceOrderId}/cancel`, body: params.body })
  }

  sendAgreement(params: {
  participantOrderId: string | number
  changeRequestId: string | number
  accountName: string
  body: {
  agreementType?: "Acknowledgment" | "Confirmation"
}
}): Promise<{
  orderId?: string
  changeRequestId?: string
  agreementType?: "Acknowledgment" | "Confirmation"
}> {
    return this.http.request<{
  orderId?: string
  changeRequestId?: string
  agreementType?: "Acknowledgment" | "Confirmation"
}>({ method: 'POST', path: `/pvt/orders/${params.participantOrderId}/changes/${params.changeRequestId}/send-agreement`, query: { 'accountName': params.accountName }, body: params.body })
  }
}

export class MarketplaceProtocolExternalSellerMarketplaceApi {
  readonly externalSeller: MarketplaceProtocolExternalSellerMarketplaceApi_externalSeller
  constructor(http: VtexHttpClient) {
    this.externalSeller = new MarketplaceProtocolExternalSellerMarketplaceApi_externalSeller(http)
  }
}
