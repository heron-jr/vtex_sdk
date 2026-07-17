import type { VtexHttpClient } from '../../core/http.js'
import type { CreateUpdateDimensionRequestBody, CreateUpdateRuleRequestBody, ErrorResponse, Authorizer, DimensionResponse, RuleResponse } from './types.js'

class BuyingPoliciesApi_dimensions {
  constructor(private http: VtexHttpClient) {}

  getByAccountNameAuthorizationDimensions(params: {
  accountName: string
  id?: string[]
  unitId?: string[]
  name?: string[]
}): Promise<{
  id?: string
  name?: string
  unitId?: string
  status?: null | "accepted" | "denied" | "pending" | "ignored"
  priority?: number
  requireAllRulesAcceptance?: boolean
  shouldSimulate?: boolean
  ruleCollection?: {
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
  timeout?: number
  notification?: boolean
  scoreInterval?: {
  accept?: number
  deny?: number
}
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: Authorizer[]
}
}[]
  creationDate?: string
  creationVersion?: string
  creationEnvironment?: string
}[]> {
    return this.http.request<{
  id?: string
  name?: string
  unitId?: string
  status?: null | "accepted" | "denied" | "pending" | "ignored"
  priority?: number
  requireAllRulesAcceptance?: boolean
  shouldSimulate?: boolean
  ruleCollection?: {
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
  timeout?: number
  notification?: boolean
  scoreInterval?: {
  accept?: number
  deny?: number
}
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: Authorizer[]
}
}[]
  creationDate?: string
  creationVersion?: string
  creationEnvironment?: string
}[]>({ method: 'GET', path: `/${params.accountName}/authorization-dimensions`, query: { 'id': params.id, 'unitId': params.unitId, 'name': params.name } })
  }

  postByAccountNameAuthorizationDimensions(params: {
  accountName: string
  body: CreateUpdateDimensionRequestBody
}): Promise<DimensionResponse> {
    return this.http.request<DimensionResponse>({ method: 'POST', path: `/${params.accountName}/authorization-dimensions`, body: params.body })
  }

  putByAccountNameAuthorizationDimensionsByDimensionId(params: {
  accountName: string
  dimensionId: string
  body: CreateUpdateDimensionRequestBody
}): Promise<DimensionResponse> {
    return this.http.request<DimensionResponse>({ method: 'PUT', path: `/${params.accountName}/authorization-dimensions/${params.dimensionId}`, body: params.body })
  }

  deleteByAccountNameAuthorizationDimensionsByDimensionId(params: {
  accountName: string
  dimensionId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/${params.accountName}/authorization-dimensions/${params.dimensionId}` })
  }
}
class BuyingPoliciesApi_rules {
  constructor(private http: VtexHttpClient) {}

  postByAccountNameAuthorizationDimensionsByDimensionIdRules(params: {
  accountName: string
  dimensionId: string
  body: CreateUpdateRuleRequestBody
}): Promise<RuleResponse> {
    return this.http.request<RuleResponse>({ method: 'POST', path: `/${params.accountName}/authorization-dimensions/${params.dimensionId}/rules`, body: params.body })
  }

  putByAccountNameAuthorizationDimensionsByDimensionIdRules(params: {
  accountName: string
  dimensionId: string
  body: CreateUpdateRuleRequestBody[]
}): Promise<RuleResponse[]> {
    return this.http.request<RuleResponse[]>({ method: 'PUT', path: `/${params.accountName}/authorization-dimensions/${params.dimensionId}/rules`, body: params.body })
  }

  putByAccountNameAuthorizationDimensionsByDimensionIdRulesByRuleId(params: {
  accountName: string
  dimensionId: string
  ruleId: string
  body: CreateUpdateRuleRequestBody
}): Promise<RuleResponse> {
    return this.http.request<RuleResponse>({ method: 'PUT', path: `/${params.accountName}/authorization-dimensions/${params.dimensionId}/rules/${params.ruleId}`, body: params.body })
  }

  deleteByAccountNameAuthorizationDimensionsByDimensionIdRulesByRuleId(params: {
  accountName: string
  dimensionId: string
  ruleId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/${params.accountName}/authorization-dimensions/${params.dimensionId}/rules/${params.ruleId}` })
  }
}
class BuyingPoliciesApi_manualAuthorization {
  constructor(private http: VtexHttpClient) {}

