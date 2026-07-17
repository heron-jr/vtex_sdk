export type TotalsUpdated = {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  name?: string
  value?: number
  alternativeTotals?: {
  id?: string
  name?: string
  value?: number
}[]
}[]

export type ItemsUpdated = {
  uniqueId?: string
  id?: string
  productId?: string
  ean?: string
  lockId?: string
  attachments?: {
  name?: string
  content?: Record<string, unknown>
}[]
  quantity?: number
  seller?: string
  name?: string
  refId?: string
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  priceTags?: {
  name?: string
  value?: number
  isPercentual?: boolean
  identifier?: string
  rawValue?: number
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
  params?: string[]
  offerings?: string[]
  attachmentOfferings?: {
  name?: string
  required?: boolean
  schema?: Record<string, unknown>
}[]
  sellerSku?: string
  priceValidUntil?: string
  commission?: number
  tax?: number
  preSaleDate?: string
  additionalInfo?: {
  brandName?: string
  brandId?: string
  categoriesIds?: string
  categories?: {
  id?: number
  name?: string
}[]
  productClusterId?: string
  commercialConditionId?: string
  dimension?: Dimension
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  measurementUnit?: string
  unitMultiplier?: number
  sellingPrice?: number
  isGift?: boolean
  shippingPrice?: number
  rewardValue?: number
  freightCommission?: number
  priceDefinition?: {
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  calculatedSellingPrice?: number
  total?: number
  reason?: string
}
  taxCode?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  callCenterOperator?: string
  serialNumbers?: string
  assemblies?: string[]
  costPrice?: number
}[]

export type ClientProfileDataUpdated = {
  id?: string
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
  userProfileId?: string
  userProfileVersion?: string
  customerClass?: string
  customerCode?: string
}

export type GiftRegistryDataUpdated = {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
}

export type MarketingDataUpdated = {
  id?: string
  utmSource?: string
  utmPartner?: string
  utmMedium?: string
  utmCampaign?: string
  coupon?: string
  utmiCampaign?: string
  utmipage?: string
  utmiPart?: string
  marketingTags?: string[]
}

export type RatesAndBenefitsDataUpdated = {
  id?: string
  rateAndBenefitsIdentifiers?: {
  description?: string
  featured?: boolean
  id?: string
  name?: string
  matchedParameters?: Record<string, unknown>
  additionalInfo?: Record<string, unknown>
}[]
}

export type ShippingDataUpdated = {
  id?: string
  address?: {
  addressType: "residential" | "pickup"
  receiverName: string
  addressId: string
  versionId?: string
  entityId?: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string
  geoCoordinates: number[]
}
  logisticsInfo?: {
  itemIndex?: number
  itemId?: string
  selectedSla?: string
  lockTTL?: string
  price?: number
  listPrice?: number
  sellingPrice?: number
  deliveryWindow?: string
  deliveryCompany?: string
  shippingEstimate?: string
  shippingEstimateDate?: string
  slas?: {
  id?: string
  name?: string
  shippingEstimate?: string
  shippingEstimateDate?: string
  deliveryWindow?: string
  availableDeliveryWindows?: string[]
  deliveryIds?: {
  courierId?: string
  courierName?: string
  dockId?: string
  quantity?: number
  warehouseId?: string
  accountCarrierName?: string
  kitItemDetails?: string[]
}[]
  listPrice?: number
  price?: number
  selectedDeliveryChannel?: "delivery" | "pickup-in-point"
  pickupStoreInfo?: PickupStoreInfoUpdated
  polygonName?: string
  lockTTL?: string
  pickupPointId?: string
  transitTime?: string
  pickupDistance?: number
}[]
  shipsTo?: string[]
  deliveryIds?: {
  courierId?: string
  courierName?: string
  dockId?: string
  quantity?: number
  warehouseId?: string
  accountCarrierName?: string
  kitItemDetails?: string[]
}[]
  deliveryChannels?: {
  id?: "delivery" | "pickup-in-point"
  stockBalance?: number
}[]
  deliveryChannel?: "delivery" | "pickup-in-point"
  pickupStoreInfo?: PickupStoreInfoUpdated
  addressId?: string
  versionId?: string
  entityId?: string
  polygonName?: string
  pickupPointId?: string
  transitTime?: string
}[]
  trackingHints?: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[]
  selectedAddresses?: {
  addressId?: string
  versionId?: string
  entityId?: string
  addressType?: "residential" | "pickup"
  receiverName?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressId?: string
  versionId?: string
  entityId?: string
  addressType?: "residential" | "pickup"
  receiverName?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  contactInformation?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  document?: string
  phone?: string
  documentType?: string
}[]
}

export type PickupStoreInfoUpdated = {
  isPickupStore: boolean
  friendlyName: string
  address: {
  postalCode?: string
  country?: string
  city?: string
  state?: string
  neighborhood?: string
  street?: string
  number?: string
  complement?: string
  reference?: string
  location?: {
  latitude?: number
  longitude?: number
}
}
  additionalInfo: string
  dockId: string
}

export type PaymentDataUpdated = {
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
  id?: string
  paymentSystem?: string
  paymentSystemName?: string
  value?: number
  installments?: number
  referenceValue?: number
  cardHolder?: string
  cardNumber?: string
  firstDigits?: string
  lastDigits?: string
  cvv2?: string
  expireMonth?: string
  expireYear?: string
  url?: string
  giftCardId?: string
  giftCardName?: string
  giftCardCaption?: string
  redemptionCode?: string
  group?: "creditCard" | "debitCard" | "bankInvoice" | "promissory" | "giftCard" | "instantPayment"
  tid?: string
  dueDate?: string
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
  giftCardProvider?: string
  giftCardAsDiscount?: boolean
  koinUrl?: string
  accountId?: string
  parentAccountId?: string
  bankIssuedInvoiceIdentificationNumber?: string
  bankIssuedInvoiceIdentificationNumberFormatted?: string
  bankIssuedInvoiceBarCodeNumber?: string
  bankIssuedInvoiceBarCodeType?: string
  billingAddress?: {
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
  paymentOrigin?: string
}[]
}[]
}

export type PackageAttachmentUpdated = {
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

export type SellersUpdated = {
  id?: string
  name?: string
  logo?: string
  fulfillmentEndpoint?: string
}[]

export type InvoiceDataUpdated = {
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
  invoiceSubject?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
}
}

export type ChangesAttachmentUpdated = {
  id: string
  changesData: {
  reason: string
  discountValue: number
  incrementValue: number
  itemsAdded: {
  id?: string
  name?: string
  quantity?: number
  price?: number
  unitMultiplier?: string
}[]
  itemsRemoved: {
  id: string
  name: string
  quantity: number
  price: number
  unitMultiplier: string
}[]
  receipt: {
  date: string
  orderId: string
  receipt: string
}
}[]
}

export type CallCenterOperatorDataUpdated = {
  id?: string
  email?: string
  userName?: string
}

export type StorePreferencesDataUpdated = {
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

export type MarketplaceUpdated = {
  baseURL?: string
  isCertified?: boolean
  name?: string
}

export type ItemMetadataUpdated = {
  Items?: {
  Id?: string
  Seller?: string
  Name?: string
  SkuName?: string
  ProductId?: string
  RefId?: string
  Ean?: string
  ImageUrl?: string
  DetailUrl?: string
  AssemblyOptions?: {
  Id?: string
  Name?: string
  Required?: boolean
  InputValues?: Record<string, unknown>
  Composition?: Record<string, unknown>
}[]
}[]
}

export type SubscriptionDataUpdated = {
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

export type TaxDataUpdated = {
  areTaxesDesignatedByMarketplace: boolean
  taxInfoCollection: {
  itemIndex: number
  sku: string
  priceTags: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  value?: number
  rawValue?: number
}[]
}[]
}

export type CancellationDataUpdated = {
  requestedByUser?: boolean
  requestedBySystem?: boolean
  requestedBySellerNotification?: boolean
  requestedByPaymentNotification?: boolean
  reason?: string
  cancellationDate?: string
  cancellationRequestId?: string
}

export type CancellationRequestsUpdated = {
  id?: string
  reason?: string
  cancellationRequestDate?: string
  requestedByUser?: boolean
  deniedBySeller?: boolean
  deniedBySellerReason?: string
  cancellationRequestDenyDate?: string
}[]

export type ClientPreferencesDataUpdated = {
  locale?: string
  optinNewsLetter?: boolean
}

export type Total = {
  id: string
  name: string
  value: number
}

export type Item = {
  uniqueId: string
  id: string
  productId: string
  ean: string
  lockId: string
  itemAttachment: ItemAttachment
  attachments: string[]
  quantity: number
  seller: string
  name: string
  refId: string
  price: number
  listPrice: number
  manualPrice: string
  priceTags: string[]
  imageUrl: string
  detailUrl: string
  components: string[]
  bundleItems: string[]
  params: string[]
  offerings: string[]
  attachmentOfferings: {
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  sellerSku: string
  priceValidUntil: string
  commission: number
  tax: number
  preSaleDate: string
  additionalInfo: AdditionalInfo
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  isGift: boolean
  shippingPrice: string
  rewardValue: number
  freightCommission: number
  priceDefinitions: {
  sellingPrices: {
  value: number
  quantity: number
}[]
  calculatedSellingPrice: number
  total: number
}
  taxCode: string
  parentItemIndex: string
  parentAssemblyBinding: string
  callCenterOperator: string
  serialNumbers: string
  assemblies: string[]
  costPrice: number
}

export type ItemAttachment = {
  content: Record<string, unknown>
  name: string
}

export type AdditionalInfo = {
  brandName: string
  brandId: string
  categoriesIds: string
  productClusterId: string
  commercialConditionId: string
  dimension: Dimension
  offeringInfo: string
  offeringType: string
  offeringTypeId: string
}

export type Dimension = {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}

export type ClientProfileData = {
  id: string
  email: string
  firstName: string
  lastName: string
  documentType: string
  document: string
  phone: string
  corporateName: string
  tradeName: string
  corporateDocument: string
  stateInscription: string
  corporatePhone: string
  isCorporate: boolean
  userProfileId: string
  customerClass: string
}

export type RatesAndBenefitsData = {
  id: string
  rateAndBenefitsIdentifiers: string[]
}

export type ShippingData = {
  id: string
  address: Address
  logisticsInfo: LogisticsInfo[]
  trackingHints: string
  selectedAddresses: SelectedAddress[]
}

export type Address = {
  addressType: string
  receiverName: string
  addressId: string
  versionId: string
  entityId: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string
  geoCoordinates: number[]
}

export type LogisticsInfo = {
  itemIndex: number
  selectedSla: string
  lockTTL: string
  price: number
  listPrice: number
  sellingPrice: number
  deliveryWindow: string
  deliveryCompany: string
  shippingEstimate: string
  shippingEstimateDate: string
  slas: Sla[]
  shipsTo: string[]
  deliveryIds: DeliveryId[]
  deliveryChannels: {
  id: string
  stockBalance: number
}[]
  deliveryChannel: string
  pickupStoreInfo: PickupStoreInfo
  addressId: string
  versionId: string
  entityId: string
  polygonName: string
  pickupPointId: string
  transitTime: string
}

export type Sla = {
  id: string
  name: string
  shippingEstimate: string
  deliveryWindow: string
  price: number
  deliveryChannel: string
  pickupStoreInfo: PickupStoreInfo
  polygonName: string
  lockTTL: string
  pickupPointId: string
  transitTime: string
  pickupDistance: number
}

export type PickupStoreInfo = {
  additionalInfo: string
  address: string
  dockId: string
  friendlyName: string
  isPickupStore: boolean
}

export type DeliveryId = {
  courierId: string
  courierName: string
  dockId: string
  quantity: number
  warehouseId: string
  accountCarrierName: string
  kitItemDetails: string[]
}

export type SelectedAddress = {
  addressId: string
  versionId: string
  entityId: string
  addressType: string
  receiverName: string
  street: string
  number: string
  complement: string
  neighborhood: string
  postalCode: string
  city: string
  state: string
  country: string
  reference: string
  geoCoordinates: number[]
}

export type PaymentData = {
  giftCards?: string[]
  transactions: Transaction[]
}

export type Transaction = {
  isActive: boolean
  transactionId: string
  merchantName: string
  payments: Payment[]
}

export type Payment = {
  id: string
  paymentSystem: string
  paymentSystemName: string
  value: number
  installments: number
  referenceValue: number
  cardHolder: string
  cardNumber: string
  firstDigits: string
  lastDigits: string
  cvv2: string
  expireMonth: string
  expireYear: string
  url: string
  giftCardId: string
  giftCardName: string
  giftCardCaption: string
  redemptionCode: string
  group: string
  tid: string
  dueDate: string
  connectorResponses: {
  Tid: string
  ReturnCode: string
  Message: string
  authId: string
}
  giftCardProvider: string
  giftCardAsDiscount: boolean
  koinUrl: string
  accountId: string
  parentAccountId: string
  bankIssuedInvoiceIdentificationNumber: string
  bankIssuedInvoiceIdentificationNumberFormatted: string
  bankIssuedInvoiceBarCodeNumber: string
  bankIssuedInvoiceBarCodeType: string
  billingAddress: Record<string, unknown>
}

export type PackageAttachment = {
  packages: string[]
}

export type Seller = {
  id: string
  name: string
  logo: string
  fulfillmentEndpoint: string
}

export type ChangesAttachment = {
  id: string
  changesData: ChangesDatum[]
}

export type ChangesDatum = {
  reason: string
  discountValue: number
  incrementValue: number
  itemsAdded: string[]
  itemsRemoved: ItemsRemoved[]
  receipt: Receipt
}

export type ItemsRemoved = {
  id: string
  name: string
  quantity: number
  price: number
  unitMultiplier: string
}

export type Receipt = {
  date: string
  orderId: string
  receipt: string
}

export type StorePreferencesData = {
  countryCode: string
  currencyCode: string
  currencyFormatInfo: CurrencyFormatInfo
  currencyLocale: number
  currencySymbol: string
  timeZone: string
}

export type CurrencyFormatInfo = {
  CurrencyDecimalDigits: number
  CurrencyDecimalSeparator: string
  CurrencyGroupSeparator: string
  CurrencyGroupSize: number
  StartsWithCurrencySymbol: boolean
}

export type Marketplace = {
  baseURL: string
  isCertified: string
  name: string
}

export type ListOrders = {
  list: List[]
  facets: string[]
  paging: Paging
  stats: Stats
}

export type List = {
  orderId: string
  creationDate: string
  clientName: string
  items: string
  totalValue: number
  paymentNames: string
  status: string
  statusDescription: string
  marketPlaceOrderId: string
  sequence: string
  salesChannel: string
  affiliateId: string
  origin: string
  workflowInErrorState: boolean
  workflowInRetry: boolean
  lastMessageUnread: string
  ShippingEstimatedDate: string
  ShippingEstimatedDateMax: string
  ShippingEstimatedDateMin: string
  orderIsComplete: boolean
  listId: string
  listType: string
  authorizedDate: string
  callCenterOperatorName: string
  totalItems: number
  currencyCode: string
}

export type Paging = {
  total: number
  pages: number
  currentPage: number
  perPage: number
}

export type Stats = {
  stats: Stats1
}

export type Stats1 = {
  totalValue: TotalValue
  totalItems: TotalItems
}

export type TotalValue = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: Facets
}

export type Facets = {
  origin: Origin
  currencyCode: CurrencyCode
}

export type Origin = {
  Fulfillment: Fulfillment
  Marketplace: Marketplace1
}

export type Fulfillment = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: string
}

export type Marketplace1 = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: string
}

