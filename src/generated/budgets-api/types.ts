export type ResponseError = {
  error?: string
}

export type Pagination = {
  current?: number
  pages?: number
  results?: number
}

export type TransactionResponse = {
  id?: string
  budgetId?: string
  allocationId?: string
  origin?: string
  reference?: string
  amount?: number
  requestedBy?: string
  date?: string
  type?: "DEBIT" | "CREDIT"
  contextType?: string
  contextId?: string
}

export type ReservationResponse = {
  id?: string
  budgetId?: string
  allocationId?: string
  origin?: string
  reference?: string
  amount?: number
  requestedBy?: string
  date?: string
  type?: "DEBIT" | "CREDIT"
  contextType?: string
  contextId?: string
}

export type AllocationResponse = {
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
  notificationSettings?: NotificationSettingsObject
  status?: "ACTIVE" | "INACTIVE" | "DELETED"
  referenceId?: string
  contractId?: string
  contextType?: string
  contextId?: string
}

export type NotificationSettings = {
  type?: "PERCENT" | "AMOUNT"
  threshold?: number
  recipients?: {
  email?: string
}[]
}[]

export type NotificationSettingsObject = {
  enable?: boolean
  thresholds?: {
  type?: "PERCENT" | "AMOUNT"
  Value?: number
}[]
  recipients?: {
  type?: string
  identifier?: string
}[]
}

export type BudgetResponse = {
  id?: string
  name?: string
  description?: string
  balance?: {
  amount?: number
  balanceAdjustment?: number
  remaining?: number
}
  cycleConfiguration?: CycleConfigurationResponse
  notificationSettings?: NotificationSettingsObject
  status?: "ACTIVE" | "INACTIVE"
  contextType?: string
  contextId?: string
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
  notificationSettings?: NotificationSettingsObject
  status?: string
  referenceId?: string
  contextType?: string
  contextId?: string
}[]
}

export type CycleConfiguration = {
  startDate: string
  endDate?: string
  autoResetOnPeriodEnd: boolean
  carryOverBalance: boolean
}

export type CycleConfigurationResponse = {
  startDate?: string
  endDate?: string
  autoResetOnPeriodEnd?: boolean
  carryOverBalance?: boolean
  nextRenewal?: string
}
