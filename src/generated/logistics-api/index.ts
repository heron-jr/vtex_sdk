import type { VtexHttpClient } from '../../core/http.js'
import type { PickupPoint, ListDocksById, DeliveryCapacity, ShippingPolicy } from './types.js'

class LogisticsApi_shippingPolicies {
  constructor(private http: VtexHttpClient) {}

  getApiLogisticsPvtShippingPoliciesById(params: {
  id: string
}): Promise<ShippingPolicy> {
    return this.http.request<ShippingPolicy>({ method: 'GET', path: `/api/logistics/pvt/shipping-policies/${params.id}` })
  }

  putApiLogisticsPvtShippingPoliciesById(params: {
  id: string
  body: {
  name: string
  shippingMethod: string
  deliveryOnWeekends: boolean
  maxDimension: {
  largestMeasure: number
  maxMeasureSum: number
}
  cubicWeightSettings?: {
  volumetricFactor?: number
  minimunAcceptableVolumetricWeight?: number
}
  modalSettings?: {
  modals?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"[]
  useOnlyItemsWithDefinedModal?: boolean
}
  isActive: boolean
  deliveryScheduleSettings?: {
  useDeliverySchedule: boolean
  maxRangeDelivery: number
  dayOfWeekForDelivery: {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
  deliveryRanges: {
  startTime: string
  endTime: string
  listPrice: number
  deliveryCapacity?: {
  capacityType: string
  maxValue: number
}[]
}[]
}[]
}
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/logistics/pvt/shipping-policies/${params.id}`, body: params.body })
  }

  deleteApiLogisticsPvtShippingPoliciesById(params: {
  id: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/logistics/pvt/shipping-policies/${params.id}` })
  }

  getApiLogisticsPvtShippingPolicies(params: {
  page?: number
  perPage?: number
}): Promise<{
  items?: ShippingPolicy[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}> {
    return this.http.request<{
  items?: ShippingPolicy[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}>({ method: 'GET', path: `/api/logistics/pvt/shipping-policies`, query: { 'page': params.page, 'perPage': params.perPage } })
  }

  postApiLogisticsPvtShippingPolicies(params: {
  body: {
  id: string
  name: string
  shippingMethod: string
  weekendAndHolidays: {
  saturday: boolean
  sunday: boolean
  holiday: boolean
}
  maxDimension: {
  largestMeasure: number
  maxMeasureSum: number
}
  numberOfItemsPerShipment: number
  minimumValueAceptable: number
  maximumValueAceptable: number
  deliveryScheduleSettings: {
  useDeliverySchedule: boolean
  maxRangeDelivery: number
  dayOfWeekForDelivery: {
  dayOfWeek: number
  deliveryRanges: {
  startTime: string
  endTime: string
  listPrice: number
  deliveryCapacity?: {
  capacityType: string
  maxValue: number
}[]
}[]
}[]
}
  carrierSchedule?: {
  dayOfWeek?: number
  timeLimit?: string
}[]
  cubicWeightSettings: {
  volumetricFactor: number
  minimunAcceptableVolumetricWeight: number
}
  modalSettings: {
  modals: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"[]
  useOnlyItemsWithDefinedModal: boolean
}
  businessHourSettings: {
  carrierBusinessHours: {
  openingTime: string
  closingTime: string
  dayOfWeek: number
}[]
  isOpenOutsideBusinessHours: boolean
}
  pickupPointsSettings: {
  pickupPointIds: string[]
  pickupPointTags: string[]
  sellers: string[]
}
  isActive: boolean
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/shipping-policies`, body: params.body })
  }
}
class LogisticsApi_freightValues {
  constructor(private http: VtexHttpClient) {}

  createUpdateFreightValues(params: {
  carrierId: string
  body: {
  absoluteMoneyCost: string
  country: string
  maxVolume: number
  operationType: number
  pricePercent: number
  pricePercentByWeight: number
  timeCost: string
  weightEnd: number
  weightStart: number
  zipCodeEnd: string
  zipCodeStart: string
  polygon: string
}[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/configuration/freights/${params.carrierId}/values/update`, body: params.body })
  }

  freightValues(params: {
  carrierId: string
  postalcode: string
}): Promise<{
  zipCodeStart: string
  zipCodeEnd: string
  weightStart: number
  weightEnd: number
  absoluteMoneyCost: number
  pricePercent: number
  pricePercentByWeight: number
  maxVolume: number
  timeCost: string
  country: string
  operationType: number
  restrictedFreights: string[]
  polygon: string
  minimumValueInsurance: number
}[]> {
    return this.http.request<{
  zipCodeStart: string
  zipCodeEnd: string
  weightStart: number
  weightEnd: number
  absoluteMoneyCost: number
  pricePercent: number
  pricePercentByWeight: number
  maxVolume: number
  timeCost: string
  country: string
  operationType: number
  restrictedFreights: string[]
  polygon: string
  minimumValueInsurance: number
}[]>({ method: 'GET', path: `/api/logistics/pvt/configuration/freights/${params.carrierId}/${params.postalcode}/values` })
  }
}
class LogisticsApi_scheduledDelivery {
  constructor(private http: VtexHttpClient) {}

  retrieveBlockedDeliveryWindows(params: {
  carrierId: string
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'GET', path: `/api/logistics/pvt/configuration/carriers/${params.carrierId}/getdayofweekblocked` })
  }

  addBlockedDeliveryWindows(params: {
  carrierId: string
  body: string
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'POST', path: `/api/logistics/pvt/configuration/carriers/${params.carrierId}/adddayofweekblocked`, body: params.body })
  }

