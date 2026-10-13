import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class UserRightsApi_dataErasure {
  constructor(private http: VtexHttpClient) {}

  async postApiUserRightsForgetJobs(params: {
  body: {
  email: string
}
}, opts?: CallOptions): Promise<{
  jobId: string
}> {
    return this.http.request<{
  jobId: string
}>(withCall({ method: 'POST', path: `/api/user-rights/forget/jobs`, body: params.body }, opts))
  }

  async getApiUserRightsForgetJobsByJobId(params: {
  jobId: string
}, opts?: CallOptions): Promise<{
  status: "InProgress" | "Success" | "Failed"
  message: string
}> {
    return this.http.request<{
  status: "InProgress" | "Success" | "Failed"
  message: string
}>(withCall({ method: 'GET', path: `/api/user-rights/forget/jobs/${encodePathParam(params.jobId)}` }, opts))
  }
}

export class UserRightsApi {
  readonly dataErasure: UserRightsApi_dataErasure
  constructor(http: VtexHttpClient) {
    this.dataErasure = new UserRightsApi_dataErasure(http)
  }
}
