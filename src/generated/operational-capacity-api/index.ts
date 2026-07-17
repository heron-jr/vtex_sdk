import type { VtexHttpClient } from '../../core/http.js'
import type { LocationCapacity, CapacityConfigurationRequest, CapacityConfigurationResponse, CapacityDetail, Location, LocationsList, UpdateLocationStatusRequest } from './types.js'

class OperationalCapacityApi_capacity {
  constructor(private http: VtexHttpClient) {}

  getApiFulfillmentLocationsCapacityByParentAccountName(params: Record<string, never>): Promise<LocationCapacity[]> {
    return this.http.request<LocationCapacity[]>({ method: 'GET', path: `/api/fulfillment-locations/capacity/by-parent-account-name` })
  }
}
class OperationalCapacityApi_capacityConfiguration {
  constructor(private http: VtexHttpClient) {}

  putApiFulfillmentLocationsLocationByLocationIdCapacitiesByCode(params: {
  locationId: string
  code: string
  body: CapacityConfigurationRequest
}): Promise<CapacityConfigurationResponse> {
    return this.http.request<CapacityConfigurationResponse>({ method: 'PUT', path: `/api/fulfillment-locations/location/${params.locationId}/capacities/${params.code}`, body: params.body })
  }
}
class OperationalCapacityApi_capacityDetails {
  constructor(private http: VtexHttpClient) {}

  getApiFulfillmentLocationsLocationsByLocationIdCapacities(params: {
  locationId: string
  daysRequested?: number
}): Promise<CapacityDetail[]> {
    return this.http.request<CapacityDetail[]>({ method: 'GET', path: `/api/fulfillment-locations/locations/${params.locationId}/capacities`, query: { 'daysRequested': params.daysRequested } })
  }
}
class OperationalCapacityApi_locations {
  constructor(private http: VtexHttpClient) {}

  getApiFulfillmentLocationsLocation(params: {
  page?: number
  pageSize?: number
  status?: "ACTIVE" | "MANUALLY_PAUSED" | "PAUSED"
  search?: string
}): Promise<LocationsList> {
    return this.http.request<LocationsList>({ method: 'GET', path: `/api/fulfillment-locations/location`, query: { 'page': params.page, 'pageSize': params.pageSize, 'status': params.status, 'search': params.search } })
  }
}
class OperationalCapacityApi_locationStatus {
  constructor(private http: VtexHttpClient) {}

  putApiFulfillmentLocationsLocationsByLocationIdStatus(params: {
  locationId: string
  body: UpdateLocationStatusRequest
}): Promise<Location> {
    return this.http.request<Location>({ method: 'PUT', path: `/api/fulfillment-locations/locations/${params.locationId}/status`, body: params.body })
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