export type CurrencyCode = {
  BRL: BRL
}

export type BRL = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: string
}

export type TotalItems = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: Facets1
}

export type Facets1 = {
  origin: Origin1
  currencyCode: CurrencyCode1
}

export type Origin1 = {
  Fulfillment: Fulfillment1
  Marketplace: Marketplace2
}

export type Fulfillment1 = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: string
}

export type Marketplace2 = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: string
}

export type CurrencyCode1 = {
  BRL: BRL1
}

export type BRL1 = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: string
}

export type UpdatepartialinvoiceSendTrackingNumberRequest = {
  trackingNumber: string
  trackingUrl: string
  dispatchedDate: string
  courier: string
}

export type UpdatepartialinvoiceSendTrackingNumber = {
  date: string
  orderId: string
  receipt: string
}

export type UpdateTrackingStatusRequest = {
  isDelivered: boolean
  deliveredDate: string
  events: Event[]
}

export type Event = {
  city: string
  state: string
  description: string
  date: string
}

export type UpdateTrackingStatus = {
  date: string
  orderId: string
  receipt: string
}

export type GetConversation = {
  id: string
  from: From
  to: To[]
  subject: string
  firstWords: string
  body: string
  hasAttachment: boolean
  attachmentNames: string[]
  date: string
}

