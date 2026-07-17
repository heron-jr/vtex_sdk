import type { VtexHttpClient } from '../../core/http.js'
import type { FixedPrice, DateRange, Getprice, Getcomputedprice, PricingConfiguration } from './types.js'

class PricingApi_pricesAndFixedPrices {
  constructor(private http: VtexHttpClient) {}

  getPrice(params: {
  itemId: number
}): Promise<Getprice> {
    return this.http.request<Getprice>({ method: 'GET', path: `/pricing/prices/${params.itemId}` })
  }

  createUpdatePriceOrFixedPrice(params: {
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/pricing/prices/${params.itemId}`, body: params.body })
  }

  deletePrice(params: {
  itemId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/pricing/prices/${params.itemId}` })
  }

  getFixedPrices(params: {
  itemId: number
}): Promise<FixedPrice[]> {
    return this.http.request<FixedPrice[]>({ method: 'GET', path: `/pricing/prices/${params.itemId}/fixed` })
  }

  createUpdatePriceOrFixedPriceNoRemove(params: {
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/pricing/prices/${params.itemId}/fixed`, body: params.body })
  }

  getFixedPricesonapricetable(params: {
  itemId: number
  priceTableId: string
}): Promise<FixedPrice[]> {
    return this.http.request<FixedPrice[]>({ method: 'GET', path: `/pricing/prices/${params.itemId}/fixed/${params.priceTableId}` })
  }

  createorupdatefixedpricesonpricetableortradepolicy(params: {
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/pricing/prices/${params.itemId}/fixed/${params.priceTableId}`, body: params.body })
  }

  deletefixedpricesonapricetableortradepolicy(params: {
  itemId: number
  priceTableId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/pricing/prices/${params.itemId}/fixed/${params.priceTableId}` })
  }

  getPricingPricesByItemIdComputed(params: {
  itemId: number
  categoryIds?: number
  brandId?: number
  quantity?: number
}): Promise<Getcomputedprice[]> {
    return this.http.request<Getcomputedprice[]>({ method: 'GET', path: `/pricing/prices/${params.itemId}/computed`, query: { 'categoryIds': params.categoryIds, 'brandId': params.brandId, 'quantity': params.quantity } })
  }

  getComputedPricebypricetable(params: {
  itemId: number
  priceTableId: string
  categoryIds?: number
  brandId?: number
  quantity?: number
}): Promise<Getcomputedprice> {
    return this.http.request<Getcomputedprice>({ method: 'GET', path: `/pricing/prices/${params.itemId}/computed/${params.priceTableId}`, query: { 'categoryIds': params.categoryIds, 'brandId': params.brandId, 'quantity': params.quantity } })
  }
}
class PricingApi_pricingConfiguration {
  constructor(private http: VtexHttpClient) {}

  getPricingConfig(params: Record<string, never>): Promise<PricingConfiguration> {
    return this.http.request<PricingConfiguration>({ method: 'GET', path: `/pricing/config` })
  }

  getPricingv2Status(params: Record<string, never>): Promise<{
  isActive?: boolean
  hasMigrated?: boolean
}> {
    return this.http.request<{
  isActive?: boolean
  hasMigrated?: boolean
}>({ method: 'GET', path: `/pricing/migration` })
  }
}
class PricingApi_priceTables {
  constructor(private http: VtexHttpClient) {}

  getrulesforapricetable(params: {
  priceTableId: string
}): Promise<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: Record<string, unknown>
  brands?: Record<string, unknown>
  stockStatuses?: Record<string, unknown>
  internalCategories?: Record<string, unknown>
  markupRange?: {
  from?: number
  to?: number
}
  dateRange?: {
  from?: string
  to?: string
}
}
}[]
  percentualModifier?: number
}> {
    return this.http.request<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: Record<string, unknown>
  brands?: Record<string, unknown>
  stockStatuses?: Record<string, unknown>
  internalCategories?: Record<string, unknown>
  markupRange?: {
  from?: number
  to?: number
}
  dateRange?: {
  from?: string
  to?: string
}
}
}[]
  percentualModifier?: number
}>({ method: 'GET', path: `/pricing/pipeline/catalog/${params.priceTableId}` })
  }

  putPricingPipelineCatalogByPriceTableId(params: {
  priceTableId: string
  body: {
  rules: {
  id: number
  context: {
  categories: Record<string, unknown>
  brands: Record<string, unknown>
  stockStatuses?: Record<string, unknown>
  internalCategories?: Record<string, unknown>
  markupRange: {
  from: number
  to: number
}
  dateRange: {
  from: string
  to: string
}
}
  percentualModifier: number
}[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/pricing/pipeline/catalog/${params.priceTableId}`, body: params.body })
  }

  putPricingTablesByPriceTableId(params: {
  priceTableId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/pricing/tables/${params.priceTableId}` })
  }

  getallpricetablesandrules(params: Record<string, never>): Promise<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: Record<string, unknown>
  brands?: Record<string, unknown>
  stockStatuses?: Record<string, unknown>
  internalCategories?: Record<string, unknown>
  markupRange?: {
  from?: number
  to?: number
}
  dateRange?: {
  from?: string
  to?: string
}
}
}[]
  percentualModifier?: number
}[]> {
    return this.http.request<{
  tradePolicyId?: string
  rules?: {
  id?: number
  context?: {
  categories?: Record<string, unknown>
  brands?: Record<string, unknown>
  stockStatuses?: Record<string, unknown>
  internalCategories?: Record<string, unknown>
  markupRange?: {
  from?: number
  to?: number
}
  dateRange?: {
  from?: string
  to?: string
}
}
}[]
  percentualModifier?: number
}[]>({ method: 'GET', path: `/pricing/pipeline/catalog` })
  }

  listpricetables(params: Record<string, never>): Promise<string[]> {
    return this.http.request<string[]>({ method: 'GET', path: `/pricing/tables` })
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
