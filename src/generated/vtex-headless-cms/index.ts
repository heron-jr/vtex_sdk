import type { VtexHttpClient } from '../../core/http.js'

class VtexHeadlessCmsApi_pages {
  constructor(private http: VtexHttpClient) {}

  getAllContentTypes(params: {
  projectId: string
}): Promise<{
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
  widget?: Record<string, unknown>
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
  widget?: Record<string, unknown>
}
}[]
}[]
}[]
}>({ method: 'GET', path: `/_v/cms/api/${params.projectId}` })
  }

  getPagesbyContentType(params: {
  projectId: string
  'content-type': string
  page?: string
  versionId?: string
  releaseId?: string
  'filters[{field}]'?: string
}): Promise<{
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
}>({ method: 'GET', path: `/_v/cms/api/${params.projectId}/${params['content-type']}`, query: { 'page': params.page, 'versionId': params.versionId, 'releaseId': params.releaseId, 'filters[{field}]': params['filters[{field}]'] } })
  }

  getCMSpage(params: {
  projectId: string
  'content-type': string
  'document-id': string
  versionId?: string
  releaseId?: string
}): Promise<{
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
}>({ method: 'GET', path: `/_v/cms/api/${params.projectId}/${params['content-type']}/${params['document-id']}`, query: { 'versionId': params.versionId, 'releaseId': params.releaseId } })
  }
}

export class VtexHeadlessCmsApi {
  readonly pages: VtexHeadlessCmsApi_pages
  constructor(http: VtexHttpClient) {
    this.pages = new VtexHeadlessCmsApi_pages(http)
  }
}
