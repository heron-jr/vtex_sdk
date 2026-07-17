export type StartSessionV2Request = {
  orderFormId?: string
  userId?: string
}

export type StartSessionV2Response = {
  recommendationsUserId: string
}

export type RecommendationsV2Response = {
  products: {
  brand?: string
  productId?: string
  productName?: string
  link?: string
  tags?: string[]
  items?: {
  itemId?: string
  nameComplete?: string
  images?: {
  imageUrl?: string
}[]
  sellers?: {
  sellerId?: string
  commertialOffer?: {
  Price?: number
  ListPrice?: number
  AvailableQuantity?: number
}
}[]
}[]
}[]
  correlationId: string
  campaign: {
  id: string
  title?: string
  type: "TOP_ITEMS" | "PERSONALIZED" | "SIMILAR_ITEMS" | "CROSS_SELL" | "CART_RECOMMENDATIONS" | "LAST_SEEN" | "RECENT_INTERACTIONS" | "VISUAL_SIMILARITY" | "SEARCH_BASED" | "NEXT_INTERACTION"
}
}

export type RecommendationViewEventV2Request = {
  userId: string
  correlationId: string
  products: string[]
  campaignId?: string
}

export type RecommendationClickEventV2Request = {
  userId: string
  product: string
  correlationId: string
  campaignId?: string
}

export type ProductViewEventV2Request = {
  userId: string
  product: string
  source?: "WEB_DESKTOP" | "WEB_MOBILE" | "MOBILE_APP"
  name?: string
  category?: string
  url?: string
}