  removeBlockedDeliveryWindows(params: {
  carrierId: string
  body: string
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'POST', path: `/api/logistics/pvt/configuration/carriers/${params.carrierId}/removedayofweekblocked`, body: params.body })
  }

  getApiLogisticsCapacityResourcesCarrierCapacityTypeShippingPolicyIdTimeFrames(params: {
  capacityType: string
  shippingPolicyId: string
  rangeStart: string
  rangeEnd: string
}): Promise<DeliveryCapacity> {
    return this.http.request<DeliveryCapacity>({ method: 'GET', path: `/api/logistics-capacity/resources/carrier@${params.capacityType}@${params.shippingPolicyId}/time-frames`, query: { 'rangeStart': params.rangeStart, 'rangeEnd': params.rangeEnd } })
  }

  getApiLogisticsCapacityResourcesCarrierCapacityTypeShippingPolicyIdTimeFramesByWindowDayFWindowStartTimeTWindowEndTime(params: {
  capacityType: string
  shippingPolicyId: string
  windowDay: string
  windowStartTime: string
  windowEndTime: string
}): Promise<DeliveryCapacity> {
    return this.http.request<DeliveryCapacity>({ method: 'GET', path: `/api/logistics-capacity/resources/carrier@${params.capacityType}@${params.shippingPolicyId}/time-frames/${params.windowDay}F${params.windowStartTime}T${params.windowEndTime}` })
  }
}
class LogisticsApi_docks {
  constructor(private http: VtexHttpClient) {}

  allDocks(params: Record<string, never>): Promise<ListDocksById[]> {
    return this.http.request<ListDocksById[]>({ method: 'GET', path: `/api/logistics/pvt/configuration/docks` })
  }

  createUpdateDock(params: {
  body: {
  id: string
  name: string
  priority: number
  dockTimeFake: string
  timeFakeOverhead: string
  salesChannels: string[]
  salesChannel: string
  freightTableIds: string[]
  wmsEndPoint: string
  address: {
  postalCode: string
  country: {
  acronym: string
  name: string
}
  city: string
  state: string
  neighborhood: string
  street: string
  number: string
  complement: string
  coordinates: number[][]
}
}
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'POST', path: `/api/logistics/pvt/configuration/docks`, body: params.body })
  }

  dockById(params: {
  dockId: string
}): Promise<ListDocksById> {
    return this.http.request<ListDocksById>({ method: 'GET', path: `/api/logistics/pvt/configuration/docks/${params.dockId}` })
  }

  dock(params: {
  dockId: string
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'DELETE', path: `/api/logistics/pvt/configuration/docks/${params.dockId}` })
  }

  activateDock(params: {
  dockId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/configuration/docks/${params.dockId}/activation` })
  }

  deactivateDock(params: {
  dockId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/configuration/docks/${params.dockId}/deactivation` })
  }
}
class LogisticsApi_warehouses {
  constructor(private http: VtexHttpClient) {}

