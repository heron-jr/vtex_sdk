import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { CardTokenAddress, CardTokenCard, CardTokenDataResponse, CardTokenAddressInput, CardTokenCardInput, CardTokenData, CardToken, CreateCardTokenRequest, UpdateCardTokenRequest, ImportCardTokensResponse, ImportStatus } from './types.js'

class CardTokenVaultApi_cardToken {
  constructor(private http: VtexHttpClient) {}

  createCardToken(params: {
  body: CreateCardTokenRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/card-token-vault/tokens`, body: params.body, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }

  updateCardToken(params: {
  id: string
  body: UpdateCardTokenRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/card-token-vault/tokens/${encodePathParam(params.id)}`, body: params.body, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }

  getCardTokenById(params: {
  id: string
}, opts?: CallOptions): Promise<CardToken> {
    return this.http.request<CardToken>(withCall({ method: 'GET', path: `/api/payments/pvt/accounts/${encodePathParam(params.id)}`, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }

  deleteCardToken(params: {
  id: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/payments/pvt/accounts/${encodePathParam(params.id)}`, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }
}
class CardTokenVaultApi_cardTokenImport {
  constructor(private http: VtexHttpClient) {}

  importCardTokens(params: {
  body: FormData
}, opts?: CallOptions): Promise<ImportCardTokensResponse> {
    return this.http.request<ImportCardTokensResponse>(withCall({ method: 'POST', path: `/api/card-token-vault/tokens/import`, body: params.body, contentType: 'multipart/form-data', server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }

  getCardTokenImportStatus(params: {
  importId: string
}, opts?: CallOptions): Promise<ImportStatus> {
    return this.http.request<ImportStatus>(withCall({ method: 'GET', path: `/api/card-token-vault/tokens/import/${encodePathParam(params.importId)}`, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }

  getCardTokenImportReport(params: {
  importId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/card-token-vault/tokens/import/${encodePathParam(params.importId)}/report`, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }
}

export class CardTokenVaultApi {
  readonly cardToken: CardTokenVaultApi_cardToken
  readonly cardTokenImport: CardTokenVaultApi_cardTokenImport
  constructor(http: VtexHttpClient) {
    this.cardToken = new CardTokenVaultApi_cardToken(http)
    this.cardTokenImport = new CardTokenVaultApi_cardTokenImport(http)
  }
}
