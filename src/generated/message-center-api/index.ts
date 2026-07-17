import type { VtexHttpClient } from '../../core/http.js'

class MessageCenterApi_dkimConfiguration {
  constructor(private http: VtexHttpClient) {}

  createDKIM(params: {
  EmailProvider: string
}): Promise<{
  status?: "emailNotFound" | "emailNotVerified" | "created"
  dkimKeys?: string[]
}> {
    return this.http.request<{
  status?: "emailNotFound" | "emailNotVerified" | "created"
  dkimKeys?: string[]
}>({ method: 'POST', path: `/api/mail-service/pvt/providers/${params.EmailProvider}/dkim` })
  }
}

export class MessageCenterApi {
  readonly dkimConfiguration: MessageCenterApi_dkimConfiguration
  constructor(http: VtexHttpClient) {
    this.dkimConfiguration = new MessageCenterApi_dkimConfiguration(http)
  }
}
