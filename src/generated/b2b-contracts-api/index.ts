import type { VtexHttpClient } from '../../core/http.js'
import type { UpdateContractRequest, CreateContractResponse, ContractResponse } from './types.js'

class B2bContractsApi_contracts {
  constructor(private http: VtexHttpClient) {}

  createContract(params: {
  body: UpdateContractRequest
}): Promise<CreateContractResponse> {
    return this.http.request<CreateContractResponse>({ method: 'POST', path: `/api/dataentities/CL/documents`, body: params.body })
  }

  getApiDataentitiesCLDocumentsByContractId(params: {
  contractId: string
  _fields?: string
}): Promise<ContractResponse> {
    return this.http.request<ContractResponse>({ method: 'GET', path: `/api/dataentities/CL/documents/${params.contractId}`, query: { '_fields': params._fields } })
  }

  patchApiDataentitiesCLDocumentsByContractId(params: {
  contractId: string
  body: UpdateContractRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/dataentities/CL/documents/${params.contractId}`, body: params.body })
  }

  deleteApiDataentitiesCLDocumentsByContractId(params: {
  contractId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/dataentities/CL/documents/${params.contractId}` })
  }
}

export class B2bContractsApi {
  readonly contracts: B2bContractsApi_contracts
  constructor(http: VtexHttpClient) {
    this.contracts = new B2bContractsApi_contracts(http)
  }
}
