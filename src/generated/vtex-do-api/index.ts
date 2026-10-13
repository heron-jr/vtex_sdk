import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class VtexDoApi_note {
  constructor(private http: VtexHttpClient) {}

  getNotesbyorderId(params: {
  'target.id': string
  perPage?: number
  page?: number
  reason?: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/notes`, query: { 'target.id': params['target.id'], 'perPage': params.perPage, 'page': params.page, 'reason': params.reason }, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }

  newNote(params: {
  body: {
  target: {
  id?: string
  type?: string
  url?: string
}
  domain: string
  description: string
  createdBy?: {
  id?: string
  name?: string
}
}
}, opts?: CallOptions): Promise<{
  id?: string
  domain?: string
  owner?: string
  target?: {
  id?: string
  type?: string
  url?: string
}
  description?: string
  creationDate?: string
  lastUpdate?: string
  createdBy?: {
  id?: string
  name?: string
  email?: string
  key?: string | null
} | null
}> {
    return this.http.request<{
  id?: string
  domain?: string
  owner?: string
  target?: {
  id?: string
  type?: string
  url?: string
}
  description?: string
  creationDate?: string
  lastUpdate?: string
  createdBy?: {
  id?: string
  name?: string
  email?: string
  key?: string | null
} | null
}>(withCall({ method: 'POST', path: `/notes`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }

  getNote(params: {
  noteId: string
  reason?: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/notes/${encodePathParam(params.noteId)}`, query: { 'reason': params.reason }, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }
}
class VtexDoApi_task {
  constructor(private http: VtexHttpClient) {}

  listtasksbyassignee(params: {
  'assignee.email'?: string
  'target.id'?: string
  context?: string
  page?: string
  perPage?: string
  status?: string
} = {}, opts?: CallOptions): Promise<{
  piiHidden?: boolean
  items?: {
  comments?: string[] | null
  id?: string | null
  surrogateKey?: string
  domain?: string
  target?: {
  id?: string
  type?: string
  url?: string
}[]
  name?: string
  translateMapping?: {
  ar?: string
  bg?: string
  en?: string
  es?: string
  fr?: string
  it?: string
  ja?: string
  ko?: string
  nl?: string
  pt?: string
  ro?: string
  th?: string
}
  context?: string
  priority?: string
  status?: string
  creationDate?: string
  assignee?: {
  id?: string | null
  name?: string
  email?: string
  key?: string | null
} | null
}[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}> {
    return this.http.request<{
  piiHidden?: boolean
  items?: {
  comments?: string[] | null
  id?: string | null
  surrogateKey?: string
  domain?: string
  target?: {
  id?: string
  type?: string
  url?: string
}[]
  name?: string
  translateMapping?: {
  ar?: string
  bg?: string
  en?: string
  es?: string
  fr?: string
  it?: string
  ja?: string
  ko?: string
  nl?: string
  pt?: string
  ro?: string
  th?: string
}
  context?: string
  priority?: string
  status?: string
  creationDate?: string
  assignee?: {
  id?: string | null
  name?: string
  email?: string
  key?: string | null
} | null
}[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}>(withCall({ method: 'GET', path: `/tasks`, query: { 'assignee.email': params['assignee.email'], 'target.id': params['target.id'], 'context': params.context, 'page': params.page, 'perPage': params.perPage, 'status': params.status }, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }

  newTask(params: {
  body: {
  target: {
  id: string
  type: string
  url: string
}[]
  domain: string
  context: string
  name: string
  priority: string
  surrogateKey: string | null
  description?: string
  dueDate: string
  assignee: {
  id?: string | null
  name?: string | null
  email: string
}
  followers: {
  id?: string | null
  name?: string | null
  email: string
}[]
  parentTaskId?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/tasks`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }

  getTask(params: {
  taskId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/tasks/${encodePathParam(params.taskId)}`, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }

  editTask(params: {
  taskId: string
  body: {
  status: "Open" | "Closed" | "Suspended" | "InProgress"
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/tasks/${encodePathParam(params.taskId)}`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }

  addComment(params: {
  taskId: string
  body: {
  text: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/tasks/${encodePathParam(params.taskId)}/comments`, body: params.body, server: 'https://{accountName}.{environment}.com.br/api/do' }, opts))
  }
}

export class VtexDoApi {
  readonly note: VtexDoApi_note
  readonly task: VtexDoApi_task
  constructor(http: VtexHttpClient) {
    this.note = new VtexDoApi_note(http)
    this.task = new VtexDoApi_task(http)
  }
}