  allWarehouses(params: Record<string, never>): Promise<{
  id?: string
  name?: string
  warehouseDocks?: {
  dockId?: string
  time?: string
  cost?: number
}[]
  pickupPointIds?: string[]
  priority?: number
  isActive?: boolean
}[]> {
    return this.http.request<{
  id?: string
  name?: string
  warehouseDocks?: {
  dockId?: string
  time?: string
  cost?: number
}[]
  pickupPointIds?: string[]
  priority?: number
  isActive?: boolean
}[]>({ method: 'GET', path: `/api/logistics/pvt/configuration/warehouses` })
  }

  createUpdateWarehouse(params: {
  body: {
  id: string
  name: string
  warehouseDocks: {
  dockId: string
  name: string
  time: string
  cost: string
  translateDays: string
  costToDisplay: string
}[]
  priority?: number
  isActive?: boolean
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/configuration/warehouses`, body: params.body })
  }

  warehouseById(params: {
  warehouseId: string
}): Promise<{
  id?: string
  name?: string
  warehouseDocks?: {
  dockId?: string
  time?: string
  cost?: number
}[]
  pickupPointIds?: string[]
  priority?: number
  isActive?: boolean
}> {
    return this.http.request<{
  id?: string
  name?: string
  warehouseDocks?: {
  dockId?: string
  time?: string
  cost?: number
}[]
  pickupPointIds?: string[]
  priority?: number
  isActive?: boolean
}>({ method: 'GET', path: `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}` })
  }

  removeWarehouse(params: {
  warehouseId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}` })
  }

  activateWarehouse(params: {
  warehouseId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}/activation` })
  }

  deactivateWarehouse(params: {
  warehouseId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}/deactivation` })
  }
}
class LogisticsApi_inventory {
  constructor(private http: VtexHttpClient) {}

  inventoryBySku(params: {
  skuId: string
}): Promise<{
  skuId?: string
  balance?: {
  warehouseId?: string
  warehouseName?: string
  totalQuantity?: number
  reservedQuantity?: number
  hasUnlimitedQuantity?: boolean
  timeToRefill?: string
  dateOfSupplyUtc?: string
  leadTime?: string
}[]
}> {
    return this.http.request<{
  skuId?: string
  balance?: {
  warehouseId?: string
  warehouseName?: string
  totalQuantity?: number
  reservedQuantity?: number
  hasUnlimitedQuantity?: boolean
  timeToRefill?: string
  dateOfSupplyUtc?: string
  leadTime?: string
}[]
}>({ method: 'GET', path: `/api/logistics/pvt/inventory/skus/${params.skuId}` })
  }

