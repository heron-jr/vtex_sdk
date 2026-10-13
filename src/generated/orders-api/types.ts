export type TotalsUpdated = {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  name?: string
  value?: number
  alternativeTotals?: {
  id?: string
  name?: string
  value?: number
}[] | null
}[]

export type ItemsUpdated = {
  uniqueId?: string
  id?: string
  productId?: string
  ean?: string | null
  lockId?: string | null
  attachments?: {
  name?: string | null
  content?: {
  [key: string]: string | null
} | null
}[] | null
  quantity?: number
  seller?: string
  name?: string
  refId?: string
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  priceTags?: {
  name?: string
  value?: number | null
  isPercentual?: boolean
  identifier?: string
  rawValue?: number
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
  params?: string[]
  offerings?: (string | null)[] | null
  attachmentOfferings?: ({
  name?: string | null
  required?: boolean | null
  schema?: {
  [key: string]: string | null
} | null
} | null)[] | null
  sellerSku?: string
  priceValidUntil?: string | null
  commission?: number
  tax?: number
  preSaleDate?: string | null
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
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  measurementUnit?: string
  unitMultiplier?: number
  sellingPrice?: number
  isGift?: boolean
  shippingPrice?: number | null
  rewardValue?: number
  freightCommission?: number
  priceDefinition?: {
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  calculatedSellingPrice?: number
  total?: number
  reason?: string | null
}
  taxCode?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  callCenterOperator?: string | null
  serialNumbers?: string | null
  assemblies?: (string | null)[] | null
  costPrice?: number | null
}[]

export type ClientProfileDataUpdated = {
  id?: string
  email?: string
  firstName?: string
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
  userProfileId?: string
  userProfileVersion?: string | null
  customerClass?: string | null
  customerCode?: string | null
}

export type GiftRegistryDataUpdated = {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
} | null

export type MarketingDataUpdated = {
  id?: string
  utmSource?: string | null
  utmPartner?: string | null
  utmMedium?: string
  utmCampaign?: string | null
  coupon?: string | null
  utmiCampaign?: string | null
  utmipage?: string | null
  utmiPart?: string | null
  marketingTags?: string[]
} | null

export type RatesAndBenefitsDataUpdated = {
  id?: string
  rateAndBenefitsIdentifiers?: {
  description?: string | null
  featured?: boolean
  id?: string
  name?: string
  matchedParameters?: {
  [key: string]: string
}
  additionalInfo?: {
  [key: string]: string
} | null
}[]
}

export type ShippingDataUpdated = {
  id?: string
  address?: {
  addressType: "residential" | "pickup"
  receiverName: string
  addressId: string
  versionId?: string | null
  entityId?: string | null
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string | null
  reference: string | null
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
  deliveryWindow?: string | null
  deliveryCompany?: string
  shippingEstimate?: string
  shippingEstimateDate?: string
  slas?: {
  id?: string
  name?: string
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  deliveryWindow?: string | null
  availableDeliveryWindows?: string[] | null
  deliveryIds?: {
  courierId?: string
  courierName?: string
  dockId?: string
  quantity?: number
  warehouseId?: string
  accountCarrierName?: string
  kitItemDetails?: string[] | null
}[]
  listPrice?: number
  price?: number
  selectedDeliveryChannel?: "delivery" | "pickup-in-point"
  pickupStoreInfo?: PickupStoreInfoUpdated
  polygonName?: string | null
  lockTTL?: string
  pickupPointId?: string | null
  transitTime?: string
  pickupDistance?: number | null
}[]
  shipsTo?: string[]
  deliveryIds?: {
  courierId?: string
  courierName?: string
  dockId?: string
  quantity?: number
  warehouseId?: string
  accountCarrierName?: string
  kitItemDetails?: string[] | null
}[]
  deliveryChannels?: {
  id?: "delivery" | "pickup-in-point"
  stockBalance?: number
}[]
  deliveryChannel?: "delivery" | "pickup-in-point"
  pickupStoreInfo?: PickupStoreInfoUpdated
  addressId?: string | null
  versionId?: string | null
  entityId?: string | null
  polygonName?: string | null
  pickupPointId?: string | null
  transitTime?: string
}[]
  trackingHints?: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[] | null
  selectedAddresses?: {
  addressId?: string
  versionId?: string | null
  entityId?: string | null
  addressType?: "residential" | "pickup"
  receiverName?: string
  street?: string
  number?: string
  complement?: string | null
  neighborhood?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressId?: string
  versionId?: string | null
  entityId?: string | null
  addressType?: "residential" | "pickup"
  receiverName?: string
  street?: string
  number?: string
  complement?: string | null
  neighborhood?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  reference?: string | null
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
}[] | null
}

export type PickupStoreInfoUpdated = {
  isPickupStore: boolean
  friendlyName: string | null
  address: {
  postalCode?: string
  country?: string
  city?: string
  state?: string
  neighborhood?: string
  street?: string
  number?: string
  complement?: string
  reference?: string | null
  location?: {
  latitude?: number
  longitude?: number
}
} | null
  additionalInfo: string | null
  dockId: string | null
}

export type PaymentDataUpdated = {
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
  id?: string
  paymentSystem?: string
  paymentSystemName?: string
  value?: number
  installments?: number
  referenceValue?: number
  cardHolder?: string | null
  cardNumber?: string | null
  firstDigits?: string | null
  lastDigits?: string | null
  cvv2?: string | null
  expireMonth?: string | null
  expireYear?: string | null
  url?: string | null
  giftCardId?: string | null
  giftCardName?: string | null
  giftCardCaption?: string | null
  redemptionCode?: string | null
  group?: "creditCard" | "debitCard" | "bankInvoice" | "promissory" | "giftCard" | "instantPayment"
  tid?: string
  dueDate?: string | null
  connectorResponses?: {
  Message?: string | null
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
  giftCardProvider?: string | null
  giftCardAsDiscount?: boolean | null
  koinUrl?: string | null
  accountId?: string | null
  parentAccountId?: string | null
  bankIssuedInvoiceIdentificationNumber?: string | null
  bankIssuedInvoiceIdentificationNumberFormatted?: string | null
  bankIssuedInvoiceBarCodeNumber?: string | null
  bankIssuedInvoiceBarCodeType?: string | null
  billingAddress?: {
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
  paymentOrigin?: string | null
}[]
}[]
}

export type PackageAttachmentUpdated = {
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

export type SellersUpdated = {
  id?: string
  name?: string
  logo?: string | null
  fulfillmentEndpoint?: string
}[]

export type InvoiceDataUpdated = {
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
  invoiceSubject?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
} | null
} | null

export type ChangesAttachmentUpdated = {
  id: string
  changesData: {
  reason: string
  discountValue: number | null
  incrementValue: number | null
  itemsAdded: {
  id?: string
  name?: string
  quantity?: number
  price?: number
  unitMultiplier?: string | null
}[] | null
  itemsRemoved: {
  id: string
  name: string
  quantity: number
  price: number
  unitMultiplier: string | null
}[] | null
  receipt: {
  date: string
  orderId: string
  receipt: string
}
}[]
} | null

export type CallCenterOperatorDataUpdated = {
  id?: string
  email?: string
  userName?: string
} | null

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
  isCertified?: boolean | null
  name?: string
} | null

