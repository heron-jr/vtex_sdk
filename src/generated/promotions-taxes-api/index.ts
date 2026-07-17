import type { VtexHttpClient } from '../../core/http.js'
import type { GetPromotions, GetTaxes } from './types.js'

class PromotionsTaxesApi_coupons {
  constructor(private http: VtexHttpClient) {}

  createMultipleCoupons(params: {
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
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'POST', path: `/api/rnb/pvt/multiple-coupons`, body: params.body })
  }

  getall(params: Record<string, never>): Promise<{
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
}[]>({ method: 'GET', path: `/api/rnb/pvt/coupon` })
  }

  createOrUpdateCoupon(params: {
  body: {
  utmSource: string
  utmCampaign?: string
  couponCode: string
  isArchived?: boolean
  maxItemsPerClient: number
  expirationIntervalPerUse: string
  maxUsage?: number
}
}): Promise<{
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
}>({ method: 'POST', path: `/api/rnb/pvt/coupon`, body: params.body })
  }

  getbycouponcode(params: {
  couponCode: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/rnb/pvt/coupon/${params.couponCode}` })
  }

  getarchivedbycouponcode(params: {
  couponCode: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/rnb/pvt/archive/coupon/${params.couponCode}` })
  }

  archivebycouponcode(params: {
  couponCode: string
}): Promise<string> {
    return this.http.request<string>({ method: 'POST', path: `/api/rnb/pvt/archive/coupon/${params.couponCode}` })
  }

  massiveGeneration(params: {
  quantity: number
  body: {
  utmSource: string
  utmCampaign: string
  couponCode: string
  maxItemsPerClient: number
  expirationIntervalPerUse: string
}
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'POST', path: `/api/rnb/pvt/coupons`, query: { 'quantity': params.quantity }, body: params.body })
  }

  getusage(params: {
  couponCode: string
}): Promise<{
  hostName?: string
  couponCode?: string
  profileUsages?: {
  profileId?: {
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
  profileId?: {
  orderUsage?: {
  orderId?: string
  usageDateUtc?: string
}[]
}
}
}>({ method: 'GET', path: `/api/rnb/pvt/coupon/usage/${params.couponCode}` })
  }

  unarchivebycouponcode(params: {
  couponCode: string
}): Promise<string> {
    return this.http.request<string>({ method: 'POST', path: `/api/rnb/pvt/unarchive/coupon/${params.couponCode}` })
  }
}
class PromotionsTaxesApi_promotionsAndTaxes {
  constructor(private http: VtexHttpClient) {}

  getAllBenefits(params: Record<string, never>): Promise<{
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
}>({ method: 'GET', path: `/api/rnb/pvt/benefits/calculatorconfiguration` })
  }

  searchPromotion(params: {
  byName: string
}): Promise<{
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
}[]>({ method: 'GET', path: `/api/rnb/pvt/benefits/calculatorconfiguration/search`, query: { 'byName': params.byName } })
  }

  getAllTaxes(params: Record<string, never>): Promise<{
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
}>({ method: 'GET', path: `/api/rnb/pvt/taxes/calculatorconfiguration` })
  }

  getCalculatorConfigurationById(params: {
  idCalculatorConfiguration: string
}): Promise<{
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
  multipleSkusCause?: Record<string, unknown>
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
}
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
  multipleSkusCause?: Record<string, unknown>
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
}
}>({ method: 'GET', path: `/api/rnb/pvt/calculatorconfiguration/${params.idCalculatorConfiguration}` })
  }

  optSellerInOrOutOfPromotion(params: {
  promotionId: string
  an: string
  body: {
  sellerIds: string[]
  operation: "OptIn" | "OptOut"
}
}): Promise<{
  lastModified?: string
}> {
    return this.http.request<{
  lastModified?: string
}>({ method: 'POST', path: `/api/rnb/pvt/calculatorconfiguration/${params.promotionId}/seller-opt`, query: { 'an': params.an }, body: params.body })
  }

  createOrUpdateCalculatorConfiguration(params: {
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
}
}
}): Promise<{
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
}
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
}
}>({ method: 'POST', path: `/api/rnb/pvt/calculatorconfiguration`, body: params.body })
  }

  createMultipleSkuPromotion(params: Record<string, never>): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/rnb/pvt/import/calculatorConfiguration` })
  }

  updateMultipleSkuPromotion(params: {
  promotionId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/rnb/pvt/import/calculatorConfiguration/${params.promotionId}` })
  }

  archivePromotion(params: {
  idCalculatorConfiguration: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/rnb/pvt/archive/calculatorConfiguration/${params.idCalculatorConfiguration}` })
  }

  unarchivePromotion(params: {
  idCalculatorConfiguration: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/rnb/pvt/unarchive/calculatorConfiguration/${params.idCalculatorConfiguration}` })
  }

  getArchivedPromotions(params: Record<string, never>): Promise<{
  items?: GetPromotions
  nominalDiscountType?: string
}> {
    return this.http.request<{
  items?: GetPromotions
  nominalDiscountType?: string
}>({ method: 'GET', path: `/api/rnb/pvt/archive/benefits/calculatorConfiguration` })
  }

  getArchivedTaxes(params: Record<string, never>): Promise<{
  items?: GetTaxes
}> {
    return this.http.request<{
  items?: GetTaxes
}>({ method: 'GET', path: `/api/rnb/pvt/archive/taxes/calculatorConfiguration` })
  }
}
class PromotionsTaxesApi_pricesLegacyV1 {
  constructor(private http: VtexHttpClient) {}

