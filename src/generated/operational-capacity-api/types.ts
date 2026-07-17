export type LocationCapacity = {
  locationId?: string
  accountName?: string
  accountId?: string
  availability?: {
  amountUsagePercentage?: number
  startAt?: string
  endAt?: string
}
  firstShiftAhead?: {
  amountPercentage?: number
  capacityLimitAmount?: number
  capacityUsageAmount?: number
  startAt?: string
  endAt?: string
}
  secondShiftAhead?: {
  amountPercentage?: number
  capacityLimitAmount?: number
  capacityUsageAmount?: number
  startAt?: string
  endAt?: string
}
  thirdShiftAhead?: {
  amountPercentage?: number
  capacityLimitAmount?: number
  capacityUsageAmount?: number
  startAt?: string
  endAt?: string
}
}

export type CapacityConfigurationRequest = {
  capacityType?: "FIXED" | "UNLIMITED"
  capacityUnit?: "ORDERS" | "ORDER_ITEMS"
  fullCapacityAction?: "PAUSE" | "MOVE_TO_NEXT_SHIFT"
  maxIncreasePromise?: {
  amount?: number
}
  dayCapacity?: {
  MONDAY?: number
  TUESDAY?: number
  WEDNESDAY?: number
  THURSDAY?: number
  FRIDAY?: number
  SATURDAY?: number
  SUNDAY?: number
  HOLIDAYS_AND_EXCEPTIONS?: number
}
}

export type CapacityConfigurationResponse = {
  id?: number
  capacityType?: "FIXED" | "UNLIMITED"
  capacityUnit?: "ORDERS" | "ORDER_ITEMS"
  fullCapacityAction?: "PAUSE" | "MOVE_TO_NEXT_SHIFT"
  taskId?: number
  locationTask?: Record<string, unknown>
  capacityShifts?: {
  id?: number
  capacityAmount?: number
  capacityRuleId?: number
  timeStart?: string
  timeEnd?: string
  weekDay?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | "HOLIDAYS_AND_EXCEPTIONS"
}[]
  additionalInfo?: {
  maxIncreasePromise?: {
  amount?: number
  unit?: "DAYS" | "WEEKS"
}
}
}

export type CapacityDetail = {
  amountPercentage?: number
  capacityLimitAmount?: number
  capacityUsageAmount?: number
  startAt?: string
  endAt?: string
}

export type Location = {
  id?: string
  name?: string
  status?: "ACTIVE" | "MANUALLY_PAUSED" | "PAUSED"
  timeZone?: string
  vtexAccountName?: string
  vtexAccount?: {
  id?: string
  name?: string
  companyName?: string
  ownerAccountName?: string
}
  locationTasks?: Record<string, unknown>[]
  address?: {
  formattedAddress?: string
  country?: string
  administrativeAreaLevel1?: string
  administrativeAreaLevel2?: string
  postalCode?: string
  geoLocation?: {
  latitude?: number
  longitude?: number
}
}
}

export type LocationsList = {
  hasNextPage?: boolean
  data?: {
  id?: string
  name?: string
  status?: "ACTIVE" | "MANUALLY_PAUSED" | "PAUSED"
  timeZone?: string
  vtexAccountName?: string
  segmentationType?: "SALES_CHANNEL" | null
  vtexAccount?: {
  id?: string
  name?: string
  companyName?: string
  ownerAccountName?: string
}
  locationTasks?: {
  id?: number
  locationId?: string
  segmentationGroupId?: string
  location?: Location
  capacityRule?: CapacityConfigurationResponse
  locationCapacity?: LocationCapacity
}[]
  segmentationGroups?: {
  id?: string
  name?: string
}[]
  address?: {
  id?: number
  locationId?: string
  formattedAddress?: string
  route?: string
  streetNumber?: string
  premise?: string
  subPremise?: string
  locality?: string
  subLocalityLevel1?: string
  subLocalityLevel2?: string
  subLocalityLevel3?: string
  country?: string
  administrativeAreaLevel1?: string
  administrativeAreaLevel2?: string
  administrativeAreaLevel3?: string
  postalCode?: string
  geoLocationLatitude?: number
  geoLocationLongitude?: number
  geoLocation?: {
  latitude?: number
  longitude?: number
}
}
  isSegmented?: boolean
}[]
}

export type UpdateLocationStatusRequest = {
  status: "ACTIVE" | "MANUALLY_PAUSED"
}
