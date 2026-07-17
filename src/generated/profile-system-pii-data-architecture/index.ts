import type { VtexHttpClient } from '../../core/http.js'
import type { Profile, ProfileMeta, ProfileId, MaskedProfileResponse, MaskedProfileResponseByVersion, UnmaskedProfileResponse, CreateAddress, Address, AddressId, AddressMeta, UnmaskedAddressResponse, MaskedAddressResponse, MaskedPurchaseInfoResponse, PurchaseInfoId, PurchaseInfo, PurchaseInfoMeta, PaymentData, Payment, Prospect, ProspectId, ProspectMeta, UnmaskedProspectResponse, MaskedProspectResponse, Schema } from './types.js'

class ProfileSystemPiiDataArchitectureApi_profiles {
  constructor(private http: VtexHttpClient) {}

  createClientProfile(params: {
  ttl?: number
  body: Profile
}): Promise<{
  id?: ProfileId
  meta?: ProfileMeta
  document?: Profile
}> {
    return this.http.request<{
  id?: ProfileId
  meta?: ProfileMeta
  document?: Profile
}>({ method: 'POST', path: `/api/storage/profile-system/profiles`, query: { 'ttl': params.ttl }, body: params.body })
  }

  getProfile(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}): Promise<MaskedProfileResponse> {
    return this.http.request<MaskedProfileResponse>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}`, query: { 'alternativeKey': params.alternativeKey } })
  }

  updateClientProfile(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  ttl?: number
  body: Profile
}): Promise<UnmaskedProfileResponse> {
    return this.http.request<UnmaskedProfileResponse>({ method: 'PATCH', path: `/api/storage/profile-system/profiles/${params.profileId}`, query: { 'alternativeKey': params.alternativeKey, 'ttl': params.ttl }, body: params.body })
  }

  deleteClientProfile(params: {
  profileId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/storage/profile-system/profiles/${params.profileId}` })
  }

  getUnmaskedProfile(params: {
  profileId: string
  reason: string
  alternativeKey?: "email" | "document"
}): Promise<UnmaskedProfileResponse[]> {
    return this.http.request<UnmaskedProfileResponse[]>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/unmask`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } })
  }

  getProfileByVersion(params: {
  profileId: string
  profileVersionId: string
}): Promise<MaskedProfileResponseByVersion> {
    return this.http.request<MaskedProfileResponseByVersion>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/versions/${params.profileVersionId}` })
  }

  getUnmaskedProfileByVersion(params: {
  profileId: string
  profileVersionId: string
  reason: string
}): Promise<UnmaskedProfileResponse[]> {
    return this.http.request<UnmaskedProfileResponse[]>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/versions/${params.profileVersionId}/unmask`, query: { 'reason': params.reason } })
  }
}
class ProfileSystemPiiDataArchitectureApi_addresses {
  constructor(private http: VtexHttpClient) {}

  getClientAddresses(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}): Promise<MaskedAddressResponse[]> {
    return this.http.request<MaskedAddressResponse[]>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses`, query: { 'alternativeKey': params.alternativeKey } })
  }

  createClientAddress(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  body: CreateAddress
}): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>({ method: 'POST', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses`, query: { 'alternativeKey': params.alternativeKey }, body: params.body })
  }

  getUnmaskedClientAddresses(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}): Promise<UnmaskedAddressResponse[]> {
    return this.http.request<UnmaskedAddressResponse[]>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses/unmask`, query: { 'alternativeKey': params.alternativeKey } })
  }

  getAddress(params: {
  profileId: string
  addressId: string
  alternativeKey?: "email" | "document"
}): Promise<MaskedAddressResponse> {
    return this.http.request<MaskedAddressResponse>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses/${params.addressId}`, query: { 'alternativeKey': params.alternativeKey } })
  }

  updateClientAddress(params: {
  profileId: string
  addressId: string
  alternativeKey?: "email" | "document"
  body: CreateAddress
}): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>({ method: 'PATCH', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses/${params.addressId}`, query: { 'alternativeKey': params.alternativeKey }, body: params.body })
  }

  deleteAddress(params: {
  profileId: string
  addressId: string
  alternativeKey?: "email" | "document"
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses/${params.addressId}`, query: { 'alternativeKey': params.alternativeKey } })
  }

  getUnmaskedAddress(params: {
  profileId: string
  addressId: string
  reason: string
  alternativeKey?: "email" | "document"
}): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses/${params.addressId}/unmask`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } })
  }

  getAddressByVersion(params: {
  profileId: string
  addressId: string
  addressVersionId: string
  reason: string
  alternativeKey?: "email" | "document"
}): Promise<MaskedAddressResponse> {
    return this.http.request<MaskedAddressResponse>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses/${params.addressId}/versions/${params.addressVersionId}`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } })
  }

  getUnmaskedAddressByVersion(params: {
  profileId: string
  addressId: string
  addressVersionId: string
  reason: string
  alternativeKey?: "email" | "document"
}): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/addresses/${params.addressId}/versions/${params.addressVersionId}/unmask`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } })
  }
}
class ProfileSystemPiiDataArchitectureApi_prospects {
  constructor(private http: VtexHttpClient) {}

