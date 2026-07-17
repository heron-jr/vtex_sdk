export type RequestSendInvoice = {
  type: string
  invoiceNumber: string
  courier?: string
  trackingNumber?: string
  trackingUrl?: string
  items: {
  id: string
  quantity: number
  price: number
}[]
  issuanceDate?: string
  invoiceValue?: number
}

export type ResponseFulfill = {
  date?: string
  orderId?: string
  receipt?: string
}

export type RequestSendTracking = {
  courier: string
  trackingNumber: string
  trackingUrl: string
  dispatchedDate: string
}

export type RequestUpdateTrackingStatus = {
  isDelivered: boolean
  events?: {
  city?: string
  state?: string
  description?: string
  date?: string
}[]
}

export type RequestCancelOrderMarketplace = {
  reason: string
}
