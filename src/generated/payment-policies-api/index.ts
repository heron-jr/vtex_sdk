import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { PolicyRuleInput, PolicyRule, JsonLogicExpression, PaymentPolicySearchRequest, PaymentPolicySearchItem, PaymentPolicySearchResponse, PaymentSystemDefinition, Validator, ProblemDetails } from './types.js'

class PaymentPoliciesApi_paymentPolicyRules {
  constructor(private http: VtexHttpClient) {}

  async listPolicyRules(params: Record<string, never> = {}, opts?: CallOptions): Promise<PolicyRule[]> {
    return this.http.request<PolicyRule[]>(withCall({ method: 'GET', path: `/api/payment-configuration-service/policy-rules`, server: 'https://{accountName}.pcs.vtexcommercestable.com.br' }, opts))
  }

  async createPolicyRule(params: {
  body: PolicyRuleInput
}, opts?: CallOptions): Promise<PolicyRule> {
    return this.http.request<PolicyRule>(withCall({ method: 'POST', path: `/api/payment-configuration-service/policy-rules`, body: params.body, server: 'https://{accountName}.pcs.vtexcommercestable.com.br' }, opts))
  }

  async getPolicyRuleById(params: {
  id: string
}, opts?: CallOptions): Promise<PolicyRule> {
    return this.http.request<PolicyRule>(withCall({ method: 'GET', path: `/api/payment-configuration-service/policy-rules/${encodePathParam(params.id)}`, server: 'https://{accountName}.pcs.vtexcommercestable.com.br' }, opts))
  }

  async updatePolicyRule(params: {
  id: string
  body: PolicyRuleInput
}, opts?: CallOptions): Promise<PolicyRule> {
    return this.http.request<PolicyRule>(withCall({ method: 'PUT', path: `/api/payment-configuration-service/policy-rules/${encodePathParam(params.id)}`, body: params.body, server: 'https://{accountName}.pcs.vtexcommercestable.com.br' }, opts))
  }

  async deletePolicyRule(params: {
  id: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/payment-configuration-service/policy-rules/${encodePathParam(params.id)}`, server: 'https://{accountName}.pcs.vtexcommercestable.com.br' }, opts))
  }
}
class PaymentPoliciesApi_paymentPolicyEvaluation {
  constructor(private http: VtexHttpClient) {}

  async evaluatePaymentPolicies(params: {
  body: PaymentPolicySearchRequest
}, opts?: CallOptions): Promise<PaymentPolicySearchResponse> {
    return this.http.request<PaymentPolicySearchResponse>(withCall({ method: 'POST', path: `/api/pvt/payment-systems/search`, body: params.body, server: 'https://{accountName}.vtexpayments.com.br' }, opts))
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
