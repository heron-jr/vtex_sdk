import type { VtexHttpClient } from '../../core/http.js'
import type { SimulationItemResult, SubscriptionCycleResponse, StorePlan, ReportResponse, PlanResponse, SubscriptionGroupResponse, PlanRequest, ShippingAddressRequest, PurchaseSettingsRequest, SubscriptionGroupRequest, PriceTag, SimulateResponseVO, Settings } from './types.js'

class SubscriptionsApiV3Api_cycles {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPubCyclesByCycleId(params: {
  cycleId: string
}): Promise<SubscriptionCycleResponse> {
    return this.http.request<SubscriptionCycleResponse>({ method: 'GET', path: `/api/rns/pub/cycles/${params.cycleId}` })
  }

  getApiRnsPubCycles(params: {
  beginDate?: string
  endDate?: string
  subscriptionId?: string
  customerEmail?: string
  status?: string
  page?: number
  size?: number
}): Promise<SubscriptionCycleResponse[]> {
    return this.http.request<SubscriptionCycleResponse[]>({ method: 'GET', path: `/api/rns/pub/cycles`, query: { 'beginDate': params.beginDate, 'endDate': params.endDate, 'subscriptionId': params.subscriptionId, 'customerEmail': params.customerEmail, 'status': params.status, 'page': params.page, 'size': params.size } })
  }

  postApiRnsPubCyclesByCycleIdRetry(params: {
  cycleId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/rns/pub/cycles/${params.cycleId}/retry` })
  }
}
class SubscriptionsApiV3Api_plans {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPvtPlans(params: {
  periodicity?: string
  interval?: string
  page?: number
  size?: number
}): Promise<StorePlan[]> {
    return this.http.request<StorePlan[]>({ method: 'GET', path: `/api/rns/pvt/plans`, query: { 'periodicity': params.periodicity, 'interval': params.interval, 'page': params.page, 'size': params.size } })
  }

  getApiRnsPvtPlansById(params: {
  id: string
}): Promise<StorePlan> {
    return this.http.request<StorePlan>({ method: 'GET', path: `/api/rns/pvt/plans/${params.id}` })
  }
}
class SubscriptionsApiV3Api_reports {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPvtReports(params: Record<string, never>): Promise<{
  account?: string
  name?: "subscriptionsWithStatus" | "subscriptionsScheduledBetweenDate" | "subscriptionsUpdatedBetweenDate" | "subscriptionsCreatedBetweenDate" | "executionsBetweenDate"
  description?: string
  reason?: string
  behalfOf?: string
  params?: {
  type?: "string" | "date"
  format?: string
  name?: "status" | "beginDate" | "endDate"
}[]
}[]> {
    return this.http.request<{
  account?: string
  name?: "subscriptionsWithStatus" | "subscriptionsScheduledBetweenDate" | "subscriptionsUpdatedBetweenDate" | "subscriptionsCreatedBetweenDate" | "executionsBetweenDate"
  description?: string
  reason?: string
  behalfOf?: string
  params?: {
  type?: "string" | "date"
  format?: string
  name?: "status" | "beginDate" | "endDate"
}[]
}[]>({ method: 'GET', path: `/api/rns/pvt/reports` })
  }

  getApiRnsPvtReportsByReportNameDocumentsByDocumentId(params: {
  reportName: string
  documentId: string
}): Promise<ReportResponse> {
    return this.http.request<ReportResponse>({ method: 'GET', path: `/api/rns/pvt/reports/${params.reportName}/documents/${params.documentId}` })
  }

  postApiRnsPvtReportsByReportNameDocuments(params: {
  reportName: string
  email?: string
  status?: string
  beginDate?: string
  endDate?: string
}): Promise<ReportResponse> {
    return this.http.request<ReportResponse>({ method: 'POST', path: `/api/rns/pvt/reports/${params.reportName}/documents`, query: { 'email': params.email, 'status': params.status, 'beginDate': params.beginDate, 'endDate': params.endDate } })
  }
}
class SubscriptionsApiV3Api_subscriptions {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPubSubscriptionsById(params: {
  id: string
}): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>({ method: 'GET', path: `/api/rns/pub/subscriptions/${params.id}` })
  }

  patchApiRnsPubSubscriptionsById(params: {
  id: string
  body: {
  customerEmail: string
  title?: string
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING"
  nextPurchaseDate?: string
  isSkipped?: boolean
  plan?: PlanRequest
  shippingAddress?: ShippingAddressRequest
  purchaseSettings?: PurchaseSettingsRequest
}
}): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>({ method: 'PATCH', path: `/api/rns/pub/subscriptions/${params.id}`, body: params.body })
  }

  getApiRnsPubSubscriptions(params: {
  customerEmail?: string
  status?: string
  addressId?: string
  paymentId?: string
  planId?: string
  nextPurchaseDate?: string
  originalOrderId?: string
  page?: number
  size?: number
}): Promise<SubscriptionGroupResponse[]> {
    return this.http.request<SubscriptionGroupResponse[]>({ method: 'GET', path: `/api/rns/pub/subscriptions`, query: { 'customerEmail': params.customerEmail, 'status': params.status, 'addressId': params.addressId, 'paymentId': params.paymentId, 'planId': params.planId, 'nextPurchaseDate': params.nextPurchaseDate, 'originalOrderId': params.originalOrderId, 'page': params.page, 'size': params.size } })
  }

  postApiRnsPubSubscriptions(params: {
  body: SubscriptionGroupRequest
}): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>({ method: 'POST', path: `/api/rns/pub/subscriptions`, body: params.body })
  }

  patchApiRnsPubSubscriptionsByIdItemsByItemId(params: {
  id: string
  itemId: string
  body: {
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING"
  isSkipped?: boolean
  quantity?: number
  manualPrice?: number
}
}): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>({ method: 'PATCH', path: `/api/rns/pub/subscriptions/${params.id}/items/${params.itemId}`, body: params.body })
  }

  deleteApiRnsPubSubscriptionsByIdItemsByItemId(params: {
  id: string
  itemId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/rns/pub/subscriptions/${params.id}/items/${params.itemId}` })
  }

  postApiRnsPubSubscriptionsByIdItems(params: {
  id: string
  body: {
  skuId: string
  quantity: number
  manualPrice?: number
}
}): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>({ method: 'POST', path: `/api/rns/pub/subscriptions/${params.id}/items`, body: params.body })
  }

  postApiRnsPubSubscriptionsByIdSimulate(params: {
  id: string
}): Promise<SimulateResponseVO> {
    return this.http.request<SimulateResponseVO>({ method: 'POST', path: `/api/rns/pub/subscriptions/${params.id}/simulate` })
  }

  postApiRnsPubSubscriptionsSimulate(params: {
  body: SubscriptionGroupRequest
}): Promise<SimulateResponseVO> {
    return this.http.request<SimulateResponseVO>({ method: 'POST', path: `/api/rns/pub/subscriptions/simulate`, body: params.body })
  }

  getApiRnsPubSubscriptionsBySubscriptionIdConversationMessage(params: {
  subscriptionId: string
}): Promise<{
  id?: string
  from?: {
  conversationRelatedTo?: string
  conversationSubject?: string
  emailAlias?: string
  aliasMaskType?: string
  email?: string
  name?: string
  role?: string
}
  to?: {
  conversationRelatedTo?: string
  conversationSubject?: string
  emailAlias?: string
  aliasMaskType?: string
  email?: string
  name?: string
  role?: string
}[]
  subject?: string
  firstWords?: string
  body?: string
  hasAttachment?: boolean
  attachmentNames?: string[]
  date?: string
}[]> {
    return this.http.request<{
  id?: string
  from?: {
  conversationRelatedTo?: string
  conversationSubject?: string
  emailAlias?: string
  aliasMaskType?: string
  email?: string
  name?: string
  role?: string
}
  to?: {
  conversationRelatedTo?: string
  conversationSubject?: string
  emailAlias?: string
  aliasMaskType?: string
  email?: string
  name?: string
  role?: string
}[]
  subject?: string
  firstWords?: string
  body?: string
  hasAttachment?: boolean
  attachmentNames?: string[]
  date?: string
}[]>({ method: 'GET', path: `/api/rns/pub/subscriptions/${params.subscriptionId}/conversation-message` })
  }
}
class SubscriptionsApiV3Api_settings {
  constructor(private http: VtexHttpClient) {}

