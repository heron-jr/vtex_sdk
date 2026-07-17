export type Listdataentity = {
  acronym: string
  name: string
  primaryKeyType: string
  allowGetAll: boolean
}

export type Getdataentityfields = {
  acronym: Acronym
  name: Name
  primaryKeyType: PrimaryKeyType
  allowGetAll: AllowGetAll
  fields: Field[]
}

export type Field = {
  name: string
  type: string
  displayName: string
  isNullable: boolean
  isSearchable: boolean
  isFilter: boolean
  isInternal: boolean
}

export type IdHrefDocumentID = {
  id?: string
  href?: string
  documentId?: string
}

export type IdHref = {
  Id: string
  Href: string
}

export type PutscoresRequest = {
  field: string
  key: string
  point: number
  until: string
}

export type PutscorebyfieldRequest = {
  key: string
  point: number
  until: string
}

export type DeletescorebyfieldRequest = {
  key: string
}

export type Listversion = {
  id: string
  date: string
}

export type Getversion = {
  id: string
  author: string
  document: Document
}

export type Document = {
  "{customProperty}"?: string
  id: string
  accountId: string
  accountName: string
  dataEntityId: string
}

export type CreateUpdateProfileRequests = {
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  documentType?: string
  document?: string
  isCorporate?: boolean
  isNewsletterOptIn?: boolean
  localeDefault?: string
  corporateDocument?: string
  homePhone?: string
  cellPhone?: string
  corporateName?: string
  tradeName?: string
  stateRegistration?: string
  isFreeStateRegistration?: boolean
  priceTables?: string
  restrictions?: {
  "vtex.catalog"?: {
  collectionIds?: string[]
}
  "vtex.checkout"?: {
  creditCards?: string[]
}
  "vtex.payments"?: {
  paymentSystemIds?: string[]
}
}
}

export type CreateUpdateAddressRequests = {
  addressName?: string
  addressLabel?: string
  addressType?: "commercial" | "invoice"
  receiverName?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinate?: string
  userId?: string
}

export type DocumentResponse = {
  Id: string
  Href: string
}

export type CreateAddressResponse = {
  Id?: string
  Href?: string
  DocumentId?: string
}

export type AddressResponse = {
  addressLabel?: string
  addressType?: "commercial" | "invoice"
  city?: string
  complement?: string
  country?: string
  countryfake?: string
  geoCoordinate?: string
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
  auto_filter?: string
}

export type Acronym = unknown

export type Name = unknown

export type PrimaryKeyType = unknown

export type AllowGetAll = unknown
