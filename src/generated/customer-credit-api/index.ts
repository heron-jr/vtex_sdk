import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class CustomerCreditApi_invoices {
  constructor(private http: VtexHttpClient) {}

  searchallinvoices(params: {
  from?: string
  to?: string
  createdDateFrom?: string
  createdDateTo?: string
  dueDateFrom?: string
  dueDateTo?: string
  value?: number
  status?: "Opened" | "Paid" | "Cancelled"
  friendlyId?: string
  observation?: string
  creditAccountId: string
}, opts?: CallOptions): Promise<{
  data: {
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  resolvedAt?: string | null
  updatedAt: string
  paymentLink?: string | null
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  observation?: string | null
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}[]
  summary: {
  total: number
  count: number
  totalPaid?: number
  totalCancelled?: number
}
}> {
    return this.http.request<{
  data: {
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  resolvedAt?: string | null
  updatedAt: string
  paymentLink?: string | null
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  observation?: string | null
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}[]
  summary: {
  total: number
  count: number
  totalPaid?: number
  totalCancelled?: number
}
}>(withCall({ method: 'GET', path: `/api/creditcontrol/invoices`, query: { 'from': params.from, 'to': params.to, 'createdDateFrom': params.createdDateFrom, 'createdDateTo': params.createdDateTo, 'dueDateFrom': params.dueDateFrom, 'dueDateTo': params.dueDateTo, 'value': params.value, 'status': params.status, 'friendlyId': params.friendlyId, 'observation': params.observation, 'creditAccountId': params.creditAccountId } }, opts))
  }

  retrieveInvoicebyId(params: {
  creditAccountId: string
  invoiceId: string
}, opts?: CallOptions): Promise<{
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  updatedAt: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}> {
    return this.http.request<{
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  updatedAt: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}>(withCall({ method: 'GET', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/invoices/${encodePathParam(params.invoiceId)}` }, opts))
  }

  changeInvoice(params: {
  creditAccountId: string
  invoiceId: string
  friendlyId?: string
  body: {
  status: "Opened" | "Paid" | "Cancelled"
  observation?: string | null
  paymentLink?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/invoices/${encodePathParam(params.invoiceId)}`, query: { 'friendlyId': params.friendlyId }, body: params.body }, opts))
  }

  cancelInvoice(params: {
  creditAccountId: string
  invoiceId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/invoices/${encodePathParam(params.invoiceId)}` }, opts))
  }

  searchallinvoicesofaAccount(params: {
  creditAccountId: string
}, opts?: CallOptions): Promise<{
  data: {
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  updatedAt: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}[]
  summary: {
  total: number
  count: number
  totalPaid?: number
  totalCancelled?: number
}
}> {
    return this.http.request<{
  data: {
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  updatedAt: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}[]
  summary: {
  total: number
  count: number
  totalPaid?: number
  totalCancelled?: number
}
}>(withCall({ method: 'GET', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/invoices` }, opts))
  }

  markaninvoiceasPaid(params: {
  creditAccountId: string
  invoiceId: string
}, opts?: CallOptions): Promise<{
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  updatedAt: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}> {
    return this.http.request<{
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  updatedAt: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  transactionId: string
  numberOfInstallments: number
  creditAccountId: string
}>(withCall({ method: 'POST', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/invoices/${encodePathParam(params.invoiceId)}/payments` }, opts))
  }

  postponeaninvoice(params: {
  creditAccountId: string
  invoiceId: string
  body: {
  dueDays: number
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/invoices/${encodePathParam(params.invoiceId)}/postponement`, body: params.body }, opts))
  }
}
class CustomerCreditApi_account {
  constructor(private http: VtexHttpClient) {}

  searchallaccounts(params: {
  from?: string
  to?: string
  status?: "Opened" | "Paid" | "Cancelled"
  email?: string
} = {}, opts?: CallOptions): Promise<{
  data: {
  id: string
  balance: number
  document: string
  status: "Open" | "Closed"
  documentType: "CPF" | "CNPJ" | "Other"
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}[]
  summary: {
  count: number
}
}> {
    return this.http.request<{
  data: {
  id: string
  balance: number
  document: string
  status: "Open" | "Closed"
  documentType: "CPF" | "CNPJ" | "Other"
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}[]
  summary: {
  count: number
}
}>(withCall({ method: 'GET', path: `/api/creditcontrol/accounts`, query: { 'from': params.from, 'to': params.to, 'status': params.status, 'email': params.email } }, opts))
  }

  openanAccount(params: {
  body: {
  document: string
  documentType: "CPF" | "CNPJ" | "Other"
  email: string
  creditLimit: string
  description: string
  tolerance: string
}
}, opts?: CallOptions): Promise<{
  id: string
  balance: number
  document: string
  status: string
  documentType: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}> {
    return this.http.request<{
  id: string
  balance: number
  document: string
  status: string
  documentType: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}>(withCall({ method: 'POST', path: `/api/creditcontrol/accounts`, body: params.body }, opts))
  }

