import type { VtexHttpClient } from '../../core/http.js'
import type { _403Expiredtoken, _403Forbidden, _404Notfound, _400Badrequest } from './types.js'

class PickAndPackApi_authentication {
  constructor(private http: VtexHttpClient) {}

  postToken(params: {
  body: {
  apiKey: string
}
}): Promise<{
  message?: string
  data?: string
}> {
    return this.http.request<{
  message?: string
  data?: string
}>({ method: 'POST', path: `/token`, body: params.body })
  }
}
class PickAndPackApi_orders {
  constructor(private http: VtexHttpClient) {}

  getOrdersByOrderId(params: {
  orderId: string
}): Promise<{
  orderId: string
  sequence: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  createdAt: string
  updatedAt: string
  shippingEstimatedDateMin: string
  tags: string[]
  pickingTime: number
  packingTime: number
  shippingTime: number
  invoices: {
  invoiceKey: string
  invoiceTotal: number
}[]
  unhandledItems: {
  id: string
  sku: string
  referenceCode: string
  itemName: string
  price: number
  pickingPrice: number
  quantity: number
  originalQuantity: number
  replacedBy: string[]
  weighableProduct: boolean
  unitMultiplier: number
  originalUnitMultiplier: number
  unitOfMeasure: string
  images: string[]
  ean: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  packedQuantity: number
  reasons: {
  reasonType?: string
  reasonDetail?: string
}[]
  pickers: string[]
  worksheets: string[]
  warehouses: {
  warehouseId: string
  warehouseName: string
  quantity: number
}[]
  createdAt: string
}[]
  pickedItems: {
  id: string
  sku: string
  referenceCode: string
  itemName: string
  price: number
  pickingPrice: number
  quantity: number
  originalQuantity: number
  replacedBy: string[]
  weighableProduct: boolean
  unitMultiplier: number
  originalUnitMultiplier: number
  unitOfMeasure: string
  images: string[]
  ean: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  packedQuantity: number
  reasons: {
  reasonType?: string
  reasonDetail?: string
}[]
  pickers: string[]
  worksheets: string[]
  warehouses: {
  warehouseId: string
  warehouseName: string
  quantity: number
}[]
  createdAt: string
}[]
  rejectedItems: {
  id: string
  sku: string
  referenceCode: string
  itemName: string
  price: number
  pickingPrice: number
  quantity: number
  originalQuantity: number
  replacedBy: string[]
  weighableProduct: boolean
  unitMultiplier: number
  originalUnitMultiplier: number
  unitOfMeasure: string
  images: string[]
  ean: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  packedQuantity: number
  reasons: {
  reasonType?: string
  reasonDetail?: string
}[]
  pickers: string[]
  worksheets: string[]
  warehouses: {
  warehouseId: string
  warehouseName: string
  quantity: number
}[]
  createdAt: string
}[]
  replacedItems: {
  id: string
  referenceCode: string
  orderSource: string
  originalQuantity: number
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
}[]
  packages: {
  id: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  itemsIds: string[]
}[]
  payment: {
  paymentId: string
  paymentName: string
  transactionId: string
  currency: {
  symbol: string
  code: string
  decimalSeparator: string
  name: string
  decimalDigits: number
  groupSize: number
  groupSeparator: string
}
}[]
}> {
    return this.http.request<{
  orderId: string
  sequence: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  createdAt: string
  updatedAt: string
  shippingEstimatedDateMin: string
  tags: string[]
  pickingTime: number
  packingTime: number
  shippingTime: number
  invoices: {
  invoiceKey: string
  invoiceTotal: number
}[]
  unhandledItems: {
  id: string
  sku: string
  referenceCode: string
  itemName: string
  price: number
  pickingPrice: number
  quantity: number
  originalQuantity: number
  replacedBy: string[]
  weighableProduct: boolean
  unitMultiplier: number
  originalUnitMultiplier: number
  unitOfMeasure: string
  images: string[]
  ean: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  packedQuantity: number
  reasons: {
  reasonType?: string
  reasonDetail?: string
}[]
  pickers: string[]
  worksheets: string[]
  warehouses: {
  warehouseId: string
  warehouseName: string
  quantity: number
}[]
  createdAt: string
}[]
  pickedItems: {
  id: string
  sku: string
  referenceCode: string
  itemName: string
  price: number
  pickingPrice: number
  quantity: number
  originalQuantity: number
  replacedBy: string[]
  weighableProduct: boolean
  unitMultiplier: number
  originalUnitMultiplier: number
  unitOfMeasure: string
  images: string[]
  ean: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  packedQuantity: number
  reasons: {
  reasonType?: string
  reasonDetail?: string
}[]
  pickers: string[]
  worksheets: string[]
  warehouses: {
  warehouseId: string
  warehouseName: string
  quantity: number
}[]
  createdAt: string
}[]
  rejectedItems: {
  id: string
  sku: string
  referenceCode: string
  itemName: string
  price: number
  pickingPrice: number
  quantity: number
  originalQuantity: number
  replacedBy: string[]
  weighableProduct: boolean
  unitMultiplier: number
  originalUnitMultiplier: number
  unitOfMeasure: string
  images: string[]
  ean: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  packedQuantity: number
  reasons: {
  reasonType?: string
  reasonDetail?: string
}[]
  pickers: string[]
  worksheets: string[]
  warehouses: {
  warehouseId: string
  warehouseName: string
  quantity: number
}[]
  createdAt: string
}[]
  replacedItems: {
  id: string
  referenceCode: string
  orderSource: string
  originalQuantity: number
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
}[]
  packages: {
  id: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  itemsIds: string[]
}[]
  payment: {
  paymentId: string
  paymentName: string
  transactionId: string
  currency: {
  symbol: string
  code: string
  decimalSeparator: string
  name: string
  decimalDigits: number
  groupSize: number
  groupSeparator: string
}
}[]
}>({ method: 'GET', path: `/orders/${params.orderId}` })
  }

