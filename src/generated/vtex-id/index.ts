import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { Credentials, ValidateSessionResponse } from './types.js'

class VtexIdApi_storefrontUsers {
  constructor(private http: VtexHttpClient) {}

  async postApiAuthenticatorV1StorefrontUsers(params: {
  isLegacyPassword?: boolean
  body: {
  identifiers: {
  type: "username" | "email" | "phoneNumber"
  value: string
}[]
}
}, opts?: CallOptions): Promise<{
  userId?: string
  identifier?: string
}> {
    return this.http.request<{
  userId?: string
  identifier?: string
}>(withCall({ method: 'POST', path: `/api/authenticator/v1/storefront/users`, query: { 'isLegacyPassword': params.isLegacyPassword }, body: params.body }, opts))
  }

  async getApiVtexidPvtUserInfo(params: {
  user: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/vtexid/pvt/user/info`, query: { 'user': params.user } }, opts))
  }
}
class VtexIdApi_passwordMigration {
  constructor(private http: VtexHttpClient) {}

  async putApiAuthenticatorV1TenantsFeaturesByName(params: {
  name: string
  body: {
  clientId: string
  idpEndpoint: string
  secret: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/authenticator/v1/tenants/features/${encodePathParam(params.name)}`, body: params.body }, opts))
  }

  async patchApiAuthenticatorV1TenantsFeaturesByName(params: {
  name: string
  body: {
  enabled: boolean
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/authenticator/v1/tenants/features/${encodePathParam(params.name)}`, body: params.body }, opts))
  }

  async deleteApiAuthenticatorV1TenantsFeaturesByName(params: {
  name: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/authenticator/v1/tenants/features/${encodePathParam(params.name)}` }, opts))
  }
}
class VtexIdApi_authentication {
  constructor(private http: VtexHttpClient) {}

  async postApiVtexidApptokenLogin(params: {
  an?: string
  body: Credentials
}, opts?: CallOptions): Promise<{
  authStatus?: string
  token?: string
  expires?: number
}> {
    return this.http.request<{
  authStatus?: string
  token?: string
  expires?: number
}>(withCall({ method: 'POST', path: `/api/vtexid/apptoken/login`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async postApiVtexidAudienceWebstoreProviderOauthExchange(params: {
  body: {
  providerId: string
  accessToken: string
  duration?: number
}
}, opts?: CallOptions): Promise<{
  authToken?: string
}> {
    return this.http.request<{
  authToken?: string
}>(withCall({ method: 'POST', path: `/api/vtexid/audience/webstore/provider/oauth/exchange`, body: params.body }, opts))
  }

  async postApiVtexidCredentialValidate(params: {
  an?: string
  body: {
  token: string
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/vtexid/credential/validate`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async postApiVtexidPubProvidersSetupPasswordWebstorePassword(params: {
  body: {
  isActive?: boolean
  allowRepeated?: boolean
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/vtexid/pub/providers/setup/password/webstore/password`, body: params.body }, opts))
  }

  async postApiVtexidPasswordExpire(params: {
  email: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/vtexid/password/expire`, query: { 'email': params.email } }, opts))
  }

  async getApiVtexidPvtUserId(params: {
  usuario: string
}, opts?: CallOptions): Promise<string | null> {
    return this.http.request<string | null>(withCall({ method: 'GET', path: `/api/vtexid/pvt/user/id`, query: { 'usuario': params.usuario } }, opts))
  }
}
class VtexIdApi_tokenRenewal {
  constructor(private http: VtexHttpClient) {}

  async patchApiVtexidApikeyByApiKeyApitokenRenew(params: {
  apiKey: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'PATCH', path: `/api/vtexid/apikey/${encodePathParam(params.apiKey)}/apitoken/renew` }, opts))
  }

  async patchApiVtexidApikeyByApiKeyApitokenFinishRenewal(params: {
  apiKey: string
}, opts?: CallOptions): Promise<{
  id?: string
  creationDateToken?: string
  creationDateNewToken?: string | null
}> {
    return this.http.request<{
  id?: string
  creationDateToken?: string
  creationDateNewToken?: string | null
}>(withCall({ method: 'PATCH', path: `/api/vtexid/apikey/${encodePathParam(params.apiKey)}/apitoken/finish-renewal` }, opts))
  }
}
class VtexIdApi_refreshTokenHeadless {
  constructor(private http: VtexHttpClient) {}

  async getApiVtexidPubAuthenticationStart(params: {
  scope: string
  fingerprint?: string
}, opts?: CallOptions): Promise<{
  authenticationToken?: string
  oauthProviders?: {
  providerName?: string
  className?: string
  expectedContext?: string[]
}[]
  showClassicAuthentication?: boolean
  showAccessKeyAuthentication?: boolean
  showPasskeyAuthentication?: boolean
  authCookie?: string | null
  isAuthenticated?: boolean
  selectedProvider?: string | null
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
  authCookie?: string | null
  isAuthenticated?: boolean
  selectedProvider?: string | null
  samlProviders?: string[]
}>(withCall({ method: 'GET', path: `/api/vtexid/pub/authentication/start`, query: { 'scope': params.scope, 'fingerprint': params.fingerprint }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiVtexidPubAuthenticationAccesskeySend(params: {
  email: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/vtexid/pub/authentication/accesskey/send`, query: { 'email': params.email }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiVtexidPubAuthenticationAccesskeyValidate(params: {
  body: FormData
}, opts?: CallOptions): Promise<ValidateSessionResponse> {
    return this.http.request<ValidateSessionResponse>(withCall({ method: 'POST', path: `/api/vtexid/pub/authentication/accesskey/validate`, body: params.body, contentType: 'multipart/form-data', server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiVtexidRefreshtokenWebstore(params: {
  body: {
  fingerprint?: string | null
}
}, opts?: CallOptions): Promise<{
  status?: "Success" | "InvalidSession" | "InvalidToken" | "InvalidEmail" | "InvalidScope"
  userId?: string
  refreshAfter?: string
}> {
    return this.http.request<{
  status?: "Success" | "InvalidSession" | "InvalidToken" | "InvalidEmail" | "InvalidScope"
  userId?: string
  refreshAfter?: string
}>(withCall({ method: 'POST', path: `/api/vtexid/refreshtoken/webstore`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class VtexIdApi_organizationAccountAuthentication {
  constructor(private http: VtexHttpClient) {}

  async getApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/vtexid/organization-units/${encodePathParam(params.unitId)}/settings` }, opts))
  }

  async postApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
  body: {
  settings: {
  type: "Password" | "OAuth"
  name: string
  status: "Enabled" | "Disabled"
}[]
}
}, opts?: CallOptions): Promise<{
  success?: boolean
}> {
    return this.http.request<{
  success?: boolean
}>(withCall({ method: 'POST', path: `/api/vtexid/organization-units/${encodePathParam(params.unitId)}/settings`, body: params.body }, opts))
  }

  async patchApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
  body: {
  settings: {
  type: "OAuth"
  status: "Enabled" | "Disabled"
}[]
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'PATCH', path: `/api/vtexid/organization-units/${encodePathParam(params.unitId)}/settings`, body: params.body }, opts))
  }

  async deleteApiVtexidOrganizationUnitsByUnitIdSettings(params: {
  unitId: string
  body: {
  settings: {
  type: "OAuth" | "Password"
}[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/vtexid/organization-units/${encodePathParam(params.unitId)}/settings`, body: params.body }, opts))
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
