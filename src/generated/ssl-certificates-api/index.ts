import type { VtexHttpClient } from '../../core/http.js'

class SslCertificatesApi_sslCertificates {
  constructor(private http: VtexHttpClient) {}

  getApiEdgeCertificates(params: Record<string, never>): Promise<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string
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
  subjectOrganization?: string
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
}[]>({ method: 'GET', path: `/api/edge/certificates` })
  }

  putApiEdgeCertificates(params: {
  body: {
  hosts: string[]
  certificate: string
  privateKey: string
}
}): Promise<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string
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
  subjectOrganization?: string
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
}[]>({ method: 'PUT', path: `/api/edge/certificates`, body: params.body })
  }

  getApiEdgeCertificatesByCertificateId(params: {
  certificateId: string
}): Promise<{
  id?: string
  account?: string
  host?: string
  serialNumber?: string
  subjectDistinguishedName?: string
  subjectCommonName?: string
  subjectOrganization?: string
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
  subjectOrganization?: string
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
}>({ method: 'GET', path: `/api/edge/certificates/${params.certificateId}` })
  }
}

export class SslCertificatesApi {
  readonly sslCertificates: SslCertificatesApi_sslCertificates
  constructor(http: VtexHttpClient) {
    this.sslCertificates = new SslCertificatesApi_sslCertificates(http)
  }
}
