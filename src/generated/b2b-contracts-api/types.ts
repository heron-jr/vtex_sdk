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
  cluster?: string | null
  priceTables?: string | null
  isCorporate?: boolean | null
  tradeName?: string | null
  homePhone?: string | null
  phone?: string | null
  businessPhone?: string | null
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  document?: string | null
  documentType?: string | null
  corporateDocument?: string | null
  corporateName?: string | null
  stateRegistration?: string | null
  isNewsletterOptIn?: boolean | null
  createdIn?: string | null
  lastInteractionIn?: string | null
  id?: string | null
  dataEntityId?: string | null
  accountId?: string | null
  accountName?: string | null
  followers?: string[] | null
  tags?: string[] | null
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
} | null
}