  patchOrdersByOrderIdTracking(params: {
  orderId: string
  body: {
  deliveredDate?: string
  events?: {
  city: string
  state: string
  description: string
  date: string
}[]
}
}): Promise<{
  deliveredDate?: string
  events?: {
  city: string
  state: string
  description: string
  date: string
}[]
  orderId?: string
}> {
    return this.http.request<{
  deliveredDate?: string
  events?: {
  city: string
  state: string
  description: string
  date: string
}[]
  orderId?: string
}>({ method: 'PATCH', path: `/orders/${params.orderId}/tracking`, body: params.body })
  }
}
class PickAndPackApi_worksheets {
  constructor(private http: VtexHttpClient) {}

  getWorksheetsByWorksheetId(params: {
  worksheetId: string
}): Promise<{
  id: string
  worksheetId: string
  initDate: string
  finishedDate: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  createdAt: string
  priority: number
  categoriesIds: string[]
  lastPickedItemTime: number
  finishEstimatedDate: string
  hostname: string
  pickerAssignment: {
  active: boolean
  assignmentDate: string
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
  method: "MANUAL" | "AUTOMATIC"
  pickerId: string
  finishedDate: string
}[]
  totalCompletedItems: number
  totalPackedItems: number
  updatedAt: string
  lastStatusChangeTime: number
  totalItems: number
  ordersIds: {
  totalValue: number
  orderId: string
  unitsQuantity: number
  itemsQuantity: number
  shippingEstimatedDate: string
  isInvoiced: boolean
  priority: number
}[]
  facilityId: string
  items: {
  id: string
  name: string
  image: string
  temperature?: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  categories: {
  id: string
  name: string
}[]
  itemAssignment: {
  startPickingAt: string
  assignedAt: string
  finishedAt: string
}
  originalQuantity: number
  completedQuantity: number
  pickedQuantity: number
  rejectedQuantity?: number
  replacedQuantity?: number
  orderSource: {
  orderId: string
  sellingPrice: number
  listPrice: number
  currencyCode: string
  status: "CREATED" | "PENDING" | "ASSIGNED" | "PICKED" | "ON_ROUTE" | "INCIDENT" | "RETURNED" | "DELIVERED" | "CANCELLED" | "ON_HOLD" | "TRANSFER"
  quantity: number
  pickedQuantity: number
  rejectedQuantity: number
  replacedQuantity: number
  replacedBy: string[]
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
}[]
}[]
  pickedItems: {
  id: string
  name: string
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  originalQuantity: number
  pickedQuantity: number
  packedQuantity: number
  orderSource: {
  orderId: string
  sellingPrice: number
  listPrice: number
  quantity: number
  pickedQuantity: number
  packedQuantity: number
  currencyCode: string
}[]
}[]
  rejectedItems: {
  id: string
  name: string
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  originalQuantity: number
  rejectedQuantity: number
  orderSource: {
  orderId: string
  quantity: number
  rejectedQuantity: number
  currencyCode: string
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
}[]
}[]
  replacedItems: {
  id: string
  name: string
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  originalQuantity: number
  replacedQuantity: number
  orderSource: {
  orderId: string
  sellingPrice?: number
  listPrice?: number
  quantity: number
  replacedQuantity: number
  currencyCode: string
  unitMultiplier?: number
  unitOfMeasure?: string
  originalUnitMultiplier?: number
  replacedBy?: string[]
  reasons?: {
  reasonType: string
  reasonDetail: string
}[]
}[]
}[]
}> {
    return this.http.request<{
  id: string
  worksheetId: string
  initDate: string
  finishedDate: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  createdAt: string
  priority: number
  categoriesIds: string[]
  lastPickedItemTime: number
  finishEstimatedDate: string
  hostname: string
  pickerAssignment: {
  active: boolean
  assignmentDate: string
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
  method: "MANUAL" | "AUTOMATIC"
  pickerId: string
  finishedDate: string
}[]
  totalCompletedItems: number
  totalPackedItems: number
  updatedAt: string
  lastStatusChangeTime: number
  totalItems: number
  ordersIds: {
  totalValue: number
  orderId: string
  unitsQuantity: number
  itemsQuantity: number
  shippingEstimatedDate: string
  isInvoiced: boolean
  priority: number
}[]
  facilityId: string
  items: {
  id: string
  name: string
  image: string
  temperature?: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  categories: {
  id: string
  name: string
}[]
  itemAssignment: {
  startPickingAt: string
  assignedAt: string
  finishedAt: string
}
  originalQuantity: number
  completedQuantity: number
  pickedQuantity: number
  rejectedQuantity?: number
  replacedQuantity?: number
  orderSource: {
  orderId: string
  sellingPrice: number
  listPrice: number
  currencyCode: string
  status: "CREATED" | "PENDING" | "ASSIGNED" | "PICKED" | "ON_ROUTE" | "INCIDENT" | "RETURNED" | "DELIVERED" | "CANCELLED" | "ON_HOLD" | "TRANSFER"
  quantity: number
  pickedQuantity: number
  rejectedQuantity: number
  replacedQuantity: number
  replacedBy: string[]
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
}[]
}[]
  pickedItems: {
  id: string
  name: string
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  originalQuantity: number
  pickedQuantity: number
  packedQuantity: number
  orderSource: {
  orderId: string
  sellingPrice: number
  listPrice: number
  quantity: number
  pickedQuantity: number
  packedQuantity: number
  currencyCode: string
}[]
}[]
  rejectedItems: {
  id: string
  name: string
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  originalQuantity: number
  rejectedQuantity: number
  orderSource: {
  orderId: string
  quantity: number
  rejectedQuantity: number
  currencyCode: string
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
}[]
}[]
  replacedItems: {
  id: string
  name: string
  image: string
  temperature: "COLD" | "FROZEN" | "AMBIENT" | "HOT"
  originalQuantity: number
  replacedQuantity: number
  orderSource: {
  orderId: string
  sellingPrice?: number
  listPrice?: number
  quantity: number
  replacedQuantity: number
  currencyCode: string
  unitMultiplier?: number
  unitOfMeasure?: string
  originalUnitMultiplier?: number
  replacedBy?: string[]
  reasons?: {
  reasonType: string
  reasonDetail: string
}[]
}[]
}[]
}>({ method: 'GET', path: `/worksheets/${params.worksheetId}` })
  }

