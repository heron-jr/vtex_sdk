import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { GetPromotions, GetTaxes } from './types.js'

class PromotionsTaxesApi_coupons {
  constructor(private http: VtexHttpClient) {}

  async createMultipleCoupons(params: {
  body: {
  quantity: number
  couponConfiguration: {
  utmSource: string
  utmCampaign: string
  couponCode: string
  isArchived?: boolean
  maxItemsPerClient: number
  expirationIntervalPerUse: string
  maxUsage?: number
}
}[]
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'POST', path: `/api/rnb/pvt/multiple-coupons`, body: params.body }, opts))
  }

  async getall(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}[]> {
    return this.http.request<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}[]>(withCall({ method: 'GET', path: `/api/rnb/pvt/coupon` }, opts))
  }

  async createOrUpdateCoupon(params: {
  body: {
  utmSource: string
  utmCampaign?: string
  couponCode: string
  isArchived?: boolean
  maxItemsPerClient: number
  expirationIntervalPerUse: string
  maxUsage?: number
}
}, opts?: CallOptions): Promise<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
}> {
    return this.http.request<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
}>(withCall({ method: 'POST', path: `/api/rnb/pvt/coupon`, body: params.body }, opts))
  }

  async getbycouponcode(params: {
  couponCode: string
}, opts?: CallOptions): Promise<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}> {
    return this.http.request<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/coupon/${encodePathParam(params.couponCode)}` }, opts))
  }

  async getarchivedbycouponcode(params: {
  couponCode: string
}, opts?: CallOptions): Promise<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}> {
    return this.http.request<{
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/archive/coupon/${encodePathParam(params.couponCode)}` }, opts))
  }

  async archivebycouponcode(params: {
  couponCode: string
}, opts?: CallOptions): Promise<string> {
    return this.http.request<string>(withCall({ method: 'POST', path: `/api/rnb/pvt/archive/coupon/${encodePathParam(params.couponCode)}` }, opts))
  }

  async massiveGeneration(params: {
  quantity: number
  body: {
  utmSource: string
  utmCampaign: string
  couponCode: string
  maxItemsPerClient: number
  expirationIntervalPerUse: string
}
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'POST', path: `/api/rnb/pvt/coupons`, query: { 'quantity': params.quantity }, body: params.body }, opts))
  }

  async getusage(params: {
  couponCode: string
}, opts?: CallOptions): Promise<{
  hostName?: string
  couponCode?: string
  profileUsages?: {
  [key: string]: {
  orderUsage?: {
  orderId?: string
  usageDateUtc?: string
}[]
}
}
}> {
    return this.http.request<{
  hostName?: string
  couponCode?: string
  profileUsages?: {
  [key: string]: {
  orderUsage?: {
  orderId?: string
  usageDateUtc?: string
}[]
}
}
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/coupon/usage/${encodePathParam(params.couponCode)}` }, opts))
  }

  async unarchivebycouponcode(params: {
  couponCode: string
}, opts?: CallOptions): Promise<string> {
    return this.http.request<string>(withCall({ method: 'POST', path: `/api/rnb/pvt/unarchive/coupon/${encodePathParam(params.couponCode)}` }, opts))
  }
}
class PromotionsTaxesApi_promotionsAndTaxes {
  constructor(private http: VtexHttpClient) {}

  async getAllBenefits(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  limitConfigurationMaxPrice?: {
  activesCount?: number
  limit?: number
}
  limitConfiguration?: {
  activesCount?: number
  limit?: number
}
  items?: GetPromotions
  disabledItems?: string[]
  archivedItems?: string[]
  nominalDiscountType?: string
}> {
    return this.http.request<{
  limitConfigurationMaxPrice?: {
  activesCount?: number
  limit?: number
}
  limitConfiguration?: {
  activesCount?: number
  limit?: number
}
  items?: GetPromotions
  disabledItems?: string[]
  archivedItems?: string[]
  nominalDiscountType?: string
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/benefits/calculatorconfiguration` }, opts))
  }

  async searchPromotion(params: {
  byName: string
}, opts?: CallOptions): Promise<{
  idCalculatorConfiguration?: string
  name?: string
  description?: string
  beginDateUtc?: string
  endDateUtc?: string
  lastModified?: string
  daysAgoOfPurchases?: number
  isActive?: boolean
  isArchived?: boolean
  isFeatured?: boolean
  disableDeal?: boolean
  activeDaysOfWeek?: string[]
  offset?: number
  activateGiftsMultiplier?: boolean
  newOffset?: number
  maxPricesPerItems?: string[]
  cumulative?: boolean
  effectType?: string
  discountType?: string
  nominalShippingDiscountValue?: number
  absoluteShippingDiscountValue?: number
  nominalDiscountValue?: number
  nominalDiscountType?: string
  maximumUnitPriceDiscount?: number
  percentualDiscountValue?: number
  rebatePercentualDiscountValue?: number
  percentualShippingDiscountValue?: number
  percentualTax?: number
  shippingPercentualTax?: number
  percentualDiscountValueList1?: number
  percentualDiscountValueList2?: number
  skusGift?: {
  quantitySelectable?: number
  gifts?: number
}
  nominalRewardValue?: number
  percentualRewardValue?: number
  orderStatusRewardValue?: string
  maxNumberOfAffectedItems?: number
  maxNumberOfAffectedItemsGroupKey?: string
  applyToAllShippings?: boolean
  nominalTax?: number
  origin?: string
  idSeller?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  conditionsIds?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  utmSource?: string
  utmCampaign?: string
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  clusterOperator?: string
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  accumulateWithManualPrice?: boolean
  type?: string
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
}[]> {
    return this.http.request<{
  idCalculatorConfiguration?: string
  name?: string
  description?: string
  beginDateUtc?: string
  endDateUtc?: string
  lastModified?: string
  daysAgoOfPurchases?: number
  isActive?: boolean
  isArchived?: boolean
  isFeatured?: boolean
  disableDeal?: boolean
  activeDaysOfWeek?: string[]
  offset?: number
  activateGiftsMultiplier?: boolean
  newOffset?: number
  maxPricesPerItems?: string[]
  cumulative?: boolean
  effectType?: string
  discountType?: string
  nominalShippingDiscountValue?: number
  absoluteShippingDiscountValue?: number
  nominalDiscountValue?: number
  nominalDiscountType?: string
  maximumUnitPriceDiscount?: number
  percentualDiscountValue?: number
  rebatePercentualDiscountValue?: number
  percentualShippingDiscountValue?: number
  percentualTax?: number
  shippingPercentualTax?: number
  percentualDiscountValueList1?: number
  percentualDiscountValueList2?: number
  skusGift?: {
  quantitySelectable?: number
  gifts?: number
}
  nominalRewardValue?: number
  percentualRewardValue?: number
  orderStatusRewardValue?: string
  maxNumberOfAffectedItems?: number
  maxNumberOfAffectedItemsGroupKey?: string
  applyToAllShippings?: boolean
  nominalTax?: number
  origin?: string
  idSeller?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  conditionsIds?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  utmSource?: string
  utmCampaign?: string
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  clusterOperator?: string
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  accumulateWithManualPrice?: boolean
  type?: string
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
}[]>(withCall({ method: 'GET', path: `/api/rnb/pvt/benefits/calculatorconfiguration/search`, query: { 'byName': params.byName } }, opts))
  }

  async getAllTaxes(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  limitConfiguration?: {
  activesCount?: number
  limit?: number
}
  items?: GetTaxes
  disabledItems?: string[]
  archivedItems?: string[]
}> {
    return this.http.request<{
  limitConfiguration?: {
  activesCount?: number
  limit?: number
}
  items?: GetTaxes
  disabledItems?: string[]
  archivedItems?: string[]
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/taxes/calculatorconfiguration` }, opts))
  }

  async getCalculatorConfigurationById(params: {
  idCalculatorConfiguration: string
}, opts?: CallOptions): Promise<{
  idCalculatorConfiguration?: string
  name?: string
  description?: string
  beginDateUtc?: string
  endDateUtc?: string
  lastModified?: string
  daysAgoOfPurchases?: number
  isActive?: boolean
  isArchived?: boolean
  isFeatured?: boolean
  disableDeal?: boolean
  activeDaysOfWeek?: string[]
  offset?: number
  activateGiftsMultiplier?: boolean
  newOffset?: number
  maxPricesPerItems?: string[]
  cumulative?: boolean
  discountType?: string
  nominalShippingDiscountValue?: number
  absoluteShippingDiscountValue?: number
  nominalDiscountValue?: number
  nominalDiscountType?: string
  maximumUnitPriceDiscount?: number
  percentualDiscountValue?: number
  rebatePercentualDiscountValue?: number
  percentualShippingDiscountValue?: number
  percentualTax?: number
  shippingPercentualTax?: number
  percentualDiscountValueList1?: number
  percentualDiscountValueList2?: number
  skusGift?: {
  quantitySelectable?: number
  gifts?: number
}
  nominalRewardValue?: number
  percentualRewardValue?: number
  orderStatusRewardValue?: string
  maxNumberOfAffectedItems?: number
  maxNumberOfAffectedItemsGroupKey?: string
  applyToAllShippings?: boolean
  nominalTax?: number
  origin?: string
  idSeller?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  conditionsIds?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id: string
  name: string
}[]
  skusAreInclusive?: boolean
  utmSource?: string
  utmCampaign?: string
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  countries?: string[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  multipleSkusCause?: {
  [key: string]: string
}
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  accumulateWithManualPrice?: boolean
  type?: string
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  optIn?: {
  sellers?: string[]
} | null
}> {
    return this.http.request<{
  idCalculatorConfiguration?: string
  name?: string
  description?: string
  beginDateUtc?: string
  endDateUtc?: string
  lastModified?: string
  daysAgoOfPurchases?: number
  isActive?: boolean
  isArchived?: boolean
  isFeatured?: boolean
  disableDeal?: boolean
  activeDaysOfWeek?: string[]
  offset?: number
  activateGiftsMultiplier?: boolean
  newOffset?: number
  maxPricesPerItems?: string[]
  cumulative?: boolean
  discountType?: string
  nominalShippingDiscountValue?: number
  absoluteShippingDiscountValue?: number
  nominalDiscountValue?: number
  nominalDiscountType?: string
  maximumUnitPriceDiscount?: number
  percentualDiscountValue?: number
  rebatePercentualDiscountValue?: number
  percentualShippingDiscountValue?: number
  percentualTax?: number
  shippingPercentualTax?: number
  percentualDiscountValueList1?: number
  percentualDiscountValueList2?: number
  skusGift?: {
  quantitySelectable?: number
  gifts?: number
}
  nominalRewardValue?: number
  percentualRewardValue?: number
  orderStatusRewardValue?: string
  maxNumberOfAffectedItems?: number
  maxNumberOfAffectedItemsGroupKey?: string
  applyToAllShippings?: boolean
  nominalTax?: number
  origin?: string
  idSeller?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  conditionsIds?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id: string
  name: string
}[]
  skusAreInclusive?: boolean
  utmSource?: string
  utmCampaign?: string
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  countries?: string[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  multipleSkusCause?: {
  [key: string]: string
}
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  accumulateWithManualPrice?: boolean
  type?: string
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  optIn?: {
  sellers?: string[]
} | null
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/calculatorconfiguration/${encodePathParam(params.idCalculatorConfiguration)}` }, opts))
  }

  async optSellerInOrOutOfPromotion(params: {
  promotionId: string
  an: string
  'if-Match': string
  body: {
  sellerIds: string[]
  operation: "OptIn" | "OptOut"
}
}, opts?: CallOptions): Promise<{
  lastModified?: string
}> {
    return this.http.request<{
  lastModified?: string
}>(withCall({ method: 'POST', path: `/api/rnb/pvt/calculatorconfiguration/${encodePathParam(params.promotionId)}/seller-opt`, query: { 'an': params.an }, headers: { 'if-Match': params['if-Match'] }, body: params.body }, opts))
  }

  async createOrUpdateCalculatorConfiguration(params: {
  body: {
  idCalculatorConfiguration?: string
  name?: string
  description?: string
  beginDateUtc: string
  endDateUtc?: string
  lastModified?: string
  daysAgoOfPurchases?: number
  isActive: boolean
  isArchived?: boolean
  isFeatured?: boolean
  disableDeal?: boolean
  activeDaysOfWeek?: string[]
  offset?: number
  activateGiftsMultiplier?: boolean
  newOffset?: number
  maxPricesPerItems?: string[]
  cumulative?: boolean
  discountType?: string
  nominalShippingDiscountValue?: number
  absoluteShippingDiscountValue?: number
  nominalDiscountValue?: number
  nominalDiscountType?: string
  maximumUnitPriceDiscount?: number
  percentualDiscountValue?: number
  rebatePercentualDiscountValue?: number
  percentualShippingDiscountValue: number
  percentualTax?: number
  shippingPercentualTax?: number
  percentualDiscountValueList1?: number
  percentualDiscountValueList2?: number
  skusGift?: {
  quantitySelectable?: number
  gifts?: string[]
}
  nominalRewardValue?: number
  percentualRewardValue?: number
  orderStatusRewardValue?: string
  maxNumberOfAffectedItems?: number
  maxNumberOfAffectedItemsGroupKey?: "perProductId" | "perCart" | "perSku"
  applyToAllShippings?: boolean
  nominalTax?: number
  origin: string
  idSeller?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  conditionsIds?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  utmSource?: string
  utmCampaign?: string
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  accumulateWithManualPrice?: boolean
  type: string
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  optIn?: {
  sellers?: string[]
} | null
}
}, opts?: CallOptions): Promise<{
  idCalculatorConfiguration?: string
  name?: string
  description?: string
  beginDateUtc?: string
  endDateUtc?: string
  lastModified?: string
  daysAgoOfPurchases?: number
  isActive?: boolean
  isArchived?: boolean
  isFeatured?: boolean
  disableDeal?: boolean
  activeDaysOfWeek?: string[]
  offset?: number
  activateGiftsMultiplier?: boolean
  newOffset?: number
  maxPricesPerItems?: string[]
  cumulative?: boolean
  discountType?: string
  nominalShippingDiscountValue?: number
  absoluteShippingDiscountValue?: number
  nominalDiscountValue?: number
  maximumUnitPriceDiscount?: number
  percentualDiscountValue?: number
  rebatePercentualDiscountValue?: number
  percentualShippingDiscountValue?: number
  percentualTax?: number
  shippingPercentualTax?: number
  percentualDiscountValueList1?: number
  percentualDiscountValueList2?: number
  skusGift?: {
  quantitySelectable?: number
  gifts?: number
}
  nominalRewardValue?: number
  percentualRewardValue?: number
  orderStatusRewardValue?: string
  maxNumberOfAffectedItems?: number
  maxNumberOfAffectedItemsGroupKey?: "perProductId" | "perCart" | "perSku"
  applyToAllShippings?: boolean
  nominalTax?: number
  origin?: string
  idSeller?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  conditionsIds?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  utmSource?: string
  utmCampaign?: string
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  accumulateWithManualPrice?: boolean
  type?: string
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  optIn?: {
  sellers?: string[]
} | null
}> {
    return this.http.request<{
  idCalculatorConfiguration?: string
  name?: string
  description?: string
  beginDateUtc?: string
  endDateUtc?: string
  lastModified?: string
  daysAgoOfPurchases?: number
  isActive?: boolean
  isArchived?: boolean
  isFeatured?: boolean
  disableDeal?: boolean
  activeDaysOfWeek?: string[]
  offset?: number
  activateGiftsMultiplier?: boolean
  newOffset?: number
  maxPricesPerItems?: string[]
  cumulative?: boolean
  discountType?: string
  nominalShippingDiscountValue?: number
  absoluteShippingDiscountValue?: number
  nominalDiscountValue?: number
  maximumUnitPriceDiscount?: number
  percentualDiscountValue?: number
  rebatePercentualDiscountValue?: number
  percentualShippingDiscountValue?: number
  percentualTax?: number
  shippingPercentualTax?: number
  percentualDiscountValueList1?: number
  percentualDiscountValueList2?: number
  skusGift?: {
  quantitySelectable?: number
  gifts?: number
}
  nominalRewardValue?: number
  percentualRewardValue?: number
  orderStatusRewardValue?: string
  maxNumberOfAffectedItems?: number
  maxNumberOfAffectedItemsGroupKey?: "perProductId" | "perCart" | "perSku"
  applyToAllShippings?: boolean
  nominalTax?: number
  origin?: string
  idSeller?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  conditionsIds?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  utmSource?: string
  utmCampaign?: string
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  accumulateWithManualPrice?: boolean
  type?: string
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  optIn?: {
  sellers?: string[]
} | null
}>(withCall({ method: 'POST', path: `/api/rnb/pvt/calculatorconfiguration`, body: params.body }, opts))
  }

  async createMultipleSkuPromotion(params: {
  'X-VTEX-calculator-name': string
  'X-VTEX-cumulative'?: boolean
  'X-VTEX-cluster-operator'?: string
  'X-VTEX-cluster-expression'?: string
  'X-VTEX-start-date': string
  'X-VTEX-end-date': string
  'X-VTEX-accumulate-with-manual-prices': boolean
  body: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/rnb/pvt/import/calculatorConfiguration`, headers: { 'X-VTEX-calculator-name': params['X-VTEX-calculator-name'], 'X-VTEX-cumulative': params['X-VTEX-cumulative'], 'X-VTEX-cluster-operator': params['X-VTEX-cluster-operator'], 'X-VTEX-cluster-expression': params['X-VTEX-cluster-expression'], 'X-VTEX-start-date': params['X-VTEX-start-date'], 'X-VTEX-end-date': params['X-VTEX-end-date'], 'X-VTEX-accumulate-with-manual-prices': params['X-VTEX-accumulate-with-manual-prices'] }, body: params.body, contentType: 'text/csv' }, opts))
  }

  async updateMultipleSkuPromotion(params: {
  promotionId: string
  'X-VTEX-calculator-name': string
  'X-VTEX-cumulative'?: boolean
  'X-VTEX-cluster-operator'?: string
  'X-VTEX-cluster-expression'?: string
  'X-VTEX-start-date': string
  'X-VTEX-end-date': string
  'X-VTEX-accumulate-with-manual-prices': boolean
  body: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/rnb/pvt/import/calculatorConfiguration/${encodePathParam(params.promotionId)}`, headers: { 'X-VTEX-calculator-name': params['X-VTEX-calculator-name'], 'X-VTEX-cumulative': params['X-VTEX-cumulative'], 'X-VTEX-cluster-operator': params['X-VTEX-cluster-operator'], 'X-VTEX-cluster-expression': params['X-VTEX-cluster-expression'], 'X-VTEX-start-date': params['X-VTEX-start-date'], 'X-VTEX-end-date': params['X-VTEX-end-date'], 'X-VTEX-accumulate-with-manual-prices': params['X-VTEX-accumulate-with-manual-prices'] }, body: params.body, contentType: 'text/csv' }, opts))
  }

  async archivePromotion(params: {
  idCalculatorConfiguration: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/rnb/pvt/archive/calculatorConfiguration/${encodePathParam(params.idCalculatorConfiguration)}` }, opts))
  }

  async unarchivePromotion(params: {
  idCalculatorConfiguration: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/rnb/pvt/unarchive/calculatorConfiguration/${encodePathParam(params.idCalculatorConfiguration)}` }, opts))
  }

  async getArchivedPromotions(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  items?: GetPromotions
  nominalDiscountType?: string
}> {
    return this.http.request<{
  items?: GetPromotions
  nominalDiscountType?: string
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/archive/benefits/calculatorConfiguration` }, opts))
  }

  async getArchivedTaxes(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  items?: GetTaxes
}> {
    return this.http.request<{
  items?: GetTaxes
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/archive/taxes/calculatorConfiguration` }, opts))
  }
}
class PromotionsTaxesApi_pricesLegacyV1 {
  constructor(private http: VtexHttpClient) {}

