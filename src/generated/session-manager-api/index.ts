import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { withCall } from '../../core/call.js'
import type { CreateEditSessionRequest, CreateEditSessionResponse, GetSessionResponse, Segment } from './types.js'

class SessionManagerApi_session {
  constructor(private http: VtexHttpClient) {}

  async getSession(params: {
  items: string
}, opts?: CallOptions): Promise<GetSessionResponse> {
    return this.http.request<GetSessionResponse>(withCall({ method: 'GET', path: `/api/sessions`, query: { 'items': params.items } }, opts))
  }

  async createnewsession(params: {
  body: CreateEditSessionRequest
}, opts?: CallOptions): Promise<CreateEditSessionResponse> {
    return this.http.request<CreateEditSessionResponse>(withCall({ method: 'POST', path: `/api/sessions`, body: params.body }, opts))
  }

  async editsession(params: {
  body: CreateEditSessionRequest
}, opts?: CallOptions): Promise<CreateEditSessionResponse> {
    return this.http.request<CreateEditSessionResponse>(withCall({ method: 'PATCH', path: `/api/sessions`, body: params.body }, opts))
  }
}
class SessionManagerApi_segment {
  constructor(private http: VtexHttpClient) {}

  async getSegment(params: Record<string, never> = {}, opts?: CallOptions): Promise<Segment> {
    return this.http.request<Segment>(withCall({ method: 'GET', path: `/api/segments` }, opts))
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
