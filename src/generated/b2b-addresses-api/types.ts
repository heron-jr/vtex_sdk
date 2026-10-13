export type CreateUpdateAddressRequests = {
  addressName?: string | null
  addressLabel?: string | null
  addressType: "commercial" | "invoice"
  receiverName: string
  city: string
  state: string
  country: string
  postalCode: string
  street: string
  number: string
  neighborhood?: string | null
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[] | null
  userId: string
}

export type DocumentResponse = {
  Id: string
  Href: string
}

export type AddressResponse = {
  addressLabel?: string | null
  addressType?: "commercial" | "invoice" | null
  city?: string | null
  complement?: string | null
  country?: string | null
  geoCoordinates?: number[] | null
  neighborhood?: string | null
  number?: string | null
  postalCode?: string | null
  receiverName?: string | null
  reference?: string | null
  state?: string | null
  street?: string | null
  userId?: string | null
  id?: string | null
  accountId?: string | null
  accountName?: string | null
  dataEntityId?: string | null
  createdBy?: string | null
  createdIn?: string | null
  updatedBy?: string | null
  updatedIn?: string | null
  lastInteractionBy?: string | null
  lastInteractionIn?: string | null
  followers?: string[] | null
  tags?: string[] | null
}

export type RecipientRequest = {
  email?: string
  firstName: string
  lastName: string
  profileId?: string
  phone?: string
  phoneExtension?: string
  document?: string
  documentType?: string
  addressIds?: string[]
}

export type LocationRequest = {
  contractId: string
  customFieldId: string
  auxId: string
  value: string
  description?: string
}
