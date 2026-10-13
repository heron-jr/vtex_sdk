import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { BuyerSchemaResponse, BuyerDocumentRequest, BuyerDocument, CreateBuyerDocumentResponse, BuyerDocumentResponse } from './types.js'

class B2bBuyerDataApi_buyerData {
  constructor(private http: VtexHttpClient) {}

  async getApiDataentitiesShopperSchemasV1(params: Record<string, never> = {}, opts?: CallOptions): Promise<BuyerSchemaResponse[]> {
    return this.http.request<BuyerSchemaResponse[]>(withCall({ method: 'GET', path: `/api/dataentities/shopper/schemas/v1` }, opts))
  }

  async postApiDataentitiesShopperDocuments(params: {
  _schema: string
  body: BuyerDocumentRequest
}, opts?: CallOptions): Promise<CreateBuyerDocumentResponse> {
    return this.http.request<CreateBuyerDocumentResponse>(withCall({ method: 'POST', path: `/api/dataentities/shopper/documents`, query: { '_schema': params._schema }, body: params.body }, opts))
  }

  async getApiDataentitiesShopperDocumentsByBuyerId(params: {
  buyerId: string
}, opts?: CallOptions): Promise<BuyerDocument> {
    return this.http.request<BuyerDocument>(withCall({ method: 'GET', path: `/api/dataentities/shopper/documents/${encodePathParam(params.buyerId)}` }, opts))
  }

  async patchApiDataentitiesShopperDocumentsByBuyerId(params: {
  buyerId: string
  body: BuyerDocumentRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/shopper/documents/${encodePathParam(params.buyerId)}`, body: params.body }, opts))
  }

  async deleteApiDataentitiesShopperDocumentsByBuyerId(params: {
  buyerId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/shopper/documents/${encodePathParam(params.buyerId)}` }, opts))
  }

  async getApiDataentitiesShopperSearch(params: {
  _where?: string
  _schema: "v1"
}, opts?: CallOptions): Promise<BuyerDocument[]> {
    return this.http.request<BuyerDocument[]>(withCall({ method: 'GET', path: `/api/dataentities/shopper/search`, query: { '_where': params._where, '_schema': params._schema } }, opts))
  }
}

export class B2bBuyerDataApi {
  readonly buyerData: B2bBuyerDataApi_buyerData
  constructor(http: VtexHttpClient) {
    this.buyerData = new B2bBuyerDataApi_buyerData(http)
  }
}