export type ItemMetadataUpdated = {
  Items?: {
  Id?: string
  Seller?: string
  Name?: string
  SkuName?: string
  ProductId?: string
  RefId?: string
  Ean?: string | null
  ImageUrl?: string
  DetailUrl?: string
  AssemblyOptions?: {
  Id?: string
  Name?: string
  Required?: boolean
  InputValues?: {
  [key: string]: string | null
} | null
  Composition?: {
  [key: string]: string
} | null
}[] | null
}[]
}

export type SubscriptionDataUpdated = {
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
}[] | null
}[]
} | null

export type CancellationDataUpdated = {
  requestedByUser?: boolean
  requestedBySystem?: boolean | null
  requestedBySellerNotification?: boolean | null
  requestedByPaymentNotification?: boolean | null
  reason?: string
  cancellationDate?: string
  cancellationRequestId?: string
} | null

export type CancellationRequestsUpdated = {
  id?: string
  reason?: string
  cancellationRequestDate?: string
  requestedByUser?: boolean
  deniedBySeller?: boolean
  deniedBySellerReason?: string | null
  cancellationRequestDenyDate?: string | null
}[] | null

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
  ean: string | null
  lockId: string
  itemAttachment: ItemAttachment
  attachments: string[]
  quantity: number
  seller: string
  name: string
  refId: string
  price: number
  listPrice: number
  manualPrice: string | null
  priceTags: string[]
  imageUrl: string
  detailUrl: string
  components: string[]
  bundleItems: string[]
  params: string[]
  offerings: string[]
  attachmentOfferings: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  sellerSku: string
  priceValidUntil: string | null
  commission: number
  tax: number
  preSaleDate: string | null
  additionalInfo: AdditionalInfo
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  isGift: boolean
  shippingPrice: string | null
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
  taxCode: string | null
  parentItemIndex: string | null
  parentAssemblyBinding: string | null
  callCenterOperator: string | null
  serialNumbers: string | null
  assemblies: string[] | null
  costPrice: number
}

