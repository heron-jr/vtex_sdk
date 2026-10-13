import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { SimulationItemResult, SubscriptionCycleResponse, StorePlan, ReportResponse, PlanResponse, SubscriptionGroupResponse, PlanRequest, ShippingAddressRequest, PurchaseSettingsRequest, SubscriptionGroupRequest, PriceTag, SimulateResponseVO, Settings } from './types.js'

class SubscriptionsApiV3Api_cycles {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPubCyclesByCycleId(params: {
  cycleId: string
}, opts?: CallOptions): Promise<SubscriptionCycleResponse> {
    return this.http.request<SubscriptionCycleResponse>(withCall({ method: 'GET', path: `/api/rns/pub/cycles/${encodePathParam(params.cycleId)}` }, opts))
  }

  getApiRnsPubCycles(params: {
  beginDate?: string | null
  endDate?: string | null
  subscriptionId?: string | null
  customerEmail?: string | null
  status?: string | null
  page?: number
  size?: number
} = {}, opts?: CallOptions): Promise<SubscriptionCycleResponse[]> {
    return this.http.request<SubscriptionCycleResponse[]>(withCall({ method: 'GET', path: `/api/rns/pub/cycles`, query: { 'beginDate': params.beginDate, 'endDate': params.endDate, 'subscriptionId': params.subscriptionId, 'customerEmail': params.customerEmail, 'status': params.status, 'page': params.page, 'size': params.size } }, opts))
  }

