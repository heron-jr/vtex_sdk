export type ValidRequest = {
  value: number
  installments: {
  payment: {
  id: number
  name: string | null
  bin: string | null
  value: number
  isDefault: boolean
  self: {
  href: string
}
}
  options: Option[]
}[]
}

export type Installment = {
  payment: {
  id: number
  name: string | null
  bin: string | null
  value: number
  isDefault: boolean
  self: {
  href: string
}
}
  options: Option[]
}

export type Payment = {
  id: number
  name: string | null
  bin: string | null
  value: number
  isDefault: boolean
  self: Self
}

export type Self = {
  href: string
}

export type Option = {
  ruleId: string | null
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number | null
  interestTax: number | null
}

export type InvalidRequestValue = {
  error: {
  code: string
  message: string
  exception: string | null
}
}

export type InsertAffiliationRequest = {
  implementation: string
  name: string
  configuration: {
  name: string
  value: string
}[]
  isdelivered: boolean
  isConfigured: boolean
}

export type UpdateAffiliationRequest = {
  id: string
  implementation: string
  name: string
  configuration: {
  name: string
  value: string
  valueKey: string | null
}[]
  isdelivered: boolean
  isConfigured: boolean
}

export type AffiliationResponse = {
  id: string
  implementation: string
  name: string
  configuration: {
  name: string
  value: string
  valueKey: string | null
}[]
  isdelivered: boolean
  isConfigured: boolean
}

export type GetRulesResponse = {
  id?: string
  name?: string
  salesChannels?: SalesChannel
  paymentSystem?: PaymentSystem
  connector?: Connector
  issuer?: Issuer
  antifraud?: Antifraud
  installmentOptions?: {
  dueDateType: 0 | 1
  interestRateMethod: null | 0 | 1 | 2
  minimumInstallmentValue: number
  installments: {
  ruleId: string | null
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number | null
  interestTax: number | null
}[]
} | null
  isSelfAuthorized?: boolean | null
  requiresAuthentication?: boolean | null
  enabled?: boolean
  installmentsService?: boolean
  isDefault?: boolean | null
  beginDate?: string | null
  endDate?: string | null
  condition?: {
  id: string
  pullRate: number
  name: string | null
} | null
  multiMerchantList?: string[] | null
  country?: {
  name: string | null
  isoCode: string
} | null
  dateIntervals?: {
  start: string
  end: string
}[] | null
  externalInterest?: boolean
  minimumValue?: number | null
  deadlines?: {
  paymentOptions: {
  days: number
  interestRate: number
}[]
}[]
  cobrand?: {
  name: string | null
}
  cardLevel?: {
  name: string | null
}
  excludedBinsRanges?: number | null
}[]

export type RulesRequest = {
  id: string
  name: string
  salesChannels: SalesChannel
  paymentSystem: PaymentSystem
  connector: Connector
  issuer: Issuer
  antifraud: Antifraud
  installmentOptions: {
  dueDateType: 0 | 1
  interestRateMethod: null | 0 | 1 | 2
  minimumInstallmentValue: number
  installments: {
  ruleId: string | null
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number | null
  interestTax: number | null
}[]
} | null
  isSelfAuthorized: boolean | null
  requiresAuthentication: boolean | null
  enabled: boolean
  installmentsService: boolean
  isDefault: boolean | null
  beginDate: string | null
  endDate: string | null
  condition: {
  id: string
  pullRate: number
  name: string | null
} | null
  multiMerchantList: string[] | null
  country: {
  name: string | null
  isoCode: string
} | null
  dateIntervals: {
  start: string
  end: string
}[] | null
  externalInterest?: boolean
  minimumValue?: number | null
  deadlines?: {
  paymentOptions: {
  days: number
  interestRate: number
}[]
}[]
  cobrand?: {
  name: string | null
}
  cardLevel?: {
  name: string | null
}
  excludedBinsRanges?: number | null
}

export type InsertRuleRequest = {
  name: string
  salesChannels: SalesChannel
  paymentSystem: PaymentSystem
  connector: Connector
  issuer: Issuer
  antifraud: Antifraud
  installmentOptions: {
  dueDateType: 0 | 1
  interestRateMethod: null | 0 | 1 | 2
  minimumInstallmentValue: number
  installments: {
  ruleId: string | null
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number | null
  interestTax: number | null
}[]
} | null
  isSelfAuthorized: boolean | null
  requiresAuthentication: boolean | null
  enabled: boolean
  installmentsService: boolean
  isDefault: boolean | null
  beginDate: string | null
  endDate: string | null
  condition: {
  id: string
  pullRate: number
  name: string | null
} | null
  multiMerchantList: string[] | null
  country: {
  name: string | null
  isoCode: string
} | null
  dateIntervals: {
  start: string
  end: string
}[] | null
  externalInterest?: boolean
  minimumValue?: number | null
  deadlines?: {
  paymentOptions: {
  days: number
  interestRate: number
}[]
}[]
  cobrand?: {
  name: string | null
}
  cardLevel?: {
  name: string | null
}
  excludedBinsRanges?: number | null
}

