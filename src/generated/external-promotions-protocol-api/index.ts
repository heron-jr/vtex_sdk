import type { VtexHttpClient } from '../../core/http.js'

class ExternalPromotionsProtocolApi_externalPromotions {
  constructor(private http: VtexHttpClient) {}

  postCalculatePromotion(params: {
  body: {
  correlationId: string
  origin: "Marketplace" | "Fulfillment"
  shopperProfileId?: string
  salesChannelId: string
  couponCodes?: string[]
  utms?: {
  source?: string
  medium?: string
  campaign?: string
  internalCampaign?: string
}
  customFields?: Record<string, unknown>
  items: {
  id: string
  sellerId: string
  quantity: number
  price: number
  catalogInfo: {
  brandId: string
  categoryId: string
  productId: string
  collectionIds?: string[]
  ean?: string
  refId?: string
}
  paymentInfo?: {
  id: string
  value: number
}[]
  nativePromotionLayer?: {
  priceBeforeLayer: number
  priceAfterLayer: number
  appliedPromotions?: {
  id: string
  discount: number
  type: "Nominal"
}[]
}
}[]
}
}): Promise<{
  items: {
  id: string
  quantity: number
  promotions?: {
  id: string
  discount: number
  type: "Nominal"
}[]
  originalPrice: number
  discountedPrice?: number
  externalPromotionLayer?: {
  priceBeforeLayer: number
  priceAfterLayer: number
  appliedPromotions?: {
  id: string
  discount: number
  type: "Nominal"
}[]
}
}[]
  allPromotions?: {
  id: string
  name: string
  description: string
  couponCode?: string
  qualificationProgress?: {
  remainingCartWideAmount?: number
  orderSubtotalMustExceed?: number
  remainingItemQuantity?: {
  totalUnitsRemaining?: number
  perSku?: {
  skuId: string
  unitsInCart?: number
  unitsRequiredForPromotion?: number
  unitsRemaining?: number
}[]
}
  minimumRuleQuantity?: number
  contextTotalForQualifyingItems?: {
  minValue?: number
  maxValue?: number
  itemScope?: "AllItems" | "IncludeMatchedItems" | "ExcludeMatchedItems"
}
  itemUnitPriceBounds?: {
  minPrice?: number
  maxPrice?: number
}
  skuIdGroups?: {
  allOf?: string[]
  group1?: string[]
  group2?: string[]
}
  productCollectionIds?: string[]
  brandIds?: string[]
  categoryIds?: string[]
  zipCodeRangeSegments?: {
  from?: string
  to?: string
  inclusivity?: "inclusive" | "exclusive"
}[]
  paymentMethodIds?: string[]
  cardIssuerIds?: string[]
  cardBinPrefixRestrictions?: string[]
  minInstallmentCount?: number
  maxInstallmentCount?: number
  teaserStyleHints?: "UpPrice" | "Profiler" | "Catalog" | "ConditionalPrice"[]
}
}[]
}> {
    return this.http.request<{
  items: {
  id: string
  quantity: number
  promotions?: {
  id: string
  discount: number
  type: "Nominal"
}[]
  originalPrice: number
  discountedPrice?: number
  externalPromotionLayer?: {
  priceBeforeLayer: number
  priceAfterLayer: number
  appliedPromotions?: {
  id: string
  discount: number
  type: "Nominal"
}[]
}
}[]
  allPromotions?: {
  id: string
  name: string
  description: string
  couponCode?: string
  qualificationProgress?: {
  remainingCartWideAmount?: number
  orderSubtotalMustExceed?: number
  remainingItemQuantity?: {
  totalUnitsRemaining?: number
  perSku?: {
  skuId: string
  unitsInCart?: number
  unitsRequiredForPromotion?: number
  unitsRemaining?: number
}[]
}
  minimumRuleQuantity?: number
  contextTotalForQualifyingItems?: {
  minValue?: number
  maxValue?: number
  itemScope?: "AllItems" | "IncludeMatchedItems" | "ExcludeMatchedItems"
}
  itemUnitPriceBounds?: {
  minPrice?: number
  maxPrice?: number
}
  skuIdGroups?: {
  allOf?: string[]
  group1?: string[]
  group2?: string[]
}
  productCollectionIds?: string[]
  brandIds?: string[]
  categoryIds?: string[]
  zipCodeRangeSegments?: {
  from?: string
  to?: string
  inclusivity?: "inclusive" | "exclusive"
}[]
  paymentMethodIds?: string[]
  cardIssuerIds?: string[]
  cardBinPrefixRestrictions?: string[]
  minInstallmentCount?: number
  maxInstallmentCount?: number
  teaserStyleHints?: "UpPrice" | "Profiler" | "Catalog" | "ConditionalPrice"[]
}
}[]
}>({ method: 'POST', path: `/calculatePromotion`, body: params.body })
  }

  postNotifyUsage(params: {
  body: {
  correlationId?: string
  orderId: string
  type: "NewOrder" | "OrderCancellation"
  promotionUsages: {
  promotionId: string
  discount: number
  couponCode?: string
}[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/notifyUsage`, body: params.body })
  }
}

export class ExternalPromotionsProtocolApi {
  readonly externalPromotions: ExternalPromotionsProtocolApi_externalPromotions
  constructor(http: VtexHttpClient) {
    this.externalPromotions = new ExternalPromotionsProtocolApi_externalPromotions(http)
  }
}
