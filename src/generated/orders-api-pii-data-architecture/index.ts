import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { ClientProfileData, ShippingData, Address, PickupStoreInfo, ChangesAttachment, Stats, AuthorizationPolicyData } from './types.js'

class OrdersApiPiiDataArchitectureApi_orders {
  constructor(private http: VtexHttpClient) {}

  getOrder2(params: {
  orderId: string
  reason?: string
}, opts?: CallOptions): Promise<{
  id?: string
  sellerOrderId?: string
  orderFormId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  orderGroup?: string
  items?: {
  productCategories?: {
  additionalProperties?: string
}
  uniqueId?: string
  id?: string
  productId?: string
  lockId?: string | null
  ean?: string | null
  quantity?: number
  seller?: string
  sellerSku?: string
  priceValidUntil?: string
  name?: string
  additionalInfo?: {
  brandName?: string
  brandId?: string
  categoriesIds?: string
  dimension?: {
  cubicweight?: number
  height?: number
  length?: number
  weight?: number
  width?: number
}
  productClusterId?: string
  commercialConditionId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
  categories?: {
  id?: number
  name?: string
}[]
}
  attachments?: {
  name?: string | null
  content?: {
  [key: string]: string | null
} | null
}[] | null
  attachmentOfferings?: ({
  name?: string | null
  required?: boolean | null
  schema?: Record<string, unknown> | null
} | null)[] | null
  assemblies?: (string | null)[] | null
  refId?: string
  shippingPrice?: number | null
  price?: number
  sellingPrice?: number
  listPrice?: number
  manualPrice?: number | null
  tax?: number
  rewardValue?: number
  freightCommission?: number
  commission?: number
  priceTags?: {
  name?: string
  rawValue?: number
  isPercentual?: boolean
  identifier?: string
  rate?: number | null
  jurisCode?: string | null
  jurisType?: string | null
  jurisName?: string | null
}[]
  imageUrl?: string
  detailUrl?: string
  components?: (string | null)[] | null
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[] | null
  offerings?: (string | null)[] | null
  preSaleDate?: string | null
  isGift?: boolean
  taxCode?: string | null
  measurementUnit?: string
  unitMultiplier?: number
  marketingData?: {
  utmSource?: string | null
  utmMedium?: string
  utmCampaign?: string | null
  utmPartner?: string | null
  utmipage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
  coupon?: string | null
  marketingTags?: string[]
} | null
  parentAssemblyBinding?: string | null
  parentItemIndex?: number | null
  callCenterOperator?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  reason?: string | null
}
  costPrice?: number | null
}[]
  marketplaceItems?: (string | null)[] | null
  authorizedDate?: string
  subscriptionData?: {
  subscriptionGroupId?: string | null
  subscriptions?: {
  executionCount?: number
  priceAtSubscriptionDate?: number | null
  itemIndex?: number
  plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string | null
}
}
}[] | null
} | null
  taxData?: {
  areTaxesDesignatedByMarketplace: boolean
  taxInfoCollection: {
  itemIndex: number
  sku: string
  priceTags: {
  areTaxesDesignatedByMarketplace?: boolean
  taxInfoCollection?: {
  itemIndex?: number
  sku?: string
  priceTags?: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  value?: number
  rawValue?: number
}[]
}[]
} | null
}[]
} | null
  invoicedDate?: string | null
  marketplaceOrderId?: string | null
  marketplaceServicesEndpoint?: string | null
  clientProfileData?: ClientProfileData
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
} | null
  emailTracked?: string
  isCheckedIn?: boolean
  approvedBy?: string | null
  cancelledBy?: string | null
  canceledBy?: string | null
  cancelReason?: string | null
  callCenterOperatorData?: {
  id?: string
  email?: string
  userName?: string
} | null
  allowCancellation?: boolean
  allowEdition?: boolean
  roundingError?: number
  salesChannel?: string
  salesChannelData?: {
  countryCode?: string | null
  currencyCode?: string | null
  currencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
} | null
  cultureInfo?: string | null
  currencyLocale?: number
  currencySymbol?: string | null
  timeZone?: string | null
  id?: string
  name?: string
  isActive?: boolean
}
  customData?: {
  customApps?: (string | null)[] | null
} | null
  changesAttachment?: ChangesAttachment
  commercialConditionData?: string | null
  shippingData?: ShippingData
  packageAttachment?: {
  packages?: {
  courier?: string
  description?: string | null
  invoiceNumber?: string
  invoiceValue?: number
  invoiceUrl?: string
  issuanceDate?: string
  trackingNumber?: string
  invoiceKey?: string
  trackingUrl?: string
  embeddedInvoice?: string
  type?: "Output" | "Input"
  items?: {
  itemIndex?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
  unitMultiplier?: number
}[]
  courierStatus?: {
  deliveredDate?: string
  status?: string | null
  finished?: boolean
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
} | null
  cfop?: string | null
  lastChange?: string
  restitutions?: {
  refund?: {
  value?: number
  giftCardData?: string | null
  items?: {
  useFreight?: boolean | null
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[] | null
}
} | null
  volumes?: number | null
}[] | null
} | null
  marketplace?: {
  baseURL?: string
  isCertified?: boolean | null
  name?: string
} | null
  contextData?: {
  loggedIn?: boolean
  hasAccessToOrderFormEnabledByLicenseManager?: boolean
  userAgent?: string
  userId?: string
}
  lastMessage?: string | null
  status?: string
  handlingData?: string | null
  documentVersion?: string
  appVersion?: string
  workflowData?: {
  instances?: {
  id?: string
  name?: string
  currentStepName?: string
  currentStepDescription?: string | null
  lastChange?: string
  isInError?: boolean
  isInAutomaticRetry?: boolean
  creationDate?: string
  owner?: string | null
  version?: string | null
  timeLine?: {
  stepName?: string
  date?: string
  parentStepName?: string
}[]
  logicTimeLine?: {
  stepName?: string
  date?: string
}[]
  steps?: {
  name?: string
  next?: {
  name?: string
  next?: string | null
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
} | null
  expectFlow?: boolean | null
}[] | null
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
} | null
  start?: boolean
}[]
  currentLogicalStep?: string
}[]
  mainFlowIndex?: number
}
  checkedInPickupPointId?: string | null
  fingerPrint?: string
  piiHidden?: boolean
  workflowIsInError?: boolean
  callCenterOperator?: string | null
  state?: string
  timeZoneCreationDate?: string
  timeZoneLastChange?: string
  userType?: string | null
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  orderId?: string
  workflowInstanceId?: string | null
  creationDate?: string
  totals?: {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  name?: string
  value?: number
  alternativeTotals?: {
  id?: string
  name?: string
  value?: number
}[] | null
}[]
  sequence?: string
  receiptData?: {
  receiptCollection?: {
  receiptType?: string
  date?: string
}[]
}
  isCompleted?: boolean
  openTextField?: {
  [key: string]: string
} | null
  affiliateId?: string | null
  value?: number
  hostname?: string
  followUpEmail?: string
  lastChange?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
  fulfillmentEndpoint?: string
  subSellerId?: string
}[]
  marketingData?: {
  utmSource?: string | null
  utmMedium?: string
  utmCampaign?: string | null
  utmPartner?: string | null
  utmipage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
  coupon?: string | null
  marketingTags?: string[]
} | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
  name?: string
  featured?: boolean
  description?: string | null
  matchedParameters?: {
  [key: string]: string
} | null
  additionalInfo?: {
  [key: string]: string
} | null
}[]
  teaser?: {
  name?: string
  description?: string
}[] | null
}
  paymentData?: {
  giftCards?: {
  id?: string
  redemptionCode?: string
  name?: string | null
  caption?: string | null
  value?: number
  balance?: number
  provider?: string
  groupName?: string | null
  inUse?: boolean
  isSpecialCard?: boolean
}[] | null
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  bankIssuedInvoiceIdentificationNumberFormatted?: string | null
  bankIssuedInvoiceIdentificationNumber?: string | null
  parentAccountId?: string | null
  accountId?: string
  dueDate?: string | null
  group?: "creditCard" | "debitCard" | "bankInvoice" | "promissory" | "giftCard" | "instantPayment"
  isGiftCardDiscount?: boolean | null
  giftCardName?: string | null
  giftCardCaption?: string | null
  giftCardProvider?: string | null
  giftCardId?: string | null
  redemptionCode?: string | null
  tid?: string
  koinUrl?: string | null
  url?: string | null
  expireYear?: string | null
  expireMonth?: string | null
  cvv2?: string | null
  lastDigits?: string | null
  firstDigits?: string | null
  cardNumber?: string | null
  cardHolder?: string | null
  referenceValue?: number
  connectorResponses?: {
  Message?: string
  tid?: string
  authorizationId?: string
  status?: string
  delayToAutoSettle?: number
  ReturnCode?: string | null
  nsu?: string
  code?: string
  message?: string
  Tid?: string
  acquirer?: string
  authId?: string
  paymentId?: string
  delayToAutoSettleAfterAntifraud?: string
}
  installments?: number
  value?: number
  paymentSystemName?: string
  paymentSystem?: string
  paymentOrigin?: string | null
  id?: string
  bankIssuedInvoiceBarCodeNumber?: string | null
  bankIssuedInvoiceBarCodeType?: string | null
  billingAddress?: {
  addressType?: "residential" | "pickup"
  receiverName?: string
  addressId?: string
  versionId?: string | null
  entityId?: string | null
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
  contactId?: string | null
} | null
}[]
  sharedTransaction?: boolean
  status?: string | null
}[]
}
  invoiceData?: {
  address?: {
  addressType?: "residential" | "pickup" | null
  receiverName?: string | null
  addressId?: string | null
  versionId?: string | null
  entityId?: string | null
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
  contactId?: string | null
} | null
  userPaymentInfo?: {
  paymentMethods?: string[]
} | null
  settleInvoices?: string[] | null
  invoiceSubject?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
} | null
} | null
  storePreferencesData?: {
  countryCode?: string
  currencyCode?: string
  currencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  currencyLocale?: number
  currencySymbol?: string
  timeZone?: string
}
  merchantName?: string | null
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: {
  [key: string]: string | null
} | null
  composition?: {
  [key: string]: string
} | null
}[] | null
}[]
}
  creationEnvironment?: "BETA" | "STABLE" | null
  cancellationData?: {
  requestedByUser?: boolean
  requestedBySystem?: boolean | null
  requestedBySellerNotification?: boolean | null
  requestedByPaymentNotification?: boolean | null
  reason?: string
  cancellationDate?: string
  cancellationRequestId?: string
} | null
  cancellationRequests?: {
  id?: string
  reason?: string
  cancellationRequestDate?: string
  requestedByUser?: boolean
  deniedBySeller?: boolean
  deniedBySellerReason?: string | null
  cancellationRequestDenyDate?: string | null
}[] | null
  authorizationPolicyData?: AuthorizationPolicyData
}> {
    return this.http.request<{
  id?: string
  sellerOrderId?: string
  orderFormId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  orderGroup?: string
  items?: {
  productCategories?: {
  additionalProperties?: string
}
  uniqueId?: string
  id?: string
  productId?: string
  lockId?: string | null
  ean?: string | null
  quantity?: number
  seller?: string
  sellerSku?: string
  priceValidUntil?: string
  name?: string
  additionalInfo?: {
  brandName?: string
  brandId?: string
  categoriesIds?: string
  dimension?: {
  cubicweight?: number
  height?: number
  length?: number
  weight?: number
  width?: number
}
  productClusterId?: string
  commercialConditionId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
  categories?: {
  id?: number
  name?: string
}[]
}
  attachments?: {
  name?: string | null
  content?: {
  [key: string]: string | null
} | null
}[] | null
  attachmentOfferings?: ({
  name?: string | null
  required?: boolean | null
  schema?: Record<string, unknown> | null
} | null)[] | null
  assemblies?: (string | null)[] | null
  refId?: string
  shippingPrice?: number | null
  price?: number
  sellingPrice?: number
  listPrice?: number
  manualPrice?: number | null
  tax?: number
  rewardValue?: number
  freightCommission?: number
  commission?: number
  priceTags?: {
  name?: string
  rawValue?: number
  isPercentual?: boolean
  identifier?: string
  rate?: number | null
  jurisCode?: string | null
  jurisType?: string | null
  jurisName?: string | null
}[]
  imageUrl?: string
  detailUrl?: string
  components?: (string | null)[] | null
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[] | null
  offerings?: (string | null)[] | null
  preSaleDate?: string | null
  isGift?: boolean
  taxCode?: string | null
  measurementUnit?: string
  unitMultiplier?: number
  marketingData?: {
  utmSource?: string | null
  utmMedium?: string
  utmCampaign?: string | null
  utmPartner?: string | null
  utmipage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
  coupon?: string | null
  marketingTags?: string[]
} | null
  parentAssemblyBinding?: string | null
  parentItemIndex?: number | null
  callCenterOperator?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  reason?: string | null
}
  costPrice?: number | null
}[]
  marketplaceItems?: (string | null)[] | null
  authorizedDate?: string
  subscriptionData?: {
  subscriptionGroupId?: string | null
  subscriptions?: {
  executionCount?: number
  priceAtSubscriptionDate?: number | null
  itemIndex?: number
  plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string | null
}
}
}[] | null
} | null
  taxData?: {
  areTaxesDesignatedByMarketplace: boolean
  taxInfoCollection: {
  itemIndex: number
  sku: string
  priceTags: {
  areTaxesDesignatedByMarketplace?: boolean
  taxInfoCollection?: {
  itemIndex?: number
  sku?: string
  priceTags?: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  value?: number
  rawValue?: number
}[]
}[]
} | null
}[]
} | null
  invoicedDate?: string | null
  marketplaceOrderId?: string | null
  marketplaceServicesEndpoint?: string | null
  clientProfileData?: ClientProfileData
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
} | null
  emailTracked?: string
  isCheckedIn?: boolean
  approvedBy?: string | null
  cancelledBy?: string | null
  canceledBy?: string | null
  cancelReason?: string | null
  callCenterOperatorData?: {
  id?: string
  email?: string
  userName?: string
} | null
  allowCancellation?: boolean
  allowEdition?: boolean
  roundingError?: number
  salesChannel?: string
  salesChannelData?: {
  countryCode?: string | null
  currencyCode?: string | null
  currencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
} | null
  cultureInfo?: string | null
  currencyLocale?: number
  currencySymbol?: string | null
  timeZone?: string | null
  id?: string
  name?: string
  isActive?: boolean
}
  customData?: {
  customApps?: (string | null)[] | null
} | null
  changesAttachment?: ChangesAttachment
  commercialConditionData?: string | null
  shippingData?: ShippingData
  packageAttachment?: {
  packages?: {
  courier?: string
  description?: string | null
  invoiceNumber?: string
  invoiceValue?: number
  invoiceUrl?: string
  issuanceDate?: string
  trackingNumber?: string
  invoiceKey?: string
  trackingUrl?: string
  embeddedInvoice?: string
  type?: "Output" | "Input"
  items?: {
  itemIndex?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
  unitMultiplier?: number
}[]
  courierStatus?: {
  deliveredDate?: string
  status?: string | null
  finished?: boolean
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
} | null
  cfop?: string | null
  lastChange?: string
  restitutions?: {
  refund?: {
  value?: number
  giftCardData?: string | null
  items?: {
  useFreight?: boolean | null
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[] | null
}
} | null
  volumes?: number | null
}[] | null
} | null
  marketplace?: {
  baseURL?: string
  isCertified?: boolean | null
  name?: string
} | null
  contextData?: {
  loggedIn?: boolean
  hasAccessToOrderFormEnabledByLicenseManager?: boolean
  userAgent?: string
  userId?: string
}
  lastMessage?: string | null
  status?: string
  handlingData?: string | null
  documentVersion?: string
  appVersion?: string
  workflowData?: {
  instances?: {
  id?: string
  name?: string
  currentStepName?: string
  currentStepDescription?: string | null
  lastChange?: string
  isInError?: boolean
  isInAutomaticRetry?: boolean
  creationDate?: string
  owner?: string | null
  version?: string | null
  timeLine?: {
  stepName?: string
  date?: string
  parentStepName?: string
}[]
  logicTimeLine?: {
  stepName?: string
  date?: string
}[]
  steps?: {
  name?: string
  next?: {
  name?: string
  next?: string | null
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
} | null
  expectFlow?: boolean | null
}[] | null
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
} | null
  start?: boolean
}[]
  currentLogicalStep?: string
}[]
  mainFlowIndex?: number
}
  checkedInPickupPointId?: string | null
  fingerPrint?: string
  piiHidden?: boolean
  workflowIsInError?: boolean
  callCenterOperator?: string | null
  state?: string
  timeZoneCreationDate?: string
  timeZoneLastChange?: string
  userType?: string | null
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  orderId?: string
  workflowInstanceId?: string | null
  creationDate?: string
  totals?: {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  name?: string
  value?: number
  alternativeTotals?: {
  id?: string
  name?: string
  value?: number
}[] | null
}[]
  sequence?: string
  receiptData?: {
  receiptCollection?: {
  receiptType?: string
  date?: string
}[]
}
  isCompleted?: boolean
  openTextField?: {
  [key: string]: string
} | null
  affiliateId?: string | null
  value?: number
  hostname?: string
  followUpEmail?: string
  lastChange?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
  fulfillmentEndpoint?: string
  subSellerId?: string
}[]
  marketingData?: {
  utmSource?: string | null
  utmMedium?: string
  utmCampaign?: string | null
  utmPartner?: string | null
  utmipage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
  coupon?: string | null
  marketingTags?: string[]
} | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
  name?: string
  featured?: boolean
  description?: string | null
  matchedParameters?: {
  [key: string]: string
} | null
  additionalInfo?: {
  [key: string]: string
} | null
}[]
  teaser?: {
  name?: string
  description?: string
}[] | null
}
  paymentData?: {
  giftCards?: {
  id?: string
  redemptionCode?: string
  name?: string | null
  caption?: string | null
  value?: number
  balance?: number
  provider?: string
  groupName?: string | null
  inUse?: boolean
  isSpecialCard?: boolean
}[] | null
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  bankIssuedInvoiceIdentificationNumberFormatted?: string | null
  bankIssuedInvoiceIdentificationNumber?: string | null
  parentAccountId?: string | null
  accountId?: string
  dueDate?: string | null
  group?: "creditCard" | "debitCard" | "bankInvoice" | "promissory" | "giftCard" | "instantPayment"
  isGiftCardDiscount?: boolean | null
  giftCardName?: string | null
  giftCardCaption?: string | null
  giftCardProvider?: string | null
  giftCardId?: string | null
  redemptionCode?: string | null
  tid?: string
  koinUrl?: string | null
  url?: string | null
  expireYear?: string | null
  expireMonth?: string | null
  cvv2?: string | null
  lastDigits?: string | null
  firstDigits?: string | null
  cardNumber?: string | null
  cardHolder?: string | null
  referenceValue?: number
  connectorResponses?: {
  Message?: string
  tid?: string
  authorizationId?: string
  status?: string
  delayToAutoSettle?: number
  ReturnCode?: string | null
  nsu?: string
  code?: string
  message?: string
  Tid?: string
  acquirer?: string
  authId?: string
  paymentId?: string
  delayToAutoSettleAfterAntifraud?: string
}
  installments?: number
  value?: number
  paymentSystemName?: string
  paymentSystem?: string
  paymentOrigin?: string | null
  id?: string
  bankIssuedInvoiceBarCodeNumber?: string | null
  bankIssuedInvoiceBarCodeType?: string | null
  billingAddress?: {
  addressType?: "residential" | "pickup"
  receiverName?: string
  addressId?: string
  versionId?: string | null
  entityId?: string | null
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
  contactId?: string | null
} | null
}[]
  sharedTransaction?: boolean
  status?: string | null
}[]
}
  invoiceData?: {
  address?: {
  addressType?: "residential" | "pickup" | null
  receiverName?: string | null
  addressId?: string | null
  versionId?: string | null
  entityId?: string | null
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
  contactId?: string | null
} | null
  userPaymentInfo?: {
  paymentMethods?: string[]
} | null
  settleInvoices?: string[] | null
  invoiceSubject?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
} | null
} | null
  storePreferencesData?: {
  countryCode?: string
  currencyCode?: string
  currencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  currencyLocale?: number
  currencySymbol?: string
  timeZone?: string
}
  merchantName?: string | null
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: {
  [key: string]: string | null
} | null
  composition?: {
  [key: string]: string
} | null
}[] | null
}[]
}
  creationEnvironment?: "BETA" | "STABLE" | null
  cancellationData?: {
  requestedByUser?: boolean
  requestedBySystem?: boolean | null
  requestedBySellerNotification?: boolean | null
  requestedByPaymentNotification?: boolean | null
  reason?: string
  cancellationDate?: string
  cancellationRequestId?: string
} | null
  cancellationRequests?: {
  id?: string
  reason?: string
  cancellationRequestDate?: string
  requestedByUser?: boolean
  deniedBySeller?: boolean
  deniedBySellerReason?: string | null
  cancellationRequestDenyDate?: string | null
}[] | null
  authorizationPolicyData?: AuthorizationPolicyData
}>(withCall({ method: 'GET', path: `/api/orders/pvt/document/${encodePathParam(params.orderId)}`, query: { 'reason': params.reason } }, opts))
  }

  listOrders2(params: {
  body: {
  f_status?: string
  f_creationDate?: string
  incompleteOrders?: boolean
  filterError?: "all" | "temp" | "perm"
  per_page?: number
  page?: number
  orderBy?: string
  q?: string
  sku_Ids?: string
  listId?: string
  f_authorizedDate?: string
  f_paymentNames?: string
  paymentId?: string
  pci_tid?: string
  nsu?: string
  f_hasInputInvoice?: boolean
  f_hasOutputInvoice?: boolean
  f_invoicedDate?: string
  f_shippingEstimate?: string
  f_sellerNames?: string
  f_affiliateId?: string
  f_callCenterOperatorName?: string
  f_isInstore?: boolean
  f_RnB?: string
  salesChannelId?: string
  f_salesChannel?: string
}
}, opts?: CallOptions): Promise<{
  list?: {
  paymentNames?: string
  orderId?: string
  orderGroup?: string
  sequence?: string
  clientEmail?: string
  clientDocument?: string
  clientCorporateDocument?: string | null
  clientCorporateName?: string | null
  clientName?: string
  totalValue?: number
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  status?: string
  currencyCode?: string
  sellerNames?: string[]
  sellerIds?: string[]
  sellerOrderId?: string
  totalItems?: number
  pciTransactionId?: string[]
  paymentNSU?: string[]
  ratesAndBenefitsNames?: string[]
  ratesAndBenefitsIds?: string[]
  shippingEstimatedDateMax?: string
  shippingEstimatedDateMin?: string
  transactionIds?: string[]
  paymentIds?: string[]
  isInstore?: boolean
  deliveryChannel?: ("delivery" | "pickup-in-point")[]
  productIds?: string[]
  hostname?: string
  creationDate?: string
  invoicedDate?: string | null
  authorizedDate?: string
  orderIsComplete?: boolean
  marketingTags?: string[]
  invoicesOutput?: (string | null)[] | null
  invoicesInput?: (string | null)[] | null
  workflowInErrorState?: boolean
  workflowInRetry?: boolean
  userProfileId?: string
  lastChange?: string
  isAllDelivered?: boolean
  isAnyDelivered?: boolean
  giftCardProviders?: string[] | null
  orderFormId?: string
  paymentApprovedDate?: string
  readyForHandlingDate?: string | null
  deliveryDates?: string[] | null
  ingestPipelineMetadata?: string[]
  marketplaceWorkflowInstanceId?: string | null
  fulfillmentWorkflowInstanceId?: string | null
  callCenterOperatorEmail?: string | null
  callCenterOperatorName?: string | null
  productNames?: string[]
}[]
  facets?: (string | null)[] | null
  paging?: {
  total: number
  pages: number
  currentPage: number
  perPage: number
}
  stats?: Stats
  reportRecordsLimit?: number
}> {
    return this.http.request<{
  list?: {
  paymentNames?: string
  orderId?: string
  orderGroup?: string
  sequence?: string
  clientEmail?: string
  clientDocument?: string
  clientCorporateDocument?: string | null
  clientCorporateName?: string | null
  clientName?: string
  totalValue?: number
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  status?: string
  currencyCode?: string
  sellerNames?: string[]
  sellerIds?: string[]
  sellerOrderId?: string
  totalItems?: number
  pciTransactionId?: string[]
  paymentNSU?: string[]
  ratesAndBenefitsNames?: string[]
  ratesAndBenefitsIds?: string[]
  shippingEstimatedDateMax?: string
  shippingEstimatedDateMin?: string
  transactionIds?: string[]
  paymentIds?: string[]
  isInstore?: boolean
  deliveryChannel?: ("delivery" | "pickup-in-point")[]
  productIds?: string[]
  hostname?: string
  creationDate?: string
  invoicedDate?: string | null
  authorizedDate?: string
  orderIsComplete?: boolean
  marketingTags?: string[]
  invoicesOutput?: (string | null)[] | null
  invoicesInput?: (string | null)[] | null
  workflowInErrorState?: boolean
  workflowInRetry?: boolean
  userProfileId?: string
  lastChange?: string
  isAllDelivered?: boolean
  isAnyDelivered?: boolean
  giftCardProviders?: string[] | null
  orderFormId?: string
  paymentApprovedDate?: string
  readyForHandlingDate?: string | null
  deliveryDates?: string[] | null
  ingestPipelineMetadata?: string[]
  marketplaceWorkflowInstanceId?: string | null
  fulfillmentWorkflowInstanceId?: string | null
  callCenterOperatorEmail?: string | null
  callCenterOperatorName?: string | null
  productNames?: string[]
}[]
  facets?: (string | null)[] | null
  paging?: {
  total: number
  pages: number
  currentPage: number
  perPage: number
}
  stats?: Stats
  reportRecordsLimit?: number
}>(withCall({ method: 'POST', path: `/api/orders/extendsearch/orders`, body: params.body }, opts))
  }

  startHandling2(params: {
  orderId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/orders/pvt/document/${encodePathParam(params.orderId)}/actions/start-handling` }, opts))
  }

  cancelOrder2(params: {
  orderId: string
  body: {
  reason?: string
}
}, opts?: CallOptions): Promise<{
  date?: string
  orderId?: string
  receipt?: string | null
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string | null
}>(withCall({ method: 'POST', path: `/api/orders/pvt/document/${encodePathParam(params.orderId)}/cancel`, body: params.body }, opts))
  }
}
class OrdersApiPiiDataArchitectureApi_invoice {
  constructor(private http: VtexHttpClient) {}

  invoiceNotification2(params: {
  orderId: string
  body: {
  type: string
  issuedDate: string
  invoiceNumber: string
  invoiceValue: number
  extraValue?: number
  invoiceKey?: string | null
  invoiceUrl?: string | null
  courier?: string | null
  trackingNumber?: string | null
  trackingUrl?: string | null
  items: {
  itemIndex: number
  price: number
  quantity: number
}[]
  cfop?: string
  volumes?: number
}
}, opts?: CallOptions): Promise<{
  date?: string
  orderId?: string
  receipt?: string | null
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string | null
}>(withCall({ method: 'POST', path: `/api/orders/pvt/document/${encodePathParam(params.orderId)}/invoices`, body: params.body }, opts))
  }
}
class OrdersApiPiiDataArchitectureApi_payment {
  constructor(private http: VtexHttpClient) {}

  sendPaymentNotification2(params: {
  orderId: string
  paymentId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/orders/pvt/document/${encodePathParam(params.orderId)}/payment/${encodePathParam(params.paymentId)}/notify-payment` }, opts))
  }
}

export class OrdersApiPiiDataArchitectureApi {
  readonly orders: OrdersApiPiiDataArchitectureApi_orders
  readonly invoice: OrdersApiPiiDataArchitectureApi_invoice
  readonly payment: OrdersApiPiiDataArchitectureApi_payment
  constructor(http: VtexHttpClient) {
    this.orders = new OrdersApiPiiDataArchitectureApi_orders(http)
    this.invoice = new OrdersApiPiiDataArchitectureApi_invoice(http)
    this.payment = new OrdersApiPiiDataArchitectureApi_payment(http)
  }
}