export type SalesChannel = {
  id: string
}[]

export type PaymentSystem = {
  id: number
  name: string
  implementation: string | null
}

export type Connector = {
  implementation: string
  affiliationId: string
} | null

export type Issuer = {
  name: string | null
}

export type Antifraud = {
  implementation: string | null
  affiliationId: string | null
} | null

export type PaymentSystemsResponse = {
  id: number
  name: string
  requiresDocument: boolean
  implementation: string
  connectorImplementation: string
  antifraudConnectorImplementation: string | null
  groupName: string
  redirect: boolean
  isCustom: boolean
  isSelfAuthorized: boolean
  requiresAuthentication: boolean
  allowInstallments: boolean
  allowBinExclusion: boolean
  allowMultiple: boolean
  allowIssuer: boolean
  allowCountry: boolean
  allowCommercialPolicy: boolean
  allowCommercialCondition: boolean
  allowPeriod: boolean
  isAvailable: boolean
  description: string | null
  supportRecurrence: boolean
  validator: Validator
  appDependencies: string | null
  displayDocument: boolean
  dueDate: string
  allowNotification: boolean
  affiliationId: string | null
  availablePayments: string | null
  dueDateMinutes: number
}

export type Validator = {
  regex: string | null
  mask: string | null
  cardCodeMask: string | null
  cardCodeRegex: string | null
  weights: number[] | null
  useCvv: boolean
  useExpirationDate: boolean
  useCardHolderName: boolean
  useBillingAddress: boolean
  validCardLengths: string | null
}

export type _1CreateanewtransactionRequest = {
  value: number
  referenceId: string
  channel: string
  urn?: string | null
  salesChannel: string
}

export type StartTransactionResponse = {
  id: string
  transactionId: string
  referenceKey: string
  interactions: Interactions
  settlements: Settlements
  payments: Payments
  refunds: Refunds
  cancellations: Cancellations
  capabilities: Capabilities
  timeoutStatus: 0 | 1 | 2 | 3 | 4
  totalRefunds: number
  status: string
  value: number
  receiverUri: string | null
  startDate: string
  authorizationToken: string | null
  authorizationDate: string | null
  commitmentToken: string | null
  commitmentDate: string | null
  refundingToken: string | null
  refundingDate: string | null
  cancelationToken: string | null
  cancelationDate: string | null
  fields: Field[]
  ipAddress: string | null
  sessionId: string | null
  macId: string | null
  vtexFingerprint: string | null
  chargeback: string | null
  whiteSignature: string | null
  owner: string
  orderId: string | null
  userAgent: string | null
  acceptHeader: string | null
  antifraudTid: string | null
  antifraudResponse: string | null
  antifraudReference: string | null
  antifraudAffiliationId: string | null
  channel: string
  salesChannel: string
  urn: string | null
  softDescriptor: string | null
  markedForRecurrence: boolean
  buyer: {
  firstName?: string
  lastName?: string
  documentType?: string
  document?: string
  email?: string
  address?: string
  phone?: string
} | null
}

export type Interactions = {
  href: string
}

export type Settlements = {
  href: string
}

export type Payments = {
  href: string
}

export type Refunds = {
  href: string
}

export type Cancellations = {
  href: string
}

export type Capabilities = {
  href: string
}

export type Field = {
  name: string
  value: string
}

export type Fields = {
  holderName: string | null
  cardNumber: string | null
  validationCode: string | null
  dueDate: string | null
  document: string | null
  accountId: string | null
  address: {
  addressType?: string
  receiverName?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string | null
  street?: string
  number?: number
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}
  callbackUrl: string
}

export type Transaction = {
  id: string
  merchantName: string
}

export type Fields1 = {
  name: string
  value: string
}

export type _2SendPaymentsPublicRequest = {
  paymentSystem: number
  installments: number
  currencyCode: string
  value: number
  installmentsInterestRate: number
  installmentsValue: number
  referenceValue: number
  fields: Fields
  transaction: Transaction
}

