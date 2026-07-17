export type UpsertMappingRequest = {
  marketplaceSalesChannel: number
  sellerChannel: string
}

export type ResponseSellerCommissionsID = {
  categoryId?: string
  categoryName?: string
  categoryFullPath?: string[]
  productCommissionPercentage?: number
  freightCommissionPercentage?: number
}

export type BulkUpsertSellerCommissionsRequest = {
  categoryId: string
  categoryFullPath: string
  productCommissionPercentage: number
  freightCommissionPercentage: number
}

export type UpsertSellerCommissionsRequest = {
  categoryId: string
  categoryFullPath: string
  productCommissionPercentage: number
  freightCommissionPercentage: number
}

export type CreateSellerLeadRequest = {
  sellerEmail: string
  sellerName: string
  sellerAccountName: string
  salesChannel: string
  email: string
  sellerType: number
  accountId: string
  document: string
  hasAcceptedLegalTerms: boolean
  address: Address
  accountable: Accountable
}

export type ResponseCreateSellerLead = {
  sellerId?: string
  createdAt?: string
  updatedAt?: string
}

export type Accountable = {
  name: string
  email: string
  phone: string
}

export type Address = {
  postalcode: string
  complement: string
  street: string
  number: string
  neighborhood: string
  state: string
  city: string
}

export type AcceptSellerLeadRequest = {
  sellerEmail: string
  sellerName: string
  sellerAccountName: string
  salesChannel: string
  email: string
  sellerType: number
  accountId: string
  document: string
  hasAcceptedLegalTerms: boolean
  address: Address
  accountable: Accountable
}

export type ResendSellerLeadRequestRequest = {
  status: string
}

export type UpsertSellerRequest = {
  id: string
  name: string
  isActive: boolean
  fulfillmentEndpoint: string
  allowHybridPayments: boolean
  taxCode: string
  email: string
  description: string
  sellerCommissionConfiguration: Record<string, unknown>
  isBetterScope: boolean
  sellerType: number
  availableSalesChannels: AvailableSalesChannel[]
  CSCIdentification: string
  account: string
  channel: string
  salesChannel: string
  isVtex: boolean
  exchangeReturnPolicy: string
  deliveryPolicy: string
  securityPrivacyPolicy: string
  fulfillmentSellerId: string
  groups?: Groups[]
  user: string
  password: string
  catalogSystemEndpoint: string
  trustPolicy: string
  score: number
}

export type SellerCommissionConfiguration = {
  productCommissionPercentage: number
  freightCommissionPercentage: number
  categoriesCommissionConfiguration: {
  category: string
  commission: number
}[]
}

export type AvailableSalesChannel = {
  isSelected: boolean
  id: number
  name: string
}

export type Groups = {
  id?: string
  name?: string
}

export type Sku2 = {
  SkuId: string
  EanId: string
  RefId: string
  NameComplete: string
  Name: string
  IsActive: boolean
  MainImage: Record<string, unknown>
  Offers: Offer[]
}

export type MainImage = {
  ImageId: string
  ImageLabel: string
  ImageTag: string
  ImagePath: string
  IsMain: boolean
  IsZoomSize: boolean
  ImageText: string
  LastModified: string
}

export type Offer = {
  SellerId: string
  SellerSkuId: string
  OffersPerSalesChannel: OffersPerSalesChannel[]
  AvailableSalesChannels: string
}

export type OffersPerSalesChannel = {
  SaleChannel: number
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  AvailableQuantity: number
}

export type ResponseGetMatchedOffersList = {
  LastModified?: string
  ProductId?: string
  CategoryId?: number
  BrandId?: number
  ProductName?: string
  Skus?: Sku2[]
}[]

export type ResponseGetMatchedOffersDataBySKU = {
  productId?: string
  skuId?: string
  nameComplete?: string
  mainImage?: {
  imagePath: string
}
  sellersOffers?: {
  sellerId?: string
  sellerSkuId?: string
  salesChannelOffer?: {
  salesChannelId?: string
  salesChannelName?: string
  price?: number
  listPrice?: number
  priceWithoutDiscount?: number
  availableQuantity?: number
}[]
}[]
}[]

export type ResponseGetMatchedOffersDataByProductId = {
  productId?: string
  skuId?: string
  nameComplete?: string
  mainImage?: {
  imagePath: string
}
  sellersOffers?: {
  sellerId?: string
  sellerSkuId?: string
  salesChannelOffer?: {
  salesChannelId?: string
  salesChannelName?: string
  price?: number
  listPrice?: number
  priceWithoutDiscount?: number
  availableQuantity?: number
}
}[]
}[]

export type ResponseListAffiliates = {
  id?: string
  followUpEmail?: string
  useSellerPaymentMethod?: boolean
  name?: string
  salesChannel?: string
  searchURIEndpoint?: string
  searchURIEndpointVersion?: string
  searchURIEndpointAvailableVersions?: string[]
  minimumValueAccumulated?: number
}[]

export type ResponseGetAffiliates = {
  id?: string
  followUpEmail?: string
  useSellerPaymentMethod?: boolean
  name?: string
  salesChannel?: string
  searchURIEndpoint?: string
  searchURIEndpointVersion?: string
  searchURIEndpointAvailableVersions?: string[]
  minimumValueAccumulated?: number
}

export type RequestUpdateAffiliate = {
  followUpEmail?: string
  useSellerPaymentMethod?: boolean
  name?: string
  salesChannel?: string
  searchURIEndpoint?: string
  searchURIEndpointVersion?: string
  searchURIEndpointAvailableVersions?: string[]
  minimumValueAccumulated?: number
}
