import type { VtexHttpClient } from '../../core/http.js'

class VtexDoApi_note {
  constructor(private http: VtexHttpClient) {}

  getNotesbyorderId(params: {
  'target.id': string
  perPage?: number
  page?: number
  reason?: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/notes`, query: { 'target.id': params['target.id'], 'perPage': params.perPage, 'page': params.page, 'reason': params.reason } })
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
}): Promise<{
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
  key?: string
}
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
  key?: string
}
}>({ method: 'POST', path: `/notes`, body: params.body })
  }

  getNote(params: {
  noteId: string
  reason?: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/notes/${params.noteId}`, query: { 'reason': params.reason } })
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
}): Promise<{
  piiHidden?: boolean
  items?: {
  comments?: string[]
  id?: string
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
  id?: string
  name?: string
  email?: string
  key?: string
}
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
  comments?: string[]
  id?: string
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
  id?: string
  name?: string
  email?: string
  key?: string
}
}[]
  paging?: {
  page?: number
  perPage?: number
  total?: number
  pages?: number
}
}>({ method: 'GET', path: `/tasks`, query: { 'assignee.email': params['assignee.email'], 'target.id': params['target.id'], 'context': params.context, 'page': params.page, 'perPage': params.perPage, 'status': params.status } })
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
  surrogateKey: string
  description?: string
  dueDate: string
  assignee: {
  id?: string
  name?: string
  email: string
}
  followers: {
  id?: string
  name?: string
  email: string
}[]
  parentTaskId?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/tasks`, body: params.body })
  }

  getTask(params: {
  taskId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/tasks/${params.taskId}` })
  }

  editTask(params: {
  taskId: string
  body: {
  status: "Open" | "Closed" | "Suspended" | "InProgress"
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/tasks/${params.taskId}`, body: params.body })
  }

  addComment(params: {
  taskId: string
  body: {
  text: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/tasks/${params.taskId}/comments`, body: params.body })
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
