import type { VtexHttpClient } from '../../core/http.js'
import type { CreatetokenRequest, CreateServiceBody, ServiceBody, Data, Label, Package, Dimensions, Item, Timeline, MetaData, GeneratedObject, Note, Timezone, Rate, ShippingPrice, InsurancePrice, MetaData1, Carrier, Type, Rate1, ShippingPrice1, M4031, Data1, M4041, UpdateserviceRequest, ServiceBody1, Data3, Agent, CreatenotesRequest, ServiceBody3, Data9, CreateevidenceRequest, ServiceBody4, Data12, CreatelabelsRequest, ServiceBody5, Data15, CancelOngoingServiceRequest, ServiceBody6, Data18, OnholdserviceRequest, ResponseService, ListRequest, CancelServiceRequest, CancelServiceResponse, PauseResumeServiceRequest, PauseResumeServiceResponse } from './types.js'

class PickAndPackLastMileProtocolApi_authentication {
  constructor(private http: VtexHttpClient) {}

  createtoken(params: {
  body: CreatetokenRequest
}): Promise<string> {
    return this.http.request<string>({ method: 'POST', path: `/token`, body: params.body })
  }
}
class PickAndPackLastMileProtocolApi_serviceIntegration {
  constructor(private http: VtexHttpClient) {}

  createservice(params: {
  body: CreateServiceBody
}): Promise<ResponseService> {
    return this.http.request<ResponseService>({ method: 'POST', path: `/create-service`, body: params.body })
  }
}
class PickAndPackLastMileProtocolApi_carriers {
  constructor(private http: VtexHttpClient) {}

  createservice(params: {
  body: CreateServiceBody
}): Promise<ServiceBody> {
    return this.http.request<ServiceBody>({ method: 'POST', path: `/rates`, body: params.body })
  }

  createservice2(params: {
  body: ListRequest
}): Promise<ResponseService> {
    return this.http.request<ResponseService>({ method: 'POST', path: `/list-carriers`, body: params.body })
  }
}
class PickAndPackLastMileProtocolApi_shippingUpdates {
  constructor(private http: VtexHttpClient) {}

  getservice(params: {
  carrierId: string
  serviceId: string
}): Promise<ServiceBody> {
    return this.http.request<ServiceBody>({ method: 'GET', path: `/${params.carrierId}/${params.serviceId}` })
  }

  updateservice(params: {
  carrierId: string
  serviceId: string
  body: UpdateserviceRequest
}): Promise<ServiceBody1> {
    return this.http.request<ServiceBody1>({ method: 'PATCH', path: `/${params.carrierId}/${params.serviceId}`, body: params.body })
  }

  createnotes(params: {
  carrierId: string
  serviceId: string
  body: CreatenotesRequest[]
}): Promise<ServiceBody3> {
    return this.http.request<ServiceBody3>({ method: 'POST', path: `/notes/${params.carrierId}/${params.serviceId}`, body: params.body })
  }

  createevidence(params: {
  carrierId: string
  serviceId: string
  body: CreateevidenceRequest[]
}): Promise<ServiceBody4> {
    return this.http.request<ServiceBody4>({ method: 'POST', path: `/evidences/${params.carrierId}/${params.serviceId}`, body: params.body })
  }

  createlabels(params: {
  carrierId: string
  serviceId: string
  body: CreatelabelsRequest
}): Promise<ServiceBody5> {
    return this.http.request<ServiceBody5>({ method: 'POST', path: `/labels/${params.carrierId}/${params.serviceId}`, body: params.body })
  }

  postCancelservice(params: {
  carrierId: string
  serviceId: string
  body: CancelOngoingServiceRequest
}): Promise<ServiceBody6> {
    return this.http.request<ServiceBody6>({ method: 'POST', path: `/cancel/${params.carrierId}/${params.serviceId}`, body: params.body })
  }

  createservice(params: {
  body: CancelServiceRequest
}): Promise<CancelServiceResponse> {
    return this.http.request<CancelServiceResponse>({ method: 'POST', path: `/cancel-service`, body: params.body })
  }

  createservice2(params: {
  body: PauseResumeServiceRequest
}): Promise<PauseResumeServiceResponse> {
    return this.http.request<PauseResumeServiceResponse>({ method: 'POST', path: `/pause-service`, body: params.body })
  }

  onholdservice(params: {
  carrierId: string
  serviceId: string
  body: OnholdserviceRequest
}): Promise<ServiceBody6> {
    return this.http.request<ServiceBody6>({ method: 'POST', path: `/on-hold/${params.carrierId}/${params.serviceId}`, body: params.body })
  }
}

export class PickAndPackLastMileProtocolApi {
  readonly authentication: PickAndPackLastMileProtocolApi_authentication
  readonly serviceIntegration: PickAndPackLastMileProtocolApi_serviceIntegration
  readonly carriers: PickAndPackLastMileProtocolApi_carriers
  readonly shippingUpdates: PickAndPackLastMileProtocolApi_shippingUpdates
  constructor(http: VtexHttpClient) {
    this.authentication = new PickAndPackLastMileProtocolApi_authentication(http)
    this.serviceIntegration = new PickAndPackLastMileProtocolApi_serviceIntegration(http)
    this.carriers = new PickAndPackLastMileProtocolApi_carriers(http)
    this.shippingUpdates = new PickAndPackLastMileProtocolApi_shippingUpdates(http)
  }
}