  inventoryperwarehouse(params: {
  skuId: string
  warehouseId: string
}): Promise<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannel?: string[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
}[]> {
    return this.http.request<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannel?: string[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
}[]>({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}` })
  }

  updateInventoryBySkuandWarehouse(params: {
  skuId: string
  warehouseId: string
  body: {
  quantity: number
  unlimitedQuantity: boolean
  dateUtcOnBalanceSystem?: string
  leadTime: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/logistics/pvt/inventory/skus/${params.skuId}/warehouses/${params.warehouseId}`, body: params.body })
  }

  patchApiLogisticsPvtInventorySkusBySkuIdWarehousesByWarehouseIdQuantity(params: {
  skuId: string
  warehouseId: string
  body: {
  quantity: number
  unlimitedQuantity: boolean
  dateUtcOnBalanceSystem?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/logistics/pvt/inventory/skus/${params.skuId}/warehouses/${params.warehouseId}/quantity`, body: params.body })
  }

  patchApiLogisticsPvtInventorySkusBySkuIdWarehousesByWarehouseIdLeadTime(params: {
  skuId: string
  warehouseId: string
  body: {
  leadTime: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/logistics/pvt/inventory/skus/${params.skuId}/warehouses/${params.warehouseId}/lead-time`, body: params.body })
  }

  inventoryperdock(params: {
  skuId: string
  dockId: string
}): Promise<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannel?: string[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
}[]> {
    return this.http.request<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannel?: string[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
}[]>({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${params.skuId}/docks/${params.dockId}` })
  }

  inventoryperdockandwarehouse(params: {
  skuId: string
  dockId: string
  warehouseId: string
}): Promise<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannel?: string[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
}[]> {
    return this.http.request<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannel?: string[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
}[]>({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${params.skuId}/docks/${params.dockId}/warehouses/${params.warehouseId}` })
  }

  getinventorywithdispatchedreservations(params: {
  itemId: string
  warehouseId: string
}): Promise<{
  skuId?: string
  warehouseId?: string
  quantity?: number
  isUnlimitedQuantity?: boolean
  totalReservedQuantity?: number
  dispatchedReservationsQuantity?: number
  availableQuantity?: number
}[]> {
    return this.http.request<{
  skuId?: string
  warehouseId?: string
  quantity?: number
  isUnlimitedQuantity?: boolean
  totalReservedQuantity?: number
  dispatchedReservationsQuantity?: number
  availableQuantity?: number
}[]>({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${params.itemId}/warehouses/${params.warehouseId}/dispatched` })
  }

  getSupplyLots(params: {
  skuId: string
  warehouseId: string
}): Promise<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannels?: "delivery" | "pickup"[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  supplyLotId?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
  leadTime?: string
}[]> {
    return this.http.request<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannels?: "delivery" | "pickup"[]
  timeToRefill?: string
  dateOfSupplyUtc?: string
  supplyLotId?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string
  leadTime?: string
}[]>({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}/supplyLots` })
  }

  saveSupplyLot(params: {
  skuId: string
  warehouseId: string
  supplyLotId: string
  body: {
  quantity: number
  dateOfSupplyUtc: string
  keepSellingAfterExpiration?: boolean
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}/supplyLots/${params.supplyLotId}`, body: params.body })
  }

  transferSupplyLot(params: {
  skuId: string
  warehouseId: string
  supplyLotId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}/supplyLots/${params.supplyLotId}/transfer` })
  }
}
class LogisticsApi_batchOperations {
  constructor(private http: VtexHttpClient) {}

  postAvailabilityV1InventoryBatch(params: Record<string, never>): Promise<{
  batchId: string
  status: "AWAITING_UPLOAD"
  upload: {
  method: "PUT"
  url: string
  headers: {
  "Content-Type": "text/csv"
}
  expiresAt: string
}
}> {
    return this.http.request<{
  batchId: string
  status: "AWAITING_UPLOAD"
  upload: {
  method: "PUT"
  url: string
  headers: {
  "Content-Type": "text/csv"
}
  expiresAt: string
}
}>({ method: 'POST', path: `/availability/v1/inventory/batch` })
  }

