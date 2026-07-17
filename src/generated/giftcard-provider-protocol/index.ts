import type { VtexHttpClient } from '../../core/http.js'
import type { ListAllGiftCardsRequest, Client, Cart, Item, Response, Self, Response1, Transaction, CreateGiftCardRequest, CreateGiftCardTransactionRequest, OrderInfo, Cart1, Item1, ClientProfile, Shipping, GiftCardTransactionResponse, Cart2, Item2, PriceTag, Settlement, Cancellation, Authorization, TransactionResponse, CreateGiftCardTransactionCancellationRequest, CreateGiftCardTransactionSettlementRequest } from './types.js'

class GiftcardProviderProtocolApi_giftCards {
  constructor(private http: VtexHttpClient) {}

  listAllGiftCards(params: Record<string, never>): Promise<Response[]> {
    return this.http.request<Response[]>({ method: 'POST', path: `/giftcards/_search` })
  }

  getGiftCardbyID(params: {
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
}>({ method: 'GET', path: `/giftcards/${params.giftCardId}` })
  }

  createGiftCard(params: Record<string, never>): Promise<{
  id?: string
  relationName?: string
  emissionDate?: string
  expiringDate?: string
  caption?: string
  restrictedToOwner?: boolean
  multipleRedemptions?: boolean
  multipleCredits?: boolean
  profileId?: string
  currencyCode?: string
}> {
    return this.http.request<{
  id?: string
  relationName?: string
  emissionDate?: string
  expiringDate?: string
  caption?: string
  restrictedToOwner?: boolean
  multipleRedemptions?: boolean
  multipleCredits?: boolean
  profileId?: string
  currencyCode?: string
}>({ method: 'POST', path: `/giftcards` })
  }
}
class GiftcardProviderProtocolApi_transactions {
  constructor(private http: VtexHttpClient) {}

  listAllGiftCardTransactions(params: {
  giftCardId: string
}): Promise<GiftCardTransactionResponse[]> {
    return this.http.request<GiftCardTransactionResponse[]>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions` })
  }

  createGiftCardTransaction(params: {
  giftCardId: string
}): Promise<GiftCardTransactionResponse> {
    return this.http.request<GiftCardTransactionResponse>({ method: 'POST', path: `/giftcards/${params.giftCardId}/transactions` })
  }

  getGiftCardTransactionbyID(params: {
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
}>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}` })
  }

  getGiftCardTransactionAuthorization(params: {
  giftCardId: string
  transactionId: string
}): Promise<TransactionResponse> {
    return this.http.request<TransactionResponse>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/authorization` })
  }

  listAllGiftCardTransactionsCancellations(params: {
  giftCardId: string
  transactionId: string
}): Promise<TransactionResponse[]> {
    return this.http.request<TransactionResponse[]>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/cancellations` })
  }

  createGiftCardTransactionCancellation(params: {
  giftCardId: string
  transactionId: string
}): Promise<TransactionResponse> {
    return this.http.request<TransactionResponse>({ method: 'POST', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/cancellations` })
  }

  listAllGiftCardTransactionsSettlements(params: {
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
}[]>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements` })
  }

  createGiftCardTransactionSettlement(params: {
  giftCardId: string
  tId: string
}): Promise<TransactionResponse> {
    return this.http.request<TransactionResponse>({ method: 'POST', path: `/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements` })
  }
}

export class GiftcardProviderProtocolApi {
  readonly giftCards: GiftcardProviderProtocolApi_giftCards
  readonly transactions: GiftcardProviderProtocolApi_transactions
  constructor(http: VtexHttpClient) {
    this.giftCards = new GiftcardProviderProtocolApi_giftCards(http)
    this.transactions = new GiftcardProviderProtocolApi_transactions(http)
  }
}