  postApiRnsPubCyclesByCycleIdRetry(params: {
  cycleId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/rns/pub/cycles/${encodePathParam(params.cycleId)}/retry` }, opts))
  }
}
class SubscriptionsApiV3Api_plans {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPvtPlans(params: {
  periodicity?: string | null
  interval?: string | null
  page?: number
  size?: number
} = {}, opts?: CallOptions): Promise<StorePlan[]> {
    return this.http.request<StorePlan[]>(withCall({ method: 'GET', path: `/api/rns/pvt/plans`, query: { 'periodicity': params.periodicity, 'interval': params.interval, 'page': params.page, 'size': params.size } }, opts))
  }

  getApiRnsPvtPlansById(params: {
  id: string
}, opts?: CallOptions): Promise<StorePlan> {
    return this.http.request<StorePlan>(withCall({ method: 'GET', path: `/api/rns/pvt/plans/${encodePathParam(params.id)}` }, opts))
  }
}
class SubscriptionsApiV3Api_reports {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPvtReports(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  account?: string
  name?: "subscriptionsWithStatus" | "subscriptionsScheduledBetweenDate" | "subscriptionsUpdatedBetweenDate" | "subscriptionsCreatedBetweenDate" | "executionsBetweenDate"
  description?: string
  reason?: string | null
  behalfOf?: string | null
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
  reason?: string | null
  behalfOf?: string | null
  params?: {
  type?: "string" | "date"
  format?: string
  name?: "status" | "beginDate" | "endDate"
}[]
}[]>(withCall({ method: 'GET', path: `/api/rns/pvt/reports` }, opts))
  }

  getApiRnsPvtReportsByReportNameDocumentsByDocumentId(params: {
  reportName: string
  documentId: string
}, opts?: CallOptions): Promise<ReportResponse> {
    return this.http.request<ReportResponse>(withCall({ method: 'GET', path: `/api/rns/pvt/reports/${encodePathParam(params.reportName)}/documents/${encodePathParam(params.documentId)}` }, opts))
  }

  postApiRnsPvtReportsByReportNameDocuments(params: {
  reportName: string
  email?: string
  status?: string
  beginDate?: string
  endDate?: string
}, opts?: CallOptions): Promise<ReportResponse> {
    return this.http.request<ReportResponse>(withCall({ method: 'POST', path: `/api/rns/pvt/reports/${encodePathParam(params.reportName)}/documents`, query: { 'email': params.email, 'status': params.status, 'beginDate': params.beginDate, 'endDate': params.endDate } }, opts))
  }
}
class SubscriptionsApiV3Api_subscriptions {
  constructor(private http: VtexHttpClient) {}

  getApiRnsPubSubscriptionsById(params: {
  id: string
}, opts?: CallOptions): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>(withCall({ method: 'GET', path: `/api/rns/pub/subscriptions/${encodePathParam(params.id)}` }, opts))
  }

  patchApiRnsPubSubscriptionsById(params: {
  id: string
  body: {
  customerEmail: string
  title?: string | null
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING" | null
  nextPurchaseDate?: string
  isSkipped?: boolean
  plan?: PlanRequest
  shippingAddress?: ShippingAddressRequest
  purchaseSettings?: PurchaseSettingsRequest
}
}, opts?: CallOptions): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>(withCall({ method: 'PATCH', path: `/api/rns/pub/subscriptions/${encodePathParam(params.id)}`, body: params.body }, opts))
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
} = {}, opts?: CallOptions): Promise<SubscriptionGroupResponse[]> {
    return this.http.request<SubscriptionGroupResponse[]>(withCall({ method: 'GET', path: `/api/rns/pub/subscriptions`, query: { 'customerEmail': params.customerEmail, 'status': params.status, 'addressId': params.addressId, 'paymentId': params.paymentId, 'planId': params.planId, 'nextPurchaseDate': params.nextPurchaseDate, 'originalOrderId': params.originalOrderId, 'page': params.page, 'size': params.size } }, opts))
  }

  postApiRnsPubSubscriptions(params: {
  body: SubscriptionGroupRequest
}, opts?: CallOptions): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>(withCall({ method: 'POST', path: `/api/rns/pub/subscriptions`, body: params.body }, opts))
  }

  patchApiRnsPubSubscriptionsByIdItemsByItemId(params: {
  id: string
  itemId: string
  body: {
  status?: "ACTIVE" | "PAUSED" | "CANCELED" | "EXPIRED" | "MISSING" | null
  isSkipped?: boolean | null
  quantity?: number
  manualPrice?: number
}
}, opts?: CallOptions): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>(withCall({ method: 'PATCH', path: `/api/rns/pub/subscriptions/${encodePathParam(params.id)}/items/${encodePathParam(params.itemId)}`, body: params.body }, opts))
  }

  deleteApiRnsPubSubscriptionsByIdItemsByItemId(params: {
  id: string
  itemId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/rns/pub/subscriptions/${encodePathParam(params.id)}/items/${encodePathParam(params.itemId)}` }, opts))
  }

  postApiRnsPubSubscriptionsByIdItems(params: {
  id: string
  body: {
  skuId: string
  quantity: number
  manualPrice?: number | null
}
}, opts?: CallOptions): Promise<SubscriptionGroupResponse> {
    return this.http.request<SubscriptionGroupResponse>(withCall({ method: 'POST', path: `/api/rns/pub/subscriptions/${encodePathParam(params.id)}/items`, body: params.body }, opts))
  }

  postApiRnsPubSubscriptionsByIdSimulate(params: {
  id: string
}, opts?: CallOptions): Promise<SimulateResponseVO> {
    return this.http.request<SimulateResponseVO>(withCall({ method: 'POST', path: `/api/rns/pub/subscriptions/${encodePathParam(params.id)}/simulate` }, opts))
  }

  postApiRnsPubSubscriptionsSimulate(params: {
  body: SubscriptionGroupRequest
}, opts?: CallOptions): Promise<SimulateResponseVO> {
    return this.http.request<SimulateResponseVO>(withCall({ method: 'POST', path: `/api/rns/pub/subscriptions/simulate`, body: params.body }, opts))
  }

  getApiRnsPubSubscriptionsBySubscriptionIdConversationMessage(params: {
  subscriptionId: string
}, opts?: CallOptions): Promise<{
  id?: string
  from?: {
  conversationRelatedTo?: string
  conversationSubject?: string
  emailAlias?: string
  aliasMaskType?: string
  email?: string
  name?: string
  role?: string | null
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
  attachmentNames?: (string | null)[] | null
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
  role?: string | null
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
  attachmentNames?: (string | null)[] | null
  date?: string
}[]>(withCall({ method: 'GET', path: `/api/rns/pub/subscriptions/${encodePathParam(params.subscriptionId)}/conversation-message` }, opts))
  }
}
class SubscriptionsApiV3Api_settings {
  constructor(private http: VtexHttpClient) {}

  getSettings(params: Record<string, never> = {}, opts?: CallOptions): Promise<Settings> {
    return this.http.request<Settings>(withCall({ method: 'GET', path: `/api/rns/settings` }, opts))
  }

  editSettings(params: {
  body: {
  slaOption: "NONE" | "CHEAPEST" | "CUSTOMER_CHOICE" | "STORE_CHOICE"
  defaultSla: string | null
  isUsingV3: boolean
  onMigrationProcess: boolean
  executionHourInUtc: number
  workflowVersion: string
  deliveryChannels: ("delivery" | "pickupInPoint")[]
  randomIdGeneration: boolean
  isMultipleInstallmentsEnabledOnCreation: boolean
  isMultipleInstallmentsEnabledOnUpdate: boolean
  attachmentPreferences?: {
  enableAttachments?: boolean
  splitSameSkuWithDifferentAttachments?: boolean
}
  orderCustomDataAppId: string | null
  postponeExpiration: boolean
  manualPriceAllowed: boolean
  useItemPriceFromOriginalOrder: boolean
}
}, opts?: CallOptions): Promise<Settings> {
    return this.http.request<Settings>(withCall({ method: 'POST', path: `/api/rns/settings`, body: params.body }, opts))
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
