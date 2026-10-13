import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class BulkPricingApi_batchImports {
  constructor(private http: VtexHttpClient) {}

  async postApiPriceImporterPvtImportByImportType(params: {
  importType: "base-prices" | "fixed-prices"
  an?: string
  output?: "none" | "email"
  body: {
  contentType: string
  contentLengthBytes: number
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/price-importer/pvt/import/${encodePathParam(params.importType)}`, query: { 'an': params.an, 'output': params.output }, body: params.body }, opts))
  }
}
class BulkPricingApi_batchStatus {
  constructor(private http: VtexHttpClient) {}

  async getApiPriceImporterPvtBatchesByBatchId(params: {
  batchId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/price-importer/pvt/batches/${encodePathParam(params.batchId)}` }, opts))
  }

  async getApiPriceImporterPvtBatchesByBatchIdErrors(params: {
  batchId: string
}, opts?: CallOptions): Promise<{
  url?: string
}> {
    return this.http.request<{
  url?: string
}>(withCall({ method: 'GET', path: `/api/price-importer/pvt/batches/${encodePathParam(params.batchId)}/errors` }, opts))
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