export type From = {
  conversationRelatedTo: string
  conversationSubject: string
  emailAlias: string
  aliasMaskType: number
  email: string
  name: string
  role: string
}

export type To = {
  conversationRelatedTo: string
  conversationSubject: string
  emailAlias: string
  aliasMaskType: number
  email: string
  name: string
  role: string
}

export type GetPaymenttransaction = {
  status: string
  isActive: boolean
  transactionId: string
  merchantName: string
  payments: Payment1[]
}

export type Payment1 = {
  id: string
  paymentSystem: string
  paymentSystemName: string
  value: number
  installments: number
  referenceValue: number
  cardHolder: string
  cardNumber: string
  firstDigits: string
  lastDigits: string
  cvv2: string
  expireMonth: string
  expireYear: string
  url: string
  giftCardId: string
  giftCardName: string
  giftCardCaption: string
  redemptionCode: string
  group: string
  tid: string
  dueDate: string
  connectorResponses: ConnectorResponses
}

export type ConnectorResponses = {
  Tid: string
  ReturnCode: string
  Message: string
  authId: string
}

export type ConfirmitemfeedorderstatusRequest = {
  commitToken: string
}

export type Getfeedorderstatus = {
  eventId: string
  handle: string
  domain: string
  state: string
  lastState: string
  orderId: string
  lastChange: string
  currentChange: string
}

