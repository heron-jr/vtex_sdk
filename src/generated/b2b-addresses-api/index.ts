import type { VtexHttpClient } from '../../core/http.js'
import type { CreateUpdateAddressRequests, DocumentResponse, AddressResponse, RecipientRequest, LocationRequest } from './types.js'

class B2bAddressesApi_addresses {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesADDocuments(params: {
  body: CreateUpdateAddressRequests
}): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>({ method: 'POST', path: `/api/dataentities/AD/documents`, body: params.body })
  }

  getApiDataentitiesADSearch(params: {
  _fields?: string
  _where?: string
  _sort?: string
}): Promise<AddressResponse[]> {
    return this.http.request<AddressResponse[]>({ method: 'GET', path: `/api/dataentities/AD/search`, query: { '_fields': params._fields, '_where': params._where, '_sort': params._sort } })
  }

  getApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
  _fields?: string
}): Promise<AddressResponse> {
    return this.http.request<AddressResponse>({ method: 'GET', path: `/api/dataentities/AD/documents/${params.addressId}`, query: { '_fields': params._fields } })
  }

  patchApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
  body: CreateUpdateAddressRequests
}): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>({ method: 'PATCH', path: `/api/dataentities/AD/documents/${params.addressId}`, body: params.body })
  }

  deleteApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/AD/documents/${params.addressId}` })
  }
}
class B2bAddressesApi_recipients {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesContactInformationDocuments(params: {
  body: RecipientRequest
}): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>({ method: 'POST', path: `/api/dataentities/contact_information/documents`, body: params.body })
  }

  getApiDataentitiesContactInformationSearch(params: {
  _where: string
  _fields?: string
  _schema: string
}): Promise<{
  firstName?: string
  lastName?: string
  email?: string
}[]> {
    return this.http.request<{
  firstName?: string
  lastName?: string
  email?: string
}[]>({ method: 'GET', path: `/api/dataentities/contact_information/search`, query: { '_where': params._where, '_fields': params._fields, '_schema': params._schema } })
  }

  getApiDataentitiesContactInformationDocumentsByRecipientId(params: {
  recipientId: string
  _fields?: string
  _schema: string
}): Promise<RecipientRequest> {
    return this.http.request<RecipientRequest>({ method: 'GET', path: `/api/dataentities/contact_information/documents/${params.recipientId}`, query: { '_fields': params._fields, '_schema': params._schema } })
  }

  patchApiDataentitiesContactInformationDocumentsByRecipientId(params: {
  recipientId: string
  body: RecipientRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/contact_information/documents/${params.recipientId}`, body: params.body })
  }

  deleteApiDataentitiesContactInformationDocumentsByRecipientId(params: {
  recipientId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/contact_information/documents/${params.recipientId}` })
  }
}
class B2bAddressesApi_locations {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesCustomFieldValuesDocuments(params: {
  body: LocationRequest
}): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>({ method: 'POST', path: `/api/dataentities/customFieldValues/documents`, body: params.body })
  }

  getApiDataentitiesCustomFieldValuesDocumentsByLocationId(params: {
  locationId: string
  _fields: string
}): Promise<{
  id?: string
  dataEntityId?: string
  accountId?: string
  accountName?: string
  followers?: string[]
  schemas?: string[]
  customFieldId?: string
  contractId?: string
  auxId?: string
  value?: string
  description?: string
  createdBy?: string
  createdBy_USER?: {
  Id?: string
  Login?: string
  Name?: string
}
  createdIn?: string
  lastInteractionBy?: string
  lastInteractionBy_USER?: {
  Id?: string
  Login?: string
  Name?: string
}
  lastInteractionIn?: string
  Tags?: string[]
  dataInstanceId?: string
}> {
    return this.http.request<{
  id?: string
  dataEntityId?: string
  accountId?: string
  accountName?: string
  followers?: string[]
  schemas?: string[]
  customFieldId?: string
  contractId?: string
  auxId?: string
  value?: string
  description?: string
  createdBy?: string
  createdBy_USER?: {
  Id?: string
  Login?: string
  Name?: string
}
  createdIn?: string
  lastInteractionBy?: string
  lastInteractionBy_USER?: {
  Id?: string
  Login?: string
  Name?: string
}
  lastInteractionIn?: string
  Tags?: string[]
  dataInstanceId?: string
}>({ method: 'GET', path: `/api/dataentities/customFieldValues/documents/${params.locationId}`, query: { '_fields': params._fields } })
  }

  patchApiDataentitiesCustomFieldValuesDocumentsByLocationId(params: {
  locationId: string
  body: LocationRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/customFieldValues/documents/${params.locationId}`, body: params.body })
  }

  deleteApiDataentitiesCustomFieldValuesDocumentsByLocationId(params: {
  locationId: string
  _fields: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/customFieldValues/documents/${params.locationId}`, query: { '_fields': params._fields } })
  }

  getApiDataentitiesCustomFieldValuesSearch(params: {
  _schema: string
  _fields: string
  _where: string
  _sort?: string
}): Promise<{
  id?: string
  contractId?: string
  customFieldId?: string
  auxId?: string
  value?: string
  description?: string
}[]> {
    return this.http.request<{
  id?: string
  contractId?: string
  customFieldId?: string
  auxId?: string
  value?: string
  description?: string
}[]>({ method: 'GET', path: `/api/dataentities/customFieldValues/search`, query: { '_schema': params._schema, '_fields': params._fields, '_where': params._where, '_sort': params._sort } })
  }
}

export class B2bAddressesApi {
  readonly addresses: B2bAddressesApi_addresses
  readonly recipients: B2bAddressesApi_recipients
  readonly locations: B2bAddressesApi_locations
  constructor(http: VtexHttpClient) {
    this.addresses = new B2bAddressesApi_addresses(http)
    this.recipients = new B2bAddressesApi_recipients(http)
    this.locations = new B2bAddressesApi_locations(http)
  }
}
