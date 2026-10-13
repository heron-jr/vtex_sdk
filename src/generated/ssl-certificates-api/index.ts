import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class SslCertificatesApi_sslCertificates {
  constructor(private http: VtexHttpClient) {}

  async getApiEdgeCertificates(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string | null
  issuerDistinguishedName?: string
  issuerCommonName?: string
  issuerOrganization?: string
  installDate?: string
  startDate?: string
  expiryDate?: string
  signatureAlgorithm?: string
  x509Version?: string
  installedBy?: string
  createdAt?: string
  updatedAt?: string
  status?: "Active" | "Overwritten" | "Installing" | "Unknown" | "Expires soon" | "Installation failed" | "Expired"
}[]> {
    return this.http.request<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string | null
  issuerDistinguishedName?: string
  issuerCommonName?: string
  issuerOrganization?: string
  installDate?: string
  startDate?: string
  expiryDate?: string
  signatureAlgorithm?: string
  x509Version?: string
  installedBy?: string
  createdAt?: string
  updatedAt?: string
  status?: "Active" | "Overwritten" | "Installing" | "Unknown" | "Expires soon" | "Installation failed" | "Expired"
}[]>(withCall({ method: 'GET', path: `/api/edge/certificates` }, opts))
  }

  async putApiEdgeCertificates(params: {
  body: {
  hosts: string[]
  certificate: string
  privateKey: string
}
}, opts?: CallOptions): Promise<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string | null
  issuerDistinguishedName?: string
  issuerCommonName?: string
  issuerOrganization?: string
  installDate?: string
  startDate?: string
  expiryDate?: string
  signatureAlgorithm?: string
  x509Version?: string
  installedBy?: string
  createdAt?: string
  updatedAt?: string
  status?: "Active" | "Overwritten" | "Installing" | "Unknown" | "Expires soon" | "Installation failed" | "Expired"
}[]> {
    return this.http.request<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string | null
  issuerDistinguishedName?: string
  issuerCommonName?: string
  issuerOrganization?: string
  installDate?: string
  startDate?: string
  expiryDate?: string
  signatureAlgorithm?: string
  x509Version?: string
  installedBy?: string
  createdAt?: string
  updatedAt?: string
  status?: "Active" | "Overwritten" | "Installing" | "Unknown" | "Expires soon" | "Installation failed" | "Expired"
}[]>(withCall({ method: 'PUT', path: `/api/edge/certificates`, body: params.body }, opts))
  }

  async getApiEdgeCertificatesByCertificateId(params: {
  certificateId: string
}, opts?: CallOptions): Promise<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string | null
  issuerDistinguishedName?: string
  issuerCommonName?: string
  issuerOrganization?: string
  installDate?: string
  startDate?: string
  expiryDate?: string
  signatureAlgorithm?: string
  x509Version?: string
  installedBy?: string
  createdAt?: string
  updatedAt?: string
  status?: "Active" | "Overwritten" | "Installing" | "Unknown" | "Expires soon" | "Installation failed" | "Expired"
}> {
    return this.http.request<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string | null
  issuerDistinguishedName?: string
  issuerCommonName?: string
  issuerOrganization?: string
  installDate?: string
  startDate?: string
  expiryDate?: string
  signatureAlgorithm?: string
  x509Version?: string
  installedBy?: string
  createdAt?: string
  updatedAt?: string
  status?: "Active" | "Overwritten" | "Installing" | "Unknown" | "Expires soon" | "Installation failed" | "Expired"
}>(withCall({ method: 'GET', path: `/api/edge/certificates/${encodePathParam(params.certificateId)}` }, opts))
  }
}

export class SslCertificatesApi {
  readonly sslCertificates: SslCertificatesApi_sslCertificates
  constructor(http: VtexHttpClient) {
    this.sslCertificates = new SslCertificatesApi_sslCertificates(http)
  }
}
