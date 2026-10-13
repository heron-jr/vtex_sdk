export type GetPricesRequestObject = {
  items: Items
  UtmSource?: string | null
  UtmMedium?: string | null
  UtmCampaign?: string
  UtmInternalCampaign?: string | null
  salesChannel: string
  email: string
}

export type Items = {
  index: number
  skuId: string
  quantity: number
  brandId: string
  sellerId: string
  priceTableIds: string[]
  categoriesIds: string[]
}[]

export type Response2 = {
  items: Item1[]
}

export type Item1 = {
  index: number
  skuId: string
  price: number
  costPrice: number
  listPrice: number
  priceTable: string
  priceValidUntil: string
}

export type ConfigExternalPriceSourceRequest = {
  active?: boolean
  appName: string
}