export type HookFilter = {
  type: string
  status?: string[]
  expression?: string
  disableSingleFire?: boolean
}

export type HookConfigurationRequest = {
  filter: HookFilter
  hook: Hook
}

export type Hook = {
  url: string
  headers: Headers
}

export type Headers = {
  key: string
}

export type HookConfiguration = {
  Domain: string
  OrderId: string
  State: string
  LastState: string
  LastChange: string
  CurrentChange: string
  Origin: Origin2
}

export type Origin2 = {
  Account: string
  Key: string
}

export type Userorderslist = {
  list: List1[]
  facets: string[]
  paging: Paging
  stats: Stats2
}

export type List1 = {
  orderId: string
  creationDate: string
  clientName: string
  items: Item2[]
  totalValue: number
  paymentNames: string
  status: string
  statusDescription: string
  marketPlaceOrderId: string
  sequence: string
  salesChannel: string
  affiliateId: string
  origin: string
  workflowInErrorState: boolean
  workflowInRetry: boolean
  lastMessageUnread: string
  ShippingEstimatedDate: string
  ShippingEstimatedDateMax: string
  ShippingEstimatedDateMin: string
  orderIsComplete: boolean
  listId: string
  listType: string
  authorizedDate: string
  callCenterOperatorName: string
  totalItems: number
  currencyCode: string
}

