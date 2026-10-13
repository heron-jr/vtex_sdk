import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { AccountResponse, LicenseItems, SiteItems, AppKeyItems, CreateUserRequest, CreatenewappkeyRequest, CreatenewappkeyResponse, UpdateappkeyRequest, Getappkeysfromaccount, ListUsersResponse, ListRolesResponse, Paging, UserItems, RoleItems, ProductItems, StoreItems, VLMError } from './types.js'

class LicenseManagerApi_users {
  constructor(private http: VtexHttpClient) {}

  getUser(params: {
  userId: string
}, opts?: CallOptions): Promise<{
  id?: string
  name?: string
  email?: string
}> {
    return this.http.request<{
  id?: string
  name?: string
  email?: string
}>(withCall({ method: 'GET', path: `/api/license-manager/users/${encodePathParam(params.userId)}` }, opts))
  }

  deleteApiLicenseManagerUsersByUserId(params: {
  userId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/license-manager/users/${encodePathParam(params.userId)}` }, opts))
  }

  createUser(params: {
  body: CreateUserRequest
}, opts?: CallOptions): Promise<{
  id?: string
  email?: string
  name?: string
}> {
    return this.http.request<{
  id?: string
  email?: string
  name?: string
}>(withCall({ method: 'POST', path: `/api/license-manager/users`, body: params.body }, opts))
  }

  getListUsers(params: {
  numItems?: number
  pageNumber?: number
  sort?: string
  sortType?: string
} = {}, opts?: CallOptions): Promise<ListUsersResponse> {
    return this.http.request<ListUsersResponse>(withCall({ method: 'GET', path: `/api/license-manager/site/pvt/logins/list/paged`, query: { 'numItems': params.numItems, 'pageNumber': params.pageNumber, 'sort': params.sort, 'sortType': params.sortType } }, opts))
  }
}
class LicenseManagerApi_roles {
  constructor(private http: VtexHttpClient) {}

  getRolesbyUser(params: {
  userId: string
}, opts?: CallOptions): Promise<{
  id?: number
  name?: string
}[]> {
    return this.http.request<{
  id?: number
  name?: string
}[]>(withCall({ method: 'GET', path: `/api/license-manager/users/${encodePathParam(params.userId)}/roles` }, opts))
  }

  putRolesinUser(params: {
  userId: string
  body: number[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/license-manager/users/${encodePathParam(params.userId)}/roles`, body: params.body }, opts))
  }

  removeRolefromUser(params: {
  userId: string
  roleId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/license-manager/users/${encodePathParam(params.userId)}/roles/${encodePathParam(params.roleId)}` }, opts))
  }

  getListRoles(params: {
  numItems?: number
  pageNumber?: number
  sort?: string
  sortType?: string
} = {}, opts?: CallOptions): Promise<ListRolesResponse> {
    return this.http.request<ListRolesResponse>(withCall({ method: 'GET', path: `/api/license-manager/site/pvt/roles/list/paged`, query: { 'numItems': params.numItems, 'pageNumber': params.pageNumber, 'sort': params.sort, 'sortType': params.sortType } }, opts))
  }
}
class LicenseManagerApi_apiKeys {
  constructor(private http: VtexHttpClient) {}

  getappkeysfromaccount(params: Record<string, never> = {}, opts?: CallOptions): Promise<Getappkeysfromaccount[]> {
    return this.http.request<Getappkeysfromaccount[]>(withCall({ method: 'GET', path: `/api/vlm/appkeys` }, opts))
  }

  createnewappkey(params: {
  body: CreatenewappkeyRequest
}, opts?: CallOptions): Promise<CreatenewappkeyResponse> {
    return this.http.request<CreatenewappkeyResponse>(withCall({ method: 'POST', path: `/api/vlm/appkeys`, body: params.body }, opts))
  }

  updateappkey(params: {
  id: string
  body: UpdateappkeyRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/vlm/appkeys/${encodePathParam(params.id)}`, body: params.body }, opts))
  }
}
class LicenseManagerApi_stores {
  constructor(private http: VtexHttpClient) {}

  getByAccount(params: Record<string, never> = {}, opts?: CallOptions): Promise<StoreItems[]> {
    return this.http.request<StoreItems[]>(withCall({ method: 'GET', path: `/api/vlm/account/stores` }, opts))
  }
}
class LicenseManagerApi_account {
  constructor(private http: VtexHttpClient) {}

  getAccount(params: Record<string, never> = {}, opts?: CallOptions): Promise<AccountResponse> {
    return this.http.request<AccountResponse>(withCall({ method: 'GET', path: `/api/vlm/account` }, opts))
  }
}

export class LicenseManagerApi {
  readonly users: LicenseManagerApi_users
  readonly roles: LicenseManagerApi_roles
  readonly apiKeys: LicenseManagerApi_apiKeys
  readonly stores: LicenseManagerApi_stores
  readonly account: LicenseManagerApi_account
  constructor(http: VtexHttpClient) {
    this.users = new LicenseManagerApi_users(http)
    this.roles = new LicenseManagerApi_roles(http)
    this.apiKeys = new LicenseManagerApi_apiKeys(http)
    this.stores = new LicenseManagerApi_stores(http)
    this.account = new LicenseManagerApi_account(http)
  }
}
