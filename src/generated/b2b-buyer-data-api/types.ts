export type BuyerSchemaResponse = {
  name: string
  schema: {
  title?: string
  type?: string
  properties?: {
  userId?: {
  type: string
  format: string
}
  email?: {
  type?: string
}
  firstName?: {
  type?: string
}
  lastName?: {
  type?: string
}
  document?: {
  type?: string
}
  documentType?: {
  type?: string
}
  phone?: {
  type?: string
}
  cards?: {
  type?: string
  items?: {
  type?: string
  properties?: {
  cardId?: {
  type?: string
}
  paymentSystem?: {
  type?: string
}
  paymentSystemName?: {
  type?: string
}
  cardNumber?: {
  type?: string
  pattern?: string
}
  bin?: {
  type?: string
}
  expirationDate?: {
  type?: string
}
  useCvvForAuthorization?: {
  type?: string
}
  cardLabel?: {
  type?: string
}
  isCardToken?: {
  type?: string
}
  availableAddresses?: {
  type?: string
  items?: {
  type?: string
}
}
}
  additionalProperties?: boolean
}
}
}
  additionalProperties?: boolean
  requiredField?: string[]
  "v-indexed"?: string[]
}
}

export type BuyerDocumentRequest = {
  userId: string
  email?: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  phone?: string
}

export type BuyerDocument = {
  userId?: string
  email?: string
  firstName?: string
  lastName?: string
  document?: string
  documentType?: string
  phone?: string
  cards?: {
  cardId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  expirationDate?: string
  useCvvForAuthorization?: boolean
  cardLabel?: string
  isCardToken?: boolean
  availableAddresses?: string[]
}[]
}

export type CreateBuyerDocumentResponse = {
  Id: string
  Href?: string
  DocumentId: string
}

export type BuyerDocumentResponse = {
  Id: string
  Href: string
}