  postAvailabilityV1InventoryBatchByBatchIdCommit(params: {
  batchId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/availability/v1/inventory/batch/${params.batchId}/commit` })
  }

  getAvailabilityV1InventoryBatchByBatchIdStatus(params: {
  batchId: string
}): Promise<{
  batchId: string
  status: "AWAITING_UPLOAD" | "QUEUED" | "PROCESSING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED" | "EXPIRED"
  rowCount: number
  processedCount: number
  errorCount: number
  amountCompleted: number
  createdAt: string
  startedAt?: string
  stages?: {
  ingestedChunks: number
  classifiedChunks: number
  processedChunks: number
  notifiedChunks: number
  totalChunks: number
}
  summary?: {
  insertCount: number
  updateCount: number
  noopCount: number
  conflictCount: number
  skippedDueApiUpdateCount: number
  perItemRoutedCount: number
  dlqEventsCount: number
}
}> {
    return this.http.request<{
  batchId: string
  status: "AWAITING_UPLOAD" | "QUEUED" | "PROCESSING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED" | "EXPIRED"
  rowCount: number
  processedCount: number
  errorCount: number
  amountCompleted: number
  createdAt: string
  startedAt?: string
  stages?: {
  ingestedChunks: number
  classifiedChunks: number
  processedChunks: number
  notifiedChunks: number
  totalChunks: number
}
  summary?: {
  insertCount: number
  updateCount: number
  noopCount: number
  conflictCount: number
  skippedDueApiUpdateCount: number
  perItemRoutedCount: number
  dlqEventsCount: number
}
}>({ method: 'GET', path: `/availability/v1/inventory/batch/${params.batchId}/status` })
  }

  getAvailabilityV1InventoryBatchByBatchIdErrors(params: {
  batchId: string
}): Promise<{
  batchId: string
  downloadUrl: string
  errorCount: number
}> {
    return this.http.request<{
  batchId: string
  downloadUrl: string
  errorCount: number
}>({ method: 'GET', path: `/availability/v1/inventory/batch/${params.batchId}/errors` })
  }
}
class LogisticsApi_holidays {
  constructor(private http: VtexHttpClient) {}

  holidayById(params: {
  holidayId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/logistics/pvt/configuration/holidays/${params.holidayId}` })
  }

  createUpdateHoliday(params: {
  holidayId: string
  body: {
  name: string
  startDate: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/logistics/pvt/configuration/holidays/${params.holidayId}`, body: params.body })
  }

  holiday(params: {
  holidayId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/logistics/pvt/configuration/holidays/${params.holidayId}` })
  }

  allHolidays(params: Record<string, never>): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/logistics/pvt/configuration/holidays` })
  }
}
class LogisticsApi_reservations {
  constructor(private http: VtexHttpClient) {}

  createReservation(params: {
  body: {
  salesChannel: string
  lockId: string
  autorizationExpirationTTL: string
  deliveryItemOptions: {
  item: {
  id: string
  quantity: number
  kitItem: string[]
  price: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"
  additionalHandlingTime: string
  dimension: {
  weight: number
  height: number
  width: number
  length: number
}
}
  slaType: string
  slaTypeName: string
  listPrice: number
  promotionalPrice: number
  transitTime: string
  dockTime: string
  timeToDockPlusDockTime: string
  aditionalTimeBlockedDays: string
  totalTime: string
  deliveryWindows: {
  startDateUtc?: string
  endDateUtc?: string
  listPrice?: string
}[]
  wareHouseId: string
  dockId: string
  location: {
  zipCode: string
  country: string
  inStore: {
  IsCheckedIn: boolean
  StoreId: string
}
}
}[]
}
}): Promise<{
  LastUpdateDateUtc?: string
  SalesChannel?: string
  LockId?: string
  ReservationDateUtc?: string
  MaximumConfirmationDateUtc?: string
  Status?: number
  SlaRequest?: {
  item?: {
  id?: string
  groupItemId?: string
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[]
  unlimitedQuantity?: boolean
}
  slaType?: string
  slaTypeName?: string
  freightTableName?: string
  freightTableId?: string
  listPrice?: number
  promotionalPrice?: number
  transitTime?: string
  dockTime?: string
  timeToDockPlusDockTime?: string
  totalTime?: string
  deliveryWindows?: Record<string, unknown>
  wareHouseId?: string
  dockId?: string
  wmsEndPoint?: string
  location?: {
  zipCode?: string
  country?: string
  deliveryPointId?: string
  point?: number[]
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string
}
}
  pickupStoreInfo?: string
}[]
  PickupPointItemOptions?: string
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: string[]
  IsSucess?: boolean
}> {
    return this.http.request<{
  LastUpdateDateUtc?: string
  SalesChannel?: string
  LockId?: string
  ReservationDateUtc?: string
  MaximumConfirmationDateUtc?: string
  Status?: number
  SlaRequest?: {
  item?: {
  id?: string
  groupItemId?: string
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[]
  unlimitedQuantity?: boolean
}
  slaType?: string
  slaTypeName?: string
  freightTableName?: string
  freightTableId?: string
  listPrice?: number
  promotionalPrice?: number
  transitTime?: string
  dockTime?: string
  timeToDockPlusDockTime?: string
  totalTime?: string
  deliveryWindows?: Record<string, unknown>
  wareHouseId?: string
  dockId?: string
  wmsEndPoint?: string
  location?: {
  zipCode?: string
  country?: string
  deliveryPointId?: string
  point?: number[]
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string
}
}
  pickupStoreInfo?: string
}[]
  PickupPointItemOptions?: string
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: string[]
  IsSucess?: boolean
}>({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations`, body: params.body })
  }

  reservationById(params: {
  reservationId: string
}): Promise<{
  LastUpdateDateUtc?: string
  SalesChannel?: string
  LockId?: string
  ReservationDateUtc?: string
  MaximumConfirmationDateUtc?: string
  Status?: number
  SlaRequest?: {
  item?: {
  id?: string
  groupItemId?: string
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[]
  unlimitedQuantity?: boolean
  dockId?: string
  wareHouseId?: string
  provider?: string
}
  slaType?: string
  slaTypeName?: string
  freightTableName?: string
  freightTableId?: string
  listPrice?: number
  promotionalPrice?: number
  timeToPresale?: string
  transitTime?: string
  dockTime?: string
  timeToDockPlusDockTime?: string
  totalTime?: string
  deliveryWindows?: Record<string, unknown>
  wareHouseId?: string
  kitReservation?: string
  dockId?: string
  wmsEndPoint?: string
  location?: {
  zipCode?: string
  country?: string
  point?: number[]
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string
}
}
  pickupStoreInfo?: string
  deliveryOnWeekends?: boolean
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
}
  estimateDate?: string
  deliveryChannel?: string
  totalTimePlusCarrierSchedule?: string
  polygonName?: string
  distanceLevel?: string
  accountCarrier?: string
  dateOfSupplyUtc?: string
  supplyLotId?: string
  isExternal?: boolean
}[]
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: string[]
  IsSucess?: boolean
}> {
    return this.http.request<{
  LastUpdateDateUtc?: string
  SalesChannel?: string
  LockId?: string
  ReservationDateUtc?: string
  MaximumConfirmationDateUtc?: string
  Status?: number
  SlaRequest?: {
  item?: {
  id?: string
  groupItemId?: string
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[]
  unlimitedQuantity?: boolean
  dockId?: string
  wareHouseId?: string
  provider?: string
}
  slaType?: string
  slaTypeName?: string
  freightTableName?: string
  freightTableId?: string
  listPrice?: number
  promotionalPrice?: number
  timeToPresale?: string
  transitTime?: string
  dockTime?: string
  timeToDockPlusDockTime?: string
  totalTime?: string
  deliveryWindows?: Record<string, unknown>
  wareHouseId?: string
  kitReservation?: string
  dockId?: string
  wmsEndPoint?: string
  location?: {
  zipCode?: string
  country?: string
  point?: number[]
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string
}
}
  pickupStoreInfo?: string
  deliveryOnWeekends?: boolean
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
}
  estimateDate?: string
  deliveryChannel?: string
  totalTimePlusCarrierSchedule?: string
  polygonName?: string
  distanceLevel?: string
  accountCarrier?: string
  dateOfSupplyUtc?: string
  supplyLotId?: string
  isExternal?: boolean
}[]
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: string[]
  IsSucess?: boolean
}>({ method: 'GET', path: `/api/logistics/pvt/inventory/reservations/${params.reservationId}` })
  }

  confirmReservation(params: {
  reservationId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations/${params.reservationId}/confirm` })
  }

  acknowledgmentReservation(params: {
  reservationId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations/${params.reservationId}/acknowledge` })
  }

  cancelReservation(params: {
  reservationId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations/${params.reservationId}/cancel` })
  }

  reservationbyWarehouseandSku(params: {
  warehouseId: string
  skuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/logistics/pvt/inventory/reservations/${params.warehouseId}/${params.skuId}` })
  }
}
class LogisticsApi_sla {
  constructor(private http: VtexHttpClient) {}

