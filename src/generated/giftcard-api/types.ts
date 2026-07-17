export type CreateGiftCardRequest = {
  relationName: string
  expiringDate: string
  caption: string
  profileId: string
  currencyCode?: string
  restrictedToOwner?: boolean
  multipleCredits?: boolean
  multipleRedemptions?: boolean
}

export type Response = {
  id: string
  redemptionToken: string
  redemptionCode: string
  balance: number
  relationName: string
  emissionDate: string
  expiringDate: string
  caption: string
  currencyCode?: string
  transactions: Transactions
}

export type Transactions = {
  href: string
}

export type GetGiftCardusingJSONRequest = {
  cart: Cart
  client: Client
}

export type Cart = {
  grandTotal: number
  relationName: string
  redemptionCode: string
  discounts: number
  shipping: number
  taxes: number
  items: Item[]
  itemsTotal: number
}

export type Item = {
  productId: string
  id: string
  refId: string
  name: string
  price: number
  quantity: number
}

export type Client = {
  id: string
  email: string
  document: string
}

export type Response2 = {
  items: Item1[]
  paging: Paging
}

export type Item1 = {
  id: string
  _self: Self
}

export type Self = {
  href: string
}

export type Paging = {
  page: number
  perPage: number
  total: number
  pages: number
}

export type Response3 = {
  id: string
  _self: Self
}

export type CreateGiftCardTransactionRequest = {
  operation: string
  value: number
  description: string
  redemptionToken: string
  redemptionCode: string
  requestId: string
  orderInfo?: OrderInfo
}

export type OrderInfo = {
  orderId?: string
  sequence?: number
  cart?: Cart1
  clientProfile?: ClientProfile
  shipping?: Shipping
}

export type Cart1 = {
  items: Item2[]
  grandTotal: number
  discounts: number
  shipping: number
  taxes: number
  itemsTotal: number
}

export type Item2 = {
  id: string
  productId: string
  refId: string
  name: string
  value: number
  price: number
  quantity: number
  shippingDiscount: number
  discount: number
  priceTags: PriceTag[]
}

export type PriceTag = {
  name: string
  value: number
}

export type ClientProfile = {
  email: string
  firstName: string
  lastName: string
  document: string
  phone: string
  birthDate: string
  isCorporate: boolean
}

export type Shipping = {
  receiverName: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string
}

export type Response5 = {
  value?: number
  description?: string
  date?: string
  requestId?: string
  settlement?: {
  href?: string
}
  cancellation?: {
  href?: string
}
  authorization?: {
  href?: string
}
  operation?: string
}

export type Response6 = {
  oid: string
  value: number
  date: string
}

export type Response7 = {
  oid: string
  value: number
  date: string
}

export type GiftCardTransactionRequest = {
  value: number
  requestId: string
}
