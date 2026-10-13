import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class MtlsApi_certificateManagement {
  constructor(private http: VtexHttpClient) {}

  postApiEdgePrivateCertificatesSign(params: {
  body: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/edge/private-certificates/sign`, body: params.body, contentType: 'text/plain' }, opts))
  }

  deleteApiEdgePrivateCertificatesBySerialNumber(params: {
  serialNumber: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/edge/private-certificates/${encodePathParam(params.serialNumber)}` }, opts))
  }
}

export class MtlsApi {
  readonly certificateManagement: MtlsApi_certificateManagement
  constructor(http: VtexHttpClient) {
    this.certificateManagement = new MtlsApi_certificateManagement(http)
  }
}
