export type DeliveryZonesSearchRequest = {
  zipCode: string
  geoCoordinates?: string
  country: string
}

export type PickupPointsSearchRequest = {
  zipCode: string
  coordinate: {
  latitude?: number
  longitude?: number
}
  country: string
}

export type DeliveryZonesResponse = {
  deliveryZonesIds?: string[]
  deliveryZonesHash?: string
  countryCode?: string
}

export type PickupPointsResponse = {
  pickupPointDistances?: {
  pickupId?: string
  pickupName?: string
  distance?: number
  isActive?: boolean
  address?: {
  street?: string
  number?: string
  postalCode?: string
  city?: string
  state?: string
  neighborhood?: string
}
  businessHours?: {
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  openingTime?: string
  closingTime?: string
}[]
}[]
  pickupPointsHash?: string
}

export type DeliverySuggestionRequest = {
  products: {
  productId: string
  itemId?: string
}[]
  deliveryZonesHash: string
  pickupsHash: string
}

export type DeliverySuggestionResponse = {
  suggestions?: {
  productId: string
  suggestions: {
  delivery: {
  id?: string
  name?: string
  slaTimeTarget?: {
  from?: number
  to?: number
  unit?: "h" | "d"
}
  conditions?: string[]
}[]
  pickup: {
  id?: string
  name?: string
  slaTimeTarget?: {
  from?: number
  to?: number
  unit?: "h" | "d"
}
  conditions?: string[]
}[]
}
}[]
}

export type ErrorResponse = {
  message: string
}
