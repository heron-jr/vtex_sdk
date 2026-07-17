export type CancelSuccessResponse = {
  message?: string
}

export type ShopeeOrderHookRequest = {
  code: number
  shopId: number
  data: {
  orderSn: string
  status: string
}
}

export type ShippingLabelDownloadResponse = {
  message: string
  details: {
  statusMessage?: string
  orderStatusInShopee?: string[]
  file?: {
  base64Encoded: string
  type: string
  disposition: string
}
}
}
