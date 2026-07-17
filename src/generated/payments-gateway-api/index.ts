import type { VtexHttpClient } from '../../core/http.js'
import type { ValidRequest, Installment, Payment, Self, Option, InvalidRequestValue, InsertAffiliationRequest, UpdateAffiliationRequest, AffiliationResponse, GetRulesResponse, RulesRequest, InsertRuleRequest, SalesChannel, PaymentSystem, Connector, Issuer, Antifraud, PaymentSystemsResponse, Validator, _1CreateanewtransactionRequest, StartTransactionResponse, Interactions, Settlements, Payments, Refunds, Cancellations, Capabilities, Field, Fields, Transaction, Fields1, _2SendPaymentsPublicRequest, _2SendPaymentsWithSavedCreditCardRequest, Fields3, _4DoauthorizationRequest, TransactionDetailsResponse, TransactionInteractionsResponse, PaymentDetailsResponse, TransactionSettlementDetails, Request, Action, Payment1, SettlethetransactionRequest, SettleResponse, RefundthetransactionRequest, CancelthetransactionRequest, NotifyPaymentRequest } from './types.js'

class PaymentsGatewayApi_installments {
  constructor(private http: VtexHttpClient) {}

  installmentsoptions(params: {
  'request.value': number
  'request.salesChannel'?: number
  'request.paymentDetails[0].id'?: number
  'request.paymentDetails[0].value'?: number
  'request.paymentDetails[0].bin'?: number
}): Promise<ValidRequest> {
    return this.http.request<ValidRequest>({ method: 'GET', path: `/api/pvt/installments`, query: { 'request.value': params['request.value'], 'request.salesChannel': params['request.salesChannel'], 'request.paymentDetails[0].id': params['request.paymentDetails[0].id'], 'request.paymentDetails[0].value': params['request.paymentDetails[0].value'], 'request.paymentDetails[0].bin': params['request.paymentDetails[0].bin'] } })
  }
}
class PaymentsGatewayApi_configuration {
  constructor(private http: VtexHttpClient) {}

  affiliations(params: Record<string, never>): Promise<{
  id?: string
  implementation?: string
  name?: string
  configuration?: {
  name: string
  value: string
  valueKey: string
}[]
  isdelivered?: boolean
  isConfigured?: boolean
}[]> {
    return this.http.request<{
  id?: string
  implementation?: string
  name?: string
  configuration?: {
  name: string
  value: string
  valueKey: string
}[]
  isdelivered?: boolean
  isConfigured?: boolean
}[]>({ method: 'GET', path: `/api/pvt/affiliations` })
  }

  insertAffiliation(params: {
  body: InsertAffiliationRequest
}): Promise<AffiliationResponse> {
    return this.http.request<AffiliationResponse>({ method: 'POST', path: `/api/pvt/affiliations`, body: params.body })
  }

  affiliationById(params: {
  affiliationId: string
}): Promise<AffiliationResponse> {
    return this.http.request<AffiliationResponse>({ method: 'GET', path: `/api/pvt/affiliations/${params.affiliationId}` })
  }

  updateAffiliation(params: {
  affiliationId: string
  body: UpdateAffiliationRequest
}): Promise<AffiliationResponse> {
    return this.http.request<AffiliationResponse>({ method: 'PUT', path: `/api/pvt/affiliations/${params.affiliationId}`, body: params.body })
  }

  rules(params: Record<string, never>): Promise<GetRulesResponse> {
    return this.http.request<GetRulesResponse>({ method: 'GET', path: `/api/pvt/rules` })
  }

  insertRule(params: {
  body: InsertRuleRequest
}): Promise<RulesRequest> {
    return this.http.request<RulesRequest>({ method: 'POST', path: `/api/pvt/rules`, body: params.body })
  }

  ruleById(params: {
  ruleId: string
}): Promise<RulesRequest> {
    return this.http.request<RulesRequest>({ method: 'GET', path: `/api/pvt/rules/${params.ruleId}` })
  }

  putRuleById(params: {
  ruleId: string
  body: RulesRequest
}): Promise<RulesRequest> {
    return this.http.request<RulesRequest>({ method: 'PUT', path: `/api/pvt/rules/${params.ruleId}`, body: params.body })
  }

