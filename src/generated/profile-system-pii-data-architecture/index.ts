import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { Profile, ProfileMeta, ProfileId, MaskedProfileResponse, MaskedProfileResponseByVersion, UnmaskedProfileResponse, CreateAddress, Address, AddressId, AddressMeta, UnmaskedAddressResponse, MaskedAddressResponse, MaskedPurchaseInfoResponse, PurchaseInfoId, PurchaseInfo, PurchaseInfoMeta, PaymentData, Payment, Prospect, ProspectId, ProspectMeta, UnmaskedProspectResponse, MaskedProspectResponse, Schema } from './types.js'

class ProfileSystemPiiDataArchitectureApi_profiles {
  constructor(private http: VtexHttpClient) {}

  createClientProfile(params: {
  ttl?: number
  body: Profile
}, opts?: CallOptions): Promise<{
  id?: ProfileId
  meta?: ProfileMeta
  document?: Profile
}> {
    return this.http.request<{
  id?: ProfileId
  meta?: ProfileMeta
  document?: Profile
}>(withCall({ method: 'POST', path: `/api/storage/profile-system/profiles`, query: { 'ttl': params.ttl }, body: params.body }, opts))
  }

  getProfile(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<MaskedProfileResponse> {
    return this.http.request<MaskedProfileResponse>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}`, query: { 'alternativeKey': params.alternativeKey } }, opts))
  }

  updateClientProfile(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  ttl?: number
  body: Profile
}, opts?: CallOptions): Promise<UnmaskedProfileResponse> {
    return this.http.request<UnmaskedProfileResponse>(withCall({ method: 'PATCH', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}`, query: { 'alternativeKey': params.alternativeKey, 'ttl': params.ttl }, body: params.body }, opts))
  }

  deleteClientProfile(params: {
  profileId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}` }, opts))
  }

  getUnmaskedProfile(params: {
  profileId: string
  reason: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<UnmaskedProfileResponse[]> {
    return this.http.request<UnmaskedProfileResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/unmask`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } }, opts))
  }

  getProfileByVersion(params: {
  profileId: string
  profileVersionId: string
}, opts?: CallOptions): Promise<MaskedProfileResponseByVersion> {
    return this.http.request<MaskedProfileResponseByVersion>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/versions/${encodePathParam(params.profileVersionId)}` }, opts))
  }

  getUnmaskedProfileByVersion(params: {
  profileId: string
  profileVersionId: string
  reason: string
}, opts?: CallOptions): Promise<UnmaskedProfileResponse[]> {
    return this.http.request<UnmaskedProfileResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/versions/${encodePathParam(params.profileVersionId)}/unmask`, query: { 'reason': params.reason } }, opts))
  }
}
class ProfileSystemPiiDataArchitectureApi_addresses {
  constructor(private http: VtexHttpClient) {}

