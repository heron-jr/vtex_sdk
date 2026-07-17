import type { VtexHttpClient } from '../../core/http.js'
import type { DefaultValuesRequest } from './types.js'

class DefaultValuesApi_defaultValues {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesDefaultValuesDocuments(params: {
  body: DefaultValuesRequest
}): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>({ method: 'POST', path: `/api/dataentities/defaultValues/documents`, body: params.body })
  }

  getApiDataentitiesDefaultValuesDocumentsByUnitId(params: {
  unitId: string
  _schema: string
  _fields: string
}): Promise<{
  id?: string
  defaultValues?: {
  entity?: string
  entityValueId?: string
}[]
}> {
    return this.http.request<{
  id?: string
  defaultValues?: {
  entity?: string
  entityValueId?: string
}[]
}>({ method: 'GET', path: `/api/dataentities/defaultValues/documents/${params.unitId}`, query: { '_schema': params._schema, '_fields': params._fields } })
  }

  patchApiDataentitiesDefaultValuesDocumentsByUnitId(params: {
  unitId: string
  body: DefaultValuesRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/defaultValues/documents/${params.unitId}`, body: params.body })
  }

  deleteApiDataentitiesDefaultValuesDocumentsByUnitId(params: {
  unitId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/defaultValues/documents/${params.unitId}` })
  }
}

export class DefaultValuesApi {
  readonly defaultValues: DefaultValuesApi_defaultValues
  constructor(http: VtexHttpClient) {
    this.defaultValues = new DefaultValuesApi_defaultValues(http)
  }
}
