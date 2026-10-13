import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { PickupPoint, ListDocksById, DeliveryCapacity, ShippingPolicy } from './types.js'

class LogisticsApi_shippingPolicies {
  constructor(private http: VtexHttpClient) {}

  getApiLogisticsPvtShippingPoliciesById(params: {
  id: string
}, opts?: CallOptions): Promise<ShippingPolicy> {
    return this.http.request<ShippingPolicy>(withCall({ method: 'GET', path: `/api/logistics/pvt/shipping-policies/${encodePathParam(params.id)}` }, opts))
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
  modals?: ("CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS")[]
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/logistics/pvt/shipping-policies/${encodePathParam(params.id)}`, body: params.body }, opts))
  }

  deleteApiLogisticsPvtShippingPoliciesById(params: {
  id: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/logistics/pvt/shipping-policies/${encodePathParam(params.id)}` }, opts))
  }

  getApiLogisticsPvtShippingPolicies(params: {
  page?: number
  perPage?: number
} = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/logistics/pvt/shipping-policies`, query: { 'page': params.page, 'perPage': params.perPage } }, opts))
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
  modals: ("CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS")[]
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
} | null
  isActive: boolean
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/shipping-policies`, body: params.body }, opts))
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/freights/${encodePathParam(params.carrierId)}/values/update`, body: params.body }, opts))
  }

  freightValues(params: {
  carrierId: string
  postalcode: string
}, opts?: CallOptions): Promise<{
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
  restrictedFreights: string[] | null
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
  restrictedFreights: string[] | null
  polygon: string
  minimumValueInsurance: number
}[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/freights/${encodePathParam(params.carrierId)}/${encodePathParam(params.postalcode)}/values` }, opts))
  }
}
class LogisticsApi_scheduledDelivery {
  constructor(private http: VtexHttpClient) {}

  retrieveBlockedDeliveryWindows(params: {
  carrierId: string
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/carriers/${encodePathParam(params.carrierId)}/getdayofweekblocked` }, opts))
  }

  addBlockedDeliveryWindows(params: {
  carrierId: string
  body: string
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/carriers/${encodePathParam(params.carrierId)}/adddayofweekblocked`, body: params.body }, opts))
  }

  removeBlockedDeliveryWindows(params: {
  carrierId: string
  body: string
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/carriers/${encodePathParam(params.carrierId)}/removedayofweekblocked`, body: params.body }, opts))
  }

  getApiLogisticsCapacityResourcesCarrierCapacityTypeShippingPolicyIdTimeFrames(params: {
  capacityType: string
  shippingPolicyId: string
  rangeStart: string
  rangeEnd: string
}, opts?: CallOptions): Promise<DeliveryCapacity> {
    return this.http.request<DeliveryCapacity>(withCall({ method: 'GET', path: `/api/logistics-capacity/resources/carrier@${encodePathParam(params.capacityType)}@${encodePathParam(params.shippingPolicyId)}/time-frames`, query: { 'rangeStart': params.rangeStart, 'rangeEnd': params.rangeEnd } }, opts))
  }

  getApiLogisticsCapacityResourcesCarrierCapacityTypeShippingPolicyIdTimeFramesByWindowDayFWindowStartTimeTWindowEndTime(params: {
  capacityType: string
  shippingPolicyId: string
  windowDay: string
  windowStartTime: string
  windowEndTime: string
}, opts?: CallOptions): Promise<DeliveryCapacity> {
    return this.http.request<DeliveryCapacity>(withCall({ method: 'GET', path: `/api/logistics-capacity/resources/carrier@${encodePathParam(params.capacityType)}@${encodePathParam(params.shippingPolicyId)}/time-frames/${encodePathParam(params.windowDay)}F${encodePathParam(params.windowStartTime)}T${encodePathParam(params.windowEndTime)}` }, opts))
  }
}
class LogisticsApi_docks {
  constructor(private http: VtexHttpClient) {}

  allDocks(params: Record<string, never> = {}, opts?: CallOptions): Promise<ListDocksById[]> {
    return this.http.request<ListDocksById[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/docks` }, opts))
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
  wmsEndPoint: string | null
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
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/docks`, body: params.body }, opts))
  }

  dockById(params: {
  dockId: string
}, opts?: CallOptions): Promise<ListDocksById> {
    return this.http.request<ListDocksById>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/docks/${encodePathParam(params.dockId)}` }, opts))
  }

  dock(params: {
  dockId: string
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'DELETE', path: `/api/logistics/pvt/configuration/docks/${encodePathParam(params.dockId)}` }, opts))
  }

  activateDock(params: {
  dockId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/docks/${encodePathParam(params.dockId)}/activation` }, opts))
  }

  deactivateDock(params: {
  dockId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/docks/${encodePathParam(params.dockId)}/deactivation` }, opts))
  }
}
class LogisticsApi_warehouses {
  constructor(private http: VtexHttpClient) {}

