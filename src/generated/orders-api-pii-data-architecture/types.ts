export type ClientProfileData = {
  id: string | null
  userProfileId: string
  userProfileVersion?: string | null
  firstName: string
  lastName: string
  email: string
  document: string
  corporateDocument: string | null
  corporateName: string | null
  documentType: string
  phone: string
  tradeName: string | null
  stateInscription: string | null
  corporatePhone: string | null
  isCorporate: boolean
  customerClass: string | null
  customerCode?: string | null
}

export type ShippingData = {
  address: Address
  logisticsInfo: {
  polygonName?: string | null
  shippingEstimate?: string
  entityId?: string | null
  versionId?: string | null
  pickupStoreInfo?: PickupStoreInfo
  deliveryWindow?: string | null
  sellingPrice?: number
  listPrice?: number
  price?: number
  deliveryChannel?: "delivery" | "pickup-in-point"
  deliveryCompany?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
  totalListPrice?: number | null
  accountCarrierName?: string
  kitItemDetails?: string[] | null
}[]
  shippingEstimateDate?: string
  deliveryChannels?: {
  id?: "delivery" | "pickup-in-point"
  stockBalance?: number
}[]
  itemId?: string
  shipsTo?: string[]
  slas?: {
  pickupPointId?: string | null
  pickupStoreInfo?: PickupStoreInfo
  tax?: number
  listPrice?: number
  price?: number
  deliveryWindow?: string | null
  availableDeliveryWindows?: string[] | null
  lockTTL?: string
  shippingEstimateDate?: string | null
  shippingEstimate?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
  totalListPrice?: number | null
  accountCarrierName?: string
  kitItemDetails?: string[] | null
}[]
  name?: string
  deliveryChannel?: "delivery" | "pickup-in-point"
  id?: string
  pickupDistance?: number | null
  polygonName?: string | null
  transitTime?: string
}[]
  addressId?: string | null
  selectedDeliveryChannel?: "delivery" | "pickup-in-point"
  lockTTL?: string
  selectedSla?: string
  itemIndex?: number
  pickupPointId?: string | null
  transitTime?: string
}[]
  trackingHints: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[] | null
  selectedAddresses: {
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
}[]
  availableAddresses?: {
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

export type Address = {
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
  contactId?: string | null
}

export type PickupStoreInfo = {
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

export type ChangesAttachment = {
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

export type Stats = {
  stats: {
  totalValue: {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: {
  origin: {
  Fulfillment: {
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
  Marketplace: {
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
}
  currencyCode: {
  BRL: {
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
}
}
}
  totalItems: {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: {
  origin: {
  Fulfillment: {
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
  Marketplace: {
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
}
  currencyCode: {
  BRL: {
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
}
} | null
}
}
} | null

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
