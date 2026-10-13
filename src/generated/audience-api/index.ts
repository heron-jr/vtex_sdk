import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { ResponseError } from './types.js'

class AudienceApi_audienceManager {
  constructor(private http: VtexHttpClient) {}

  async postApiAudienceManagerPvtAudience(params: {
  an?: string
  body: {
  email: string
}
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'POST', path: `/api/audience-manager/pvt/audience`, query: { 'an': params.an }, body: params.body }, opts))
  }
}
class AudienceApi_priceTableMapper {
  constructor(private http: VtexHttpClient) {}

  async getApiPriceTableMapperPvtMappingByAudienceId(params: {
  audienceId: string
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'GET', path: `/api/price-table-mapper/pvt/mapping/${encodePathParam(params.audienceId)}` }, opts))
  }

  async putApiPriceTableMapperPvtMappingByAudienceId(params: {
  audienceId: string
  body: string[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/price-table-mapper/pvt/mapping/${encodePathParam(params.audienceId)}`, body: params.body }, opts))
  }

  async deleteApiPriceTableMapperPvtMappingByAudienceId(params: {
  audienceId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/price-table-mapper/pvt/mapping/${encodePathParam(params.audienceId)}` }, opts))
  }
}

export class AudienceApi {
  readonly audienceManager: AudienceApi_audienceManager
  readonly priceTableMapper: AudienceApi_priceTableMapper
  constructor(http: VtexHttpClient) {
    this.audienceManager = new AudienceApi_audienceManager(http)
    this.priceTableMapper = new AudienceApi_priceTableMapper(http)
  }
}
