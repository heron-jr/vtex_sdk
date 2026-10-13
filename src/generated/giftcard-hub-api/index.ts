import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { CreateUpdateGiftCardProviderbyIDRequest, CreateGiftCardinGiftCardProviderRequest, GetGiftCardfromGiftCardProviderRequest, Client, Cart, Item, CreateGiftCardTransactionRequest, OrderInfo, Cart1, Item1, ClientProfile, Shipping, CreateGiftCardSettlementTransactionRequest, Cart2, CreateGiftCardCancellationTransactionRequest } from './types.js'

class GiftcardHubApi_provider {
  constructor(private http: VtexHttpClient) {}

  listAllGiftCardProviders(params: {
  'REST-Range'?: string
} = {}, opts?: CallOptions): Promise<{
  id?: string
  serviceUrl?: string
  oauthProvider?: string
  preAuthEnabled?: boolean
  cancelEnabled?: boolean
  _self?: {
  href?: string
}
}[]> {
    return this.http.request<{
  id?: string
  serviceUrl?: string
  oauthProvider?: string
  preAuthEnabled?: boolean
  cancelEnabled?: boolean
  _self?: {
  href?: string
}
}[]>(withCall({ method: 'GET', path: `/api/giftcardproviders`, headers: { 'REST-Range': params['REST-Range'] } }, opts))
  }

