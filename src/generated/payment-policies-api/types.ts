export type PolicyRuleInput = {
  name: string
  expression: JsonLogicExpression
  enabled: boolean
  priority: number
  action: "Include" | "Exclude"
  paymentSystems: number[]
}

export type PolicyRule = {
  id: string
  name: string
  expression: JsonLogicExpression
  enabled: boolean
  priority: number
  action: "Include" | "Exclude"
  paymentSystems: number[]
  createdAt: string
  updatedAt: string
}

export type JsonLogicExpression = {
  [key: string]: unknown
}

export type PaymentPolicySearchRequest = {
  salesChannel?: string
  paymentSystemIds?: number[]
  items: PaymentPolicySearchItem[]
}

export type PaymentPolicySearchItem = {
  id: string
  collectionIds?: number[]
  shippingData?: {
  state: string
}
}

export type PaymentPolicySearchResponse = {
  paymentSystemAssignments: {
  [key: string]: number[]
}
  paymentSystemDefinitions: PaymentSystemDefinition[]
}

export type PaymentSystemDefinition = {
  id: number
  name: string
  requiresDocument?: boolean
  implementation?: string
  connectorImplementation?: string
  antifraudConnectorImplementation?: string | null
  groupName: string
  redirect?: boolean
  isCustom?: boolean
  isSelfAuthorized?: boolean
  requiresAuthentication?: boolean
  allowInstallments?: boolean
  allowBinExclusion?: boolean
  allowMultiple?: boolean
  allowIssuer?: boolean
  allowCountry?: boolean
  allowCommercialPolicy?: boolean
  allowCommercialCondition?: boolean
  allowPeriod?: boolean
  isAvailable?: boolean
  description?: string | null
  supportRecurrence?: boolean
  validator?: {
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
  appDependencies?: string | null
  displayDocument?: boolean
  dueDate?: string
  allowNotification?: boolean
  affiliationId?: string | null
  availablePayments?: string | null
  dueDateMinutes?: number
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

export type ProblemDetails = {
  type: string
  title: string
  status: number
  detail: string
  instance: string
}
