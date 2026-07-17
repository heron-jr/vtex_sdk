export type CreateUpdateAddressRequests = {
  addressName?: string
  addressLabel?: string
  addressType: "commercial" | "invoice"
  receiverName: string
  city: string
  state: string
  country: string
  postalCode: string
  street: string
  number: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
  userId: string
}

export type DocumentResponse = {
  Id: string
  Href: string
}

export type AddressResponse = {
  addressLabel?: string
  addressType?: "commercial" | "invoice"
  city?: string
  complement?: string
  country?: string
  geoCoordinates?: number[]
  neighborhood?: string
  number?: string
  postalCode?: string
  receiverName?: string
  reference?: string
  state?: string
  street?: string
  userId?: string
  id?: string
  accountId?: string
  accountName?: string
  dataEntityId?: string
  createdBy?: string
  createdIn?: string
  updatedBy?: string
  updatedIn?: string
  lastInteractionBy?: string
  lastInteractionIn?: string
  followers?: string[]
  tags?: string[]
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
