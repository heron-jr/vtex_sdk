export type FulfillmentItem = {
  id: string
  quantity: number
  seller: string
}

export type OrderPlacement = {
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  marketplacePaymentValue?: number
  items?: {
  id?: string
  quantity?: number
  seller?: string
  commission?: number
  freightCommission?: number
  price?: number
  bundleItems?: BundleItemsItem[]
  itemsAttachment?: ItemAttachment[]
  attachments?: {
  id?: string
  name?: string
  url?: string
}[]
  priceTags?: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  measurementUnit?: string
  unitMultiplier?: number
  isGift?: boolean
}[]
  paymentData?: Record<string, unknown>
  clientProfileData?: {
  email: string
  firstName: string
  lastName: string
  documentType: string
  document: string
  phone?: string
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  stateInscription?: string
  corporatePhone?: string
  isCorporate: boolean
}
  shippingData?: {
  address?: {
  addressType: string
  receiverName: string
  addressId?: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement?: string
  reference?: string
  geoCoordinates?: string[]
}
  logisticsInfo?: {
  itemIndex: number
  selectedSla: string
  lockTTL?: string
  shippingEstimate?: string
  price: number
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  listPrice?: number
}
}[]
  updateStatus?: string
}
  marketingData?: {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
  openTextField?: string
}

export type ResponseOrderPlacement = {
  marketplaceOrderId?: string
  orderId?: string
  followUpEmail?: string
  items?: {
  id?: string
  quantity?: number
  seller?: string
  commission?: number
  freightCommission?: number
  price?: number
  bundleItems?: BundleItemsItem[]
  itemsAttachment?: ItemAttachment[]
  attachments?: {
  id?: string
  name?: string
  url?: string
}[]
  priceTags?: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  measurementUnit?: string
  unitMultiplier?: number
  isGift?: boolean
}[]
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
}
  shippingData?: {
  address?: {
  addressType: string
  receiverName: string
  addressId?: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement?: string
  reference?: string
  geoCoordinates?: string[]
}
  logisticsInfo?: {
  itemIndex: number
  selectedSla: string
  lockTTL?: string
  shippingEstimate?: string
  price: number
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  listPrice?: number
}
}[]
}
  paymentData?: Record<string, unknown>
  customData?: Record<string, unknown>
  allowMultipleDeliveries?: boolean
}

export type BundleItemsItem = {
  type?: string
  id?: number
  name?: string
  price?: number
}

export type ItemAttachment = {
  name?: string
  content?: string
}

export type RequestFulfillmentSimulation = {
  postalCode: string
  geoCoordinates?: string[]
  country?: string
  items?: FulfillmentItem[]
  sc?: string
}

export type ResponseFulfillmentSimulation = {
  country: string
  items: {
  id: string
  listPrice: number
  measurementUnit: string
  merchantName: string
  offerings: {
  type: string
  id: string
  name: string
  price: number
}[]
  price: number
  priceTags: string[]
  priceValidUntil: string
  quantity: number
  requestIndex: number
  seller: string
  unitMultiplier: number
}[]
  logisticsInfo: {
  itemIndex: number
  quantity: number
  shipsTo: string[]
  slas: {
  id: string
  deliveryChannel: string
  name: string
  price: number
  shippingEstimate: string
  availableDeliveryWindows: {
  startDateUtc: string
  endDateUtc: string
  price: number
}[]
  pickupStoreInfo: {
  isPickupStore: boolean
  friendlyName: string
  address: {
  addressType: string
  receiverName: string
  addressId: string
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
  additionalInfo: string
}
}[]
  stockBalance: number
  deliveryChannels: {
  id: string
  stockBalance: number
}[]
}[]
  postalCode: string
  allowMultipleDeliveries?: boolean
}

export type RequestOrderId = {
  marketplaceOrderId: string
  marketplaceOrderGroup: string
  cancellationRequestId: string
  cancellationRequestDate: string
  reason: string
  requestedByUser: boolean
  paymentData?: {
  payments?: {
  paymentSystem?: string
  paymentSystemName?: string
  value?: number
  installments?: number
  referenceValue?: number
  group?: "creditCard" | "debitCard" | "bankInvoice" | "promissory" | "giftCard" | "instantPayment"
}[]
  connectorResponses?: ConnectorResponses
}
}

export type RepsonseOrderId = {
  date?: string
  marketplaceOrderId?: string
  orderId?: string
  receipt?: string
}

export type ConnectorResponses = {
  Message?: string
  tid?: string
  authorizationId?: string
  status?: string
  delayToAutoSettle?: number
  ReturnCode?: string
  nsu?: string
  code?: string
  message?: string
  acquirer?: string
  authId?: string
  paymentId?: string
  delayToAutoSettleAfterAntifraud?: string
}
