import type { VtexHttpClient } from '../../core/http.js'
import type { CreateEditSessionRequest, CreateEditSessionResponse, GetSessionResponse, Segment } from './types.js'

class SessionManagerApi_session {
  constructor(private http: VtexHttpClient) {}

  getSession(params: {
  items: string
}): Promise<GetSessionResponse> {
    return this.http.request<GetSessionResponse>({ method: 'GET', path: `/api/sessions`, query: { 'items': params.items } })
  }

  createnewsession(params: {
  body: CreateEditSessionRequest
}): Promise<CreateEditSessionResponse> {
    return this.http.request<CreateEditSessionResponse>({ method: 'POST', path: `/api/sessions`, body: params.body })
  }

  editsession(params: {
  body: CreateEditSessionRequest
}): Promise<CreateEditSessionResponse> {
    return this.http.request<CreateEditSessionResponse>({ method: 'PATCH', path: `/api/sessions`, body: params.body })
  }
}
class SessionManagerApi_segment {
  constructor(private http: VtexHttpClient) {}

  getSegment(params: Record<string, never>): Promise<Segment> {
    return this.http.request<Segment>({ method: 'GET', path: `/api/segments` })
  }
}

export class SessionManagerApi {
  readonly session: SessionManagerApi_session
  readonly segment: SessionManagerApi_segment
  constructor(http: VtexHttpClient) {
    this.session = new SessionManagerApi_session(http)
    this.segment = new SessionManagerApi_segment(http)
  }
}
