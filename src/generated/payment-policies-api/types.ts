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

export type JsonLogicExpression = Record<string, unknown>

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
  paymentSystemAssignments: Record<string, unknown>
  paymentSystemDefinitions: PaymentSystemDefinition[]
}

export type PaymentSystemDefinition = {
  id: number
  name: string
  requiresDocument?: boolean
  implementation?: string
  connectorImplementation?: string
  antifraudConnectorImplementation?: string
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
  description?: string
  supportRecurrence?: boolean
  validator?: {
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
  appDependencies?: string
  displayDocument?: boolean
  dueDate?: string
  allowNotification?: boolean
  affiliationId?: string
  availablePayments?: string
  dueDateMinutes?: number
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

export type ProblemDetails = {
  type: string
  title: string
  status: number
  detail: string
  instance: string
}
