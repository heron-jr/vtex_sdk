import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { Example, Item, ReferenceId, Image, Seller, CommertialOffer, GeneratedObject, DeliverySlaPerType, Region, Installment, DeliverySlaSample, DeliverySlaPerType2, Region2, Example2, Department, Brand, SpecificationFilters, ResoluO, TamanhoDaTela, AplicativosDeTV, CategoriesTree, Child, Child1, Example3, ItemsReturned } from './types.js'

class LegacySearchApi_crossSelling {
  constructor(private http: VtexHttpClient) {}

  productSearchWhoSawAlsoSaw(params: {
  productId: number
}, opts?: CallOptions): Promise<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: {
  [key: string]: string
}
  productClusters: {
  [key: string]: string
}
  searchableClusters: {
  [key: string]: string
}
  categories: string[]
  categoriesIds: string[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: "un" | "kg" | "g" | "mg" | "m" | "m²" | "m³" | "cm" | "cm²" | "cm³" | "mm" | "mm²" | "mm³" | "oz" | "lb" | "ft" | "ft²" | "ft³" | "in" | "in²" | "in³"
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: string[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: string[]
  GiftSkuIds: string[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: string[]
  ItemMetadataAttachment: {
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
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: string[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: string[]
}
}
}[]
  Videos: string[]
  estimatedDateArrival: string | null
}[]
}[]> {
    return this.http.request<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: {
  [key: string]: string
}
  productClusters: {
  [key: string]: string
}
  searchableClusters: {
  [key: string]: string
}
  categories: string[]
  categoriesIds: string[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: "un" | "kg" | "g" | "mg" | "m" | "m²" | "m³" | "cm" | "cm²" | "cm³" | "mm" | "mm²" | "mm³" | "oz" | "lb" | "ft" | "ft²" | "ft³" | "in" | "in²" | "in³"
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: string[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: string[]
  GiftSkuIds: string[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: string[]
  ItemMetadataAttachment: {
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
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: string[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: string[]
}
}
}[]
  Videos: string[]
  estimatedDateArrival: string | null
}[]
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/crossselling/whosawalsosaw/${encodePathParam(params.productId)}` }, opts))
  }

  productSearchWhoSawAlsoBought(params: {
  productId: string
}, opts?: CallOptions): Promise<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: {
  [key: string]: unknown
}
  searchableClusters: {
  [key: string]: unknown
}
  categories: string[]
  categoriesIds: string[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[] | null
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: string[] | null
  estimatedDateArrival: string | null
}[]
}[]> {
    return this.http.request<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: {
  [key: string]: unknown
}
  searchableClusters: {
  [key: string]: unknown
}
  categories: string[]
  categoriesIds: string[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[] | null
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: string[] | null
  estimatedDateArrival: string | null
}[]
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/crossselling/whosawalsobought/${encodePathParam(params.productId)}` }, opts))
  }

  productSearchWhoBoughtAlsoBought(params: {
  productId: string
}, opts?: CallOptions): Promise<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]> {
    return this.http.request<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/crossselling/whoboughtalsobought/${encodePathParam(params.productId)}` }, opts))
  }

  productSearchShowTogether(params: {
  productId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/crossselling/showtogether/${encodePathParam(params.productId)}` }, opts))
  }

  productSearchAccessories(params: {
  productId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/crossselling/accessories/${encodePathParam(params.productId)}` }, opts))
  }

  productSearchSimilars(params: {
  productId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/crossselling/similars/${encodePathParam(params.productId)}` }, opts))
  }

  productSearchSuggestions(params: {
  productId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/crossselling/suggestions/${encodePathParam(params.productId)}` }, opts))
  }
}
class LegacySearchApi_search {
  constructor(private http: VtexHttpClient) {}

  productSearch(params: {
  search: string
}, opts?: CallOptions): Promise<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]> {
    return this.http.request<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/search/${encodePathParam(params.search)}` }, opts))
  }

  productSearchFilteredandOrdered(params: {
  _from?: string
  _to?: string
  ft?: string
  fq?: string
  O?: string
} = {}, opts?: CallOptions): Promise<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]> {
    return this.http.request<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/search`, query: { '_from': params._from, '_to': params._to, 'ft': params.ft, 'fq': params.fq, 'O': params.O } }, opts))
  }

  searchbyproducturl(params: {
  'product-text-link': string
}, opts?: CallOptions): Promise<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]> {
    return this.http.request<{
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string
  linkText: string
  productReference: string
  productReferenceCode: number | null
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, unknown>
  productClusters: Record<string, unknown>
  searchableClusters: Record<string, unknown>
  categories: unknown[]
  categoriesIds: unknown[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string | null
  items: {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: {
  Key: string
  Value: string
}[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  kitItems: {
  itemId: string
  amount: number
}[]
  images: {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
  imageLastModified: string
}[]
  sellers: {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
  DeliverySlaSamplesPerRegion: {
  "0"?: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}
}
  Installments: {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}[]
  DiscountHighLight: unknown[]
  GiftSkuIds: unknown[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: unknown[]
  ItemMetadataAttachment: unknown[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: {
  DeliverySlaPerTypes: unknown[]
  Region: string | null
}[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: {
  installmentOptions: {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}[]
}[]
}[]
  paymentSystems: {
  id: number
  name: string
  groupName: string
  validator: string | null
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: string | null
}[]
  payments: unknown[]
  giftCards: unknown[]
  giftCardMessages: unknown[]
  availableAccounts: unknown[]
  availableTokens: unknown[]
}
}
}[]
  Videos: unknown[]
  estimatedDateArrival: string | null
}[]
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/search/${encodePathParam(params['product-text-link'])}/p` }, opts))
  }
}
class LegacySearchApi_offers {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogSystemPubProductsOffersByProductId(params: {
  productId: string
}, opts?: CallOptions): Promise<{
  SkuId: string
  EanId: string
  RefId: string
  Name: string
  NameComplete: string
  IsActive: boolean
  MainImage: {
  ImageId: string
  ImageLabel: string | null
  ImageTag: string
  ImagePath: string
  IsMain: boolean
  IsZoomSize: boolean
  ImageText: string | null
  LastModified: string
}
  Offers: {
  SellerId: string
  SellerSkuId: string
  OffersPerSalesChannel: {
  AvailableQuantity: number
  SaleChannel: number
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  IsAvailable: boolean
}[]
  AvailableSalesChannels: string | null
}[]
  LastModified: string
  ProductId: string
}[]> {
    return this.http.request<{
  SkuId: string
  EanId: string
  RefId: string
  Name: string
  NameComplete: string
  IsActive: boolean
  MainImage: {
  ImageId: string
  ImageLabel: string | null
  ImageTag: string
  ImagePath: string
  IsMain: boolean
  IsZoomSize: boolean
  ImageText: string | null
  LastModified: string
}
  Offers: {
  SellerId: string
  SellerSkuId: string
  OffersPerSalesChannel: {
  AvailableQuantity: number
  SaleChannel: number
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  IsAvailable: boolean
}[]
  AvailableSalesChannels: string | null
}[]
  LastModified: string
  ProductId: string
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/offers/${encodePathParam(params.productId)}` }, opts))
  }

  getApiCatalogSystemPubProductsOffersByProductIdSkuBySkuId(params: {
  productId: string
  skuId: string
}, opts?: CallOptions): Promise<{
  SkuId: string
  EanId: string
  RefId: string
  Name: string
  NameComplete: string
  IsActive: boolean
  MainImage: {
  ImageId: string
  ImageLabel: string | null
  ImageTag: string
  ImagePath: string
  IsMain: boolean
  IsZoomSize: boolean
  ImageText: string | null
  LastModified: string
}
  Offers: {
  SellerId: string
  SellerSkuId: string
  OffersPerSalesChannel: {
  AvailableQuantity: number
  SaleChannel: number
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  IsAvailable: boolean
}[]
  AvailableSalesChannels: string | null
}[]
  LastModified: string
  ProductId: string
}[]> {
    return this.http.request<{
  SkuId: string
  EanId: string
  RefId: string
  Name: string
  NameComplete: string
  IsActive: boolean
  MainImage: {
  ImageId: string
  ImageLabel: string | null
  ImageTag: string
  ImagePath: string
  IsMain: boolean
  IsZoomSize: boolean
  ImageText: string | null
  LastModified: string
}
  Offers: {
  SellerId: string
  SellerSkuId: string
  OffersPerSalesChannel: {
  AvailableQuantity: number
  SaleChannel: number
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  IsAvailable: boolean
}[]
  AvailableSalesChannels: string | null
}[]
  LastModified: string
  ProductId: string
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/offers/${encodePathParam(params.productId)}/sku/${encodePathParam(params.skuId)}` }, opts))
  }
}
class LegacySearchApi_facets {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogSystemPubFacetsCategoryByCategoryId(params: {
  categoryId: string
  _from?: string
  _to?: string
}, opts?: CallOptions): Promise<{
  Name: string
  Id: number
}[]> {
    return this.http.request<{
  Name: string
  Id: number
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/facets/category/${encodePathParam(params.categoryId)}`, query: { '_from': params._from, '_to': params._to } }, opts))
  }

  facetscategory(params: {
  term: string
  map: string
}, opts?: CallOptions): Promise<{
  Departments: {
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
}[]
  Brands: {
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
}[]
  SpecificationFilters: Record<string, unknown>
  CategoriesTrees: {
  Id: number
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
  Children: {
  Id: number
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
  Children: unknown[]
}[]
}[]
  PriceRanges: unknown[]
  Summary: {
  Departments: {
  DisplayedItems: number
  TotalItems: number
}
  CategoriesTrees: {
  DisplayedItems: number
  TotalItems: number
}
  Brands: {
  DisplayedItems: number
  TotalItems: number
}
  PriceRanges: {
  DisplayedItems: number
  TotalItems: number
}
  SpecificationFilters: Record<string, unknown>
}
}> {
    return this.http.request<{
  Departments: {
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
}[]
  Brands: {
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
}[]
  SpecificationFilters: Record<string, unknown>
  CategoriesTrees: {
  Id: number
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
  Children: {
  Id: number
  Quantity: number
  Position: number | null
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
  Children: unknown[]
}[]
}[]
  PriceRanges: unknown[]
  Summary: {
  Departments: {
  DisplayedItems: number
  TotalItems: number
}
  CategoriesTrees: {
  DisplayedItems: number
  TotalItems: number
}
  Brands: {
  DisplayedItems: number
  TotalItems: number
}
  PriceRanges: {
  DisplayedItems: number
  TotalItems: number
}
  SpecificationFilters: Record<string, unknown>
}
}>(withCall({ method: 'GET', path: `/api/catalog_system/pub/facets/search/${encodePathParam(params.term)}`, query: { 'map': params.map } }, opts))
  }
}
class LegacySearchApi_autocomplete {
  constructor(private http: VtexHttpClient) {}

  autoComplete(params: {
  productNameContains: string
}, opts?: CallOptions): Promise<{
  itemsReturned: {
  items: {
  productId?: string
  itemId?: string
  name?: string
  nameComplete?: string
  imageUrl?: string
}[]
  thumb: string
  thumbUrl: string | null
  name: string
  href: string
  criteria: string | null
}[]
}> {
    return this.http.request<{
  itemsReturned: {
  items: {
  productId?: string
  itemId?: string
  name?: string
  nameComplete?: string
  imageUrl?: string
}[]
  thumb: string
  thumbUrl: string | null
  name: string
  href: string
  criteria: string | null
}[]
}>(withCall({ method: 'GET', path: `/buscaautocomplete`, query: { 'productNameContains': params.productNameContains } }, opts))
  }
}

export class LegacySearchApi {
  readonly crossSelling: LegacySearchApi_crossSelling
  readonly search: LegacySearchApi_search
  readonly offers: LegacySearchApi_offers
  readonly facets: LegacySearchApi_facets
  readonly autocomplete: LegacySearchApi_autocomplete
  constructor(http: VtexHttpClient) {
    this.crossSelling = new LegacySearchApi_crossSelling(http)
    this.search = new LegacySearchApi_search(http)
    this.offers = new LegacySearchApi_offers(http)
    this.facets = new LegacySearchApi_facets(http)
    this.autocomplete = new LegacySearchApi_autocomplete(http)
  }
}
