import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { PolicyActionGetResponse, EvaluatePolicyRequest, PolicySaveRequest, PolicyGetResponse, StatementGet, StatementGetResponse } from './types.js'

class PoliciesSystemApi_policy {
  constructor(private http: VtexHttpClient) {}

  policyList(params: Record<string, never> = {}, opts?: CallOptions): Promise<PolicyGetResponse[]> {
    return this.http.request<PolicyGetResponse[]>(withCall({ method: 'GET', path: `/api/policy-engine/policies` }, opts))
  }

  policyEvaluate(params: {
  body: EvaluatePolicyRequest
}, opts?: CallOptions): Promise<PolicyActionGetResponse[]> {
    return this.http.request<PolicyActionGetResponse[]>(withCall({ method: 'POST', path: `/api/policy-engine/evaluate`, body: params.body }, opts))
  }

  policyGet(params: {
  id: string
}, opts?: CallOptions): Promise<PolicyGetResponse[]> {
    return this.http.request<PolicyGetResponse[]>(withCall({ method: 'GET', path: `/api/policy-engine/policies/${encodePathParam(params.id)}` }, opts))
  }

  policyCreateOrUpdate(params: {
  id: string
  body: PolicySaveRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/policy-engine/policies/${encodePathParam(params.id)}`, body: params.body }, opts))
  }

  policyUpdate(params: {
  id: string
  body: PolicySaveRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/policy-engine/policies/${encodePathParam(params.id)}`, body: params.body }, opts))
  }

  policyDelete(params: {
  id: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/policy-engine/policies/${encodePathParam(params.id)}` }, opts))
  }
}

export class PoliciesSystemApi {
  readonly policy: PoliciesSystemApi_policy
  constructor(http: VtexHttpClient) {
    this.policy = new PoliciesSystemApi_policy(http)
  }
}
