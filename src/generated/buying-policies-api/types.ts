export type CreateUpdateDimensionRequestBody = {
  name: string
  requireAllRulesAcceptance: boolean
  unitId?: string
  priority: number
  ruleCollection: {
  name: string
  priority: number
  trigger: {
  condition: {
  conditionType: 0 | 1 | 2
  description: string
  expression: string
}
  effect: {
  description: string
  effectType: 0 | 1 | 2
}
}
  scoreInterval: {
  accept: number
  deny: number
}
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: Authorizer[]
}
}[]
}

export type CreateUpdateRuleRequestBody = {
  name: string
  priority: number
  trigger: {
  condition: {
  conditionType: 0 | 1 | 2
  description: string
  expression?: string
}
  effect: {
  description: string
  effectType: 0 | 1 | 2
}
}
  scoreInterval: {
  accept: number
  deny: number
}
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: Authorizer[]
}
}

export type ErrorResponse = {
  message?: string
}

export type Authorizer = {
  type: string
  id: string
}

export type DimensionResponse = {
  id?: string
  name?: string
  unitId?: string
  status?: null | "accepted" | "denied" | "pending" | "ignored"
  priority?: number
  requireAllRulesAcceptance?: boolean
  ruleCollection?: RuleResponse[]
  creationDate?: string
  creationVersion?: string
  creationEnvironment?: string
}

export type RuleResponse = {
  id?: string
  name?: string
  status?: null | "accepted" | "denied" | "pending"
  priority?: number
  trigger?: {
  condition?: {
  conditionType?: 0 | 1 | 2
  description?: string
  expression?: string
}
  effect?: {
  description?: string
  effectType?: 0 | 1 | 2
}
}
  scoreInterval?: {
  accept?: number
  deny?: number
}
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: Authorizer[]
}
}
