import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { FixedPrice, DateRange, Getprice, Getcomputedprice, PricingConfiguration } from './types.js'

class PricingApi_pricesAndFixedPrices {
  constructor(private http: VtexHttpClient) {}

  async getPrice(params: {
  itemId: number
}, opts?: CallOptions): Promise<Getprice> {
    return this.http.request<Getprice>(withCall({ method: 'GET', path: `/pricing/prices/${encodePathParam(params.itemId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async createUpdatePriceOrFixedPrice(params: {
  itemId: number
  body: {
  markup?: number
  listPrice?: number
  basePrice?: number
  costPrice?: number
  fixedPrices?: {
  tradePolicyId: string
  value: number
  listPrice?: number
  minQuantity: number
  dateRange?: {
  from: string
  to: string
}
}[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/pricing/prices/${encodePathParam(params.itemId)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async deletePrice(params: {
  itemId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/pricing/prices/${encodePathParam(params.itemId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getFixedPrices(params: {
  itemId: number
}, opts?: CallOptions): Promise<FixedPrice[]> {
    return this.http.request<FixedPrice[]>(withCall({ method: 'GET', path: `/pricing/prices/${encodePathParam(params.itemId)}/fixed`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async createUpdatePriceOrFixedPriceNoRemove(params: {
  itemId: number
  body: {
  tradePolicyId: string
  value: number
  listPrice?: number
  minQuantity: number
  dateRange?: {
  from: string
  to: string
}
}[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/pricing/prices/${encodePathParam(params.itemId)}/fixed`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getFixedPricesonapricetable(params: {
  itemId: number
  priceTableId: string
}, opts?: CallOptions): Promise<FixedPrice[]> {
    return this.http.request<FixedPrice[]>(withCall({ method: 'GET', path: `/pricing/prices/${encodePathParam(params.itemId)}/fixed/${encodePathParam(params.priceTableId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async createorupdatefixedpricesonpricetableortradepolicy(params: {
  itemId: number
  priceTableId: string
  body: {
  value: number
  listPrice?: number
  minQuantity: number
  dateRange?: {
  from: string
  to: string
}
}[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/pricing/prices/${encodePathParam(params.itemId)}/fixed/${encodePathParam(params.priceTableId)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async deletefixedpricesonapricetableortradepolicy(params: {
  itemId: number
  priceTableId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/pricing/prices/${encodePathParam(params.itemId)}/fixed/${encodePathParam(params.priceTableId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getPricingPricesByItemIdComputed(params: {
  itemId: number
  categoryIds?: number
  brandId?: number
  quantity?: number
}, opts?: CallOptions): Promise<Getcomputedprice[]> {
    return this.http.request<Getcomputedprice[]>(withCall({ method: 'GET', path: `/pricing/prices/${encodePathParam(params.itemId)}/computed`, query: { 'categoryIds': params.categoryIds, 'brandId': params.brandId, 'quantity': params.quantity }, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getComputedPricebypricetable(params: {
  itemId: number
  priceTableId: string
  categoryIds?: number
  brandId?: number
  quantity?: number
}, opts?: CallOptions): Promise<Getcomputedprice> {
    return this.http.request<Getcomputedprice>(withCall({ method: 'GET', path: `/pricing/prices/${encodePathParam(params.itemId)}/computed/${encodePathParam(params.priceTableId)}`, query: { 'categoryIds': params.categoryIds, 'brandId': params.brandId, 'quantity': params.quantity }, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}
class PricingApi_pricingConfiguration {
  constructor(private http: VtexHttpClient) {}

  async getPricingConfig(params: Record<string, never> = {}, opts?: CallOptions): Promise<PricingConfiguration> {
    return this.http.request<PricingConfiguration>(withCall({ method: 'GET', path: `/pricing/config`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getPricingv2Status(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  isActive?: boolean
  hasMigrated?: boolean
}> {
    return this.http.request<{
  isActive?: boolean
  hasMigrated?: boolean
}>(withCall({ method: 'GET', path: `/pricing/migration`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}
class PricingApi_priceTables {
  constructor(private http: VtexHttpClient) {}

  async getrulesforapricetable(params: {
  priceTableId: string
}, opts?: CallOptions): Promise<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: {
  [key: string]: string
}
  brands?: {
  [key: string]: string
}
  stockStatuses?: Record<string, unknown> | null
  internalCategories?: Record<string, unknown> | null
  markupRange?: {
  from?: number
  to?: number
} | null
  dateRange?: {
  from?: string
  to?: string
} | null
}
}[]
  percentualModifier?: number
}> {
    return this.http.request<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: {
  [key: string]: string
}
  brands?: {
  [key: string]: string
}
  stockStatuses?: Record<string, unknown> | null
  internalCategories?: Record<string, unknown> | null
  markupRange?: {
  from?: number
  to?: number
} | null
  dateRange?: {
  from?: string
  to?: string
} | null
}
}[]
  percentualModifier?: number
}>(withCall({ method: 'GET', path: `/pricing/pipeline/catalog/${encodePathParam(params.priceTableId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async putPricingPipelineCatalogByPriceTableId(params: {
  priceTableId: string
  body: {
  rules: {
  id: number
  context: {
  categories: {
  [key: string]: string
}
  brands: {
  [key: string]: string
}
  stockStatuses?: Record<string, unknown> | null
  internalCategories?: Record<string, unknown> | null
  markupRange: {
  from: number
  to: number
} | null
  dateRange: {
  from: string
  to: string
}
}
  percentualModifier: number
}[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/pricing/pipeline/catalog/${encodePathParam(params.priceTableId)}`, body: params.body, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async putPricingTablesByPriceTableId(params: {
  priceTableId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/pricing/tables/${encodePathParam(params.priceTableId)}`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async getallpricetablesandrules(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: {
  [key: string]: string
}
  brands?: {
  [key: string]: string
}
  stockStatuses?: Record<string, unknown> | null
  internalCategories?: Record<string, unknown> | null
  markupRange?: {
  from?: number
  to?: number
} | null
  dateRange?: {
  from?: string
  to?: string
} | null
}
}[]
  percentualModifier?: number
}[]> {
    return this.http.request<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: {
  [key: string]: string
}
  brands?: {
  [key: string]: string
}
  stockStatuses?: Record<string, unknown> | null
  internalCategories?: Record<string, unknown> | null
  markupRange?: {
  from?: number
  to?: number
} | null
  dateRange?: {
  from?: string
  to?: string
} | null
}
}[]
  percentualModifier?: number
}[]>(withCall({ method: 'GET', path: `/pricing/pipeline/catalog`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }

  async listpricetables(params: Record<string, never> = {}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'GET', path: `/pricing/tables`, server: 'https://api.vtex.com/{accountName}' }, opts))
  }
}

export class PricingApi {
  readonly pricesAndFixedPrices: PricingApi_pricesAndFixedPrices
  readonly pricingConfiguration: PricingApi_pricingConfiguration
  readonly priceTables: PricingApi_priceTables
  constructor(http: VtexHttpClient) {
    this.pricesAndFixedPrices = new PricingApi_pricesAndFixedPrices(http)
    this.pricingConfiguration = new PricingApi_pricingConfiguration(http)
    this.priceTables = new PricingApi_priceTables(http)
  }
}
