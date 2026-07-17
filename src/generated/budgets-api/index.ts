import type { VtexHttpClient } from '../../core/http.js'
import type { ResponseError, Pagination, TransactionResponse, ReservationResponse, AllocationResponse, NotificationSettings, NotificationSettingsObject, BudgetResponse, CycleConfiguration, CycleConfigurationResponse } from './types.js'

class BudgetsApi_statements {
  constructor(private http: VtexHttpClient) {}

  getApiBudgetsByContextTypeByContextIdByBudgetIdStatements(params: {
  contextType: string
  contextId: string
  budgetId: string
  page?: number
  pageSize?: number
}): Promise<{
  pagination?: Pagination
  transactions?: {
  id?: string
  budgetId?: string
  allocationId?: string
  type?: "DEBIT" | "CREDIT"
  amount?: number
  date?: string
  contextType?: string
  contextId?: string
}[]
}> {
    return this.http.request<{
  pagination?: Pagination
  transactions?: {
  id?: string
  budgetId?: string
  allocationId?: string
  type?: "DEBIT" | "CREDIT"
  amount?: number
  date?: string
  contextType?: string
  contextId?: string
}[]
}>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/statements`, query: { 'page': params.page, 'pageSize': params.pageSize } })
  }

  getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdStatements(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  page?: number
  pageSize?: number
}): Promise<{
  pagination?: Pagination
  transactions?: {
  id?: string
  budgetId?: string
  allocationId?: string
  type?: "DEBIT" | "CREDIT"
  amount?: number
  date?: string
  contextType?: string
  contextId?: string
}[]
}> {
    return this.http.request<{
  pagination?: Pagination
  transactions?: {
  id?: string
  budgetId?: string
  allocationId?: string
  type?: "DEBIT" | "CREDIT"
  amount?: number
  date?: string
  contextType?: string
  contextId?: string
}[]
}>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/statements`, query: { 'page': params.page, 'pageSize': params.pageSize } })
  }
}
class BudgetsApi_transactions {
  constructor(private http: VtexHttpClient) {}

  postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdTransactions(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  origin: string
  reference?: string
  amount: number
  type: "DEBIT" | "CREDIT"
  requestedBy: string
}
}): Promise<TransactionResponse> {
    return this.http.request<TransactionResponse>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/transactions`, body: params.body })
  }

  postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdTransactionsByTransactionIdRefund(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  transactionId: string
  body: {
  requestedBy: string
}
}): Promise<{
  id?: string
  originalTransactionId?: string
  budgetId?: string
  allocationId?: string
}> {
    return this.http.request<{
  id?: string
  originalTransactionId?: string
  budgetId?: string
  allocationId?: string
}>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/transactions/${params.transactionId}/refund`, body: params.body })
  }

  getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdTransactionsByTransactionId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  transactionId: string
}): Promise<TransactionResponse> {
    return this.http.request<TransactionResponse>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/transactions/${params.transactionId}` })
  }
}
class BudgetsApi_reservations {
  constructor(private http: VtexHttpClient) {}

  getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservations(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  page?: number
  pageSize?: number
  status?: "RESERVED" | "CONFIRMED" | "CANCELED"
}): Promise<{
  pagination?: Pagination
  items?: {
  id?: string
  budgetId?: string
  allocationId?: string
  type?: "DEBIT" | "CREDIT"
  amount?: number
  date?: string
  contextType?: string
  contextId?: string
}[]
  contextType?: string
  contextId?: string
}> {
    return this.http.request<{
  pagination?: Pagination
  items?: {
  id?: string
  budgetId?: string
  allocationId?: string
  type?: "DEBIT" | "CREDIT"
  amount?: number
  date?: string
  contextType?: string
  contextId?: string
}[]
  contextType?: string
  contextId?: string
}>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/reservations`, query: { 'page': params.page, 'pageSize': params.pageSize, 'status': params.status } })
  }

  postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservations(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  origin: string
  reference: string
  amount: number
  requestedBy: string
  reservationId: string
  type: "DEBIT" | "CREDIT"
}
}): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/reservations`, body: params.body })
  }

  getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservationsByReservationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  reservationId: string
}): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/reservations/${params.reservationId}` })
  }

  deleteApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservationsByReservationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  reservationId: string
  body: {
  requestedBy: string
}
}): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>({ method: 'DELETE', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/reservations/${params.reservationId}`, body: params.body })
  }

  postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservationsByReservationIdConfirmation(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  reservationId: string
  body: {
  requestedBy: string
}
}): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/reservations/${params.reservationId}/confirmation`, body: params.body })
  }
}
class BudgetsApi_allocations {
  constructor(private http: VtexHttpClient) {}

