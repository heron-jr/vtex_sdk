import type { VtexHttpClient } from '../../core/http.js'
import type { UpsertMappingRequest, ResponseSellerCommissionsID, BulkUpsertSellerCommissionsRequest, UpsertSellerCommissionsRequest, CreateSellerLeadRequest, ResponseCreateSellerLead, Accountable, Address, AcceptSellerLeadRequest, ResendSellerLeadRequestRequest, UpsertSellerRequest, SellerCommissionConfiguration, AvailableSalesChannel, Groups, Sku2, MainImage, Offer, OffersPerSalesChannel, ResponseGetMatchedOffersList, ResponseGetMatchedOffersDataBySKU, ResponseGetMatchedOffersDataByProductId, ResponseListAffiliates, ResponseGetAffiliates, RequestUpdateAffiliate } from './types.js'

class MarketplaceApi_notification {
  constructor(private http: VtexHttpClient) {}

  priceNotification(params: {
  sellerId: string
  skuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/notificator/${params.sellerId}/changenotification/${params.skuId}/price` })
  }

  inventoryNotification(params: {
  sellerId: string
  skuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/notificator/${params.sellerId}/changenotification/${params.skuId}/inventory` })
  }
}
class MarketplaceApi_matchedOffers {
  constructor(private http: VtexHttpClient) {}

  getofferslist(params: {
  sort?: string
  rows?: number
  start?: number
  fq?: string
}): Promise<ResponseGetMatchedOffersList> {
    return this.http.request<ResponseGetMatchedOffersList>({ method: 'GET', path: `/offer-manager/pvt/offers`, query: { 'sort': params.sort, 'rows': params.rows, 'start': params.start, 'fq': params.fq } })
  }

  getSKUoffers(params: {
  productId: string
  skuId: string
}): Promise<ResponseGetMatchedOffersDataBySKU> {
    return this.http.request<ResponseGetMatchedOffersDataBySKU>({ method: 'GET', path: `/offer-manager/pvt/product/${params.productId}/sku/${params.skuId}` })
  }

  getProductoffers(params: {
  productId: string
}): Promise<ResponseGetMatchedOffersDataByProductId> {
    return this.http.request<ResponseGetMatchedOffersDataByProductId>({ method: 'GET', path: `/offer-manager/pvt/product/${params.productId}` })
  }
}
class MarketplaceApi_sellerInvite {
  constructor(private http: VtexHttpClient) {}

  listSellerLeads(params: {
  offset: number
  limit: number
  isConnected: string
  search: string
  status: string
  orderBy: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/seller-register/pvt/seller-leads`, query: { 'offset': params.offset, 'limit': params.limit, 'isConnected': params.isConnected, 'search': params.search, 'status': params.status, 'orderBy': params.orderBy } })
  }

  createSellerLead(params: {
  body: CreateSellerLeadRequest
}): Promise<ResponseCreateSellerLead> {
    return this.http.request<ResponseCreateSellerLead>({ method: 'POST', path: `/seller-register/pvt/seller-leads`, body: params.body })
  }

  retrieveSellerLead(params: {
  sellerLeadId: string | number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/seller-register/pvt/seller-leads/${params.sellerLeadId}` })
  }

  acceptSellerLead(params: {
  sellerLeadId: string | number
  body: AcceptSellerLeadRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/seller-register/pvt/seller-leads/${params.sellerLeadId}`, body: params.body })
  }

  removeSellerLead(params: {
  sellerLeadId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/seller-register/pvt/seller-leads/${params.sellerLeadId}` })
  }

  createSellerFromSellerLead(params: {
  sellerLeadId: string | number
  isActive?: boolean
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/seller-register/pvt/seller-leads/${params.sellerLeadId}/seller`, query: { 'isActive': params.isActive } })
  }

  resendSellerLeadRequest(params: {
  sellerLeadId: string | number
  body: ResendSellerLeadRequestRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/seller-register/pvt/seller-leads/${params.sellerLeadId}/status`, body: params.body })
  }
}
class MarketplaceApi_sellerCommissions {
  constructor(private http: VtexHttpClient) {}

  listSellerCommissions(params: {
  sellerId: string
}): Promise<ResponseSellerCommissionsID[]> {
    return this.http.request<ResponseSellerCommissionsID[]>({ method: 'GET', path: `/seller-register/pvt/sellers/${params.sellerId}/commissions` })
  }

