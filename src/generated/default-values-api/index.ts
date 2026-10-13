import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { DefaultValuesRequest } from './types.js'

class DefaultValuesApi_defaultValues {
  constructor(private http: VtexHttpClient) {}

  async postApiDataentitiesDefaultValuesDocuments(params: {
  body: DefaultValuesRequest
}, opts?: CallOptions): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>(withCall({ method: 'POST', path: `/api/dataentities/defaultValues/documents`, body: params.body }, opts))
  }

  async getApiDataentitiesDefaultValuesDocumentsByUnitId(params: {
  unitId: string
  _schema: string
  _fields: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/dataentities/defaultValues/documents/${encodePathParam(params.unitId)}`, query: { '_schema': params._schema, '_fields': params._fields } }, opts))
  }

  async patchApiDataentitiesDefaultValuesDocumentsByUnitId(params: {
  unitId: string
  body: DefaultValuesRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/defaultValues/documents/${encodePathParam(params.unitId)}`, body: params.body }, opts))
  }

  async deleteApiDataentitiesDefaultValuesDocumentsByUnitId(params: {
  unitId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/defaultValues/documents/${encodePathParam(params.unitId)}` }, opts))
  }
}

export class DefaultValuesApi {
  readonly defaultValues: DefaultValuesApi_defaultValues
  constructor(http: VtexHttpClient) {
    this.defaultValues = new DefaultValuesApi_defaultValues(http)
  }
}
