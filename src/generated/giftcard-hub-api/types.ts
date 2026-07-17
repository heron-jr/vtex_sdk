export type CreateUpdateGiftCardProviderbyIDRequest = {
  id?: string
  serviceUrl: string
  oauthProvider: string
  preAuthEnabled: boolean
  cancelEnabled: boolean
  appKey: string
  appToken: string
}

export type CreateGiftCardinGiftCardProviderRequest = {
  relationName: string
  emissionDate: string
  expiringDate: string
  caption: string
  restrictedToOwner: boolean
  multipleRedemptions: boolean
  multipleCredits: boolean
  profileId: string
  currencyCode?: string
}

export type GetGiftCardfromGiftCardProviderRequest = {
  client: Client
  cart: Cart
}

export type Client = {
  id?: string
  email?: string
  document?: string
}

export type Cart = {
  grandTotal?: number
  relationName?: string
  redemptionCode?: string
  discounts?: number
  shipping?: number
  taxes?: number
  items?: Item[]
  itemsTotal?: number
}

export type Item = {
  productId?: string
  id?: string
  refId?: string
  name?: string
  price?: number
  quantity?: number
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
  items: Item1[]
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
  priceTags: {
  name: string
  value: number
}
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

export type CreateGiftCardSettlementTransactionRequest = {
  client: Client
  cart: Cart2
}

export type Cart2 = {
  grandTotal: number
  relationName: string
  redemptionCode: string
  discounts: number
  shipping: number
  taxes: number
  items: Item[]
  itemsTotal: number
}

export type CreateGiftCardCancellationTransactionRequest = {
  value: number
  requestId: string
}
