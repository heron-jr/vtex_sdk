import type { VtexHttpClient } from '../../core/http.js'

class CustomFieldsApi_customFieldSettings {
  constructor(private http: VtexHttpClient) {}

  getApiDataentitiesCustomFieldSettingsSearch(params: {
  _schema: string
  _fields: string
  _where: string
}): Promise<{
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
  additionalData?: string
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
  additionalData?: string
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
  tags?: string[]
  dataInstanceId?: string
}[]>({ method: 'GET', path: `/api/dataentities/customFieldSettings/search`, query: { '_schema': params._schema, '_fields': params._fields, '_where': params._where } })
  }

  postApiDataentitiesCustomFieldSettingsDocuments(params: {
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
}): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>({ method: 'POST', path: `/api/dataentities/customFieldSettings/documents`, query: { '_schema': params._schema }, body: params.body })
  }

  patchApiDataentitiesCustomFieldSettingsDocumentsByDocumentId(params: {
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
}): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>({ method: 'PATCH', path: `/api/dataentities/customFieldSettings/documents/${params.documentId}`, query: { '_schema': params._schema }, body: params.body })
  }

  deleteApiDataentitiesCustomFieldSettingsDocumentsByDocumentId(params: {
  documentId: string
  _schema: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/customFieldSettings/documents/${params.documentId}`, query: { '_schema': params._schema } })
  }
}
class CustomFieldsApi_customFieldValues {
  constructor(private http: VtexHttpClient) {}

  postApiDataentitiesCustomFieldValuesDocuments(params: {
  _schema: string
  body: {
  contractId: string
  customFieldId: string
  auxId?: string
  value: string
  description?: string
}
}): Promise<{
  Id?: string
  Href?: string
  DocumentId?: string
}> {
    return this.http.request<{
  Id?: string
  Href?: string
  DocumentId?: string
}>({ method: 'POST', path: `/api/dataentities/customFieldValues/documents`, query: { '_schema': params._schema }, body: params.body })
  }

  getApiDataentitiesCustomFieldValuesDocumentsByCustomFieldValueId(params: {
  customFieldValueId: string
  _fields: string
  _schema: string
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
  tags?: string[]
  dataInstanceId?: string
}>({ method: 'GET', path: `/api/dataentities/customFieldValues/documents/${params.customFieldValueId}`, query: { '_fields': params._fields, '_schema': params._schema } })
  }

  patchApiDataentitiesCustomFieldValuesDocumentsByCustomFieldValueId(params: {
  customFieldValueId: string
  _schema: string
  body: {
  contractId: string
  customFieldId: string
  auxId?: string
  value: string
  description?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/customFieldValues/documents/${params.customFieldValueId}`, query: { '_schema': params._schema }, body: params.body })
  }

  deleteApiDataentitiesCustomFieldValuesDocumentsByCustomFieldValueId(params: {
  customFieldValueId: string
  _fields: string
  _schema: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/customFieldValues/documents/${params.customFieldValueId}`, query: { '_fields': params._fields, '_schema': params._schema } })
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

export class CustomFieldsApi {
  readonly customFieldSettings: CustomFieldsApi_customFieldSettings
  readonly customFieldValues: CustomFieldsApi_customFieldValues
  constructor(http: VtexHttpClient) {
    this.customFieldSettings = new CustomFieldsApi_customFieldSettings(http)
    this.customFieldValues = new CustomFieldsApi_customFieldValues(http)
  }
}