  rule(params: {
  ruleId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/pvt/rules/${params.ruleId}` })
  }

  availablePaymentMethods(params: {
  salesChannel?: number
}): Promise<PaymentSystemsResponse[]> {
    return this.http.request<PaymentSystemsResponse[]>({ method: 'GET', path: `/api/pvt/merchants/payment-systems`, query: { 'salesChannel': params.salesChannel } })
  }

  getCardTokenById(params: {
  cardId: string
}): Promise<{
  bin?: string
  lastDigits?: string
  expiryMonth?: string
  expiryYear?: string
  mask?: string
  paymentSystem?: number
  paymentSystemName?: string
  address?: {
  addressType?: "Residential" | "Commercial"
  addressId?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string
}
  document?: string
  tokens?: {
  providerId?: string
  type?: "FILE" | "TOKEN_CLIENT_ID" | "TOKEN_VALUE"
  value?: string
  expiration?: string
  label?: string
  href?: string
  providerCardTokenId?: string
  useCvvForAuthorization?: boolean
  extraData?: {
  customField1?: string
}
}
}> {
    return this.http.request<{
  bin?: string
  lastDigits?: string
  expiryMonth?: string
  expiryYear?: string
  mask?: string
  paymentSystem?: number
  paymentSystemName?: string
  address?: {
  addressType?: "Residential" | "Commercial"
  addressId?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string
}
  document?: string
  tokens?: {
  providerId?: string
  type?: "FILE" | "TOKEN_CLIENT_ID" | "TOKEN_VALUE"
  value?: string
  expiration?: string
  label?: string
  href?: string
  providerCardTokenId?: string
  useCvvForAuthorization?: boolean
  extraData?: {
  customField1?: string
}
}
}>({ method: 'GET', path: `/api/payments/pvt/account/${params.cardId}` })
  }
}
class PaymentsGatewayApi_transactionProcess {
  constructor(private http: VtexHttpClient) {}

  _1Createanewtransaction(params: {
  body: _1CreateanewtransactionRequest
}): Promise<StartTransactionResponse> {
    return this.http.request<StartTransactionResponse>({ method: 'POST', path: `/api/pvt/transactions`, body: params.body })
  }

  _2SendPaymentsPublic(params: {
  transactionId: string
  an: string
  orderId: string
  body: _2SendPaymentsPublicRequest[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/payments/transactions/${params.transactionId}/payments`, query: { 'an': params.an, 'orderId': params.orderId }, body: params.body })
  }

  _3SendAdditionalData(params: {
  transactionId: string
  body: {
  name: string
  value: string
}[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/pvt/transactions/${params.transactionId}/additional-data`, body: params.body })
  }

  _31UpdateAdditionalData(params: {
  transactionId: string
  body: {
  name: string
  value: string
}[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/pvt/transactions/${params.transactionId}/additional-data`, body: params.body })
  }

  _4Doauthorization(params: {
  transactionId: string
  body: _4DoauthorizationRequest
}): Promise<SettleResponse> {
    return this.http.request<SettleResponse>({ method: 'POST', path: `/api/pvt/transactions/${params.transactionId}/authorization-request`, body: params.body })
  }

  transactionDetails(params: {
  transactionId: string
}): Promise<TransactionDetailsResponse> {
    return this.http.request<TransactionDetailsResponse>({ method: 'GET', path: `/api/pvt/transactions/${params.transactionId}` })
  }

  paymentDetails(params: {
  transactionId: string
  paymentId: string
}): Promise<PaymentDetailsResponse> {
    return this.http.request<PaymentDetailsResponse>({ method: 'GET', path: `/api/pvt/transactions/${params.transactionId}/payments/${params.paymentId}` })
  }

  transactionSettlementDetails(params: {
  transactionId: string
}): Promise<TransactionSettlementDetails> {
    return this.http.request<TransactionSettlementDetails>({ method: 'GET', path: `/api/pvt/transactions/${params.transactionId}/settlements` })
  }
}
class PaymentsGatewayApi_transactionFlow {
  constructor(private http: VtexHttpClient) {}

  settlethetransaction(params: {
  transactionId: string
  body: SettlethetransactionRequest
}): Promise<SettleResponse> {
    return this.http.request<SettleResponse>({ method: 'POST', path: `/api/pvt/transactions/${params.transactionId}/settlement-request`, body: params.body })
  }

  refundthetransaction(params: {
  transactionId: string
  body: RefundthetransactionRequest
}): Promise<SettleResponse> {
    return this.http.request<SettleResponse>({ method: 'POST', path: `/api/pvt/transactions/${params.transactionId}/refunding-request`, body: params.body })
  }

  cancelthetransaction(params: {
  transactionId: string
  body: CancelthetransactionRequest
}): Promise<SettleResponse> {
    return this.http.request<SettleResponse>({ method: 'POST', path: `/api/pvt/transactions/${params.transactionId}/cancellation-request`, body: params.body })
  }
}
class PaymentsGatewayApi_paymentNotification {
  constructor(private http: VtexHttpClient) {}

  getApiPaymentsPvtPaymentsByPaymentIdPaymentNotification(params: {
  paymentId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/payments/pvt/payments/${params.paymentId}/payment-notification` })
  }

  postApiPaymentsPvtPaymentsByPaymentIdPaymentNotification(params: {
  paymentId: string
  body: NotifyPaymentRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/payments/pvt/payments/${params.paymentId}/payment-notification`, body: params.body })
  }
}

export class PaymentsGatewayApi {
  readonly installments: PaymentsGatewayApi_installments
  readonly configuration: PaymentsGatewayApi_configuration
  readonly transactionProcess: PaymentsGatewayApi_transactionProcess
  readonly transactionFlow: PaymentsGatewayApi_transactionFlow
  readonly paymentNotification: PaymentsGatewayApi_paymentNotification
  constructor(http: VtexHttpClient) {
    this.installments = new PaymentsGatewayApi_installments(http)
    this.configuration = new PaymentsGatewayApi_configuration(http)
    this.transactionProcess = new PaymentsGatewayApi_transactionProcess(http)
    this.transactionFlow = new PaymentsGatewayApi_transactionFlow(http)
    this.paymentNotification = new PaymentsGatewayApi_paymentNotification(http)
  }
}
