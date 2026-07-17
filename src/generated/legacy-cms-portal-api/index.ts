import type { VtexHttpClient } from '../../core/http.js'

class LegacyCmsPortalApi_changeURISchema {
  constructor(private http: VtexHttpClient) {}

  changeentireaccountAllwebsites(params: {
  protocol: string
}): Promise<string> {
    return this.http.request<string>({ method: 'PUT', path: `/api/catalog_system/pvt/virtualfolder/changeurischema/${params.protocol}` })
  }

  changespecificwebsite(params: {
  websiteId: string
  protocol: string
}): Promise<string> {
    return this.http.request<string>({ method: 'PUT', path: `/api/catalog_system/pvt/virtualfolder/site/${params.websiteId}/changeurischema/${params.protocol}` })
  }
}

export class LegacyCmsPortalApi {
  readonly changeURISchema: LegacyCmsPortalApi_changeURISchema
  constructor(http: VtexHttpClient) {
    this.changeURISchema = new LegacyCmsPortalApi_changeURISchema(http)
  }
}