  allWarehouses(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/warehouses` }, opts))
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/warehouses`, body: params.body }, opts))
  }

  warehouseById(params: {
  warehouseId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/warehouses/${encodePathParam(params.warehouseId)}` }, opts))
  }

  removeWarehouse(params: {
  warehouseId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/logistics/pvt/configuration/warehouses/${encodePathParam(params.warehouseId)}` }, opts))
  }

  activateWarehouse(params: {
  warehouseId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/warehouses/${encodePathParam(params.warehouseId)}/activation` }, opts))
  }

  deactivateWarehouse(params: {
  warehouseId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/configuration/warehouses/${encodePathParam(params.warehouseId)}/deactivation` }, opts))
  }
}
class LogisticsApi_inventory {
  constructor(private http: VtexHttpClient) {}

  inventoryBySku(params: {
  skuId: string
}, opts?: CallOptions): Promise<{
  skuId?: string
  balance?: {
  warehouseId?: string
  warehouseName?: string
  totalQuantity?: number
  reservedQuantity?: number
  hasUnlimitedQuantity?: boolean
  timeToRefill?: string | null
  dateOfSupplyUtc?: string | null
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
  timeToRefill?: string | null
  dateOfSupplyUtc?: string | null
  leadTime?: string
}[]
}>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/skus/${encodePathParam(params.skuId)}` }, opts))
  }

  inventoryperwarehouse(params: {
  skuId: string
  warehouseId: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}` }, opts))
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/logistics/pvt/inventory/skus/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}`, body: params.body }, opts))
  }

  patchApiLogisticsPvtInventorySkusBySkuIdWarehousesByWarehouseIdQuantity(params: {
  skuId: string
  warehouseId: string
  body: {
  quantity: number
  unlimitedQuantity: boolean
  dateUtcOnBalanceSystem?: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/logistics/pvt/inventory/skus/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}/quantity`, body: params.body }, opts))
  }

  patchApiLogisticsPvtInventorySkusBySkuIdWarehousesByWarehouseIdLeadTime(params: {
  skuId: string
  warehouseId: string
  body: {
  leadTime: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/logistics/pvt/inventory/skus/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}/lead-time`, body: params.body }, opts))
  }

  inventoryperdock(params: {
  skuId: string
  dockId: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${encodePathParam(params.skuId)}/docks/${encodePathParam(params.dockId)}` }, opts))
  }

  inventoryperdockandwarehouse(params: {
  skuId: string
  dockId: string
  warehouseId: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${encodePathParam(params.skuId)}/docks/${encodePathParam(params.dockId)}/warehouses/${encodePathParam(params.warehouseId)}` }, opts))
  }

  getinventorywithdispatchedreservations(params: {
  itemId: string
  warehouseId: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${encodePathParam(params.itemId)}/warehouses/${encodePathParam(params.warehouseId)}/dispatched` }, opts))
  }

  getSupplyLots(params: {
  skuId: string
  warehouseId: string
}, opts?: CallOptions): Promise<{
  skuId?: string
  warehouseId?: string
  dockId?: string
  totalQuantity?: number
  reservedQuantity?: number
  availableQuantity?: number
  isUnlimited?: boolean
  salesChannel?: string[]
  deliveryChannels?: ("delivery" | "pickup")[]
  timeToRefill?: string | null
  dateOfSupplyUtc?: string
  supplyLotId?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string | null
  leadTime?: string | null
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
  deliveryChannels?: ("delivery" | "pickup")[]
  timeToRefill?: string | null
  dateOfSupplyUtc?: string
  supplyLotId?: string
  keepSellingAfterExpiration?: boolean
  transfer?: string | null
  leadTime?: string | null
}[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/items/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}/supplyLots` }, opts))
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/logistics/pvt/inventory/items/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}/supplyLots/${encodePathParam(params.supplyLotId)}`, body: params.body }, opts))
  }

  transferSupplyLot(params: {
  skuId: string
  warehouseId: string
  supplyLotId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/inventory/items/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}/supplyLots/${encodePathParam(params.supplyLotId)}/transfer` }, opts))
  }
}
class LogisticsApi_batchOperations {
  constructor(private http: VtexHttpClient) {}

  postAvailabilityV1InventoryBatch(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/availability/v1/inventory/batch`, server: 'https://logistics.{environment}.com.br/{accountName}' }, opts))
  }

  postAvailabilityV1InventoryBatchByBatchIdCommit(params: {
  batchId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/availability/v1/inventory/batch/${encodePathParam(params.batchId)}/commit`, server: 'https://logistics.{environment}.com.br/{accountName}' }, opts))
  }

  getAvailabilityV1InventoryBatchByBatchIdStatus(params: {
  batchId: string
}, opts?: CallOptions): Promise<{
  batchId: string
  status: "AWAITING_UPLOAD" | "QUEUED" | "PROCESSING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED" | "EXPIRED"
  rowCount: number
  processedCount: number
  errorCount: number
  amountCompleted: number
  createdAt: string
  startedAt?: string | null
  stages?: {
  ingestedChunks: number
  classifiedChunks: number
  processedChunks: number
  notifiedChunks: number
  totalChunks: number
} | null
  summary?: {
  insertCount: number
  updateCount: number
  noopCount: number
  conflictCount: number
  skippedDueApiUpdateCount: number
  perItemRoutedCount: number
  dlqEventsCount: number
} | null
}> {
    return this.http.request<{
  batchId: string
  status: "AWAITING_UPLOAD" | "QUEUED" | "PROCESSING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED" | "EXPIRED"
  rowCount: number
  processedCount: number
  errorCount: number
  amountCompleted: number
  createdAt: string
  startedAt?: string | null
  stages?: {
  ingestedChunks: number
  classifiedChunks: number
  processedChunks: number
  notifiedChunks: number
  totalChunks: number
} | null
  summary?: {
  insertCount: number
  updateCount: number
  noopCount: number
  conflictCount: number
  skippedDueApiUpdateCount: number
  perItemRoutedCount: number
  dlqEventsCount: number
} | null
}>(withCall({ method: 'GET', path: `/availability/v1/inventory/batch/${encodePathParam(params.batchId)}/status`, server: 'https://logistics.{environment}.com.br/{accountName}' }, opts))
  }

  getAvailabilityV1InventoryBatchByBatchIdErrors(params: {
  batchId: string
}, opts?: CallOptions): Promise<{
  batchId: string
  downloadUrl: string
  errorCount: number
}> {
    return this.http.request<{
  batchId: string
  downloadUrl: string
  errorCount: number
}>(withCall({ method: 'GET', path: `/availability/v1/inventory/batch/${encodePathParam(params.batchId)}/errors`, server: 'https://logistics.{environment}.com.br/{accountName}' }, opts))
  }
}
class LogisticsApi_holidays {
  constructor(private http: VtexHttpClient) {}

  holidayById(params: {
  holidayId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/holidays/${encodePathParam(params.holidayId)}` }, opts))
  }

  createUpdateHoliday(params: {
  holidayId: string
  body: {
  name: string
  startDate: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/logistics/pvt/configuration/holidays/${encodePathParam(params.holidayId)}`, body: params.body }, opts))
  }

  holiday(params: {
  holidayId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/logistics/pvt/configuration/holidays/${encodePathParam(params.holidayId)}` }, opts))
  }

  allHolidays(params: Record<string, never> = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/holidays` }, opts))
  }
}
class LogisticsApi_reservations {
  constructor(private http: VtexHttpClient) {}

  createReservation(params: {
  body: {
  salesChannel: string
  lockId: string | null
  autorizationExpirationTTL: string
  deliveryItemOptions: {
  item: {
  id: string
  quantity: number
  kitItem: (string | null)[]
  price: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS" | null
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
}[] | null
  wareHouseId: string | null
  dockId: string
  location: {
  zipCode: string
  country: string
  inStore: {
  IsCheckedIn: boolean
  StoreId: string | null
}
}
}[]
}
}, opts?: CallOptions): Promise<{
  LastUpdateDateUtc?: string
  SalesChannel?: string
  LockId?: string
  ReservationDateUtc?: string
  MaximumConfirmationDateUtc?: string
  Status?: number
  SlaRequest?: {
  item?: {
  id?: string
  groupItemId?: string | null
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS" | null
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[] | null
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
  deliveryWindows?: Record<string, unknown> | null
  wareHouseId?: string
  dockId?: string
  wmsEndPoint?: string | null
  location?: {
  zipCode?: string
  country?: string
  deliveryPointId?: string | null
  point?: number[] | null
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string | null
}
}
  pickupStoreInfo?: string | null
}[]
  PickupPointItemOptions?: string | null
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: (string | null)[] | null
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
  groupItemId?: string | null
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS" | null
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[] | null
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
  deliveryWindows?: Record<string, unknown> | null
  wareHouseId?: string
  dockId?: string
  wmsEndPoint?: string | null
  location?: {
  zipCode?: string
  country?: string
  deliveryPointId?: string | null
  point?: number[] | null
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string | null
}
}
  pickupStoreInfo?: string | null
}[]
  PickupPointItemOptions?: string | null
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: (string | null)[] | null
  IsSucess?: boolean
}>(withCall({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations`, body: params.body }, opts))
  }

  reservationById(params: {
  reservationId: string
}, opts?: CallOptions): Promise<{
  LastUpdateDateUtc?: string
  SalesChannel?: string
  LockId?: string
  ReservationDateUtc?: string
  MaximumConfirmationDateUtc?: string
  Status?: number
  SlaRequest?: {
  item?: {
  id?: string
  groupItemId?: string | null
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS" | null
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[] | null
  unlimitedQuantity?: boolean
  dockId?: string
  wareHouseId?: string
  provider?: string | null
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
  deliveryWindows?: Record<string, unknown> | null
  wareHouseId?: string
  kitReservation?: string | null
  dockId?: string
  wmsEndPoint?: string | null
  location?: {
  zipCode?: string
  country?: string
  point?: number[] | null
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string | null
}
}
  pickupStoreInfo?: string | null
  deliveryOnWeekends?: boolean | null
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
}
  estimateDate?: string
  deliveryChannel?: string
  totalTimePlusCarrierSchedule?: string
  polygonName?: string
  distanceLevel?: string | null
  accountCarrier?: string
  dateOfSupplyUtc?: string | null
  supplyLotId?: string | null
  isExternal?: boolean
}[]
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: (string | null)[] | null
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
  groupItemId?: string | null
  quantity?: number
  price?: number
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS" | null
  additionalHandlingTime?: string
  dimension?: {
  weight?: number
  height?: number
  width?: number
  length?: number
  maxSumDimension?: number
}
  kitItem?: string[] | null
  unlimitedQuantity?: boolean
  dockId?: string
  wareHouseId?: string
  provider?: string | null
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
  deliveryWindows?: Record<string, unknown> | null
  wareHouseId?: string
  kitReservation?: string | null
  dockId?: string
  wmsEndPoint?: string | null
  location?: {
  zipCode?: string
  country?: string
  point?: number[] | null
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string | null
}
}
  pickupStoreInfo?: string | null
  deliveryOnWeekends?: boolean | null
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
}
  estimateDate?: string
  deliveryChannel?: string
  totalTimePlusCarrierSchedule?: string
  polygonName?: string
  distanceLevel?: string | null
  accountCarrier?: string
  dateOfSupplyUtc?: string | null
  supplyLotId?: string | null
  isExternal?: boolean
}[]
  CanceledDateUtc?: string
  AuthorizedDateUtc?: string
  ConfirmedDateUtc?: string
  Errors?: (string | null)[] | null
  IsSucess?: boolean
}>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/reservations/${encodePathParam(params.reservationId)}` }, opts))
  }

  confirmReservation(params: {
  reservationId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations/${encodePathParam(params.reservationId)}/confirm` }, opts))
  }

  acknowledgmentReservation(params: {
  reservationId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations/${encodePathParam(params.reservationId)}/acknowledge` }, opts))
  }

  cancelReservation(params: {
  reservationId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/logistics/pvt/inventory/reservations/${encodePathParam(params.reservationId)}/cancel` }, opts))
  }

  reservationbyWarehouseandSku(params: {
  warehouseId: string
  skuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/reservations/${encodePathParam(params.warehouseId)}/${encodePathParam(params.skuId)}` }, opts))
  }
}
class LogisticsApi_sla {
  constructor(private http: VtexHttpClient) {}

  calculateSLA(params: {
  body: {
  items: {
  id: string
  quantity: number
  price?: number | null
  modal?: "CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS" | null
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
  groupItemId?: string | null
  kitItem?: string[] | null
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
}[] | null
  dockId?: string | null
  wareHouseId?: string | null
}[]
  location: {
  zipCode: string
  country: string
  point?: number[]
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string | null
}
}
  salesChannel?: string
  deliveryChannel?: string | null
}[]
}, opts?: CallOptions): Promise<{
  itemId?: string
  quantity?: number
  kitItem?: {
  id?: string
  quantity?: number
  warehouseId?: string
  supplyLotId?: string | null
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
  point?: number[] | null
  inStore?: {
  isCheckedIn?: boolean
  storeId?: string | null
}
}
  deliveryOnWeekends?: boolean
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
} | null
  carrierSchedule?: {
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  timeLimit?: string
}[]
  totalTimePlusCarrierSchedule?: string
  restrictedFreight?: (string | null)[] | null
  coordinates?: (number | null)[] | null
  pickupStoreInfo?: {
  isPickupStore?: boolean | null
  storeId?: string | null
  friendlyName?: string | null
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
  complement?: string | null
  reference?: string | null
  location?: {
  latitude?: number
  longitude?: number
}
} | null
  additionalInfo?: string | null
  dockId?: string | null
  distance?: number | null
  businessHours?: string | null
  pickupHolidays?: string | null
  sellerId?: string | null
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
  provider?: string | null
  dateOfSupplyUtc?: string | null
  estimateDate?: string
  supplyLotId?: string | null
  isExternal?: boolean
}[][]> {
    return this.http.request<{
  itemId?: string
  quantity?: number
  kitItem?: {
  id?: string
  quantity?: number
  warehouseId?: string
  supplyLotId?: string | null
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
  point?: number[] | null
  inStore?: {
  isCheckedIn?: boolean
  storeId?: string | null
}
}
  deliveryOnWeekends?: boolean
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
} | null
  carrierSchedule?: {
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  timeLimit?: string
}[]
  totalTimePlusCarrierSchedule?: string
  restrictedFreight?: (string | null)[] | null
  coordinates?: (number | null)[] | null
  pickupStoreInfo?: {
  isPickupStore?: boolean | null
  storeId?: string | null
  friendlyName?: string | null
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
  complement?: string | null
  reference?: string | null
  location?: {
  latitude?: number
  longitude?: number
}
} | null
  additionalInfo?: string | null
  dockId?: string | null
  distance?: number | null
  businessHours?: string | null
  pickupHolidays?: string | null
  sellerId?: string | null
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
  provider?: string | null
  dateOfSupplyUtc?: string | null
  estimateDate?: string
  supplyLotId?: string | null
  isExternal?: boolean
}[][]>(withCall({ method: 'POST', path: `/api/logistics/pvt/shipping/calculate`, body: params.body }, opts))
  }
}
class LogisticsApi_pickupPoints {
  constructor(private http: VtexHttpClient) {}

  listAllPickupPpoints(params: Record<string, never> = {}, opts?: CallOptions): Promise<PickupPoint[]> {
    return this.http.request<PickupPoint[]>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/pickuppoints` }, opts))
  }

  getById(params: {
  pickupPointId: string
}, opts?: CallOptions): Promise<PickupPoint> {
    return this.http.request<PickupPoint>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/pickuppoints/${encodePathParam(params.pickupPointId)}` }, opts))
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
}, opts?: CallOptions): Promise<PickupPoint> {
    return this.http.request<PickupPoint>(withCall({ method: 'PUT', path: `/api/logistics/pvt/configuration/pickuppoints/${encodePathParam(params.pickupPointId)}`, body: params.body }, opts))
  }

  delete(params: {
  pickupPointId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/logistics/pvt/configuration/pickuppoints/${encodePathParam(params.pickupPointId)}` }, opts))
  }

  getpaged(params: {
  page?: number
  pageSize?: number
  keyword?: string
} = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/pickuppoints/_search`, query: { 'page': params.page, 'pageSize': params.pageSize, 'keyword': params.keyword } }, opts))
  }
}
class LogisticsApi_polygons {
  constructor(private http: VtexHttpClient) {}

  pagedPolygons(params: {
  page?: number
  perPage?: number
} = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/geoshape`, query: { 'page': params.page, 'perPage': params.perPage } }, opts))
  }

  createUpdatePolygon(params: {
  body: {
  name: string
  geoShape: {
  coordinates: number[][][]
}
}
}, opts?: CallOptions): Promise<string> {
    return this.http.request<string>(withCall({ method: 'PUT', path: `/api/logistics/pvt/configuration/geoshape`, body: params.body }, opts))
  }

  polygonbyId(params: {
  polygonName: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/logistics/pvt/configuration/geoshape/${encodePathParam(params.polygonName)}` }, opts))
  }

  deletePolygon(params: {
  polygonName: string
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'DELETE', path: `/api/logistics/pvt/configuration/geoshape/${encodePathParam(params.polygonName)}` }, opts))
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
