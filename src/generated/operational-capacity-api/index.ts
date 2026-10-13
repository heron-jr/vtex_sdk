import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { LocationCapacity, CapacityConfigurationRequest, CapacityConfigurationResponse, CapacityDetail, Location, LocationsList, UpdateLocationStatusRequest } from './types.js'

class OperationalCapacityApi_capacity {
  constructor(private http: VtexHttpClient) {}

  getApiFulfillmentLocationsCapacityByParentAccountName(params: Record<string, never> = {}, opts?: CallOptions): Promise<LocationCapacity[]> {
    return this.http.request<LocationCapacity[]>(withCall({ method: 'GET', path: `/api/fulfillment-locations/capacity/by-parent-account-name` }, opts))
  }
}
class OperationalCapacityApi_capacityConfiguration {
  constructor(private http: VtexHttpClient) {}

  putApiFulfillmentLocationsLocationByLocationIdCapacitiesByCode(params: {
  locationId: string
  code: string
  body: CapacityConfigurationRequest
}, opts?: CallOptions): Promise<CapacityConfigurationResponse> {
    return this.http.request<CapacityConfigurationResponse>(withCall({ method: 'PUT', path: `/api/fulfillment-locations/location/${encodePathParam(params.locationId)}/capacities/${encodePathParam(params.code)}`, body: params.body }, opts))
  }
}
class OperationalCapacityApi_capacityDetails {
  constructor(private http: VtexHttpClient) {}

  getApiFulfillmentLocationsLocationsByLocationIdCapacities(params: {
  locationId: string
  daysRequested?: number
}, opts?: CallOptions): Promise<CapacityDetail[]> {
    return this.http.request<CapacityDetail[]>(withCall({ method: 'GET', path: `/api/fulfillment-locations/locations/${encodePathParam(params.locationId)}/capacities`, query: { 'daysRequested': params.daysRequested } }, opts))
  }
}
class OperationalCapacityApi_locations {
  constructor(private http: VtexHttpClient) {}

  getApiFulfillmentLocationsLocation(params: {
  page?: number
  pageSize?: number
  status?: "ACTIVE" | "MANUALLY_PAUSED" | "PAUSED"
  search?: string
} = {}, opts?: CallOptions): Promise<LocationsList> {
    return this.http.request<LocationsList>(withCall({ method: 'GET', path: `/api/fulfillment-locations/location`, query: { 'page': params.page, 'pageSize': params.pageSize, 'status': params.status, 'search': params.search } }, opts))
  }
}
class OperationalCapacityApi_locationStatus {
  constructor(private http: VtexHttpClient) {}

  putApiFulfillmentLocationsLocationsByLocationIdStatus(params: {
  locationId: string
  body: UpdateLocationStatusRequest
}, opts?: CallOptions): Promise<Location> {
    return this.http.request<Location>(withCall({ method: 'PUT', path: `/api/fulfillment-locations/locations/${encodePathParam(params.locationId)}/status`, body: params.body }, opts))
  }
}

export class OperationalCapacityApi {
  readonly capacity: OperationalCapacityApi_capacity
  readonly capacityConfiguration: OperationalCapacityApi_capacityConfiguration
  readonly capacityDetails: OperationalCapacityApi_capacityDetails
  readonly locations: OperationalCapacityApi_locations
  readonly locationStatus: OperationalCapacityApi_locationStatus
  constructor(http: VtexHttpClient) {
    this.capacity = new OperationalCapacityApi_capacity(http)
    this.capacityConfiguration = new OperationalCapacityApi_capacityConfiguration(http)
    this.capacityDetails = new OperationalCapacityApi_capacityDetails(http)
    this.locations = new OperationalCapacityApi_locations(http)
    this.locationStatus = new OperationalCapacityApi_locationStatus(http)
  }
}
