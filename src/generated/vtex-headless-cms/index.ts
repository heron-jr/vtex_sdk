import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class VtexHeadlessCmsApi_pages {
  constructor(private http: VtexHttpClient) {}

  async getAllContentTypes(params: {
  projectId: string
}, opts?: CallOptions): Promise<{
  contentTypes?: {
  id?: string
  name?: string
  configurationSchemaSets?: {
  name?: string
  configurations?: {
  name?: string
  schema?: {
  title: string
  description: string
  widget?: {
  [key: string]: unknown
}
  [key: string]: unknown
}
}[]
}[]
}[]
}> {
    return this.http.request<{
  contentTypes?: {
  id?: string
  name?: string
  configurationSchemaSets?: {
  name?: string
  configurations?: {
  name?: string
  schema?: {
  title: string
  description: string
  widget?: {
  [key: string]: unknown
}
  [key: string]: unknown
}
}[]
}[]
}[]
}>(withCall({ method: 'GET', path: `/_v/cms/api/${encodePathParam(params.projectId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getPagesbyContentType(params: {
  projectId: string
  'content-type': string
  page?: string
  versionId?: string
  releaseId?: string
  'filters[{field}]'?: string
}, opts?: CallOptions): Promise<{
  hasNextPage?: boolean
  totalItems?: number
  data?: {
  id?: string
  name?: string
  type?: string
  status?: string
  versionId?: string
  versionStatus?: string
  sections?: {
  id?: string
  name?: string
  data?: Record<string, unknown>
}[]
  parameters?: Record<string, unknown>
}[]
}> {
    return this.http.request<{
  hasNextPage?: boolean
  totalItems?: number
  data?: {
  id?: string
  name?: string
  type?: string
  status?: string
  versionId?: string
  versionStatus?: string
  sections?: {
  id?: string
  name?: string
  data?: Record<string, unknown>
}[]
  parameters?: Record<string, unknown>
}[]
}>(withCall({ method: 'GET', path: `/_v/cms/api/${encodePathParam(params.projectId)}/${encodePathParam(params['content-type'])}`, query: { 'page': params.page, 'versionId': params.versionId, 'releaseId': params.releaseId, 'filters[{field}]': params['filters[{field}]'] }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getCMSpage(params: {
  projectId: string
  'content-type': string
  'document-id': string
  versionId?: string
  releaseId?: string
}, opts?: CallOptions): Promise<{
  id: string
  name: string
  type: string
  status: string
  versionId?: string
  versionStatus?: string
  sections?: {
  id: string
  name: string
  data: Record<string, unknown>
}[]
}> {
    return this.http.request<{
  id: string
  name: string
  type: string
  status: string
  versionId?: string
  versionStatus?: string
  sections?: {
  id: string
  name: string
  data: Record<string, unknown>
}[]
}>(withCall({ method: 'GET', path: `/_v/cms/api/${encodePathParam(params.projectId)}/${encodePathParam(params['content-type'])}/${encodePathParam(params['document-id'])}`, query: { 'versionId': params.versionId, 'releaseId': params.releaseId }, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}

export class VtexHeadlessCmsApi {
  readonly pages: VtexHeadlessCmsApi_pages
  constructor(http: VtexHttpClient) {
    this.pages = new VtexHeadlessCmsApi_pages(http)
  }
}
