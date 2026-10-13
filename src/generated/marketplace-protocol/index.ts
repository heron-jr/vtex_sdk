import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class MarketplaceProtocolApi_externalMarketplace {
  constructor(private http: VtexHttpClient) {}

  listAllChannels(params: {
  an: string
}, opts?: CallOptions): Promise<{
  id?: number
  name?: string
}> {
    return this.http.request<{
  id?: number
  name?: string
}>(withCall({ method: 'GET', path: `/api/channel-manager/channel/all`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  retrieveChannel(params: {
  an: string
}, opts?: CallOptions): Promise<{
  id?: number
  name?: string
}> {
    return this.http.request<{
  id?: number
  name?: string
}>(withCall({ method: 'GET', path: `/api/channel-manager/channel/:channelId`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  vtexMapperRegistration(params: {
  an: string
  body: {
  displayName: string
  categoryTreeEndPoint: string
  mappingEndPoint: string
  properties: {
  allowsRemap: boolean
}
  CategoryTreeProcessingNotificationEndpoint?: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/mkp-category-mapper/connector/register`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  sendCategoryMappingVtexMapper(params: {
  id: string
  body: {
  categories: {
  id: string
  name: string
  children: {
  id: string
  name: string
  children: {
  id: string
  name: string
  specifications: {
  attributeName: string
  required: boolean
  attributeValues: {
  valueName: string
}[]
}[]
}[] | null
  specifications: {
  attributeName: string
  required: boolean
  attributeValues: {
  valueName: string
}[]
}[]
}[]
}[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/mkp-category-mapper/categories/marketplace/${encodePathParam(params.id)}`, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  registerConnector(params: {
  an: string
  body: {
  name?: string
  website?: string
  logo?: string
  description?: string
  segment?: string
  availableCountries?: string[]
  type?: string
  isActive?: boolean
  helpUrl?: string
  connectorVtexAdminPath?: string
  connectorPageUrl?: string
  connectorApiEndpoint?: string
  channelId?: string
}
}, opts?: CallOptions): Promise<{
  id?: number
  name?: string
  website?: string
  logo?: string
  description?: string
  helpUrl?: string
  segment?: string
  availableCountries?: string[]
  availableStates?: string[]
  type?: string
  connectorPageUrl?: string
  connectorVtexAdminPath?: string
  connectorApiEndpoint?: string
  channelId?: string
  isGloballyAvailable?: boolean
  ownerVtexAccount?: string
  isActive?: boolean
  isCertified?: boolean
  contactInfo?: {
  name?: string
  email?: string
  phone?: string
  defaultMessage?: string
}
  isConnectionActive?: boolean
  affiliateId?: string
}> {
    return this.http.request<{
  id?: number
  name?: string
  website?: string
  logo?: string
  description?: string
  helpUrl?: string
  segment?: string
  availableCountries?: string[]
  availableStates?: string[]
  type?: string
  connectorPageUrl?: string
  connectorVtexAdminPath?: string
  connectorApiEndpoint?: string
  channelId?: string
  isGloballyAvailable?: boolean
  ownerVtexAccount?: string
  isActive?: boolean
  isCertified?: boolean
  contactInfo?: {
  name?: string
  email?: string
  phone?: string
  defaultMessage?: string
}
  isConnectionActive?: boolean
  affiliateId?: string
}>(withCall({ method: 'POST', path: `/api/channel-manager/connector`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  listAllConnectors(params: {
  an: string
  segment?: string
  orderByConnectorType?: string
  active?: string
  name?: string
  page?: number
  pageSize: number
  country?: string
  type?: string
  account?: string
}, opts?: CallOptions): Promise<{
  metadata?: {
  totalCount?: number
  currentPage?: number
  pageSize?: number
  totalPages?: number
}
  results?: {
  id?: number
  name?: string
  website?: string
  logo?: string
  description?: string
  helpUrl?: string
  segment?: string
  availableCountries?: string[]
  availableStates?: string[]
  type?: string
  connectorPageUrl?: string
  connectorVtexAdminPath?: string
  connectorApiEndpoint?: string
  channelId?: string
  isGloballyAvailable?: boolean
  ownerVtexAccount?: string
  isActive?: boolean
  isCertified?: boolean
  contactInfo?: {
  name?: string
  email?: string
  phone?: string
  defaultMessage?: string
}
  isConnectionActive?: boolean
  affiliateId?: string
}[]
}> {
    return this.http.request<{
  metadata?: {
  totalCount?: number
  currentPage?: number
  pageSize?: number
  totalPages?: number
}
  results?: {
  id?: number
  name?: string
  website?: string
  logo?: string
  description?: string
  helpUrl?: string
  segment?: string
  availableCountries?: string[]
  availableStates?: string[]
  type?: string
  connectorPageUrl?: string
  connectorVtexAdminPath?: string
  connectorApiEndpoint?: string
  channelId?: string
  isGloballyAvailable?: boolean
  ownerVtexAccount?: string
  isActive?: boolean
  isCertified?: boolean
  contactInfo?: {
  name?: string
  email?: string
  phone?: string
  defaultMessage?: string
}
  isConnectionActive?: boolean
  affiliateId?: string
}[]
}>(withCall({ method: 'GET', path: `/api/channel-manager/connector/all`, query: { 'an': params.an, 'segment': params.segment, 'orderByConnectorType': params.orderByConnectorType, 'active': params.active, 'name': params.name, 'page': params.page, 'pageSize': params.pageSize, 'country': params.country, 'type': params.type, 'account': params.account }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  retrieveConnector(params: {
  an: string
}, opts?: CallOptions): Promise<{
  id?: number
  name?: string
  website?: string
  logo?: string
  description?: string
  helpUrl?: string
  segment?: string
  availableCountries?: string[]
  availableStates?: string[]
  type?: string
  connectorPageUrl?: string
  connectorVtexAdminPath?: string
  connectorApiEndpoint?: string
  channelId?: number
  isGloballyAvailable?: boolean
  ownerVtexAccount?: string
  isActive?: boolean
  isCertified?: boolean
  contactInfo?: {
  name?: string
  email?: string
  phone?: string
  defaultMessage?: string
}
  isConnectionActive?: boolean
  affiliateId?: string
}> {
    return this.http.request<{
  id?: number
  name?: string
  website?: string
  logo?: string
  description?: string
  helpUrl?: string
  segment?: string
  availableCountries?: string[]
  availableStates?: string[]
  type?: string
  connectorPageUrl?: string
  connectorVtexAdminPath?: string
  connectorApiEndpoint?: string
  channelId?: number
  isGloballyAvailable?: boolean
  ownerVtexAccount?: string
  isActive?: boolean
  isCertified?: boolean
  contactInfo?: {
  name?: string
  email?: string
  phone?: string
  defaultMessage?: string
}
  isConnectionActive?: boolean
  affiliateId?: string
}>(withCall({ method: 'GET', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  upsertMerchantConnection(params: {
  an: string
  body: {
  isActive: boolean
  affiliateId: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  fullUpdateConnector(params: {
  an: string
  body: {
  name: string
  website: string
  logo: string
  description: string
  segment: string
  availableCountries: string[]
  connectorVtexAdminPath: string
  connectorApiEndpoint: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  partialUpdateConnector(params: {
  an: string
  body: {
  path: string
  op: string
  value: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  removeConnector(params: {
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }
}

export class MarketplaceProtocolApi {
  readonly externalMarketplace: MarketplaceProtocolApi_externalMarketplace
  constructor(http: VtexHttpClient) {
    this.externalMarketplace = new MarketplaceProtocolApi_externalMarketplace(http)
  }
}
