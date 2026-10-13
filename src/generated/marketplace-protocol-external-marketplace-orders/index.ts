import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { EnqueueNewOrderRequest, Item, ClientProfileData, ShippingData, LogisticsInfo, DeliveryIds, SelectedAddress, GeoCoordinates, InvoiceData, UserPaymentInfo, CustomData, CustomApp, Fields, Deliverybyseller, Deliverybyfranchiseseller, UpdateOrderStatusRequest, Approveorder, OrderIDFulfillmentResponse, PlaceFulfillmentOrderRequest, PlaceFulfillmentOrderResponse, TaxData, TrackingHint } from './types.js'

class MarketplaceProtocolExternalMarketplaceOrdersApi_externalMarketplace {
  constructor(private http: VtexHttpClient) {}

  placeFulfillmentOrder(params: {
  sc?: string
  affiliateId: string
  body: PlaceFulfillmentOrderRequest
}, opts?: CallOptions): Promise<PlaceFulfillmentOrderResponse> {
    return this.http.request<PlaceFulfillmentOrderResponse>(withCall({ method: 'POST', path: `/api/fulfillment/pvt/orders`, query: { 'sc': params.sc, 'affiliateId': params.affiliateId }, body: params.body }, opts))
  }

  authorizeDispatchForFulfillmentOrder(params: {
  orderId: string
  sc?: string
  affiliateId: string
  body: {
  marketplaceOrderId?: string
}
}, opts?: CallOptions): Promise<OrderIDFulfillmentResponse> {
    return this.http.request<OrderIDFulfillmentResponse>(withCall({ method: 'POST', path: `/api/fulfillment/pvt/orders/${encodePathParam(params.orderId)}/fulfill`, query: { 'sc': params.sc, 'affiliateId': params.affiliateId }, body: params.body }, opts))
  }

  enqueueNewOrder(params: {
  an?: string
  affiliateId: string
  body: EnqueueNewOrderRequest
}, opts?: CallOptions): Promise<Deliverybyseller> {
    return this.http.request<Deliverybyseller>(withCall({ method: 'POST', path: `/api/order-integration/orders`, query: { 'an': params.an, 'affiliateId': params.affiliateId }, body: params.body }, opts))
  }

  updateOrderStatus(params: {
  an?: string
  body: UpdateOrderStatusRequest
}, opts?: CallOptions): Promise<Approveorder> {
    return this.http.request<Approveorder>(withCall({ method: 'PUT', path: `/api/order-integration/orders/status`, query: { 'an': params.an }, body: params.body }, opts))
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
  corporateName?: string | null
  tradeName?: string | null
  corporateDocument?: string | null
  stateInscription?: string | null
  corporatePhone?: string | null
  isCorporate?: boolean
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean | null
  customerClass?: string | null
}
  geoCoordinates?: number[]
  isCheckedIn?: boolean
  storeId?: string | null
}
}, opts?: CallOptions): Promise<{
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
  bin?: string | null
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
  validator?: Record<string, unknown> | null
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
  shippingEstimate?: string
  shippingEstimateDate?: string | null
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
  shippingEstimateDate?: string | null
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
  pickupPoints?: {
  pickupPointId?: string
  friendlyName?: string | null
  address?: {
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
} | null
  additionalInfo?: string | null
  dockId?: string | null
}[]
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
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: Record<string, unknown>
  composition?: string | null
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
  bin?: string | null
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
  validator?: Record<string, unknown> | null
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
  shippingEstimate?: string
  shippingEstimateDate?: string | null
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
  shippingEstimateDate?: string | null
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
  pickupPoints?: {
  pickupPointId?: string
  friendlyName?: string | null
  address?: {
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
} | null
  additionalInfo?: string | null
  dockId?: string | null
}[]
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
  assemblyOptions?: {
  id?: string
  name?: string
  required?: boolean
  inputValues?: Record<string, unknown>
  composition?: string | null
}[]
}[]
}
}[]
}[]
}
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForms/simulation`, query: { 'affiliateId': params.affiliateId, 'sc': params.sc }, body: params.body }, opts))
  }
}

export class MarketplaceProtocolExternalMarketplaceOrdersApi {
  readonly externalMarketplace: MarketplaceProtocolExternalMarketplaceOrdersApi_externalMarketplace
  constructor(http: VtexHttpClient) {
    this.externalMarketplace = new MarketplaceProtocolExternalMarketplaceOrdersApi_externalMarketplace(http)
  }
}
