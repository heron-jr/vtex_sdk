import type { VtexHttpClient } from '../../core/http.js'
import type { BuyerSchemaResponse, BuyerDocumentRequest, BuyerDocument, CreateBuyerDocumentResponse, BuyerDocumentResponse } from './types.js'

class B2bBuyerDataApi_buyerData {
  constructor(private http: VtexHttpClient) {}

  getApiDataentitiesShopperSchemasV1(params: Record<string, never>): Promise<BuyerSchemaResponse[]> {
    return this.http.request<BuyerSchemaResponse[]>({ method: 'GET', path: `/api/dataentities/shopper/schemas/v1` })
  }

  postApiDataentitiesShopperDocuments(params: {
  _schema: string
  body: BuyerDocumentRequest
}): Promise<CreateBuyerDocumentResponse> {
    return this.http.request<CreateBuyerDocumentResponse>({ method: 'POST', path: `/api/dataentities/shopper/documents`, query: { '_schema': params._schema }, body: params.body })
  }

  getApiDataentitiesShopperDocumentsByBuyerId(params: {
  buyerId: string
}): Promise<BuyerDocument> {
    return this.http.request<BuyerDocument>({ method: 'GET', path: `/api/dataentities/shopper/documents/${params.buyerId}` })
  }

  patchApiDataentitiesShopperDocumentsByBuyerId(params: {
  buyerId: string
  body: BuyerDocumentRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/shopper/documents/${params.buyerId}`, body: params.body })
  }

  deleteApiDataentitiesShopperDocumentsByBuyerId(params: {
  buyerId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/shopper/documents/${params.buyerId}` })
  }

  getApiDataentitiesShopperSearch(params: {
  _where?: string
  _schema: "v1"
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/dataentities/shopper/search`, query: { '_where': params._where, '_schema': params._schema } })
  }
}

export class B2bBuyerDataApi {
  readonly buyerData: B2bBuyerDataApi_buyerData
  constructor(http: VtexHttpClient) {
    this.buyerData = new B2bBuyerDataApi_buyerData(http)
  }
}