export type Item2 = {
  seller: string
  quantity: number
  description: string
  ean: string
  refId: string
  id: string
  productId: string
  sellingPrice: number
  price: number
}

export type Stats2 = {
  stats: Stats3
}

export type Stats3 = {
  totalValue: TotalValue1
  totalItems: TotalItems1
}

export type TotalValue1 = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: Record<string, unknown>
}

export type TotalItems1 = {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: Record<string, unknown>
}

export type Userorderdetails = {
  orderId: string
  sequence: string
  marketplaceOrderId: string
  marketplaceServicesEndpoint: string
  sellerOrderId: string
  origin: string
  affiliateId: string
  salesChannel: string
  merchantName: string
  status: string
  statusDescription: string
  value: number
  creationDate: string
  lastChange: string
  orderGroup: string
  totals: Total[]
  items: Item[]
  marketplaceItems: string[]
  clientProfileData: ClientProfileData
  giftRegistryData: string
  marketingData: {
  id: string
  utmSource: string
  utmPartner: string
  utmMedium: string
  utmCampaign: string
  coupon: string
  utmiCampaign: string
  utmipage: string
  utmiPart: string
  marketingTags: string[]
}
  ratesAndBenefitsData: RatesAndBenefitsData
  shippingData: ShippingData
  paymentData: PaymentData
  packageAttachment: PackageAttachment
  sellers: Seller[]
  callCenterOperatorData: string
  followUpEmail: string
  lastMessage: string
  hostname: string
  invoiceData: Record<string, unknown>
  changesAttachment: ChangesAttachment
  openTextField: string
  roundingError: number
  orderFormId: string
  commercialConditionData: string
  isCompleted: boolean
  customData: string
  storePreferencesData: StorePreferencesData
  allowCancellation: boolean
  allowEdition: boolean
  isCheckedIn: boolean
  marketplace: Marketplace
  authorizedDate: string
  invoicedDate: string
  cancelReason: string
  itemMetadata: {
  Items: {
  Id: string
  Seller: string
  Name: string
  SkuName: string
  ProductId: string
  RefId: string
  Ean: string
  ImageUrl: string
  DetailUrl: string
  AssemblyOptions: {
  Id: string
  Name: string
  Required: boolean
  InputValues: Record<string, unknown>
  Composition: Record<string, unknown>
}[]
}[]
}
  subscriptionData: {
  SubscriptionGroupId: string
  Subscriptions: {
  ExecutionCount: number
  PriceAtSubscriptionDate: number
  ItemIndex: number
  Plan: {
  type: string
  frequency: {
  periodicity: string
  interval: number
}
  validity: {
  begin: string
  end: string
}
}
}[]
}
  taxData: {
  areTaxesDesignatedByMarketplace: boolean
  taxInfoCollection: {
  itemIndex: number
  sku: string
  priceTags: {
  isPercentual: boolean
  name: string
  rawValue: string
}[]
}[]
}
  checkedInPickupPointId: string
  cancellationData: {
  RequestedByUser: boolean
  RequestedBySystem: boolean
  RequestedBySellerNotification: boolean
  RequestedByPaymentNotification: boolean
  Reason: string
  CancellationDate: string
}
  clientPreferencesData: {
  locale: string
  optinNewsLetter: boolean
}
}

