import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { UpdateDeadlineRequest, UpdateDeadlineResponse } from './types.js'

class PickAndPackOrderChangesApi_orderChanges {
  constructor(private http: VtexHttpClient) {}

  putOrdersByOrderIdDeadline(params: {
  orderId: string
  body: UpdateDeadlineRequest
}, opts?: CallOptions): Promise<UpdateDeadlineResponse> {
    return this.http.request<UpdateDeadlineResponse>(withCall({ method: 'PUT', path: `/orders/${encodePathParam(params.orderId)}/deadline`, body: params.body, server: 'https://{accountName}.{environment}.com.br/vtex_pickandpack' }, opts))
  }
}
class PickAndPackOrderChangesApi_binLocations {
  constructor(private http: VtexHttpClient) {}

  getBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}`, server: 'https://{accountName}.myvtex.com/pickpack/bin-location' }, opts))
  }

  postBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
  body: {
  location: string
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}`, body: params.body, server: 'https://{accountName}.myvtex.com/pickpack/bin-location' }, opts))
  }

  putBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
  body: {
  location: string
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'PUT', path: `/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}`, body: params.body, server: 'https://{accountName}.myvtex.com/pickpack/bin-location' }, opts))
  }

  deleteBySkuIdWarehousesByWarehouseId(params: {
  skuId: string
  warehouseId: string
}, opts?: CallOptions): Promise<Record<string, unknown>[]> {
    return this.http.request<Record<string, unknown>[]>(withCall({ method: 'DELETE', path: `/${encodePathParam(params.skuId)}/warehouses/${encodePathParam(params.warehouseId)}`, server: 'https://{accountName}.myvtex.com/pickpack/bin-location' }, opts))
  }

  getBySkuIdWarehouses(params: {
  skuId: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/${encodePathParam(params.skuId)}/warehouses`, server: 'https://{accountName}.myvtex.com/pickpack/warehouses' }, opts))
  }

  deleteBySkuIdWarehouses(params: {
  skuId: string
}, opts?: CallOptions): Promise<Record<string, unknown>[]> {
    return this.http.request<Record<string, unknown>[]>(withCall({ method: 'DELETE', path: `/${encodePathParam(params.skuId)}/warehouses`, server: 'https://{accountName}.{environment}.com.br/vtex_pickandpack' }, opts))
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
