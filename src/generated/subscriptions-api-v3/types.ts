export type SimulationItemResult = {
  id?: string
  quantity?: number
  unitPrice?: number
  status?: string
  price?: number
  sellingPrice?: number
  manualPrice?: number
}

export type SubscriptionCycleResponse = {
  id?: string
  subscriptionId?: string
  workflowId?: string
  status?: "TRIGGERED" | "IN_PROCESS" | "FAILURE" | "SUCCESS" | "EXPIRED" | "ORDER_ERROR" | "PAYMENT_ERROR" | "SKIPED" | "SUCCESS_WITH_NO_ORDER" | "SUCCESS_WITH_PARTIAL_ORDER" | "RE_TRIGGERED" | "SCHEDULE_UPDATED"
  customerEmail?: string
  customerId?: string
  date?: string
  lastUpdate?: string
  cycleCount?: number
  isInRetry?: boolean
  message?: string
  friendlyMessage?: string
  plan?: PlanResponse
  orderInfo?: {
  orderId?: string
  orderGroup?: string
  paymentURL?: string
  value?: number
}
  context?: {
  items?: {
  subscriptionItemId?: string
  skuId?: string
  quantity?: number
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING"
  isSkipped?: boolean
  cycleCount?: number
}[]
  paymentSystem?: string
  paymentSystemName?: string
  paymentSystemGroup?: string
  paymentAccountId?: string
  addressId?: string
  addressType?: string
  catalogAttachment?: string
}
  simulationItems?: SimulationItemResult[]
}

export type StorePlan = {
  id?: string
  frequencies?: {
  periodicity?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval?: number
}[]
  isActive?: boolean
  importInProgress?: boolean
  attachmentId?: number
  isValid?: boolean
  validationMessages?: string[]
  validity?: {
  begin?: string
  end?: string
}
  purchaseDays?: string[]
}

export type ReportResponse = {
  id?: string
  finished?: boolean
  recordsProcessed?: number
  recordsSum?: number
  startDate?: string
  lastUpdateTime?: string
  completedDate?: string
  errorCount?: number
  percentageProcessed?: number
  enqueueDate?: string
  email?: string
  canceled?: boolean
  outputType?: string
  zipped?: boolean
  linkToDownload?: string
  lastErrorMessage?: string
  statusMessage?: string
}

export type PlanResponse = {
  id: string
  frequency: {
  periodicity: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval: number
}
  validity: {
  begin: string
  end?: string
}
  purchaseDay: string
}

export type SubscriptionGroupResponse = {
  id: string
  customerId: string
  customerEmail: string
  title?: string
  status: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING"
  isSkipped: boolean
  nextPurchaseDate: string
  lastPurchaseDate?: string
  plan: PlanResponse
  shippingAddress: {
  addressId: string
  addressType: "residential" | "pickup"
}
  purchaseSettings: {
  paymentMethod: {
  paymentAccountId?: string
  paymentSystem: string
  installments?: number
  paymentSystemName?: string
  paymentSystemGroup?: string
}
  currencyCode: string
  selectedSla?: string
  salesChannel?: string
  seller?: string
}
  cycleCount: number
  createdAt: string
  lastUpdate: string
  items: {
  id: string
  skuId: string
  quantity: number
  isSkipped: boolean
  status: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING"
  originalOrderId?: string
  cycleCount?: number
  priceAtSubscriptionDate?: number
  manualPrice?: number
  attachments?: {
  name?: string
  content?: Record<string, unknown>
}[]
}[]
  lastCycleId?: string
  customData?: {
  customApps?: string[]
}
}

export type PlanRequest = {
  id: string
  frequency: {
  periodicity: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval: number
}
  validity?: {
  begin?: string
  end?: string
}
  purchaseDay?: string
}

export type ShippingAddressRequest = {
  addressId: string
  addressType: "residential" | "pickup"
}

export type PurchaseSettingsRequest = {
  paymentMethod: {
  paymentAccountId: string
  paymentSystem: string
  installments?: number
  paymentSystemName?: string
  paymentSystemGroup?: string
}
  currencyCode?: string
  selectedSla?: string
  salesChannel: string
  seller?: string
}