  calculateSLA(params: {
  body: {
  items: {
  id: string
  quantity: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS"
  additionalHandlingTime?: string
  dimension: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: {
  id: string
  groupItemId?: string
  kitItem?: string[]
  quantity: number
  price?: number
  additionalHandlingTime?: string
  dimension: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
}[]
  dockId?: string
  wareHouseId?: string
}[]
  location: {
  zipCode: string
  country: string
  point?: number[]
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string
}
}
  salesChannel?: string
  deliveryChannel?: string
}[]
}): Promise<{
  itemId?: string
  quantity?: number
  kitItem?: {
  id?: string
  quantity?: number
  warehouseId?: string
  supplyLotId?: string
}[]
  availabilityQuantity?: number
  salesChannel?: string
  slaType?: string
  slaTypeName?: string
  freightTableName?: string
  freightTableId?: string
  listPrice?: number
  transitTime?: string
  dockTime?: string
  timeToDockPlusDockTime?: string
  aditionalTimeBlockedDays?: string
  leadTime?: string
  totalTime?: string
  deliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  listPrice?: number
}[]
  wareHouseId?: string
  dockId?: string
  location?: {
  zipCode?: string
  country?: string
  point?: number[]
  inStore?: {
  isCheckedIn?: boolean
  storeId?: string
}
}
  deliveryOnWeekends?: boolean
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
}
  carrierSchedule?: {
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  timeLimit?: string
}[]
  totalTimePlusCarrierSchedule?: string
  restrictedFreight?: string[]
  coordinates?: number[]
  pickupStoreInfo?: {
  isPickupStore?: boolean
  storeId?: string
  friendlyName?: string
  address?: {
  postalCode?: string
  country?: {
  acronym?: string
  name?: string
}
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
  additionalInfo?: string
  dockId?: string
  distance?: number
  businessHours?: string
  pickupHolidays?: string
  sellerId?: string
  isThirdPartyPickup?: boolean
}
  timeToPresale?: string
  deliveryChannel?: string
  availabilityQuantityByDeliveryChannel?: number
  polygonName?: string
  distanceLevel?: string
  accountCarrier?: string
  carrierBusinessHours?: {
  openingTime?: string
  closingTime?: string
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}[]
  provider?: string
  dateOfSupplyUtc?: string
  estimateDate?: string
  supplyLotId?: string
  isExternal?: boolean
}[][]> {
    return this.http.request<{
  itemId?: string
  quantity?: number
  kitItem?: {
  id?: string
  quantity?: number
  warehouseId?: string
  supplyLotId?: string
}[]
  availabilityQuantity?: number
  salesChannel?: string
  slaType?: string
  slaTypeName?: string
  freightTableName?: string
  freightTableId?: string
  listPrice?: number
  transitTime?: string
  dockTime?: string
  timeToDockPlusDockTime?: string
  aditionalTimeBlockedDays?: string
  leadTime?: string
  totalTime?: string
  deliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  listPrice?: number
}[]
  wareHouseId?: string
  dockId?: string
  location?: {
  zipCode?: string
  country?: string
  point?: number[]
  inStore?: {
  isCheckedIn?: boolean
  storeId?: string
}
}
  deliveryOnWeekends?: boolean
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
}
  carrierSchedule?: {
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  timeLimit?: string
}[]
  totalTimePlusCarrierSchedule?: string
  restrictedFreight?: string[]
  coordinates?: number[]
  pickupStoreInfo?: {
  isPickupStore?: boolean
  storeId?: string
  friendlyName?: string
  address?: {
  postalCode?: string
  country?: {
  acronym?: string
  name?: string
}
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
  additionalInfo?: string
  dockId?: string
  distance?: number
  businessHours?: string
  pickupHolidays?: string
  sellerId?: string
  isThirdPartyPickup?: boolean
}
  timeToPresale?: string
  deliveryChannel?: string
  availabilityQuantityByDeliveryChannel?: number
  polygonName?: string
  distanceLevel?: string
  accountCarrier?: string
  carrierBusinessHours?: {
  openingTime?: string
  closingTime?: string
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}[]
  provider?: string
  dateOfSupplyUtc?: string
  estimateDate?: string
  supplyLotId?: string
  isExternal?: boolean
}[][]>({ method: 'POST', path: `/api/logistics/pvt/shipping/calculate`, body: params.body })
  }
}
class LogisticsApi_pickupPoints {
  constructor(private http: VtexHttpClient) {}