export type Createchange = {
  reason: string
  replace?: Replace[]
}

export type Replace = {
  from: {
  items: {
  id: string
  uniqueId?: string
  quantity: number
  price?: number
}[]
  customData?: {
  customFields?: {
  linkedEntity?: {
  type?: string
  id?: string
}
  fields?: {
  name?: string
  value?: string
}[]
}[]
}
}
  to: {
  items: {
  id: string
  uniqueId?: string
  quantity: number
  measurementUnit?: string
  unitMultiplier?: number
  manualDiscountValue?: number
  manualIncrementValue?: number
  clientProfileData?: {
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
}[]
}[]
  customData?: {
  customFields?: {
  linkedEntity?: {
  type?: string
  id?: string
}
  fields?: {
  name?: string
  value?: string
}[]
}[]
}
  shippingData?: {
  logisticsInfo: {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: "delivery" | "pickup-in-point"
  addressId: string
  price: number
}[]
}
}
}

export type Response202 = {
  requestId: string
  workflowId: string
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: string[]
  add: string[]
  remove: string[]
  replace: Replace1[]
  date: string
  origin: OriginV2
  settings: Settings
}

export type Replace1 = {
  from: {
  paymentData: PaymentDataV2
  items: {
  id: string
  quantity: number
  price: number
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  name: string
  detailUrl: string
  imageUrl: string
}[]
  shippingData: ShippingData1
}
  to: {
  items: Item3[]
  paymentData: PaymentDataV2
  receiptData: Record<string, unknown>
  shippingData: {
  logisticsInfo: LogisticsInfo1[]
}
  clientProfileData?: {
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
}[]
}
}

export type PaymentDataV2 = {
  transactions: string[]
}

export type ShippingData1 = {
  logisticsInfo: string[]
}

export type Item3 = {
  uniqueId: string
  id: string
  productId: string
  productRefId: string
  refId: string
  ean: string
  name: string
  skuName: string
  modalType: string
  parentItemIndex: number
  parentAssemblyBinding: string
  assemblies: string[]
  priceValidUntil: string
  tax: number
  price: number
  listPrice: number
  manualPrice: number
  manualPriceAppliedBy: string
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfoV2
  preSaleDate: string
  productCategoryIds: string
  productCategories: Record<string, unknown>
  quantity: number
  seller: string
  sellerChain: string[]
  imageUrl: string
  detailUrl: string
  components: string[]
  bundleItems: string[]
  attachments: string[]
  attachmentOfferings: string[]
  offerings: string[]
  priceTags: string[]
  availability: string
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode: string
  priceDefinition: string
}