  getClientAddresses(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<MaskedAddressResponse[]> {
    return this.http.request<MaskedAddressResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses`, query: { 'alternativeKey': params.alternativeKey } }, opts))
  }

  createClientAddress(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  body: CreateAddress
}, opts?: CallOptions): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>(withCall({ method: 'POST', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses`, query: { 'alternativeKey': params.alternativeKey }, body: params.body }, opts))
  }

  getUnmaskedClientAddresses(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<UnmaskedAddressResponse[]> {
    return this.http.request<UnmaskedAddressResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses/unmask`, query: { 'alternativeKey': params.alternativeKey } }, opts))
  }

  getAddress(params: {
  profileId: string
  addressId: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<MaskedAddressResponse> {
    return this.http.request<MaskedAddressResponse>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses/${encodePathParam(params.addressId)}`, query: { 'alternativeKey': params.alternativeKey } }, opts))
  }

  updateClientAddress(params: {
  profileId: string
  addressId: string
  alternativeKey?: "email" | "document"
  body: CreateAddress
}, opts?: CallOptions): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>(withCall({ method: 'PATCH', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses/${encodePathParam(params.addressId)}`, query: { 'alternativeKey': params.alternativeKey }, body: params.body }, opts))
  }

  deleteAddress(params: {
  profileId: string
  addressId: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses/${encodePathParam(params.addressId)}`, query: { 'alternativeKey': params.alternativeKey } }, opts))
  }

  getUnmaskedAddress(params: {
  profileId: string
  addressId: string
  reason: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses/${encodePathParam(params.addressId)}/unmask`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } }, opts))
  }

  getAddressByVersion(params: {
  profileId: string
  addressId: string
  addressVersionId: string
  reason: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<MaskedAddressResponse> {
    return this.http.request<MaskedAddressResponse>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses/${encodePathParam(params.addressId)}/versions/${encodePathParam(params.addressVersionId)}`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } }, opts))
  }

  getUnmaskedAddressByVersion(params: {
  profileId: string
  addressId: string
  addressVersionId: string
  reason: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<UnmaskedAddressResponse> {
    return this.http.request<UnmaskedAddressResponse>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/addresses/${encodePathParam(params.addressId)}/versions/${encodePathParam(params.addressVersionId)}/unmask`, query: { 'reason': params.reason, 'alternativeKey': params.alternativeKey } }, opts))
  }
}
class ProfileSystemPiiDataArchitectureApi_prospects {
  constructor(private http: VtexHttpClient) {}

  getProspects(params: Record<string, never> = {}, opts?: CallOptions): Promise<MaskedProspectResponse[]> {
    return this.http.request<MaskedProspectResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/prospects` }, opts))
  }

  createProspect(params: {
  body: Prospect
}, opts?: CallOptions): Promise<UnmaskedProspectResponse> {
    return this.http.request<UnmaskedProspectResponse>(withCall({ method: 'POST', path: `/api/storage/profile-system/prospects`, body: params.body }, opts))
  }

  getUnmaskedProspects(params: Record<string, never> = {}, opts?: CallOptions): Promise<UnmaskedProspectResponse[]> {
    return this.http.request<UnmaskedProspectResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/prospects/unmask` }, opts))
  }

  getProspect(params: {
  prospectId: string
}, opts?: CallOptions): Promise<MaskedProspectResponse> {
    return this.http.request<MaskedProspectResponse>(withCall({ method: 'GET', path: `/api/storage/profile-system/prospects/${encodePathParam(params.prospectId)}` }, opts))
  }

  updateProspect(params: {
  prospectId: string
  body: Prospect
}, opts?: CallOptions): Promise<UnmaskedProspectResponse> {
    return this.http.request<UnmaskedProspectResponse>(withCall({ method: 'PATCH', path: `/api/storage/profile-system/prospects/${encodePathParam(params.prospectId)}`, body: params.body }, opts))
  }

  deleteProspect(params: {
  prospectId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/storage/profile-system/prospects/${encodePathParam(params.prospectId)}` }, opts))
  }

  getUnmaskedProspect(params: {
  prospectId: string
  reason: string
}, opts?: CallOptions): Promise<UnmaskedProspectResponse> {
    return this.http.request<UnmaskedProspectResponse>(withCall({ method: 'GET', path: `/api/storage/profile-system/prospects/${encodePathParam(params.prospectId)}/unmask`, query: { 'reason': params.reason } }, opts))
  }
}
class ProfileSystemPiiDataArchitectureApi_purchaseInformation {
  constructor(private http: VtexHttpClient) {}

  getPurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<MaskedPurchaseInfoResponse[]> {
    return this.http.request<MaskedPurchaseInfoResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/purchase-info`, query: { 'alternativeKey': params.alternativeKey } }, opts))
  }

  createPurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  body: PurchaseInfo
}, opts?: CallOptions): Promise<MaskedPurchaseInfoResponse> {
    return this.http.request<MaskedPurchaseInfoResponse>(withCall({ method: 'POST', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/purchase-info`, query: { 'alternativeKey': params.alternativeKey }, body: params.body }, opts))
  }

  updatePurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
  body: PurchaseInfo
}, opts?: CallOptions): Promise<MaskedPurchaseInfoResponse> {
    return this.http.request<MaskedPurchaseInfoResponse>(withCall({ method: 'PATCH', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/purchase-info`, query: { 'alternativeKey': params.alternativeKey }, body: params.body }, opts))
  }

  deletePurchaseInformation(params: {
  profileId: string
  alternativeKey?: "email" | "document"
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/purchase-info`, query: { 'alternativeKey': params.alternativeKey } }, opts))
  }

  getUnmaskedPurchaseInformation(params: {
  profileId: string
  reason: string
}, opts?: CallOptions): Promise<MaskedPurchaseInfoResponse[]> {
    return this.http.request<MaskedPurchaseInfoResponse[]>(withCall({ method: 'GET', path: `/api/storage/profile-system/profiles/${encodePathParam(params.profileId)}/purchase-info/unmask`, query: { 'reason': params.reason } }, opts))
  }
}
class ProfileSystemPiiDataArchitectureApi_schemas {
  constructor(private http: VtexHttpClient) {}

  getApiStorageProfileSystemSchemasProfileSystem(params: Record<string, never> = {}, opts?: CallOptions): Promise<Schema> {
    return this.http.request<Schema>(withCall({ method: 'GET', path: `/api/storage/profile-system/schemas/profileSystem` }, opts))
  }

  getApiStorageProfileSystemSchemasProfileSystemCustom(params: Record<string, never> = {}, opts?: CallOptions): Promise<Schema> {
    return this.http.request<Schema>(withCall({ method: 'GET', path: `/api/storage/profile-system/schemas/profileSystem/custom` }, opts))
  }

  createOrUpdateProfileSchema(params: {
  body: {
  [key: string]: {
  type: string[]
  sensitive: boolean
  pii: boolean
}
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/storage/profile-system/schemas/profileSystem/custom`, body: params.body }, opts))
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