  listAllPickupPpoints(params: Record<string, never>): Promise<PickupPoint[]> {
    return this.http.request<PickupPoint[]>({ method: 'GET', path: `/api/logistics/pvt/configuration/pickuppoints` })
  }

  getById(params: {
  pickupPointId: string
}): Promise<PickupPoint> {
    return this.http.request<PickupPoint>({ method: 'GET', path: `/api/logistics/pvt/configuration/pickuppoints/${params.pickupPointId}` })
  }

  createUpdatePickupPoint(params: {
  pickupPointId: string
  body: {
  id: string
  name: string
  description: string
  instructions: string
  formatted_address: string
  address: {
  postalCode: string
  country: {
  acronym: string
  name: string
}
  city: string
  state: string
  neighborhood: string
  street: string
  number: string
  complement: string
  reference: string
  location: {
  latitude: number
  longitude: number
}
}
  isActive: boolean
  businessHours: {
  dayOfWeek: 1 | 2 | 3 | 4 | 5
  openingTime: string
  closingTime: string
}[]
  tagsLabel: string[]
  isThirdPartyPickup?: boolean
}
}): Promise<PickupPoint> {
    return this.http.request<PickupPoint>({ method: 'PUT', path: `/api/logistics/pvt/configuration/pickuppoints/${params.pickupPointId}`, body: params.body })
  }