  getSettings(params: Record<string, never>): Promise<Settings> {
    return this.http.request<Settings>({ method: 'GET', path: `/api/rns/settings` })
  }

  editSettings(params: {
  body: {
  slaOption: "NONE" | "CHEAPEST" | "CUSTOMER_CHOICE" | "STORE_CHOICE"
  defaultSla: string
  isUsingV3: boolean
  onMigrationProcess: boolean
  executionHourInUtc: number
  workflowVersion: string
  deliveryChannels: "delivery" | "pickupInPoint"[]
  randomIdGeneration: boolean
  isMultipleInstallmentsEnabledOnCreation: boolean
  isMultipleInstallmentsEnabledOnUpdate: boolean
  attachmentPreferences?: {
  enableAttachments?: boolean
  splitSameSkuWithDifferentAttachments?: boolean
}
  orderCustomDataAppId: string
  postponeExpiration: boolean
  manualPriceAllowed: boolean
  useItemPriceFromOriginalOrder: boolean
}
}): Promise<Settings> {
    return this.http.request<Settings>({ method: 'POST', path: `/api/rns/settings`, body: params.body })
  }
}

export class SubscriptionsApiV3Api {
  readonly cycles: SubscriptionsApiV3Api_cycles
  readonly plans: SubscriptionsApiV3Api_plans
  readonly reports: SubscriptionsApiV3Api_reports
  readonly subscriptions: SubscriptionsApiV3Api_subscriptions
  readonly settings: SubscriptionsApiV3Api_settings
  constructor(http: VtexHttpClient) {
    this.cycles = new SubscriptionsApiV3Api_cycles(http)
    this.plans = new SubscriptionsApiV3Api_plans(http)
    this.reports = new SubscriptionsApiV3Api_reports(http)
    this.subscriptions = new SubscriptionsApiV3Api_subscriptions(http)
    this.settings = new SubscriptionsApiV3Api_settings(http)
  }
}
