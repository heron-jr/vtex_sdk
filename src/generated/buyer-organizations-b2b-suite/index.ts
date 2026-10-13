import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { FileData, ImportResult, ValidationResult } from './types.js'

class BuyerOrganizationsB2bSuiteApi_bulkImport {
  constructor(private http: VtexHttpClient) {}

  async uploadFile(params: {
  an?: string
  body: FormData
}, opts?: CallOptions): Promise<FileData> {
    return this.http.request<FileData>(withCall({ method: 'POST', path: `/api/b2b/import/buyer-orgs`, query: { 'an': params.an }, body: params.body, contentType: 'multipart/form-data' }, opts))
  }

  async checkProgress(params: {
  importId: string
  an?: string
}, opts?: CallOptions): Promise<FileData | ImportResult | ValidationResult> {
    return this.http.request<FileData | ImportResult | ValidationResult>(withCall({ method: 'GET', path: `/api/b2b/import/buyer-orgs/${encodePathParam(params.importId)}`, query: { 'an': params.an } }, opts))
  }

  async postApiB2bImportBuyerOrgsByImportId(params: {
  importId: string
  an?: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/b2b/import/buyer-orgs/${encodePathParam(params.importId)}`, query: { 'an': params.an } }, opts))
  }

  async validateFile(params: {
  importId: string
  an?: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/b2b/import/buyer-orgs/validate/${encodePathParam(params.importId)}`, query: { 'an': params.an } }, opts))
  }
}

export class BuyerOrganizationsB2bSuiteApi {
  readonly bulkImport: BuyerOrganizationsB2bSuiteApi_bulkImport
  constructor(http: VtexHttpClient) {
    this.bulkImport = new BuyerOrganizationsB2bSuiteApi_bulkImport(http)
  }
}
