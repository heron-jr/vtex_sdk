export type OrderForm = {
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  userType?: string
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string
  name?: string
  skuName?: string
  modalType?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  priceValidUntil?: string
  tax?: number
  taxCode?: string
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string
  brandName?: string
  brandId?: string
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  preSaleDate?: string
  productCategoryIds?: string
  productCategories?: {
  "{ID}"?: string
}
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  attachments?: {
  name?: string
  content?: Record<string, unknown>
}[]
  priceTags?: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  selectableGifts?: string[]
  totalizers?: Record<string, unknown>[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  attachmentOfferings?: {
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
  transitTime?: string
}[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  stateInscription?: string
  corporatePhone?: string
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
}
  paymentData?: {
  giftCards?: {
  redemptionCode?: string
  value?: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string
  bin?: string
  installments?: number
  paymentSystem?: string
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
}[]
}
  marketingData?: {
  coupon?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
  sellers?: {
  id?: string
  name?: string
  logo?: string
  minimumOrderValue?: number
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  commercialConditionData?: Record<string, unknown>
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown>
  openTextField?: string
  invoiceData?: {
  address?: {
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
}
  customData?: {
  customApps?: Record<string, unknown>[]
  customFields?: {
  linkedEntity?: {
  type?: "order" | "item" | "address"
  id?: string
}
  fields?: {
  name?: string
  value?: string
  refId?: string
}[]
}[]
}
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown>
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown>
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}

export type OrderFormSimulationRequest = {
  items: Item[]
  country: string
}

export type Item = {
  id: string
  quantity: number
  seller: string
}

export type PriceChangeRequest = {
  price: number
}

export type SetsinglecustomfieldvalueRequest = {
  value: string
}

export type UpdateorderFormconfigurationRequest = {
  paymentConfiguration: PaymentConfiguration
  taxConfiguration: {
  url?: string
  authorizationHeader?: string
  appId?: string
  isMarketplaceResponsibleForTaxes?: unknown
}
  minimumQuantityAccumulatedForItems: number
  decimalDigitsPrecision: number
  minimumValueAccumulated: number
  apps: {
  id?: string
  fields?: string[]
  major?: number
}[]
  allowMultipleDeliveries: boolean
  allowManualPrice: boolean
  maxNumberOfWhiteLabelSellers?: number
  maskFirstPurchaseData?: boolean
  maskStateOnAddress?: boolean
  recaptchaValidation?: string
  paymentSystemToCheckFirstInstallment?: string
}

export type PaymentConfiguration = {
  requiresAuthenticationForPreAuthorizedPaymentOption: boolean
  allowInstallmentsMerge?: boolean
  blockPaymentSession?: boolean
}

export type WaitingTime = {
  waitingTime: number
}
