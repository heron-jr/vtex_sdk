import type { VtexHttpClient } from '../../core/http.js'

class MtlsApi_certificateManagement {
  constructor(private http: VtexHttpClient) {}

  postApiEdgePrivateCertificatesSign(params: Record<string, never>): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/edge/private-certificates/sign` })
  }

  deleteApiEdgePrivateCertificatesBySerialNumber(params: {
  serialNumber: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/edge/private-certificates/${params.serialNumber}` })
  }
}

export class MtlsApi {
  readonly certificateManagement: MtlsApi_certificateManagement
  constructor(http: VtexHttpClient) {
    this.certificateManagement = new MtlsApi_certificateManagement(http)
  }
}
