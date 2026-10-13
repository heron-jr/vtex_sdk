export type AutocompleteSearchSuggestions = {
  searches?: {
  term?: string
  count?: number
  attributes?: {
  key?: string
  value?: string
  labelKey?: string
  labelValue?: string
}[] | null
}[]
}

export type TopSearches = {
  searches?: {
  term?: string
  count?: number
}[]
}

export type Correction = {
  correction?: {
  misspelled?: boolean
  correction?: boolean
  text?: string
  highlighted?: string
}
}

export type Banners = {
  banners?: {
  id?: string
  name?: string
  area?: string
  html?: string
}[]
}

export type SearchSuggestions = {
  searches?: {
  term?: string
  count?: number
}[]
}

export type ProductSearch = {
  products?: Product[]
  recordsFiltered?: number
  correction?: {
  misspelled?: boolean
}
  fuzzy?: string
  operator?: "and" | "or"
  translated?: boolean
  redirect?: string | null
  options?: {
  sorts?: {
  [key: string]: unknown
}[]
  counts?: {
  [key: string]: unknown
}[]
  deliveryPromisesEnabled?: boolean
}
  searchId?: string
  pagination?: {
  count?: number
  current?: {
  index?: number
  proxyUrl?: string
}
  before?: {
  index?: number
  proxyUrl?: string
}[]
  after?: {
  index?: number
  proxyUrl?: string
}[]
  perPage?: number
  next?: {
  index?: number
  proxyUrl?: string
}
  previous?: {
  index?: number
}
  first?: {
  index?: number
}
  last?: {
  index?: number
}
}
}

export type Product = {
  cacheId?: string
  productId?: string
  description?: string
  productName?: string
  productReference?: string
  linkText?: string
  brand?: string
  brandId?: number
  link?: string
  categories?: string[]
  categoryId?: string
  categoriesIds?: string[]
  priceRange?: {
  sellingPrice?: {
  highPrice?: number
  lowPrice?: number
}
  listPrice?: {
  highPrice?: number
  lowPrice?: number
}
}
  specificationGroups?: {
  originalName?: string
  name?: string
  specifications?: {
  originalName?: string
  name?: string
  values?: string[]
}[]
}[]
  skuSpecifications?: {
  field?: {
  name?: string
  originalName?: string
}
  values?: {
  name?: string
  originalName?: string
}[]
}[]
  productClusters?: {
  id?: string
  name?: string
}[]
  clusterHighlights?: {
  id?: string
  name?: string
}[]
  properties?: {
  name?: string
  originalName?: string
  values?: string[]
}[]
  items?: {
  sellers?: {
  sellerId?: string
  sellerName?: string
  addToCartLink?: string
  sellerDefault?: boolean
  commertialOffer?: {
  DeliverySlaSamplesPerRegion?: {
  [key: string]: unknown
}
  DeliverySlaSamples?: {
  DeliverySlaPerTypes?: {
  Price?: number
  TypeName?: string
  EstimatedTimeSpanToDelivery?: number
}[]
  Region?: string | null
}[]
  AvailableQuantity?: number
  discountHighlights?: {
  name?: string
}[]
  Installments?: {
  PaymentSystemName?: string
  Value?: number
  InterestRate?: number
  TotalValuePlusInterestRate?: number
  NumberOfInstallments?: number
  Name?: string
  PaymentSystemGroupName?: string
}[]
  Price?: number
  ListPrice?: number
  spotPrice?: number
  taxPercentage?: number
  PriceWithoutDiscount?: number
  Tax?: number
  GiftSkuIds?: string[]
  BuyTogether?: string[]
  ItemMetadataAttachment?: {
  Name?: string
  NameComplete?: string
  MainImage?: string
  BrandName?: string
  CategoryId?: number
  ProductId?: number
  id?: string
  seller?: string
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: {
  [key: string]: unknown
}
}[]
}[]
  RewardValue?: number
  PriceValidUntil?: string
  GetInfoErrorMessage?: string | null
  CacheVersionUsedToCallCheckout?: string
  teasers?: {
  name?: string
  conditions?: {
  minimumQuantity?: number
  parameters?: {
  name?: string
  value?: string
}[]
}
  effects?: {
  parameters?: {
  name?: string
  value?: string
}[]
}
}[]
}
}[]
  images?: {
  imageId?: string
  cacheId?: string
  imageTag?: string
  imageLabel?: string
  imageText?: string
  imageUrl?: string
}[]
  itemId?: string
  name?: string
  nameComplete?: string
  complementName?: string
  referenceId?: {
  Key?: string
  Value?: string
}[]
  measurementUnit?: string
  unitMultiplier?: number
  variations?: {
  name?: string
  values?: string[]
}[]
  ean?: string
  modalType?: string
  videos?: string[]
  attachments?: {
  id?: string
  name?: string
  required?: boolean
  domainValues?: {
  FieldName?: string
  DomainValues?: string
}[]
}[]
  isKit?: boolean
  [key: string]: unknown
}[]
  releaseDate?: number
  origin?: string
}

export type Facets = {
  facets?: {
  values?: {
  id?: string
  quantity?: number
  name?: string
  key?: string
  value?: string
  selected?: boolean
  href?: string
}[]
  type?: "TEXT" | "PRICERANGE" | "DELIVERY"
  name?: string
  hidden?: boolean
  key?: string
  quantity?: number
}[]
  sampling?: boolean
  breadcrumb?: {
  name?: string
  href?: string
}[]
  queryArgs?: {
  query?: string
  selectedFacets?: {
  key?: string
  value?: string
}[]
}
  translated?: boolean
}
