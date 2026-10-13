import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class StorefrontRolesApi_storefrontRoles {
  constructor(private http: VtexHttpClient) {}

  async postApiLicenseManagerStorefrontRolesAssign(params: {
  body: {
  roleId: number
  userId: string
}
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'POST', path: `/api/license-manager/storefront/roles/assign`, body: params.body }, opts))
  }

  async postApiLicenseManagerStorefrontUserRoles(params: {
  body: {
  id: string
  roleIds: number[]
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/license-manager/storefront/user/roles`, body: params.body }, opts))
  }

  async deleteApiLicenseManagerStorefrontUserRoles(params: {
  body: {
  id: string
  roleIds: number[]
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'DELETE', path: `/api/license-manager/storefront/user/roles`, body: params.body }, opts))
  }

  async getApiLicenseManagerStorefrontUsersByUserIdResourcesByResourceKeyGranted(params: {
  userId: string
  resourceKey: string
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'GET', path: `/api/license-manager/storefront/users/${encodePathParam(params.userId)}/resources/${encodePathParam(params.resourceKey)}/granted` }, opts))
  }

  async deleteApiLicenseManagerStorefrontRemoveUsersByUserId(params: {
  userId: string
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'DELETE', path: `/api/license-manager/storefront/remove/users/${encodePathParam(params.userId)}` }, opts))
  }

  async getApiLicenseManagerStorefrontUsersByUserIdRoles(params: {
  userId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/license-manager/storefront/users/${encodePathParam(params.userId)}/roles` }, opts))
  }

  async getApiLicenseManagerStorefrontUsersByEmailRoles(params: {
  email: string
}, opts?: CallOptions): Promise<{
  userId?: string
  email?: string
  roles?: string[]
}> {
    return this.http.request<{
  userId?: string
  email?: string
  roles?: string[]
}>(withCall({ method: 'GET', path: `/api/license-manager/storefront/users/${encodePathParam(params.email)}/roles` }, opts))
  }

  async getApiLicenseManagerStorefrontUsersByUserId(params: {
  userId: string
}, opts?: CallOptions): Promise<{
  email?: string
}> {
    return this.http.request<{
  email?: string
}>(withCall({ method: 'GET', path: `/api/license-manager/storefront/users/${encodePathParam(params.userId)}` }, opts))
  }
}
class StorefrontRolesApi_customStorefrontRoles {
  constructor(private http: VtexHttpClient) {}

  async getApiLicenseManagerStorefrontRole(params: {
  an: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/license-manager/storefront/role`, query: { 'an': params.an } }, opts))
  }

  async postApiLicenseManagerStorefrontRole(params: {
  an: string
  body: {
  Name: string
  Resources: number[]
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/license-manager/storefront/role`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async getApiLicenseManagerStorefrontRoleByRoleId(params: {
  roleId: number
  an: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/license-manager/storefront/role/${encodePathParam(params.roleId)}`, query: { 'an': params.an } }, opts))
  }

  async putApiLicenseManagerStorefrontRoleByRoleId(params: {
  roleId: number
  an: string
  body: {
  Resources: number[]
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'PUT', path: `/api/license-manager/storefront/role/${encodePathParam(params.roleId)}`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async deleteApiLicenseManagerStorefrontRoleByRoleId(params: {
  roleId: number
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/license-manager/storefront/role/${encodePathParam(params.roleId)}`, query: { 'an': params.an } }, opts))
  }
}
class StorefrontRolesApi_customStorefrontResources {
  constructor(private http: VtexHttpClient) {}

  async getApiLicenseManagerStorefrontResource(params: {
  an: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Key?: string
  Name?: string | null
  Description?: string | null
  IsCustom?: boolean
}[]> {
    return this.http.request<{
  Id?: number
  Key?: string
  Name?: string | null
  Description?: string | null
  IsCustom?: boolean
}[]>(withCall({ method: 'GET', path: `/api/license-manager/storefront/resource`, query: { 'an': params.an } }, opts))
  }

  async postApiLicenseManagerStorefrontResource(params: {
  an: string
  body: {
  Key: string
  Name?: string
  Description?: string
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/license-manager/storefront/resource`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async deleteApiLicenseManagerStorefrontResourceById(params: {
  id: number
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/license-manager/storefront/resource/${encodePathParam(params.id)}`, query: { 'an': params.an } }, opts))
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
