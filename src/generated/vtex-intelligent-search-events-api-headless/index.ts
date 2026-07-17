import type { VtexHttpClient } from '../../core/http.js'
import type { UserIdentification, SessionPing, PageCart, PageEmptyCart, PageConfirmation, Click, Query, AutocompleteClick, AutocompleteQuery, CartProduct, OrderProduct, Session, Anonymous } from './types.js'

class VtexIntelligentSearchEventsApiHeadlessApi_events {
  constructor(private http: VtexHttpClient) {}

  postEvent(params: {
  body: SessionPing | Query | Click | PageConfirmation | AutocompleteQuery | AutocompleteClick
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/event`, body: params.body })
  }
}

export class VtexIntelligentSearchEventsApiHeadlessApi {
  readonly events: VtexIntelligentSearchEventsApiHeadlessApi_events
  constructor(http: VtexHttpClient) {
    this.events = new VtexIntelligentSearchEventsApiHeadlessApi_events(http)
  }
}
