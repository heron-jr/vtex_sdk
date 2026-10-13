import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { ResponseError, Pagination, TransactionResponse, ReservationResponse, AllocationResponse, NotificationSettings, NotificationSettingsObject, BudgetResponse, CycleConfiguration, CycleConfigurationResponse } from './types.js'

class BudgetsApi_statements {
  constructor(private http: VtexHttpClient) {}

  async getApiBudgetsByContextTypeByContextIdByBudgetIdStatements(params: {
  contextType: string
  contextId: string
  budgetId: string
  page?: number
  pageSize?: number
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/statements`, query: { 'page': params.page, 'pageSize': params.pageSize }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdStatements(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  page?: number
  pageSize?: number
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/statements`, query: { 'page': params.page, 'pageSize': params.pageSize }, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class BudgetsApi_transactions {
  constructor(private http: VtexHttpClient) {}

  async postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdTransactions(params: {
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
}, opts?: CallOptions): Promise<TransactionResponse> {
    return this.http.request<TransactionResponse>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/transactions`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdTransactionsByTransactionIdRefund(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  transactionId: string
  body: {
  requestedBy: string
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/transactions/${encodePathParam(params.transactionId)}/refund`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdTransactionsByTransactionId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  transactionId: string
}, opts?: CallOptions): Promise<TransactionResponse> {
    return this.http.request<TransactionResponse>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/transactions/${encodePathParam(params.transactionId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class BudgetsApi_reservations {
  constructor(private http: VtexHttpClient) {}

  async getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservations(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  page?: number
  pageSize?: number
  status?: "RESERVED" | "CONFIRMED" | "CANCELED"
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/reservations`, query: { 'page': params.page, 'pageSize': params.pageSize, 'status': params.status }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservations(params: {
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
}, opts?: CallOptions): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/reservations`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservationsByReservationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  reservationId: string
}, opts?: CallOptions): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/reservations/${encodePathParam(params.reservationId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservationsByReservationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  reservationId: string
  body: {
  requestedBy: string
}
}, opts?: CallOptions): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>(withCall({ method: 'DELETE', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/reservations/${encodePathParam(params.reservationId)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdReservationsByReservationIdConfirmation(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  reservationId: string
  body: {
  requestedBy: string
}
}, opts?: CallOptions): Promise<ReservationResponse> {
    return this.http.request<ReservationResponse>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/reservations/${encodePathParam(params.reservationId)}/confirmation`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class BudgetsApi_allocations {
  constructor(private http: VtexHttpClient) {}

  async getApiBudgetsByContextTypeByContextIdByBudgetIdAllocations(params: {
  contextType: string
  contextId: string
  budgetId: string
  type?: string
  page?: number
  pageSize?: number
  status?: "ACTIVE" | "INACTIVE" | "DELETED"
  referenceId?: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations`, query: { 'type': params.type, 'page': params.page, 'pageSize': params.pageSize, 'status': params.status, 'referenceId': params.referenceId }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiBudgetsByContextTypeByContextIdByBudgetIdAllocations(params: {
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
}, opts?: CallOptions): Promise<AllocationResponse> {
    return this.http.request<AllocationResponse>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsBatch(params: {
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
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/batch`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
}, opts?: CallOptions): Promise<AllocationResponse> {
    return this.http.request<AllocationResponse>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationId(params: {
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
}, opts?: CallOptions): Promise<AllocationResponse> {
    return this.http.request<AllocationResponse>(withCall({ method: 'PUT', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationId(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdLinkedEntity(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  linkedEntityId: string
  linkedEntityType: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/linked-entity`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdStatus(params: {
  contextType: string
  contextId: string
  budgetId: string
  allocationId: string
  body: {
  status: "ACTIVE" | "INACTIVE"
}
}, opts?: CallOptions): Promise<{
  status?: "ACTIVE" | "INACTIVE"
}> {
    return this.http.request<{
  status?: "ACTIVE" | "INACTIVE"
}>(withCall({ method: 'PUT', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/status`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiBudgetsByContextTypeByContextIdByBudgetIdAllocationsByAllocationIdUsage(params: {
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/allocations/${encodePathParam(params.allocationId)}/usage`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiBudgetsByContextTypeByContextIdAllocationsQuery(params: {
  contextType: string
  contextId: string
  body: {
  items: {
  id: string
  type: string
}[]
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/allocations/query`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class BudgetsApi_budgets {
  constructor(private http: VtexHttpClient) {}

  async getApiBudgetsByContextTypeByContextId(params: {
  contextType: string
  contextId: string
  page?: number
  pageSize?: number
  minAmount?: number
  maxAmount?: number
  status?: "ACTIVE" | "INACTIVE"
  name?: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}`, query: { 'page': params.page, 'pageSize': params.pageSize, 'minAmount': params.minAmount, 'maxAmount': params.maxAmount, 'status': params.status, 'name': params.name }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async postApiBudgetsByContextTypeByContextId(params: {
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
}, opts?: CallOptions): Promise<BudgetResponse> {
    return this.http.request<BudgetResponse>(withCall({ method: 'POST', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getApiBudgetsByContextTypeByContextIdByBudgetId(params: {
  contextType: string
  contextId: string
  budgetId: string
}, opts?: CallOptions): Promise<BudgetResponse> {
    return this.http.request<BudgetResponse>(withCall({ method: 'GET', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiBudgetsByContextTypeByContextIdByBudgetId(params: {
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
}, opts?: CallOptions): Promise<BudgetResponse> {
    return this.http.request<BudgetResponse>(withCall({ method: 'PUT', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteApiBudgetsByContextTypeByContextIdByBudgetId(params: {
  contextType: string
  contextId: string
  budgetId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async putApiBudgetsByContextTypeByContextIdByBudgetIdStatus(params: {
  contextType: string
  contextId: string
  budgetId: string
  body: {
  status: "ACTIVE" | "INACTIVE"
}
}, opts?: CallOptions): Promise<{
  status?: "ACTIVE" | "INACTIVE"
}> {
    return this.http.request<{
  status?: "ACTIVE" | "INACTIVE"
}>(withCall({ method: 'PUT', path: `/api/budgets/${encodePathParam(params.contextType)}/${encodePathParam(params.contextId)}/${encodePathParam(params.budgetId)}/status`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
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