  retrieveaAccountbyId(params: {
  creditAccountId: string
}, opts?: CallOptions): Promise<{
  id: string
  balance: number
  document: string
  status: string
  documentType: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}> {
    return this.http.request<{
  id: string
  balance: number
  document: string
  status: string
  documentType: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}>(withCall({ method: 'GET', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}` }, opts))
  }

  updateemailanddescriptionofaaccount(params: {
  creditAccountId: string
  body: {
  email: string
  document: string
  documentType: "CPF" | "CNPJ" | "Other"
  creditLimit?: number
  tolerance?: number
}
}, opts?: CallOptions): Promise<{
  id: string
  balance: number
  document?: string
  status: string
  documentType?: "CPF" | "CNPJ" | "Other"
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}> {
    return this.http.request<{
  id: string
  balance: number
  document?: string
  status: string
  documentType?: "CPF" | "CNPJ" | "Other"
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}`, body: params.body }, opts))
  }

  closeanAccount(params: {
  creditAccountId: string
  body: {
  document?: string
  documentType?: "CPF" | "CNPJ" | "Other"
  email?: string
}
}, opts?: CallOptions): Promise<{
  id: string
  balance: number
  document: string
  status: string
  documentType: "CPF" | "CNPJ" | "Other"
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}> {
    return this.http.request<{
  id: string
  balance: number
  document: string
  status: string
  documentType: "CPF" | "CNPJ" | "Other"
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}>(withCall({ method: 'DELETE', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}`, body: params.body }, opts))
  }

  accountstatements(params: {
  creditAccountId: string
}, opts?: CallOptions): Promise<{
  statements: {
  value: number
  date: string
  doneby?: string
  origin: "Credit" | "Invoice" | "Payment" | "Statement"
  metadata?: {
  transactionId?: string
  numberOfInstallments?: number
}
}[]
  currentBalance: number
  intervalBalance: number
  previousBalance: number
}> {
    return this.http.request<{
  statements: {
  value: number
  date: string
  doneby?: string
  origin: "Credit" | "Invoice" | "Payment" | "Statement"
  metadata?: {
  transactionId?: string
  numberOfInstallments?: number
}
}[]
  currentBalance: number
  intervalBalance: number
  previousBalance: number
}>(withCall({ method: 'GET', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/statements` }, opts))
  }

  changecreditlimitofanAccount(params: {
  creditAccountId: string
  body: {
  value: number
}
}, opts?: CallOptions): Promise<{
  id: string
  balance: number
  status: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}> {
    return this.http.request<{
  id: string
  balance: number
  status: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/creditlimit`, body: params.body }, opts))
  }

  decreasebalanceofanaccount(params: {
  creditAccountId: string
  statementId: string
  body: {
  value: string
}
}, opts?: CallOptions): Promise<{
  value: string
}> {
    return this.http.request<{
  value: string
}>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/statements/${encodePathParam(params.statementId)}`, body: params.body }, opts))
  }

  createorUpdateSettlement(params: {
  creditAccountId: string
  transactionId: string
  body: {
  value: number
}
}, opts?: CallOptions): Promise<{
  value: number
  id: string
}> {
    return this.http.request<{
  value: number
  id: string
}>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/transactions/${encodePathParam(params.transactionId)}/settlement`, body: params.body }, opts))
  }

  createaPreAuthorization(params: {
  creditAccountId: string
  body: {
  value: number
  settle: boolean
  installments: number
  expirationDate?: string
}
}, opts?: CallOptions): Promise<{
  id: string
  value: number
  expirationDate?: string
  installments: number
}> {
    return this.http.request<{
  id: string
  value: number
  expirationDate?: string
  installments: number
}>(withCall({ method: 'POST', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/transactions`, body: params.body }, opts))
  }

  createaPreAuthorizationUsingid(params: {
  creditAccountId: string
  transactionId: string
  body: {
  value: number
  settle: boolean
  installments: number
}
}, opts?: CallOptions): Promise<{
  id: string
  value: number
  installments: number
}> {
    return this.http.request<{
  id: string
  value: number
  installments: number
}>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/transactions/${encodePathParam(params.transactionId)}`, body: params.body }, opts))
  }

  cancelaPreAuthorization(params: {
  creditAccountId: string
  transactionId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/transactions/${encodePathParam(params.transactionId)}` }, opts))
  }

  addanaccountHolder(params: {
  creditAccountId: string
  body: {
  claims: {
  email: string
}
}
}, opts?: CallOptions): Promise<{
  level: number
  claims: {
  email: string
}
  id: string
  createdAt: string
}> {
    return this.http.request<{
  level: number
  claims: {
  email: string
}
  id: string
  createdAt: string
}>(withCall({ method: 'POST', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/holders`, body: params.body }, opts))
  }

  deleteanaccountholder(params: {
  creditAccountId: string
  holderId: string
}, opts?: CallOptions): Promise<{
  id: string
}> {
    return this.http.request<{
  id: string
}>(withCall({ method: 'DELETE', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/holders/${encodePathParam(params.holderId)}` }, opts))
  }

  changetoleranceofanaccount(params: {
  creditAccountId: string
  body: {
  value: number
}
}, opts?: CallOptions): Promise<{
  id: string
  balance: number
  status: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}> {
    return this.http.request<{
  id: string
  balance: number
  status: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description?: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}>(withCall({ method: 'PUT', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/tolerance`, body: params.body }, opts))
  }

  partialorTotalRefundaSettlement(params: {
  creditAccountId: string
  transactionId: string
  body: {
  value: number
}
}, opts?: CallOptions): Promise<{
  value: number
}> {
    return this.http.request<{
  value: number
}>(withCall({ method: 'POST', path: `/api/creditcontrol/accounts/${encodePathParam(params.creditAccountId)}/transactions/${encodePathParam(params.transactionId)}/refunds`, body: params.body }, opts))
  }
}
class CustomerCreditApi_storeConfiguration {
  constructor(private http: VtexHttpClient) {}

  retrievestoreconfiguration(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  dailyInterestRate: number
  invoicePostponementLimit: number
  taxRate: number
  maxPostponementDays: number
  defaultCreditValue: number
  postponementEnabled: boolean
  automaticCheckingAccountCreationEnabled: boolean
  toleranceEnabled: boolean
  myCreditsEnabled: boolean
  maxPreAuthorizationGrowthRate: number
  notificationsSettings?: {
  daysPrior?: {
  days: number
  timeOfDay: string
}[]
  daysAfter?: {
  days: number
  timeOfDay: string
}[]
}
}> {
    return this.http.request<{
  dailyInterestRate: number
  invoicePostponementLimit: number
  taxRate: number
  maxPostponementDays: number
  defaultCreditValue: number
  postponementEnabled: boolean
  automaticCheckingAccountCreationEnabled: boolean
  toleranceEnabled: boolean
  myCreditsEnabled: boolean
  maxPreAuthorizationGrowthRate: number
  notificationsSettings?: {
  daysPrior?: {
  days: number
  timeOfDay: string
}[]
  daysAfter?: {
  days: number
  timeOfDay: string
}[]
}
}>(withCall({ method: 'GET', path: `/api/creditcontrol/storeconfig` }, opts))
  }

  createorchangestoreconfiguration(params: {
  body: {
  dailyInterestRate: number
  invoicePostponementLimit: number
  taxRate: number
  maxPostponementDays: number
  defaultCreditValue: number
  maxPreAuthorizationGrowthRate: number
  myCreditsEnabled: boolean
  toleranceEnabled: boolean
  automaticCheckingAccountCreationEnabled: boolean
  postponementEnabled: boolean
  notificationsSettings?: {
  daysPrior?: {
  days: number
  timeOfDay: string
}[]
  daysAfter?: {
  days: number
  timeOfDay: string
}[]
}
}
}, opts?: CallOptions): Promise<{
  dailyInterestRate: number
  invoicePostponementLimit: number
  taxRate: number
  maxPostponementDays: number
  defaultCreditValue: number
  postponementEnabled: boolean
  automaticCheckingAccountCreationEnabled: boolean
  toleranceEnabled: boolean
  myCreditsEnabled: boolean
  maxPreAuthorizationGrowthRate: number
  notificationsSettings?: {
  daysPrior?: {
  days: number
  timeOfDay: string
}[]
  daysAfter?: {
  days: number
  timeOfDay: string
}[]
}
}> {
    return this.http.request<{
  dailyInterestRate: number
  invoicePostponementLimit: number
  taxRate: number
  maxPostponementDays: number
  defaultCreditValue: number
  postponementEnabled: boolean
  automaticCheckingAccountCreationEnabled: boolean
  toleranceEnabled: boolean
  myCreditsEnabled: boolean
  maxPreAuthorizationGrowthRate: number
  notificationsSettings?: {
  daysPrior?: {
  days: number
  timeOfDay: string
}[]
  daysAfter?: {
  days: number
  timeOfDay: string
}[]
}
}>(withCall({ method: 'PUT', path: `/api/creditcontrol/storeconfig`, body: params.body }, opts))
  }
}

export class CustomerCreditApi {
  readonly invoices: CustomerCreditApi_invoices
  readonly account: CustomerCreditApi_account
  readonly storeConfiguration: CustomerCreditApi_storeConfiguration
  constructor(http: VtexHttpClient) {
    this.invoices = new CustomerCreditApi_invoices(http)
    this.account = new CustomerCreditApi_account(http)
    this.storeConfiguration = new CustomerCreditApi_storeConfiguration(http)
  }
}
