import type { VtexHttpClient } from '../../core/http.js'

class MarketplaceProtocolApi_externalMarketplace {
  constructor(private http: VtexHttpClient) {}

  listAllChannels(params: {
  an: string
}): Promise<{
  id?: number
  name?: string
}> {
    return this.http.request<{
  id?: number
  name?: string
}>({ method: 'GET', path: `/api/channel-manager/channel/all`, query: { 'an': params.an } })
  }

  retrieveChannel(params: {
  an: string
}): Promise<{
  id?: number
  name?: string
}> {
    return this.http.request<{
  id?: number
  name?: string
}>({ method: 'GET', path: `/api/channel-manager/channel/:channelId`, query: { 'an': params.an } })
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/mkp-category-mapper/connector/register`, query: { 'an': params.an }, body: params.body })
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
}[]
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/mkp-category-mapper/categories/marketplace/${params.id}`, body: params.body })
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
}): Promise<{
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
}>({ method: 'POST', path: `/api/channel-manager/connector`, query: { 'an': params.an }, body: params.body })
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
}): Promise<{
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
}>({ method: 'GET', path: `/api/channel-manager/connector/all`, query: { 'an': params.an, 'segment': params.segment, 'orderByConnectorType': params.orderByConnectorType, 'active': params.active, 'name': params.name, 'page': params.page, 'pageSize': params.pageSize, 'country': params.country, 'type': params.type, 'account': params.account } })
  }

  retrieveConnector(params: {
  an: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an } })
  }

  upsertMerchantConnection(params: {
  an: string
  body: {
  isActive: boolean
  affiliateId: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, body: params.body })
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, body: params.body })
  }

  partialUpdateConnector(params: {
  an: string
  body: {
  path: string
  op: string
  value: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an }, body: params.body })
  }

  removeConnector(params: {
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/channel-manager/connector/:connectorId`, query: { 'an': params.an } })
  }
}

export class MarketplaceProtocolApi {
  readonly externalMarketplace: MarketplaceProtocolApi_externalMarketplace
  constructor(http: VtexHttpClient) {
    this.externalMarketplace = new MarketplaceProtocolApi_externalMarketplace(http)
  }
}
