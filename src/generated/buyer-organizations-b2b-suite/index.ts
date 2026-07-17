import type { VtexHttpClient } from '../../core/http.js'
import type { FileData, ImportResult, ValidationResult } from './types.js'

class BuyerOrganizationsB2bSuiteApi_bulkImport {
  constructor(private http: VtexHttpClient) {}

  uploadFile(params: {
  an?: string
}): Promise<FileData> {
    return this.http.request<FileData>({ method: 'POST', path: `/api/b2b/import/buyer-orgs`, query: { 'an': params.an } })
  }

  checkProgress(params: {
  importId: string
  an?: string
}): Promise<FileData | ImportResult | ValidationResult> {
    return this.http.request<FileData | ImportResult | ValidationResult>({ method: 'GET', path: `/api/b2b/import/buyer-orgs/${params.importId}`, query: { 'an': params.an } })
  }

  postApiB2bImportBuyerOrgsByImportId(params: {
  importId: string
  an?: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/b2b/import/buyer-orgs/${params.importId}`, query: { 'an': params.an } })
  }

  validateFile(params: {
  importId: string
  an?: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/b2b/import/buyer-orgs/validate/${params.importId}`, query: { 'an': params.an } })
  }
}

export class BuyerOrganizationsB2bSuiteApi {
  readonly bulkImport: BuyerOrganizationsB2bSuiteApi_bulkImport
  constructor(http: VtexHttpClient) {
    this.bulkImport = new BuyerOrganizationsB2bSuiteApi_bulkImport(http)
  }
}
