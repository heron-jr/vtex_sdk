import type { VtexHttpClient } from '../../core/http.js'
import type { CreateChannel, CreateFeedRequest, UpdateFeedRequest, CreateInteractionRequest, CreateLogRequest, Evidence, Data, Errors } from './types.js'

class SentOffersApi_offerManagement {
  constructor(private http: VtexHttpClient) {}

  createChannel(params: {
  an: string
  body: CreateChannel
}): Promise<{
  id?: string
  vendor?: string
  name?: string
  logo?: string
}> {
    return this.http.request<{
  id?: string
  vendor?: string
  name?: string
  logo?: string
}>({ method: 'POST', path: `/api/sent-offers/channels`, query: { 'an': params.an }, body: params.body })
  }

  listFeeds(params: {
  an: string
}): Promise<{
  account?: string
  id?: string
  affiliateId?: string
  salesChannel?: string
  channelName?: string
  channelLogo?: string
}[]> {
    return this.http.request<{
  account?: string
  id?: string
  affiliateId?: string
  salesChannel?: string
  channelName?: string
  channelLogo?: string
}[]>({ method: 'GET', path: `/api/sent-offers/feeds`, query: { 'an': params.an } })
  }

  createFeed(params: {
  an: string
  body: CreateFeedRequest
}): Promise<{
  account?: string
  id?: string
  affiliateId?: string
  salesChannel?: string
}> {
    return this.http.request<{
  account?: string
  id?: string
  affiliateId?: string
  salesChannel?: string
}>({ method: 'POST', path: `/api/sent-offers/feeds`, query: { 'an': params.an }, body: params.body })
  }

  retrieveFeed(params: {
  feedId: string
  an: string
}): Promise<{
  account?: string
  id?: string
  affiliateId?: string
  salesChannel?: string
  channelName?: string
  channelLogo?: string
}> {
    return this.http.request<{
  account?: string
  id?: string
  affiliateId?: string
  salesChannel?: string
  channelName?: string
  channelLogo?: string
}>({ method: 'GET', path: `/api/sent-offers/feeds/${params.feedId}`, query: { 'an': params.an } })
  }

  updateFeed(params: {
  feedId: string
  an: string
  body: UpdateFeedRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/sent-offers/feeds/${params.feedId}`, query: { 'an': params.an }, body: params.body })
  }

  deleteFeed(params: {
  feedId: string
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/sent-offers/feeds/${params.feedId}`, query: { 'an': params.an } })
  }

  createInteraction(params: {
  feedId: string
  skuId: string
  an: string
  body: CreateInteractionRequest
}): Promise<{
  account?: string
  feedId?: string
  skuId?: string
  id?: string
  startDate?: string
  result?: string
  state?: string
  source?: string
  origin?: string
  context?: string
  logs?: string[]
}> {
    return this.http.request<{
  account?: string
  feedId?: string
  skuId?: string
  id?: string
  startDate?: string
  result?: string
  state?: string
  source?: string
  origin?: string
  context?: string
  logs?: string[]
}>({ method: 'POST', path: `/api/sent-offers/feeds/${params.feedId}/skus/${params.skuId}/interactions`, query: { 'an': params.an }, body: params.body })
  }

  retrieveInteraction(params: {
  feedId: string
  skuId: string
  interactionId: string
  an: string
}): Promise<{
  account?: string
  feedId?: string
  skuId?: string
  id?: string
  startDate?: string
  result?: string
  state?: string
  source?: string
  origin?: string
  context?: string
  logs?: string[]
}> {
    return this.http.request<{
  account?: string
  feedId?: string
  skuId?: string
  id?: string
  startDate?: string
  result?: string
  state?: string
  source?: string
  origin?: string
  context?: string
  logs?: string[]
}>({ method: 'GET', path: `/api/sent-offers/feeds/${params.feedId}/skus/${params.skuId}/interactions/${params.interactionId}`, query: { 'an': params.an } })
  }

  closeInteraction(params: {
  feedId: string
  skuId: string
  interactionId: string
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/sent-offers/feeds/${params.feedId}/skus/${params.skuId}/interactions/${params.interactionId}/close`, query: { 'an': params.an } })
  }

  createLog(params: {
  feedId: string
  skuId: string
  interactionId: string
  an: string
  body: CreateLogRequest
}): Promise<{
  id?: string
  description?: string
  date?: string
  agent?: string
  evidence?: {
  request?: string
  response?: string
}
  type?: string
}> {
    return this.http.request<{
  id?: string
  description?: string
  date?: string
  agent?: string
  evidence?: {
  request?: string
  response?: string
}
  type?: string
}>({ method: 'POST', path: `/api/sent-offers/feeds/${params.feedId}/skus/${params.skuId}/interactions/${params.interactionId}/logs`, query: { 'an': params.an }, body: params.body })
  }

  retrieveLog(params: {
  feedId: string
  skuId: string
  interactionId: string
  logId: string
  an: string
}): Promise<{
  id?: string
  description?: string
  date?: string
  agent?: string
  evidence?: Record<string, unknown>
  errors?: {
  code?: string
  externalCode?: string
  title?: string
  description?: string
  closableOrigins?: string[]
}[]
  type?: string
}> {
    return this.http.request<{
  id?: string
  description?: string
  date?: string
  agent?: string
  evidence?: Record<string, unknown>
  errors?: {
  code?: string
  externalCode?: string
  title?: string
  description?: string
  closableOrigins?: string[]
}[]
  type?: string
}>({ method: 'GET', path: `/api/sent-offers/feeds/${params.feedId}/skus/${params.skuId}/interactions/${params.interactionId}/logs/${params.logId}`, query: { 'an': params.an } })
  }

  searchInteractions(params: {
  an: string
  q: string
  channels?: string
  brand?: string
  category?: string
  scope?: string
  result?: string
  sort: string
  from: string
  to: string
  fromDate: string
  toDate: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/sent-offers/search/interactions`, query: { 'an': params.an, 'q': params.q, 'channels': params.channels, 'brand': params.brand, 'category': params.category, 'scope': params.scope, 'result': params.result, 'sort': params.sort, 'from': params.from, 'to': params.to, 'fromDate': params.fromDate, 'toDate': params.toDate } })
  }

  searchErrors(params: {
  an: string
  q: string
  channels: string
  brand: string
  category: string
  errorCategory: string
  sort: string
  from: string
  to: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/sent-offers/search/errors`, query: { 'an': params.an, 'q': params.q, 'channels': params.channels, 'brand': params.brand, 'category': params.category, 'errorCategory': params.errorCategory, 'sort': params.sort, 'from': params.from, 'to': params.to } })
  }

  retrieveErrorCode(params: {
  errorCodeId: string
}): Promise<{
  id?: string
  type?: string
  description?: string
  solutionText?: string
  solutionLink?: string
}[]> {
    return this.http.request<{
  id?: string
  type?: string
  description?: string
  solutionText?: string
  solutionLink?: string
}[]>({ method: 'GET', path: `/api/sent-offers/error-codes/${params.errorCodeId}` })
  }
}

export class SentOffersApi {
  readonly offerManagement: SentOffersApi_offerManagement
  constructor(http: VtexHttpClient) {
    this.offerManagement = new SentOffersApi_offerManagement(http)
  }
}
