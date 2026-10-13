export type SimulationItemResult = {
  id?: string | null
  quantity?: number
  unitPrice?: number | null
  status?: string
  price?: number | null
  sellingPrice?: number
  manualPrice?: number | null
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
  message?: string | null
  friendlyMessage?: string | null
  plan?: PlanResponse
  orderInfo?: {
  orderId?: string
  orderGroup?: string
  paymentURL?: string | null
  value?: number
}
  context?: {
  items?: {
  subscriptionItemId?: string | null
  skuId?: string | null
  quantity?: number | null
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING" | null
  isSkipped?: boolean | null
  cycleCount?: number | null
}[] | null
  paymentSystem?: string | null
  paymentSystemName?: string | null
  paymentSystemGroup?: string | null
  paymentAccountId?: string | null
  addressId?: string | null
  addressType?: string | null
  catalogAttachment?: string | null
}
  simulationItems?: SimulationItemResult[] | null
}

export type StorePlan = {
  id?: string
  frequencies?: {
  periodicity?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | null
  interval?: number
}[]
  isActive?: boolean
  importInProgress?: boolean
  attachmentId?: number
  isValid?: boolean
  validationMessages?: string[] | null
  validity?: {
  begin?: string
  end?: string | null
} | null
  purchaseDays?: string[]
}

export type ReportResponse = {
  id?: string
  finished?: boolean
  recordsProcessed?: number
  recordsSum?: number | null
  startDate?: string | null
  lastUpdateTime?: string | null
  completedDate?: string | null
  errorCount?: number | null
  percentageProcessed?: number
  enqueueDate?: string | null
  email?: string
  canceled?: boolean
  outputType?: string | null
  zipped?: boolean
  linkToDownload?: string | null
  lastErrorMessage?: string | null
  statusMessage?: string
}

export type PlanResponse = {
  id: string | null
  frequency: {
  periodicity: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | null
  interval: number
}
  validity: {
  begin: string
  end?: string | null
}
  purchaseDay: string
}

export type SubscriptionGroupResponse = {
  id: string
  customerId: string
  customerEmail: string
  title?: string | null
  status: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING"
  isSkipped: boolean
  nextPurchaseDate: string
  lastPurchaseDate?: string | null
  plan: PlanResponse
  shippingAddress: {
  addressId: string
  addressType: "residential" | "pickup"
}
  purchaseSettings: {
  paymentMethod: {
  paymentAccountId?: string | null
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
  lastUpdate: string | null
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
  name?: string | null
  content?: {
  [key: string]: string
} | null
}[] | null
}[]
  lastCycleId?: string | null
  customData?: {
  customApps?: (string | null)[] | null
} | null
}

export type PlanRequest = {
  id: string
  frequency: {
  periodicity: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  interval: number
}
  validity?: {
  begin?: string | null
  end?: string | null
}
  purchaseDay?: string | null
}

export type ShippingAddressRequest = {
  addressId: string
  addressType: "residential" | "pickup"
}

export type PurchaseSettingsRequest = {
  paymentMethod: {
  paymentAccountId: string
  paymentSystem: string
  installments?: number | null
  paymentSystemName?: string | null
  paymentSystemGroup?: string | null
}
  currencyCode?: string
  selectedSla?: string
  salesChannel: string
  seller?: string
}

export type SubscriptionGroupRequest = {
  customerEmail: string
  title?: string | null
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING" | null
  nextPurchaseDate?: string
  catalogAttachment?: string | null
  plan: PlanRequest
  shippingAddress: ShippingAddressRequest
  purchaseSettings: PurchaseSettingsRequest
  items: {
  skuId: string
  quantity: number
  manualPrice?: number | null
  attachments?: {
  name: string
  content: {
  [key: string]: string
}
}[]
}[]
}

export type PriceTag = {
  name?: string | null
  valueAsInt?: number
  rawValue?: number
  isPercentual?: boolean
  identifier?: string | null
}

export type SimulateResponseVO = {
  simulation?: {
  items?: {
  id?: string | null
  seller?: string | null
  quantity?: number
  price?: number | null
  sellingPrice?: number | null
  manualPrice?: number | null
  unitMultiplier?: number
  measurementUnit?: string
  attachments?: {
  name?: string | null
  content?: {
  [key: string]: string
} | null
}[] | null
  name?: string | null
  isGift?: boolean
  priceTags?: PriceTag[] | null
}[]
  logisticsInfo?: {
  itemIndex?: number
  quantity?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: "delivery" | "pickup-in-point" | null
  lockTTL?: string | null
  shippingEstimate?: string | null
  addressId?: string | null
  pickupId?: string | null
  price?: number | null
  deliveryWindow?: string | null
  slas?: {
  id?: string | null
  pickupPointId?: string | null
  deliveryChannel?: "delivery" | "pickup-in-point" | null
  price?: number
  shippingEstimate?: string | null
  lockTTL?: string | null
  deliveryWindows?: {
  startDateUtc?: string | null
  endDateUtc?: string | null
  price?: number | null
}[] | null
  availableDeliveryWindows?: {
  startDateUtc?: string | null
  endDateUtc?: string | null
  price?: number | null
}[] | null
}[]
}[]
  paymentData?: {
  payments?: ({
  id?: string | null
  paymentSystem?: string | null
  group?: string | null
  bin?: string | null
  accountId?: string | null
  parentAccountId?: string | null
  referenceValue?: number | null
  value?: number | null
  installments?: number | null
  url?: string | null
  cardNumber?: string | null
  fields?: {
  name?: string | null
  value?: string | null
}[] | null
  paymentSystemName?: string | null
} | null)[] | null
  transactions?: ({
  isActive?: boolean | null
} | null)[] | null
} | null
  country?: string | null
  postalCode?: string | null
  messages?: ({
  code?: string | null
  status?: string | null
  text?: string | null
} | null)[] | null
  selectableGifts?: {
  id?: string | null
  availableQuantity?: number | null
  availableGifts?: ({
  id?: string | null
  seller?: string | null
  quantity?: number | null
  price?: number | null
  sellingPrice?: number | null
  unitMultiplier?: number | null
  attachments?: ({
  name?: string | null
  content?: {
  [key: string]: string | null
} | null
} | null)[] | null
  name?: string | null
  isGift?: boolean | null
  priceTags?: PriceTag[] | null
  isSelected?: boolean | null
} | null)[] | null
}[] | null
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
  defaultSla: string | null
  isUsingV3: boolean
  onMigrationProcess: boolean
  executionHourInUtc: number
  workflowVersion: string
  deliveryChannels: ("delivery" | "pickupInPoint")[]
  randomIdGeneration: boolean
  isMultipleInstallmentsEnabledOnCreation: boolean
  isMultipleInstallmentsEnabledOnUpdate: boolean
  attachmentPreferences?: {
  enableAttachments?: boolean
  splitSameSkuWithDifferentAttachments?: boolean
}
  orderCustomDataAppId: string | null
  postponeExpiration: boolean
  manualPriceAllowed: boolean
  useItemPriceFromOriginalOrder: boolean
}
