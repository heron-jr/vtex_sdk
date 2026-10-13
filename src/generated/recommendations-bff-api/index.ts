import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { withCall } from '../../core/call.js'
import type { StartSessionV2Request, StartSessionV2Response, RecommendationsV2Response, RecommendationViewEventV2Request, RecommendationClickEventV2Request, ProductViewEventV2Request } from './types.js'

class RecommendationsBffApi_events {
  constructor(private http: VtexHttpClient) {}

  postApiRecommendBffV2EventsRecommendationView(params: {
  an: string
  'x-vtex-rec-origin': string
  body: RecommendationViewEventV2Request
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/recommend-bff/v2/events/recommendation-view`, query: { 'an': params.an }, headers: { 'x-vtex-rec-origin': params['x-vtex-rec-origin'] }, body: params.body, server: 'https://api.{environment}.com.br' }, opts))
  }

  postApiRecommendBffV2EventsRecommendationClick(params: {
  an: string
  'x-vtex-rec-origin': string
  body: RecommendationClickEventV2Request
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/recommend-bff/v2/events/recommendation-click`, query: { 'an': params.an }, headers: { 'x-vtex-rec-origin': params['x-vtex-rec-origin'] }, body: params.body, server: 'https://api.{environment}.com.br' }, opts))
  }

  postApiRecommendBffV2EventsProductView(params: {
  an: string
  'x-vtex-rec-origin': string
  'user-agent'?: string
  body: ProductViewEventV2Request
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/recommend-bff/v2/events/product-view`, query: { 'an': params.an }, headers: { 'x-vtex-rec-origin': params['x-vtex-rec-origin'], 'user-agent': params['user-agent'] }, body: params.body, server: 'https://api.{environment}.com.br' }, opts))
  }
}
class RecommendationsBffApi_recommendations {
  constructor(private http: VtexHttpClient) {}

  getApiRecommendBffV2Recommendations(params: {
  an: string
  campaignVrn: string
  userId?: string
  products?: string
  salesChannel?: string
  locale?: string
  zipCode?: string
  pickupPoint?: string
  regionId?: string
  'x-vtex-rec-origin': string
}, opts?: CallOptions): Promise<RecommendationsV2Response> {
    return this.http.request<RecommendationsV2Response>(withCall({ method: 'GET', path: `/api/recommend-bff/v2/recommendations`, query: { 'an': params.an, 'campaignVrn': params.campaignVrn, 'userId': params.userId, 'products': params.products, 'salesChannel': params.salesChannel, 'locale': params.locale, 'zipCode': params.zipCode, 'pickupPoint': params.pickupPoint, 'regionId': params.regionId }, headers: { 'x-vtex-rec-origin': params['x-vtex-rec-origin'] }, server: 'https://api.{environment}.com.br' }, opts))
  }
}
class RecommendationsBffApi_users {
  constructor(private http: VtexHttpClient) {}

  postApiRecommendBffV2UsersStartSession(params: {
  an: string
  'x-vtex-rec-origin': string
  'x-forwarded-host'?: string
  body: StartSessionV2Request
}, opts?: CallOptions): Promise<StartSessionV2Response> {
    return this.http.request<StartSessionV2Response>(withCall({ method: 'POST', path: `/api/recommend-bff/v2/users/start-session`, query: { 'an': params.an }, headers: { 'x-vtex-rec-origin': params['x-vtex-rec-origin'], 'x-forwarded-host': params['x-forwarded-host'] }, body: params.body, server: 'https://api.{environment}.com.br' }, opts))
  }
}

export class RecommendationsBffApi {
  readonly events: RecommendationsBffApi_events
  readonly recommendations: RecommendationsBffApi_recommendations
  readonly users: RecommendationsBffApi_users
  constructor(http: VtexHttpClient) {
    this.events = new RecommendationsBffApi_events(http)
    this.recommendations = new RecommendationsBffApi_recommendations(http)
    this.users = new RecommendationsBffApi_users(http)
  }
}