export type ItemAttachment = {
  content: Record<string, unknown>
  name: string | null
}

export type AdditionalInfo = {
  brandName: string
  brandId: string
  categoriesIds: string
  productClusterId: string
  commercialConditionId: string
  dimension: Dimension
  offeringInfo: string | null
  offeringType: string | null
  offeringTypeId: string | null
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
  corporateName: string | null
  tradeName: string | null
  corporateDocument: string | null
  stateInscription: string | null
  corporatePhone: string | null
  isCorporate: boolean
  userProfileId: string
  customerClass: string | null
}

export type RatesAndBenefitsData = {
  id: string
  rateAndBenefitsIdentifiers: string[]
}

export type ShippingData = {
  id: string
  address: Address
  logisticsInfo: LogisticsInfo[]
  trackingHints: string | null
  selectedAddresses: SelectedAddress[]
}

export type Address = {
  addressType: string
  receiverName: string
  addressId: string
  versionId: string | null
  entityId: string | null
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string | null
  geoCoordinates: number[]
}

export type LogisticsInfo = {
  itemIndex: number
  selectedSla: string
  lockTTL: string
  price: number
  listPrice: number
  sellingPrice: number
  deliveryWindow: string | null
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
  versionId: string | null
  entityId: string
  polygonName: string | null
  pickupPointId: string
  transitTime: string
}

export type Sla = {
  id: string
  name: string
  shippingEstimate: string
  deliveryWindow: string | null
  price: number
  deliveryChannel: string
  pickupStoreInfo: PickupStoreInfo
  polygonName: string | null
  lockTTL: string
  pickupPointId: string
  transitTime: string
  pickupDistance: number
}

export type PickupStoreInfo = {
  additionalInfo: string | null
  address: string | null
  dockId: string | null
  friendlyName: string | null
  isPickupStore: boolean
}

export type DeliveryId = {
  courierId: string
  courierName: string
  dockId: string
  quantity: number
  warehouseId: string
  accountCarrierName: string
  kitItemDetails: string[] | null
}

export type SelectedAddress = {
  addressId: string
  versionId: string | null
  entityId: string | null
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
  reference: string | null
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
  cardHolder: string | null
  cardNumber: string | null
  firstDigits: string | null
  lastDigits: string | null
  cvv2: string | null
  expireMonth: string | null
  expireYear: string | null
  url: string
  giftCardId: string | null
  giftCardName: string | null
  giftCardCaption: string | null
  redemptionCode: string | null
  group: string
  tid: string | null
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
  unitMultiplier: string | null
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
  isCertified: string | null
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
  items: string | null
  totalValue: number
  paymentNames: string
  status: string
  statusDescription: string
  marketPlaceOrderId: string | null
  sequence: string
  salesChannel: string
  affiliateId: string
  origin: string
  workflowInErrorState: boolean
  workflowInRetry: boolean
  lastMessageUnread: string | null
  ShippingEstimatedDate: string | null
  ShippingEstimatedDateMax: string | null
  ShippingEstimatedDateMin: string | null
  orderIsComplete: boolean
  listId: string | null
  listType: string | null
  authorizedDate: string | null
  callCenterOperatorName: string | null
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
  Facets: string | null
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
  Facets: string | null
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
  Facets: string | null
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
  Facets: string | null
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
  Facets: string | null
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
  Facets: string | null
}

