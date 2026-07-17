import type { VtexHttpClient } from '../../core/http.js'
import type { SaveautoapproveforaccountRequest, SaveaccountconfigRequest, Score, Matcher, ResponseGetAccountsMatcherSettings, SaveautoapproveforaccountsellerRequest, PutselleraccountconfigRequest, SaveSuggestionRequest, SkuSpecification, ProductSpecification, Image, MatchRequest, Product, Sku, Images, Specifications, MatchMultiple, ResponseMatchMultiple, ResponseGetSellersApprovalSettings, ResponseSaveAccountsApprovalSettings } from './types.js'

class SuggestionsApi_skuApprovalSettings {
  constructor(private http: VtexHttpClient) {}

  getautoApprovevaluefromconfig(params: {
  sellerId: string
}): Promise<{
  Enabled?: boolean
}> {
    return this.http.request<{
  Enabled?: boolean
}>({ method: 'GET', path: `/suggestions/configuration/autoapproval/toggle`, query: { 'sellerId': params.sellerId } })
  }

  saveautoapproveforaccount(params: {
  body: SaveautoapproveforaccountRequest
}): Promise<{
  Enabled?: boolean
}> {
    return this.http.request<{
  Enabled?: boolean
}>({ method: 'PUT', path: `/suggestions/configuration/autoapproval/toggle`, body: params.body })
  }

  getaccountconfig(params: Record<string, never>): Promise<{
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
}>({ method: 'GET', path: `/suggestions/configuration` })
  }

  saveaccountconfig(params: {
  body: SaveaccountconfigRequest
}): Promise<ResponseSaveAccountsApprovalSettings> {
    return this.http.request<ResponseSaveAccountsApprovalSettings>({ method: 'PUT', path: `/suggestions/configuration`, body: params.body })
  }

  getmatchconfig(params: Record<string, never>): Promise<ResponseGetAccountsMatcherSettings> {
    return this.http.request<ResponseGetAccountsMatcherSettings>({ method: 'GET', path: `/suggestions/configuration/account/config` })
  }

  getselleraccountconfig(params: {
  sellerId: string
}): Promise<ResponseGetSellersApprovalSettings> {
    return this.http.request<ResponseGetSellersApprovalSettings>({ method: 'GET', path: `/suggestions/configuration/seller/${params.sellerId}` })
  }

  putselleraccountconfig(params: {
  sellerId: string
  body: PutselleraccountconfigRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/suggestions/configuration/seller/${params.sellerId}`, body: params.body })
  }

  saveautoapproveforaccountseller(params: {
  sellerId: string
  body: SaveautoapproveforaccountsellerRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/suggestions/configuration/autoapproval/toggle/seller/${params.sellerId}`, body: params.body })
  }
}
class SuggestionsApi_getSuggestions {
  constructor(private http: VtexHttpClient) {}

  getsuggestions(params: {
  q?: string
  type?: string
  seller?: string
  status?: string
  hasmapping?: string
  matcherid?: string
  _from?: number
  _to?: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/suggestions`, query: { 'q': params.q, 'type': params.type, 'seller': params.seller, 'status': params.status, 'hasmapping': params.hasmapping, 'matcherid': params.matcherid, '_from': params._from, '_to': params._to } })
  }

  getSuggestion(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/suggestions/${params.sellerId}/${params.sellerSkuId}` })
  }
}
class SuggestionsApi_manageSuggestions {
  constructor(private http: VtexHttpClient) {}

  saveSuggestion(params: {
  sellerId: string
  sellerSkuId: string
  body: SaveSuggestionRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/suggestions/${params.sellerId}/${params.sellerSkuId}`, body: params.body })
  }

  deleteSuggestion(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/suggestions/${params.sellerId}/${params.sellerSkuId}` })
  }
}
class SuggestionsApi_getVersions {
  constructor(private http: VtexHttpClient) {}

  getVersions(params: {
  sellerId: string
  sellerskuid: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/suggestions/${params.sellerId}/${params.sellerskuid}/versions` })
  }

  getSuggestionbyversion(params: {
  sellerId: string
  sellerskuid: string
  version: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/suggestions/${params.sellerId}/${params.sellerskuid}/versions/${params.version}` })
  }
}
class SuggestionsApi_matchReceivedSKUs {
  constructor(private http: VtexHttpClient) {}

  match(params: {
  sellerId: string
  sellerskuid: string
  version: string
  matchid: string
  body: MatchRequest
}): Promise<ResponseMatchMultiple> {
    return this.http.request<ResponseMatchMultiple>({ method: 'PUT', path: `/suggestions/${params.sellerId}/${params.sellerskuid}/versions/${params.version}/matches/${params.matchid}`, body: params.body })
  }

  matchMultiple(params: {
  actionName: "newproduct" | "skuassociation" | "productassociation" | "deny"
  body: MatchMultiple
}): Promise<ResponseMatchMultiple> {
    return this.http.request<ResponseMatchMultiple>({ method: 'PUT', path: `/suggestions/matches/action/${params.actionName}`, body: params.body })
  }
}
class SuggestionsApi_multipleProductSpecificationMapping {
  constructor(private http: VtexHttpClient) {}

  putSuggestionsConfigurationBySellerIDSpecifications(params: {
  sellerID: string
  body: Record<string, unknown>
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/suggestions/configuration/${params.sellerID}/specifications`, body: params.body })
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