  getWorksheets(params: {
  orderId: string
}): Promise<{
  id: string
  facilityId: string
  worksheetId: string
  categoriesIds: string[]
  finishedDate: string
  initDate: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  ordersIds: {
  orderId: string
  unitsQuantity: number
  itemsQuantity: number
}[]
  hostname: string
  items: {
  active: boolean
  assignmentDate: string
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
  method: "MANUAL" | "AUTOMATIC"
  pickerId: string
  finishedDate: string
}[]
  pickerAssignment: {
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
  method: "MANUAL" | "AUTOMATIC"
  active: boolean
  assignmentDate: string
  pickerId: string
  finishedDate?: string
}[]
  itemsQuantity: number
  unitsQuantity: number
  completedUnitsQuantity: number
  packedUnitsQuantity: number
  deliveryWindow: {
  minDate: string
  maxDate: string
}
  createdAt: string
}[]> {
    return this.http.request<{
  id: string
  facilityId: string
  worksheetId: string
  categoriesIds: string[]
  finishedDate: string
  initDate: string
  status: "IN_PROGRESS" | "PENDING" | "COLLECTED" | "COMPLETED" | "READY_FOR_PACKING" | "PACKING" | "PACKED" | "SORTING" | "CANCELLED" | "REJECTED"
  ordersIds: {
  orderId: string
  unitsQuantity: number
  itemsQuantity: number
}[]
  hostname: string
  items: {
  active: boolean
  assignmentDate: string
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
  method: "MANUAL" | "AUTOMATIC"
  pickerId: string
  finishedDate: string
}[]
  pickerAssignment: {
  notes: {
  date?: string
  type?: "COMMENT" | "ERROR"
  content?: string
  author?: string
}[]
  method: "MANUAL" | "AUTOMATIC"
  active: boolean
  assignmentDate: string
  pickerId: string
  finishedDate?: string
}[]
  itemsQuantity: number
  unitsQuantity: number
  completedUnitsQuantity: number
  packedUnitsQuantity: number
  deliveryWindow: {
  minDate: string
  maxDate: string
}
  createdAt: string
}[]>({ method: 'GET', path: `/worksheets`, query: { 'orderId': params.orderId } })
  }
}
class PickAndPackApi_facilities {
  constructor(private http: VtexHttpClient) {}

