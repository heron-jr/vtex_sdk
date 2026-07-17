export type Profile = {
  firstName: string
  lastName: string
  email: string
  birthDate?: string
  document: string
  documentType: string
  "{customField}"?: string
}

export type ProfileMeta = {
  version: string
  author: string
  creationDate: string
  lastUpdate: string
}

export type ProfileId = string

export type MaskedProfileResponse = {
  id?: ProfileId
  meta?: ProfileMeta
  document?: Profile
}[]

export type MaskedProfileResponseByVersion = {
  id?: ProfileId
  document?: Profile
  meta?: ProfileMeta
}[]

export type UnmaskedProfileResponse = {
  id?: ProfileId
  document?: Profile
  meta?: ProfileMeta
}

export type CreateAddress = {
  postalCode: string
  countryName: string
  countryCode?: string
  administrativeAreaLevel1: string
  locality: string
  localityAreaLevel1: string
  route: string
  streetNumber: string
  contactId?: string
}

export type Address = {
  postalCode: string
  countryName: string
  countryCode?: string
  administrativeAreaLevel1: string
  locality: string
  localityAreaLevel1: string
  route: string
  streetNumber: string
  profileId: ProfileId
  contactId?: string
}

export type AddressId = string

export type AddressMeta = {
  version: string
  author: string
  creationDate: string
  lastUpdateDate: string
}

export type UnmaskedAddressResponse = {
  id?: AddressId
  document?: Address
  meta?: AddressMeta
}

export type MaskedAddressResponse = {
  id?: AddressId
  document?: Address
  meta?: AddressMeta
}

export type MaskedPurchaseInfoResponse = {
  id?: PurchaseInfoId
  document?: PurchaseInfo
  meta?: PurchaseInfoMeta
}

export type PurchaseInfoId = string

export type PurchaseInfo = {
  paymentData?: PaymentData
  clientPreferences?: {

}
  isToSavePersonalData?: boolean
  lastUserPurchases?: {
  creationDate?: string
  orderId?: string
  orderGroup?: string
  value?: number
}[]
  lastPurchasesAddressId?: string
}

export type PurchaseInfoMeta = {
  version: string
  author: string
  creationDate: string
  lastUpdateDate: string
  expirationDate?: string
}

export type PaymentData = {
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string
}[]
  availableTokens?: string[]
  transactions?: {
  isActive: boolean
  transactionId: string
  merchantName: string
  payments: Payment[]
}[]
  giftCards?: string[]
  giftCardMessages?: string[]
  numberOfPaymentErrors?: number
  numberOfDeniedTransactions?: number
  lastDeniedTransaction?: string
}

export type Payment = {
  id: string
  paymentSystem: string
  paymentSystemName: string
  value: number
  installments: number
  referenceValue: number
  cardHolder: string
  cardNumber: string
  firstDigits: string
  lastDigits: string
  cvv2: string
  expireMonth: string
  expireYear: string
  url: string
  giftCardId: string
  giftCardName: string
  giftCardCaption: string
  redemptionCode: string
  group: string
  tid: string
  dueDate: string
  connectorResponses: Record<string, unknown>
}

export type Prospect = {
  availableAddresses?: {
  disposable?: boolean
  userId?: string
  addressName?: string
  addressType?: string
  postalCode?: string
  city?: string
  country?: string
  street?: string
  number?: string
  complement?: string
  geoCoordinate?: string[]
}[]
  paymentData?: PaymentData
  contacts?: {
  contactId?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  document?: string
}[]
  invoiceSubject?: {
  invoiceSubjectId?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
}
  email?: string
  firstName?: string
  lastName?: string
  document?: string
  cellPhone?: string
  isPJ?: boolean
  customerCode?: string
}

export type ProspectId = string

export type ProspectMeta = {
  version: string
  author: string
  creationDate: string
  lastUpdateDate: string
  expirationDate?: string
}

export type UnmaskedProspectResponse = {
  id?: ProspectId
  document?: Prospect
  meta?: ProspectMeta
}

export type MaskedProspectResponse = {
  id?: ProspectId
  document?: Prospect
  meta?: ProspectMeta
}

export type Schema = {
  title: string
  type: string
  description: string
  required: string[]
  properties: {
  additionalProperties?: {
  type: string
  sensitive: boolean
  pii: boolean
  items?: {
  type?: string
}
}
}
  documentTTL?: number
  version?: number
  "v-indexed"?: string[]
  "v-unique"?: string[]
}
