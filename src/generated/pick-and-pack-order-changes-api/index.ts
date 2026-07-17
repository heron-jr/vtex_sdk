import type { VtexHttpClient } from '../../core/http.js'
import type { UpdateDeadlineRequest, UpdateDeadlineResponse } from './types.js'

class PickAndPackOrderChangesApi_orderChanges {
  constructor(private http: VtexHttpClient) {}

  putOrdersByOrderIdDeadline(params: {
  orderId: string
  body: UpdateDeadlineRequest
}): Promise<UpdateDeadlineResponse> {
    return this.http.request<UpdateDeadlineResponse>({ method: 'PUT', path: `/orders/${params.orderId}/deadline`, body: params.body })
  }
}
class PickAndPackOrderChangesApi_binLocations {
  constructor(private http: VtexHttpClient) {}

  getBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
}): Promise<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}> {
    return this.http.request<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}>({ method: 'GET', path: `/${params.skuId}/warehouses/${params.warehouseId}` })
  }

  postBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
  body: {
  location: string
}
}): Promise<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}> {
    return this.http.request<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}>({ method: 'POST', path: `/${params.skuId}/warehouses/${params.warehouseId}`, body: params.body })
  }

  putBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
  body: {
  location: string
}
}): Promise<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}> {
    return this.http.request<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}>({ method: 'PUT', path: `/${params.skuId}/warehouses/${params.warehouseId}`, body: params.body })
  }

  deleteBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
}): Promise<Record<string, unknown>[]> {
    return this.http.request<Record<string, unknown>[]>({ method: 'DELETE', path: `/${params.skuId}/warehouses/${params.warehouseId}` })
  }

  getBySkuIdWarehouses(params: {
  skuId: string
}): Promise<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}[]> {
    return this.http.request<{
  location?: string
  hostname?: string
  warehouseId?: string
  skuId?: string
}[]>({ method: 'GET', path: `/${params.skuId}/warehouses` })
  }

  deleteBySkuIdWarehouses(params: {
  skuId: string
}): Promise<Record<string, unknown>[]> {
    return this.http.request<Record<string, unknown>[]>({ method: 'DELETE', path: `/${params.skuId}/warehouses` })
  }
}

export class PickAndPackOrderChangesApi {
  readonly orderChanges: PickAndPackOrderChangesApi_orderChanges
  readonly binLocations: PickAndPackOrderChangesApi_binLocations
  constructor(http: VtexHttpClient) {
    this.orderChanges = new PickAndPackOrderChangesApi_orderChanges(http)
    this.binLocations = new PickAndPackOrderChangesApi_binLocations(http)
  }
}
