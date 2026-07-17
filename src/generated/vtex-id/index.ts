import type { VtexHttpClient } from '../../core/http.js'
import type { Credentials, ValidateSessionResponse } from './types.js'

class VtexIdApi_storefrontUsers {
  constructor(private http: VtexHttpClient) {}

  postApiAuthenticatorV1StorefrontUsers(params: {
  isLegacyPassword?: boolean
  body: {
  identifiers: {
  type: "username" | "email" | "phoneNumber"
  value: string
}[]
}
}): Promise<{
  userId?: string
  identifier?: string
}> {
    return this.http.request<{
  userId?: string
  identifier?: string
}>({ method: 'POST', path: `/api/authenticator/v1/storefront/users`, query: { 'isLegacyPassword': params.isLegacyPassword }, body: params.body })
  }

  getApiVtexidPvtUserInfo(params: {
  user: string
}): Promise<{
  userId?: string
  user?: string
  name?: string
  accountId?: string
  accountName?: string
}> {
    return this.http.request<{
  userId?: string
  user?: string
  name?: string
  accountId?: string
  accountName?: string
}>({ method: 'GET', path: `/api/vtexid/pvt/user/info`, query: { 'user': params.user } })
  }
}
class VtexIdApi_passwordMigration {
  constructor(private http: VtexHttpClient) {}

  putApiAuthenticatorV1TenantsFeaturesByName(params: {
  name: string
  body: {
  clientId: string
  idpEndpoint: string
  secret: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/authenticator/v1/tenants/features/${params.name}`, body: params.body })
  }

  patchApiAuthenticatorV1TenantsFeaturesByName(params: {
  name: string
  body: {
  enabled: boolean
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/authenticator/v1/tenants/features/${params.name}`, body: params.body })
  }

  deleteApiAuthenticatorV1TenantsFeaturesByName(params: {
  name: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/authenticator/v1/tenants/features/${params.name}` })
  }
}
class VtexIdApi_authentication {
  constructor(private http: VtexHttpClient) {}

  postApiVtexidApptokenLogin(params: {
  an?: string
  body: Credentials
}): Promise<{
  authStatus?: string
  token?: string
  expires?: number
}> {
    return this.http.request<{
  authStatus?: string
  token?: string
  expires?: number
}>({ method: 'POST', path: `/api/vtexid/apptoken/login`, query: { 'an': params.an }, body: params.body })
  }

  postApiVtexidAudienceWebstoreProviderOauthExchange(params: {
  body: {
  providerId: string
  accessToken: string
  duration?: number
}
}): Promise<{
  authToken?: string
}> {
    return this.http.request<{
  authToken?: string
}>({ method: 'POST', path: `/api/vtexid/audience/webstore/provider/oauth/exchange`, body: params.body })
  }

  postApiVtexidCredentialValidate(params: {
  an?: string
  body: {
  token: string
}
}): Promise<{
  authStatus?: string
  id?: string
  user?: string
  account?: string
  audience?: string
  tokenType?: string
}> {
    return this.http.request<{
  authStatus?: string
  id?: string
  user?: string
  account?: string
  audience?: string
  tokenType?: string
}>({ method: 'POST', path: `/api/vtexid/credential/validate`, query: { 'an': params.an }, body: params.body })
  }

  postApiVtexidPubProvidersSetupPasswordWebstorePassword(params: {
  body: {
  isActive?: boolean
  allowRepeated?: boolean
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/vtexid/pub/providers/setup/password/webstore/password`, body: params.body })
  }

  postApiVtexidPasswordExpire(params: {
  email: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/vtexid/password/expire`, query: { 'email': params.email } })
  }

  getApiVtexidPvtUserId(params: {
  usuario: string
}): Promise<string> {
    return this.http.request<string>({ method: 'GET', path: `/api/vtexid/pvt/user/id`, query: { 'usuario': params.usuario } })
  }
}
class VtexIdApi_tokenRenewal {
  constructor(private http: VtexHttpClient) {}

  patchApiVtexidApikeyByApiKeyApitokenRenew(params: {
  apiKey: string
}): Promise<{
  id?: string
  keyName?: string
  creationDateToken?: string
  creationDateNewToken?: string
  expirationPeriod?: number
  newToken?: string
}> {
    return this.http.request<{
  id?: string
  keyName?: string
  creationDateToken?: string
  creationDateNewToken?: string
  expirationPeriod?: number
  newToken?: string
}>({ method: 'PATCH', path: `/api/vtexid/apikey/${params.apiKey}/apitoken/renew` })
  }

  patchApiVtexidApikeyByApiKeyApitokenFinishRenewal(params: {
  apiKey: string
}): Promise<{
  id?: string
  creationDateToken?: string
  creationDateNewToken?: string
}> {
    return this.http.request<{
  id?: string
  creationDateToken?: string
  creationDateNewToken?: string
}>({ method: 'PATCH', path: `/api/vtexid/apikey/${params.apiKey}/apitoken/finish-renewal` })
  }
}
class VtexIdApi_refreshTokenHeadless {
  constructor(private http: VtexHttpClient) {}

  getApiVtexidPubAuthenticationStart(params: {
  scope: string
  fingerprint?: string
}): Promise<{
  authenticationToken?: string
  oauthProviders?: {
  providerName?: string
  className?: string
  expectedContext?: string[]
}[]
  showClassicAuthentication?: boolean
  showAccessKeyAuthentication?: boolean
  showPasskeyAuthentication?: boolean
  authCookie?: string
  isAuthenticated?: boolean
  selectedProvider?: string
  samlProviders?: string[]
}> {
    return this.http.request<{
  authenticationToken?: string
  oauthProviders?: {
  providerName?: string
  className?: string
  expectedContext?: string[]
}[]
  showClassicAuthentication?: boolean
  showAccessKeyAuthentication?: boolean
  showPasskeyAuthentication?: boolean
  authCookie?: string
  isAuthenticated?: boolean
  selectedProvider?: string
  samlProviders?: string[]
}>({ method: 'GET', path: `/api/vtexid/pub/authentication/start`, query: { 'scope': params.scope, 'fingerprint': params.fingerprint } })
  }

  postApiVtexidPubAuthenticationAccesskeySend(params: {
  email: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/vtexid/pub/authentication/accesskey/send`, query: { 'email': params.email } })
  }

  postApiVtexidPubAuthenticationAccesskeyValidate(params: Record<string, never>): Promise<ValidateSessionResponse> {
    return this.http.request<ValidateSessionResponse>({ method: 'POST', path: `/api/vtexid/pub/authentication/accesskey/validate` })
  }

  postApiVtexidRefreshtokenWebstore(params: {
  body: {
  fingerprint?: string
}
}): Promise<{
  status?: "Success" | "InvalidSession" | "InvalidToken" | "InvalidEmail" | "InvalidScope"
  userId?: string
  refreshAfter?: string
}> {
    return this.http.request<{
  status?: "Success" | "InvalidSession" | "InvalidToken" | "InvalidEmail" | "InvalidScope"
  userId?: string
  refreshAfter?: string
}>({ method: 'POST', path: `/api/vtexid/refreshtoken/webstore`, body: params.body })
  }
}
class VtexIdApi_organizationAccountAuthentication {
  constructor(private http: VtexHttpClient) {}

  getApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
}): Promise<{
  authenticationMethods: {
  type: "Password" | "OAuth"
  name: string
  status: "Enabled" | "Disabled"
}[]
}> {
    return this.http.request<{
  authenticationMethods: {
  type: "Password" | "OAuth"
  name: string
  status: "Enabled" | "Disabled"
}[]
}>({ method: 'GET', path: `/api/vtexid/organization-units/${params.unitId}/settings` })
  }

  postApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
  body: {
  settings: {
  type: "Password" | "OAuth"
  name: string
  status: "Enabled" | "Disabled"
}[]
}
}): Promise<{
  success?: boolean
}> {
    return this.http.request<{
  success?: boolean
}>({ method: 'POST', path: `/api/vtexid/organization-units/${params.unitId}/settings`, body: params.body })
  }

  patchApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
  body: {
  settings: {
  type: "OAuth"
  status: "Enabled" | "Disabled"
}[]
}
}): Promise<{
  authenticationMethods: {
  type: "Password" | "OAuth"
  name: string
  status: "Enabled" | "Disabled"
}[]
}> {
    return this.http.request<{
  authenticationMethods: {
  type: "Password" | "OAuth"
  name: string
  status: "Enabled" | "Disabled"
}[]
}>({ method: 'PATCH', path: `/api/vtexid/organization-units/${params.unitId}/settings`, body: params.body })
  }

  deleteApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
  body: {
  settings: {
  type: "OAuth" | "Password"
}[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/vtexid/organization-units/${params.unitId}/settings`, body: params.body })
  }
}

export class VtexIdApi {
  readonly storefrontUsers: VtexIdApi_storefrontUsers
  readonly passwordMigration: VtexIdApi_passwordMigration
  readonly authentication: VtexIdApi_authentication
  readonly tokenRenewal: VtexIdApi_tokenRenewal
  readonly refreshTokenHeadless: VtexIdApi_refreshTokenHeadless
  readonly organizationAccountAuthentication: VtexIdApi_organizationAccountAuthentication
  constructor(http: VtexHttpClient) {
    this.storefrontUsers = new VtexIdApi_storefrontUsers(http)
    this.passwordMigration = new VtexIdApi_passwordMigration(http)
    this.authentication = new VtexIdApi_authentication(http)
    this.tokenRenewal = new VtexIdApi_tokenRenewal(http)
    this.refreshTokenHeadless = new VtexIdApi_refreshTokenHeadless(http)
    this.organizationAccountAuthentication = new VtexIdApi_organizationAccountAuthentication(http)
  }
}