  getFacilitiesByFacilityId(params: {
  facilityId: string
}): Promise<{
  id: string
  address: string
  addressComplement: string
  city: string
  contactInformation: {
  email: string
  name: string
  phone: string
}
  country: string
  location: {
  latitude: number
  longitude: number
}
  name: string
  neighborhood: string
  number: string
  postalCode: string
  reference: string
  state: string
}> {
    return this.http.request<{
  id: string
  address: string
  addressComplement: string
  city: string
  contactInformation: {
  email: string
  name: string
  phone: string
}
  country: string
  location: {
  latitude: number
  longitude: number
}
  name: string
  neighborhood: string
  number: string
  postalCode: string
  reference: string
  state: string
}>({ method: 'GET', path: `/facilities/${params.facilityId}` })
  }
}
class PickAndPackApi_shipments {
  constructor(private http: VtexHttpClient) {}

  getShipmentsByShipmentId(params: {
  shipmentId: number
}): Promise<{
  id: string
  orderId: string
  carrierId: string
  serviceId: string
  carrierName: string
  seller: string
  status: "CREATED" | "PENDING" | "ASSIGNED" | "PICKED" | "ON_ROUTE" | "INCIDENT" | "RETURNED" | "DELIVERED" | "CANCELLED" | "ON_HOLD" | "TRANSFER"
  agent: {
  id: string
  name: string
  vehicle: "SCOOTER" | "VAN" | "CAR" | "TRUCK" | "BIKE" | "WALK" | "DRONE"
}
  trackingUrl: string
  totalDistanceTraveled: number
  comments: string
  evidences: {
  date: string
  type: string
  content: string
  author: string
}[]
  packages: {
  totalValue: number
  envelope: string
  orderId: string
  weight: string
  description: string
  id: string
  categories: string[]
  items: {
  name: string
  image: string
  ean: string
  quantity: number
  id: string
  price: number
}[]
  dimensions: {
  width: string
  length: string
  height: string
}
}[]
  type: "PICKUP" | "DELIVERY" | "PICKUP_DELIVERY" | "TRANSFER" | "RETURN"
  notes: {
  date: string
  type: "COMMENT"
  content: string
  author: string
}[]
  paymentMethod: "ONLINE" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "OTHER"
  carrierServiceType: "LOCAL" | "NATIONAL" | "INTERNATIONAL"
  timezone: {
  offset: number
  value: string
}
  tags: string[]
  deliveredDate: string
  sender: {
  name: string
  city: string
  state: string
  country: string
  pickupDate: string
  zipCode: string
}
  receiver: {
  name: string
  city: string
  state: string
  country: string
  deliveryDate: string
  zipCode: string
}
  labels: {
  id?: string
  type?: "PDF" | "BASE64" | "TEXT" | "ZPL"
  url?: string
  name?: string
}[]
}> {
    return this.http.request<{
  id: string
  orderId: string
  carrierId: string
  serviceId: string
  carrierName: string
  seller: string
  status: "CREATED" | "PENDING" | "ASSIGNED" | "PICKED" | "ON_ROUTE" | "INCIDENT" | "RETURNED" | "DELIVERED" | "CANCELLED" | "ON_HOLD" | "TRANSFER"
  agent: {
  id: string
  name: string
  vehicle: "SCOOTER" | "VAN" | "CAR" | "TRUCK" | "BIKE" | "WALK" | "DRONE"
}
  trackingUrl: string
  totalDistanceTraveled: number
  comments: string
  evidences: {
  date: string
  type: string
  content: string
  author: string
}[]
  packages: {
  totalValue: number
  envelope: string
  orderId: string
  weight: string
  description: string
  id: string
  categories: string[]
  items: {
  name: string
  image: string
  ean: string
  quantity: number
  id: string
  price: number
}[]
  dimensions: {
  width: string
  length: string
  height: string
}
}[]
  type: "PICKUP" | "DELIVERY" | "PICKUP_DELIVERY" | "TRANSFER" | "RETURN"
  notes: {
  date: string
  type: "COMMENT"
  content: string
  author: string
}[]
  paymentMethod: "ONLINE" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "OTHER"
  carrierServiceType: "LOCAL" | "NATIONAL" | "INTERNATIONAL"
  timezone: {
  offset: number
  value: string
}
  tags: string[]
  deliveredDate: string
  sender: {
  name: string
  city: string
  state: string
  country: string
  pickupDate: string
  zipCode: string
}
  receiver: {
  name: string
  city: string
  state: string
  country: string
  deliveryDate: string
  zipCode: string
}
  labels: {
  id?: string
  type?: "PDF" | "BASE64" | "TEXT" | "ZPL"
  url?: string
  name?: string
}[]
}>({ method: 'GET', path: `/shipments/${params.shipmentId}` })
  }

