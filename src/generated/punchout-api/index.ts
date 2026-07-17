import type { VtexHttpClient } from '../../core/http.js'

class PunchoutApi_punchoutLogin {
  constructor(private http: VtexHttpClient) {}

  postApiAuthenticatorV1PunchoutStart(params: {
  returnURL?: string
  body: {
  username: string
  password: string
}
}): Promise<{
  url?: string
}> {
    return this.http.request<{
  url?: string
}>({ method: 'POST', path: `/api/authenticator/v1/punchout/start`, query: { 'returnURL': params.returnURL }, body: params.body })
  }

  postApiAuthenticatorV1PunchoutAuthenticatedStart(params: {
  returnURL?: string
  body: {
  username: string
}
}): Promise<{
  url?: string
}> {
    return this.http.request<{
  url?: string
}>({ method: 'POST', path: `/api/authenticator/v1/punchout/authenticated/start`, query: { 'returnURL': params.returnURL }, body: params.body })
  }

  getApiAuthenticatorV1PunchoutFinish(params: {
  ott: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/authenticator/v1/punchout/finish`, query: { 'ott': params.ott } })
  }
}

export class PunchoutApi {
  readonly punchoutLogin: PunchoutApi_punchoutLogin
  constructor(http: VtexHttpClient) {
    this.punchoutLogin = new PunchoutApi_punchoutLogin(http)
  }
}