export type AdditionalInfoV2 = {
  dimension: string
  brandName: string
  brandId: string
  offeringInfo: string
  offeringType: string
  offeringTypeId: string
  categoriesIds: string
  productClusterId: string
  commercialConditionId: string
}

export type LogisticsInfo1 = {
  itemIndex: number
  selectedSla: string
  addressId: string
  slas: SlaV2[]
  shipsTo: string[]
  itemId: string
  deliveryChannels: DeliveryChannel[]
  price: number
  listPrice: number
  shippingEstimate: string
  dockEstimate: string
  shippingEstimateDate: string
  lockTTL: string
  deliveryCompany: string
  polygonName: string
  transitTime: string
  sellingPrice: number
  deliveryIds: DeliveryIdV2[]
  deliveryWindow: string
  pickupPointId: string
  pickupStoreInfo: PickupStoreInfoV2
  pickupDistance: number
}

export type SlaV2 = {
  id: string
  deliveryChannel: string
  name: string
  deliveryIds: DeliveryIdV2[]
  shippingEstimate: string
  shippingEstimateDate: string
  lockTTL: string
  availableDeliveryWindows: string[]
  deliveryWindow: {
  startDateUtc?: string
  endDateUtc?: string
}
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: PickupStoreInfoV2
  pickupPointId: string
  pickupDistance: number
  polygonName: string
  transitTime: string
}

export type PickupStoreInfoV2 = {
  isPickupStore: boolean
  friendlyName: string
  address: string
  additionalInfo: string
  dockId: string
}

export type OriginV2 = {
  account: string
  orderId: string
  component: string
}

export type Settings = {
  customPaymentSystemsAllowed: string[]
}

export type From2 = {
  paymentData: PaymentDataV2
  items: Item4[]
  shippingData: ShippingData3
}

export type Item4 = {
  id: string
  quantity: number
  price: string
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  name: string
  detailUrl: string
  imageUrl: string
}

export type ShippingData3 = {
  logisticsInfo: LogisticsInfo2[]
}

export type LogisticsInfo2 = {
  itemIndex: number
  selectedSla: string
  addressId: string
  slas: SlaV2[]
  shipsTo: string[]
  itemId: string
  deliveryChannels: DeliveryChannel[]
  price: number
  listPrice: number
  shippingEstimate: string
  dockEstimate: string
  shippingEstimateDate: string
  lockTTL: string
  deliveryCompany: string
  polygonName: string
  transitTime: string
  sellingPrice: number
  deliveryIds: DeliveryIdV2[]
  deliveryWindow: string
  pickupPointId: string
  pickupStoreInfo: PickupStoreInfoV2
  pickupDistance: number
}

export type DeliveryIdV2 = {
  courierId: string
  warehouseId: string
  dockId: string
  courierName: string
  quantity: number
  kitItemDetails: string[]
  accountCarrierName: string
}

export type DeliveryChannel = {
  id: string
}

export type To2 = {
  items: Item3[]
  paymentData: PaymentDataV2
  receiptData: Record<string, unknown>
  shippingData: ShippingData3
}

export type PriceDefinition = {
  calculatedSellingPrice: number
  total: number
  sellingPrices: {
  value: number
  quantity: number
}[]
}

export type ChangeOrderSettingsResponse = {
  paymentConfiguration?: {
  customPaymentSystemsAllowed?: string[]
}
  rolloutConfiguration?: {
  usingDefaultBehavior?: boolean
  enableApi?: boolean
  enableAdminOrders?: {
  enabledWorkspaces?: string[]
}
  enableMyOrders?: {
  enabledWorkspaces?: string[]
}
}
  pipelineConfiguration?: {
  enableTaxHubRecalculation?: boolean
  compensateShippingChanges?: boolean
}
}

