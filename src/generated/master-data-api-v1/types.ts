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
  id: string
  accountId: string
  accountName: string
  dataEntityId: string
  [key: string]: unknown
}

export type CreateUpdateProfileRequests = {
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  documentType?: string | null
  document?: string | null
  isCorporate?: boolean | null
  isNewsletterOptIn?: boolean | null
  localeDefault?: string | null
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
  addressName?: string | null
  addressLabel?: string | null
  addressType?: "commercial" | "invoice" | null
  receiverName?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
  postalCode?: string | null
  street?: string | null
  number?: string | null
  neighborhood?: string | null
  complement?: string | null
  reference?: string | null
  geoCoordinate?: string | null
  userId?: string | null
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
  addressLabel?: string | null
  addressType?: "commercial" | "invoice" | null
  city?: string | null
  complement?: string | null
  country?: string | null
  countryfake?: string | null
  geoCoordinate?: string | null
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
  auto_filter?: string | null
}

export type Acronym = unknown

export type Name = unknown

export type PrimaryKeyType = unknown

export type AllowGetAll = unknown
