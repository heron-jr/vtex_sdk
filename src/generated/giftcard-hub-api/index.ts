import type { VtexHttpClient } from '../../core/http.js'
import type { CreateUpdateGiftCardProviderbyIDRequest, CreateGiftCardinGiftCardProviderRequest, GetGiftCardfromGiftCardProviderRequest, Client, Cart, Item, CreateGiftCardTransactionRequest, OrderInfo, Cart1, Item1, ClientProfile, Shipping, CreateGiftCardSettlementTransactionRequest, Cart2, CreateGiftCardCancellationTransactionRequest } from './types.js'

class GiftcardHubApi_provider {
  constructor(private http: VtexHttpClient) {}

  listAllGiftCardProviders(params: Record<string, never>): Promise<{
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
}[]>({ method: 'GET', path: `/api/giftcardproviders` })
  }

  getGiftCardProviderbyID(params: {
  giftCardProviderId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/giftcardproviders/${params.giftCardProviderId}` })
  }

  createUpdateGiftCardProviderbyID(params: {
  giftCardProviderId: string
}): Promise<{
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
}>({ method: 'PUT', path: `/api/giftcardproviders/${params.giftCardProviderId}` })
  }

  deleteGiftCardProviderbyID(params: {
  giftCardProviderId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/giftcardproviders/${params.giftCardProviderId}` })
  }
}
class GiftcardHubApi_transaction {
  constructor(private http: VtexHttpClient) {}

  createGiftCardinGiftCardProvider(params: {
  giftCardProviderId: string
}): Promise<{
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
}>({ method: 'POST', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards` })
  }

  getGiftCardfromGiftCardProvider(params: {
  giftCardProviderId: string
}): Promise<{
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
}[]>({ method: 'POST', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/_search` })
  }

  getGiftCardfromGiftCardProviderbyID(params: {
  giftCardProviderId: string
  giftCardId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}` })
  }

  listAllGiftCardTransactions(params: {
  giftCardProviderId: string
  giftCardId: string
}): Promise<{
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
}[]>({ method: 'GET', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions` })
  }

  createGiftCardTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
}): Promise<{
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
}>({ method: 'POST', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions` })
  }

  getGiftCardTransactionbyID(params: {
  giftCardProviderId: string
  giftCardId: string
  transactionId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.transactionId}` })
  }

  getGiftCardAuthorizationTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
}): Promise<{
  oid: string
  value: number
  date: string
}> {
    return this.http.request<{
  oid: string
  value: number
  date: string
}>({ method: 'GET', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/authorization` })
  }

  listAllGiftCardSettlementTransactions(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
}): Promise<{
  oid?: string
  value?: number
  date?: string
}[]> {
    return this.http.request<{
  oid?: string
  value?: number
  date?: string
}[]>({ method: 'GET', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements` })
  }

  createGiftCardSettlementTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
  body: {
  value: number
  requestId: string
}
}): Promise<{
  oid: string
  value: number
  date: string
}[]> {
    return this.http.request<{
  oid: string
  value: number
  date: string
}[]>({ method: 'POST', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements`, body: params.body })
  }

  listAllGiftCardCancellationTransactions(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
}): Promise<{
  oid?: string
  value?: number
  date?: string
}[]> {
    return this.http.request<{
  oid?: string
  value?: number
  date?: string
}[]>({ method: 'GET', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/cancellations` })
  }

  createGiftCardCancellationTransaction(params: {
  giftCardProviderId: string
  giftCardId: string
  tId: string
}): Promise<{
  oid: string
  value: number
  date: string
}> {
    return this.http.request<{
  oid: string
  value: number
  date: string
}>({ method: 'POST', path: `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/cancellations` })
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
