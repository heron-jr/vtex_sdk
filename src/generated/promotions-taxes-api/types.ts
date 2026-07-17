export type GetPromotions = {
  idCalculatorConfiguration?: string
  lastModifiedUtc?: string
  name?: string
  beginDate?: string
  endDate?: string
  isActive?: boolean
  description?: string
  type?: string
  utmSource?: string
  utmCampain?: string
  utmiCampaign?: string
  status?: string
  percentualTax?: number
  isArchived?: boolean
  hasMaxPricePerItem?: boolean
  isTax?: boolean
  campaigns?: string[]
  activateGiftsMultiplier?: boolean
  scope?: {
  allCatalog?: boolean
  skus?: number
  skusAreInclusive?: boolean
  products?: number
  productsAreInclusive?: boolean
  collections?: number
  collectionsAreInclusive?: boolean
  categories?: number
  categoriesAreInclusive?: boolean
  brands?: number
  brandsAreInclusive?: boolean
  sellers?: number
  sellersAreInclusive?: boolean
}
  maxUsage?: number
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
}[]

export type GetTaxes = {
  idCalculatorConfiguration?: string
  lastModifiedUtc?: string
  name?: string
  beginDate?: string
  endDate?: string
  isActive?: boolean
  description?: string
  type?: string
  utmSource?: string
  utmCampain?: string
  utmiCampaign?: string
  status?: string
  percentualTax?: number
  isArchived?: boolean
  hasMaxPricePerItem?: boolean
  isTax?: boolean
  campaigns?: string[]
  activateGiftsMultiplier?: boolean
  scope?: {
  allCatalog?: boolean
  skus?: number
  skusAreInclusive?: boolean
  products?: number
  productsAreInclusive?: boolean
  collections?: number
  collectionsAreInclusive?: boolean
  categories?: number
  categoriesAreInclusive?: boolean
  brands?: number
  brandsAreInclusive?: boolean
  sellers?: number
  sellersAreInclusive?: boolean
}
  maxUsage?: number
  idsSalesChannel?: string[]
  areSalesChannelIdsExclusive?: boolean
}[]
