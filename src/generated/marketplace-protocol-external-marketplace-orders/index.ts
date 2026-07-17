import type { VtexHttpClient } from '../../core/http.js'
import type { EnqueueNewOrderRequest, Item, ClientProfileData, ShippingData, LogisticsInfo, DeliveryIds, SelectedAddress, GeoCoordinates, InvoiceData, UserPaymentInfo, CustomData, CustomApp, Fields, Deliverybyseller, Deliverybyfranchiseseller, UpdateOrderStatusRequest, Approveorder, OrderIDFulfillmentResponse, PlaceFulfillmentOrderRequest, PlaceFulfillmentOrderResponse, TaxData, TrackingHint } from './types.js'

class MarketplaceProtocolExternalMarketplaceOrdersApi_externalMarketplace {
  constructor(private http: VtexHttpClient) {}

  placeFulfillmentOrder(params: {
  sc?: string
  affiliateId: string
  body: PlaceFulfillmentOrderRequest
}): Promise<PlaceFulfillmentOrderResponse> {
    return this.http.request<PlaceFulfillmentOrderResponse>({ method: 'POST', path: `/api/fulfillment/pvt/orders`, query: { 'sc': params.sc, 'affiliateId': params.affiliateId }, body: params.body })
  }

  authorizeDispatchForFulfillmentOrder(params: {
  orderId: string
  sc?: string
  affiliateId: string
  body: {
  marketplaceOrderId?: string
}
}): Promise<OrderIDFulfillmentResponse> {
    return this.http.request<OrderIDFulfillmentResponse>({ method: 'POST', path: `/api/fulfillment/pvt/orders/${params.orderId}/fulfill`, query: { 'sc': params.sc, 'affiliateId': params.affiliateId }, body: params.body })
  }

  enqueueNewOrder(params: {
  an?: string
  affiliateId: string
  body: EnqueueNewOrderRequest
}): Promise<Deliverybyseller> {
    return this.http.request<Deliverybyseller>({ method: 'POST', path: `/api/order-integration/orders`, query: { 'an': params.an, 'affiliateId': params.affiliateId }, body: params.body })
  }

  updateOrderStatus(params: {
  an?: string
  body: UpdateOrderStatusRequest
}): Promise<Approveorder> {
    return this.http.request<Approveorder>({ method: 'PUT', path: `/api/order-integration/orders/status`, query: { 'an': params.an }, body: params.body })
  }

  fulfillmentSimulationExternalMarketplace(params: {
  affiliateId?: string
  sc?: number
  body: {
  items?: {
  id?: string
  quantity?: number
  seller?: string
}[]
  marketingData?: {
  coupon?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmiPage?: string
  utmiPart?: string
  utmiCampaign?: string
}
  postalCode?: string
  country?: string
  selectedSla?: string
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
  geoCoordinates?: number[]
  isCheckedIn?: boolean
  storeId?: string
}
}): Promise<{
  items?: {
  id?: string
  requestIndex?: number
  quantity?: number
  seller?: string
  sellerChain?: string[]
  tax?: number
  priceValidUntil?: string
  price?: number
  listPrice?: number
  rewardValue?: number
  sellingPrice?: number
  offerings?: {
  id?: string
  name?: string
  price?: number
  availability?: string
}[]
  priceTags?: {
  name?: string
  value?: number
  rawValue?: number
  isPercentual?: boolean
  identifier?: string
  owner?: string
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
  rateAndBenefitsIdentifiers?: {
  id?: string
  name?: string
}[]
  teaser?: {
  name?: string
  description?: string
}[]
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
  sellerMerchantInstallments?: {
  id?: number
  count?: number
  value?: number
}[]
}[]
}[][]
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
  selectableGifts?: {
  giftItemId?: string
  giftItemName?: string
  giftItemDescription?: string
  giftItemPrice?: number
}[]
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
  shippingEstimate?: string
  shippingEstimateDate?: string
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
  messages?: {
  messageId?: string
  messageText?: string
  messageType?: string
}[]
  purchaseConditions?: {
  itemPurchaseConditions?: {
  id?: string
  seller?: string
  sellerChain?: {
  sellerId?: string
  sellerName?: string
  sellerLocation?: string
}[]
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
  pickupPoints?: {
  pickupPointId?: string
  friendlyName?: string
  address?: {
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}
  additionalInfo?: string
  dockId?: string
}[]
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
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: Record<string, unknown>
  composition?: string
}[]
}[]
}
}[]
}[]
}
}> {
    return this.http.request<{
  items?: {
  id?: string
  requestIndex?: number
  quantity?: number
  seller?: string
  sellerChain?: string[]
  tax?: number
  priceValidUntil?: string
  price?: number
  listPrice?: number
  rewardValue?: number
  sellingPrice?: number
  offerings?: {
  id?: string
  name?: string
  price?: number
  availability?: string
}[]
  priceTags?: {
  name?: string
  value?: number
  rawValue?: number
  isPercentual?: boolean
  identifier?: string
  owner?: string
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
  rateAndBenefitsIdentifiers?: {
  id?: string
  name?: string
}[]
  teaser?: {
  name?: string
  description?: string
}[]
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
  sellerMerchantInstallments?: {
  id?: number
  count?: number
  value?: number
}[]
}[]
}[][]
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
  selectableGifts?: {
  giftItemId?: string
  giftItemName?: string
  giftItemDescription?: string
  giftItemPrice?: number
}[]
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
  shippingEstimate?: string
  shippingEstimateDate?: string
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
  messages?: {
  messageId?: string
  messageText?: string
  messageType?: string
}[]
  purchaseConditions?: {
  itemPurchaseConditions?: {
  id?: string
  seller?: string
  sellerChain?: {
  sellerId?: string
  sellerName?: string
  sellerLocation?: string
}[]
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
  pickupPoints?: {
  pickupPointId?: string
  friendlyName?: string
  address?: {
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}
  additionalInfo?: string
  dockId?: string
}[]
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
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: Record<string, unknown>
  composition?: string
}[]
}[]
}
}[]
}[]
}
}>({ method: 'POST', path: `/api/checkout/pub/orderForms/simulation`, query: { 'affiliateId': params.affiliateId, 'sc': params.sc }, body: params.body })
  }
}

export class MarketplaceProtocolExternalMarketplaceOrdersApi {
  readonly externalMarketplace: MarketplaceProtocolExternalMarketplaceOrdersApi_externalMarketplace
  constructor(http: VtexHttpClient) {
    this.externalMarketplace = new MarketplaceProtocolExternalMarketplaceOrdersApi_externalMarketplace(http)
  }
}
