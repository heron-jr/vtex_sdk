import type { VtexHttpClient } from '../../core/http.js'

class SkuBindingsApi_skuBindings {
  constructor(private http: VtexHttpClient) {}

  getbySkuId(params: {
  skuId: string
}): Promise<{
  Id?: number
  SellerId?: string
  StockKeepingUnitId?: number
  SellerSkuId?: string
  IsActive?: boolean
  LastUpdateDate?: string
  SalesPolicy?: number
}[]> {
    return this.http.request<{
  Id?: number
  SellerId?: string
  StockKeepingUnitId?: number
  SellerSkuId?: string
  IsActive?: boolean
  LastUpdateDate?: string
  SalesPolicy?: number
}[]>({ method: 'GET', path: `/sku-binding/pvt/skusellers/${params.skuId}` })
  }

  getpagedadmin(params: {
  sellerId?: string
  skuId?: string
  sellerSkuId?: string
  isActive?: boolean
  size?: string
}): Promise<{
  IsPersisted?: boolean
  IsRemoved?: boolean
  SkuSellerId?: number
  UpdateDate?: string
  RequestedUpdateDate?: string
  SellerStockKeepingUnitId?: string
  SellerId?: string
  StockKeepingUnitId?: number
  IsActive?: boolean
}[]> {
    return this.http.request<{
  IsPersisted?: boolean
  IsRemoved?: boolean
  SkuSellerId?: number
  UpdateDate?: string
  RequestedUpdateDate?: string
  SellerStockKeepingUnitId?: string
  SellerId?: string
  StockKeepingUnitId?: number
  IsActive?: boolean
}[]>({ method: 'GET', path: `/sku-binding/pvt/skuseller/admin`, query: { 'sellerId': params.sellerId, 'skuId': params.skuId, 'sellerSkuId': params.sellerSkuId, 'isActive': params.isActive, 'size': params.size } })
  }

  getSKUseller(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<{
  IsPersisted: boolean
  IsRemoved: boolean
  SkuSellerId: number
  UpdateDate: string
  RequestedUpdateDate: string
  SellerStockKeepingUnitId: string
  SellerId: string
  StockKeepingUnitId: number
  IsActive: boolean
}> {
    return this.http.request<{
  IsPersisted: boolean
  IsRemoved: boolean
  SkuSellerId: number
  UpdateDate: string
  RequestedUpdateDate: string
  SellerStockKeepingUnitId: string
  SellerId: string
  StockKeepingUnitId: number
  IsActive: boolean
}>({ method: 'GET', path: `/sku-binding/pvt/skuseller/${params.sellerId}/${params.sellerSkuId}` })
  }

  bindtoanothersku(params: {
  sellerId: string
  sellerSkuId: string
  body: {
  StockKeepingUnitId: number
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/sku-binding/pvt/skuseller/${params.sellerId}/${params.sellerSkuId}`, body: params.body })
  }

  getallbySellerId(params: {
  sellerId: string
}): Promise<{
  SellerStockKeepingUnitId?: string
  FreightCommissionPercentage?: number
  ProductCommissionPercentage?: number
  SellerId?: string
  StockKeepingUnitId?: number
  IsActive?: boolean
}[]> {
    return this.http.request<{
  SellerStockKeepingUnitId?: string
  FreightCommissionPercentage?: number
  ProductCommissionPercentage?: number
  SellerId?: string
  StockKeepingUnitId?: number
  IsActive?: boolean
}[]>({ method: 'GET', path: `/sku-binding/pvt/skuseller/list/bysellerId/${params.sellerId}` })
  }

  getpagedbySellerId(params: {
  sellerId: string
  page: string
  size: string
}): Promise<{
  SellerId?: string
  StockKeepingUnitId?: number
  SellerStockKeepingUnitId?: string
  IsActive?: boolean
  FreightCommissionPercentage?: number
  ProductCommissionPercentage?: number
}[]> {
    return this.http.request<{
  SellerId?: string
  StockKeepingUnitId?: number
  SellerStockKeepingUnitId?: string
  IsActive?: boolean
  FreightCommissionPercentage?: number
  ProductCommissionPercentage?: number
}[]>({ method: 'GET', path: `/sku-binding/pvt/skuseller/paged/sellerid/${params.sellerId}`, query: { 'page': params.page, 'size': params.size } })
  }

  changeNotification(params: {
  skuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/sku-binding/pvt/skuseller/changenotification/${params.skuId}` })
  }

  postSkuBindingPvtSkusellerChangenotificationBySellerIdBySellerSkuId(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/sku-binding/pvt/skuseller/changenotification/${params.sellerId}/${params.sellerSkuId}` })
  }

  insertSKUBinding(params: {
  body: {
  StockKeepingUnitId: number
  IsActive: boolean
  SellerId: string
  SellerStockKeepingUnitId: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/sku-binding/pvt/skuseller/insertion`, body: params.body })
  }

  activateSKUBinding(params: {
  sellerId: string
  skuSellerId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/sku-binding/pvt/skuseller/activate/${params.sellerId}/${params.skuSellerId}` })
  }

  deactivateSKUBinding(params: {
  sellerId: string
  skuSellerId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/sku-binding/pvt/skuseller/inactivate/${params.sellerId}/${params.skuSellerId}` })
  }

  deleteSKUsellerassociation(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/sku-binding/pvt/skuseller/remove/${params.sellerId}/${params.sellerSkuId}` })
  }
}

export class SkuBindingsApi {
  readonly skuBindings: SkuBindingsApi_skuBindings
  constructor(http: VtexHttpClient) {
    this.skuBindings = new SkuBindingsApi_skuBindings(http)
  }
}
