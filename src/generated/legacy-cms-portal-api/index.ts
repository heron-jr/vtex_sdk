import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class LegacyCmsPortalApi_changeURISchema {
  constructor(private http: VtexHttpClient) {}

  changeentireaccountAllwebsites(params: {
  protocol: string
}, opts?: CallOptions): Promise<string> {
    return this.http.request<string>(withCall({ method: 'PUT', path: `/api/catalog_system/pvt/virtualfolder/changeurischema/${encodePathParam(params.protocol)}`, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }

  changespecificwebsite(params: {
  websiteId: string
  protocol: string
}, opts?: CallOptions): Promise<string> {
    return this.http.request<string>(withCall({ method: 'PUT', path: `/api/catalog_system/pvt/virtualfolder/site/${encodePathParam(params.websiteId)}/changeurischema/${encodePathParam(params.protocol)}`, server: 'https://{accountName}.vtexcommercestable.com.br' }, opts))
  }
}

export class LegacyCmsPortalApi {
  readonly changeURISchema: LegacyCmsPortalApi_changeURISchema
  constructor(http: VtexHttpClient) {
    this.changeURISchema = new LegacyCmsPortalApi_changeURISchema(http)
  }
}
