import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { withCall } from '../../core/call.js'

class DataSubjectRightsApiPiiDataArchitectureApi_dataSubjectRights {
  constructor(private http: VtexHttpClient) {}

  postApiUserRightsCreateAndProcessDeleteUserData(params: {
  an?: string
  body: {
  email?: string
}
}, opts?: CallOptions): Promise<{
  uuid?: string
  requestType?: string
  email?: string
  status?: string
  dataResponse?: string
  requestTime?: string
  applications?: {
  application?: string
  status?: string
  errorDetail?: string
  updateAt?: string
}[]
}> {
    return this.http.request<{
  uuid?: string
  requestType?: string
  email?: string
  status?: string
  dataResponse?: string
  requestTime?: string
  applications?: {
  application?: string
  status?: string
  errorDetail?: string
  updateAt?: string
}[]
}>(withCall({ method: 'POST', path: `/api/user-rights/createAndProcessDeleteUserData`, query: { 'an': params.an }, body: params.body, server: 'https://api.vtex.com' }, opts))
  }
}

export class DataSubjectRightsApiPiiDataArchitectureApi {
  readonly dataSubjectRights: DataSubjectRightsApiPiiDataArchitectureApi_dataSubjectRights
  constructor(http: VtexHttpClient) {
    this.dataSubjectRights = new DataSubjectRightsApiPiiDataArchitectureApi_dataSubjectRights(http)
  }
}
