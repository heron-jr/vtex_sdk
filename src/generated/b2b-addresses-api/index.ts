import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { CreateUpdateAddressRequests, DocumentResponse, AddressResponse, RecipientRequest, LocationRequest } from './types.js'

class B2bAddressesApi_addresses {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesADDocuments(params: {
  body: CreateUpdateAddressRequests
}, opts?: CallOptions): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>(withCall({ method: 'POST', path: `/api/dataentities/AD/documents`, body: params.body }, opts))
  }

  getApiDataentitiesADSearch(params: {
  _fields?: string
  _where?: string
  _sort?: string
  'REST-Range': string
}, opts?: CallOptions): Promise<AddressResponse[]> {
    return this.http.request<AddressResponse[]>(withCall({ method: 'GET', path: `/api/dataentities/AD/search`, query: { '_fields': params._fields, '_where': params._where, '_sort': params._sort }, headers: { 'REST-Range': params['REST-Range'] } }, opts))
  }

  getApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
  _fields?: string
}, opts?: CallOptions): Promise<AddressResponse> {
    return this.http.request<AddressResponse>(withCall({ method: 'GET', path: `/api/dataentities/AD/documents/${encodePathParam(params.addressId)}`, query: { '_fields': params._fields } }, opts))
  }

  patchApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
  body: CreateUpdateAddressRequests
}, opts?: CallOptions): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>(withCall({ method: 'PATCH', path: `/api/dataentities/AD/documents/${encodePathParam(params.addressId)}`, body: params.body }, opts))
  }

  deleteApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/AD/documents/${encodePathParam(params.addressId)}` }, opts))
  }
}
class B2bAddressesApi_recipients {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesContactInformationDocuments(params: {
  body: RecipientRequest
}, opts?: CallOptions): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>(withCall({ method: 'POST', path: `/api/dataentities/contact_information/documents`, body: params.body }, opts))
  }

  getApiDataentitiesContactInformationSearch(params: {
  _where: string
  _fields?: string
  _schema: string
}, opts?: CallOptions): Promise<{
  firstName?: string
  lastName?: string
  email?: string
}[]> {
    return this.http.request<{
  firstName?: string
  lastName?: string
  email?: string
}[]>(withCall({ method: 'GET', path: `/api/dataentities/contact_information/search`, query: { '_where': params._where, '_fields': params._fields, '_schema': params._schema } }, opts))
  }

  getApiDataentitiesContactInformationDocumentsByRecipientId(params: {
  recipientId: string
  _fields?: string
  _schema: string
}, opts?: CallOptions): Promise<RecipientRequest> {
    return this.http.request<RecipientRequest>(withCall({ method: 'GET', path: `/api/dataentities/contact_information/documents/${encodePathParam(params.recipientId)}`, query: { '_fields': params._fields, '_schema': params._schema } }, opts))
  }

  patchApiDataentitiesContactInformationDocumentsByRecipientId(params: {
  recipientId: string
  body: RecipientRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/contact_information/documents/${encodePathParam(params.recipientId)}`, body: params.body }, opts))
  }

  deleteApiDataentitiesContactInformationDocumentsByRecipientId(params: {
  recipientId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/contact_information/documents/${encodePathParam(params.recipientId)}` }, opts))
  }
}
class B2bAddressesApi_locations {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesCustomFieldValuesDocuments(params: {
  body: LocationRequest
}, opts?: CallOptions): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>(withCall({ method: 'POST', path: `/api/dataentities/customFieldValues/documents`, body: params.body }, opts))
  }

  getApiDataentitiesCustomFieldValuesDocumentsByLocationId(params: {
  locationId: string
  _fields: string
}, opts?: CallOptions): Promise<{
  id?: string
  dataEntityId?: string
  accountId?: string
  accountName?: string
  followers?: string[]
  schemas?: string[]
  customFieldId?: string
  contractId?: string
  auxId?: string | null
  value?: string
  description?: string | null
  createdBy?: string
  createdBy_USER?: {
  Id?: string
  Login?: string
  Name?: string | null
}
  createdIn?: string
  lastInteractionBy?: string
  lastInteractionBy_USER?: {
  Id?: string
  Login?: string
  Name?: string | null
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
  auxId?: string | null
  value?: string
  description?: string | null
  createdBy?: string
  createdBy_USER?: {
  Id?: string
  Login?: string
  Name?: string | null
}
  createdIn?: string
  lastInteractionBy?: string
  lastInteractionBy_USER?: {
  Id?: string
  Login?: string
  Name?: string | null
}
  lastInteractionIn?: string
  Tags?: string[]
  dataInstanceId?: string
}>(withCall({ method: 'GET', path: `/api/dataentities/customFieldValues/documents/${encodePathParam(params.locationId)}`, query: { '_fields': params._fields } }, opts))
  }

  patchApiDataentitiesCustomFieldValuesDocumentsByLocationId(params: {
  locationId: string
  body: LocationRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/customFieldValues/documents/${encodePathParam(params.locationId)}`, body: params.body }, opts))
  }

  deleteApiDataentitiesCustomFieldValuesDocumentsByLocationId(params: {
  locationId: string
  _fields: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/customFieldValues/documents/${encodePathParam(params.locationId)}`, query: { '_fields': params._fields } }, opts))
  }

  getApiDataentitiesCustomFieldValuesSearch(params: {
  _schema: string
  _fields: string
  _where: string
  _sort?: string
}, opts?: CallOptions): Promise<{
  id?: string
  contractId?: string
  customFieldId?: string
  auxId?: string | null
  value?: string
  description?: string | null
}[]> {
    return this.http.request<{
  id?: string
  contractId?: string
  customFieldId?: string
  auxId?: string | null
  value?: string
  description?: string | null
}[]>(withCall({ method: 'GET', path: `/api/dataentities/customFieldValues/search`, query: { '_schema': params._schema, '_fields': params._fields, '_where': params._where, '_sort': params._sort } }, opts))
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
