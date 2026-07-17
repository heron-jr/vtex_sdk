export type CreatetokenRequest = {
  apiKey: string
}

export type CreateServiceBody = {
  orderId?: string
  carrierId?: string
  seller?: string
  sender?: {
  name?: string
  phone?: string
  email?: string
  city?: string
  state?: string
  country?: string
  address?: string
  addressComplement?: string
  number?: string
  reference?: string
  location?: {
  latitude?: number
  longitude?: number
}
  pickupDate?: string
}
  receiver?: {
  name?: string
  phone?: string
  email?: string
  city?: string
  state?: string
  country?: string
  address?: string
  addressComplement?: string
  number?: string
  reference?: string
  location?: {
  latitude?: number
  longitude?: number
}
  identification?: string
  deliveryDate?: string
  contactName?: string
  deliveryWindow?: {
  name?: string
  initialDate?: string
  finalDate?: string
}
}
  packages?: Package[]
  carrierServiceType?: "BROKER" | "PICKUP_IN_STORE" | "NATIONAL" | "INTERNATIONAL" | "EXPRESS" | "SPECIALIZED" | "OTHERS"
  type?: "PICKUP" | "DELIVERY" | "PICKUP_DELIVERY" | "TRANSFER" | "RETURN"
  paymentMethod?: string
  comments?: string
  orderValue?: number
  settings?: {
  label?: string
  value?: string
  key?: string
}[]
  timezone?: Timezone
}

export type ServiceBody = {
  message: string
  data: Data
}

export type Data = {
  id: string
  orderId: string
  carrierId: string
  serviceId: string
  carrierName: string
  seller: string
  status: string
  type: string
  tags: string[]
  labels: Label[]
  evidences: string[]
  packages: Package[]
  timeline: Timeline[]
  notes: Note[]
  timezone: Timezone
  carrierLogo: string
  trackingUrl: string
  comments: string
  paymentMethod: string
  carrierServiceType: "BROKER" | "PICKUP_IN_STORE" | "NATIONAL" | "INTERNATIONAL" | "EXPRESS" | "SPECIALIZED" | "OTHERS"
  rate: Rate
  shippingEstimatedDate: string
  shippingFinishedDate: string
  metaData: MetaData1
}

export type Label = {
  id: string
  name: string
  url: string
  type: string
}

export type Package = {
  id: string
  orderId: string
  envelope: string
  dimensions: Dimensions
  weight: string
  totalValue: number
  items: Item[]
  categories: string[]
  description: string
}

export type Dimensions = {
  height: string
  length: string
  width: string
}

export type Item = {
  id: string
  name: string
  ean: string
  quantity: number
  price: number
  refId: string
  image: string
  type: string
  weight: string
}

export type Timeline = {
  id: string
  date: string
  createdAt: string
  updatedAt: string
  type: string
  description: string
  author: string
  metaData: MetaData
}

export type MetaData = {
  "0"?: GeneratedObject
  shippingEstimatedDate?: string
  metaData?: string
  serviceId?: string
  shippingPrice?: number
  status?: string
  labels?: Label[]
  trackingUrl?: string
  name?: string
  id?: string
  type?: string
  url?: string
}

export type GeneratedObject = {
  type: string
  note: string
  author: string
}

export type Note = {
  type: string
  date: string
  content: string
  author: string
}

export type Timezone = {
  offset: number
  value: string
  label: string
}

export type Rate = {
  shippingPrice: ShippingPrice
  insurancePrice: InsurancePrice
}

export type ShippingPrice = {
  value: number
  currency: string
}

export type InsurancePrice = {
  value: number
  currency: string
}

export type MetaData1 = {
  integrationResponse: Record<string, unknown>
  carrier: Carrier
}

export type Carrier = {
  name: string
  image: string
  metaData: Record<string, unknown>
  id: string
  type: Type
}

export type Type = {
  metaData: Record<string, unknown>
  terms: string
  rate: Rate1
  name: string
  transitTime: number
  shippingEstimatedDate: string
  description: string
  id: string
  international: boolean
}

export type Rate1 = {
  shippingPrice: ShippingPrice1
  insurancePrice: InsurancePrice
}

export type ShippingPrice1 = {
  value: number
  currency: string
}

export type M4031 = {
  message: string
  requestId: string
}

export type Data1 = {
  "0": string
  carrierId: string
  serviceId: string
}

export type M4041 = {
  type: string
  code: string
  data: Data1
  requestId: string
  date: string
  message: string
}

export type UpdateserviceRequest = {
  status: string
  agent: string
  trackingUrl: string
  totalDistanceTraveled: string
  rating: string
  shippingPrice: string
  shippingEstimatedDate: string
}

export type ServiceBody1 = {
  message: string
  data: Data3
}

export type Data3 = {
  status: string
  agent: Agent
  trackingUrl: string
  totalDistanceTraveled: number
  rating: number
  shippingPrice: number
  shippingEstimatedDate: string
}

export type Agent = {
  id: string
  name: string
  identification: string
  phone: string
  email: string
  vehicle: string
}

export type CreatenotesRequest = {
  type: string
  note: string
  author: string
}

export type ServiceBody3 = {
  message: string
  data: Data9[]
}

export type Data9 = {
  type: string
  note: string
  author: string
}

export type CreateevidenceRequest = {
  type: string
  note?: string
  author: string
}

export type ServiceBody4 = {
  message: string
  data: Data12[]
}

export type Data12 = {
  type: string
  note?: string
  author: string
}

export type CreatelabelsRequest = {
  id: string
  url: string
  name: string
  type: string
}

export type ServiceBody5 = {
  message: string
  data: Data15
}

export type Data15 = {
  id: string
  url: string
  name: string
  type: string
}

export type CancelOngoingServiceRequest = {
  comment: string
  type: string
}

export type ServiceBody6 = {
  message: string
  data: Data18
}

export type Data18 = {
  comment: string
  type: string
}

export type OnholdserviceRequest = {
  comment: string
  type: string
}

export type ResponseService = {
  status: "PENDING" | "ASSIGNED" | "PICKED" | "ON_ROUTE" | "INCIDENT" | "RETURNED" | "DELIVERED" | "CANCELED" | "ON_HOLD"
  serviceId: string
  shippingPrice: number
  metaData: {
  "{keyValue}"?: string
}
  shippingEstimatedDate: string
  labels: Label[]
}

export type ListRequest = {
  settings: {
  label?: string
  key?: string
  value?: string
}[]
}

export type CancelServiceRequest = {
  serviceId: string
  carrierId: string
  settings: {
  label: string
  key: string
  value: string
}[]
  reason: string
  metaData: {
  myFieldCustom?: string
}
}

export type CancelServiceResponse = {
  message: string
  data: {
  serviceId: string
  carrierId: string
  reason: string
}
}

export type PauseResumeServiceRequest = {
  serviceId: string
  carrierId: string
  pause?: boolean
  settings: {
  label: string
  key: string
  value: string
}[]
  reason: string
  metaData: {
  myFieldCustom?: string
}
}

export type PauseResumeServiceResponse = {
  message: string
  data: {
  serviceId: string
  carrierId: string
  cancel?: boolean
  reason: string
}
}