export type _2SendPaymentsWithSavedCreditCardRequest = {
  paymentSystem: number
  installments: number
  currencyCode: string
  value: number
  installmentsInterestRate: number
  installmentsValue: number
  referenceValue: number
  fields: Fields3
  transaction: Transaction
}

export type Fields3 = {
  holderName: string
  cardNumber: string
  validationCode: string
  dueDate: string
  document: string
  accountId: string | null
  address: string[] | null
  callbackUrl: string | null
}

export type _4DoauthorizationRequest = {
  transactionId: string
  softDescriptor: string | null
  prepareForRecurrency: boolean
}

export type TransactionDetailsResponse = {
  id: string
  transactionId: string
  referenceKey: string
  interactions: Interactions
  settlements: Settlements
  payments: Payments
  refunds: Refunds
  cancellations: Cancellations
  capabilities: Capabilities
  timeoutStatus: 0 | 1 | 2 | 3 | 4
  totalRefunds: number
  status: string
  value: number
  receiverUri: string | null
  startDate: string
  authorizationToken: string | null
  authorizationDate: string | null
  commitmentToken: string | null
  commitmentDate: string | null
  refundingToken: string | null
  refundingDate: string | null
  cancelationToken: string | null
  cancelationDate: string | null
  fields: Fields1[]
  shopperInteraction: string
  ipAddress: string | null
  sessionId: string | null
  macId: string
  vtexFingerprint: string | null
  chargeback: string | null
  whiteSignature: string | null
  owner: string
  orderId: string | null
  userAgent: string
  acceptHeader: string
  antifraudTid: string | null
  antifraudResponse: string | null
  antifraudReference: string | null
  antifraudAffiliationId: string | null
  channel: string
  salesChannel: string
  urn: string | null
  softDescriptor: string | null
  markedForRecurrence: boolean
  buyer: {
  firstName?: string
  lastName?: string
  documentType?: string
  document?: string
  email?: string
  address?: string
  phone?: string
} | null
}

export type TransactionInteractionsResponse = {
  Id?: string
  PaymentId?: string | null
  TransactionId?: string
  Source?: string
  Status?: string
  Date?: string
  Message?: string
  Ticks?: number
}[]

export type PaymentDetailsResponse = {
  id: string
  paymentSystem: number
  paymentSystemName: string
  merchantName: string | null
  group: string
  userProfileId: string | null
  isCustom: boolean
  allowInstallments: boolean
  requiresAuthentication: boolean
  allowIssuer: boolean
  allowNotification: boolean
  isAvailable: boolean
  description: string | null
  authorizationDate: string | null
  self: Self
  tid: string | null
  nsu?: string | null
  returnCode: string | null
  returnMessage: string | null
  status: string
  connector: string | null
  ConnectorResponses: {
  Tid?: string
  ReturnCode?: string | null
  Message?: string | null
  authId?: string | null
  nsu?: string
}
  connectorResponse: {
  Tid?: string
  ReturnCode?: string | null
  Message?: string | null
  authId?: string | null
  nsu?: string
}
  ShowConnectorResponses: boolean
  value: number
  installmentsInterestRate: number
  installmentsValue: number
  referenceValue: number
  installments: number
  currencyCode: string | null
  provider: string | null
  isBillingAddressDifferent: boolean | null
  isRegexValid: boolean | null
  isLuhnValid: boolean | null
  fields: Fields1[]
  sheets: string | null
  originalPaymentId: string | null
}

export type TransactionSettlementDetails = {
  requests: Request[]
  actions: {
  paymentId: string
  payment: {
  href: string
}
  date: string
  type: string
  value: number
  connectorResponse: string | null
}[]
}

export type Request = {
  id: string
  date: string
  value: number
}

export type Action = {
  paymentId: string
  payment: Payment1
  date: string
  type: string
  value: number
  connectorResponse: string | null
}

export type Payment1 = {
  href: string
}

export type SettlethetransactionRequest = {
  value: number
}

export type SettleResponse = {
  id: string | null
  token: string
  status: number
  statusDetail: string
  processingDate: string
  refundedValue: number
  refundedToken: string | null
  message: string | null
  code: string | null
  connectorRefundedValue: number
  cancelledValue: number
}

export type RefundthetransactionRequest = {
  value: number
  freight?: number
  tax?: number
  minicart?: Record<string, unknown>
}

export type CancelthetransactionRequest = {
  value: number
}

export type NotifyPaymentRequest = {
  paymentDate: string
  valuePaid: number
}
