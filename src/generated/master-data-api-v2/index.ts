import type { VtexHttpClient } from '../../core/http.js'
import type { DocumentRequest, UsingFieldsAll, SaveschemabynameRequest, GetSchemasResponse, Properties, Name, PutindicesRequest, Index, Listversion, Getversion, Document, CreateDocumentResponse, DocumentResponse } from './types.js'

class MasterDataApiV2Api_documents {
  constructor(private http: VtexHttpClient) {}

  createnewdocument(params: {
  dataEntityName: string
  _schema?: string
  body: DocumentRequest
}): Promise<CreateDocumentResponse> {
    return this.http.request<CreateDocumentResponse>({ method: 'POST', path: `/api/dataentities/${params.dataEntityName}/documents`, query: { '_schema': params._schema }, body: params.body })
  }

  createorupdatepartialdocument(params: {
  dataEntityName: string
  _schema?: string
  body: DocumentRequest
}): Promise<CreateDocumentResponse> {
    return this.http.request<CreateDocumentResponse>({ method: 'PATCH', path: `/api/dataentities/${params.dataEntityName}/documents`, query: { '_schema': params._schema }, body: params.body })
  }

  getdocument(params: {
  dataEntityName: string
  id: string
  _fields?: string
  _schema?: string
}): Promise<UsingFieldsAll> {
    return this.http.request<UsingFieldsAll>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}`, query: { '_fields': params._fields, '_schema': params._schema } })
  }

  updateentiredocument(params: {
  dataEntityName: string
  id: string
  _where?: string
  _schema?: string
  body: DocumentRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}`, query: { '_where': params._where, '_schema': params._schema }, body: params.body })
  }

  updatepartialdocument(params: {
  dataEntityName: string
  id: string
  _where?: string
  _schema?: string
  body: DocumentRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}`, query: { '_where': params._where, '_schema': params._schema }, body: params.body })
  }

  deletedocument(params: {
  dataEntityName: string
  id: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}` })
  }
}
class MasterDataApiV2Api_search {
  constructor(private http: VtexHttpClient) {}

  searchdocuments(params: {
  dataEntityName: string
  _fields?: string
  _where?: string
  _schema?: string
  _sort?: string
}): Promise<UsingFieldsAll[]> {
    return this.http.request<UsingFieldsAll[]>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/search`, query: { '_fields': params._fields, '_where': params._where, '_schema': params._schema, '_sort': params._sort } })
  }
}
class MasterDataApiV2Api_scroll {
  constructor(private http: VtexHttpClient) {}

  scrolldocuments(params: {
  dataEntityName: string
  _token?: string
  _size?: number
  _fields?: string
  _where?: string
  _schema?: string
  _sort?: string
}): Promise<UsingFieldsAll[]> {
    return this.http.request<UsingFieldsAll[]>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/scroll`, query: { '_token': params._token, '_size': params._size, '_fields': params._fields, '_where': params._where, '_schema': params._schema, '_sort': params._sort } })
  }
}
class MasterDataApiV2Api_schemas {
  constructor(private http: VtexHttpClient) {}

  getschemas(params: {
  dataEntityName: string
}): Promise<GetSchemasResponse[]> {
    return this.http.request<GetSchemasResponse[]>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/schemas` })
  }

  getschemabyname(params: {
  dataEntityName: string
  schemaName: string
}): Promise<SaveschemabynameRequest> {
    return this.http.request<SaveschemabynameRequest>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/schemas/${params.schemaName}` })
  }

  saveschemabyname(params: {
  dataEntityName: string
  schemaName: string
  body: SaveschemabynameRequest
}): Promise<{
  Message?: string
}> {
    return this.http.request<{
  Message?: string
}>({ method: 'PUT', path: `/api/dataentities/${params.dataEntityName}/schemas/${params.schemaName}`, body: params.body })
  }

  deleteschemabyname(params: {
  dataEntityName: string
  schemaName: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/${params.dataEntityName}/schemas/${params.schemaName}` })
  }
}
class MasterDataApiV2Api_indices {
  constructor(private http: VtexHttpClient) {}

  getindices(params: {
  dataEntityName: string
}): Promise<Index[]> {
    return this.http.request<Index[]>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/indices` })
  }

  putindices(params: {
  dataEntityName: string
  body: PutindicesRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/dataentities/${params.dataEntityName}/indices`, body: params.body })
  }

  getindexbyname(params: {
  dataEntityName: string
  index_name: string
}): Promise<Index> {
    return this.http.request<Index>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/indices/${params.index_name}` })
  }

  deleteindexbyname(params: {
  dataEntityName: string
  index_name: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/${params.dataEntityName}/indices/${params.index_name}` })
  }
}
class MasterDataApiV2Api_clusters {
  constructor(private http: VtexHttpClient) {}

  validatedocumentbyclusters(params: {
  dataEntityName: string
  id: string
  body: {
  name?: string
  rule?: string
}[]
}): Promise<{
  name?: string
  isValid?: boolean
}[]> {
    return this.http.request<{
  name?: string
  isValid?: boolean
}[]>({ method: 'POST', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}/clusters`, body: params.body })
  }
}
class MasterDataApiV2Api_versions {
  constructor(private http: VtexHttpClient) {}

  listversions(params: {
  dataEntityName: string
  id: string
  load?: boolean
  fields?: string
}): Promise<Listversion[]> {
    return this.http.request<Listversion[]>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}/versions`, query: { 'load': params.load, 'fields': params.fields } })
  }

  getversion(params: {
  dataEntityName: string
  id: string
  versionId: string
}): Promise<Getversion> {
    return this.http.request<Getversion>({ method: 'GET', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}/versions/${params.versionId}` })
  }

  putversion(params: {
  dataEntityName: string
  id: string
  versionId: string
}): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>({ method: 'PUT', path: `/api/dataentities/${params.dataEntityName}/documents/${params.id}/versions/${params.versionId}` })
  }
}

export class MasterDataApiV2Api {
  readonly documents: MasterDataApiV2Api_documents
  readonly search: MasterDataApiV2Api_search
  readonly scroll: MasterDataApiV2Api_scroll
  readonly schemas: MasterDataApiV2Api_schemas
  readonly indices: MasterDataApiV2Api_indices
  readonly clusters: MasterDataApiV2Api_clusters
  readonly versions: MasterDataApiV2Api_versions
  constructor(http: VtexHttpClient) {
    this.documents = new MasterDataApiV2Api_documents(http)
    this.search = new MasterDataApiV2Api_search(http)
    this.scroll = new MasterDataApiV2Api_scroll(http)
    this.schemas = new MasterDataApiV2Api_schemas(http)
    this.indices = new MasterDataApiV2Api_indices(http)
    this.clusters = new MasterDataApiV2Api_clusters(http)
    this.versions = new MasterDataApiV2Api_versions(http)
  }
}