export type UpdatepartialinvoiceSendTrackingNumberRequest = {
  trackingNumber: string
  trackingUrl: string | null
  dispatchedDate: string | null
  courier: string | null
}

export type UpdatepartialinvoiceSendTrackingNumber = {
  date: string
  orderId: string
  receipt: string
}

export type UpdateTrackingStatusRequest = {
  isDelivered: boolean
  deliveredDate: string | null
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
  role: string | null
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
  cardHolder: string | null
  cardNumber: string | null
  firstDigits: string
  lastDigits: string
  cvv2: string | null
  expireMonth: string | null
  expireYear: string | null
  url: string | null
  giftCardId: string | null
  giftCardName: string | null
  giftCardCaption: string | null
  redemptionCode: string | null
  group: string
  tid: string
  dueDate: string | null
  connectorResponses: ConnectorResponses
}

export type ConnectorResponses = {
  Tid: string
  ReturnCode: string | null
  Message: string | null
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
  [key: string]: string
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
  items: Item2[] | null
  totalValue: number
  paymentNames: string | null
  status: string
  statusDescription: string
  marketPlaceOrderId: string | null
  sequence: string
  salesChannel: string
  affiliateId: string
  origin: string
  workflowInErrorState: boolean
  workflowInRetry: boolean
  lastMessageUnread: string | null
  ShippingEstimatedDate: string | null
  ShippingEstimatedDateMax: string | null
  ShippingEstimatedDateMin: string | null
  orderIsComplete: boolean
  listId: string | null
  listType: string | null
  authorizedDate: string | null
  callCenterOperatorName: string | null
  totalItems: number
  currencyCode: string | null
}

export type Item2 = {
  seller: string
  quantity: number
  description: string
  ean: string | null
  refId: string | null
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
  giftRegistryData: string | null
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
  callCenterOperatorData: string | null
  followUpEmail: string
  lastMessage: string | null
  hostname: string
  invoiceData: Record<string, unknown> | null
  changesAttachment: ChangesAttachment
  openTextField: string | null
  roundingError: number
  orderFormId: string
  commercialConditionData: string | null
  isCompleted: boolean
  customData: string | null
  storePreferencesData: StorePreferencesData
  allowCancellation: boolean
  allowEdition: boolean
  isCheckedIn: boolean
  marketplace: Marketplace
  authorizedDate: string
  invoicedDate: string | null
  cancelReason: string | null
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
  InputValues: Record<string, unknown> | null
  Composition: Record<string, unknown> | null
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
}[] | null
} | null
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
  add: string[] | null
  remove: string[] | null
  replace: Replace1[] | null
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
  price: number | null
  measurementUnit: string | null
  unitMultiplier: number
  sellingPrice: number | null
  name: string | null
  detailUrl: string | null
  imageUrl: string | null
}[]
  shippingData: ShippingData1
}
  to: {
  items: Item3[]
  paymentData: PaymentDataV2
  receiptData: Record<string, unknown> | null
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
  productId: string | null
  productRefId: string | null
  refId: string | null
  ean: string | null
  name: string | null
  skuName: string | null
  modalType: string | null
  parentItemIndex: number | null
  parentAssemblyBinding: string | null
  assemblies: string[] | null
  priceValidUntil: string | null
  tax: number
  price: number | null
  listPrice: number | null
  manualPrice: number | null
  manualPriceAppliedBy: string | null
  sellingPrice: number | null
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfoV2
  preSaleDate: string | null
  productCategoryIds: string | null
  productCategories: Record<string, unknown>
  quantity: number
  seller: string | null
  sellerChain: (string | null)[] | null
  imageUrl: string | null
  detailUrl: string | null
  components: string[]
  bundleItems: string[]
  attachments: string[]
  attachmentOfferings: string[]
  offerings: string[]
  priceTags: string[]
  availability: string | null
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode: string | null
  priceDefinition: string | null
}

