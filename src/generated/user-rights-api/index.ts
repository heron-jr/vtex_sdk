import type { VtexHttpClient } from '../../core/http.js'

class UserRightsApi_dataErasure {
  constructor(private http: VtexHttpClient) {}

  postApiUserRightsForgetJobs(params: {
  body: {
  email: string
}
}): Promise<{
  jobId: string
}> {
    return this.http.request<{
  jobId: string
}>({ method: 'POST', path: `/api/user-rights/forget/jobs`, body: params.body })
  }

  getApiUserRightsForgetJobsByJobId(params: {
  jobId: string
}): Promise<{
  status: "InProgress" | "Success" | "Failed"
  message: string
}> {
    return this.http.request<{
  status: "InProgress" | "Success" | "Failed"
  message: string
}>({ method: 'GET', path: `/api/user-rights/forget/jobs/${params.jobId}` })
  }
}

export class UserRightsApi {
  readonly dataErasure: UserRightsApi_dataErasure
  constructor(http: VtexHttpClient) {
    this.dataErasure = new UserRightsApi_dataErasure(http)
  }
}