  postCommercialAuthorizationsByOrderAuthIdCallback(params: {
  orderAuthId: string
  body: {
  params: {
  score: number
  dimensionId: string
  ruleId: string
}
}
}): Promise<{
  id?: string
  orderId?: string
  workflowInstanceId?: string
  status?: null | "accepted" | "denied" | "pending"
  units?: string[]
  callbackEndpoint?: string
  totalOrderValueDesiredBySeller?: number
  marketPlacePaymentValue?: number
  itemCollection?: {
  id?: string
  sku?: string
  price?: number
  totalSystemDiscount?: number
  totalManualDiscount?: number
  quantity?: number
  additionalInfo?: {
  commercialCondition?: string
}
}[]
  additionalInfo?: {
  userProfileId?: string
}
  dimensionStatus?: {
  id?: string
  name?: string
  unitId?: string
  userProfileId?: string
  status?: null | "accepted" | "denied" | "pending"
  score?: number
  priority?: number
  shouldSimulate?: boolean
  ruleCollection?: {
  id?: string
  name?: string
  status?: null | "accepted" | "denied" | "pending"
  doId?: string
  score?: number
  priority?: number
  trigger?: {
  condition?: {
  conditionType?: 0 | 1 | 2
  description?: string
  expression?: string
}
  effect?: {
  description?: string
  effectType?: number
}
}
  timeout?: number
  notification?: boolean
  scoreInterval?: {
  accept?: number
  deny?: number
}
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: {
  id?: string
  type?: string
  authorizationDate?: string
}[]
}
  isUserAuthorized?: boolean
  isUserNextAuthorizer?: boolean
}[]
  creationDate?: string
  creationVersion?: string
  creationEnvironment?: string
  requireAllRulesAcceptance?: boolean
}[]
  creationVersion?: string
  creationEnvironment?: string
  userProfileId?: string
}> {
    return this.http.request<{
  id?: string
  orderId?: string
  workflowInstanceId?: string
  status?: null | "accepted" | "denied" | "pending"
  units?: string[]
  callbackEndpoint?: string
  totalOrderValueDesiredBySeller?: number
  marketPlacePaymentValue?: number
  itemCollection?: {
  id?: string
  sku?: string
  price?: number
  totalSystemDiscount?: number
  totalManualDiscount?: number
  quantity?: number
  additionalInfo?: {
  commercialCondition?: string
}
}[]
  additionalInfo?: {
  userProfileId?: string
}
  dimensionStatus?: {
  id?: string
  name?: string
  unitId?: string
  userProfileId?: string
  status?: null | "accepted" | "denied" | "pending"
  score?: number
  priority?: number
  shouldSimulate?: boolean
  ruleCollection?: {
  id?: string
  name?: string
  status?: null | "accepted" | "denied" | "pending"
  doId?: string
  score?: number
  priority?: number
  trigger?: {
  condition?: {
  conditionType?: 0 | 1 | 2
  description?: string
  expression?: string
}
  effect?: {
  description?: string
  effectType?: number
}
}
  timeout?: number
  notification?: boolean
  scoreInterval?: {
  accept?: number
  deny?: number
}
  authorizationData?: {
  requireAllApprovals?: boolean
  authorizers?: {
  id?: string
  type?: string
  authorizationDate?: string
}[]
}
  isUserAuthorized?: boolean
  isUserNextAuthorizer?: boolean
}[]
  creationDate?: string
  creationVersion?: string
  creationEnvironment?: string
  requireAllRulesAcceptance?: boolean
}[]
  creationVersion?: string
  creationEnvironment?: string
  userProfileId?: string
}>({ method: 'POST', path: `/commercial-authorizations/${params.orderAuthId}/callback`, body: params.body })
  }
}

export class BuyingPoliciesApi {
  readonly dimensions: BuyingPoliciesApi_dimensions
  readonly rules: BuyingPoliciesApi_rules
  readonly manualAuthorization: BuyingPoliciesApi_manualAuthorization
  constructor(http: VtexHttpClient) {
    this.dimensions = new BuyingPoliciesApi_dimensions(http)
    this.rules = new BuyingPoliciesApi_rules(http)
    this.manualAuthorization = new BuyingPoliciesApi_manualAuthorization(http)
  }
}
