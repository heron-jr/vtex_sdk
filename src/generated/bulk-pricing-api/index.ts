import type { VtexHttpClient } from '../../core/http.js'

class BulkPricingApi_batchImports {
  constructor(private http: VtexHttpClient) {}

  postApiPriceImporterPvtImportByImportType(params: {
  importType: "base-prices" | "fixed-prices"
  an?: string
  output?: "none" | "email"
  body: {
  contentType: string
  contentLengthBytes: number
}
}): Promise<{
  batchId?: string
  status?: string
  upload?: {
  method?: string
  url?: string
  headers?: Record<string, unknown>
  expiresAt?: string
}
}> {
    return this.http.request<{
  batchId?: string
  status?: string
  upload?: {
  method?: string
  url?: string
  headers?: Record<string, unknown>
  expiresAt?: string
}
}>({ method: 'POST', path: `/api/price-importer/pvt/import/${params.importType}`, query: { 'an': params.an, 'output': params.output }, body: params.body })
  }
}
class BulkPricingApi_batchStatus {
  constructor(private http: VtexHttpClient) {}

  getApiPriceImporterPvtBatchesByBatchId(params: {
  batchId: string
}): Promise<{
  batchId?: string
  type?: "base" | "fixed"
  status?: "AWAITING_UPLOAD" | "RECEIVED" | "VALIDATING" | "PROCESSING" | "DOCUMENTING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED"
  stages?: {
  status?: string
  timestamp?: string
}[]
  outputs?: string[]
  bytesProcessed?: number
  bytesTotal?: number
  errorCount?: number
  createdAt?: string
  startedAt?: string
}> {
    return this.http.request<{
  batchId?: string
  type?: "base" | "fixed"
  status?: "AWAITING_UPLOAD" | "RECEIVED" | "VALIDATING" | "PROCESSING" | "DOCUMENTING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED"
  stages?: {
  status?: string
  timestamp?: string
}[]
  outputs?: string[]
  bytesProcessed?: number
  bytesTotal?: number
  errorCount?: number
  createdAt?: string
  startedAt?: string
}>({ method: 'GET', path: `/api/price-importer/pvt/batches/${params.batchId}` })
  }

  getApiPriceImporterPvtBatchesByBatchIdErrors(params: {
  batchId: string
}): Promise<{
  url?: string
}> {
    return this.http.request<{
  url?: string
}>({ method: 'GET', path: `/api/price-importer/pvt/batches/${params.batchId}/errors` })
  }
}

export class BulkPricingApi {
  readonly batchImports: BulkPricingApi_batchImports
  readonly batchStatus: BulkPricingApi_batchStatus
  constructor(http: VtexHttpClient) {
    this.batchImports = new BulkPricingApi_batchImports(http)
    this.batchStatus = new BulkPricingApi_batchStatus(http)
  }
}
