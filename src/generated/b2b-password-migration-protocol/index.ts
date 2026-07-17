import type { VtexHttpClient } from '../../core/http.js'

class B2bPasswordMigrationProtocolApi_clientRegistration {
  constructor(private http: VtexHttpClient) {}

  registerClient(params: {
  body: {
  Store: string
}
}): Promise<{
  Store?: string
  ClientId?: string
  Secret?: string
}> {
    return this.http.request<{
  Store?: string
  ClientId?: string
  Secret?: string
}>({ method: 'POST', path: `/register`, body: params.body })
  }
}
class B2bPasswordMigrationProtocolApi_authenticationFlow {
  constructor(private http: VtexHttpClient) {}

  validateLegacyCredentials(params: {
  body: {
  username: string
  password: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/authentication`, body: params.body })
  }
}

export class B2bPasswordMigrationProtocolApi {
  readonly clientRegistration: B2bPasswordMigrationProtocolApi_clientRegistration
  readonly authenticationFlow: B2bPasswordMigrationProtocolApi_authenticationFlow
  constructor(http: VtexHttpClient) {
    this.clientRegistration = new B2bPasswordMigrationProtocolApi_clientRegistration(http)
    this.authenticationFlow = new B2bPasswordMigrationProtocolApi_authenticationFlow(http)
  }
}