  async pricebyskuId(params: {
  skuId: string
  an: string
}, opts?: CallOptions): Promise<{
  id?: number
  itemId?: number
  salesChannel?: number
  sellerId?: string
  price?: number
  listPrice?: number
  ValidFrom?: string
  ValidTo?: string
  lastUpdate?: string
  hash?: string
}[]> {
    return this.http.request<{
  id?: number
  itemId?: number
  salesChannel?: number
  sellerId?: string
  price?: number
  listPrice?: number
  ValidFrom?: string
  ValidTo?: string
  lastUpdate?: string
  hash?: string
}[]>(withCall({ method: 'GET', path: `/price-sheet/${encodePathParam(params.skuId)}`, query: { 'an': params.an }, server: 'https://rnb.{environment}.com.br/api/pricing/pvt' }, opts))
  }

  async deletebyskuId(params: {
  skuId: string
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/price-sheet/${encodePathParam(params.skuId)}`, query: { 'an': params.an }, server: 'https://rnb.{environment}.com.br/api/pricing/pvt' }, opts))
  }

  async getallpaged(params: {
  page: string
  pageSize: string
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/price-sheet/all/${encodePathParam(params.page)}/${encodePathParam(params.pageSize)}`, query: { 'an': params.an }, server: 'https://rnb.{environment}.com.br/api/pricing/pvt' }, opts))
  }

  async pricebycontext(params: {
  an: string
  body: {
  id: number
  itemId: number
  salesChannel: number
  sellerId: string
  validFrom: string
  validTo: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/price-sheet/context`, query: { 'an': params.an }, body: params.body, server: 'https://rnb.{environment}.com.br/api/pricing/pvt' }, opts))
  }

  async pricebyskuIdandtradePolicy(params: {
  skuId: string
  tradePolicy: string
  an: string
}, opts?: CallOptions): Promise<{
  id?: number
  itemId?: number
  salesChannel?: number
  sellerId?: string
  price?: number
  listPrice?: number
  ValidFrom?: string
  ValidTo?: string
  lastUpdate?: string
  hash?: string
}[]> {
    return this.http.request<{
  id?: number
  itemId?: number
  salesChannel?: number
  sellerId?: string
  price?: number
  listPrice?: number
  ValidFrom?: string
  ValidTo?: string
  lastUpdate?: string
  hash?: string
}[]>(withCall({ method: 'GET', path: `/price-sheet/${encodePathParam(params.skuId)}/${encodePathParam(params.tradePolicy)}`, query: { 'an': params.an }, server: 'https://rnb.{environment}.com.br/api/pricing/pvt' }, opts))
  }

  async saveprice(params: {
  an: string
  body: {
  itemId: number
  salesChannel: number
  sellerId: number
  price: number
  listPrice: number
  validFrom: string
  validTo: string
}[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/price-sheet`, query: { 'an': params.an }, body: params.body, server: 'https://rnb.{environment}.com.br/api/pricing/pvt' }, opts))
  }
}
class PromotionsTaxesApi_campaignAudiences {
  constructor(private http: VtexHttpClient) {}

