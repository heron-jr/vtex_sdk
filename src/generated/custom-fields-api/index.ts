import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class CustomFieldsApi_customFieldSettings {
  constructor(private http: VtexHttpClient) {}

  async getApiDataentitiesCustomFieldSettingsSearch(params: {
  _schema: string
  _fields: string
  _where: string
}, opts?: CallOptions): Promise<{
  id?: string
  dataEntityId?: string
  accountId?: string
  accountName?: string
  followers?: string[]
  schemas?: string[]
  contractId?: string
  name?: string
  enabled?: boolean
  required?: boolean
  level?: string
  type?: string
  additionalData?: string | null
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
  tags?: string[]
  dataInstanceId?: string
}[]> {
    return this.http.request<{
  id?: string
  dataEntityId?: string
  accountId?: string
  accountName?: string
  followers?: string[]
  schemas?: string[]
  contractId?: string
  name?: string
  enabled?: boolean
  required?: boolean
  level?: string
  type?: string
  additionalData?: string | null
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
  tags?: string[]
  dataInstanceId?: string
}[]>(withCall({ method: 'GET', path: `/api/dataentities/customFieldSettings/search`, query: { '_schema': params._schema, '_fields': params._fields, '_where': params._where }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiDataentitiesCustomFieldSettingsDocuments(params: {
  _schema: string
  body: {
  contractId: string
  name: string
  enabled: boolean
  required: boolean
  level: "item" | "order" | "address"
  type: "text" | "number" | "option"
  additionalData?: string
}
}, opts?: CallOptions): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>(withCall({ method: 'POST', path: `/api/dataentities/customFieldSettings/documents`, query: { '_schema': params._schema }, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async patchApiDataentitiesCustomFieldSettingsDocumentsByDocumentId(params: {
  documentId: string
  _schema: string
  body: {
  contractId: string
  name: string
  enabled: boolean
  required: boolean
  level: "item" | "order" | "address"
  type: "text" | "number" | "option"
  additionalData?: string
}
}, opts?: CallOptions): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>(withCall({ method: 'PATCH', path: `/api/dataentities/customFieldSettings/documents/${encodePathParam(params.documentId)}`, query: { '_schema': params._schema }, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiDataentitiesCustomFieldSettingsDocumentsByDocumentId(params: {
  documentId: string
  _schema: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/customFieldSettings/documents/${encodePathParam(params.documentId)}`, query: { '_schema': params._schema }, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class CustomFieldsApi_customFieldValues {
  constructor(private http: VtexHttpClient) {}

  async postApiDataentitiesCustomFieldValuesDocuments(params: {
  _schema: string
  body: {
  contractId: string
  customFieldId: string
  auxId?: string | null
  value: string
  description?: string
}
}, opts?: CallOptions): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>(withCall({ method: 'POST', path: `/api/dataentities/customFieldValues/documents`, query: { '_schema': params._schema }, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiDataentitiesCustomFieldValuesDocumentsByCustomFieldValueId(params: {
  customFieldValueId: string
  _fields: string
  _schema: string
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
  tags?: string[]
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
  tags?: string[]
  dataInstanceId?: string
}>(withCall({ method: 'GET', path: `/api/dataentities/customFieldValues/documents/${encodePathParam(params.customFieldValueId)}`, query: { '_fields': params._fields, '_schema': params._schema }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async patchApiDataentitiesCustomFieldValuesDocumentsByCustomFieldValueId(params: {
  customFieldValueId: string
  _schema: string
  body: {
  contractId: string
  customFieldId: string
  auxId?: string | null
  value: string
  description?: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/customFieldValues/documents/${encodePathParam(params.customFieldValueId)}`, query: { '_schema': params._schema }, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiDataentitiesCustomFieldValuesDocumentsByCustomFieldValueId(params: {
  customFieldValueId: string
  _fields: string
  _schema: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/customFieldValues/documents/${encodePathParam(params.customFieldValueId)}`, query: { '_fields': params._fields, '_schema': params._schema }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiDataentitiesCustomFieldValuesSearch(params: {
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
}[]>(withCall({ method: 'GET', path: `/api/dataentities/customFieldValues/search`, query: { '_schema': params._schema, '_fields': params._fields, '_where': params._where, '_sort': params._sort }, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}

export class CustomFieldsApi {
  readonly customFieldSettings: CustomFieldsApi_customFieldSettings
  readonly customFieldValues: CustomFieldsApi_customFieldValues
  constructor(http: VtexHttpClient) {
    this.customFieldSettings = new CustomFieldsApi_customFieldSettings(http)
    this.customFieldValues = new CustomFieldsApi_customFieldValues(http)
  }
}
