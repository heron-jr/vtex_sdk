export type FixedPrice = {
  tradePolicyId: string
  value: number
  listPrice: number
  minQuantity: number
  dateRange?: DateRange
}

export type DateRange = {
  from: string
  to: string
}

export type Getprice = {
  itemId: string
  listPrice: number
  costPrice: number
  markup: number
  basePrice: number
  fixedPrices: FixedPrice[]
}

export type Getcomputedprice = {
  tradePolicyId: string
  listPrice: number
  costPrice?: number
  sellingPrice: number
  priceValidUntil: string
  priceTable?: string
}

export type PricingConfiguration = {
  hasMigrated: boolean
  migrationStatus?: string
  defaultMarkup: number
  priceVariation?: {
  upperLimit?: number
  lowerLimit?: number
}
  minimumMarkups: Record<string, unknown>
  tradePolicyConfigs?: {
  tradePolicyId?: string
  minimumMarkup?: number
  rulesShouldAffectListPrice?: boolean
}[]
  sellersToOverride?: string[]
  hasPriceInheritance?: boolean
  priceInheritance?: string
  hasOptionalBasePrice?: boolean
  blockAccount?: boolean
  blockedRoutes?: string[]
  priceTableSelectionStrategy?: string
  priceTableLimit?: number
}
