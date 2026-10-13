import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { Listdataentity, Getdataentityfields, Field, IdHrefDocumentID, IdHref, PutscoresRequest, PutscorebyfieldRequest, DeletescorebyfieldRequest, Listversion, Getversion, Document, CreateUpdateProfileRequests, CreateUpdateAddressRequests, DocumentResponse, CreateAddressResponse, AddressResponse, Acronym, Name, PrimaryKeyType, AllowGetAll } from './types.js'

class MasterDataApiV1Api_dataEntities {
  constructor(private http: VtexHttpClient) {}

  listdataentities(params: Record<string, never> = {}, opts?: CallOptions): Promise<Listdataentity[]> {
    return this.http.request<Listdataentity[]>(withCall({ method: 'GET', path: `/api/dataentities` }, opts))
  }

  getdataentitystructure(params: {
  acronym: string
}, opts?: CallOptions): Promise<Getdataentityfields> {
    return this.http.request<Getdataentityfields>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.acronym)}` }, opts))
  }
}
class MasterDataApiV1Api_documents {
  constructor(private http: VtexHttpClient) {}

  createnewdocument(params: {
  acronym: string
  body: {
  [key: string]: unknown
}
}, opts?: CallOptions): Promise<IdHrefDocumentID> {
    return this.http.request<IdHrefDocumentID>(withCall({ method: 'POST', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents`, body: params.body }, opts))
  }

  createorupdatepartialdocument(params: {
  acronym: string
  body: {
  id?: string
  [key: string]: unknown
}
}, opts?: CallOptions): Promise<IdHrefDocumentID> {
    return this.http.request<IdHrefDocumentID>(withCall({ method: 'PATCH', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents`, body: params.body }, opts))
  }

  getdocument(params: {
  acronym: string
  id: string
  _fields?: string
}, opts?: CallOptions): Promise<Document> {
    return this.http.request<Document>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}`, query: { '_fields': params._fields } }, opts))
  }

  updateentiredocument(params: {
  acronym: string
  id: string
  body: {
  [key: string]: unknown
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}`, body: params.body }, opts))
  }

  updatepartialdocument(params: {
  acronym: string
  id: string
  body: Record<string, unknown>
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}`, body: params.body }, opts))
  }

  deletedocument(params: {
  acronym: string
  id: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}` }, opts))
  }
}
class MasterDataApiV1Api_versions {
  constructor(private http: VtexHttpClient) {}

  listversions(params: {
  acronym: string
  id: string
}, opts?: CallOptions): Promise<Listversion[]> {
    return this.http.request<Listversion[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/versions` }, opts))
  }

  getversion(params: {
  acronym: string
  id: string
  versionId: string
}, opts?: CallOptions): Promise<Getversion> {
    return this.http.request<Getversion>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/versions/${encodePathParam(params.versionId)}` }, opts))
  }

  putversion(params: {
  acronym: string
  id: string
  versionId: string
}, opts?: CallOptions): Promise<IdHref> {
    return this.http.request<IdHref>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/versions/${encodePathParam(params.versionId)}` }, opts))
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
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.acronym)}/scroll`, query: { '_fields': params._fields, '_where': params._where, '_sort': params._sort, '_size': params._size, '_token': params._token } }, opts))
  }
}
class MasterDataApiV1Api_search {
  constructor(private http: VtexHttpClient) {}

  searchdocuments(params: {
  acronym: string
  _fields?: string
  _where?: string
  _sort?: string
  'REST-Range': string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.acronym)}/search`, query: { '_fields': params._fields, '_where': params._where, '_sort': params._sort }, headers: { 'REST-Range': params['REST-Range'] } }, opts))
  }
}
class MasterDataApiV1Api_attachments {
  constructor(private http: VtexHttpClient) {}

  retrieveattachment(params: {
  acronym: string
  id: string
  field: string
  'file-name': string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/${encodePathParam(params.field)}/attachments/${encodePathParam(params['file-name'])}` }, opts))
  }

  saveattachment(params: {
  acronym: string
  id: string
  field: string
  body: FormData
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/${encodePathParam(params.field)}/attachments`, body: params.body, contentType: 'multipart/form-data' }, opts))
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/clusters`, body: params.body }, opts))
  }
}
class MasterDataApiV1Api_score {
  constructor(private http: VtexHttpClient) {}

  putscores(params: {
  acronym: string
  id: string
  body: PutscoresRequest[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/score`, body: params.body }, opts))
  }

  putscorebyfield(params: {
  acronym: string
  id: string
  'field-name': string
  body: PutscorebyfieldRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/score/${encodePathParam(params['field-name'])}`, body: params.body }, opts))
  }

  deletescorebyfield(params: {
  acronym: string
  id: string
  'field-name': string
  body: DeletescorebyfieldRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/${encodePathParam(params.acronym)}/documents/${encodePathParam(params.id)}/score/${encodePathParam(params['field-name'])}`, body: params.body }, opts))
  }
}
class MasterDataApiV1Api_customerProfiles {
  constructor(private http: VtexHttpClient) {}

  createNewCustomerProfilev2(params: {
  _schema?: string
  body: CreateUpdateProfileRequests
}, opts?: CallOptions): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>(withCall({ method: 'POST', path: `/api/dataentities/CL/documents`, query: { '_schema': params._schema }, body: params.body }, opts))
  }

  updateCustomerProfile(params: {
  id: string
  _schema?: string
  body: CreateUpdateProfileRequests
}, opts?: CallOptions): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>(withCall({ method: 'PATCH', path: `/api/dataentities/CL/documents/${encodePathParam(params.id)}`, query: { '_schema': params._schema }, body: params.body }, opts))
  }

  deleteCustomerProfile(params: {
  id: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/CL/documents/${encodePathParam(params.id)}` }, opts))
  }
}
class MasterDataApiV1Api_addresses {
  constructor(private http: VtexHttpClient) {}

  createNewCustomerAddress(params: {
  _schema?: string
  body: CreateUpdateAddressRequests
}, opts?: CallOptions): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>(withCall({ method: 'POST', path: `/api/dataentities/AD/documents`, query: { '_schema': params._schema }, body: params.body }, opts))
  }

  getApiDataentitiesADDocumentsByAddressId(params: {
  addressId: string
  _fields: string
}, opts?: CallOptions): Promise<AddressResponse> {
    return this.http.request<AddressResponse>(withCall({ method: 'GET', path: `/api/dataentities/AD/documents/${encodePathParam(params.addressId)}`, query: { '_fields': params._fields } }, opts))
  }

  updateCustomerAddress(params: {
  addressId: string
  _schema?: string
  body: CreateUpdateAddressRequests
}, opts?: CallOptions): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>(withCall({ method: 'PATCH', path: `/api/dataentities/AD/documents/${encodePathParam(params.addressId)}`, query: { '_schema': params._schema }, body: params.body }, opts))
  }

  deleteCustomerAD(params: {
  addressId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/AD/documents/${encodePathParam(params.addressId)}` }, opts))
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
