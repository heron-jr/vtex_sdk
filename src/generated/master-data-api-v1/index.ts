import type { VtexHttpClient } from '../../core/http.js'
import type { Listdataentity, Getdataentityfields, Field, IdHrefDocumentID, IdHref, PutscoresRequest, PutscorebyfieldRequest, DeletescorebyfieldRequest, Listversion, Getversion, Document, CreateUpdateProfileRequests, CreateUpdateAddressRequests, DocumentResponse, CreateAddressResponse, AddressResponse, Acronym, Name, PrimaryKeyType, AllowGetAll } from './types.js'

class MasterDataApiV1Api_dataEntities {
  constructor(private http: VtexHttpClient) {}

  listdataentities(params: Record<string, never>): Promise<Listdataentity[]> {
    return this.http.request<Listdataentity[]>({ method: 'GET', path: `/api/dataentities` })
  }

  getdataentitystructure(params: {
  acronym: string
}): Promise<Getdataentityfields> {
    return this.http.request<Getdataentityfields>({ method: 'GET', path: `/api/dataentities/${params.acronym}` })
  }
}
class MasterDataApiV1Api_documents {
  constructor(private http: VtexHttpClient) {}

  createnewdocument(params: {
  acronym: string
  body: {
  "{fieldName}"?: string
}
}): Promise<IdHrefDocumentID> {
    return this.http.request<IdHrefDocumentID>({ method: 'POST', path: `/api/dataentities/${params.acronym}/documents`, body: params.body })
  }

  createorupdatepartialdocument(params: {
  acronym: string
  body: {
  id?: string
  "{fieldName}"?: string
}
}): Promise<IdHrefDocumentID> {
    return this.http.request<IdHrefDocumentID>({ method: 'PATCH', path: `/api/dataentities/${params.acronym}/documents`, body: params.body })
  }

  getdocument(params: {
  acronym: string
  id: string
  _fields?: string
}): Promise<Document> {
    return this.http.request<Document>({ method: 'GET', path: `/api/dataentities/${params.acronym}/documents/${params.id}`, query: { '_fields': params._fields } })
  }

  updateentiredocument(params: {
  acronym: string
  id: string
  body: {
  "{fieldName}"?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/dataentities/${params.acronym}/documents/${params.id}`, body: params.body })
  }

  updatepartialdocument(params: {
  acronym: string
  id: string
  body: Record<string, unknown>
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/${params.acronym}/documents/${params.id}`, body: params.body })
  }

  deletedocument(params: {
  acronym: string
  id: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/${params.acronym}/documents/${params.id}` })
  }
}
class MasterDataApiV1Api_versions {
  constructor(private http: VtexHttpClient) {}

  listversions(params: {
  acronym: string
  id: string
}): Promise<Listversion[]> {
    return this.http.request<Listversion[]>({ method: 'GET', path: `/api/dataentities/${params.acronym}/documents/${params.id}/versions` })
  }

  getversion(params: {
  acronym: string
  id: string
  versionId: string
}): Promise<Getversion> {
    return this.http.request<Getversion>({ method: 'GET', path: `/api/dataentities/${params.acronym}/documents/${params.id}/versions/${params.versionId}` })
  }

  putversion(params: {
  acronym: string
  id: string
  versionId: string
}): Promise<IdHref> {
    return this.http.request<IdHref>({ method: 'PUT', path: `/api/dataentities/${params.acronym}/documents/${params.id}/versions/${params.versionId}` })
  }
}
class MasterDataApiV1Api_scroll {
  constructor(private http: VtexHttpClient) {}

  scrolldocuments(params: {
  acronym: string
  _fields?: string
  _where?: string
  _sort?: string
  _size?: string
  _token?: string
}): Promise<{
  additionalProperties?: string
  id?: string
  accountId?: string
  accountName?: string
  dataEntityId?: string
}[]> {
    return this.http.request<{
  additionalProperties?: string
  id?: string
  accountId?: string
  accountName?: string
  dataEntityId?: string
}[]>({ method: 'GET', path: `/api/dataentities/${params.acronym}/scroll`, query: { '_fields': params._fields, '_where': params._where, '_sort': params._sort, '_size': params._size, '_token': params._token } })
  }
}
class MasterDataApiV1Api_search {
  constructor(private http: VtexHttpClient) {}

  searchdocuments(params: {
  acronym: string
  _fields?: string
  _where?: string
  _sort?: string
}): Promise<{
  additionalProperties?: string
  id?: string
  accountId?: string
  accountName?: string
  dataEntityId?: string
}[]> {
    return this.http.request<{
  additionalProperties?: string
  id?: string
  accountId?: string
  accountName?: string
  dataEntityId?: string
}[]>({ method: 'GET', path: `/api/dataentities/${params.acronym}/search`, query: { '_fields': params._fields, '_where': params._where, '_sort': params._sort } })
  }
}
class MasterDataApiV1Api_attachments {
  constructor(private http: VtexHttpClient) {}

  retrieveattachment(params: {
  acronym: string
  id: string
  field: string
  'file-name': string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/dataentities/${params.acronym}/documents/${params.id}/${params.field}/attachments/${params['file-name']}` })
  }

  saveattachment(params: {
  acronym: string
  id: string
  field: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/dataentities/${params.acronym}/documents/${params.id}/${params.field}/attachments` })
  }
}
class MasterDataApiV1Api_clusters {
  constructor(private http: VtexHttpClient) {}

  validateDocumentbyClusters(params: {
  acronym: string
  id: string
  body: {
  name?: string
  rule?: string
}[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/dataentities/${params.acronym}/documents/${params.id}/clusters`, body: params.body })
  }
}
class MasterDataApiV1Api_score {
  constructor(private http: VtexHttpClient) {}

