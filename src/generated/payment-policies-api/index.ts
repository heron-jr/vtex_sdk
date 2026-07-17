import type { VtexHttpClient } from '../../core/http.js'
import type { PolicyRuleInput, PolicyRule, JsonLogicExpression, PaymentPolicySearchRequest, PaymentPolicySearchItem, PaymentPolicySearchResponse, PaymentSystemDefinition, Validator, ProblemDetails } from './types.js'

class PaymentPoliciesApi_paymentPolicyRules {
  constructor(private http: VtexHttpClient) {}

  listPolicyRules(params: Record<string, never>): Promise<PolicyRule[]> {
    return this.http.request<PolicyRule[]>({ method: 'GET', path: `/api/payment-configuration-service/policy-rules` })
  }

  createPolicyRule(params: {
  body: PolicyRuleInput
}): Promise<PolicyRule> {
    return this.http.request<PolicyRule>({ method: 'POST', path: `/api/payment-configuration-service/policy-rules`, body: params.body })
  }

  getPolicyRuleById(params: {
  id: string
}): Promise<PolicyRule> {
    return this.http.request<PolicyRule>({ method: 'GET', path: `/api/payment-configuration-service/policy-rules/${params.id}` })
  }

  updatePolicyRule(params: {
  id: string
  body: PolicyRuleInput
}): Promise<PolicyRule> {
    return this.http.request<PolicyRule>({ method: 'PUT', path: `/api/payment-configuration-service/policy-rules/${params.id}`, body: params.body })
  }

  deletePolicyRule(params: {
  id: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/payment-configuration-service/policy-rules/${params.id}` })
  }
}
class PaymentPoliciesApi_paymentPolicyEvaluation {
  constructor(private http: VtexHttpClient) {}

  evaluatePaymentPolicies(params: {
  body: PaymentPolicySearchRequest
}): Promise<PaymentPolicySearchResponse> {
    return this.http.request<PaymentPolicySearchResponse>({ method: 'POST', path: `/api/pvt/payment-systems/search`, body: params.body })
  }
}

export class PaymentPoliciesApi {
  readonly paymentPolicyRules: PaymentPoliciesApi_paymentPolicyRules
  readonly paymentPolicyEvaluation: PaymentPoliciesApi_paymentPolicyEvaluation
  constructor(http: VtexHttpClient) {
    this.paymentPolicyRules = new PaymentPoliciesApi_paymentPolicyRules(http)
    this.paymentPolicyEvaluation = new PaymentPoliciesApi_paymentPolicyEvaluation(http)
  }
}
