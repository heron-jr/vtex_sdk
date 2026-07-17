import type { VtexHttpClient } from '../../core/http.js'
import type { ErrorResponse, OrganizationUnit, ScopeResponse, ScopeValuesRequest, ScopeOperationResponse, UnitDto } from './types.js'

class OrganizationUnitsApi_users {
  constructor(private http: VtexHttpClient) {}

  getApiOrganizationUnitsV1UsersByUserIdScopes(params: {
  userId: string
}): Promise<ScopeResponse[]> {
    return this.http.request<ScopeResponse[]>({ method: 'GET', path: `/api/organization-units/v1/users/${params.userId}/scopes` })
  }

  getApiOrganizationUnitsV1ByUserIdUnit(params: {
  userId: string
}): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>({ method: 'GET', path: `/api/organization-units/v1/${params.userId}/unit` })
  }
}
class OrganizationUnitsApi_units {
  constructor(private http: VtexHttpClient) {}

  getApiOrganizationUnitsV1(params: {
  name?: string
  page?: number
  pageSize?: number
}): Promise<OrganizationUnit[]> {
    return this.http.request<OrganizationUnit[]>({ method: 'GET', path: `/api/organization-units/v1`, query: { 'name': params.name, 'page': params.page, 'pageSize': params.pageSize } })
  }

  postApiOrganizationUnitsV1(params: {
  body: {
  name: string
}
}): Promise<{
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
}>({ method: 'POST', path: `/api/organization-units/v1`, body: params.body })
  }

  getApiOrganizationUnitsV1ByOrganizationUnitId(params: {
  organizationUnitId: string
}): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>({ method: 'GET', path: `/api/organization-units/v1/${params.organizationUnitId}` })
  }

  patchApiOrganizationUnitsV1ByOrganizationUnitId(params: {
  organizationUnitId: string
  body: {
  name: string
}
}): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>({ method: 'PATCH', path: `/api/organization-units/v1/${params.organizationUnitId}`, body: params.body })
  }

  deleteApiOrganizationUnitsV1ByOrganizationUnitId(params: {
  organizationUnitId: string
  cascade?: boolean
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/organization-units/v1/${params.organizationUnitId}`, query: { 'cascade': params.cascade } })
  }

  getApiOrganizationUnitsV1ByOrganizationUnitIdChildren(params: {
  organizationUnitId: string
  shallowSearch?: boolean
}): Promise<OrganizationUnit[]> {
    return this.http.request<OrganizationUnit[]>({ method: 'GET', path: `/api/organization-units/v1/${params.organizationUnitId}/children`, query: { 'shallowSearch': params.shallowSearch } })
  }

  getApiOrganizationUnitsV1Roots(params: Record<string, never>): Promise<OrganizationUnit[]> {
    return this.http.request<OrganizationUnit[]>({ method: 'GET', path: `/api/organization-units/v1/roots` })
  }

  putApiOrganizationUnitsV1ByOrganizationUnitIdPath(params: {
  organizationUnitId: string
  body: {
  parentId: string
}
}): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>({ method: 'PUT', path: `/api/organization-units/v1/${params.organizationUnitId}/path`, body: params.body })
  }

  getApiVtexidOrganizationUnitsByOrganizationUnitIdUsers(params: {
  organizationUnitId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/vtexid/organization-units/${params.organizationUnitId}/users` })
  }

  postApiVtexidOrganizationUnitsByOrganizationUnitIdUsers(params: {
  organizationUnitId: string
  force: boolean
  body: {
  userIds: string[]
}
}): Promise<{
  organizationUnitId?: string
  addedUserIds?: string[]
  failedUserIds?: string[]
}> {
    return this.http.request<{
  organizationUnitId?: string
  addedUserIds?: string[]
  failedUserIds?: string[]
}>({ method: 'POST', path: `/api/vtexid/organization-units/${params.organizationUnitId}/users`, query: { 'force': params.force }, body: params.body })
  }

  deleteApiVtexidOrganizationUnitsByOrganizationUnitIdUsers(params: {
  organizationUnitId: string
  body: {
  userIds: string[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/vtexid/organization-units/${params.organizationUnitId}/users`, body: params.body })
  }

  getApiOrganizationUnitsV1ScopeByScopeValueByScopeValue(params: {
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  scopeValue: string
}): Promise<UnitDto[]> {
    return this.http.request<UnitDto[]>({ method: 'GET', path: `/api/organization-units/v1/scope/${params.scope}/value/${params.scopeValue}` })
  }
}
class OrganizationUnitsApi_scopes {
  constructor(private http: VtexHttpClient) {}

  getApiOrganizationUnitsV1ByOrganizationUnitIdScopes(params: {
  organizationUnitId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/organization-units/v1/${params.organizationUnitId}/scopes` })
  }

  deleteApiOrganizationUnitsV1ByOrganizationUnitIdScopes(params: {
  organizationUnitId: string
}): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>({ method: 'DELETE', path: `/api/organization-units/v1/${params.organizationUnitId}/scopes` })
  }

  postApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScope(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  body: ScopeValuesRequest
}): Promise<ScopeOperationResponse> {
    return this.http.request<ScopeOperationResponse>({ method: 'POST', path: `/api/organization-units/v1/${params.organizationUnitId}/scopes/${params.scope}`, body: params.body })
  }

  putApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScope(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  body: ScopeValuesRequest
}): Promise<ScopeOperationResponse> {
    return this.http.request<ScopeOperationResponse>({ method: 'PUT', path: `/api/organization-units/v1/${params.organizationUnitId}/scopes/${params.scope}`, body: params.body })
  }

  deleteApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScope(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
}): Promise<OrganizationUnit> {
    return this.http.request<OrganizationUnit>({ method: 'DELETE', path: `/api/organization-units/v1/${params.organizationUnitId}/scopes/${params.scope}` })
  }

  deleteApiOrganizationUnitsV1ByOrganizationUnitIdScopesByScopeRemove(params: {
  organizationUnitId: string
  scope: "contractIds" | "creditCards" | "installmentOptions" | "collectionIds" | "priceTables" | "paymentSystemIds" | "addresses" | "customFields"
  body: ScopeValuesRequest
}): Promise<ScopeOperationResponse> {
    return this.http.request<ScopeOperationResponse>({ method: 'DELETE', path: `/api/organization-units/v1/${params.organizationUnitId}/scopes/${params.scope}/remove`, body: params.body })
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