export type SubscriptionGroupRequest = {
  customerEmail: string
  title?: string
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING"
  nextPurchaseDate?: string
  catalogAttachment?: string
  plan: PlanRequest
  shippingAddress: ShippingAddressRequest
  purchaseSettings: PurchaseSettingsRequest
  items: {
  skuId: string
  quantity: number
  manualPrice?: number
  attachments?: {
  name: string
  content: Record<string, unknown>
}[]
}[]
}

export type PriceTag = {
  name?: string
  valueAsInt?: number
  rawValue?: number
  isPercentual?: boolean
  identifier?: string
}

export type SimulateResponseVO = {
  simulation?: {
  items?: {
  id?: string
  seller?: string
  quantity?: number
  price?: number
  sellingPrice?: number
  manualPrice?: number
  unitMultiplier?: number
  measurementUnit?: string
  attachments?: {
  name?: string
  content?: Record<string, unknown>
}[]
  name?: string
  isGift?: boolean
  priceTags?: PriceTag[]
}[]
  logisticsInfo?: {
  itemIndex?: number
  quantity?: number
  selectedSla?: string
  selectedDeliveryChannel?: "delivery" | "pickup-in-point"
  lockTTL?: string
  shippingEstimate?: string
  addressId?: string
  pickupId?: string
  price?: number
  deliveryWindow?: string
  slas?: {
  id?: string
  pickupPointId?: string
  deliveryChannel?: "delivery" | "pickup-in-point"
  price?: number
  shippingEstimate?: string
  lockTTL?: string
  deliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
}[]
  availableDeliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
}[]
}[]
}[]
  paymentData?: {
  payments?: {
  id?: string
  paymentSystem?: string
  group?: string
  bin?: string
  accountId?: string
  parentAccountId?: string
  referenceValue?: number
  value?: number
  installments?: number
  url?: string
  cardNumber?: string
  fields?: {
  name?: string
  value?: string
}[]
  paymentSystemName?: string
}[]
  transactions?: {
  isActive?: boolean
}[]
}
  country?: string
  postalCode?: string
  messages?: {
  code?: string
  status?: string
  text?: string
}[]
  selectableGifts?: {
  id?: string
  availableQuantity?: number
  availableGifts?: {
  id?: string
  seller?: string
  quantity?: number
  price?: number
  sellingPrice?: number
  unitMultiplier?: number
  attachments?: {
  name?: string
  content?: Record<string, unknown>
}[]
  name?: string
  isGift?: boolean
  priceTags?: PriceTag[]
  isSelected?: boolean
}[]
}[]
  totals?: {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  name?: string
  valueAsInt?: number
}[]
  totalsBySimulationItems?: SimulationItemResult[]
}
  shippingEstimate?: {
  name?: string
  estimate?: string
  estimateDeliveryDate?: string
  nextPurchaseDate?: string
  matched?: boolean
}
  totalsBySimulationItems?: SimulationItemResult[]
  totals?: {
  id?: "Items" | "Discounts" | "Shipping" | "Tax"
  value?: number
}[]
}

export type Settings = {
  slaOption: "NONE" | "CHEAPEST" | "CUSTOMER_CHOICE" | "STORE_CHOICE"
  defaultSla: string
  isUsingV3: boolean
  onMigrationProcess: boolean
  executionHourInUtc: number
  workflowVersion: string
  deliveryChannels: "delivery" | "pickupInPoint"[]
  randomIdGeneration: boolean
  isMultipleInstallmentsEnabledOnCreation: boolean
  isMultipleInstallmentsEnabledOnUpdate: boolean
  attachmentPreferences?: {
  enableAttachments?: boolean
  splitSameSkuWithDifferentAttachments?: boolean
}
  orderCustomDataAppId: string
  postponeExpiration: boolean
  manualPriceAllowed: boolean
  useItemPriceFromOriginalOrder: boolean
}
