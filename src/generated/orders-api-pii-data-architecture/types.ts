export type ClientProfileData = {
  id: string
  userProfileId: string
  userProfileVersion?: string
  firstName: string
  lastName: string
  email: string
  document: string
  corporateDocument: string
  corporateName: string
  documentType: string
  phone: string
  tradeName: string
  stateInscription: string
  corporatePhone: string
  isCorporate: boolean
  customerClass: string
  customerCode?: string
}

export type ShippingData = {
  address: Address
  logisticsInfo: {
  polygonName?: string
  shippingEstimate?: string
  entityId?: string
  versionId?: string
  pickupStoreInfo?: PickupStoreInfo
  deliveryWindow?: string
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
  totalListPrice?: number
  accountCarrierName?: string
  kitItemDetails?: string[]
}[]
  shippingEstimateDate?: string
  deliveryChannels?: {
  id?: "delivery" | "pickup-in-point"
  stockBalance?: number
}[]
  itemId?: string
  shipsTo?: string[]
  slas?: {
  pickupPointId?: string
  pickupStoreInfo?: PickupStoreInfo
  tax?: number
  listPrice?: number
  price?: number
  deliveryWindow?: string
  availableDeliveryWindows?: string[]
  lockTTL?: string
  shippingEstimateDate?: string
  shippingEstimate?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
  totalListPrice?: number
  accountCarrierName?: string
  kitItemDetails?: string[]
}[]
  name?: string
  deliveryChannel?: "delivery" | "pickup-in-point"
  id?: string
  pickupDistance?: number
  polygonName?: string
  transitTime?: string
}[]
  addressId?: string
  selectedDeliveryChannel?: "delivery" | "pickup-in-point"
  lockTTL?: string
  selectedSla?: string
  itemIndex?: number
  pickupPointId?: string
  transitTime?: string
}[]
  trackingHints: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[]
  selectedAddresses: {
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
}[]
  availableAddresses?: {
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

export type Address = {
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
  contactId?: string
}

export type PickupStoreInfo = {
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

export type ChangesAttachment = {
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
  Facets: string
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
  Facets: string
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
  Facets: string
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
  Facets: string
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
  Facets: string
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
  Facets: string
}
}
}
}
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
