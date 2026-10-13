import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { withCall } from '../../core/call.js'
import type { UserIdentification, SessionPing, PageCart, PageEmptyCart, PageConfirmation, Click, Query, AutocompleteClick, AutocompleteQuery, CartProduct, OrderProduct, Session, Anonymous } from './types.js'

class VtexIntelligentSearchEventsApiHeadlessApi_events {
  constructor(private http: VtexHttpClient) {}

  async postEvent(params: {
  body: SessionPing | Query | Click | PageConfirmation | AutocompleteQuery | AutocompleteClick
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/event`, body: params.body, server: 'https://sp.vtex.com/event-api/v1/{accountName}' }, opts))
  }
}

export class VtexIntelligentSearchEventsApiHeadlessApi {
  readonly events: VtexIntelligentSearchEventsApiHeadlessApi_events
  constructor(http: VtexHttpClient) {
    this.events = new VtexIntelligentSearchEventsApiHeadlessApi_events(http)
  }
}
