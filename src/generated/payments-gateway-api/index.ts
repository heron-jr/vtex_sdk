import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { ValidRequest, Installment, Payment, Self, Option, InvalidRequestValue, InsertAffiliationRequest, UpdateAffiliationRequest, AffiliationResponse, GetRulesResponse, RulesRequest, InsertRuleRequest, SalesChannel, PaymentSystem, Connector, Issuer, Antifraud, PaymentSystemsResponse, Validator, _1CreateanewtransactionRequest, StartTransactionResponse, Interactions, Settlements, Payments, Refunds, Cancellations, Capabilities, Field, Fields, Transaction, Fields1, _2SendPaymentsPublicRequest, _2SendPaymentsWithSavedCreditCardRequest, Fields3, _4DoauthorizationRequest, TransactionDetailsResponse, TransactionInteractionsResponse, PaymentDetailsResponse, TransactionSettlementDetails, Request, Action, Payment1, SettlethetransactionRequest, SettleResponse, RefundthetransactionRequest, CancelthetransactionRequest, NotifyPaymentRequest } from './types.js'

class PaymentsGatewayApi_installments {
  constructor(private http: VtexHttpClient) {}

  installmentsoptions(params: {
  'request.value': number
  'request.salesChannel'?: number
  'request.paymentDetails[0].id'?: number
  'request.paymentDetails[0].value'?: number
  'request.paymentDetails[0].bin'?: number
}, opts?: CallOptions): Promise<ValidRequest> {
    return this.http.request<ValidRequest>(withCall({ method: 'GET', path: `/api/pvt/installments`, query: { 'request.value': params['request.value'], 'request.salesChannel': params['request.salesChannel'], 'request.paymentDetails[0].id': params['request.paymentDetails[0].id'], 'request.paymentDetails[0].value': params['request.paymentDetails[0].value'], 'request.paymentDetails[0].bin': params['request.paymentDetails[0].bin'] }, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }
}
class PaymentsGatewayApi_configuration {
  constructor(private http: VtexHttpClient) {}

  affiliations(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  id?: string
  implementation?: string
  name?: string
  configuration?: {
  name: string
  value: string | null
  valueKey: string | null
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
  value: string | null
  valueKey: string | null
}[]
  isdelivered?: boolean
  isConfigured?: boolean
}[]>(withCall({ method: 'GET', path: `/api/pvt/affiliations`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  insertAffiliation(params: {
  body: InsertAffiliationRequest
}, opts?: CallOptions): Promise<AffiliationResponse> {
    return this.http.request<AffiliationResponse>(withCall({ method: 'POST', path: `/api/pvt/affiliations`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  affiliationById(params: {
  affiliationId: string
}, opts?: CallOptions): Promise<AffiliationResponse> {
    return this.http.request<AffiliationResponse>(withCall({ method: 'GET', path: `/api/pvt/affiliations/${encodePathParam(params.affiliationId)}`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  updateAffiliation(params: {
  affiliationId: string
  body: UpdateAffiliationRequest
}, opts?: CallOptions): Promise<AffiliationResponse> {
    return this.http.request<AffiliationResponse>(withCall({ method: 'PUT', path: `/api/pvt/affiliations/${encodePathParam(params.affiliationId)}`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  rules(params: Record<string, never> = {}, opts?: CallOptions): Promise<GetRulesResponse> {
    return this.http.request<GetRulesResponse>(withCall({ method: 'GET', path: `/api/pvt/rules`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  insertRule(params: {
  body: InsertRuleRequest
}, opts?: CallOptions): Promise<RulesRequest> {
    return this.http.request<RulesRequest>(withCall({ method: 'POST', path: `/api/pvt/rules`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  ruleById(params: {
  ruleId: string
}, opts?: CallOptions): Promise<RulesRequest> {
    return this.http.request<RulesRequest>(withCall({ method: 'GET', path: `/api/pvt/rules/${encodePathParam(params.ruleId)}`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  putRuleById(params: {
  ruleId: string
  body: RulesRequest
}, opts?: CallOptions): Promise<RulesRequest> {
    return this.http.request<RulesRequest>(withCall({ method: 'PUT', path: `/api/pvt/rules/${encodePathParam(params.ruleId)}`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  rule(params: {
  ruleId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/pvt/rules/${encodePathParam(params.ruleId)}`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  availablePaymentMethods(params: {
  salesChannel?: number
} = {}, opts?: CallOptions): Promise<PaymentSystemsResponse[]> {
    return this.http.request<PaymentSystemsResponse[]>(withCall({ method: 'GET', path: `/api/pvt/merchants/payment-systems`, query: { 'salesChannel': params.salesChannel }, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  getCardTokenById(params: {
  cardId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/payments/pvt/account/${encodePathParam(params.cardId)}`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }
}
class PaymentsGatewayApi_transactionProcess {
  constructor(private http: VtexHttpClient) {}

  _1Createanewtransaction(params: {
  body: _1CreateanewtransactionRequest
}, opts?: CallOptions): Promise<StartTransactionResponse> {
    return this.http.request<StartTransactionResponse>(withCall({ method: 'POST', path: `/api/pvt/transactions`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  _3SendAdditionalData(params: {
  transactionId: string
  body: {
  name: string
  value: string
}[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/additional-data`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  _31UpdateAdditionalData(params: {
  transactionId: string
  body: {
  name: string
  value: string
}[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/additional-data`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  _4Doauthorization(params: {
  transactionId: string
  body: _4DoauthorizationRequest
}, opts?: CallOptions): Promise<SettleResponse> {
    return this.http.request<SettleResponse>(withCall({ method: 'POST', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/authorization-request`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  transactionDetails(params: {
  transactionId: string
}, opts?: CallOptions): Promise<TransactionDetailsResponse> {
    return this.http.request<TransactionDetailsResponse>(withCall({ method: 'GET', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  paymentDetails(params: {
  transactionId: string
  paymentId: string
}, opts?: CallOptions): Promise<PaymentDetailsResponse> {
    return this.http.request<PaymentDetailsResponse>(withCall({ method: 'GET', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/payments/${encodePathParam(params.paymentId)}`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  transactionSettlementDetails(params: {
  transactionId: string
}, opts?: CallOptions): Promise<TransactionSettlementDetails> {
    return this.http.request<TransactionSettlementDetails>(withCall({ method: 'GET', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/settlements`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }
}
class PaymentsGatewayApi_transactionFlow {
  constructor(private http: VtexHttpClient) {}

  settlethetransaction(params: {
  transactionId: string
  body: SettlethetransactionRequest
}, opts?: CallOptions): Promise<SettleResponse> {
    return this.http.request<SettleResponse>(withCall({ method: 'POST', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/settlement-request`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  refundthetransaction(params: {
  transactionId: string
  body: RefundthetransactionRequest
}, opts?: CallOptions): Promise<SettleResponse> {
    return this.http.request<SettleResponse>(withCall({ method: 'POST', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/refunding-request`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  cancelthetransaction(params: {
  transactionId: string
  body: CancelthetransactionRequest
}, opts?: CallOptions): Promise<SettleResponse> {
    return this.http.request<SettleResponse>(withCall({ method: 'POST', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/cancellation-request`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }
}
class PaymentsGatewayApi_paymentNotification {
  constructor(private http: VtexHttpClient) {}

  getApiPaymentsPvtPaymentsByPaymentIdPaymentNotification(params: {
  paymentId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/payments/pvt/payments/${encodePathParam(params.paymentId)}/payment-notification`, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
  }

  postApiPaymentsPvtPaymentsByPaymentIdPaymentNotification(params: {
  paymentId: string
  body: NotifyPaymentRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/payments/pvt/payments/${encodePathParam(params.paymentId)}/payment-notification`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
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