  getApiBudgetsByContextTypeByContextIdByBudgetIdAllocations(params: {
  contextType: string
  contextId: string
  budgetId: string
  type?: string
  page?: number
  pageSize?: number
  status?: "ACTIVE" | "INACTIVE" | "DELETED"
  referenceId?: string
}): Promise<{
  pagination?: Pagination
  items?: {
  id?: string
  budgetId?: string
  linkedEntity?: {
  id?: string
  type?: string
}
  balance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  status?: "ACTIVE" | "INACTIVE" | "DELETED"
  contextType?: string
  contextId?: string
}[]
}> {
    return this.http.request<{
  pagination?: Pagination
  items?: {
  id?: string
  budgetId?: string
  linkedEntity?: {
  id?: string
  type?: string
}
  balance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  status?: "ACTIVE" | "INACTIVE" | "DELETED"
  contextType?: string
  contextId?: string
}[]
}>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations`, query: { 'type': params.type, 'page': params.page, 'pageSize': params.pageSize, 'status': params.status, 'referenceId': params.referenceId } })
  }

  postApiBudgetsByContextTypeByContextIdByBudgetIdAllocations(params: {
  contextType: string
  contextId: string
  budgetId: string
  body: {
  linkedEntity: {
  id: string
  type: string
}
  referenceId: string
  amount: number
  notificationSettings?: NotificationSettingsObject
}
}): Promise<AllocationResponse> {
    return this.http.request<AllocationResponse>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations`, body: params.body })
  }

  postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsBatch(params: {
  contextType: string
  contextId: string
  budgetId: string
  body: {
  allocations: {
  linkedEntity: {
  id: string
  type: string
}
  referenceId: string
  contractId?: string
  amount: number
  notificationSettings?: NotificationSettings
}[]
}
}): Promise<{
  budgetId?: string
  allocations?: {
  id?: string
  budgetId?: string
  linkedEntity?: {
  id?: string
  type?: string
}
  balance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  notificationSettings?: NotificationSettings
  status?: "ACTIVE" | "INACTIVE"
  referenceId?: string
  contractId?: string
  contextType?: string
  contextId?: string
}[]
}> {
    return this.http.request<{
  budgetId?: string
  allocations?: {
  id?: string
  budgetId?: string
  linkedEntity?: {
  id?: string
  type?: string
}
  balance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  notificationSettings?: NotificationSettings
  status?: "ACTIVE" | "INACTIVE"
  referenceId?: string
  contractId?: string
  contextType?: string
  contextId?: string
}[]
}>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/batch`, body: params.body })
  }

  getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
}): Promise<AllocationResponse> {
    return this.http.request<AllocationResponse>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}` })
  }

  putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  linkedEntity: {
  id: string
  type: string
}
  amount: number
  referenceId: string
  contractId?: string
  allocations?: {
  linkedEntity?: {
  id: string
  type: string
}
  referenceId?: string
  contractId?: string
  amount?: number
  notificationSettings?: NotificationSettingsObject
}[]
  notificationSettings?: NotificationSettingsObject
}
}): Promise<AllocationResponse> {
    return this.http.request<AllocationResponse>({ method: 'PUT', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}`, body: params.body })
  }

  deleteApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}` })
  }

  putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdLinkedEntity(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  linkedEntityId: string
  linkedEntityType: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/linked-entity`, body: params.body })
  }

  putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdStatus(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  status: "ACTIVE" | "INACTIVE"
}
}): Promise<{
  status?: "ACTIVE" | "INACTIVE"
}> {
    return this.http.request<{
  status?: "ACTIVE" | "INACTIVE"
}>({ method: 'PUT', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/status`, body: params.body })
  }

  putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdUsage(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  origin: string
  reference?: string
  amount: number
  requestedBy: string
  type: "DEBIT" | "CREDIT"
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/allocations/${params.allocationId}/usage`, body: params.body })
  }

  postApiBudgetsByContextTypeByContextIdAllocationsQuery(params: {
  contextType: string
  contextId: string
  body: {
  items: {
  id: string
  type: string
}[]
}
}): Promise<{
  items?: {
  budgetId?: string
  allocationId?: string
  linkedEntity?: {
  id?: string
  type?: string
}
  budgetBalance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  cycleConfiguration?: CycleConfiguration
  allocationBalance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
}[]
}> {
    return this.http.request<{
  items?: {
  budgetId?: string
  allocationId?: string
  linkedEntity?: {
  id?: string
  type?: string
}
  budgetBalance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  cycleConfiguration?: CycleConfiguration
  allocationBalance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
}[]
}>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}/allocations/query`, body: params.body })
  }
}
class BudgetsApi_budgets {
  constructor(private http: VtexHttpClient) {}

