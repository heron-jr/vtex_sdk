export type CardTokenAddress = {
  addressType?: string
  addressId?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string
}

export type CardTokenCard = {
  paymentSystemId?: string
  paymentSystemName: string
  firstDigits: string
  lastDigits: string
  address?: CardTokenAddress
  holderName?: string
}

export type CardTokenDataResponse = {
  type: "FILE" | "TOKEN_CLIENT_ID" | "TOKEN_VALUE"
  value?: string
  expiration: string
  label?: string
  providerCardTokenId?: string
  useCvvForAuthorization?: boolean
  href?: string
}

export type CardTokenAddressInput = {
  addressType?: string
  addressId?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string
}

export type CardTokenCardInput = {
  paymentSystemId?: string
  paymentSystemName: string
  firstDigits: string
  lastDigits: string
  address?: CardTokenAddressInput
  holderName?: string
}

export type CardTokenData = {
  type: "FILE" | "TOKEN_CLIENT_ID" | "TOKEN_VALUE"
  value?: string
  expiration: string
  label?: string
  providerCardTokenId?: string
  useCvvForAuthorization?: boolean
  href?: string
}

export type CardToken = {
  id: string
  providerId: string
  orderGroup?: string
  profileId?: string
  shopperId?: string
  email?: string
  card?: CardTokenCard
  cardTokenData: CardTokenDataResponse
  extraData?: {
  [key: string]: string
}
}

export type CreateCardTokenRequest = {
  providerId: string
  profileId?: string
  shopperId?: string
  email?: string
  orderGroup?: string
  card: CardTokenCardInput
  cardTokenData: CardTokenData
  extraData?: {
  [key: string]: string
}
}

export type UpdateCardTokenRequest = {
  providerId: string
  profileId?: string
  shopperId?: string
  email?: string
  orderGroup?: string
  cardTokenData: CardTokenData
  extraData?: {
  [key: string]: string
}
}

export type ImportCardTokensResponse = {
  id?: string
}

export type ImportStatus = {
  status?: "DONE" | "RUNNING" | "CREATED" | "FAILED"
  id?: string
  completionPercentage?: number
  createdDate?: string
  updatedDate?: string
  reportUrl?: string
}
