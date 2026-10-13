import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class MessageCenterApi_dkimConfiguration {
  constructor(private http: VtexHttpClient) {}

  async createDKIM(params: {
  EmailProvider: string
}, opts?: CallOptions): Promise<{
  status?: "emailNotFound" | "emailNotVerified" | "created"
  dkimKeys?: string[] | null
}> {
    return this.http.request<{
  status?: "emailNotFound" | "emailNotVerified" | "created"
  dkimKeys?: string[] | null
}>(withCall({ method: 'POST', path: `/api/mail-service/pvt/providers/${encodePathParam(params.EmailProvider)}/dkim` }, opts))
  }
}

export class MessageCenterApi {
  readonly dkimConfiguration: MessageCenterApi_dkimConfiguration
  constructor(http: VtexHttpClient) {
    this.dkimConfiguration = new MessageCenterApi_dkimConfiguration(http)
  }
}
