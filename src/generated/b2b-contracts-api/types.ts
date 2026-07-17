export type UpdateContractRequest = {
  email: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  corporateDocument?: string
  homePhone?: string
  cellPhone?: string
  corporateName: string
  tradeName?: string
  isCorporate: boolean
  stateRegistration?: string
  isFreeStateRegistration?: boolean
  priceTables?: string
  restrictions?: {
  "vtex.catalog"?: {
  assortmentIds?: string[]
}
  "vtex.checkout"?: {
  creditCards?: string[]
}
  "vtex.payments"?: {
  paymentSystemIds?: string[]
}
}
}

export type CreateContractResponse = {
  id?: string
  href?: string
  documentId?: string
}

export type ContractResponse = {
  cluster?: string
  priceTables?: string
  isCorporate?: boolean
  tradeName?: string
  homePhone?: string
  phone?: string
  businessPhone?: string
  email?: string
  firstName?: string
  lastName?: string
  document?: string
  documentType?: string
  corporateDocument?: string
  corporateName?: string
  stateRegistration?: string
  isNewsletterOptIn?: boolean
  createdIn?: string
  lastInteractionIn?: string
  id?: string
  dataEntityId?: string
  accountId?: string
  accountName?: string
  followers?: string[]
  tags?: string[]
  restrictions?: {
  "vtex.catalog"?: {
  assortmentIds?: string[]
}
  "vtex.checkout"?: {
  creditCards?: string[]
}
  "vtex.payments"?: {
  paymentSystemIds?: string[]
}
}
}
