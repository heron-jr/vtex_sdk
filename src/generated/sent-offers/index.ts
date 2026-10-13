import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { CreateChannel, CreateFeedRequest, UpdateFeedRequest, CreateInteractionRequest, CreateLogRequest, Evidence, Data, Errors } from './types.js'

class SentOffersApi_offerManagement {
  constructor(private http: VtexHttpClient) {}

  async createChannel(params: {
  an: string
  body: CreateChannel
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/sent-offers/channels`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async listFeeds(params: {
  an: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/sent-offers/feeds`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async createFeed(params: {
  an: string
  body: CreateFeedRequest
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/sent-offers/feeds`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async retrieveFeed(params: {
  feedId: string
  an: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async updateFeed(params: {
  feedId: string
  an: string
  body: UpdateFeedRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async deleteFeed(params: {
  feedId: string
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async createInteraction(params: {
  feedId: string
  skuId: string
  an: string
  body: CreateInteractionRequest
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}/skus/${encodePathParam(params.skuId)}/interactions`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async retrieveInteraction(params: {
  feedId: string
  skuId: string
  interactionId: string
  an: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}/skus/${encodePathParam(params.skuId)}/interactions/${encodePathParam(params.interactionId)}`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async closeInteraction(params: {
  feedId: string
  skuId: string
  interactionId: string
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}/skus/${encodePathParam(params.skuId)}/interactions/${encodePathParam(params.interactionId)}/close`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async createLog(params: {
  feedId: string
  skuId: string
  interactionId: string
  an: string
  body: CreateLogRequest
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}/skus/${encodePathParam(params.skuId)}/interactions/${encodePathParam(params.interactionId)}/logs`, query: { 'an': params.an }, body: params.body, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async retrieveLog(params: {
  feedId: string
  skuId: string
  interactionId: string
  logId: string
  an: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/sent-offers/feeds/${encodePathParam(params.feedId)}/skus/${encodePathParam(params.skuId)}/interactions/${encodePathParam(params.interactionId)}/logs/${encodePathParam(params.logId)}`, query: { 'an': params.an }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async searchInteractions(params: {
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/sent-offers/search/interactions`, query: { 'an': params.an, 'q': params.q, 'channels': params.channels, 'brand': params.brand, 'category': params.category, 'scope': params.scope, 'result': params.result, 'sort': params.sort, 'from': params.from, 'to': params.to, 'fromDate': params.fromDate, 'toDate': params.toDate }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async searchErrors(params: {
  an: string
  q: string
  channels: string
  brand: string
  category: string
  errorCategory: string
  sort: string
  from: string
  to: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/sent-offers/search/errors`, query: { 'an': params.an, 'q': params.q, 'channels': params.channels, 'brand': params.brand, 'category': params.category, 'errorCategory': params.errorCategory, 'sort': params.sort, 'from': params.from, 'to': params.to }, server: 'https://portal.{environment}.com.br' }, opts))
  }

  async retrieveErrorCode(params: {
  errorCodeId: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/sent-offers/error-codes/${encodePathParam(params.errorCodeId)}`, server: 'https://portal.{environment}.com.br' }, opts))
  }
}

export class SentOffersApi {
  readonly offerManagement: SentOffersApi_offerManagement
  constructor(http: VtexHttpClient) {
    this.offerManagement = new SentOffersApi_offerManagement(http)
  }
}