export type AdditionalInfoV2 = {
  dimension: string | null
  brandName: string | null
  brandId: string | null
  offeringInfo: string | null
  offeringType: string | null
  offeringTypeId: string | null
  categoriesIds: string | null
  productClusterId: string | null
  commercialConditionId: string | null
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
  shippingEstimate: string | null
  dockEstimate: string | null
  shippingEstimateDate: string | null
  lockTTL: string | null
  deliveryCompany: string | null
  polygonName: string | null
  transitTime: string | null
  sellingPrice: number
  deliveryIds: DeliveryIdV2[]
  deliveryWindow: string | null
  pickupPointId: string | null
  pickupStoreInfo: PickupStoreInfoV2
  pickupDistance: number | null
}

export type SlaV2 = {
  id: string
  deliveryChannel: string
  name: string
  deliveryIds: DeliveryIdV2[]
  shippingEstimate: string | null
  shippingEstimateDate: string | null
  lockTTL: string | null
  availableDeliveryWindows: string[]
  deliveryWindow: {
  startDateUtc?: string
  endDateUtc?: string
} | null
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: PickupStoreInfoV2
  pickupPointId: string | null
  pickupDistance: number | null
  polygonName: string | null
  transitTime: string | null
}

export type PickupStoreInfoV2 = {
  isPickupStore: boolean | null
  friendlyName: string | null
  address: string | null
  additionalInfo: string | null
  dockId: string | null
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
  price: string | null
  measurementUnit: string | null
  unitMultiplier: number
  sellingPrice: number
  name: string | null
  detailUrl: string | null
  imageUrl: string | null
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
  shippingEstimate: string | null
  dockEstimate: string | null
  shippingEstimateDate: string | null
  lockTTL: string | null
  deliveryCompany: string | null
  polygonName: string | null
  transitTime: string | null
  sellingPrice: number
  deliveryIds: DeliveryIdV2[]
  deliveryWindow: string | null
  pickupPointId: string | null
  pickupStoreInfo: PickupStoreInfoV2
  pickupDistance: number | null
}

export type DeliveryIdV2 = {
  courierId: string
  warehouseId: string
  dockId: string
  courierName: string
  quantity: number
  kitItemDetails: (string | null)[]
  accountCarrierName: string | null
}

export type DeliveryChannel = {
  id: string
}

export type To2 = {
  items: Item3[]
  paymentData: PaymentDataV2
  receiptData: Record<string, unknown> | null
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
  authorizationDate?: string | null
}[] | null
}[] | null
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
  authorizationDate?: string | null
}[] | null
}[] | null
}[]
}[]

export type ChangeSummary = {
  original?: {
  totalQuantity?: number
  quantity?: number
  deliveryIds?: DeliveryIdResponse[] | null
  itemIndex?: number
  uniqueId?: string
  id?: string
  productId?: string
  lockId?: string
  ean?: string | null
  seller?: string
  sellerSku?: string
  priceValidUntil?: string | null
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
  offeringInfo?: Record<string, unknown> | null
  offeringType?: string | null
  offeringTypeId?: string
  categories?: {
  id?: number
  name?: string
}[]
}
  attachments?: string[]
  attachmentOfferings?: {
  name?: string | null
  required?: boolean | null
}[] | null
  assemblies?: string[] | null
  refId?: string
  shippingPrice?: number | null
  price?: number
  sellingPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  tax?: number
  customTax?: number | null
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
  preSaleDate?: string | null
  isGift?: boolean
  taxCode?: string | null
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
  deliveryIds?: DeliveryIdResponse[] | null
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
  deliveryIds?: DeliveryIdResponse[] | null
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
  deliveryIds?: DeliveryIdResponse[] | null
}[]
  shippingData?: {
  logisticsInfo?: LogisticsInfo1[]
} | null
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
  deliveryIds?: DeliveryIdResponse[] | null
}[]
  shippingData?: {
  logisticsInfo?: LogisticsInfo1[]
} | null
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
  totalListPrice?: number | null
  accountCarrierName?: string
  kitItemDetails?: string[] | null
}
