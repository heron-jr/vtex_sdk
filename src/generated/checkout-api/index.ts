import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { OrderForm, OrderFormSimulationRequest, Item, PriceChangeRequest, SetsinglecustomfieldvalueRequest, UpdateorderFormconfigurationRequest, PaymentConfiguration, WaitingTime } from './types.js'

class CheckoutApi_shoppingCart {
  constructor(private http: VtexHttpClient) {}

  async cartSimulation(params: {
  RnbBehavior?: number
  sc?: number
  individualShippingEstimates?: boolean
  body: {
  items?: {
  id: string
  quantity: number
  seller: string
}[]
  country?: string
  postalCode?: string
  geoCoordinates?: number[]
  allowedOutdatedData?: ("inventoryData" | "deliveryData" | "promotionData" | "paymentData" | "taxData")[]
}
}, opts?: CallOptions): Promise<{
  items?: {
  id?: string
  requestIndex?: number
  quantity?: number
  seller?: string
  sellerChain?: string[]
  tax?: number
  taxCode?: string
  priceValidUntil?: string
  price?: number
  listPrice?: number
  rewardValue?: number
  sellingPrice?: number
  offerings?: {
  type?: string
  id?: string
  name?: string
  allowGiftMessage?: boolean
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  price?: number
}[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  measurementUnit?: string
  unitMultiplier?: number
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  availability?: string
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  paymentData?: {
  installmentOptions?: {
  paymentSystem?: number
  bin?: string | null
  paymentName?: string | null
  paymentGroupName?: string | null
  value?: number
  installments?: {
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
  sellerMerchantInstallments?: Record<string, unknown>[]
}[]
}[]
  paymentSystems?: {
  id?: number
  name?: string
  groupName?: string
  validator?: Record<string, unknown> | null
  stringId?: string
  template?: string
  requiresDocument?: boolean
  displayDocument?: boolean
  isCustom?: boolean
  description?: string
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: string | null
}[]
  payments?: {
  paymentSystem?: number
  paymentSystemName?: string
  group?: string
  installments?: number
  installmentsInterestRate?: number
  installmentsValue?: number
  value?: number
  referenceValue?: number
  hasDefaultBillingAddress?: boolean
}[]
  giftCards?: string[]
  giftCardMessages?: string[]
  availableAccounts?: string[]
  availableTokens?: string[]
  availableAssociations?: Record<string, unknown>
}
  selectableGifts?: string[]
  marketingData?: Record<string, unknown> | null
  postalCode?: string | null
  country?: string
  logisticsInfo?: {
  itemIndex?: number
  addressId?: string | null
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  quantity?: number
  shipsTo?: string[]
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  availableDeliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: Record<string, unknown> | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  deliveryChannels?: {
  id?: string
}[]
  messages?: string[]
  purchaseConditions?: {
  itemPurchaseConditions?: {
  id?: string
  seller?: string
  sellerChain?: string[]
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  availableDeliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: Record<string, unknown> | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  price?: number
  listPrice?: number
}[]
}
  pickupPoints?: string[]
  subscriptionData?: Record<string, unknown> | null
  totals?: {
  id?: string
  name?: string
  value?: number
}[]
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  assemblyOptions?: string[]
}[]
}
}[]
}> {
    return this.http.request<{
  items?: {
  id?: string
  requestIndex?: number
  quantity?: number
  seller?: string
  sellerChain?: string[]
  tax?: number
  taxCode?: string
  priceValidUntil?: string
  price?: number
  listPrice?: number
  rewardValue?: number
  sellingPrice?: number
  offerings?: {
  type?: string
  id?: string
  name?: string
  allowGiftMessage?: boolean
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  price?: number
}[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  measurementUnit?: string
  unitMultiplier?: number
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  availability?: string
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  paymentData?: {
  installmentOptions?: {
  paymentSystem?: number
  bin?: string | null
  paymentName?: string | null
  paymentGroupName?: string | null
  value?: number
  installments?: {
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
  sellerMerchantInstallments?: Record<string, unknown>[]
}[]
}[]
  paymentSystems?: {
  id?: number
  name?: string
  groupName?: string
  validator?: Record<string, unknown> | null
  stringId?: string
  template?: string
  requiresDocument?: boolean
  displayDocument?: boolean
  isCustom?: boolean
  description?: string
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: string | null
}[]
  payments?: {
  paymentSystem?: number
  paymentSystemName?: string
  group?: string
  installments?: number
  installmentsInterestRate?: number
  installmentsValue?: number
  value?: number
  referenceValue?: number
  hasDefaultBillingAddress?: boolean
}[]
  giftCards?: string[]
  giftCardMessages?: string[]
  availableAccounts?: string[]
  availableTokens?: string[]
  availableAssociations?: Record<string, unknown>
}
  selectableGifts?: string[]
  marketingData?: Record<string, unknown> | null
  postalCode?: string | null
  country?: string
  logisticsInfo?: {
  itemIndex?: number
  addressId?: string | null
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  quantity?: number
  shipsTo?: string[]
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  availableDeliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: Record<string, unknown> | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  deliveryChannels?: {
  id?: string
}[]
  messages?: string[]
  purchaseConditions?: {
  itemPurchaseConditions?: {
  id?: string
  seller?: string
  sellerChain?: string[]
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  availableDeliveryWindows?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: Record<string, unknown> | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  price?: number
  listPrice?: number
}[]
}
  pickupPoints?: string[]
  subscriptionData?: Record<string, unknown> | null
  totals?: {
  id?: string
  name?: string
  value?: number
}[]
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  assemblyOptions?: string[]
}[]
}
}[]
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForms/simulation`, query: { 'RnbBehavior': params.RnbBehavior, 'sc': params.sc, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async createANewCart(params: {
  forceNewCart?: boolean
  individualShippingEstimates?: boolean
} = {}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'GET', path: `/api/checkout/pub/orderForm`, query: { 'forceNewCart': params.forceNewCart, 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async getCartInformationById(params: {
  orderFormId: string
  refreshOutdatedData?: boolean
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'GET', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}`, query: { 'refreshOutdatedData': params.refreshOutdatedData, 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async removeAllItems(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: Record<string, unknown>
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items/removeAll`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async removeallpersonaldata(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/checkout/changeToAnonymousUser/${encodePathParam(params.orderFormId)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async itemsUpdate(params: {
  orderFormId: string
  allowedOutdatedData?: string[]
  individualShippingEstimates?: boolean
  body: {
  orderItems?: {
  quantity?: number
  index?: number
}[]
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items/update`, query: { 'allowedOutdatedData': params.allowedOutdatedData, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async items(params: {
  orderFormId: string
  allowedOutdatedData?: string[]
  individualShippingEstimates?: boolean
  body: {
  orderItems?: {
  quantity: number
  seller: string
  id: string
  index: number
  price?: number
}[]
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items`, query: { 'allowedOutdatedData': params.allowedOutdatedData, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async itemsHandle(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  orderItems?: {
  id: string
  quantity: number
  seller: string
  index?: number
  price?: number
  attachments?: {
  name?: string
  content?: {
  content?: string
} | null
}[]
  noSplitItem?: boolean
  allowedOutdatedData?: string[]
}[]
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PATCH', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async priceChange(params: {
  orderFormId: string
  itemIndex: string
  individualShippingEstimates?: boolean
  body: PriceChangeRequest
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PUT', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items/${encodePathParam(params.itemIndex)}/price`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async deleteApiCheckoutPubOrderFormByOrderFormIdItemsByItemIndexPrice(params: {
  orderFormId: string
  itemIndex: string
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>(withCall({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items/${encodePathParam(params.itemIndex)}/price`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async ignoreProfileData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  ignoreProfileData?: boolean
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PATCH', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/profile`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async getCartInstallments(params: {
  orderFormId: string
  paymentSystem: number
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<{
  bin?: string | null
  installments?: {
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
  sellerMerchantInstallments?: {
  id?: string
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
}[]
}[]
  paymentSystem?: number
  value?: number
  paymentName?: string | null
  paymentGroupName?: string | null
}> {
    return this.http.request<{
  bin?: string | null
  installments?: {
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
  sellerMerchantInstallments?: {
  id?: string
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
}[]
}[]
  paymentSystem?: number
  value?: number
  paymentName?: string | null
  paymentGroupName?: string | null
}>(withCall({ method: 'GET', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/installments`, query: { 'paymentSystem': params.paymentSystem, 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async addCoupons(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  text?: string
}
}, opts?: CallOptions): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string | null
  name?: string
  skuName?: string
  modalType?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string | null
  brandName?: string
  brandId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  preSaleDate?: string | null
  productCategoryIds?: string
  productCategories?: {
  [key: string]: string
}
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  attachments?: string[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  selectableGifts?: string[]
  totalizers?: Record<string, unknown>[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
} | null
  clientProfileData?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
} | null
  paymentData?: {
  giftCards?: ({
  redemptionCode?: string
  value?: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
} | null)[]
  transactions?: ({
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string
  bin?: string | null
  installments?: number
  paymentSystem?: number
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
} | null)[]
}
  marketingData?: {
  coupon?: string
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmiPage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
} | null
  sellers?: ({
  id?: string
  name?: string
  logo?: string | null
} | null)[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown> | null
  openTextField?: string | null
  invoiceData?: {
  address?: {
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
}
  customData?: Record<string, unknown> | null
  itemMetadata?: {
  items?: ({
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
} | null)[]
}
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}> {
    return this.http.request<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string | null
  name?: string
  skuName?: string
  modalType?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string | null
  brandName?: string
  brandId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  preSaleDate?: string | null
  productCategoryIds?: string
  productCategories?: {
  [key: string]: string
}
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  attachments?: string[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  selectableGifts?: string[]
  totalizers?: Record<string, unknown>[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
} | null
  clientProfileData?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
} | null
  paymentData?: {
  giftCards?: ({
  redemptionCode?: string
  value?: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
} | null)[]
  transactions?: ({
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string
  bin?: string | null
  installments?: number
  paymentSystem?: number
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
} | null)[]
}
  marketingData?: {
  coupon?: string
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmiPage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
} | null
  sellers?: ({
  id?: string
  name?: string
  logo?: string | null
} | null)[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown> | null
  openTextField?: string | null
  invoiceData?: {
  address?: {
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
}
  customData?: Record<string, unknown> | null
  itemMetadata?: {
  items?: ({
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
} | null)[]
}
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/coupons`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }
}
class CheckoutApi_cartAttachments {
  constructor(private http: VtexHttpClient) {}

  async getClientProfileByEmail(params: {
  email: string
  ensureComplete?: boolean
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<{
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  userProfile?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  document?: string
  documentType?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean | null
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
}
  isComplete?: boolean
}> {
    return this.http.request<{
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  userProfile?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  document?: string
  documentType?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean | null
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
}
  isComplete?: boolean
}>(withCall({ method: 'GET', path: `/api/checkout/pub/profiles`, query: { 'email': params.email, 'ensureComplete': params.ensureComplete, 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async addClientProfile(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  email: string | null
  firstName: string | null
  lastName: string
  documentType: string
  document: string
  phone?: string
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  stateInscription?: string
  corporatePhone?: string
  isCorporate?: boolean
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/clientProfileData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async addShippingAddress(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  clearAddressIfPostalCodeNotFound?: boolean
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string
  geoCoordinates?: number[]
}[]
  logisticsInfo?: {
  itemIndex?: number
  selectedDeliveryChannel?: string | null
  selectedSla?: string | null
}[]
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/shippingData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async addClientPreferences(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  locale?: string
  optinNewsLetter?: boolean | null
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/clientPreferencesData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async addMarketingData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  coupon?: string
  marketingTags?: string[]
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/marketingData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async addPaymentData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  payments?: {
  paymentSystem?: number
  paymentSystemName?: string
  group?: string
  installments?: number
  installmentsInterestRate?: number
  installmentsValue?: number
  value?: number
  referenceValue?: number
  hasDefaultBillingAddress?: boolean
}[]
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/paymentData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async postApiCheckoutPubOrderFormByOrderFormIdItemsByItemIndexAttachmentsByAttachmentName(params: {
  orderFormId: string
  itemIndex: string
  attachmentName: string
  individualShippingEstimates?: boolean
  body: {
  content: {
  [key: string]: unknown
}
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items/${encodePathParam(params.itemIndex)}/attachments/${encodePathParam(params.attachmentName)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async deleteApiCheckoutPubOrderFormByOrderFormIdItemsByItemIndexAttachmentsByAttachmentName(params: {
  orderFormId: string
  itemIndex: string
  attachmentName: string
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items/${encodePathParam(params.itemIndex)}/attachments/${encodePathParam(params.attachmentName)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async postApiCheckoutPubOrderFormByOrderFormIdAttachmentsSubscriptionData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  subscriptions: {
  itemIndex: number
  plan: {
  frequency: {
  interval: number
  periodicity: string
}
  validity?: {
  begin?: string
  end?: string
}
  type: string
}
}[]
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/subscriptionData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async deleteApiCheckoutPubOrderFormByOrderFormIdAttachmentsSubscriptionData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  subscriptions: Record<string, unknown>[]
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/subscriptionData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async addMerchantContextData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  salesAssociateData: {
  salesAssociateId?: string
}
}
}, opts?: CallOptions): Promise<{
  salesAssociateId?: string
}> {
    return this.http.request<{
  salesAssociateId?: string
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/merchantContextData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async postApiCheckoutPubOrderFormByOrderFormIdAttachmentsInvoiceData(params: {
  orderFormId: string
  body: {
  address: {
  addressType?: string
  city?: string
  complement?: string
  country?: string
  geoCoordinates: number[]
  neighborhood?: string
  number?: string
  postalCode: string
  reference?: string
  state?: string
  street?: string
}
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/invoiceData`, body: params.body }, opts))
  }
}
class CheckoutApi_customData {
  constructor(private http: VtexHttpClient) {}

  async setMultipleCustomFieldValues(params: {
  orderFormId: string
  appId: string
  individualShippingEstimates?: boolean
  body: {
  [key: string]: unknown
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PUT', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customData/${encodePathParam(params.appId)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async setSingleCustomFieldValue(params: {
  orderFormId: string
  appId: string
  appFieldName: string
  individualShippingEstimates?: boolean
  body: SetsinglecustomfieldvalueRequest
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PUT', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customData/${encodePathParam(params.appId)}/${encodePathParam(params.appFieldName)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async removesinglecustomfieldvalue(params: {
  orderFormId: string
  appId: string
  appFieldName: string
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customData/${encodePathParam(params.appId)}/${encodePathParam(params.appFieldName)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async putApiCheckoutPubOrderFormByOrderFormIdCustomFields(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  linkedEntity: {
  type: "order" | "item" | "address"
  id?: string
}
  fields: {
  name: string
  value: string
  refId?: string
}[]
}[]
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PUT', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customFields`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async putApiCheckoutPubOrderFormByOrderFormIdCustomFieldsOrder(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  name: string
  value: string
  refId?: string
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PUT', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customFields/order`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async putApiCheckoutPubOrderFormByOrderFormIdCustomFieldsItemByItemId(params: {
  orderFormId: string
  itemId: string
  individualShippingEstimates?: boolean
  body: {
  name: string
  value: string
  refId?: string
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PUT', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customFields/item/${encodePathParam(params.itemId)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async deleteApiCheckoutPubOrderFormByOrderFormIdCustomFieldsItemByItemId(params: {
  orderFormId: string
  itemId: string
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customFields/item/${encodePathParam(params.itemId)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async putApiCheckoutPubOrderFormByOrderFormIdCustomFieldsAddressByAddressId(params: {
  orderFormId: string
  addressId: string
  individualShippingEstimates?: boolean
  body: {
  name: string
  value: string
  refId?: string
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'PUT', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/customFields/address/${encodePathParam(params.addressId)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }
}
class CheckoutApi_configuration {
  constructor(private http: VtexHttpClient) {}

  async getorderFormconfiguration(params: {
  individualShippingEstimates?: boolean
} = {}, opts?: CallOptions): Promise<{
  paymentConfiguration?: {
  requiresAuthenticationForPreAuthorizedPaymentOption?: boolean
  allowInstallmentsMerge?: boolean
}
  taxConfiguration?: {
  url?: string | null
  authorizationHeader?: string | null
  appId?: string
  isMarketplaceResponsibleForTaxes?: boolean
} | null
  minimumQuantityAccumulatedForItems?: number
  decimalDigitsPrecision?: number
  minimumValueAccumulated?: number | null
  apps?: {
  id?: string
  fields?: string[]
  major?: number
}[] | null
  allowMultipleDeliveries?: boolean | null
  allowManualPrice?: boolean | null
  savePersonalDataAsOptIn?: boolean | null
  maxNumberOfWhiteLabelSellers?: number | null
  maskFirstPurchaseData?: boolean | null
  recaptchaValidation?: string
}> {
    return this.http.request<{
  paymentConfiguration?: {
  requiresAuthenticationForPreAuthorizedPaymentOption?: boolean
  allowInstallmentsMerge?: boolean
}
  taxConfiguration?: {
  url?: string | null
  authorizationHeader?: string | null
  appId?: string
  isMarketplaceResponsibleForTaxes?: boolean
} | null
  minimumQuantityAccumulatedForItems?: number
  decimalDigitsPrecision?: number
  minimumValueAccumulated?: number | null
  apps?: {
  id?: string
  fields?: string[]
  major?: number
}[] | null
  allowMultipleDeliveries?: boolean | null
  allowManualPrice?: boolean | null
  savePersonalDataAsOptIn?: boolean | null
  maxNumberOfWhiteLabelSellers?: number | null
  maskFirstPurchaseData?: boolean | null
  recaptchaValidation?: string
}>(withCall({ method: 'GET', path: `/api/checkout/pvt/configuration/orderForm`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async createorderFormconfiguration(params: {
  individualShippingEstimates?: boolean
  body: UpdateorderFormconfigurationRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/checkout/pvt/configuration/orderForm`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async updateorderFormconfiguration(params: {
  individualShippingEstimates?: boolean
  body: UpdateorderFormconfigurationRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PATCH', path: `/api/checkout/pvt/configuration/orderForm`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async getWindowToChangeSeller(params: {
  individualShippingEstimates?: boolean
} = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/checkout/pvt/configuration/window-to-change-seller`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async updateWindowToChangeSeller(params: {
  individualShippingEstimates?: boolean
  body: WaitingTime
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/checkout/pvt/configuration/window-to-change-seller`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async clearorderFormMessages(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: Record<string, unknown>
}, opts?: CallOptions): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string | null
  name?: string
  skuName?: string
  modalType?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string | null
  brandName?: string
  brandId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  preSaleDate?: string | null
  productCategoryIds?: string
  productCategories?: {
  [key: string]: string
}
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  attachments?: string[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  selectableGifts?: string[]
  totalizers?: Record<string, unknown>[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
} | null
  clientProfileData?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
} | null
  paymentData?: {
  giftCards?: {
  redemptionCode?: string
  value?: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string | null
  bin?: string | null
  installments?: number
  paymentSystem?: number
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
}[]
}
  marketingData?: {
  coupon?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
} | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
  minimumOrderValue?: number | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean | null
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown> | null
  openTextField?: string | null
  invoiceData?: Record<string, unknown> | null
  customData?: Record<string, unknown> | null
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}> {
    return this.http.request<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string | null
  name?: string
  skuName?: string
  modalType?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string | null
  brandName?: string
  brandId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  preSaleDate?: string | null
  productCategoryIds?: string
  productCategories?: {
  [key: string]: string
}
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  attachments?: string[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  selectableGifts?: string[]
  totalizers?: Record<string, unknown>[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  attachmentOfferings?: {
  name: string | null
  required: boolean | null
  schema: Record<string, unknown> | null
}[] | null
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
} | null
  clientProfileData?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
} | null
  paymentData?: {
  giftCards?: {
  redemptionCode?: string
  value?: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string | null
  bin?: string | null
  installments?: number
  paymentSystem?: number
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
}[]
}
  marketingData?: {
  coupon?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string | null
  utmiPart?: string | null
  utmiCampaign?: string | null
} | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
  minimumOrderValue?: number | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean | null
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown> | null
  openTextField?: string | null
  invoiceData?: Record<string, unknown> | null
  customData?: Record<string, unknown> | null
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/messages/clear`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }
}
class CheckoutApi_fulfillment {
  constructor(private http: VtexHttpClient) {}

  async listPickupPpointsByLocation(params: {
  geoCoordinates?: string
  postalCode?: string
  countryCode?: string
  individualShippingEstimates?: boolean
} = {}, opts?: CallOptions): Promise<{
  paging?: {
  page?: number
  pageSize?: number
  total?: number
  pages?: number
}
  items?: {
  distance?: number
  pickupPoint?: {
  friendlyName?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string
  geoCoordinates?: number[]
}
  additionalInfo?: string
  id?: string
  businessHours?: {
  DayOfWeek?: number
  OpeningTime?: string
  ClosingTime?: string
}[]
}
}[]
}> {
    return this.http.request<{
  paging?: {
  page?: number
  pageSize?: number
  total?: number
  pages?: number
}
  items?: {
  distance?: number
  pickupPoint?: {
  friendlyName?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string
  geoCoordinates?: number[]
}
  additionalInfo?: string
  id?: string
  businessHours?: {
  DayOfWeek?: number
  OpeningTime?: string
  ClosingTime?: string
}[]
}
}[]
}>(withCall({ method: 'GET', path: `/api/checkout/pub/pickup-points`, query: { 'geoCoordinates': params.geoCoordinates, 'postalCode': params.postalCode, 'countryCode': params.countryCode, 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }

  async getAddressByPostalCode(params: {
  countryCode: string
  postalCode: string
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<{
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string
  geoCoordinates?: number[]
}> {
    return this.http.request<{
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string
  geoCoordinates?: number[]
}>(withCall({ method: 'GET', path: `/api/checkout/pub/postal-code/${encodePathParam(params.countryCode)}/${encodePathParam(params.postalCode)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }
}
class CheckoutApi_orderPlacement {
  constructor(private http: VtexHttpClient) {}

  async placeOrderFromExistingOrderForm(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  referenceId: string
  savePersonalData?: boolean
  optinNewsLetter?: boolean | null
  value: number
  referenceValue: number
  interestValue: number
}
}, opts?: CallOptions): Promise<OrderForm> {
    return this.http.request<OrderForm>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/transaction`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async placeOrder(params: {
  sc?: number
  individualShippingEstimates?: boolean
  body: {
  items: {
  id: string
  quantity: number
  seller: string
  commission?: number
  freightCommission?: number
  price?: number
  bundleItems?: {
  type?: string
  id?: string
  name?: string
  price?: number
}[]
  itemAttachment?: {
  name?: string
  content?: string
}
  attachments?: string[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  measurementUnit?: string
  unitMultiplier?: number
  isGift?: boolean
}[]
  clientProfileData: {
  email: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  stateInscription?: string
  corporatePhone?: string
  isCorporate?: boolean
} | null
  shippingData: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string
  geoCoordinates?: number[]
} | null
  logisticsInfo?: {
  itemIndex: number
  selectedSla: string | null
  selectedDeliveryChannel?: string | null
  lockTTL?: string | null
  shippingEstimate?: string
  price: number
  deliveryWindow?: {
  startDateUtc?: string
  endDateUtc?: string
  price?: number
  lisPrice?: number
  tax?: number
}
}[]
  updateStatus?: string
} | null
  paymentData: {
  giftCards?: {
  redemptionCode: string
  value: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  giftCardMessages?: string[]
  paymentSystems?: {
  id?: number
  name?: string
  groupName?: string
  validator?: {
  regex?: string
  mask?: string
  cardCodeRegex?: string
  cardCodeMask?: string
  weights?: number[]
}
  stringId?: string
  template?: string
  requiresDocument?: boolean
  selected?: boolean
  isCustom?: boolean
  description?: string
}[]
  payments: {
  accountId?: string
  bin?: string | null
  installments: number
  paymentSystem: number
  referenceValue: number
  value: number
}[]
  updateStatus?: string
}
  marketingData?: {
  coupon?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
} | null
  openTextField?: string
  salesAssociateData?: {
  salesAssociateId?: string
}
}
}, opts?: CallOptions): Promise<{
  orderForm?: string | null
  transactionData?: {
  merchantTransactions?: {
  id?: string
  transactionId?: string
  merchantName?: string
  payments?: {
  paymentSystem?: number
  bin?: string | null
  accountId?: string | null
  tokenId?: string | null
  value?: number
  referenceValue?: number
  giftCardRedemptionCode?: string | null
  giftCardProvider?: string | null
  giftCardId?: string | null
}[]
}[]
  receiverUri?: string
  gatewayCallbackTemplatePath?: string
}
  orders?: {
  orderId?: string
  orderGroup?: string
  state?: string | null
  isCheckedIn?: boolean
  sellerOrderId?: string | null
  storeId?: string | null
  checkedInPickupPointId?: string | null
  value?: number
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string | null
  name?: string
  skuName?: string
  modalType?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string | null
  brandName?: string
  brandId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  preSaleDate?: string | null
  productCategoryIds?: string
  productCategories?: {
  [key: string]: string
}
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  attachments?: string[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
  minimumOrderValue?: number | null
}[]
  totals?: {
  id?: string
  name?: string
  value?: number
}[]
  clientProfileData?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
} | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
}
  paymentData?: {
  giftCards?: {
  redemptionCode?: string
  value?: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string
  bin?: string | null
  installments?: number
  paymentSystem?: number
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
}[]
}
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
}[]
}
  salesChannel?: string
  followUpEmail?: string
  creationDate?: string
  lastChange?: string
  timeZoneCreationDate?: string
  timeZoneLastChange?: string
  isCompleted?: boolean
  hostName?: string
  merchantName?: string | null
  userType?: string
  roundingError?: number
  allowEdition?: boolean
  allowCancelation?: boolean
  allowChangeSeller?: boolean
  isUserDataVisible?: boolean
  orderFormCreationDate?: string
  salesAssociateId?: string
}[]
}> {
    return this.http.request<{
  orderForm?: string | null
  transactionData?: {
  merchantTransactions?: {
  id?: string
  transactionId?: string
  merchantName?: string
  payments?: {
  paymentSystem?: number
  bin?: string | null
  accountId?: string | null
  tokenId?: string | null
  value?: number
  referenceValue?: number
  giftCardRedemptionCode?: string | null
  giftCardProvider?: string | null
  giftCardId?: string | null
}[]
}[]
  receiverUri?: string
  gatewayCallbackTemplatePath?: string
}
  orders?: {
  orderId?: string
  orderGroup?: string
  state?: string | null
  isCheckedIn?: boolean
  sellerOrderId?: string | null
  storeId?: string | null
  checkedInPickupPointId?: string | null
  value?: number
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string | null
  name?: string
  skuName?: string
  modalType?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number | null
  manualPriceAppliedBy?: string | null
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string | null
  brandName?: string
  brandId?: string
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  preSaleDate?: string | null
  productCategoryIds?: string
  productCategories?: {
  [key: string]: string
}
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  bundleItems?: {
  type?: string
  id?: number
  name?: string
  price?: number
}[]
  attachments?: string[]
  priceTags?: {
  identifier?: string | null
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string | null
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
}
}[]
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
  minimumOrderValue?: number | null
}[]
  totals?: {
  id?: string
  name?: string
  value?: number
}[]
  clientProfileData?: {
  email?: string | null
  firstName?: string | null
  lastName?: string
  documentType?: string
  document?: string
  phone?: string
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
} | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: {
  id?: string
  deliveryChannel?: string
  name?: string
  deliveryIds?: {
  courierId?: string
  warehouseId?: string
  dockId?: string
  courierName?: string
  quantity?: number
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string | null
  useIndividualShippingEstimates?: boolean
  lockTTL?: string | null
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string | null
  address?: {
  addressType?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
} | null
  additionalInfo?: string | null
  dockId?: string | null
}
  pickupPointId?: string | null
  pickupDistance?: number
  polygonName?: string | null
  transitTime?: string
}[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string | null
  isDisposable?: boolean
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string | null
  reference?: string | null
  geoCoordinates?: number[]
}[]
}
  paymentData?: {
  giftCards?: {
  redemptionCode?: string
  value?: number
  balance?: number
  name?: string
  id?: string
  inUse?: boolean
  isSpecialCard?: boolean
}[]
  transactions?: {
  isActive?: boolean
  transactionId?: string
  merchantName?: string
  payments?: {
  accountId?: string
  bin?: string | null
  installments?: number
  paymentSystem?: number
  referenceValue?: number
  value?: number
}[]
  sharedTransaction?: boolean
}[]
}
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string | null
  imageUrl?: string
  detailUrl?: string
}[]
}
  salesChannel?: string
  followUpEmail?: string
  creationDate?: string
  lastChange?: string
  timeZoneCreationDate?: string
  timeZoneLastChange?: string
  isCompleted?: boolean
  hostName?: string
  merchantName?: string | null
  userType?: string
  roundingError?: number
  allowEdition?: boolean
  allowCancelation?: boolean
  allowChangeSeller?: boolean
  isUserDataVisible?: boolean
  orderFormCreationDate?: string
  salesAssociateId?: string
}[]
}>(withCall({ method: 'PUT', path: `/api/checkout/pub/orders`, query: { 'sc': params.sc, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body }, opts))
  }

  async processOrder(params: {
  orderGroup: string
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/checkout/pub/gatewayCallback/${encodePathParam(params.orderGroup)}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }
}
class CheckoutApi_region {
  constructor(private http: VtexHttpClient) {}

  async getSellersByRegion(params: {
  regionId: string
  country: string
  postalCode?: string
  geoCoordinates?: number[]
  individualShippingEstimates?: boolean
}, opts?: CallOptions): Promise<{
  id?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
}> {
    return this.http.request<{
  id?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
}>(withCall({ method: 'GET', path: `/api/checkout/pub/regions/${encodePathParam(params.regionId)}`, query: { 'country': params.country, 'postalCode': params.postalCode, 'geoCoordinates': params.geoCoordinates, 'individualShippingEstimates': params.individualShippingEstimates } }, opts))
  }
}

export class CheckoutApi {
  readonly shoppingCart: CheckoutApi_shoppingCart
  readonly cartAttachments: CheckoutApi_cartAttachments
  readonly customData: CheckoutApi_customData
  readonly configuration: CheckoutApi_configuration
  readonly fulfillment: CheckoutApi_fulfillment
  readonly orderPlacement: CheckoutApi_orderPlacement
  readonly region: CheckoutApi_region
  constructor(http: VtexHttpClient) {
    this.shoppingCart = new CheckoutApi_shoppingCart(http)
    this.cartAttachments = new CheckoutApi_cartAttachments(http)
    this.customData = new CheckoutApi_customData(http)
    this.configuration = new CheckoutApi_configuration(http)
    this.fulfillment = new CheckoutApi_fulfillment(http)
    this.orderPlacement = new CheckoutApi_orderPlacement(http)
    this.region = new CheckoutApi_region(http)
  }
}