  pricebyskuId(params: {
  skuId: string
  an: string
}): Promise<{
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
}[]>({ method: 'GET', path: `/price-sheet/${params.skuId}`, query: { 'an': params.an } })
  }

  deletebyskuId(params: {
  skuId: string
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/price-sheet/${params.skuId}`, query: { 'an': params.an } })
  }

  getallpaged(params: {
  page: string
  pageSize: string
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/price-sheet/all/${params.page}/${params.pageSize}`, query: { 'an': params.an } })
  }

  pricebycontext(params: {
  an: string
  body: {
  id: number
  itemId: number
  salesChannel: number
  sellerId: string
  validFrom: string
  validTo: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/price-sheet/context`, query: { 'an': params.an }, body: params.body })
  }

  pricebyskuIdandtradePolicy(params: {
  skuId: string
  tradePolicy: string
  an: string
}): Promise<{
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
}[]>({ method: 'GET', path: `/price-sheet/${params.skuId}/${params.tradePolicy}`, query: { 'an': params.an } })
  }

  saveprice(params: {
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/price-sheet`, query: { 'an': params.an }, body: params.body })
  }
}
class PromotionsTaxesApi_bundles {
  constructor(private http: VtexHttpClient) {}

  calculatediscountsandtaxesBundles(params: {
  body: {
  isShoppingCart: boolean
  origin: string
  salesChannel: string
  profileId: string
  items: {
  index: number
  id: string
  quantity: number
  isGift: boolean
  measurementUnit: string
  unitMultiplier: number
  priceTags: string[]
  params: {
  name: string
  value: string
}[]
  priceSheet: string[]
  logisticsInfos: string[]
  sellerId: string
  productSpecifications: string[]
}[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/pub/bundles`, body: params.body })
  }
}
class PromotionsTaxesApi_campaignAudiences {
  constructor(private http: VtexHttpClient) {}

  getcampaignconfiguration(params: {
  campaignId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/rnb/pvt/campaignConfiguration/${params.campaignId}` })
  }

  getcampaignaudiences(params: Record<string, never>): Promise<{
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
}[]>({ method: 'GET', path: `/api/rnb/pvt/campaignConfiguration` })
  }

  setcampaignconfiguration(params: {
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
}): Promise<{
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
}>({ method: 'POST', path: `/api/rnb/pvt/campaignConfiguration`, body: params.body })
  }
}

export class PromotionsTaxesApi {
  readonly coupons: PromotionsTaxesApi_coupons
  readonly promotionsAndTaxes: PromotionsTaxesApi_promotionsAndTaxes
  readonly pricesLegacyV1: PromotionsTaxesApi_pricesLegacyV1
  readonly bundles: PromotionsTaxesApi_bundles
  readonly campaignAudiences: PromotionsTaxesApi_campaignAudiences
  constructor(http: VtexHttpClient) {
    this.coupons = new PromotionsTaxesApi_coupons(http)
    this.promotionsAndTaxes = new PromotionsTaxesApi_promotionsAndTaxes(http)
    this.pricesLegacyV1 = new PromotionsTaxesApi_pricesLegacyV1(http)
    this.bundles = new PromotionsTaxesApi_bundles(http)
    this.campaignAudiences = new PromotionsTaxesApi_campaignAudiences(http)
  }
}
