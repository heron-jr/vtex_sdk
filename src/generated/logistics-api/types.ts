export type PickupPoint = {
  id?: string
  name?: string
  description?: string
  instructions?: string
  formatted_address?: string | null
  address?: {
  postalCode?: string
  country?: {
  acronym?: string
  name?: string
}
  city?: string
  state?: string
  neighborhood?: string
  street?: string
  number?: string
  complement?: string
  reference?: string
  location?: {
  latitude?: number
  longitude?: number
}
}
  isActive?: boolean
  distance?: number
  seller?: string
  _sort?: number[]
  businessHours?: {
  dayOfWeek?: number
  openingTime?: string
  closingTime?: string
}[]
  tagsLabel?: string[]
  pickupHolidays?: {
  date?: string
  hourBegin?: string
  hourEnd?: string
}[]
  isThirdPartyPickup?: boolean
  accountOwnerName?: string
  accountOwnerId?: string
  parentAccountName?: string
  originalId?: string | null
}

export type ListDocksById = {
  pickupStoreInfo?: {
  isPickupStore?: boolean | null
  storeId?: string | null
  friendlyName?: string | null
  address?: {
  postalCode?: string
  country?: {
  acronym?: string
  name?: string
}
  city?: string
  state?: string
  neighborhood?: string
  street?: string
  number?: string
  complement?: string | null
  reference?: string | null
  location?: {
  latitude?: number
  longitude?: number
}
} | null
  additionalInfo?: string | null
  dockId?: string | null
  distance?: number | null
  businessHours?: string | null
  pickupHolidays?: string | null
  sellerId?: string | null
  isThirdPartyPickup?: boolean
}
  storeId?: string | null
  pickupInStoreInfo?: {
  isActice?: boolean
  additionalInfo?: string | null
}
  deliveryFromStoreInfo?: {
  isActice?: boolean
  deliveryRadius?: number
  deliveryFee?: number
  deliveryTime?: string
  maximumWeight?: number
}
  address?: {
  postalCode?: string
  country?: {
  acronym?: string
  name?: string
}
  city?: string
  state?: string
  neighborhood?: string
  street?: string
  number?: string
  complement?: string | null
  reference?: string | null
  location?: {
  latitude?: number
  longitude?: number
}
}
  location?: {
  zipCode?: string
  country?: string
  inStore?: {
  IsCheckedIn?: boolean
  StoreId?: string | null
}
} | null
  shippingRatesProviders?: string[] | null
  deliveryAgreementsIds?: string[] | null
  id?: string
  name?: string
  priority?: number
  dockTimeFake?: string
  timeFakeOverhead?: string
  salesChannels?: string[]
  salesChannel?: string
  freightTableIds?: string[]
  wmsEndPoint?: string | null
  isActive?: boolean
}

export type DeliveryCapacity = {
  id?: string
  resourceId?: string
  startDate?: string
  endDate?: string
  ownMaxCapacity?: number
  resourceMaxCapacity?: number
  reservedValue?: number
  reservations?: {
  id?: string
  value?: number
}[]
  log?: {
  when?: string
  who?: string
  why?: string
  what?: string
}[]
}

export type ShippingPolicy = {
  id?: string
  name?: string
  shippingMethod?: string
  weekendAndHolidays?: {
  saturday?: boolean
  sunday?: boolean
  holiday?: boolean
}
  maxDimension?: {
  largestMeasure?: number
  maxMeasureSum?: number
}
  numberOfItemsPerShipment?: number
  minimumValueAceptable?: number
  maximumValueAceptable?: number
  additionalTime?: string
  additionalPrice?: {
  method?: number
  value?: number
}
  deliveryScheduleSettings?: {
  useDeliverySchedule?: boolean
  maxRangeDelivery?: number
  dayOfWeekForDelivery?: {
  dayOfWeek?: number
  deliveryRanges?: {
  startTime?: string
  endTime?: string
  listPrice?: number
  deliveryCapacity?: {
  capacityType?: string
  maxValue?: number
}[] | null
}[]
}[]
  dayOfWeekBlockeds?: string[] | null
}
  carrierSchedule?: {
  dayOfWeek?: number
  timeLimit?: string
}[]
  cubicWeightSettings?: {
  volumetricFactor?: number
  minimunAcceptableVolumetricWeight?: number
}
  modalSettings?: {
  modals?: ("CHEMICALS" | "ELECTRONICS" | "FURNITURE" | "GLASS" | "LIQUID" | "MATTRESSES" | "REFRIGERATED" | "TIRES" | "WHITE_GOODS" | "FIREARMS")[]
  useOnlyItemsWithDefinedModal?: boolean
}
  businessHourSettings?: {
  carrierBusinessHours?: {
  openingTime?: string
  closingTime?: string
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}[]
  isOpenOutsideBusinessHours?: boolean
}
  pickupPointsSettings?: {
  pickupPointIds?: string[]
  pickupPointTags?: string[]
  sellers?: string[]
}
  processingStatus?: {
  status?: number
  errorMessage?: string | null
  errorsMetadata?: string | null
}
  deliveryChannel?: string
  calculationType?: number
  isActive?: boolean
  lastIndexedAt?: string | null
  shippingHoursSettings?: {
  shippingHours?: {
  dayOfWeek?: number
  openingTime?: string
  closingTime?: string
}[]
  acceptOrdersOutsideShippingHours?: boolean
}
  carrierInfo?: {
  carrierAccountName?: string
  deliveryAgreementId?: string | null
  linkedDocks?: {
  id?: string
  name?: string
}[]
  readyToUse?: boolean
}
}
