import type { VtexHttpClient } from '../../core/http.js'
import type { CardTokenAddress, CardTokenCard, CardTokenDataResponse, CardTokenAddressInput, CardTokenCardInput, CardTokenData, CardToken, CreateCardTokenRequest, UpdateCardTokenRequest, ImportCardTokensResponse, ImportStatus } from './types.js'

class CardTokenVaultApi_cardToken {
  constructor(private http: VtexHttpClient) {}

  createCardToken(params: {
  body: CreateCardTokenRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/card-token-vault/tokens`, body: params.body })
  }

  updateCardToken(params: {
  id: string
  body: UpdateCardTokenRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/card-token-vault/tokens/${params.id}`, body: params.body })
  }

  getCardTokenById(params: {
  id: string
}): Promise<CardToken> {
    return this.http.request<CardToken>({ method: 'GET', path: `/api/payments/pvt/accounts/${params.id}` })
  }

  deleteCardToken(params: {
  id: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/payments/pvt/accounts/${params.id}` })
  }
}
class CardTokenVaultApi_cardTokenImport {
  constructor(private http: VtexHttpClient) {}

  importCardTokens(params: Record<string, never>): Promise<ImportCardTokensResponse> {
    return this.http.request<ImportCardTokensResponse>({ method: 'POST', path: `/api/card-token-vault/tokens/import` })
  }

  getCardTokenImportStatus(params: {
  importId: string
}): Promise<ImportStatus> {
    return this.http.request<ImportStatus>({ method: 'GET', path: `/api/card-token-vault/tokens/import/${params.importId}` })
  }

  getCardTokenImportReport(params: {
  importId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/card-token-vault/tokens/import/${params.importId}/report` })
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