  getProspects(params: Record<string, never>): Promise<MaskedProspectResponse[]> {
    return this.http.request<MaskedProspectResponse[]>({ method: 'GET', path: `/api/storage/profile-system/prospects` })
  }

  createProspect(params: {
  body: Prospect
}): Promise<UnmaskedProspectResponse> {
    return this.http.request<UnmaskedProspectResponse>({ method: 'POST', path: `/api/storage/profile-system/prospects`, body: params.body })
  }

  getUnmaskedProspects(params: Record<string, never>): Promise<UnmaskedProspectResponse[]> {
    return this.http.request<UnmaskedProspectResponse[]>({ method: 'GET', path: `/api/storage/profile-system/prospects/unmask` })
  }

  getProspect(params: {
  prospectId: string
}): Promise<MaskedProspectResponse> {
    return this.http.request<MaskedProspectResponse>({ method: 'GET', path: `/api/storage/profile-system/prospects/${params.prospectId}` })
  }

  updateProspect(params: {
  prospectId: string
  body: Prospect
}): Promise<UnmaskedProspectResponse> {
    return this.http.request<UnmaskedProspectResponse>({ method: 'PATCH', path: `/api/storage/profile-system/prospects/${params.prospectId}`, body: params.body })
  }

  deleteProspect(params: {
  prospectId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/storage/profile-system/prospects/${params.prospectId}` })
  }

  getUnmaskedProspect(params: {
  prospectId: string
  reason: string
}): Promise<UnmaskedProspectResponse> {
    return this.http.request<UnmaskedProspectResponse>({ method: 'GET', path: `/api/storage/profile-system/prospects/${params.prospectId}/unmask`, query: { 'reason': params.reason } })
  }
}
class ProfileSystemPiiDataArchitectureApi_purchaseInformation {
  constructor(private http: VtexHttpClient) {}

  getPurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}): Promise<MaskedPurchaseInfoResponse[]> {
    return this.http.request<MaskedPurchaseInfoResponse[]>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/purchase-info`, query: { 'alternativeKey': params.alternativeKey } })
  }

  createPurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  body: PurchaseInfo
}): Promise<MaskedPurchaseInfoResponse> {
    return this.http.request<MaskedPurchaseInfoResponse>({ method: 'POST', path: `/api/storage/profile-system/profiles/${params.profileId}/purchase-info`, query: { 'alternativeKey': params.alternativeKey }, body: params.body })
  }

  updatePurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  body: PurchaseInfo
}): Promise<MaskedPurchaseInfoResponse> {
    return this.http.request<MaskedPurchaseInfoResponse>({ method: 'PATCH', path: `/api/storage/profile-system/profiles/${params.profileId}/purchase-info`, query: { 'alternativeKey': params.alternativeKey }, body: params.body })
  }

  deletePurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/storage/profile-system/profiles/${params.profileId}/purchase-info`, query: { 'alternativeKey': params.alternativeKey } })
  }

  getUnmaskedPurchaseInformation(params: {
  profileId: string
  reason: string
}): Promise<MaskedPurchaseInfoResponse[]> {
    return this.http.request<MaskedPurchaseInfoResponse[]>({ method: 'GET', path: `/api/storage/profile-system/profiles/${params.profileId}/purchase-info/unmask`, query: { 'reason': params.reason } })
  }
}
class ProfileSystemPiiDataArchitectureApi_schemas {
  constructor(private http: VtexHttpClient) {}

  getApiStorageProfileSystemSchemasProfileSystem(params: Record<string, never>): Promise<Schema> {
    return this.http.request<Schema>({ method: 'GET', path: `/api/storage/profile-system/schemas/profileSystem` })
  }

  getApiStorageProfileSystemSchemasProfileSystemCustom(params: Record<string, never>): Promise<Schema> {
    return this.http.request<Schema>({ method: 'GET', path: `/api/storage/profile-system/schemas/profileSystem/custom` })
  }

  createOrUpdateProfileSchema(params: {
  body: unknown
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/storage/profile-system/schemas/profileSystem/custom`, body: params.body })
  }
}

export class ProfileSystemPiiDataArchitectureApi {
  readonly profiles: ProfileSystemPiiDataArchitectureApi_profiles
  readonly addresses: ProfileSystemPiiDataArchitectureApi_addresses
  readonly prospects: ProfileSystemPiiDataArchitectureApi_prospects
  readonly purchaseInformation: ProfileSystemPiiDataArchitectureApi_purchaseInformation
  readonly schemas: ProfileSystemPiiDataArchitectureApi_schemas
  constructor(http: VtexHttpClient) {
    this.profiles = new ProfileSystemPiiDataArchitectureApi_profiles(http)
    this.addresses = new ProfileSystemPiiDataArchitectureApi_addresses(http)
    this.prospects = new ProfileSystemPiiDataArchitectureApi_prospects(http)
    this.purchaseInformation = new ProfileSystemPiiDataArchitectureApi_purchaseInformation(http)
    this.schemas = new ProfileSystemPiiDataArchitectureApi_schemas(http)
  }
}