  getApiBudgetsByContextTypeByContextId(params: {
  contextType: string
  contextId: string
  page?: number
  pageSize?: number
  minAmount?: number
  maxAmount?: number
  status?: "ACTIVE" | "INACTIVE"
  name?: string
}): Promise<{
  pagination?: Pagination
  items?: {
  id?: string
  name?: string
  startDate?: string
  endDate?: string
  balance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  status?: string
  contextType?: string
  contextId?: string
}[]
}> {
    return this.http.request<{
  pagination?: Pagination
  items?: {
  id?: string
  name?: string
  startDate?: string
  endDate?: string
  balance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  status?: string
  contextType?: string
  contextId?: string
}[]
}>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}`, query: { 'page': params.page, 'pageSize': params.pageSize, 'minAmount': params.minAmount, 'maxAmount': params.maxAmount, 'status': params.status, 'name': params.name } })
  }

  postApiBudgetsByContextTypeByContextId(params: {
  contextType: string
  contextId: string
  body: {
  name: string
  description: string
  amount: number
  cycleConfiguration?: CycleConfiguration
  notificationSettings?: NotificationSettingsObject
  allocations?: {
  linkedEntity: {
  id: string
  type: string
}
  amount: number
  referenceId: string
  notificationSettings?: NotificationSettingsObject
}[]
}
}): Promise<BudgetResponse> {
    return this.http.request<BudgetResponse>({ method: 'POST', path: `/api/budgets/${params.contextType}/${params.contextId}`, body: params.body })
  }

  getApiBudgetsByContextTypeByContextIdByBudgetId(params: {
  contextType: string
  contextId: string
  budgetId: string
}): Promise<BudgetResponse> {
    return this.http.request<BudgetResponse>({ method: 'GET', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}` })
  }

  putApiBudgetsByContextTypeByContextIdByBudgetId(params: {
  contextType: string
  contextId: string
  budgetId: string
  body: {
  name: string
  description: string
  amount: number
  cycleConfiguration?: CycleConfiguration
  notificationSettings?: NotificationSettingsObject
}
}): Promise<BudgetResponse> {
    return this.http.request<BudgetResponse>({ method: 'PUT', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}`, body: params.body })
  }

  deleteApiBudgetsByContextTypeByContextIdByBudgetId(params: {
  contextType: string
  contextId: string
  budgetId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}` })
  }

  putApiBudgetsByContextTypeByContextIdByBudgetIdStatus(params: {
  contextType: string
  contextId: string
  budgetId: string
  body: {
  status: "ACTIVE" | "INACTIVE"
}
}): Promise<{
  status?: "ACTIVE" | "INACTIVE"
}> {
    return this.http.request<{
  status?: "ACTIVE" | "INACTIVE"
}>({ method: 'PUT', path: `/api/budgets/${params.contextType}/${params.contextId}/${params.budgetId}/status`, body: params.body })
  }
}

export class BudgetsApi {
  readonly statements: BudgetsApi_statements
  readonly transactions: BudgetsApi_transactions
  readonly reservations: BudgetsApi_reservations
  readonly allocations: BudgetsApi_allocations
  readonly budgets: BudgetsApi_budgets
  constructor(http: VtexHttpClient) {
    this.statements = new BudgetsApi_statements(http)
    this.transactions = new BudgetsApi_transactions(http)
    this.reservations = new BudgetsApi_reservations(http)
    this.allocations = new BudgetsApi_allocations(http)
    this.budgets = new BudgetsApi_budgets(http)
  }
}
