export type SaveautoapproveforaccountRequest = {
  Enabled: boolean
}

export type SaveaccountconfigRequest = {
  Score: Score
  Matchers: Matcher[]
  SpecificationsMapping: string[]
  MatchFlux: string
}

export type Score = {
  Approve: number
  Reject: number
}

export type Matcher = {
  MatcherId: string
  "hook-base-address": string
  IsActive: boolean
  UpdatesNotificationEndpoint: string
  Description?: string
}

export type ResponseGetAccountsMatcherSettings = {
  score?: {
  approve?: number
  pending?: number
  reject?: number
}
  matchers?: {
  matcherId?: string
  "hook-base-address"?: string
  isActive?: boolean
}[]
  rules?: {
  item?: Record<string, unknown>[]
  product?: Record<string, unknown>[]
}
  SpecificationsMapping?: Record<string, unknown>[]
  matchFlux?: string
}

export type SaveautoapproveforaccountsellerRequest = {
  Enabled: boolean
}

export type PutselleraccountconfigRequest = {
  sellerId: string
  mapping: Record<string, unknown>
  matchFlux: string
}

export type SaveSuggestionRequest = {
  ProductName: string
  ProductId: string
  ProductDescription: string
  BrandName: string
  SkuName: string
  SellerId: string
  Height: number
  Width: number
  Length: number
  Weight: number
  RefId: string
  EAN: string
  SellerStockKeepingUnitId?: number
  CategoryFullPath: string
  SkuSpecifications?: SkuSpecification[]
  ProductSpecifications?: ProductSpecification[]
  Images: Image[]
  MeasurementUnit?: string
  UnitMultiplier?: number
  AvailableQuantity: number
  Pricing: {
  Currency?: string
  SalePrice?: number
  CurrencySymbol?: string
}
}

export type SkuSpecification = {
  fieldName?: string
  fieldValues?: string[]
}

export type ProductSpecification = {
  fieldName?: string
  fieldValues?: string[]
}

export type Image = {
  imageName: string
  imageUrl: string
}

export type MatchRequest = {
  matcherId: string
  matchType: string
  score: string
  skuRef?: string
  productRef?: string
  product?: Product
  sku?: Sku
}

export type Product = {
  name: string
  description: string
  categoryId: number
  brandId: number
  specifications: Record<string, unknown>
}

export type Sku = {
  name: string
  eans: string[]
  refId: string
  height: number
  width: number
  length: number
  weight: number
  images: {
  "imagem1.jpg"?: string
}
  unitMultiplier: number
  measurementUnit: string
  specifications: {
  Packaging: string
}
}

export type Images = {
  "imagem1.jpg"?: string
}

export type Specifications = {
  Packaging: string
}

export type MatchMultiple = {
  itemId: string
  versionId: string
  matchId: string
  matcherId: string
  categoryId: number
  brandId?: number
  skuRef?: string
  productRef?: string
  sellerId: string
}[]

export type ResponseMatchMultiple = {
  matchId?: string
  matcherId?: string
  sellerId?: string
  itemId?: string
  isSuccess?: boolean
}[]

export type ResponseGetSellersApprovalSettings = {
  sellerId?: string
  accountId?: string
  accountName?: string
  mapping?: {
  defaultColor?: string
  searchColor?: string
  color1?: string
  color2?: string
  color?: string
  size?: string
}
  matchFlux?: string
}

export type ResponseSaveAccountsApprovalSettings = {
  Score?: {
  Approve?: number
  Reject?: number
}
  Matchers?: {
  MatcherId?: string
  "hook-base-address"?: string
  IsActive?: boolean
  UpdatesNotificationEndpoint?: string
  Description?: string
}[]
  Rules?: {
  Item?: number[]
  Product?: string[]
}
  SpecificationsMapping?: {
  SellerId?: string
  Mapping?: Record<string, unknown>
}[]
  MatchFlux?: string
}