  delete(params: {
  pickupPointId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/logistics/pvt/configuration/pickuppoints/${params.pickupPointId}` })
  }

  getpaged(params: {
  page?: number
  pageSize?: number
  keyword?: string
}): Promise<{
  items?: PickupPoint[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}> {
    return this.http.request<{
  items?: PickupPoint[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}>({ method: 'GET', path: `/api/logistics/pvt/configuration/pickuppoints/_search`, query: { 'page': params.page, 'pageSize': params.pageSize, 'keyword': params.keyword } })
  }
}
class LogisticsApi_polygons {
  constructor(private http: VtexHttpClient) {}

  pagedPolygons(params: {
  page?: number
  perPage?: number
}): Promise<{
  items?: string[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}> {
    return this.http.request<{
  items?: string[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}>({ method: 'GET', path: `/api/logistics/pvt/configuration/geoshape`, query: { 'page': params.page, 'perPage': params.perPage } })
  }

  createUpdatePolygon(params: {
  body: {
  name: string
  geoShape: {
  coordinates: number[][][]
}
}
}): Promise<string> {
    return this.http.request<string>({ method: 'PUT', path: `/api/logistics/pvt/configuration/geoshape`, body: params.body })
  }

  polygonbyId(params: {
  polygonName: string
}): Promise<{
  isActive?: boolean
  name?: string
  geoShape?: {
  coordinates?: number[][][]
  type?: string
}
}> {
    return this.http.request<{
  isActive?: boolean
  name?: string
  geoShape?: {
  coordinates?: number[][][]
  type?: string
}
}>({ method: 'GET', path: `/api/logistics/pvt/configuration/geoshape/${params.polygonName}` })
  }

  deletePolygon(params: {
  polygonName: string
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'DELETE', path: `/api/logistics/pvt/configuration/geoshape/${params.polygonName}` })
  }
}

export class LogisticsApi {
  readonly shippingPolicies: LogisticsApi_shippingPolicies
  readonly freightValues: LogisticsApi_freightValues
  readonly scheduledDelivery: LogisticsApi_scheduledDelivery
  readonly docks: LogisticsApi_docks
  readonly warehouses: LogisticsApi_warehouses
  readonly inventory: LogisticsApi_inventory
  readonly batchOperations: LogisticsApi_batchOperations
  readonly holidays: LogisticsApi_holidays
  readonly reservations: LogisticsApi_reservations
  readonly sla: LogisticsApi_sla
  readonly pickupPoints: LogisticsApi_pickupPoints
  readonly polygons: LogisticsApi_polygons
  constructor(http: VtexHttpClient) {
    this.shippingPolicies = new LogisticsApi_shippingPolicies(http)
    this.freightValues = new LogisticsApi_freightValues(http)
    this.scheduledDelivery = new LogisticsApi_scheduledDelivery(http)
    this.docks = new LogisticsApi_docks(http)
    this.warehouses = new LogisticsApi_warehouses(http)
    this.inventory = new LogisticsApi_inventory(http)
    this.batchOperations = new LogisticsApi_batchOperations(http)
    this.holidays = new LogisticsApi_holidays(http)
    this.reservations = new LogisticsApi_reservations(http)
    this.sla = new LogisticsApi_sla(http)
    this.pickupPoints = new LogisticsApi_pickupPoints(http)
    this.polygons = new LogisticsApi_polygons(http)
  }
}
