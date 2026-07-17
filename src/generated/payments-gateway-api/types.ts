export type ValidRequest = {
  value: number
  installments: {
  payment: {
  id: number
  name: string
  bin: string
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
  name: string
  bin: string
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
  name: string
  bin: string
  value: number
  isDefault: boolean
  self: Self
}

export type Self = {
  href: string
}

export type Option = {
  ruleId: string
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number
  interestTax: number
}

export type InvalidRequestValue = {
  error: {
  code: string
  message: string
  exception: string
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
  valueKey: string
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
  valueKey: string
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
  ruleId: string
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number
  interestTax: number
}[]
}
  isSelfAuthorized?: boolean
  requiresAuthentication?: boolean
  enabled?: boolean
  installmentsService?: boolean
  isDefault?: boolean
  beginDate?: string
  endDate?: string
  condition?: {
  id: string
  pullRate: number
  name: string
}
  multiMerchantList?: string[]
  country?: {
  name: string
  isoCode: string
}
  dateIntervals?: {
  start: string
  end: string
}[]
  externalInterest?: boolean
  minimumValue?: number
  deadlines?: {
  paymentOptions: {
  days: number
  interestRate: number
}[]
}[]
  cobrand?: {
  name: string
}
  cardLevel?: {
  name: string
}
  excludedBinsRanges?: number
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
  ruleId: string
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number
  interestTax: number
}[]
}
  isSelfAuthorized: boolean
  requiresAuthentication: boolean
  enabled: boolean
  installmentsService: boolean
  isDefault: boolean
  beginDate: string
  endDate: string
  condition: {
  id: string
  pullRate: number
  name: string
}
  multiMerchantList: string[]
  country: {
  name: string
  isoCode: string
}
  dateIntervals: {
  start: string
  end: string
}[]
  externalInterest?: boolean
  minimumValue?: number
  deadlines?: {
  paymentOptions: {
  days: number
  interestRate: number
}[]
}[]
  cobrand?: {
  name: string
}
  cardLevel?: {
  name: string
}
  excludedBinsRanges?: number
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
  ruleId: string
  quantity: number
  value: number
  interestRate: number
  isExternalInstallmentService: number
  interestTax: number
}[]
}
  isSelfAuthorized: boolean
  requiresAuthentication: boolean
  enabled: boolean
  installmentsService: boolean
  isDefault: boolean
  beginDate: string
  endDate: string
  condition: {
  id: string
  pullRate: number
  name: string
}
  multiMerchantList: string[]
  country: {
  name: string
  isoCode: string
}
  dateIntervals: {
  start: string
  end: string
}[]
  externalInterest?: boolean
  minimumValue?: number
  deadlines?: {
  paymentOptions: {
  days: number
  interestRate: number
}[]
}[]
  cobrand?: {
  name: string
}
  cardLevel?: {
  name: string
}
  excludedBinsRanges?: number
}

export type SalesChannel = {
  id: string
}[]

export type PaymentSystem = {
  id: number
  name: string
  implementation: string
}

export type Connector = {
  implementation: string
  affiliationId: string
}

export type Issuer = {
  name: string
}

export type Antifraud = {
  implementation: string
  affiliationId: string
}

export type PaymentSystemsResponse = {
  id: number
  name: string
  requiresDocument: boolean
  implementation: string
  connectorImplementation: string
  antifraudConnectorImplementation: string
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
  description: string
  supportRecurrence: boolean
  validator: Validator
  appDependencies: string
  displayDocument: boolean
  dueDate: string
  allowNotification: boolean
  affiliationId: string
  availablePayments: string
  dueDateMinutes: number
}

export type Validator = {
  regex: string
  mask: string
  cardCodeMask: string
  cardCodeRegex: string
  weights: number[]
  useCvv: boolean
  useExpirationDate: boolean
  useCardHolderName: boolean
  useBillingAddress: boolean
  validCardLengths: string
}

export type _1CreateanewtransactionRequest = {
  value: number
  referenceId: string
  channel: string
  urn?: string
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
  receiverUri: string
  startDate: string
  authorizationToken: string
  authorizationDate: string
  commitmentToken: string
  commitmentDate: string
  refundingToken: string
  refundingDate: string
  cancelationToken: string
  cancelationDate: string
  fields: Field[]
  ipAddress: string
  sessionId: string
  macId: string
  vtexFingerprint: string
  chargeback: string
  whiteSignature: string
  owner: string
  orderId: string
  userAgent: string
  acceptHeader: string
  antifraudTid: string
  antifraudResponse: string
  antifraudReference: string
  antifraudAffiliationId: string
  channel: string
  salesChannel: string
  urn: string
  softDescriptor: string
  markedForRecurrence: boolean
  buyer: {
  firstName?: string
  lastName?: string
  documentType?: string
  document?: string
  email?: string
  address?: string
  phone?: string
}
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
  holderName: string
  cardNumber: string
  validationCode: string
  dueDate: string
  document: string
  accountId: string
  address: {
  addressType?: string
  receiverName?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: number
  neighborhood?: string
  complement?: string
  reference?: string
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
  accountId: string
  address: string[]
  callbackUrl: string
}

export type _4DoauthorizationRequest = {
  transactionId: string
  softDescriptor: string
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
  receiverUri: string
  startDate: string
  authorizationToken: string
  authorizationDate: string
  commitmentToken: string
  commitmentDate: string
  refundingToken: string
  refundingDate: string
  cancelationToken: string
  cancelationDate: string
  fields: Fields1[]
  shopperInteraction: string
  ipAddress: string
  sessionId: string
  macId: string
  vtexFingerprint: string
  chargeback: string
  whiteSignature: string
  owner: string
  orderId: string
  userAgent: string
  acceptHeader: string
  antifraudTid: string
  antifraudResponse: string
  antifraudReference: string
  antifraudAffiliationId: string
  channel: string
  salesChannel: string
  urn: string
  softDescriptor: string
  markedForRecurrence: boolean
  buyer: {
  firstName?: string
  lastName?: string
  documentType?: string
  document?: string
  email?: string
  address?: string
  phone?: string
}
}

export type TransactionInteractionsResponse = {
  Id?: string
  PaymentId?: string
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
  merchantName: string
  group: string
  userProfileId: string
  isCustom: boolean
  allowInstallments: boolean
  requiresAuthentication: boolean
  allowIssuer: boolean
  allowNotification: boolean
  isAvailable: boolean
  description: string
  authorizationDate: string
  self: Self
  tid: string
  nsu?: string
  returnCode: string
  returnMessage: string
  status: string
  connector: string
  ConnectorResponses: {
  Tid?: string
  ReturnCode?: string
  Message?: string
  authId?: string
  nsu?: string
}
  connectorResponse: {
  Tid?: string
  ReturnCode?: string
  Message?: string
  authId?: string
  nsu?: string
}
  ShowConnectorResponses: boolean
  value: number
  installmentsInterestRate: number
  installmentsValue: number
  referenceValue: number
  installments: number
  currencyCode: string
  provider: string
  isBillingAddressDifferent: boolean
  isRegexValid: boolean
  isLuhnValid: boolean
  fields: Fields1[]
  sheets: string
  originalPaymentId: string
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
  connectorResponse: string
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
  connectorResponse: string
}

export type Payment1 = {
  href: string
}

export type SettlethetransactionRequest = {
  value: number
}

export type SettleResponse = {
  id: string
  token: string
  status: number
  statusDetail: string
  processingDate: string
  refundedValue: number
  refundedToken: string
  message: string
  code: string
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
