import type { VtexHttpClient } from '../../core/http.js'
import type { Success, SuccessManifest, SuccessApproved, FailBadRequest, CancelPaymentRequest, Success1, FailGenericError1, Success2, FailGenericError2, Success3, FailGenericError3, SettlePayment, RefundPayment, InboundRequestBETARequest, RequestData, Success4, ResponseData, CreateAuthorizationTokenRequest, Success5, Success6 } from './types.js'

class PaymentProviderProtocolApi_paymentFlow {
  constructor(private http: VtexHttpClient) {}

  manifest(params: Record<string, never>): Promise<SuccessManifest> {
    return this.http.request<SuccessManifest>({ method: 'GET', path: `/manifest` })
  }

  createPayment(params: {
  body: {
  reference: string
  orderId: string
  shopperInteraction: string
  verificationOnly?: boolean
  transactionId: string
  paymentId: string
  paymentMethod: string
  paymentMethodCustomCode: string
  merchantName: string
  value: number
  referenceValue?: number
  currency: string
  installments: number
  installmentsInterestRate?: number
  installmentsValue?: number
  deviceFingerprint: string
  ipAddress?: string
  card?: {
  holder: string
  holderToken?: string
  number: string
  csc: string
  bin?: string
  numberToken?: string
  numberLength?: number
  cscToken?: string
  cscLength?: number
  expiration: {
  month: string
  year: string
}
  document?: string
  paymentOrigin?: string
  cryptogram?: string
  eci?: string
}
  miniCart: {
  shippingValue: number
  taxValue: number
  buyer: {
  id?: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  email: string
  phone: string
  isCorporate?: boolean
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  createdDate?: string
}
  shippingAddress: {
  country: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  postalCode: string
  city: string
  state: string
}
  billingAddress: {
  country: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  postalCode: string
  city: string
  state: string
}
  items: {
  id: string
  name: string
  price: number
  quantity: number
  discount: number
  deliveryType?: string
  categoryId?: string
  sellerId?: string
  taxRate?: number
  taxValue?: number
}[]
}
  recipients?: {
  id: string
  name: string
  documentType: string
  document: string
  role: string
  chargeProcessingFee?: boolean
  chargebackLiable?: boolean
  amount: number
  comissionAmount?: number
}[]
  merchantSettings?: {
  name: string
  value: string
}[]
  url: string
  inboundRequestUrl?: string
  secureProxyUrl?: string
  sandBoxMode?: boolean
  totalCartValue?: number
  callbackUrl: string
  returnUrl: string
  connectorMetadata?: {
  name: string
  value: string
}[]
}
}): Promise<SuccessApproved> {
    return this.http.request<SuccessApproved>({ method: 'POST', path: `/payments`, body: params.body })
  }

  cancelPayment(params: {
  paymentId: string
  body: CancelPaymentRequest
}): Promise<Success1> {
    return this.http.request<Success1>({ method: 'POST', path: `/payments/${params.paymentId}/cancellations`, body: params.body })
  }

  settlePayment(params: {
  paymentId: string
  body: SettlePayment
}): Promise<Success2> {
    return this.http.request<Success2>({ method: 'POST', path: `/payments/${params.paymentId}/settlements`, body: params.body })
  }

  refundPayment(params: {
  paymentId: string
  body: RefundPayment
}): Promise<Success3> {
    return this.http.request<Success3>({ method: 'POST', path: `/payments/${params.paymentId}/refunds`, body: params.body })
  }

  inboundRequestBETA(params: {
  paymentId: string
  action: string
  body: InboundRequestBETARequest
}): Promise<Success4> {
    return this.http.request<Success4>({ method: 'POST', path: `/payments/${params.paymentId}/inbound/${params.action}`, body: params.body })
  }
}
class PaymentProviderProtocolApi_configurationFlow {
  constructor(private http: VtexHttpClient) {}

  createAuthorizationToken(params: {
  body: CreateAuthorizationTokenRequest
}): Promise<Success5> {
    return this.http.request<Success5>({ method: 'POST', path: `/authorization/token`, body: params.body })
  }

  providerAuthentication(params: {
  applicationId: string
  token: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/authorization/redirect`, query: { 'applicationId': params.applicationId, 'token': params.token } })
  }

  getCredentials(params: {
  applicationId: string
  authorizationCode: string
}): Promise<Success6> {
    return this.http.request<Success6>({ method: 'GET', path: `/authorization/credentials`, query: { 'applicationId': params.applicationId, 'authorizationCode': params.authorizationCode } })
  }
}

export class PaymentProviderProtocolApi {
  readonly paymentFlow: PaymentProviderProtocolApi_paymentFlow
  readonly configurationFlow: PaymentProviderProtocolApi_configurationFlow
  constructor(http: VtexHttpClient) {
    this.paymentFlow = new PaymentProviderProtocolApi_paymentFlow(http)
    this.configurationFlow = new PaymentProviderProtocolApi_configurationFlow(http)
  }
}
