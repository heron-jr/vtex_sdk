export type OrderForm = {
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string | null
  ean?: string | null
  name?: string
  skuName?: string
  modalType?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  priceValidUntil?: string
  tax?: number
  taxCode?: string
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string | null
  brandName?: string
  brandId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  preSaleDate?: string | null
  productCategoryIds?: string
  productCategories?: {
  [key: string]: string
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
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string | null
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
  receiverName?: string | null
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
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
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
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
  receiverName?: string | null
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string | null
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
} | null
  clientProfileData?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
} | null
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
  transactions?: ({
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string
  bin?: string | null
  installments?: number
  paymentSystem?: string
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
} | null)[]
}
  marketingData?: {
  coupon?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
} | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
  minimumOrderValue?: number | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean | null
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown> | null
  openTextField?: string | null
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
} | null
  customData?: {
  customApps?: (Record<string, unknown> | null)[] | null
  customFields?: ({
  linkedEntity?: {
  type?: "order" | "item" | "address"
  id?: string
}
  fields?: {
  name?: string
  value?: string
  refId?: string
}[]
} | null)[] | null
} | null
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string | null
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
} | null
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
  url?: string | null
  authorizationHeader?: string | null
  appId?: string
  isMarketplaceResponsibleForTaxes?: unknown
} | null
  minimumQuantityAccumulatedForItems: number
  decimalDigitsPrecision: number
  minimumValueAccumulated: number | null
  apps: {
  id?: string
  fields?: string[]
  major?: number
}[] | null
  allowMultipleDeliveries: boolean | null
  allowManualPrice: boolean | null
  maxNumberOfWhiteLabelSellers?: number
  maskFirstPurchaseData?: boolean
  maskStateOnAddress?: boolean
  recaptchaValidation?: string | null
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
