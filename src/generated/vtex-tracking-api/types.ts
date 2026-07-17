export type PaginationResultDeliveryServiceResponsev11 = {
  page?: number
  pageSize?: number
  totalCount?: number
  data?: DeliveryServiceResponseV11[]
}

export type DeliveryService = {
  deliveryServiceType?: string
  idExternalShipperCustomer?: string
  shipperCustomer?: {
  legalType: string
  email?: string
  firstName?: string
  lastName?: string
  cpf?: string
  addressStreet: string
  addressNumber?: string
  addressComplement?: string
  addressNeighborhood?: string
  addressCity?: string
  postalCode: string
  state?: string
  companyName?: string
  cnpj?: string
  idExternalShipperCustomer?: string
  phoneAreaCode?: string
  phoneNumber?: string
}
  invoiceOrderOfService?: string
  invoiceOrderOfServiceSerie?: string
  description?: string
  sender?: string
  cnpjShipperPartner?: string
  orderNumber?: string
  deliveryServiceHighLighter?: string
  latitude?: number
  longitude?: number
  deliveryServiceScheduling?: {
  shipperCustomerSchedulingDateTime?: string
  shipperSchedulingDateTime?: string
  morningPeriod?: boolean
  afternoonPeriod?: boolean
  nightPeriod?: boolean
  origin?: number
}
  cnpjcarrier?: string
  cnpjbranch?: string
  idExternal?: string
  idShippingCompany?: number
  packingList?: string
  packingListDateTime?: string
  integrationDateTime?: string
}[]

export type DeliveryServiceResponseV11 = {
  pictures?: string[]
  idDeliveryService?: number
  deliveryServiceType?: {
  description?: string
}
  deliveryServiceStatus?: {
  description?: string
}
  shipper?: {
  companyName?: string
}
  shipperCustomer?: {
  idShipperCustomer?: number
  email?: string
  firstName?: string
  lastName?: string
  cpf?: string
  addressStreet?: string
  addressNumber?: string
  addressComplement?: string
  addressNeighborhood?: string
  addressCity?: string
  postalCode?: string
  state?: StateResponse
  country?: CountryResponse
  created?: string
  companyName?: string
  cnpj?: string
  legalType?: {
  description?: string
}
  idExternalShipperCustomer?: string
  phoneAreaCode?: string
  phoneNumber?: string
}
  carrier?: {
  username?: string
  firstName?: string
  lastName?: string
  cpf?: string
  email?: string
  cnpjtransportCompany?: string
  mobileAreaCode?: string
  mobile?: string
  phoneAreaCode?: string
  phone?: string
  created?: string
  idExternalCarrier?: string
  isCarrierAppOnline?: boolean
  shippingCompany?: ShippingCompanyResponse
  rg?: string
}
  displacementType?: {
  description?: string
  vehicleType?: {
  description?: string
}
}
  state?: StateResponse
  country?: CountryResponse
  nonDeliveryReason?: {
  description?: string
}
  shipperPartner?: {
  cnpj?: string
  name?: string
}
  shipperBranch?: {
  shipperType?: {
  description?: string
}
  companyName?: string
  trade?: string
  cnpj?: string
  companyContact?: string
  telephoneArea?: string
  telephone?: string
  mobileArea?: string
  mobile?: string
  email?: string
}
  freightPrice?: {
  description?: string
  firstPostalCodeInterval?: string
  secondPostalCodeInterval?: string
  price?: number
  created?: string
}
  shippingCompany?: ShippingCompanyResponse
  invoiceOrderOfService?: string
  description?: string
  addressStreet?: string
  addressNumber?: string
  addressComplement?: string
  addressNeighborhood?: string
  addressCity?: string
  postalCode?: string
  estimateDeliveryHour?: string
  created?: string
  initialEstimateDeliveryHour?: string
  deliveryDateTime?: string
  estimateDeliveryDistance?: number
  travelledDeliveryDistance?: number
  orderNumber?: string
  cteNumber?: string
  cteDate?: string
  sender?: string
  senderCity?: string
  senderState?: number
  weight?: number
  cubicMeter?: number
  cubicMeterWeight?: number
  value?: number
  freightPriceReceived?: number
  deliveryAttempts?: number
  serviceTime?: number
  invoiceOrderOfServiceSerie?: string
  leadTime?: string
  cnpjcarrier?: string
  cnpjbranch?: string
  idExternal?: string
  billingInfo?: {
  receivableAmount?: number
  money?: number
  cheque?: number
  creditCard?: number
  webComment?: string
  carrierComment?: string
  billingConfirmDate?: string
  created?: string
}[]
  deliveryServiceRouteItem?: {
  idDeliveryServiceRouteItem?: number
  deliveryServiceRoute?: {
  idDeliveryServiceRoute?: number
  deliveryServiceRouteStatus?: {
  description?: string
}
  deliveryServiceDate?: string
  created?: string
  startWorkDayDateTime?: string
  finishWorkDayDateTime?: string
  itinerantDate?: string
}
  deliveryServiceRouteItemStatus?: {
  description?: string
}
  nonDeliveryDescription?: string
  index?: number
  created?: string
  startDisplacementDateTime?: string
  startDisplacementLatitude?: number
  startDisplacementLongitude?: number
  finishedDisplacementLatitude?: number
  finishedDisplacementLongitude?: number
  receiverName?: string
  receiverDocument?: string
  description?: string
  deliveryArrived?: string
  comment?: string
  rating?: number
  pauseDisplacementDateTime?: string
  deliveryLeft?: string
  deliveryReason?: {
  description?: string
}
}[]
}

export type StateResponse = {
  name?: string
  code?: string
}

export type CountryResponse = {
  name?: string
  code?: string
}

export type ShippingCompanyResponse = {
  companyName?: string
  trade?: string
  cnpj?: string
  companyContact?: string
  telephoneArea?: string
  telephone?: string
  mobileArea?: string
  mobile?: string
  email?: string
}
