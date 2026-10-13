import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { UpsertMappingRequest, ResponseSellerCommissionsID, BulkUpsertSellerCommissionsRequest, UpsertSellerCommissionsRequest, CreateSellerLeadRequest, ResponseCreateSellerLead, Accountable, Address, AcceptSellerLeadRequest, ResendSellerLeadRequestRequest, UpsertSellerRequest, SellerCommissionConfiguration, AvailableSalesChannel, Groups, Sku2, MainImage, Offer, OffersPerSalesChannel, ResponseGetMatchedOffersList, ResponseGetMatchedOffersDataBySKU, ResponseGetMatchedOffersDataByProductId, ResponseListAffiliates, ResponseGetAffiliates, RequestUpdateAffiliate } from './types.js'

class MarketplaceApi_notification {
  constructor(private http: VtexHttpClient) {}

  priceNotification(params: {
  sellerId: string
  skuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/notificator/${encodePathParam(params.sellerId)}/changenotification/${encodePathParam(params.skuId)}/price`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  inventoryNotification(params: {
  sellerId: string
  skuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/notificator/${encodePathParam(params.sellerId)}/changenotification/${encodePathParam(params.skuId)}/inventory`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }
}
class MarketplaceApi_matchedOffers {
  constructor(private http: VtexHttpClient) {}

  getofferslist(params: {
  sort?: string
  rows?: number
  start?: number
  fq?: string
} = {}, opts?: CallOptions): Promise<ResponseGetMatchedOffersList> {
    return this.http.request<ResponseGetMatchedOffersList>(withCall({ method: 'GET', path: `/offer-manager/pvt/offers`, query: { 'sort': params.sort, 'rows': params.rows, 'start': params.start, 'fq': params.fq }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getSKUoffers(params: {
  productId: string
  skuId: string
}, opts?: CallOptions): Promise<ResponseGetMatchedOffersDataBySKU> {
    return this.http.request<ResponseGetMatchedOffersDataBySKU>(withCall({ method: 'GET', path: `/offer-manager/pvt/product/${encodePathParam(params.productId)}/sku/${encodePathParam(params.skuId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getProductoffers(params: {
  productId: string
}, opts?: CallOptions): Promise<ResponseGetMatchedOffersDataByProductId> {
    return this.http.request<ResponseGetMatchedOffersDataByProductId>(withCall({ method: 'GET', path: `/offer-manager/pvt/product/${encodePathParam(params.productId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/seller-register/pvt/seller-leads`, query: { 'offset': params.offset, 'limit': params.limit, 'isConnected': params.isConnected, 'search': params.search, 'status': params.status, 'orderBy': params.orderBy }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  createSellerLead(params: {
  body: CreateSellerLeadRequest
}, opts?: CallOptions): Promise<ResponseCreateSellerLead> {
    return this.http.request<ResponseCreateSellerLead>(withCall({ method: 'POST', path: `/seller-register/pvt/seller-leads`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  retrieveSellerLead(params: {
  sellerLeadId: string | number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/seller-register/pvt/seller-leads/${encodePathParam(params.sellerLeadId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  acceptSellerLead(params: {
  sellerLeadId: string | number
  body: AcceptSellerLeadRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/seller-register/pvt/seller-leads/${encodePathParam(params.sellerLeadId)}`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  removeSellerLead(params: {
  sellerLeadId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/seller-register/pvt/seller-leads/${encodePathParam(params.sellerLeadId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  createSellerFromSellerLead(params: {
  sellerLeadId: string | number
  isActive?: boolean
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/seller-register/pvt/seller-leads/${encodePathParam(params.sellerLeadId)}/seller`, query: { 'isActive': params.isActive }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  resendSellerLeadRequest(params: {
  sellerLeadId: string | number
  body: ResendSellerLeadRequestRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/seller-register/pvt/seller-leads/${encodePathParam(params.sellerLeadId)}/status`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }
}
class MarketplaceApi_sellerCommissions {
  constructor(private http: VtexHttpClient) {}

  listSellerCommissions(params: {
  sellerId: string
}, opts?: CallOptions): Promise<ResponseSellerCommissionsID[]> {
    return this.http.request<ResponseSellerCommissionsID[]>(withCall({ method: 'GET', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}/commissions`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  bulkUpsertSellerCommissions(params: {
  sellerId: string
  body: BulkUpsertSellerCommissionsRequest[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}/commissions`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  retrieveSellerCommissions(params: {
  sellerId: string
  categoryId: string
}, opts?: CallOptions): Promise<ResponseSellerCommissionsID> {
    return this.http.request<ResponseSellerCommissionsID>(withCall({ method: 'GET', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}/commissions/${encodePathParam(params.categoryId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  removeSellerCommissions(params: {
  sellerId: string
  categoryId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}/commissions/${encodePathParam(params.categoryId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
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
} = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/seller-register/pvt/sellers`, query: { 'from': params.from, 'to': params.to, 'keyword': params.keyword, 'integration': params.integration, 'group ': params['group '], 'isActive': params.isActive, 'isBetterScope': params.isBetterScope, 'isVtex': params.isVtex, 'sc': params.sc, 'sellerType': params.sellerType, 'sort': params.sort }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  upsertSellerRequest(params: {
  body: UpsertSellerRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/seller-register/pvt/sellers`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getRetrieveSeller(params: {
  sellerId: string
  sc?: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}`, query: { 'sc': params.sc }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  updateSeller(params: {
  sellerId: string
  body: {
  operation: string
  path: string
  value: boolean
}[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }
}
class MarketplaceApi_salesChannelMapping {
  constructor(private http: VtexHttpClient) {}

  retrieveMapping(params: {
  sellerId: string
  an: string
}, opts?: CallOptions): Promise<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]> {
    return this.http.request<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]>(withCall({ method: 'GET', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}/sales-channel/mapping`, query: { 'an': params.an }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  upsertMapping(params: {
  sellerId: string
  an: string
  body: UpsertMappingRequest[]
}, opts?: CallOptions): Promise<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]> {
    return this.http.request<{
  marketplaceSalesChannel?: string
  sellerChannel?: string
}[]>(withCall({ method: 'PUT', path: `/seller-register/pvt/sellers/${encodePathParam(params.sellerId)}/sales-channel/mapping`, query: { 'an': params.an }, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }
}
class MarketplaceApi_affiliates {
  constructor(private http: VtexHttpClient) {}

  getFulfillmentPvtAffiliates(params: Record<string, never> = {}, opts?: CallOptions): Promise<ResponseListAffiliates> {
    return this.http.request<ResponseListAffiliates>(withCall({ method: 'GET', path: `/fulfillment/pvt/affiliates`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getFulfillmentPvtAffiliatesByAffiliateId(params: {
  affiliateId: string
}, opts?: CallOptions): Promise<ResponseGetAffiliates> {
    return this.http.request<ResponseGetAffiliates>(withCall({ method: 'GET', path: `/fulfillment/pvt/affiliates/${encodePathParam(params.affiliateId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  putFulfillmentPvtAffiliatesByAffiliateId(params: {
  affiliateId: string
  body: RequestUpdateAffiliate
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/fulfillment/pvt/affiliates/${encodePathParam(params.affiliateId)}`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  deleteFulfillmentPvtAffiliatesByAffiliateId(params: {
  affiliateId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/fulfillment/pvt/affiliates/${encodePathParam(params.affiliateId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
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
