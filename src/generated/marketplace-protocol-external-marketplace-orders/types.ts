export type EnqueueNewOrderRequest = {
  marketplaceOrderId: string
  connectorName?: string
  connectorEndpoint?: string
  marketplaceOrderStatus: string
  marketplacePaymentValue: number
  marketplaceInterestValue?: number
  priceDivergenceAllowanceRate?: number
  allowFranchises: boolean
  pickupAccountName?: string
  items: Item[]
  clientProfileData: ClientProfileData
  shippingData: ShippingData
  invoiceData: InvoiceData
  customData?: CustomData
  taxData?: TaxData[]
  openTextField?: string
}

export type Item = {
  id: string
  price: number
  quantity: number
}

export type ClientProfileData = {
  email: string
  firstName: string
  lastName: string
  phone: string
  document: string
  corporateDocument: string
  corporatePhone: string
  corporateName: string
  tradeName: string
  stateInscription: string
}

export type ShippingData = {
  logisticsInfo: LogisticsInfo[]
  selectedAddresses: SelectedAddress[]
  isFob: boolean
  isMarketplaceFulfillment: boolean
  trackingHints?: TrackingHint[]
}

export type LogisticsInfo = {
  price: number
  selectedDeliveryChannel: string
  selectedSla: string
  lockTTL: string
  shippingEstimate: string
  deliveryIds: DeliveryIds[]
}

export type DeliveryIds = {
  warehouseId: string
}

export type SelectedAddress = {
  addressType: string
  addressId: string
  receiverName: string
  postalCode: string
  city?: string
  state?: string
  country: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  geoCoordinates?: GeoCoordinates
}

export type GeoCoordinates = {
  latitude: number
  longitude: number
}

export type InvoiceData = {
  userPaymentInfo: UserPaymentInfo
}

export type UserPaymentInfo = {
  paymentMethods: string[]
}

export type CustomData = {
  customApps: CustomApp[]
}

export type CustomApp = {
  id: string
  major: number
  fields: Fields
}

export type Fields = {
  marketplacePaymentMethod: string
}

export type Deliverybyseller = {
  marketplaceOrderId: string
  accountName: string
  code: string
  flow: string
  success: boolean
  operationId: string
  errors: {
  source: string
  code: "FMT001" | "FMT002" | "FMT003" | "FMT004" | "FMT005"
  description: string
}[]
  fields: {
  mainOrderId: string
  franchiseOrderId?: string
}
  message: string
}

export type Deliverybyfranchiseseller = {
  marketplaceOrderId: string
  accountName: string
  code: string
  flow: string
  success: boolean
  operationId: string
  errors: {
  source: string
  code: string
  description: string
}[]
  fields: {
  mainOrderId: string
  franchiseOrderId?: string
}
  message: string
}

export type UpdateOrderStatusRequest = {
  marketplaceOrderId: string
  marketplaceOrderStatus: "new" | "approved"
  connectorName: string
  connectorEndpoint: string
}

export type Approveorder = {
  marketplaceOrderId: string
  accountName: string
  code: string
  flow: string
  success: boolean
  operationId: string
  errors: {
  source: "Fulfillment" | "Checkout" | "Order Integration"
  code: string
  description: string
}[]
  fields: {
  mainOrderId?: string
  franchiseOrderId?: string
}
  message: string
}

export type OrderIDFulfillmentResponse = {
  status?: string
  message?: string
  orderId?: string
  details?: {
  createdAt?: string
  marketplaceOrderId?: string
  status?: string
}
}

export type PlaceFulfillmentOrderRequest = {
  marketplaceOrderId: string
  marketplaceServicesEndpoint: string
  marketplacePaymentValue: number
  isCreatedAsync?: boolean
  items: {
  id: string
  quantity: number
  seller: string
  commission?: number
  freightCommission?: number
  price?: number
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  itemAttachment?: {
  name?: string
  content?: string
}
  attachments?: string[]
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
  clientProfileData: {
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
  isCorporate?: boolean
}
  shippingData: {
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
  neighborhood?: string
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
  price?: number
  lisPrice?: number
  tax?: number
}
}[]
  updateStatus?: string
}
  paymentData?: Record<string, unknown>
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

export type PlaceFulfillmentOrderResponse = {
  orderId?: string
  status?: string
  message?: string
  orderData?: {
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  marketplacePaymentValue?: number
  isCreatedAsync?: boolean
  items?: {
  id?: string
  quantity?: number
  seller?: string
  commission?: number
  freightCommission?: number
  price?: number
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  itemAttachment?: {
  name?: string
  content?: string
}
  attachments?: string[]
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
  addressType?: string
  receiverName?: string
  addressId?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: string[]
}
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  lockTTL?: string
  shippingEstimate?: string
  price?: number
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
}[]
  updateStatus?: string
}
  paymentData?: string
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
}

export type TaxData = {
  skuId: string
  value: number
}

export type TrackingHint = {
  trackingId: string
  courierName: string
  trackingUrl?: string
  trackingLabel?: string
}
