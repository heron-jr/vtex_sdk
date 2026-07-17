export type Getcoupons = {
  items?: {
  grouping?: {
  key?: string
  amount?: number
}
  configuration?: {
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  couponCode?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}
}[]
}
