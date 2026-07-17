import type { VtexHttpClient } from '../../core/http.js'
import type { ClientProfileData, ShippingData, Address, PickupStoreInfo, ChangesAttachment, Stats, AuthorizationPolicyData } from './types.js'

class OrdersApiPiiDataArchitectureApi_orders {
  constructor(private http: VtexHttpClient) {}

  getOrder2(params: {
  orderId: string
  reason?: string
}): Promise<{
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
  lockId?: string
  ean?: string
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
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
  categories?: {
  id?: number
  name?: string
}[]
}
  attachments?: {
  name?: string
  content?: Record<string, unknown>
}[]
  attachmentOfferings?: {
  name?: string
  required?: boolean
  schema?: Record<string, unknown>
}[]
  assemblies?: string[]
  refId?: string
  shippingPrice?: number
  price?: number
  sellingPrice?: number
  listPrice?: number
  manualPrice?: number
  tax?: number
  rewardValue?: number
  freightCommission?: number
  commission?: number
  priceTags?: {
  name?: string
  rawValue?: number
  isPercentual?: boolean
  identifier?: string
  rate?: number
  jurisCode?: string
  jurisType?: string
  jurisName?: string
}[]
  imageUrl?: string
  detailUrl?: string
  components?: string[]
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  offerings?: string[]
  preSaleDate?: string
  isGift?: boolean
  taxCode?: string
  measurementUnit?: string
  unitMultiplier?: number
  marketingData?: {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmPartner?: string
  utmipage?: string
  utmiPart?: string
  utmiCampaign?: string
  coupon?: string
  marketingTags?: string[]
}
  parentAssemblyBinding?: string
  parentItemIndex?: number
  callCenterOperator?: string
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  reason?: string
}
  costPrice?: number
}[]
  marketplaceItems?: string[]
  authorizedDate?: string
  subscriptionData?: {
  subscriptionGroupId?: string
  subscriptions?: {
  executionCount?: number
  priceAtSubscriptionDate?: number
  itemIndex?: number
  plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string
}
}
}[]
}
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
}
}[]
}
  invoicedDate?: string
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  clientProfileData?: ClientProfileData
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
}
  emailTracked?: string
  isCheckedIn?: boolean
  approvedBy?: string
  cancelledBy?: string
  canceledBy?: string
  cancelReason?: string
  callCenterOperatorData?: {
  id?: string
  email?: string
  userName?: string
}
  allowCancellation?: boolean
  allowEdition?: boolean
  roundingError?: number
  salesChannel?: string
  salesChannelData?: {
  countryCode?: string
  currencyCode?: string
  currencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  cultureInfo?: string
  currencyLocale?: number
  currencySymbol?: string
  timeZone?: string
  id?: string
  name?: string
  isActive?: boolean
}
  customData?: {
  customApps?: string[]
}
  changesAttachment?: ChangesAttachment
  commercialConditionData?: string
  shippingData?: ShippingData
  packageAttachment?: {
  packages?: {
  courier?: string
  description?: string
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
  status?: string
  finished?: boolean
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
}
  cfop?: string
  lastChange?: string
  restitutions?: {
  refund?: {
  value?: number
  giftCardData?: string
  items?: {
  useFreight?: boolean
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[]
}
}
  volumes?: number
}[]
}
  marketplace?: {
  baseURL?: string
  isCertified?: boolean
  name?: string
}
  contextData?: {
  loggedIn?: boolean
  hasAccessToOrderFormEnabledByLicenseManager?: boolean
  userAgent?: string
  userId?: string
}
  lastMessage?: string
  status?: string
  handlingData?: string
  documentVersion?: string
  appVersion?: string
  workflowData?: {
  instances?: {
  id?: string
  name?: string
  currentStepName?: string
  currentStepDescription?: string
  lastChange?: string
  isInError?: boolean
  isInAutomaticRetry?: boolean
  creationDate?: string
  owner?: string
  version?: string
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
  next?: string
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
}
  expectFlow?: boolean
}[]
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
}
  start?: boolean
}[]
  currentLogicalStep?: string
}[]
  mainFlowIndex?: number
}
  checkedInPickupPointId?: string
  fingerPrint?: string
  piiHidden?: boolean
  workflowIsInError?: boolean
  callCenterOperator?: string
  state?: string
  timeZoneCreationDate?: string
  timeZoneLastChange?: string
  userType?: string
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  orderId?: string
  workflowInstanceId?: string
  creationDate?: string
  totals?: {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  name?: string
  value?: number
  alternativeTotals?: {
  id?: string
  name?: string
  value?: number
}[]
}[]
  sequence?: string
  receiptData?: {
  receiptCollection?: {
  receiptType?: string
  date?: string
}[]
}
  isCompleted?: boolean
  openTextField?: Record<string, unknown>
  affiliateId?: string
  value?: number
  hostname?: string
  followUpEmail?: string
  lastChange?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string
  fulfillmentEndpoint?: string
  subSellerId?: string
}[]
  marketingData?: {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmPartner?: string
  utmipage?: string
  utmiPart?: string
  utmiCampaign?: string
  coupon?: string
  marketingTags?: string[]
}
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
  name?: string
  featured?: boolean
  description?: string
  matchedParameters?: Record<string, unknown>
  additionalInfo?: Record<string, unknown>
}[]
  teaser?: {
  name?: string
  description?: string
}[]
}
  paymentData?: {
  giftCards?: {
  id?: string
  redemptionCode?: string
  name?: string
  caption?: string
  value?: number
  balance?: number
  provider?: string
  groupName?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  bankIssuedInvoiceIdentificationNumberFormatted?: string
  bankIssuedInvoiceIdentificationNumber?: string
  parentAccountId?: string
  accountId?: string
  dueDate?: string
  group?: "creditCard" | "debitCard" | "bankInvoice" | "promissory" | "giftCard" | "instantPayment"
  isGiftCardDiscount?: boolean
  giftCardName?: string
  giftCardCaption?: string
  giftCardProvider?: string
  giftCardId?: string
  redemptionCode?: string
  tid?: string
  koinUrl?: string
  url?: string
  expireYear?: string
  expireMonth?: string
  cvv2?: string
  lastDigits?: string
  firstDigits?: string
  cardNumber?: string
  cardHolder?: string
  referenceValue?: number
  connectorResponses?: {
  Message?: string
  tid?: string
  authorizationId?: string
  status?: string
  delayToAutoSettle?: number
  ReturnCode?: string
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
  paymentOrigin?: string
  id?: string
  bankIssuedInvoiceBarCodeNumber?: string
  bankIssuedInvoiceBarCodeType?: string
  billingAddress?: {
  addressType?: "residential" | "pickup"
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  contactId?: string
}
}[]
  sharedTransaction?: boolean
  status?: string
}[]
}
  invoiceData?: {
  address?: {
  addressType?: "residential" | "pickup"
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  contactId?: string
}
  userPaymentInfo?: {
  paymentMethods?: string[]
}
  settleInvoices?: string[]
  invoiceSubject?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
}
}
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
  merchantName?: string
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
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: Record<string, unknown>
  composition?: Record<string, unknown>
}[]
}[]
}
  creationEnvironment?: "BETA" | "STABLE" | null
  cancellationData?: {
  requestedByUser?: boolean
  requestedBySystem?: boolean
  requestedBySellerNotification?: boolean
  requestedByPaymentNotification?: boolean
  reason?: string
  cancellationDate?: string
  cancellationRequestId?: string
}
  cancellationRequests?: {
  id?: string
  reason?: string
  cancellationRequestDate?: string
  requestedByUser?: boolean
  deniedBySeller?: boolean
  deniedBySellerReason?: string
  cancellationRequestDenyDate?: string
}[]
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
  lockId?: string
  ean?: string
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
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
  categories?: {
  id?: number
  name?: string
}[]
}
  attachments?: {
  name?: string
  content?: Record<string, unknown>
}[]
  attachmentOfferings?: {
  name?: string
  required?: boolean
  schema?: Record<string, unknown>
}[]
  assemblies?: string[]
  refId?: string
  shippingPrice?: number
  price?: number
  sellingPrice?: number
  listPrice?: number
  manualPrice?: number
  tax?: number
  rewardValue?: number
  freightCommission?: number
  commission?: number
  priceTags?: {
  name?: string
  rawValue?: number
  isPercentual?: boolean
  identifier?: string
  rate?: number
  jurisCode?: string
  jurisType?: string
  jurisName?: string
}[]
  imageUrl?: string
  detailUrl?: string
  components?: string[]
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  offerings?: string[]
  preSaleDate?: string
  isGift?: boolean
  taxCode?: string
  measurementUnit?: string
  unitMultiplier?: number
  marketingData?: {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmPartner?: string
  utmipage?: string
  utmiPart?: string
  utmiCampaign?: string
  coupon?: string
  marketingTags?: string[]
}
  parentAssemblyBinding?: string
  parentItemIndex?: number
  callCenterOperator?: string
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  reason?: string
}
  costPrice?: number
}[]
  marketplaceItems?: string[]
  authorizedDate?: string
  subscriptionData?: {
  subscriptionGroupId?: string
  subscriptions?: {
  executionCount?: number
  priceAtSubscriptionDate?: number
  itemIndex?: number
  plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string
}
}
}[]
}
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
}
}[]
}
  invoicedDate?: string
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  clientProfileData?: ClientProfileData
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
}
  emailTracked?: string
  isCheckedIn?: boolean
  approvedBy?: string
  cancelledBy?: string
  canceledBy?: string
  cancelReason?: string
  callCenterOperatorData?: {
  id?: string
  email?: string
  userName?: string
}
  allowCancellation?: boolean
  allowEdition?: boolean
  roundingError?: number
  salesChannel?: string
  salesChannelData?: {
  countryCode?: string
  currencyCode?: string
  currencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  cultureInfo?: string
  currencyLocale?: number
  currencySymbol?: string
  timeZone?: string
  id?: string
  name?: string
  isActive?: boolean
}
  customData?: {
  customApps?: string[]
}
  changesAttachment?: ChangesAttachment
  commercialConditionData?: string
  shippingData?: ShippingData
  packageAttachment?: {
  packages?: {
  courier?: string
  description?: string
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
  status?: string
  finished?: boolean
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
}
  cfop?: string
  lastChange?: string
  restitutions?: {
  refund?: {
  value?: number
  giftCardData?: string
  items?: {
  useFreight?: boolean
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[]
}
}
  volumes?: number
}[]
}
  marketplace?: {
  baseURL?: string
  isCertified?: boolean
  name?: string
}
  contextData?: {
  loggedIn?: boolean
  hasAccessToOrderFormEnabledByLicenseManager?: boolean
  userAgent?: string
  userId?: string
}
  lastMessage?: string
  status?: string
  handlingData?: string
  documentVersion?: string
  appVersion?: string
  workflowData?: {
  instances?: {
  id?: string
  name?: string
  currentStepName?: string
  currentStepDescription?: string
  lastChange?: string
  isInError?: boolean
  isInAutomaticRetry?: boolean
  creationDate?: string
  owner?: string
  version?: string
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
  next?: string
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
}
  expectFlow?: boolean
}[]
  systemWillMove?: boolean
  actionsAllowed?: {
  type?: string
}
  start?: boolean
}[]
  currentLogicalStep?: string
}[]
  mainFlowIndex?: number
}
  checkedInPickupPointId?: string
  fingerPrint?: string
  piiHidden?: boolean
  workflowIsInError?: boolean
  callCenterOperator?: string
  state?: string
  timeZoneCreationDate?: string
  timeZoneLastChange?: string
  userType?: string
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  orderId?: string
  workflowInstanceId?: string
  creationDate?: string
  totals?: {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  name?: string
  value?: number
  alternativeTotals?: {
  id?: string
  name?: string
  value?: number
}[]
}[]
  sequence?: string
  receiptData?: {
  receiptCollection?: {
  receiptType?: string
  date?: string
}[]
}
  isCompleted?: boolean
  openTextField?: Record<string, unknown>
  affiliateId?: string
  value?: number
  hostname?: string
  followUpEmail?: string
  lastChange?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string
  fulfillmentEndpoint?: string
  subSellerId?: string
}[]
  marketingData?: {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmPartner?: string
  utmipage?: string
  utmiPart?: string
  utmiCampaign?: string
  coupon?: string
  marketingTags?: string[]
}
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
  name?: string
  featured?: boolean
  description?: string
  matchedParameters?: Record<string, unknown>
  additionalInfo?: Record<string, unknown>
}[]
  teaser?: {
  name?: string
  description?: string
}[]
}
  paymentData?: {
  giftCards?: {
  id?: string
  redemptionCode?: string
  name?: string
  caption?: string
  value?: number
  balance?: number
  provider?: string
  groupName?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  bankIssuedInvoiceIdentificationNumberFormatted?: string
  bankIssuedInvoiceIdentificationNumber?: string
  parentAccountId?: string
  accountId?: string
  dueDate?: string
  group?: "creditCard" | "debitCard" | "bankInvoice" | "promissory" | "giftCard" | "instantPayment"
  isGiftCardDiscount?: boolean
  giftCardName?: string
  giftCardCaption?: string
  giftCardProvider?: string
  giftCardId?: string
  redemptionCode?: string
  tid?: string
  koinUrl?: string
  url?: string
  expireYear?: string
  expireMonth?: string
  cvv2?: string
  lastDigits?: string
  firstDigits?: string
  cardNumber?: string
  cardHolder?: string
  referenceValue?: number
  connectorResponses?: {
  Message?: string
  tid?: string
  authorizationId?: string
  status?: string
  delayToAutoSettle?: number
  ReturnCode?: string
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
  paymentOrigin?: string
  id?: string
  bankIssuedInvoiceBarCodeNumber?: string
  bankIssuedInvoiceBarCodeType?: string
  billingAddress?: {
  addressType?: "residential" | "pickup"
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  contactId?: string
}
}[]
  sharedTransaction?: boolean
  status?: string
}[]
}
  invoiceData?: {
  address?: {
  addressType?: "residential" | "pickup"
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  contactId?: string
}
  userPaymentInfo?: {
  paymentMethods?: string[]
}
  settleInvoices?: string[]
  invoiceSubject?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
}
}
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
  merchantName?: string
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
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: Record<string, unknown>
  composition?: Record<string, unknown>
}[]
}[]
}
  creationEnvironment?: "BETA" | "STABLE" | null
  cancellationData?: {
  requestedByUser?: boolean
  requestedBySystem?: boolean
  requestedBySellerNotification?: boolean
  requestedByPaymentNotification?: boolean
  reason?: string
  cancellationDate?: string
  cancellationRequestId?: string
}
  cancellationRequests?: {
  id?: string
  reason?: string
  cancellationRequestDate?: string
  requestedByUser?: boolean
  deniedBySeller?: boolean
  deniedBySellerReason?: string
  cancellationRequestDenyDate?: string
}[]
  authorizationPolicyData?: AuthorizationPolicyData
}>({ method: 'GET', path: `/api/orders/pvt/document/${params.orderId}`, query: { 'reason': params.reason } })
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
}): Promise<{
  list?: {
  paymentNames?: string
  orderId?: string
  orderGroup?: string
  sequence?: string
  clientEmail?: string
  clientDocument?: string
  clientCorporateDocument?: string
  clientCorporateName?: string
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
  deliveryChannel?: "delivery" | "pickup-in-point"[]
  productIds?: string[]
  hostname?: string
  creationDate?: string
  invoicedDate?: string
  authorizedDate?: string
  orderIsComplete?: boolean
  marketingTags?: string[]
  invoicesOutput?: string[]
  invoicesInput?: string[]
  workflowInErrorState?: boolean
  workflowInRetry?: boolean
  userProfileId?: string
  lastChange?: string
  isAllDelivered?: boolean
  isAnyDelivered?: boolean
  giftCardProviders?: string[]
  orderFormId?: string
  paymentApprovedDate?: string
  readyForHandlingDate?: string
  deliveryDates?: string[]
  ingestPipelineMetadata?: string[]
  marketplaceWorkflowInstanceId?: string
  fulfillmentWorkflowInstanceId?: string
  callCenterOperatorEmail?: string
  callCenterOperatorName?: string
  productNames?: string[]
}[]
  facets?: string[]
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
  clientCorporateDocument?: string
  clientCorporateName?: string
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
  deliveryChannel?: "delivery" | "pickup-in-point"[]
  productIds?: string[]
  hostname?: string
  creationDate?: string
  invoicedDate?: string
  authorizedDate?: string
  orderIsComplete?: boolean
  marketingTags?: string[]
  invoicesOutput?: string[]
  invoicesInput?: string[]
  workflowInErrorState?: boolean
  workflowInRetry?: boolean
  userProfileId?: string
  lastChange?: string
  isAllDelivered?: boolean
  isAnyDelivered?: boolean
  giftCardProviders?: string[]
  orderFormId?: string
  paymentApprovedDate?: string
  readyForHandlingDate?: string
  deliveryDates?: string[]
  ingestPipelineMetadata?: string[]
  marketplaceWorkflowInstanceId?: string
  fulfillmentWorkflowInstanceId?: string
  callCenterOperatorEmail?: string
  callCenterOperatorName?: string
  productNames?: string[]
}[]
  facets?: string[]
  paging?: {
  total: number
  pages: number
  currentPage: number
  perPage: number
}
  stats?: Stats
  reportRecordsLimit?: number
}>({ method: 'POST', path: `/api/orders/extendsearch/orders`, body: params.body })
  }

  startHandling2(params: {
  orderId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/orders/pvt/document/${params.orderId}/actions/start-handling` })
  }

  cancelOrder2(params: {
  orderId: string
  body: {
  reason?: string
}
}): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>({ method: 'POST', path: `/api/orders/pvt/document/${params.orderId}/cancel`, body: params.body })
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
  invoiceKey?: string
  invoiceUrl?: string
  courier?: string
  trackingNumber?: string
  trackingUrl?: string
  items: {
  itemIndex: number
  price: number
  quantity: number
}[]
  cfop?: string
  volumes?: number
}
}): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>({ method: 'POST', path: `/api/orders/pvt/document/${params.orderId}/invoices`, body: params.body })
  }
}
class OrdersApiPiiDataArchitectureApi_payment {
  constructor(private http: VtexHttpClient) {}

  sendPaymentNotification2(params: {
  orderId: string
  paymentId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/orders/pvt/document/${params.orderId}/payment/${params.paymentId}/notify-payment` })
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
