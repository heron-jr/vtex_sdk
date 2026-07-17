import type { VtexHttpClient } from '../../core/http.js'

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
}): Promise<{
  data: {
  id: string
  friendlyId: string
  status: "Opened" | "Paid" | "Cancelled"
  value: number
  accountId: string
  creditValue: number
  createdAt: string
  resolvedAt?: string
  updatedAt: string
  paymentLink?: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  observation?: string
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
  resolvedAt?: string
  updatedAt: string
  paymentLink?: string
  originalDueDate: string
  dueDate: string
  installment: number
  orderId: string
  observation?: string
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
}>({ method: 'GET', path: `/api/creditcontrol/invoices`, query: { 'from': params.from, 'to': params.to, 'createdDateFrom': params.createdDateFrom, 'createdDateTo': params.createdDateTo, 'dueDateFrom': params.dueDateFrom, 'dueDateTo': params.dueDateTo, 'value': params.value, 'status': params.status, 'friendlyId': params.friendlyId, 'observation': params.observation, 'creditAccountId': params.creditAccountId } })
  }

  retrieveInvoicebyId(params: {
  creditAccountId: string
  invoiceId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}` })
  }

  changeInvoice(params: {
  creditAccountId: string
  invoiceId: string
  friendlyId?: string
  body: {
  status: "Opened" | "Paid" | "Cancelled"
  observation?: string
  paymentLink?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}`, query: { 'friendlyId': params.friendlyId }, body: params.body })
  }

  cancelInvoice(params: {
  creditAccountId: string
  invoiceId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}` })
  }

  searchallinvoicesofaAccount(params: {
  creditAccountId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/creditcontrol/accounts/${params.creditAccountId}/invoices` })
  }

  markaninvoiceasPaid(params: {
  creditAccountId: string
  invoiceId: string
}): Promise<{
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
}>({ method: 'POST', path: `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}/payments` })
  }

  postponeaninvoice(params: {
  creditAccountId: string
  invoiceId: string
  body: {
  dueDays: number
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}/postponement`, body: params.body })
  }
}
class CustomerCreditApi_account {
  constructor(private http: VtexHttpClient) {}

  searchallaccounts(params: {
  from?: string
  to?: string
  status?: "Opened" | "Paid" | "Cancelled"
  email?: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/creditcontrol/accounts`, query: { 'from': params.from, 'to': params.to, 'status': params.status, 'email': params.email } })
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
}): Promise<{
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
}>({ method: 'POST', path: `/api/creditcontrol/accounts`, body: params.body })
  }

  retrieveaAccountbyId(params: {
  creditAccountId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/creditcontrol/accounts/${params.creditAccountId}` })
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
}): Promise<{
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
}>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}`, body: params.body })
  }

  closeanAccount(params: {
  creditAccountId: string
  body: {
  document?: string
  documentType?: "CPF" | "CNPJ" | "Other"
  email?: string
}
}): Promise<{
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
}>({ method: 'DELETE', path: `/api/creditcontrol/accounts/${params.creditAccountId}`, body: params.body })
  }

  accountstatements(params: {
  creditAccountId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/creditcontrol/accounts/${params.creditAccountId}/statements` })
  }

  changecreditlimitofanAccount(params: {
  creditAccountId: string
  body: {
  value: number
}
}): Promise<{
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
}>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}/creditlimit`, body: params.body })
  }

  decreasebalanceofanaccount(params: {
  creditAccountId: string
  statementId: string
  body: {
  value: string
}
}): Promise<{
  value: string
}> {
    return this.http.request<{
  value: string
}>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}/statements/${params.statementId}`, body: params.body })
  }

  createorUpdateSettlement(params: {
  creditAccountId: string
  transactionId: string
  body: {
  value: number
}
}): Promise<{
  value: number
  id: string
}> {
    return this.http.request<{
  value: number
  id: string
}>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}/settlement`, body: params.body })
  }

  createaPreAuthorization(params: {
  creditAccountId: string
  body: {
  value: number
  settle: boolean
  installments: number
  expirationDate?: string
}
}): Promise<{
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
}>({ method: 'POST', path: `/api/creditcontrol/accounts/${params.creditAccountId}/transactions`, body: params.body })
  }

  createaPreAuthorizationUsingid(params: {
  creditAccountId: string
  transactionId: string
  body: {
  value: number
  settle: boolean
  installments: number
}
}): Promise<{
  id: string
  value: number
  installments: number
}> {
    return this.http.request<{
  id: string
  value: number
  installments: number
}>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}`, body: params.body })
  }

  cancelaPreAuthorization(params: {
  creditAccountId: string
  transactionId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}` })
  }

  addanaccountHolder(params: {
  creditAccountId: string
  body: {
  claims: {
  email: string
}
}
}): Promise<{
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
}>({ method: 'POST', path: `/api/creditcontrol/accounts/${params.creditAccountId}/holders`, body: params.body })
  }

  deleteanaccountholder(params: {
  creditAccountId: string
  holderId: string
}): Promise<{
  id: string
}> {
    return this.http.request<{
  id: string
}>({ method: 'DELETE', path: `/api/creditcontrol/accounts/${params.creditAccountId}/holders/${params.holderId}` })
  }

  changetoleranceofanaccount(params: {
  creditAccountId: string
  body: {
  value: number
}
}): Promise<{
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
}>({ method: 'PUT', path: `/api/creditcontrol/accounts/${params.creditAccountId}/tolerance`, body: params.body })
  }

  partialorTotalRefundaSettlement(params: {
  creditAccountId: string
  transactionId: string
  body: {
  value: number
}
}): Promise<{
  value: number
}> {
    return this.http.request<{
  value: number
}>({ method: 'POST', path: `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}/refunds`, body: params.body })
  }
}
class CustomerCreditApi_storeConfiguration {
  constructor(private http: VtexHttpClient) {}

  retrievestoreconfiguration(params: Record<string, never>): Promise<{
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
}>({ method: 'GET', path: `/api/creditcontrol/storeconfig` })
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
}): Promise<{
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
}>({ method: 'PUT', path: `/api/creditcontrol/storeconfig`, body: params.body })
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
