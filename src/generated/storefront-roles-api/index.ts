import type { VtexHttpClient } from '../../core/http.js'

class StorefrontRolesApi_storefrontRoles {
  constructor(private http: VtexHttpClient) {}

  postApiLicenseManagerStorefrontRolesAssign(params: {
  body: {
  roleId: number
  userId: string
}
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'POST', path: `/api/license-manager/storefront/roles/assign`, body: params.body })
  }

  postApiLicenseManagerStorefrontUserRoles(params: {
  body: {
  id: string
  roleIds: number[]
}
}): Promise<{
  id?: string
  roles?: {
  id?: number
  name?: string
}[]
}> {
    return this.http.request<{
  id?: string
  roles?: {
  id?: number
  name?: string
}[]
}>({ method: 'POST', path: `/api/license-manager/storefront/user/roles`, body: params.body })
  }

  deleteApiLicenseManagerStorefrontUserRoles(params: {
  body: {
  id: string
  roleIds: number[]
}
}): Promise<{
  id?: string
  roles?: {
  id?: number
  name?: string
}[]
}> {
    return this.http.request<{
  id?: string
  roles?: {
  id?: number
  name?: string
}[]
}>({ method: 'DELETE', path: `/api/license-manager/storefront/user/roles`, body: params.body })
  }

  getApiLicenseManagerStorefrontUsersByUserIdResourcesByResourceKeyGranted(params: {
  userId: string
  resourceKey: string
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'GET', path: `/api/license-manager/storefront/users/${params.userId}/resources/${params.resourceKey}/granted` })
  }

  deleteApiLicenseManagerStorefrontRemoveUsersByUserId(params: {
  userId: string
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'DELETE', path: `/api/license-manager/storefront/remove/users/${params.userId}` })
  }

  getApiLicenseManagerStorefrontUsersByUserIdRoles(params: {
  userId: string
}): Promise<{
  userId?: string
  identifier?: string
  roles?: {
  id?: number
  name?: string
}[]
}> {
    return this.http.request<{
  userId?: string
  identifier?: string
  roles?: {
  id?: number
  name?: string
}[]
}>({ method: 'GET', path: `/api/license-manager/storefront/users/${params.userId}/roles` })
  }

  getApiLicenseManagerStorefrontUsersByEmailRoles(params: {
  email: string
}): Promise<{
  userId?: string
  email?: string
  roles?: string[]
}> {
    return this.http.request<{
  userId?: string
  email?: string
  roles?: string[]
}>({ method: 'GET', path: `/api/license-manager/storefront/users/${params.email}/roles` })
  }

  getApiLicenseManagerStorefrontUsersByUserId(params: {
  userId: string
}): Promise<{
  email?: string
}> {
    return this.http.request<{
  email?: string
}>({ method: 'GET', path: `/api/license-manager/storefront/users/${params.userId}` })
  }
}
class StorefrontRolesApi_customStorefrontRoles {
  constructor(private http: VtexHttpClient) {}

  getApiLicenseManagerStorefrontRole(params: {
  an: string
}): Promise<{
  Id?: number
  Name?: string
  IsCustom?: boolean
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}[]> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsCustom?: boolean
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}[]>({ method: 'GET', path: `/api/license-manager/storefront/role`, query: { 'an': params.an } })
  }

  postApiLicenseManagerStorefrontRole(params: {
  an: string
  body: {
  Name: string
  Resources: number[]
}
}): Promise<{
  Id?: number
  Name?: string
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}>({ method: 'POST', path: `/api/license-manager/storefront/role`, query: { 'an': params.an }, body: params.body })
  }

  getApiLicenseManagerStorefrontRoleByRoleId(params: {
  roleId: number
  an: string
}): Promise<{
  Id?: number
  Name?: string
  IsCustom?: boolean
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsCustom?: boolean
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}>({ method: 'GET', path: `/api/license-manager/storefront/role/${params.roleId}`, query: { 'an': params.an } })
  }

  putApiLicenseManagerStorefrontRoleByRoleId(params: {
  roleId: number
  an: string
  body: {
  Resources: number[]
}
}): Promise<{
  Id?: number
  Name?: string
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  Resources?: {
  Id?: number
  Key?: string
  IsCustom?: boolean
}[]
}>({ method: 'PUT', path: `/api/license-manager/storefront/role/${params.roleId}`, query: { 'an': params.an }, body: params.body })
  }

  deleteApiLicenseManagerStorefrontRoleByRoleId(params: {
  roleId: number
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/license-manager/storefront/role/${params.roleId}`, query: { 'an': params.an } })
  }
}
class StorefrontRolesApi_customStorefrontResources {
  constructor(private http: VtexHttpClient) {}

  getApiLicenseManagerStorefrontResource(params: {
  an: string
}): Promise<{
  Id?: number
  Key?: string
  Name?: string
  Description?: string
  IsCustom?: boolean
}[]> {
    return this.http.request<{
  Id?: number
  Key?: string
  Name?: string
  Description?: string
  IsCustom?: boolean
}[]>({ method: 'GET', path: `/api/license-manager/storefront/resource`, query: { 'an': params.an } })
  }

  postApiLicenseManagerStorefrontResource(params: {
  an: string
  body: {
  Key: string
  Name?: string
  Description?: string
}
}): Promise<{
  Id?: number
  Key?: string
  Name?: string
  Description?: string
}> {
    return this.http.request<{
  Id?: number
  Key?: string
  Name?: string
  Description?: string
}>({ method: 'POST', path: `/api/license-manager/storefront/resource`, query: { 'an': params.an }, body: params.body })
  }

  deleteApiLicenseManagerStorefrontResourceById(params: {
  id: number
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/license-manager/storefront/resource/${params.id}`, query: { 'an': params.an } })
  }
}

export class StorefrontRolesApi {
  readonly storefrontRoles: StorefrontRolesApi_storefrontRoles
  readonly customStorefrontRoles: StorefrontRolesApi_customStorefrontRoles
  readonly customStorefrontResources: StorefrontRolesApi_customStorefrontResources
  constructor(http: VtexHttpClient) {
    this.storefrontRoles = new StorefrontRolesApi_storefrontRoles(http)
    this.customStorefrontRoles = new StorefrontRolesApi_customStorefrontRoles(http)
    this.customStorefrontResources = new StorefrontRolesApi_customStorefrontResources(http)
  }
}
