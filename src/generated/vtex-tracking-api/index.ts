import type { VtexHttpClient } from '../../core/http.js'
import type { PaginationResultDeliveryServiceResponsev11, DeliveryService, DeliveryServiceResponseV11, StateResponse, CountryResponse, ShippingCompanyResponse } from './types.js'

class VtexTrackingApi_authentication {
  constructor(private http: VtexHttpClient) {}

  postAuth(params: {
  body: {
  username: string
  password: string
}
}): Promise<{
  authenticated?: boolean
  created?: string
  expiration?: string
  accessToken?: string
  message?: string
}> {
    return this.http.request<{
  authenticated?: boolean
  created?: string
  expiration?: string
  accessToken?: string
  message?: string
}>({ method: 'POST', path: `/auth`, body: params.body })
  }
}
class VtexTrackingApi_deliveryServices {
  constructor(private http: VtexHttpClient) {}

  getServices(params: {
  status?: string
  dateInit?: string
  dateEnd?: string
  pageSize?: number
  page?: number
}): Promise<PaginationResultDeliveryServiceResponsev11> {
    return this.http.request<PaginationResultDeliveryServiceResponsev11>({ method: 'GET', path: `/services`, query: { 'status': params.status, 'dateInit': params.dateInit, 'dateEnd': params.dateEnd, 'pageSize': params.pageSize, 'page': params.page } })
  }

  postServices(params: {
  body: DeliveryService
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/services`, body: params.body })
  }

  putServices(params: {
  body: {
  invoice?: string
  serie?: string
}[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/services`, body: params.body })
  }

  getServicesByIdDeliveryService(params: {
  idDeliveryService: number
}): Promise<DeliveryServiceResponseV11> {
    return this.http.request<DeliveryServiceResponseV11>({ method: 'GET', path: `/services/${params.idDeliveryService}` })
  }

  getServicesRoutes(params: {
  status?: string
  dateInit?: string
  dateEnd?: string
  pageSize?: number
  page?: number
}): Promise<PaginationResultDeliveryServiceResponsev11> {
    return this.http.request<PaginationResultDeliveryServiceResponsev11>({ method: 'GET', path: `/services/routes`, query: { 'status': params.status, 'dateInit': params.dateInit, 'dateEnd': params.dateEnd, 'pageSize': params.pageSize, 'page': params.page } })
  }

  postDeliveryServiceWithRouteAsync(params: {
  body: {
  deliveryService?: DeliveryService[]
  deliveryServiceRoute?: {
  carrier: {
  username: string
  firstName?: string
  lastName?: string
  cpf?: string
  email?: string
  mobileAreaCode?: string
  mobile?: string
  phoneAreaCode?: string
  phone?: string
  idExternalCarrier?: string
  rg?: string
  idShipperBranch?: number
  idShippingCompany?: number
}
  displacementType: string
  vehicle?: {
  registrationPlate?: string
}
  deliveryServiceRouteTimeOfDay?: string
  deliveryServiceDate: string
  idExternalRoute?: string
  itinerantDate?: string
  addressStart?: {
  addressStreet?: string
  addressNumber?: string
  postalCode?: string
  addressCity?: string
  state?: string
}
}
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/services/routes`, body: params.body })
  }

  getServicesInvoice(params: {
  invoice?: string
}): Promise<PaginationResultDeliveryServiceResponsev11> {
    return this.http.request<PaginationResultDeliveryServiceResponsev11>({ method: 'GET', path: `/services/invoice`, query: { 'invoice': params.invoice } })
  }
}

export class VtexTrackingApi {
  readonly authentication: VtexTrackingApi_authentication
  readonly deliveryServices: VtexTrackingApi_deliveryServices
  constructor(http: VtexHttpClient) {
    this.authentication = new VtexTrackingApi_authentication(http)
    this.deliveryServices = new VtexTrackingApi_deliveryServices(http)
  }
}
