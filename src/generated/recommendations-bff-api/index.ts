import type { VtexHttpClient } from '../../core/http.js'
import type { StartSessionV2Request, StartSessionV2Response, RecommendationsV2Response, RecommendationViewEventV2Request, RecommendationClickEventV2Request, ProductViewEventV2Request } from './types.js'

class RecommendationsBffApi_events {
  constructor(private http: VtexHttpClient) {}

  postApiRecommendBffV2EventsRecommendationView(params: {
  an: string
  body: RecommendationViewEventV2Request
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/recommend-bff/v2/events/recommendation-view`, query: { 'an': params.an }, body: params.body })
  }

  postApiRecommendBffV2EventsRecommendationClick(params: {
  an: string
  body: RecommendationClickEventV2Request
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/recommend-bff/v2/events/recommendation-click`, query: { 'an': params.an }, body: params.body })
  }

  postApiRecommendBffV2EventsProductView(params: {
  an: string
  body: ProductViewEventV2Request
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/recommend-bff/v2/events/product-view`, query: { 'an': params.an }, body: params.body })
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
}): Promise<RecommendationsV2Response> {
    return this.http.request<RecommendationsV2Response>({ method: 'GET', path: `/api/recommend-bff/v2/recommendations`, query: { 'an': params.an, 'campaignVrn': params.campaignVrn, 'userId': params.userId, 'products': params.products, 'salesChannel': params.salesChannel, 'locale': params.locale, 'zipCode': params.zipCode, 'pickupPoint': params.pickupPoint, 'regionId': params.regionId } })
  }
}
class RecommendationsBffApi_users {
  constructor(private http: VtexHttpClient) {}

  postApiRecommendBffV2UsersStartSession(params: {
  an: string
  body: StartSessionV2Request
}): Promise<StartSessionV2Response> {
    return this.http.request<StartSessionV2Response>({ method: 'POST', path: `/api/recommend-bff/v2/users/start-session`, query: { 'an': params.an }, body: params.body })
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
