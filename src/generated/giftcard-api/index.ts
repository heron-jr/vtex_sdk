import type { VtexHttpClient } from '../../core/http.js'
import type { CreateGiftCardRequest, Response, Transactions, GetGiftCardusingJSONRequest, Cart, Item, Client, Response2, Item1, Self, Paging, Response3, CreateGiftCardTransactionRequest, OrderInfo, Cart1, Item2, PriceTag, ClientProfile, Shipping, Response5, Response6, Response7, GiftCardTransactionRequest } from './types.js'

class GiftcardApi_giftCard {
  constructor(private http: VtexHttpClient) {}

  createGiftCard(params: Record<string, never>): Promise<Response> {
    return this.http.request<Response>({ method: 'POST', path: `/giftcards` })
  }

  getGiftCardbyID(params: {
  giftCardId: string
}): Promise<{
  id: string
  redemptionToken: string
  redemptionCode: string
  balance: number
  emissionDate: string
  expiringDate: string
  currencyCode?: string
  transactions: Transactions
}> {
    return this.http.request<{
  id: string
  redemptionToken: string
  redemptionCode: string
  balance: number
  emissionDate: string
  expiringDate: string
  currencyCode?: string
  transactions: Transactions
}>({ method: 'GET', path: `/giftcards/${params.giftCardId}` })
  }

  searchGiftCardsfromcartdata(params: {
  body: GetGiftCardusingJSONRequest
}): Promise<Response2> {
    return this.http.request<Response2>({ method: 'POST', path: `/giftcards/_search`, body: params.body })
  }
}
class GiftcardApi_transactions {
  constructor(private http: VtexHttpClient) {}

  getGiftCardTransactions(params: {
  giftCardId: string
}): Promise<Response3[]> {
    return this.http.request<Response3[]>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions` })
  }

  createGiftCardTransaction(params: {
  giftCardId: string
  body: CreateGiftCardTransactionRequest
}): Promise<Response3> {
    return this.http.request<Response3>({ method: 'POST', path: `/giftcards/${params.giftCardId}/transactions`, body: params.body })
  }

  getGiftCardTransactionbyID(params: {
  giftCardId: string
  transactionId: string
}): Promise<Response5> {
    return this.http.request<Response5>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}` })
  }

  getTransactionAuthorizations(params: {
  giftCardId: string
  transactionId: string
}): Promise<Response6> {
    return this.http.request<Response6>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/authorization` })
  }

  getTransactionCancellations(params: {
  giftCardId: string
  transactionId: string
}): Promise<Response7[]> {
    return this.http.request<Response7[]>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/cancellations` })
  }

  cancelGiftCardTransaction(params: {
  giftCardId: string
  transactionId: string
  body: GiftCardTransactionRequest
}): Promise<Response6> {
    return this.http.request<Response6>({ method: 'POST', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/cancellations`, body: params.body })
  }

  getTransactionSettlements(params: {
  giftCardId: string
  transactionId: string
}): Promise<Response6[]> {
    return this.http.request<Response6[]>({ method: 'GET', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/settlements` })
  }

  settleGiftCardTransaction(params: {
  giftCardId: string
  transactionId: string
  body: GiftCardTransactionRequest
}): Promise<Response6> {
    return this.http.request<Response6>({ method: 'POST', path: `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/settlements`, body: params.body })
  }
}

export class GiftcardApi {
  readonly giftCard: GiftcardApi_giftCard
  readonly transactions: GiftcardApi_transactions
  constructor(http: VtexHttpClient) {
    this.giftCard = new GiftcardApi_giftCard(http)
    this.transactions = new GiftcardApi_transactions(http)
  }
}
