import type { VtexHttpClient } from '../../core/http.js'
import type { PolicyActionGetResponse, EvaluatePolicyRequest, PolicySaveRequest, PolicyGetResponse, StatementGet, StatementGetResponse } from './types.js'

class PoliciesSystemApi_policy {
  constructor(private http: VtexHttpClient) {}

  policyList(params: Record<string, never>): Promise<PolicyGetResponse[]> {
    return this.http.request<PolicyGetResponse[]>({ method: 'GET', path: `/api/policy-engine/policies` })
  }

  policyEvaluate(params: {
  body: EvaluatePolicyRequest
}): Promise<PolicyActionGetResponse[]> {
    return this.http.request<PolicyActionGetResponse[]>({ method: 'POST', path: `/api/policy-engine/evaluate`, body: params.body })
  }

  policyGet(params: {
  id: string
}): Promise<PolicyGetResponse[]> {
    return this.http.request<PolicyGetResponse[]>({ method: 'GET', path: `/api/policy-engine/policies/${params.id}` })
  }

  policyCreateOrUpdate(params: {
  id: string
  body: PolicySaveRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/policy-engine/policies/${params.id}`, body: params.body })
  }

  policyUpdate(params: {
  id: string
  body: PolicySaveRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/policy-engine/policies/${params.id}`, body: params.body })
  }

  policyDelete(params: {
  id: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/policy-engine/policies/${params.id}` })
  }
}

export class PoliciesSystemApi {
  readonly policy: PoliciesSystemApi_policy
  constructor(http: VtexHttpClient) {
    this.policy = new PoliciesSystemApi_policy(http)
  }
}