  async getcampaignconfiguration(params: {
  campaignId: string
}, opts?: CallOptions): Promise<{
  beginDateUtc?: string
  endDateUtc?: string
  id?: string
  name?: string
  isActive?: boolean
  isAndOperator?: boolean
  isArchived?: boolean
  lastModified?: {
  dateUtc?: string
  user?: string
}
  targetConfigurations?: {
  featured?: boolean
  id?: string
  name?: string
  daysAgoOfPurchases?: number
  origin?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  listBrand1BuyTogether?: {
  id?: string
  name?: string
}[]
  listCategory1BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
}[]
}> {
    return this.http.request<{
  beginDateUtc?: string
  endDateUtc?: string
  id?: string
  name?: string
  isActive?: boolean
  isAndOperator?: boolean
  isArchived?: boolean
  lastModified?: {
  dateUtc?: string
  user?: string
}
  targetConfigurations?: {
  featured?: boolean
  id?: string
  name?: string
  daysAgoOfPurchases?: number
  origin?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  listBrand1BuyTogether?: {
  id?: string
  name?: string
}[]
  listCategory1BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
}[]
}>(withCall({ method: 'GET', path: `/api/rnb/pvt/campaignConfiguration/${encodePathParam(params.campaignId)}` }, opts))
  }

  async getcampaignaudiences(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  beginDateUtc?: string
  endDateUtc?: string
  id?: string
  name?: string
  isActive?: boolean
  isAndOperator?: boolean
  isArchived?: boolean
  lastModified?: {
  dateUtc?: string
  user?: string
}
  targetConfigurations?: {
  featured?: boolean
  id?: string
  name?: string
  daysAgoOfPurchases?: number
  origin?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  listBrand1BuyTogether?: {
  id?: string
  name?: string
}[]
  listCategory1BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  clusterOperator?: string
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
}[]
}[]> {
    return this.http.request<{
  beginDateUtc?: string
  endDateUtc?: string
  id?: string
  name?: string
  isActive?: boolean
  isAndOperator?: boolean
  isArchived?: boolean
  lastModified?: {
  dateUtc?: string
  user?: string
}
  targetConfigurations?: {
  featured?: boolean
  id?: string
  name?: string
  daysAgoOfPurchases?: number
  origin?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  listBrand1BuyTogether?: {
  id?: string
  name?: string
}[]
  listCategory1BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  clusterOperator?: string
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
}[]
}[]>(withCall({ method: 'GET', path: `/api/rnb/pvt/campaignConfiguration` }, opts))
  }

