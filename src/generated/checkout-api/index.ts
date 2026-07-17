import type { VtexHttpClient } from '../../core/http.js'
import type { OrderForm, OrderFormSimulationRequest, Item, PriceChangeRequest, SetsinglecustomfieldvalueRequest, UpdateorderFormconfigurationRequest, PaymentConfiguration, WaitingTime } from './types.js'

class CheckoutApi_shoppingCart {
  constructor(private http: VtexHttpClient) {}

  cartSimulation(params: {
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
  allowedOutdatedData?: "inventoryData" | "deliveryData" | "promotionData" | "paymentData" | "taxData"[]
}
}): Promise<{
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  price?: number
}[]
  priceTags?: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  measurementUnit?: string
  unitMultiplier?: number
  parentItemIndex?: number
  parentAssemblyBinding?: string
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
  bin?: string
  paymentName?: string
  paymentGroupName?: string
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
  validator?: Record<string, unknown>
  stringId?: string
  template?: string
  requiresDocument?: boolean
  displayDocument?: boolean
  isCustom?: boolean
  description?: string
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: string
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
  marketingData?: Record<string, unknown>
  postalCode?: string
  country?: string
  logisticsInfo?: {
  itemIndex?: number
  addressId?: string
  selectedSla?: string
  selectedDeliveryChannel?: string
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
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
  friendlyName?: string
  address?: Record<string, unknown>
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
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
  friendlyName?: string
  address?: Record<string, unknown>
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
  transitTime?: string
}[]
  price?: number
  listPrice?: number
}[]
}
  pickupPoints?: string[]
  subscriptionData?: Record<string, unknown>
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  price?: number
}[]
  priceTags?: {
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  measurementUnit?: string
  unitMultiplier?: number
  parentItemIndex?: number
  parentAssemblyBinding?: string
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
  bin?: string
  paymentName?: string
  paymentGroupName?: string
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
  validator?: Record<string, unknown>
  stringId?: string
  template?: string
  requiresDocument?: boolean
  displayDocument?: boolean
  isCustom?: boolean
  description?: string
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: string
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
  marketingData?: Record<string, unknown>
  postalCode?: string
  country?: string
  logisticsInfo?: {
  itemIndex?: number
  addressId?: string
  selectedSla?: string
  selectedDeliveryChannel?: string
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
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
  friendlyName?: string
  address?: Record<string, unknown>
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
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
  friendlyName?: string
  address?: Record<string, unknown>
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
  transitTime?: string
}[]
  price?: number
  listPrice?: number
}[]
}
  pickupPoints?: string[]
  subscriptionData?: Record<string, unknown>
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
}>({ method: 'POST', path: `/api/checkout/pub/orderForms/simulation`, query: { 'RnbBehavior': params.RnbBehavior, 'sc': params.sc, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  createANewCart(params: {
  forceNewCart?: boolean
  individualShippingEstimates?: boolean
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'GET', path: `/api/checkout/pub/orderForm`, query: { 'forceNewCart': params.forceNewCart, 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  getCartInformationById(params: {
  orderFormId: string
  refreshOutdatedData?: boolean
  individualShippingEstimates?: boolean
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'GET', path: `/api/checkout/pub/orderForm/${params.orderFormId}`, query: { 'refreshOutdatedData': params.refreshOutdatedData, 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  removeAllItems(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: Record<string, unknown>
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items/removeAll`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  removeallpersonaldata(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/checkout/changeToAnonymousUser/${params.orderFormId}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  itemsUpdate(params: {
  orderFormId: string
  allowedOutdatedData?: string[]
  individualShippingEstimates?: boolean
  body: {
  orderItems?: {
  quantity?: number
  index?: number
}[]
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items/update`, query: { 'allowedOutdatedData': params.allowedOutdatedData, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  items(params: {
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
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items`, query: { 'allowedOutdatedData': params.allowedOutdatedData, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  itemsHandle(params: {
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
}
}[]
  noSplitItem?: boolean
  allowedOutdatedData?: string[]
}[]
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PATCH', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  priceChange(params: {
  orderFormId: string
  itemIndex: string
  individualShippingEstimates?: boolean
  body: PriceChangeRequest
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PUT', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items/${params.itemIndex}/price`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  deleteApiCheckoutPubOrderFormByOrderFormIdItemsByItemIndexPrice(params: {
  orderFormId: string
  itemIndex: string
  individualShippingEstimates?: boolean
}): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items/${params.itemIndex}/price`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  ignoreProfileData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  ignoreProfileData?: boolean
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PATCH', path: `/api/checkout/pub/orderForm/${params.orderFormId}/profile`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  getCartInstallments(params: {
  orderFormId: string
  paymentSystem: number
  individualShippingEstimates?: boolean
}): Promise<{
  bin?: string
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
  paymentName?: string
  paymentGroupName?: string
}> {
    return this.http.request<{
  bin?: string
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
  paymentName?: string
  paymentGroupName?: string
}>({ method: 'GET', path: `/api/checkout/pub/orderForm/${params.orderFormId}/installments`, query: { 'paymentSystem': params.paymentSystem, 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  addCoupons(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  text?: string
}
}): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  userType?: string
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string
  name?: string
  skuName?: string
  modalType?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string
  brandName?: string
  brandId?: string
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  preSaleDate?: string
  productCategoryIds?: string
  productCategories?: {
  "{ID}"?: string
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
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string
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
  addressId?: string
  isDisposable?: boolean
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
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string
  address?: {
  addressType?: string
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
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  addressId?: string
  isDisposable?: boolean
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
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
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
  bin?: string
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
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  commercialConditionData?: Record<string, unknown>
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown>
  openTextField?: string
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
  customData?: Record<string, unknown>
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown>
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown>
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
  storeId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  userType?: string
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string
  name?: string
  skuName?: string
  modalType?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string
  brandName?: string
  brandId?: string
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  preSaleDate?: string
  productCategoryIds?: string
  productCategories?: {
  "{ID}"?: string
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
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string
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
  addressId?: string
  isDisposable?: boolean
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
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string
  address?: {
  addressType?: string
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
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  addressId?: string
  isDisposable?: boolean
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
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
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
  bin?: string
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
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  commercialConditionData?: Record<string, unknown>
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown>
  openTextField?: string
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
  customData?: Record<string, unknown>
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown>
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown>
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/coupons`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }
}
class CheckoutApi_cartAttachments {
  constructor(private http: VtexHttpClient) {}

  getClientProfileByEmail(params: {
  email: string
  ensureComplete?: boolean
  individualShippingEstimates?: boolean
}): Promise<{
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  userProfile?: {
  email?: string
  firstName?: string
  lastName?: string
  document?: string
  documentType?: string
  phone?: string
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  stateInscription?: string
  corporatePhone?: string
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
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
  addressId?: string
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  userProfile?: {
  email?: string
  firstName?: string
  lastName?: string
  document?: string
  documentType?: string
  phone?: string
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  stateInscription?: string
  corporatePhone?: string
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
}
  isComplete?: boolean
}>({ method: 'GET', path: `/api/checkout/pub/profiles`, query: { 'email': params.email, 'ensureComplete': params.ensureComplete, 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  addClientProfile(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  email: string
  firstName: string
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
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/clientProfileData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  addShippingAddress(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  clearAddressIfPostalCodeNotFound?: boolean
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
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
}[]
  logisticsInfo?: {
  itemIndex?: number
  selectedDeliveryChannel?: string
  selectedSla?: string
}[]
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/shippingData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  addClientPreferences(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  locale?: string
  optinNewsLetter?: boolean
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/clientPreferencesData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  addMarketingData(params: {
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
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/marketingData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  addPaymentData(params: {
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
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/paymentData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  postApiCheckoutPubOrderFormByOrderFormIdItemsByItemIndexAttachmentsByAttachmentName(params: {
  orderFormId: string
  itemIndex: string
  attachmentName: string
  individualShippingEstimates?: boolean
  body: {
  content: Record<string, unknown>
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items/${params.itemIndex}/attachments/${params.attachmentName}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  deleteApiCheckoutPubOrderFormByOrderFormIdItemsByItemIndexAttachmentsByAttachmentName(params: {
  orderFormId: string
  itemIndex: string
  attachmentName: string
  individualShippingEstimates?: boolean
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items/${params.itemIndex}/attachments/${params.attachmentName}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  postApiCheckoutPubOrderFormByOrderFormIdAttachmentsSubscriptionData(params: {
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
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/subscriptionData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  deleteApiCheckoutPubOrderFormByOrderFormIdAttachmentsSubscriptionData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  subscriptions: Record<string, unknown>[]
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/subscriptionData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  addMerchantContextData(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  salesAssociateData: {
  salesAssociateId?: string
}
}
}): Promise<{
  salesAssociateId?: string
}> {
    return this.http.request<{
  salesAssociateId?: string
}>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/merchantContextData`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  postApiCheckoutPubOrderFormByOrderFormIdAttachmentsInvoiceData(params: {
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
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/invoiceData`, body: params.body })
  }
}
class CheckoutApi_customData {
  constructor(private http: VtexHttpClient) {}

  setMultipleCustomFieldValues(params: {
  orderFormId: string
  appId: string
  individualShippingEstimates?: boolean
  body: Record<string, unknown>
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PUT', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customData/${params.appId}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  setSingleCustomFieldValue(params: {
  orderFormId: string
  appId: string
  appFieldName: string
  individualShippingEstimates?: boolean
  body: SetsinglecustomfieldvalueRequest
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PUT', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customData/${params.appId}/${params.appFieldName}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  removesinglecustomfieldvalue(params: {
  orderFormId: string
  appId: string
  appFieldName: string
  individualShippingEstimates?: boolean
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customData/${params.appId}/${params.appFieldName}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  putApiCheckoutPubOrderFormByOrderFormIdCustomFields(params: {
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
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PUT', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customFields`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  putApiCheckoutPubOrderFormByOrderFormIdCustomFieldsOrder(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  name: string
  value: string
  refId?: string
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PUT', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/order`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  putApiCheckoutPubOrderFormByOrderFormIdCustomFieldsItemByItemId(params: {
  orderFormId: string
  itemId: string
  individualShippingEstimates?: boolean
  body: {
  name: string
  value: string
  refId?: string
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PUT', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/item/${params.itemId}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  deleteApiCheckoutPubOrderFormByOrderFormIdCustomFieldsItemByItemId(params: {
  orderFormId: string
  itemId: string
  individualShippingEstimates?: boolean
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'DELETE', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/item/${params.itemId}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  putApiCheckoutPubOrderFormByOrderFormIdCustomFieldsAddressByAddressId(params: {
  orderFormId: string
  addressId: string
  individualShippingEstimates?: boolean
  body: {
  name: string
  value: string
  refId?: string
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'PUT', path: `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/address/${params.addressId}`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }
}
class CheckoutApi_configuration {
  constructor(private http: VtexHttpClient) {}

  getorderFormconfiguration(params: {
  individualShippingEstimates?: boolean
}): Promise<{
  paymentConfiguration?: {
  requiresAuthenticationForPreAuthorizedPaymentOption?: boolean
  allowInstallmentsMerge?: boolean
}
  taxConfiguration?: {
  url?: string
  authorizationHeader?: string
  appId?: string
  isMarketplaceResponsibleForTaxes?: boolean
}
  minimumQuantityAccumulatedForItems?: number
  decimalDigitsPrecision?: number
  minimumValueAccumulated?: number
  apps?: {
  id?: string
  fields?: string[]
  major?: number
}[]
  allowMultipleDeliveries?: boolean
  allowManualPrice?: boolean
  savePersonalDataAsOptIn?: boolean
  maxNumberOfWhiteLabelSellers?: number
  maskFirstPurchaseData?: boolean
  recaptchaValidation?: string
}> {
    return this.http.request<{
  paymentConfiguration?: {
  requiresAuthenticationForPreAuthorizedPaymentOption?: boolean
  allowInstallmentsMerge?: boolean
}
  taxConfiguration?: {
  url?: string
  authorizationHeader?: string
  appId?: string
  isMarketplaceResponsibleForTaxes?: boolean
}
  minimumQuantityAccumulatedForItems?: number
  decimalDigitsPrecision?: number
  minimumValueAccumulated?: number
  apps?: {
  id?: string
  fields?: string[]
  major?: number
}[]
  allowMultipleDeliveries?: boolean
  allowManualPrice?: boolean
  savePersonalDataAsOptIn?: boolean
  maxNumberOfWhiteLabelSellers?: number
  maskFirstPurchaseData?: boolean
  recaptchaValidation?: string
}>({ method: 'GET', path: `/api/checkout/pvt/configuration/orderForm`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  createorderFormconfiguration(params: {
  individualShippingEstimates?: boolean
  body: UpdateorderFormconfigurationRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/checkout/pvt/configuration/orderForm`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  updateorderFormconfiguration(params: {
  individualShippingEstimates?: boolean
  body: UpdateorderFormconfigurationRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PATCH', path: `/api/checkout/pvt/configuration/orderForm`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  getWindowToChangeSeller(params: {
  individualShippingEstimates?: boolean
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/checkout/pvt/configuration/window-to-change-seller`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  updateWindowToChangeSeller(params: {
  individualShippingEstimates?: boolean
  body: WaitingTime
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/checkout/pvt/configuration/window-to-change-seller`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  clearorderFormMessages(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: Record<string, unknown>
}): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  userType?: string
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string
  name?: string
  skuName?: string
  modalType?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string
  brandName?: string
  brandId?: string
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  preSaleDate?: string
  productCategoryIds?: string
  productCategories?: {
  "{ID}"?: string
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
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string
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
  addressId?: string
  isDisposable?: boolean
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
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string
  address?: {
  addressType?: string
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
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  addressId?: string
  isDisposable?: boolean
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
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
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
  bin?: string
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
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
  sellers?: {
  id?: string
  name?: string
  logo?: string
  minimumOrderValue?: number
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  commercialConditionData?: Record<string, unknown>
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown>
  openTextField?: string
  invoiceData?: Record<string, unknown>
  customData?: Record<string, unknown>
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown>
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown>
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
  storeId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  profileProvider?: string
  availableAccounts?: string[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  userType?: string
  ignoreProfileData?: boolean
  value?: number
  messages?: string[]
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string
  name?: string
  skuName?: string
  modalType?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string
  brandName?: string
  brandId?: string
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  preSaleDate?: string
  productCategoryIds?: string
  productCategories?: {
  "{ID}"?: string
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
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string
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
  addressId?: string
  isDisposable?: boolean
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
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
  name: string
  required: boolean
  schema: Record<string, unknown>
}[]
  shippingEstimate?: string
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string
  address?: {
  addressType?: string
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
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  addressId?: string
  isDisposable?: boolean
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
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
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
  bin?: string
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
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
  sellers?: {
  id?: string
  name?: string
  logo?: string
  minimumOrderValue?: number
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
}
  commercialConditionData?: Record<string, unknown>
  storePreferencesData?: Record<string, unknown>
  giftRegistryData?: Record<string, unknown>
  openTextField?: string
  invoiceData?: Record<string, unknown>
  customData?: Record<string, unknown>
  itemMetadata?: {
  items?: {
  id?: string
  seller?: string
  name?: string
  skuName?: string
  productId?: string
  refId?: string
  ean?: string
  imageUrl?: string
  detailUrl?: string
}[]
}
  hooksData?: Record<string, unknown>
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown>
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/messages/clear`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }
}
class CheckoutApi_fulfillment {
  constructor(private http: VtexHttpClient) {}

  listPickupPpointsByLocation(params: {
  geoCoordinates?: string
  postalCode?: string
  countryCode?: string
  individualShippingEstimates?: boolean
}): Promise<{
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
  addressId?: string
  isDisposable?: boolean
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
  addressId?: string
  isDisposable?: boolean
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
  additionalInfo?: string
  id?: string
  businessHours?: {
  DayOfWeek?: number
  OpeningTime?: string
  ClosingTime?: string
}[]
}
}[]
}>({ method: 'GET', path: `/api/checkout/pub/pickup-points`, query: { 'geoCoordinates': params.geoCoordinates, 'postalCode': params.postalCode, 'countryCode': params.countryCode, 'individualShippingEstimates': params.individualShippingEstimates } })
  }

  getAddressByPostalCode(params: {
  countryCode: string
  postalCode: string
  individualShippingEstimates?: boolean
}): Promise<{
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
}> {
    return this.http.request<{
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
}>({ method: 'GET', path: `/api/checkout/pub/postal-code/${params.countryCode}/${params.postalCode}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }
}
class CheckoutApi_orderPlacement {
  constructor(private http: VtexHttpClient) {}

  placeOrderFromExistingOrderForm(params: {
  orderFormId: string
  individualShippingEstimates?: boolean
  body: {
  referenceId: string
  savePersonalData?: boolean
  optinNewsLetter?: boolean
  value: number
  referenceValue: number
  interestValue: number
}
}): Promise<OrderForm> {
    return this.http.request<OrderForm>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/transaction`, query: { 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  placeOrder(params: {
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
  identifier?: string
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
  email: string
  firstName?: string
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
}
  shippingData: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
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
  logisticsInfo?: {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel?: string
  lockTTL?: string
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
}
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
  bin?: string
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
}
  openTextField?: string
  salesAssociateData?: {
  salesAssociateId?: string
}
}
}): Promise<{
  orderForm?: string
  transactionData?: {
  merchantTransactions?: {
  id?: string
  transactionId?: string
  merchantName?: string
  payments?: {
  paymentSystem?: number
  bin?: string
  accountId?: string
  tokenId?: string
  value?: number
  referenceValue?: number
  giftCardRedemptionCode?: string
  giftCardProvider?: string
  giftCardId?: string
}[]
}[]
  receiverUri?: string
  gatewayCallbackTemplatePath?: string
}
  orders?: {
  orderId?: string
  orderGroup?: string
  state?: string
  isCheckedIn?: boolean
  sellerOrderId?: string
  storeId?: string
  checkedInPickupPointId?: string
  value?: number
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string
  name?: string
  skuName?: string
  modalType?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string
  brandName?: string
  brandId?: string
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  preSaleDate?: string
  productCategoryIds?: string
  productCategories?: {
  "{ID}"?: string
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
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string
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
  logo?: string
  minimumOrderValue?: number
}[]
  totals?: {
  id?: string
  name?: string
  value?: number
}[]
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
}
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string
  address?: {
  addressType?: string
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
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  addressId?: string
  isDisposable?: boolean
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
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
  bin?: string
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
  ean?: string
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
  merchantName?: string
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
  orderForm?: string
  transactionData?: {
  merchantTransactions?: {
  id?: string
  transactionId?: string
  merchantName?: string
  payments?: {
  paymentSystem?: number
  bin?: string
  accountId?: string
  tokenId?: string
  value?: number
  referenceValue?: number
  giftCardRedemptionCode?: string
  giftCardProvider?: string
  giftCardId?: string
}[]
}[]
  receiverUri?: string
  gatewayCallbackTemplatePath?: string
}
  orders?: {
  orderId?: string
  orderGroup?: string
  state?: string
  isCheckedIn?: boolean
  sellerOrderId?: string
  storeId?: string
  checkedInPickupPointId?: string
  value?: number
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  productRefId?: string
  refId?: string
  ean?: string
  name?: string
  skuName?: string
  modalType?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  priceValidUntil?: string
  tax?: number
  price?: number
  listPrice?: number
  manualPrice?: number
  manualPriceAppliedBy?: string
  sellingPrice?: number
  rewardValue?: number
  isGift?: boolean
  additionalInfo?: {
  dimension?: string
  brandName?: string
  brandId?: string
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  preSaleDate?: string
  productCategoryIds?: string
  productCategories?: {
  "{ID}"?: string
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
  identifier?: string
  isPercentual?: boolean
  name?: string
  rawValue?: number
  value?: number
}[]
  availability?: string
  measurementUnit?: string
  unitMultiplier?: number
  manufacturerCode?: string
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
  logo?: string
  minimumOrderValue?: number
}[]
  totals?: {
  id?: string
  name?: string
  value?: number
}[]
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string
}
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
  shippingEstimateDate?: string
  useIndividualShippingEstimates?: boolean
  lockTTL?: string
  price?: number
  listPrice?: number
  tax?: number
  pickupStoreInfo?: {
  isPickupStore?: boolean
  friendlyName?: string
  address?: {
  addressType?: string
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
  additionalInfo?: string
  dockId?: string
}
  pickupPointId?: string
  pickupDistance?: number
  polygonName?: string
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
  addressId?: string
  isDisposable?: boolean
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
}[]
  availableAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
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
  bin?: string
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
  ean?: string
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
  merchantName?: string
  userType?: string
  roundingError?: number
  allowEdition?: boolean
  allowCancelation?: boolean
  allowChangeSeller?: boolean
  isUserDataVisible?: boolean
  orderFormCreationDate?: string
  salesAssociateId?: string
}[]
}>({ method: 'PUT', path: `/api/checkout/pub/orders`, query: { 'sc': params.sc, 'individualShippingEstimates': params.individualShippingEstimates }, body: params.body })
  }

  processOrder(params: {
  orderGroup: string
  individualShippingEstimates?: boolean
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/checkout/pub/gatewayCallback/${params.orderGroup}`, query: { 'individualShippingEstimates': params.individualShippingEstimates } })
  }
}
class CheckoutApi_region {
  constructor(private http: VtexHttpClient) {}

  getSellersByRegion(params: {
  regionId: string
  country: string
  postalCode?: string
  geoCoordinates?: number[]
  individualShippingEstimates?: boolean
}): Promise<{
  id?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
}> {
    return this.http.request<{
  id?: string
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
}>({ method: 'GET', path: `/api/checkout/pub/regions/${params.regionId}`, query: { 'country': params.country, 'postalCode': params.postalCode, 'geoCoordinates': params.geoCoordinates, 'individualShippingEstimates': params.individualShippingEstimates } })
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
