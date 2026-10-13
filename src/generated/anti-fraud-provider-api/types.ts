export type Success = {
  cardholderDocument?: string
  allowAntifraudOnGiftCard?: boolean
  customFields: {
  name?: string
  type?: "text" | "password" | "select"
  options?: {
  text?: string
  value?: string
}[]
}[]
}

export type SendAntifraudDataRequest = {
  id: string
  reference: string
  value: number
  ip: string
  store: string
  deviceFingerprint: string
  miniCart: MiniCart
  payments: Payment
  hook: string
  transactionStartDate: string
  merchantSettings?: {
  name: string
  value: string
}[]
}

export type MiniCart = {
  buyer: Buyer
  shipping: Shipping
  items: Item[]
  taxValue: number
  listRegistry: ListRegistry
}

export type Buyer = {
  id: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  email: string
  phone: string
  address: Address
}

export type Address = {
  country: string
  street: string
  number: string
  complement: string
  neighborhood: string
  postalCode: string
  city: string
  state: string
}

export type Shipping = {
  value: number
  estimatedDate: string
  address: Address
}

export type Item = {
  id: string
  name: string
  price: number
  quantity: number
  deliveryType: string
  deliverySlaInMinutes: number
  categoryId: string
  categoryName: string
  discount: number
  sellerId: string
}

export type ListRegistry = {
  name: string
  deliveryToOwner: boolean
}

export type Payment = {
  id: string
  method: string
  name?: string
  value: number
  currencyIso4217: string
  installments: number
  details?: Details
}[]

export type Details = {
  bin: string
  lastDigits: string
  holder: string
  address: Address
}

export type SendAntifraudData = {
  id: string
  tid: string
  code: string
  message: string
  status: "approved" | "denied"
  score: number
  analysisType: string
  responses: Responses
}

export type Responses = {
  foo: string
  custom: string
}

export type UpdateAntifraudTransactionsoptionalRequest = {
  id: string
  reference: string
  value: number
  ip: string
  store: string
  deviceFingerprint: string
  miniCart: MiniCart
  payments: Payment[]
  hook: string
}

export type ApproveAntifraudAnalysisResponse = {
  id: string
  status: string
  fraudRiskPercentage: number
  analysisType: string
  responses: string | null
}

export type GetAntifraudStatus = {
  id: string
  tid: string
  status: string
  fraudRiskPercentage: number
  analysisType: string
  responses: Responses
}

export type GetPaymentMethodsSupported = {
  name: string
}

export type _1RetrieveTokenRequest = {
  applicationId: string
  returnUrl: string
}

export type _1RetrieveToken = {
  applicationId: string
  token: string
}

export type _3GetCredentials = {
  applicationId: string
  appKey: string
  appToken: string
}
