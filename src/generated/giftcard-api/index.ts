import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { CreateGiftCardRequest, Response, Transactions, GetGiftCardusingJSONRequest, Cart, Item, Client, Response2, Item1, Self, Paging, Response3, CreateGiftCardTransactionRequest, OrderInfo, Cart1, Item2, PriceTag, ClientProfile, Shipping, Response5, Response6, Response7, GiftCardTransactionRequest } from './types.js'

class GiftcardApi_giftCard {
  constructor(private http: VtexHttpClient) {}

  async createGiftCard(params: {
  body: CreateGiftCardRequest
}, opts?: CallOptions): Promise<Response> {
    return this.http.request<Response>(withCall({ method: 'POST', path: `/giftcards`, body: params.body, contentType: 'application/vnd.vtex.giftcard.v1+json', server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async getGiftCardbyID(params: {
  giftCardId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/giftcards/${encodePathParam(params.giftCardId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async searchGiftCardsfromcartdata(params: {
  'REST-Range'?: string
  body: GetGiftCardusingJSONRequest
}, opts?: CallOptions): Promise<Response2> {
    return this.http.request<Response2>(withCall({ method: 'POST', path: `/giftcards/_search`, headers: { 'REST-Range': params['REST-Range'] }, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }
}
class GiftcardApi_transactions {
  constructor(private http: VtexHttpClient) {}

  async getGiftCardTransactions(params: {
  giftCardId: string
}, opts?: CallOptions): Promise<Response3[]> {
    return this.http.request<Response3[]>(withCall({ method: 'GET', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async createGiftCardTransaction(params: {
  giftCardId: string
  body: CreateGiftCardTransactionRequest
}, opts?: CallOptions): Promise<Response3> {
    return this.http.request<Response3>(withCall({ method: 'POST', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async getGiftCardTransactionbyID(params: {
  giftCardId: string
  transactionId: string
}, opts?: CallOptions): Promise<Response5> {
    return this.http.request<Response5>(withCall({ method: 'GET', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.transactionId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async getTransactionAuthorizations(params: {
  giftCardId: string
  transactionId: string
}, opts?: CallOptions): Promise<Response6> {
    return this.http.request<Response6>(withCall({ method: 'GET', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.transactionId)}/authorization`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async getTransactionCancellations(params: {
  giftCardId: string
  transactionId: string
}, opts?: CallOptions): Promise<Response7[]> {
    return this.http.request<Response7[]>(withCall({ method: 'GET', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.transactionId)}/cancellations`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async cancelGiftCardTransaction(params: {
  giftCardId: string
  transactionId: string
  body: GiftCardTransactionRequest
}, opts?: CallOptions): Promise<Response6> {
    return this.http.request<Response6>(withCall({ method: 'POST', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.transactionId)}/cancellations`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async getTransactionSettlements(params: {
  giftCardId: string
  transactionId: string
}, opts?: CallOptions): Promise<Response6[]> {
    return this.http.request<Response6[]>(withCall({ method: 'GET', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.transactionId)}/settlements`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  async settleGiftCardTransaction(params: {
  giftCardId: string
  transactionId: string
  body: GiftCardTransactionRequest
}, opts?: CallOptions): Promise<Response6> {
    return this.http.request<Response6>(withCall({ method: 'POST', path: `/giftcards/${encodePathParam(params.giftCardId)}/transactions/${encodePathParam(params.transactionId)}/settlements`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
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
