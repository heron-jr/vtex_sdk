import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { SaveautoapproveforaccountRequest, SaveaccountconfigRequest, Score, Matcher, ResponseGetAccountsMatcherSettings, SaveautoapproveforaccountsellerRequest, PutselleraccountconfigRequest, SaveSuggestionRequest, SkuSpecification, ProductSpecification, Image, MatchRequest, Product, Sku, Images, Specifications, MatchMultiple, ResponseMatchMultiple, ResponseGetSellersApprovalSettings, ResponseSaveAccountsApprovalSettings } from './types.js'

class SuggestionsApi_skuApprovalSettings {
  constructor(private http: VtexHttpClient) {}

  async getautoApprovevaluefromconfig(params: {
  sellerId: string
}, opts?: CallOptions): Promise<{
  Enabled?: boolean
}> {
    return this.http.request<{
  Enabled?: boolean
}>(withCall({ method: 'GET', path: `/suggestions/configuration/autoapproval/toggle`, query: { 'sellerId': params.sellerId }, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async saveautoapproveforaccount(params: {
  body: SaveautoapproveforaccountRequest
}, opts?: CallOptions): Promise<{
  Enabled?: boolean
}> {
    return this.http.request<{
  Enabled?: boolean
}>(withCall({ method: 'PUT', path: `/suggestions/configuration/autoapproval/toggle`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getaccountconfig(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  Score?: Record<string, unknown>
  Matchers?: {
  MatcherId?: string
  "hook-base-address"?: string
  IsActive?: boolean
  UpdatesNotificationEndpoint?: string
  Description?: string
}[]
  Rules?: Record<string, unknown>
  SpecificationsMapping?: {
  fieldName?: string
  marketplaceField?: string
}[]
  MatchFlux?: string
}> {
    return this.http.request<{
  Score?: Record<string, unknown>
  Matchers?: {
  MatcherId?: string
  "hook-base-address"?: string
  IsActive?: boolean
  UpdatesNotificationEndpoint?: string
  Description?: string
}[]
  Rules?: Record<string, unknown>
  SpecificationsMapping?: {
  fieldName?: string
  marketplaceField?: string
}[]
  MatchFlux?: string
}>(withCall({ method: 'GET', path: `/suggestions/configuration`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async saveaccountconfig(params: {
  body: SaveaccountconfigRequest
}, opts?: CallOptions): Promise<ResponseSaveAccountsApprovalSettings> {
    return this.http.request<ResponseSaveAccountsApprovalSettings>(withCall({ method: 'PUT', path: `/suggestions/configuration`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getmatchconfig(params: Record<string, never> = {}, opts?: CallOptions): Promise<ResponseGetAccountsMatcherSettings> {
    return this.http.request<ResponseGetAccountsMatcherSettings>(withCall({ method: 'GET', path: `/suggestions/configuration/account/config`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getselleraccountconfig(params: {
  sellerId: string
}, opts?: CallOptions): Promise<ResponseGetSellersApprovalSettings> {
    return this.http.request<ResponseGetSellersApprovalSettings>(withCall({ method: 'GET', path: `/suggestions/configuration/seller/${encodePathParam(params.sellerId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async putselleraccountconfig(params: {
  sellerId: string
  body: PutselleraccountconfigRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/suggestions/configuration/seller/${encodePathParam(params.sellerId)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async saveautoapproveforaccountseller(params: {
  sellerId: string
  body: SaveautoapproveforaccountsellerRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/suggestions/configuration/autoapproval/toggle/seller/${encodePathParam(params.sellerId)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}
class SuggestionsApi_getSuggestions {
  constructor(private http: VtexHttpClient) {}

  async getsuggestions(params: {
  q?: string
  type?: string
  seller?: string
  status?: string
  hasmapping?: string
  matcherid?: string
  _from?: number
  _to?: number
} = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/suggestions`, query: { 'q': params.q, 'type': params.type, 'seller': params.seller, 'status': params.status, 'hasmapping': params.hasmapping, 'matcherid': params.matcherid, '_from': params._from, '_to': params._to }, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getSuggestion(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/suggestions/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}
class SuggestionsApi_manageSuggestions {
  constructor(private http: VtexHttpClient) {}

  async saveSuggestion(params: {
  sellerId: string
  sellerSkuId: string
  body: SaveSuggestionRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/suggestions/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async deleteSuggestion(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/suggestions/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}
class SuggestionsApi_getVersions {
  constructor(private http: VtexHttpClient) {}

  async getVersions(params: {
  sellerId: string
  sellerskuid: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/suggestions/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerskuid)}/versions`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getSuggestionbyversion(params: {
  sellerId: string
  sellerskuid: string
  version: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/suggestions/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerskuid)}/versions/${encodePathParam(params.version)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}
class SuggestionsApi_matchReceivedSKUs {
  constructor(private http: VtexHttpClient) {}

  async match(params: {
  sellerId: string
  sellerskuid: string
  version: string
  matchid: string
  body: MatchRequest
}, opts?: CallOptions): Promise<ResponseMatchMultiple> {
    return this.http.request<ResponseMatchMultiple>(withCall({ method: 'PUT', path: `/suggestions/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerskuid)}/versions/${encodePathParam(params.version)}/matches/${encodePathParam(params.matchid)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async matchMultiple(params: {
  actionName: "newproduct" | "skuassociation" | "productassociation" | "deny"
  body: MatchMultiple
}, opts?: CallOptions): Promise<ResponseMatchMultiple> {
    return this.http.request<ResponseMatchMultiple>(withCall({ method: 'PUT', path: `/suggestions/matches/action/${encodePathParam(params.actionName)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}
class SuggestionsApi_multipleProductSpecificationMapping {
  constructor(private http: VtexHttpClient) {}

  async putSuggestionsConfigurationBySellerIDSpecifications(params: {
  sellerID: string
  body: {
  [key: string]: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/suggestions/configuration/${encodePathParam(params.sellerID)}/specifications`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}

export class SuggestionsApi {
  readonly skuApprovalSettings: SuggestionsApi_skuApprovalSettings
  readonly getSuggestions: SuggestionsApi_getSuggestions
  readonly manageSuggestions: SuggestionsApi_manageSuggestions
  readonly getVersions: SuggestionsApi_getVersions
  readonly matchReceivedSKUs: SuggestionsApi_matchReceivedSKUs
  readonly multipleProductSpecificationMapping: SuggestionsApi_multipleProductSpecificationMapping
  constructor(http: VtexHttpClient) {
    this.skuApprovalSettings = new SuggestionsApi_skuApprovalSettings(http)
    this.getSuggestions = new SuggestionsApi_getSuggestions(http)
    this.manageSuggestions = new SuggestionsApi_manageSuggestions(http)
    this.getVersions = new SuggestionsApi_getVersions(http)
    this.matchReceivedSKUs = new SuggestionsApi_matchReceivedSKUs(http)
    this.multipleProductSpecificationMapping = new SuggestionsApi_multipleProductSpecificationMapping(http)
  }
}
