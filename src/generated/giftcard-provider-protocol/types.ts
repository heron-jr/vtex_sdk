export type ListAllGiftCardsRequest = {
  client: Client
  cart: Cart
}

export type Client = {
  id: string
  email: string
  document: string
}

export type Cart = {
  grandTotal: number
  relationName: string | null
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

export type Response = {
  id: string
  provider: string
  balance: number
  _self: Self
}

export type Self = {
  href: string
}

export type Response1 = {
  id: string
  redemptionToken: string
  redemptionCode: string
  balance: number
  emissionDate: string
  expiringDate: string
  discount: boolean
  transaction: Transaction
}

export type Transaction = {
  href: string
}

export type CreateGiftCardRequest = {
  relationName: string
  emissionDate?: string
  expiringDate?: string
  caption: string
  restrictedToOwner?: boolean
  multipleRedemptions?: boolean
  multipleCredits?: boolean
  profileId: string
  currencyCode?: string
}

export type CreateGiftCardTransactionRequest = {
  operation: string
  value: number
  description: string
  redemptionToken: string
  redemptionCode: string
  requestId: string
  orderInfo: OrderInfo
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

export type Item1 = {
  id: string
  productId: string
  refId: string
  name: string
  value: number
  price: number
  quantity: number
  shippingDiscount: number
  discount: number
  priceTags: string[]
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
  complement: string | null
  reference: string | null
}

export type GiftCardTransactionResponse = {
  cardId: string
  id: string
  _self: Self
}

export type Cart2 = {
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

export type Settlement = {
  href: string
}

export type Cancellation = {
  href: string
}

export type Authorization = {
  href: string
}

export type TransactionResponse = {
  oid: string
  value: number
  date: string
}

export type CreateGiftCardTransactionCancellationRequest = {
  value: number
  requestId: string
}

export type CreateGiftCardTransactionSettlementRequest = {
  value: number
  requestId: string
}