  async setcampaignconfiguration(params: {
  body: {
  beginDateUtc?: string
  endDateUtc?: string
  id?: string
  name?: string
  isActive?: boolean
  isAndOperator?: boolean
  isArchived?: boolean
  lastModified?: {
  dateUtc?: string
  user?: string
}
  targetConfigurations?: {
  featured?: boolean
  id?: string
  name?: string
  daysAgoOfPurchases?: number
  origin?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  listBrand1BuyTogether?: {
  id?: string
  name?: string
}[]
  listCategory1BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  clusterOperator?: string
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  type?: "regular" | "combo" | "forThePriceOf" | "progressive" | "buyAndWin" | "campaign" | "tax"
  idTypeDiscountBuyTogether?: 1 | 2 | 3 | 4 | 5
}[]
}
}, opts?: CallOptions): Promise<{
  beginDateUtc?: string
  endDateUtc?: string
  id?: string
  name?: string
  isActive?: boolean
  isAndOperator?: boolean
  isArchived?: boolean
  lastModified?: {
  dateUtc?: string
  user?: string
}
  targetConfigurations?: {
  featured?: boolean
  id?: string
  name?: string
  daysAgoOfPurchases?: number
  origin?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  listBrand1BuyTogether?: {
  id?: string
  name?: string
}[]
  listCategory1BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  clusterOperator?: string
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  type?: "regular" | "combo" | "forThePriceOf" | "progressive" | "buyAndWin" | "campaign" | "tax"
  idTypeDiscountBuyTogether?: 1 | 2 | 3 | 4 | 5
}[]
}> {
    return this.http.request<{
  beginDateUtc?: string
  endDateUtc?: string
  id?: string
  name?: string
  isActive?: boolean
  isAndOperator?: boolean
  isArchived?: boolean
  lastModified?: {
  dateUtc?: string
  user?: string
}
  targetConfigurations?: {
  featured?: boolean
  id?: string
  name?: string
  daysAgoOfPurchases?: number
  origin?: string
  idSellerIsInclusive?: boolean
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
  marketingTags?: string[]
  marketingTagsAreNotInclusive?: boolean
  paymentsMethods?: {
  id?: string
  name?: string
}[]
  stores?: string[]
  campaigns?: string[]
  storesAreInclusive?: boolean
  categories?: {
  id?: string
  name?: string
}[]
  categoriesAreInclusive?: boolean
  brands?: {
  id?: string
  name?: string
}[]
  brandsAreInclusive?: boolean
  products?: {
  id?: string
  name?: string
}[]
  productsAreInclusive?: boolean
  skus?: {
  id?: string
  name?: string
}[]
  skusAreInclusive?: boolean
  collections1BuyTogether?: {
  id?: string
  name?: string
}[]
  collections2BuyTogether?: {
  id?: string
  name?: string
}[]
  minimumQuantityBuyTogether?: number
  quantityToAffectBuyTogether?: number
  enableBuyTogetherPerSku?: boolean
  listSku1BuyTogether?: {
  id?: string
  name?: string
}[]
  listSku2BuyTogether?: {
  id?: string
  name?: string
}[]
  listBrand1BuyTogether?: {
  id?: string
  name?: string
}[]
  listCategory1BuyTogether?: {
  id?: string
  name?: string
}[]
  coupon?: string[]
  totalValueFloor?: number
  totalValueCeling?: number
  totalValueIncludeAllItems?: boolean
  totalValueMode?: string
  collections?: {
  id?: string
  name?: string
}[]
  collectionsIsInclusive?: boolean
  restrictionsBins?: string[]
  cardIssuers?: string[]
  totalValuePurchase?: number
  slasIds?: string[]
  isSlaSelected?: boolean
  isFirstBuy?: boolean
  firstBuyIsProfileOptimistic?: boolean
  compareListPriceAndPrice?: boolean
  isDifferentListPriceAndPrice?: boolean
  zipCodeRanges?: {
  zipCodeFrom?: string
  zipCodeTo?: string
  inclusive?: boolean
}[]
  itemMaxPrice?: number
  itemMinPrice?: number
  installment?: number
  isMinMaxInstallments?: boolean
  minInstallment?: number
  maxInstallment?: number
  merchants?: string[]
  clusterExpressions?: string[]
  clusterOperator?: string
  paymentsRules?: string[]
  giftListTypes?: string[]
  productsSpecifications?: string[]
  affiliates?: {
  id?: string
  name?: string
}[]
  maxUsage?: number
  maxUsagePerClient?: number
  shouldDistributeDiscountAmongMatchedItems?: boolean
  multipleUsePerClient?: boolean
  useNewProgressiveAlgorithm?: boolean
  percentualDiscountValueList?: number[]
  type?: "regular" | "combo" | "forThePriceOf" | "progressive" | "buyAndWin" | "campaign" | "tax"
  idTypeDiscountBuyTogether?: 1 | 2 | 3 | 4 | 5
}[]
}>(withCall({ method: 'POST', path: `/api/rnb/pvt/campaignConfiguration`, body: params.body }, opts))
  }
}

export class PromotionsTaxesApi {
  readonly coupons: PromotionsTaxesApi_coupons
  readonly promotionsAndTaxes: PromotionsTaxesApi_promotionsAndTaxes
  readonly pricesLegacyV1: PromotionsTaxesApi_pricesLegacyV1
  readonly campaignAudiences: PromotionsTaxesApi_campaignAudiences
  constructor(http: VtexHttpClient) {
    this.coupons = new PromotionsTaxesApi_coupons(http)
    this.promotionsAndTaxes = new PromotionsTaxesApi_promotionsAndTaxes(http)
    this.pricesLegacyV1 = new PromotionsTaxesApi_pricesLegacyV1(http)
    this.campaignAudiences = new PromotionsTaxesApi_campaignAudiences(http)
  }
}
