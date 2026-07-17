import type { VtexHttpClient } from '../../core/http.js'
import type { ResponseError } from './types.js'

class AudienceApi_audienceManager {
  constructor(private http: VtexHttpClient) {}

  postApiAudienceManagerPvtAudience(params: {
  an?: string
  body: {
  email: string
}
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'POST', path: `/api/audience-manager/pvt/audience`, query: { 'an': params.an }, body: params.body })
  }
}
class AudienceApi_priceTableMapper {
  constructor(private http: VtexHttpClient) {}

  getApiPriceTableMapperPvtMappingByAudienceId(params: {
  audienceId: string
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'GET', path: `/api/price-table-mapper/pvt/mapping/${params.audienceId}` })
  }

  putApiPriceTableMapperPvtMappingByAudienceId(params: {
  audienceId: string
  body: string[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/price-table-mapper/pvt/mapping/${params.audienceId}`, body: params.body })
  }

  deleteApiPriceTableMapperPvtMappingByAudienceId(params: {
  audienceId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/price-table-mapper/pvt/mapping/${params.audienceId}` })
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
