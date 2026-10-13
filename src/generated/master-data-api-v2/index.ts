import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { DocumentRequest, UsingFieldsAll, SaveschemabynameRequest, GetSchemasResponse, Properties, Name, PutindicesRequest, Index, Listversion, Getversion, Document, CreateDocumentResponse, DocumentResponse } from './types.js'

class MasterDataApiV2Api_documents {
  constructor(private http: VtexHttpClient) {}

  createnewdocument(params: {
  dataEntityName: string
  _schema?: string
  body: DocumentRequest
}, opts?: CallOptions): Promise<CreateDocumentResponse> {
    return this.http.request<CreateDocumentResponse>(withCall({ method: 'POST', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents`, query: { '_schema': params._schema }, body: params.body }, opts))
  }

  createorupdatepartialdocument(params: {
  dataEntityName: string
  _schema?: string
  body: DocumentRequest
}, opts?: CallOptions): Promise<CreateDocumentResponse> {
    return this.http.request<CreateDocumentResponse>(withCall({ method: 'PATCH', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents`, query: { '_schema': params._schema }, body: params.body }, opts))
  }

  getdocument(params: {
  dataEntityName: string
  id: string
  _fields?: string
  _schema?: string
}, opts?: CallOptions): Promise<UsingFieldsAll> {
    return this.http.request<UsingFieldsAll>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}`, query: { '_fields': params._fields, '_schema': params._schema } }, opts))
  }

  updateentiredocument(params: {
  dataEntityName: string
  id: string
  _where?: string
  _schema?: string
  body: DocumentRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}`, query: { '_where': params._where, '_schema': params._schema }, body: params.body }, opts))
  }

  updatepartialdocument(params: {
  dataEntityName: string
  id: string
  _where?: string
  _schema?: string
  body: DocumentRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}`, query: { '_where': params._where, '_schema': params._schema }, body: params.body }, opts))
  }

  deletedocument(params: {
  dataEntityName: string
  id: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}` }, opts))
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
  'REST-Range': string
}, opts?: CallOptions): Promise<UsingFieldsAll[]> {
    return this.http.request<UsingFieldsAll[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/search`, query: { '_fields': params._fields, '_where': params._where, '_schema': params._schema, '_sort': params._sort }, headers: { 'REST-Range': params['REST-Range'] } }, opts))
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
}, opts?: CallOptions): Promise<UsingFieldsAll[]> {
    return this.http.request<UsingFieldsAll[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/scroll`, query: { '_token': params._token, '_size': params._size, '_fields': params._fields, '_where': params._where, '_schema': params._schema, '_sort': params._sort } }, opts))
  }
}
class MasterDataApiV2Api_schemas {
  constructor(private http: VtexHttpClient) {}

  getschemas(params: {
  dataEntityName: string
}, opts?: CallOptions): Promise<GetSchemasResponse[]> {
    return this.http.request<GetSchemasResponse[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/schemas` }, opts))
  }

  getschemabyname(params: {
  dataEntityName: string
  schemaName: string
}, opts?: CallOptions): Promise<SaveschemabynameRequest> {
    return this.http.request<SaveschemabynameRequest>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/schemas/${encodePathParam(params.schemaName)}` }, opts))
  }

  saveschemabyname(params: {
  dataEntityName: string
  schemaName: string
  body: SaveschemabynameRequest
}, opts?: CallOptions): Promise<{
  Message?: string
}> {
    return this.http.request<{
  Message?: string
}>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/schemas/${encodePathParam(params.schemaName)}`, body: params.body }, opts))
  }

  deleteschemabyname(params: {
  dataEntityName: string
  schemaName: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/schemas/${encodePathParam(params.schemaName)}` }, opts))
  }
}
class MasterDataApiV2Api_indices {
  constructor(private http: VtexHttpClient) {}

  getindices(params: {
  dataEntityName: string
}, opts?: CallOptions): Promise<Index[]> {
    return this.http.request<Index[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/indices` }, opts))
  }

  putindices(params: {
  dataEntityName: string
  body: PutindicesRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/indices`, body: params.body }, opts))
  }

  getindexbyname(params: {
  dataEntityName: string
  index_name: string
}, opts?: CallOptions): Promise<Index> {
    return this.http.request<Index>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/indices/${encodePathParam(params.index_name)}` }, opts))
  }

  deleteindexbyname(params: {
  dataEntityName: string
  index_name: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/indices/${encodePathParam(params.index_name)}` }, opts))
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
}, opts?: CallOptions): Promise<{
  name?: string
  isValid?: boolean
}[]> {
    return this.http.request<{
  name?: string
  isValid?: boolean
}[]>(withCall({ method: 'POST', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}/clusters`, body: params.body }, opts))
  }
}
class MasterDataApiV2Api_versions {
  constructor(private http: VtexHttpClient) {}

  listversions(params: {
  dataEntityName: string
  id: string
  load?: boolean
  fields?: string
}, opts?: CallOptions): Promise<Listversion[]> {
    return this.http.request<Listversion[]>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}/versions`, query: { 'load': params.load, 'fields': params.fields } }, opts))
  }

  getversion(params: {
  dataEntityName: string
  id: string
  versionId: string
}, opts?: CallOptions): Promise<Getversion> {
    return this.http.request<Getversion>(withCall({ method: 'GET', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}/versions/${encodePathParam(params.versionId)}` }, opts))
  }

  putversion(params: {
  dataEntityName: string
  id: string
  versionId: string
}, opts?: CallOptions): Promise<DocumentResponse> {
    return this.http.request<DocumentResponse>(withCall({ method: 'PUT', path: `/api/dataentities/${encodePathParam(params.dataEntityName)}/documents/${encodePathParam(params.id)}/versions/${encodePathParam(params.versionId)}` }, opts))
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