export type AuthorizationPolicyData = {
  status?: "accepted" | "denied" | "pending"
  deniedPolicies?: {
  policyId?: string
  policyName?: string
  requireAllPoliciesAcceptance?: boolean
  policyGroupId?: string
  policyGroupName?: string
  policyGroupUnitId?: string
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: {
  id?: string
  type?: "User" | "Unit"
  authorizationDate?: string
}[]
}[]
}[]
  pendingPolicies?: {
  policyId?: string
  policyName?: string
  requireAllPoliciesAcceptance?: boolean
  policyGroupId?: string
  policyGroupName?: string
  policyGroupUnitId?: string
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: {
  id?: string
  type?: "User" | "Unit"
  authorizationDate?: string
}[]
}[]
}[]
}[]

export type ChangeSummary = {
  original?: {
  totalQuantity?: number
  quantity?: number
  deliveryIds?: DeliveryIdResponse[]
  itemIndex?: number
  uniqueId?: string
  id?: string
  productId?: string
  lockId?: string
  ean?: string
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
  offeringInfo?: Record<string, unknown>
  offeringType?: string
  offeringTypeId?: string
  categories?: {
  id?: number
  name?: string
}[]
}
  attachments?: string[]
  attachmentOfferings?: {
  name?: string
  required?: boolean
}[]
  assemblies?: string[]
  refId?: string
  shippingPrice?: number
  price?: number
  sellingPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  tax?: number
  customTax?: number
  rewardValue?: number
  freightCommission?: number
  commission?: number
  priceTags?: Record<string, unknown>[]
  imageUrl?: string
  detailUrl?: string
  components?: string[]
  bundleItems?: {
  id?: number
  quantity?: number
}[]
  offerings?: string[]
  preSaleDate?: string
  isGift?: boolean
  taxCode?: string
  measurementUnit?: string
  unitMultiplier?: number
  marketingData?: {
  id?: string
  utmSource?: string
  utmPartner?: string
  utmMedium?: string
  utmCampaign?: string
  coupon?: string
  utmiCampaign?: string
  utmipage?: string
  utmiPart?: string
  marketingTags?: string
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
  added?: {
  id?: string
  uniqueId?: string
  totalQuantity?: number
  quantity?: number
  price?: number
  measurementUnit?: string
  unitMultiplier?: number
  imageUrl?: string
  sellingPrice?: number
  priceTags?: string[]
  detailUrl?: string
  name?: string
  refId?: string
  deliveryIds?: DeliveryIdResponse[]
}[]
  removed?: {
  id?: string
  uniqueId?: string
  quantity?: number
  price?: number
  measurementUnit?: string
  unitMultiplier?: number
  imageUrl?: string
  sellingPrice?: number
  priceTags?: string[]
  detailUrl?: string
  name?: string
  refId?: string
  deliveryIds?: DeliveryIdResponse[]
}[]
  replaced?: {
  replaceType?: "ItemReplacement" | "WeightChange" | "PriceChange" | "QuantityChange"
  userInputType?: "ItemReplacement" | "WeightChange" | "PriceChange" | "QuantityChange"
  from?: {
  items?: {
  id?: string
  uniqueId?: string
  quantity?: number
  price?: number
  measurementUnit?: string
  unitMultiplier?: number
  imageUrl?: string
  sellingPrice?: number
  priceTags?: string[]
  detailUrl?: string
  name?: string
  refId?: string
  deliveryIds?: DeliveryIdResponse[]
}[]
  shippingData?: {
  logisticsInfo?: LogisticsInfo1[]
}
}
  to?: {
  items?: {
  id?: string
  uniqueId?: string
  quantity?: number
  price?: number
  measurementUnit?: string
  unitMultiplier?: number
  imageUrl?: string
  sellingPrice?: number
  priceTags?: string[]
  detailUrl?: string
  name?: string
  refId?: string
  deliveryIds?: DeliveryIdResponse[]
}[]
  shippingData?: {
  logisticsInfo?: LogisticsInfo1[]
}
}
  type?: "UserInput" | "System"
}[]
  manualDiscountValueAggregated?: number
  manualIncrementValueAggregated?: number
  totalChangeValueAggregated?: number
  totals?: unknown
  lastChange?: string
}

export type DeliveryIdResponse = {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
  totalListPrice?: number
  accountCarrierName?: string
  kitItemDetails?: string[]
}
