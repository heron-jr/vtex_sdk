import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class SkuBindingsApi_skuBindings {
  constructor(private http: VtexHttpClient) {}

  getbySkuId(params: {
  skuId: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/sku-binding/pvt/skusellers/${encodePathParam(params.skuId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getpagedadmin(params: {
  sellerId?: string
  skuId?: string
  sellerSkuId?: string
  isActive?: boolean
  size?: string
} = {}, opts?: CallOptions): Promise<{
  IsPersisted?: boolean
  IsRemoved?: boolean
  SkuSellerId?: number
  UpdateDate?: string
  RequestedUpdateDate?: string | null
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
  RequestedUpdateDate?: string | null
  SellerStockKeepingUnitId?: string
  SellerId?: string
  StockKeepingUnitId?: number
  IsActive?: boolean
}[]>(withCall({ method: 'GET', path: `/sku-binding/pvt/skuseller/admin`, query: { 'sellerId': params.sellerId, 'skuId': params.skuId, 'sellerSkuId': params.sellerSkuId, 'isActive': params.isActive, 'size': params.size }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getSKUseller(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<{
  IsPersisted: boolean
  IsRemoved: boolean
  SkuSellerId: number
  UpdateDate: string
  RequestedUpdateDate: string | null
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
  RequestedUpdateDate: string | null
  SellerStockKeepingUnitId: string
  SellerId: string
  StockKeepingUnitId: number
  IsActive: boolean
}>(withCall({ method: 'GET', path: `/sku-binding/pvt/skuseller/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  bindtoanothersku(params: {
  sellerId: string
  sellerSkuId: string
  body: {
  StockKeepingUnitId: number
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/sku-binding/pvt/skuseller/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getallbySellerId(params: {
  sellerId: string
}, opts?: CallOptions): Promise<{
  SellerStockKeepingUnitId?: string
  FreightCommissionPercentage?: number | null
  ProductCommissionPercentage?: number | null
  SellerId?: string
  StockKeepingUnitId?: number
  IsActive?: boolean
}[]> {
    return this.http.request<{
  SellerStockKeepingUnitId?: string
  FreightCommissionPercentage?: number | null
  ProductCommissionPercentage?: number | null
  SellerId?: string
  StockKeepingUnitId?: number
  IsActive?: boolean
}[]>(withCall({ method: 'GET', path: `/sku-binding/pvt/skuseller/list/bysellerId/${encodePathParam(params.sellerId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  getpagedbySellerId(params: {
  sellerId: string
  page: string
  size: string
}, opts?: CallOptions): Promise<{
  SellerId?: string
  StockKeepingUnitId?: number
  SellerStockKeepingUnitId?: string
  IsActive?: boolean
  FreightCommissionPercentage?: number | null
  ProductCommissionPercentage?: number | null
}[]> {
    return this.http.request<{
  SellerId?: string
  StockKeepingUnitId?: number
  SellerStockKeepingUnitId?: string
  IsActive?: boolean
  FreightCommissionPercentage?: number | null
  ProductCommissionPercentage?: number | null
}[]>(withCall({ method: 'GET', path: `/sku-binding/pvt/skuseller/paged/sellerid/${encodePathParam(params.sellerId)}`, query: { 'page': params.page, 'size': params.size }, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  changeNotification(params: {
  skuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/sku-binding/pvt/skuseller/changenotification/${encodePathParam(params.skuId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  postSkuBindingPvtSkusellerChangenotificationBySellerIdBySellerSkuId(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/sku-binding/pvt/skuseller/changenotification/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  insertSKUBinding(params: {
  body: {
  StockKeepingUnitId: number
  IsActive: boolean
  SellerId: string
  SellerStockKeepingUnitId: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/sku-binding/pvt/skuseller/insertion`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  activateSKUBinding(params: {
  sellerId: string
  skuSellerId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/sku-binding/pvt/skuseller/activate/${encodePathParam(params.sellerId)}/${encodePathParam(params.skuSellerId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  deactivateSKUBinding(params: {
  sellerId: string
  skuSellerId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/sku-binding/pvt/skuseller/inactivate/${encodePathParam(params.sellerId)}/${encodePathParam(params.skuSellerId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }

  deleteSKUsellerassociation(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/sku-binding/pvt/skuseller/remove/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}`, server: 'https://{accountName}.{environment}.com.br/api' }, opts))
  }
}

export class SkuBindingsApi {
  readonly skuBindings: SkuBindingsApi_skuBindings
  constructor(http: VtexHttpClient) {
    this.skuBindings = new SkuBindingsApi_skuBindings(http)
  }
}