  getShipments(params: {
  orderId: string
}): Promise<{
  id: string
  serviceId: string
  orderId: string
  carrierId: string
  status: "CREATED" | "PENDING" | "ASSIGNED" | "PICKED" | "ON_ROUTE" | "INCIDENT" | "RETURNED" | "DELIVERED" | "CANCELLED" | "ON_HOLD" | "TRANSFER"
  carrierName: string
  paymentMethod: "ONLINE" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "OTHER"
  tags: string[]
  deliveredDate: string
  customerId: string
  customerAddressId: string
  source: string
  destination: string
  courierId: string
  courierName: string
  seller: string
  packagesQuantity: number
  itemsQuantity: number
  serviceType: "PICKUP_DELIVERY" | "DELIVERY" | "PICKUP"
  creationDate: string
}[]> {
    return this.http.request<{
  id: string
  serviceId: string
  orderId: string
  carrierId: string
  status: "CREATED" | "PENDING" | "ASSIGNED" | "PICKED" | "ON_ROUTE" | "INCIDENT" | "RETURNED" | "DELIVERED" | "CANCELLED" | "ON_HOLD" | "TRANSFER"
  carrierName: string
  paymentMethod: "ONLINE" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "OTHER"
  tags: string[]
  deliveredDate: string
  customerId: string
  customerAddressId: string
  source: string
  destination: string
  courierId: string
  courierName: string
  seller: string
  packagesQuantity: number
  itemsQuantity: number
  serviceType: "PICKUP_DELIVERY" | "DELIVERY" | "PICKUP"
  creationDate: string
}[]>({ method: 'GET', path: `/shipments`, query: { 'orderId': params.orderId } })
  }
}

export class PickAndPackApi {
  readonly authentication: PickAndPackApi_authentication
  readonly orders: PickAndPackApi_orders
  readonly worksheets: PickAndPackApi_worksheets
  readonly facilities: PickAndPackApi_facilities
  readonly shipments: PickAndPackApi_shipments
  constructor(http: VtexHttpClient) {
    this.authentication = new PickAndPackApi_authentication(http)
    this.orders = new PickAndPackApi_orders(http)
    this.worksheets = new PickAndPackApi_worksheets(http)
    this.facilities = new PickAndPackApi_facilities(http)
    this.shipments = new PickAndPackApi_shipments(http)
  }
}