  getGiftCardProviderbyID(params: {
  giftCardProviderId: string
}, opts?: CallOptions): Promise<{
  id?: string
  serviceUrl?: string
  oauthProvider?: string
  caption?: string
  preAuthEnabled?: boolean
  cancelEnabled?: boolean
  _self?: Record<string, unknown>
}> {
    return this.http.request<{
  id?: string
  serviceUrl?: string
  oauthProvider?: string
  caption?: string
  preAuthEnabled?: boolean
  cancelEnabled?: boolean
  _self?: Record<string, unknown>
}>(withCall({ method: 'GET', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}` }, opts))
  }

  createUpdateGiftCardProviderbyID(params: {
  giftCardProviderId: string
  body: CreateUpdateGiftCardProviderbyIDRequest
}, opts?: CallOptions): Promise<{
  id?: string
  serviceUrl?: string
  oauthProvider?: string
  preAuthEnabled?: boolean
  cancelEnabled?: boolean
  _self?: Record<string, unknown>
}> {
    return this.http.request<{
  id?: string
  serviceUrl?: string
  oauthProvider?: string
  preAuthEnabled?: boolean
  cancelEnabled?: boolean
  _self?: Record<string, unknown>
}>(withCall({ method: 'PUT', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}`, body: params.body, contentType: 'application/vnd.vtex.giftcardproviders.v1+json' }, opts))
  }

  deleteGiftCardProviderbyID(params: {
  giftCardProviderId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}` }, opts))
  }
}
class GiftcardHubApi_transaction {
  constructor(private http: VtexHttpClient) {}

  createGiftCardinGiftCardProvider(params: {
  giftCardProviderId: string
  body: CreateGiftCardinGiftCardProviderRequest
}, opts?: CallOptions): Promise<{
  id?: string
  emissionDate?: string
  expiringDate?: string
  caption?: string
  provider?: string
  discount?: boolean
  currencyCode?: string
  transaction?: {
  href?: string
}
}> {
    return this.http.request<{
  id?: string
  emissionDate?: string
  expiringDate?: string
  caption?: string
  provider?: string
  discount?: boolean
  currencyCode?: string
  transaction?: {
  href?: string
}
}>(withCall({ method: 'POST', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards`, body: params.body, contentType: 'application/vnd.vtex.giftcardproviders.v1+json' }, opts))
  }

  getGiftCardfromGiftCardProvider(params: {
  giftCardProviderId: string
  'REST-Range'?: string
  body: GetGiftCardfromGiftCardProviderRequest
}, opts?: CallOptions): Promise<{
  id?: string
  provider?: string
  balance?: number
  _self?: {
  href?: string
}
}[]> {
    return this.http.request<{
  id?: string
  provider?: string
  balance?: number
  _self?: {
  href?: string
}
}[]>(withCall({ method: 'POST', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/_search`, headers: { 'REST-Range': params['REST-Range'] }, body: params.body, contentType: 'application/vnd.vtex.giftcardproviders.v1+json' }, opts))
  }

  getGiftCardfromGiftCardProviderbyID(params: {
  giftCardProviderId: string
  giftCardId: string
}, opts?: CallOptions): Promise<{
  id?: string
  redemptionToken?: string
  redemptionCode?: string
  balance?: number
  emissionDate?: string
  expiringDate?: string
  currencyCode?: string
  discount?: boolean
  transactions?: {
  href?: string
}
}> {
    return this.http.request<{
  id?: string
  redemptionToken?: string
  redemptionCode?: string
  balance?: number
  emissionDate?: string
  expiringDate?: string
  currencyCode?: string
  discount?: boolean
  transactions?: {
  href?: string
}
}>(withCall({ method: 'GET', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}` }, opts))
  }

  listAllGiftCardTransactions(params: {
  giftCardProviderId: string
  giftCardId: string
}, opts?: CallOptions): Promise<{
  cardId?: string
  id?: string
  _self?: {
  href?: string
}
}[]> {
    return this.http.request<{
  cardId?: string
  id?: string
  _self?: {
  href?: string
}
}[]>(withCall({ method: 'GET', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions` }, opts))
  }

  createGiftCardTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
  body: CreateGiftCardTransactionRequest
}, opts?: CallOptions): Promise<{
  cardId?: string
  id?: string
  _self?: {
  href?: string
}
}> {
    return this.http.request<{
  cardId?: string
  id?: string
  _self?: {
  href?: string
}
}>(withCall({ method: 'POST', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions`, body: params.body, contentType: 'application/vnd.vtex.giftcardproviders.v1+json' }, opts))
  }

  getGiftCardTransactionbyID(params: {
  giftCardProviderId: string
  giftCardId: string
  transactionId: string
}, opts?: CallOptions): Promise<{
  value?: number
  description?: string
  date?: string
  requestId?: string
  settlement?: {
  href?: string
}
  cancellation?: {
  href?: string
}
  authorization?: {
  href?: string
}
  operation?: string
}> {
    return this.http.request<{
  value?: number
  description?: string
  date?: string
  requestId?: string
  settlement?: {
  href?: string
}
  cancellation?: {
  href?: string
}
  authorization?: {
  href?: string
}
  operation?: string
}>(withCall({ method: 'GET', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.transactionId)}` }, opts))
  }

  getGiftCardAuthorizationTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
}, opts?: CallOptions): Promise<{
  oid: string
  value: number
  date: string
}> {
    return this.http.request<{
  oid: string
  value: number
  date: string
}>(withCall({ method: 'GET', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.tId)}/authorization` }, opts))
  }

  listAllGiftCardSettlementTransactions(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
}, opts?: CallOptions): Promise<{
  oid?: string
  value?: number
  date?: string
}[]> {
    return this.http.request<{
  oid?: string
  value?: number
  date?: string
}[]>(withCall({ method: 'GET', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.tId)}/settlements` }, opts))
  }

  createGiftCardSettlementTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
  body: {
  value: number
  requestId: string
}
}, opts?: CallOptions): Promise<{
  oid: string
  value: number
  date: string
}[]> {
    return this.http.request<{
  oid: string
  value: number
  date: string
}[]>(withCall({ method: 'POST', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.tId)}/settlements`, body: params.body }, opts))
  }

  listAllGiftCardCancellationTransactions(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
}, opts?: CallOptions): Promise<{
  oid?: string
  value?: number
  date?: string
}[]> {
    return this.http.request<{
  oid?: string
  value?: number
  date?: string
}[]>(withCall({ method: 'GET', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.tId)}/cancellations` }, opts))
  }

  createGiftCardCancellationTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
  body: CreateGiftCardCancellationTransactionRequest
}, opts?: CallOptions): Promise<{
  oid: string
  value: number
  date: string
}> {
    return this.http.request<{
  oid: string
  value: number
  date: string
}>(withCall({ method: 'POST', path: `/api/giftcardproviders/${encodePathParam(params.giftCardProviderId)}/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.tId)}/cancellations`, body: params.body, contentType: 'application/vnd.vtex.giftcardproviders.v1+json' }, opts))
  }
}

export class GiftcardHubApi {
  readonly provider: GiftcardHubApi_provider
  readonly transaction: GiftcardHubApi_transaction
  constructor(http: VtexHttpClient) {
    this.provider = new GiftcardHubApi_provider(http)
    this.transaction = new GiftcardHubApi_transaction(http)
  }
}
