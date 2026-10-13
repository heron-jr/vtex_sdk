import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { CreateUpdateDimensionRequestBody, CreateUpdateRuleRequestBody, ErrorResponse, Authorizer, DimensionResponse, RuleResponse } from './types.js'

class BuyingPoliciesApi_dimensions {
  constructor(private http: VtexHttpClient) {}

  getByAccountNameAuthorizationDimensions(params: {
  accountName: string
  id?: string[]
  unitId?: string[]
  name?: string[]
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/${encodePathParam(params.accountName)}/authorization-dimensions`, query: { 'id': params.id, 'unitId': params.unitId, 'name': params.name } }, opts))
  }

  postByAccountNameAuthorizationDimensions(params: {
  accountName: string
  body: CreateUpdateDimensionRequestBody
}, opts?: CallOptions): Promise<DimensionResponse> {
    return this.http.request<DimensionResponse>(withCall({ method: 'POST', path: `/${encodePathParam(params.accountName)}/authorization-dimensions`, body: params.body }, opts))
  }

  putByAccountNameAuthorizationDimensionsByDimensionId(params: {
  accountName: string
  dimensionId: string
  body: CreateUpdateDimensionRequestBody
}, opts?: CallOptions): Promise<DimensionResponse> {
    return this.http.request<DimensionResponse>(withCall({ method: 'PUT', path: `/${encodePathParam(params.accountName)}/authorization-dimensions/${encodePathParam(params.dimensionId)}`, body: params.body }, opts))
  }

  deleteByAccountNameAuthorizationDimensionsByDimensionId(params: {
  accountName: string
  dimensionId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/${encodePathParam(params.accountName)}/authorization-dimensions/${encodePathParam(params.dimensionId)}` }, opts))
  }
}
class BuyingPoliciesApi_rules {
  constructor(private http: VtexHttpClient) {}

  postByAccountNameAuthorizationDimensionsByDimensionIdRules(params: {
  accountName: string
  dimensionId: string
  body: CreateUpdateRuleRequestBody
}, opts?: CallOptions): Promise<RuleResponse> {
    return this.http.request<RuleResponse>(withCall({ method: 'POST', path: `/${encodePathParam(params.accountName)}/authorization-dimensions/${encodePathParam(params.dimensionId)}/rules`, body: params.body }, opts))
  }

  putByAccountNameAuthorizationDimensionsByDimensionIdRules(params: {
  accountName: string
  dimensionId: string
  body: CreateUpdateRuleRequestBody[]
}, opts?: CallOptions): Promise<RuleResponse[]> {
    return this.http.request<RuleResponse[]>(withCall({ method: 'PUT', path: `/${encodePathParam(params.accountName)}/authorization-dimensions/${encodePathParam(params.dimensionId)}/rules`, body: params.body }, opts))
  }

  putByAccountNameAuthorizationDimensionsByDimensionIdRulesByRuleId(params: {
  accountName: string
  dimensionId: string
  ruleId: string
  body: CreateUpdateRuleRequestBody
}, opts?: CallOptions): Promise<RuleResponse> {
    return this.http.request<RuleResponse>(withCall({ method: 'PUT', path: `/${encodePathParam(params.accountName)}/authorization-dimensions/${encodePathParam(params.dimensionId)}/rules/${encodePathParam(params.ruleId)}`, body: params.body }, opts))
  }

  deleteByAccountNameAuthorizationDimensionsByDimensionIdRulesByRuleId(params: {
  accountName: string
  dimensionId: string
  ruleId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/${encodePathParam(params.accountName)}/authorization-dimensions/${encodePathParam(params.dimensionId)}/rules/${encodePathParam(params.ruleId)}` }, opts))
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
}, opts?: CallOptions): Promise<{
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
  doId?: string | null
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
  doId?: string | null
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
}>(withCall({ method: 'POST', path: `/commercial-authorizations/${encodePathParam(params.orderAuthId)}/callback`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
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
