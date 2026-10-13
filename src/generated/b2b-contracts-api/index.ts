import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { UpdateContractRequest, CreateContractResponse, ContractResponse } from './types.js'

class B2bContractsApi_contracts {
  constructor(private http: VtexHttpClient) {}

  async createContract(params: {
  body: UpdateContractRequest
}, opts?: CallOptions): Promise<CreateContractResponse> {
    return this.http.request<CreateContractResponse>(withCall({ method: 'POST', path: `/api/dataentities/CL/documents`, body: params.body }, opts))
  }

  async getApiDataentitiesCLDocumentsByContractId(params: {
  contractId: string
  _fields?: string
}, opts?: CallOptions): Promise<ContractResponse> {
    return this.http.request<ContractResponse>(withCall({ method: 'GET', path: `/api/dataentities/CL/documents/${encodePathParam(params.contractId)}`, query: { '_fields': params._fields } }, opts))
  }

  async patchApiDataentitiesCLDocumentsByContractId(params: {
  contractId: string
  body: UpdateContractRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/dataentities/CL/documents/${encodePathParam(params.contractId)}`, body: params.body }, opts))
  }

  async deleteApiDataentitiesCLDocumentsByContractId(params: {
  contractId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/dataentities/CL/documents/${encodePathParam(params.contractId)}` }, opts))
  }
}

export class B2bContractsApi {
  readonly contracts: B2bContractsApi_contracts
  constructor(http: VtexHttpClient) {
    this.contracts = new B2bContractsApi_contracts(http)
  }
}