  putscores(params: {
  acronym: string
  id: string
  body: PutscoresRequest[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/dataentities/${params.acronym}/documents/${params.id}/score`, body: params.body })
  }

  putscorebyfield(params: {
  acronym: string
  id: string
  'field-name': string
  body: PutscorebyfieldRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/dataentities/${params.acronym}/documents/${params.id}/score/${params['field-name']}`, body: params.body })
  }

  deletescorebyfield(params: {
  acronym: string
  id: string
  'field-name': string
  body: DeletescorebyfieldRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/${params.acronym}/documents/${params.id}/score/${params['field-name']}`, body: params.body })
  }
}
class MasterDataApiV1Api_customerProfiles {
  constructor(private http: VtexHttpClient) {}

  createNewCustomerProfilev2(params: {
  _schema?: string
  body: CreateUpdateProfileRequests
}): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>({ method: 'POST', path: `/api/dataentities/CL/documents`, query: { '_schema': params._schema }, body: params.body })
  }

  updateCustomerProfile(params: {
  id: string
  _schema?: string
  body: CreateUpdateProfileRequests
}): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>({ method: 'PATCH', path: `/api/dataentities/CL/documents/${params.id}`, query: { '_schema': params._schema }, body: params.body })
  }

  deleteCustomerProfile(params: {
  id: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/CL/documents/${params.id}` })
  }
}
class MasterDataApiV1Api_addresses {
  constructor(private http: VtexHttpClient) {}

  createNewCustomerAddress(params: {
  _schema?: string
  body: CreateUpdateAddressRequests
}): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>({ method: 'POST', path: `/api/dataentities/AD/documents`, query: { '_schema': params._schema }, body: params.body })
  }

  getApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
  _fields: string
}): Promise<AddressResponse> {
    return this.http.request<AddressResponse>({ method: 'GET', path: `/api/dataentities/AD/documents/${params.addressId}`, query: { '_fields': params._fields } })
  }

  updateCustomerAddress(params: {
  addressId: string
  _schema?: string
  body: CreateUpdateAddressRequests
}): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>({ method: 'PATCH', path: `/api/dataentities/AD/documents/${params.addressId}`, query: { '_schema': params._schema }, body: params.body })
  }

  deleteCustomerAD(params: {
  addressId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/AD/documents/${params.addressId}` })
  }
}

export class MasterDataApiV1Api {
  readonly dataEntities: MasterDataApiV1Api_dataEntities
  readonly documents: MasterDataApiV1Api_documents
  readonly versions: MasterDataApiV1Api_versions
  readonly scroll: MasterDataApiV1Api_scroll
  readonly search: MasterDataApiV1Api_search
  readonly attachments: MasterDataApiV1Api_attachments
  readonly clusters: MasterDataApiV1Api_clusters
  readonly score: MasterDataApiV1Api_score
  readonly customerProfiles: MasterDataApiV1Api_customerProfiles
  readonly addresses: MasterDataApiV1Api_addresses
  constructor(http: VtexHttpClient) {
    this.dataEntities = new MasterDataApiV1Api_dataEntities(http)
    this.documents = new MasterDataApiV1Api_documents(http)
    this.versions = new MasterDataApiV1Api_versions(http)
    this.scroll = new MasterDataApiV1Api_scroll(http)
    this.search = new MasterDataApiV1Api_search(http)
    this.attachments = new MasterDataApiV1Api_attachments(http)
    this.clusters = new MasterDataApiV1Api_clusters(http)
    this.score = new MasterDataApiV1Api_score(http)
    this.customerProfiles = new MasterDataApiV1Api_customerProfiles(http)
    this.addresses = new MasterDataApiV1Api_addresses(http)
  }
}