  bulkUpsertSellerCommissions(params: {
  sellerId: string
  body: BulkUpsertSellerCommissionsRequest[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/seller-register/pvt/sellers/${params.sellerId}/commissions`, body: params.body })
  }

  retrieveSellerCommissions(params: {
  sellerId: string
  categoryId: string
}): Promise<ResponseSellerCommissionsID> {
    return this.http.request<ResponseSellerCommissionsID>({ method: 'GET', path: `/seller-register/pvt/sellers/${params.sellerId}/commissions/${params.categoryId}` })
  }

  removeSellerCommissions(params: {
  sellerId: string
  categoryId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/seller-register/pvt/sellers/${params.sellerId}/commissions/${params.categoryId}` })
  }
}
class MarketplaceApi_sellers {
  constructor(private http: VtexHttpClient) {}

  getListSellers(params: {
  from?: number
  to?: number
  keyword?: string
  integration?: string
  'group '?: string
  isActive?: boolean
  isBetterScope?: boolean
  isVtex?: boolean
  sc?: string
  sellerType?: number
  sort?: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/seller-register/pvt/sellers`, query: { 'from': params.from, 'to': params.to, 'keyword': params.keyword, 'integration': params.integration, 'group ': params['group '], 'isActive': params.isActive, 'isBetterScope': params.isBetterScope, 'isVtex': params.isVtex, 'sc': params.sc, 'sellerType': params.sellerType, 'sort': params.sort } })
  }

  upsertSellerRequest(params: {
  body: UpsertSellerRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/seller-register/pvt/sellers`, body: params.body })
  }

  getRetrieveSeller(params: {
  sellerId: string
  sc?: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/seller-register/pvt/sellers/${params.sellerId}`, query: { 'sc': params.sc } })
  }

  updateSeller(params: {
  sellerId: string
  body: {
  operation: string
  path: string
  value: boolean
}[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/seller-register/pvt/sellers/${params.sellerId}`, body: params.body })
  }
}
class MarketplaceApi_salesChannelMapping {
  constructor(private http: VtexHttpClient) {}

  retrieveMapping(params: {
  sellerId: string
  an: string
}): Promise<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]> {
    return this.http.request<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]>({ method: 'GET', path: `/seller-register/pvt/sellers/${params.sellerId}/sales-channel/mapping`, query: { 'an': params.an } })
  }

  upsertMapping(params: {
  sellerId: string
  an: string
  body: UpsertMappingRequest[]
}): Promise<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]> {
    return this.http.request<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]>({ method: 'PUT', path: `/seller-register/pvt/sellers/${params.sellerId}/sales-channel/mapping`, query: { 'an': params.an }, body: params.body })
  }
}
class MarketplaceApi_affiliates {
  constructor(private http: VtexHttpClient) {}

  getFulfillmentPvtAffiliates(params: Record<string, never>): Promise<ResponseListAffiliates> {
    return this.http.request<ResponseListAffiliates>({ method: 'GET', path: `/fulfillment/pvt/affiliates` })
  }

  getFulfillmentPvtAffiliatesByAffiliateId(params: {
  affiliateId: string
}): Promise<ResponseGetAffiliates> {
    return this.http.request<ResponseGetAffiliates>({ method: 'GET', path: `/fulfillment/pvt/affiliates/${params.affiliateId}` })
  }

  putFulfillmentPvtAffiliatesByAffiliateId(params: {
  affiliateId: string
  body: RequestUpdateAffiliate
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/fulfillment/pvt/affiliates/${params.affiliateId}`, body: params.body })
  }

  deleteFulfillmentPvtAffiliatesByAffiliateId(params: {
  affiliateId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/fulfillment/pvt/affiliates/${params.affiliateId}` })
  }
}

export class MarketplaceApi {
  readonly notification: MarketplaceApi_notification
  readonly matchedOffers: MarketplaceApi_matchedOffers
  readonly sellerInvite: MarketplaceApi_sellerInvite
  readonly sellerCommissions: MarketplaceApi_sellerCommissions
  readonly sellers: MarketplaceApi_sellers
  readonly salesChannelMapping: MarketplaceApi_salesChannelMapping
  readonly affiliates: MarketplaceApi_affiliates
  constructor(http: VtexHttpClient) {
    this.notification = new MarketplaceApi_notification(http)
    this.matchedOffers = new MarketplaceApi_matchedOffers(http)
    this.sellerInvite = new MarketplaceApi_sellerInvite(http)
    this.sellerCommissions = new MarketplaceApi_sellerCommissions(http)
    this.sellers = new MarketplaceApi_sellers(http)
    this.salesChannelMapping = new MarketplaceApi_salesChannelMapping(http)
    this.affiliates = new MarketplaceApi_affiliates(http)
  }
}
