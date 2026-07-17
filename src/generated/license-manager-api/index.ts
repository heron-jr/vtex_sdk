import type { VtexHttpClient } from '../../core/http.js'
import type { AccountResponse, LicenseItems, SiteItems, AppKeyItems, CreateUserRequest, CreatenewappkeyRequest, CreatenewappkeyResponse, UpdateappkeyRequest, Getappkeysfromaccount, ListUsersResponse, ListRolesResponse, Paging, UserItems, RoleItems, ProductItems, StoreItems, VLMError } from './types.js'

class LicenseManagerApi_users {
  constructor(private http: VtexHttpClient) {}

  getUser(params: {
  userId: string
}): Promise<{
  id?: string
  name?: string
  email?: string
}> {
    return this.http.request<{
  id?: string
  name?: string
  email?: string
}>({ method: 'GET', path: `/api/license-manager/users/${params.userId}` })
  }

  deleteApiLicenseManagerUsersByUserId(params: {
  userId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/license-manager/users/${params.userId}` })
  }

  createUser(params: {
  body: CreateUserRequest
}): Promise<{
  id?: string
  email?: string
  name?: string
}> {
    return this.http.request<{
  id?: string
  email?: string
  name?: string
}>({ method: 'POST', path: `/api/license-manager/users`, body: params.body })
  }

  getListUsers(params: {
  numItems?: number
  pageNumber?: number
  sort?: string
  sortType?: string
}): Promise<ListUsersResponse> {
    return this.http.request<ListUsersResponse>({ method: 'GET', path: `/api/license-manager/site/pvt/logins/list/paged`, query: { 'numItems': params.numItems, 'pageNumber': params.pageNumber, 'sort': params.sort, 'sortType': params.sortType } })
  }
}
class LicenseManagerApi_roles {
  constructor(private http: VtexHttpClient) {}

  getRolesbyUser(params: {
  userId: string
}): Promise<{
  id?: number
  name?: string
}[]> {
    return this.http.request<{
  id?: number
  name?: string
}[]>({ method: 'GET', path: `/api/license-manager/users/${params.userId}/roles` })
  }

  putRolesinUser(params: {
  userId: string
  body: number[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/license-manager/users/${params.userId}/roles`, body: params.body })
  }

  removeRolefromUser(params: {
  userId: string
  roleId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/license-manager/users/${params.userId}/roles/${params.roleId}` })
  }

  getListRoles(params: {
  numItems?: number
  pageNumber?: number
  sort?: string
  sortType?: string
}): Promise<ListRolesResponse> {
    return this.http.request<ListRolesResponse>({ method: 'GET', path: `/api/license-manager/site/pvt/roles/list/paged`, query: { 'numItems': params.numItems, 'pageNumber': params.pageNumber, 'sort': params.sort, 'sortType': params.sortType } })
  }
}
class LicenseManagerApi_apiKeys {
  constructor(private http: VtexHttpClient) {}

  getappkeysfromaccount(params: Record<string, never>): Promise<Getappkeysfromaccount[]> {
    return this.http.request<Getappkeysfromaccount[]>({ method: 'GET', path: `/api/vlm/appkeys` })
  }

  createnewappkey(params: {
  body: CreatenewappkeyRequest
}): Promise<CreatenewappkeyResponse> {
    return this.http.request<CreatenewappkeyResponse>({ method: 'POST', path: `/api/vlm/appkeys`, body: params.body })
  }

  updateappkey(params: {
  id: string
  body: UpdateappkeyRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/vlm/appkeys/${params.id}`, body: params.body })
  }
}
class LicenseManagerApi_stores {
  constructor(private http: VtexHttpClient) {}

  getByAccount(params: Record<string, never>): Promise<StoreItems[]> {
    return this.http.request<StoreItems[]>({ method: 'GET', path: `/api/vlm/account/stores` })
  }
}
class LicenseManagerApi_account {
  constructor(private http: VtexHttpClient) {}

  getAccount(params: Record<string, never>): Promise<AccountResponse> {
    return this.http.request<AccountResponse>({ method: 'GET', path: `/api/vlm/account` })
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
