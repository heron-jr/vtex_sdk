import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { ErrorResponse, OrganizationUnit, ScopeResponse, ScopeValuesRequest, ScopeOperationResponse, UnitDto } from './types.js'

class OrganizationUnitsApi_users {
  constructor(private http: VtexHttpClient) {}

  async getApiOrganizationUnitsV1UsersByUserIdScopes(params: {
  userId: string
}, opts?: CallOptions): Promise<ScopeResponse[]> {
    return this.http.request<ScopeResponse[]>(withCall({ method: 'GET', path: `/api/organization-units/v1/users/${encodePathParam(params.userId)}/scopes`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiOrganizationUnitsV1ByUserIdUnit(params: {
  userId: string
}, opts?: CallOptions): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>(withCall({ method: 'GET', path: `/api/organization-units/v1/${encodePathParam(params.userId)}/unit`, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class OrganizationUnitsApi_units {
  constructor(private http: VtexHttpClient) {}

  async getApiOrganizationUnitsV1(params: {
  name?: string
  page?: number
  pageSize?: number
} = {}, opts?: CallOptions): Promise<OrganizationUnit[]> {
    return this.http.request<OrganizationUnit[]>(withCall({ method: 'GET', path: `/api/organization-units/v1`, query: { 'name': params.name, 'page': params.page, 'pageSize': params.pageSize }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiOrganizationUnitsV1(params: {
  body: {
  name: string
}
}, opts?: CallOptions): Promise<{
  createdAt?: string
  updatedAt?: string
  name?: string
  path?: {
  ids?: string
}
  id?: string
  customerGroup?: {
  customerIds?: string[]
}
}> {
    return this.http.request<{
  createdAt?: string
  updatedAt?: string
  name?: string
  path?: {
  ids?: string
}
  id?: string
  customerGroup?: {
  customerIds?: string[]
}
}>(withCall({ method: 'POST', path: `/api/organization-units/v1`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiOrganizationUnitsV1ByOrganizationUnitId(params: {
  organizationUnitId: string
}, opts?: CallOptions): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>(withCall({ method: 'GET', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async patchApiOrganizationUnitsV1ByOrganizationUnitId(params: {
  organizationUnitId: string
  body: {
  name: string
}
}, opts?: CallOptions): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>(withCall({ method: 'PATCH', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiOrganizationUnitsV1ByOrganizationUnitId(params: {
  organizationUnitId: string
  cascade?: boolean
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}`, query: { 'cascade': params.cascade }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiOrganizationUnitsV1ByOrganizationUnitIdChildren(params: {
  organizationUnitId: string
  shallowSearch?: boolean
}, opts?: CallOptions): Promise<OrganizationUnit[]> {
    return this.http.request<OrganizationUnit[]>(withCall({ method: 'GET', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/children`, query: { 'shallowSearch': params.shallowSearch }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiOrganizationUnitsV1Roots(params: Record<string, never> = {}, opts?: CallOptions): Promise<OrganizationUnit[]> {
    return this.http.request<OrganizationUnit[]>(withCall({ method: 'GET', path: `/api/organization-units/v1/roots`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiOrganizationUnitsV1ByOrganizationUnitIdPath(params: {
  organizationUnitId: string
  body: {
  parentId: string | null
}
}, opts?: CallOptions): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>(withCall({ method: 'PUT', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/path`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiVtexidOrganizationUnitsByOrganizationUnitIdUsers(params: {
  organizationUnitId: string
}, opts?: CallOptions): Promise<{
  users?: {
  userId?: string
  login?: string
}[]
}> {
    return this.http.request<{
  users?: {
  userId?: string
  login?: string
}[]
}>(withCall({ method: 'GET', path: `/api/vtexid/organization-units/${encodePathParam(params.organizationUnitId)}/users`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiVtexidOrganizationUnitsByOrganizationUnitIdUsers(params: {
  organizationUnitId: string
  force: boolean
  body: {
  userIds: string[]
}
}, opts?: CallOptions): Promise<{
  organizationUnitId?: string
  addedUserIds?: string[]
  failedUserIds?: string[]
}> {
    return this.http.request<{
  organizationUnitId?: string
  addedUserIds?: string[]
  failedUserIds?: string[]
}>(withCall({ method: 'POST', path: `/api/vtexid/organization-units/${encodePathParam(params.organizationUnitId)}/users`, query: { 'force': params.force }, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiVtexidOrganizationUnitsByOrganizationUnitIdUsers(params: {
  organizationUnitId: string
  body: {
  userIds: string[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/vtexid/organization-units/${encodePathParam(params.organizationUnitId)}/users`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiOrganizationUnitsV1ScopeByScopeValueByScopeValue(params: {
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  scopeValue: string
}, opts?: CallOptions): Promise<UnitDto[]> {
    return this.http.request<UnitDto[]>(withCall({ method: 'GET', path: `/api/organization-units/v1/scope/${encodePathParam(params.scope)}/value/${encodePathParam(params.scopeValue)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class OrganizationUnitsApi_scopes {
  constructor(private http: VtexHttpClient) {}

  async getApiOrganizationUnitsV1ByOrganizationUnitIdScopes(params: {
  organizationUnitId: string
}, opts?: CallOptions): Promise<{
  organizationUnitId?: string
  scopes?: {
  scope?: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  ids?: string[]
}[]
}> {
    return this.http.request<{
  organizationUnitId?: string
  scopes?: {
  scope?: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  ids?: string[]
}[]
}>(withCall({ method: 'GET', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/scopes`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiOrganizationUnitsV1ByOrganizationUnitIdScopes(params: {
  organizationUnitId: string
}, opts?: CallOptions): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>(withCall({ method: 'DELETE', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/scopes`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScope(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  body: ScopeValuesRequest
}, opts?: CallOptions): Promise<ScopeOperationResponse> {
    return this.http.request<ScopeOperationResponse>(withCall({ method: 'POST', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/scopes/${encodePathParam(params.scope)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScope(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  body: ScopeValuesRequest
}, opts?: CallOptions): Promise<ScopeOperationResponse> {
    return this.http.request<ScopeOperationResponse>(withCall({ method: 'PUT', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/scopes/${encodePathParam(params.scope)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScope(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
}, opts?: CallOptions): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>(withCall({ method: 'DELETE', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/scopes/${encodePathParam(params.scope)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScopeRemove(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  body: ScopeValuesRequest
}, opts?: CallOptions): Promise<ScopeOperationResponse> {
    return this.http.request<ScopeOperationResponse>(withCall({ method: 'DELETE', path: `/api/organization-units/v1/${encodePathParam(params.organizationUnitId)}/scopes/${encodePathParam(params.scope)}/remove`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}

export class OrganizationUnitsApi {
  readonly users: OrganizationUnitsApi_users
  readonly units: OrganizationUnitsApi_units
  readonly scopes: OrganizationUnitsApi_scopes
  constructor(http: VtexHttpClient) {
    this.users = new OrganizationUnitsApi_users(http)
    this.units = new OrganizationUnitsApi_units(http)
    this.scopes = new OrganizationUnitsApi_scopes(http)
  }
}
