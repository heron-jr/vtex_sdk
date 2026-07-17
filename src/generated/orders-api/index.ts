import type { VtexHttpClient } from '../../core/http.js'
import type { TotalsUpdated, ItemsUpdated, ClientProfileDataUpdated, GiftRegistryDataUpdated, MarketingDataUpdated, RatesAndBenefitsDataUpdated, ShippingDataUpdated, PickupStoreInfoUpdated, PaymentDataUpdated, PackageAttachmentUpdated, SellersUpdated, InvoiceDataUpdated, ChangesAttachmentUpdated, CallCenterOperatorDataUpdated, StorePreferencesDataUpdated, MarketplaceUpdated, ItemMetadataUpdated, SubscriptionDataUpdated, TaxDataUpdated, CancellationDataUpdated, CancellationRequestsUpdated, ClientPreferencesDataUpdated, Total, Item, ItemAttachment, AdditionalInfo, Dimension, ClientProfileData, RatesAndBenefitsData, ShippingData, Address, LogisticsInfo, Sla, PickupStoreInfo, DeliveryId, SelectedAddress, PaymentData, Transaction, Payment, PackageAttachment, Seller, ChangesAttachment, ChangesDatum, ItemsRemoved, Receipt, StorePreferencesData, CurrencyFormatInfo, Marketplace, ListOrders, List, Paging, Stats, Stats1, TotalValue, Facets, Origin, Fulfillment, Marketplace1, CurrencyCode, BRL, TotalItems, Facets1, Origin1, Fulfillment1, Marketplace2, CurrencyCode1, BRL1, UpdatepartialinvoiceSendTrackingNumberRequest, UpdatepartialinvoiceSendTrackingNumber, UpdateTrackingStatusRequest, Event, UpdateTrackingStatus, GetConversation, From, To, GetPaymenttransaction, Payment1, ConnectorResponses, ConfirmitemfeedorderstatusRequest, Getfeedorderstatus, HookFilter, HookConfigurationRequest, Hook, Headers, HookConfiguration, Origin2, Userorderslist, List1, Item2, Stats2, Stats3, TotalValue1, TotalItems1, Userorderdetails, Createchange, Replace, Response202, Replace1, PaymentDataV2, ShippingData1, Item3, AdditionalInfoV2, LogisticsInfo1, SlaV2, PickupStoreInfoV2, OriginV2, Settings, From2, Item4, ShippingData3, LogisticsInfo2, DeliveryIdV2, DeliveryChannel, To2, PriceDefinition, ChangeOrderSettingsResponse, AuthorizationPolicyData, ChangeSummary, DeliveryIdResponse } from './types.js'

class OrdersApi_orders {
  constructor(private http: VtexHttpClient) {}

  getOrder(params: {
  orderId: string
}): Promise<{
  orderId?: string
  sequence?: string
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  sellerOrderId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  affiliateId?: string
  salesChannel?: string
  merchantName?: string
  status?: string
  workflowIsInError?: boolean
  statusDescription?: string
  value?: number
  creationDate?: string
  lastChange?: string
  orderGroup?: string
  followUpEmail?: string
  lastMessage?: string
  hostname?: string
  isCompleted?: boolean
  roundingError?: number
  orderFormId?: string
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  authorizedDate?: string
  invoicedDate?: string
  cancelReason?: string
  checkedInPickupPointId?: string
  totals?: TotalsUpdated
  sellers?: SellersUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
  cancellationData?: {
  RequestedByUser?: boolean
  RequestedBySystem?: boolean
  RequestedBySellerNotification?: boolean
  RequestedByPaymentNotification?: boolean
  Reason?: string
  CancellationDate?: string
}
  taxData?: TaxDataUpdated
  subscriptionData?: {
  SubscriptionGroupId?: string
  Subscriptions?: {
  ExecutionCount?: number
  PriceAtSubscriptionDate?: number
  ItemIndex?: number
  Plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAY" | "WEEK" | "MONTH" | "YEAR"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string
}
}
}[]
}
  itemMetadata?: {
  Items?: {
  Id?: string
  Seller?: string
  Name?: string
  SkuName?: string
  ProductId?: string
  RefId?: string
  Ean?: string
  ImageUrl?: string
  DetailUrl?: string
  AssemblyOptions?: {
  Id?: string
  Name?: string
  Required?: boolean
  InputValues?: Record<string, unknown>
  Composition?: Record<string, unknown>
}[]
}[]
}
  marketplace?: MarketplaceUpdated
  storePreferencesData?: StorePreferencesDataUpdated
  customData?: {
  customApps?: {
  id?: string
  major?: number
  fields?: {
  marketplacePaymentCnpjAcquirers?: string
  marketplacePaymentAuthorizationCodes?: string
  marketplacePaymentCreditCardBrands?: string
  marketplacePaymentMethods?: string
}
}[]
  customFields?: {
  linkedEntity?: {
  type?: string
  id?: string
}
  fields?: {
  name?: string
  value?: string
}[]
}[]
}
  commercialConditionData?: string
  openTextField?: Record<string, unknown>
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  callCenterOperatorData?: CallCenterOperatorDataUpdated
  packageAttachment?: {
  packages?: {
  items?: {
  itemIndex?: number
  quantity?: number
  price?: number
  description?: string
  unitMultiplier?: number
}[]
  courier?: string
  invoiceNumber?: string
  invoiceValue?: number
  invoiceUrl?: string
  issuanceDate?: string
  trackingNumber?: string
  invoiceKey?: string
  trackingUrl?: string
  embeddedInvoice?: string
  type?: "Output" | "Input"
  courierStatus?: {
  status?: string
  finished?: boolean
  deliveredDate?: string
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
}
  cfop?: string
  restitutions?: {
  Refund?: {
  value?: number
  giftCardData?: string
  items?: {
  useFreight?: boolean
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[]
}
}
  volumes?: number
  EnableInferItems?: boolean
}[]
}
  paymentData?: PaymentDataUpdated
  shippingData?: {
  id?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  lockTTL?: string
  price?: number
  listPrice?: number
  sellingPrice?: number
  deliveryWindow?: string
  deliveryCompany?: string
  shippingEstimate?: string
  shippingEstimateDate?: string
  slas?: {
  id?: string
  name?: string
  shippingEstimate?: string
  deliveryWindow?: string
  price?: number
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  dockId?: string
  friendlyName?: string
  isPickupStore?: boolean
}
  polygonName?: string
  lockTTL?: string
  pickupPointId?: string
  transitTime?: string
  pickupDistance?: number
}[]
  shipsTo?: string[]
  deliveryIds?: {
  courierId?: string
  courierName?: string
  dockId?: string
  quantity?: number
  warehouseId?: string
  accountCarrierName?: string
  kitItemDetails?: string[]
}[]
  deliveryChannels?: {
  id?: string
  stockBalance?: number
}[]
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string
  address?: string
  dockId?: string
  friendlyName?: string
  isPickupStore?: boolean
}
  addressId?: string
  versionId?: string
  entityId?: string
  polygonName?: string
  pickupPointId?: string
  transitTime?: string
}[]
  trackingHints?: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[]
  selectedAddresses?: {
  addressId?: string
  versionId?: string
  entityId?: string
  addressType?: string
  receiverName?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  contactInformation?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  document?: string
  documentType?: string
  entityId?: string
  versionId?: string
}[]
}
  ratesAndBenefitsData?: {
  id?: string
  rateAndBenefitsIdentifiers?: {
  description?: string
  featured?: boolean
  id?: string
  name?: string
  matchedParameters?: Record<string, unknown>
  additionalInfo?: Record<string, unknown>
}[]
}
  marketingData?: {
  id?: string
  utmSource?: string
  utmPartner?: string
  utmMedium?: string
  utmCampaign?: string
  coupon?: string
  utmiCampaign?: string
  utmipage?: string
  utmiPart?: string
  marketingTags?: string[]
}
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
}
  clientProfileData?: {
  id?: string
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
  userProfileId?: string
  userProfileVersion?: string
  customerClass?: string
  customerCode?: string
}
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  ean?: string
  lockId?: string
  itemAttachment?: {
  content?: Record<string, unknown>
  name?: string
}
  attachments?: string[]
  quantity?: number
  seller?: string
  name?: string
  refId?: string
  price?: number
  listPrice?: number
  manualPrice?: string
  priceTags?: string[]
  imageUrl?: string
  detailUrl?: string
  components?: string[]
  bundleItems?: {
  id?: number
  quantity?: number
}[]
  params?: string[]
  offerings?: string[]
  attachmentOfferings?: {
  name?: string
  required?: boolean
  schema?: Record<string, unknown>
}[]
  sellerSku?: string
  priceValidUntil?: string
  commission?: number
  tax?: number
  preSaleDate?: string
  additionalInfo?: {
  brandName?: string
  brandId?: string
  categoriesIds?: string
  categories?: {
  id?: number
  name?: string
}[]
  productClusterId?: string
  commercialConditionId?: string
  dimension?: {
  cubicweight?: number
  height?: number
  length?: number
  weight?: number
  width?: number
}
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  measurementUnit?: string
  unitMultiplier?: number
  sellingPrice?: number
  isGift?: boolean
  shippingPrice?: string
  rewardValue?: number
  freightCommission?: number
  priceDefinitions?: {
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  calculatedSellingPrice?: number
  total?: number
}
  taxCode?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  callCenterOperator?: string
  serialNumbers?: string
  assemblies?: string[]
  costPrice?: number
}[]
  marketplaceItems?: string[]
  authorizationPolicyData?: AuthorizationPolicyData
}> {
    return this.http.request<{
  orderId?: string
  sequence?: string
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  sellerOrderId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  affiliateId?: string
  salesChannel?: string
  merchantName?: string
  status?: string
  workflowIsInError?: boolean
  statusDescription?: string
  value?: number
  creationDate?: string
  lastChange?: string
  orderGroup?: string
  followUpEmail?: string
  lastMessage?: string
  hostname?: string
  isCompleted?: boolean
  roundingError?: number
  orderFormId?: string
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  authorizedDate?: string
  invoicedDate?: string
  cancelReason?: string
  checkedInPickupPointId?: string
  totals?: TotalsUpdated
  sellers?: SellersUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
  cancellationData?: {
  RequestedByUser?: boolean
  RequestedBySystem?: boolean
  RequestedBySellerNotification?: boolean
  RequestedByPaymentNotification?: boolean
  Reason?: string
  CancellationDate?: string
}
  taxData?: TaxDataUpdated
  subscriptionData?: {
  SubscriptionGroupId?: string
  Subscriptions?: {
  ExecutionCount?: number
  PriceAtSubscriptionDate?: number
  ItemIndex?: number
  Plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAY" | "WEEK" | "MONTH" | "YEAR"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string
}
}
}[]
}
  itemMetadata?: {
  Items?: {
  Id?: string
  Seller?: string
  Name?: string
  SkuName?: string
  ProductId?: string
  RefId?: string
  Ean?: string
  ImageUrl?: string
  DetailUrl?: string
  AssemblyOptions?: {
  Id?: string
  Name?: string
  Required?: boolean
  InputValues?: Record<string, unknown>
  Composition?: Record<string, unknown>
}[]
}[]
}
  marketplace?: MarketplaceUpdated
  storePreferencesData?: StorePreferencesDataUpdated
  customData?: {
  customApps?: {
  id?: string
  major?: number
  fields?: {
  marketplacePaymentCnpjAcquirers?: string
  marketplacePaymentAuthorizationCodes?: string
  marketplacePaymentCreditCardBrands?: string
  marketplacePaymentMethods?: string
}
}[]
  customFields?: {
  linkedEntity?: {
  type?: string
  id?: string
}
  fields?: {
  name?: string
  value?: string
}[]
}[]
}
  commercialConditionData?: string
  openTextField?: Record<string, unknown>
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  callCenterOperatorData?: CallCenterOperatorDataUpdated
  packageAttachment?: {
  packages?: {
  items?: {
  itemIndex?: number
  quantity?: number
  price?: number
  description?: string
  unitMultiplier?: number
}[]
  courier?: string
  invoiceNumber?: string
  invoiceValue?: number
  invoiceUrl?: string
  issuanceDate?: string
  trackingNumber?: string
  invoiceKey?: string
  trackingUrl?: string
  embeddedInvoice?: string
  type?: "Output" | "Input"
  courierStatus?: {
  status?: string
  finished?: boolean
  deliveredDate?: string
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
}
  cfop?: string
  restitutions?: {
  Refund?: {
  value?: number
  giftCardData?: string
  items?: {
  useFreight?: boolean
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[]
}
}
  volumes?: number
  EnableInferItems?: boolean
}[]
}
  paymentData?: PaymentDataUpdated
  shippingData?: {
  id?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  lockTTL?: string
  price?: number
  listPrice?: number
  sellingPrice?: number
  deliveryWindow?: string
  deliveryCompany?: string
  shippingEstimate?: string
  shippingEstimateDate?: string
  slas?: {
  id?: string
  name?: string
  shippingEstimate?: string
  deliveryWindow?: string
  price?: number
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  versionId?: string
  entityId?: string
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
  dockId?: string
  friendlyName?: string
  isPickupStore?: boolean
}
  polygonName?: string
  lockTTL?: string
  pickupPointId?: string
  transitTime?: string
  pickupDistance?: number
}[]
  shipsTo?: string[]
  deliveryIds?: {
  courierId?: string
  courierName?: string
  dockId?: string
  quantity?: number
  warehouseId?: string
  accountCarrierName?: string
  kitItemDetails?: string[]
}[]
  deliveryChannels?: {
  id?: string
  stockBalance?: number
}[]
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string
  address?: string
  dockId?: string
  friendlyName?: string
  isPickupStore?: boolean
}
  addressId?: string
  versionId?: string
  entityId?: string
  polygonName?: string
  pickupPointId?: string
  transitTime?: string
}[]
  trackingHints?: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[]
  selectedAddresses?: {
  addressId?: string
  versionId?: string
  entityId?: string
  addressType?: string
  receiverName?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  reference?: string
  geoCoordinates?: number[]
}[]
  contactInformation?: {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  document?: string
  documentType?: string
  entityId?: string
  versionId?: string
}[]
}
  ratesAndBenefitsData?: {
  id?: string
  rateAndBenefitsIdentifiers?: {
  description?: string
  featured?: boolean
  id?: string
  name?: string
  matchedParameters?: Record<string, unknown>
  additionalInfo?: Record<string, unknown>
}[]
}
  marketingData?: {
  id?: string
  utmSource?: string
  utmPartner?: string
  utmMedium?: string
  utmCampaign?: string
  coupon?: string
  utmiCampaign?: string
  utmipage?: string
  utmiPart?: string
  marketingTags?: string[]
}
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
}
  clientProfileData?: {
  id?: string
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
  userProfileId?: string
  userProfileVersion?: string
  customerClass?: string
  customerCode?: string
}
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  ean?: string
  lockId?: string
  itemAttachment?: {
  content?: Record<string, unknown>
  name?: string
}
  attachments?: string[]
  quantity?: number
  seller?: string
  name?: string
  refId?: string
  price?: number
  listPrice?: number
  manualPrice?: string
  priceTags?: string[]
  imageUrl?: string
  detailUrl?: string
  components?: string[]
  bundleItems?: {
  id?: number
  quantity?: number
}[]
  params?: string[]
  offerings?: string[]
  attachmentOfferings?: {
  name?: string
  required?: boolean
  schema?: Record<string, unknown>
}[]
  sellerSku?: string
  priceValidUntil?: string
  commission?: number
  tax?: number
  preSaleDate?: string
  additionalInfo?: {
  brandName?: string
  brandId?: string
  categoriesIds?: string
  categories?: {
  id?: number
  name?: string
}[]
  productClusterId?: string
  commercialConditionId?: string
  dimension?: {
  cubicweight?: number
  height?: number
  length?: number
  weight?: number
  width?: number
}
  offeringInfo?: string
  offeringType?: string
  offeringTypeId?: string
}
  measurementUnit?: string
  unitMultiplier?: number
  sellingPrice?: number
  isGift?: boolean
  shippingPrice?: string
  rewardValue?: number
  freightCommission?: number
  priceDefinitions?: {
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  calculatedSellingPrice?: number
  total?: number
}
  taxCode?: string
  parentItemIndex?: number
  parentAssemblyBinding?: string
  callCenterOperator?: string
  serialNumbers?: string
  assemblies?: string[]
  costPrice?: number
}[]
  marketplaceItems?: string[]
  authorizationPolicyData?: AuthorizationPolicyData
}>({ method: 'GET', path: `/api/oms/pvt/orders/${params.orderId}` })
  }

  getApiOmsPvtOrdersOrderGroupByOrderGroup(params: {
  orderGroup: string
}): Promise<{
  orderId?: string
  sequence?: string
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  sellerOrderId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  affiliateId?: string
  salesChannel?: string
  merchantName?: string
  status?: string
  statusDescription?: string
  value?: number
  creationDate?: string
  lastChange?: string
  orderGroup?: string
  totals?: TotalsUpdated
  items?: ItemsUpdated
  marketplaceItems?: string[]
  clientProfileData?: ClientProfileDataUpdated
  giftRegistryData?: GiftRegistryDataUpdated
  marketingData?: MarketingDataUpdated
  ratesAndBenefitsData?: RatesAndBenefitsDataUpdated
  shippingData?: ShippingDataUpdated
  paymentData?: PaymentDataUpdated
  packageAttachment?: PackageAttachmentUpdated
  sellers?: SellersUpdated
  callCenterOperatorData?: CallCenterOperatorDataUpdated
  followUpEmail?: string
  lastMessage?: string
  hostname?: string
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  openTextField?: Record<string, unknown>
  roundingError?: number
  orderFormId?: string
  commercialConditionData?: string
  isCompleted?: boolean
  customData?: {
  customApps?: string[]
  customFields?: {
  linkedEntity?: {
  type?: string
  id?: string
}
  fields?: {
  name?: string
  value?: string
}[]
}[]
}
  storePreferencesData?: StorePreferencesDataUpdated
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  marketplace?: MarketplaceUpdated
  authorizedDate?: string
  invoicedDate?: string
  cancelReason?: string
  itemMetadata?: ItemMetadataUpdated
  subscriptionData?: SubscriptionDataUpdated
  taxData?: TaxDataUpdated
  checkedInPickupPointId?: string
  cancellationData?: CancellationDataUpdated
  cancellationRequests?: CancellationRequestsUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
}[]> {
    return this.http.request<{
  orderId?: string
  sequence?: string
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  sellerOrderId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  affiliateId?: string
  salesChannel?: string
  merchantName?: string
  status?: string
  statusDescription?: string
  value?: number
  creationDate?: string
  lastChange?: string
  orderGroup?: string
  totals?: TotalsUpdated
  items?: ItemsUpdated
  marketplaceItems?: string[]
  clientProfileData?: ClientProfileDataUpdated
  giftRegistryData?: GiftRegistryDataUpdated
  marketingData?: MarketingDataUpdated
  ratesAndBenefitsData?: RatesAndBenefitsDataUpdated
  shippingData?: ShippingDataUpdated
  paymentData?: PaymentDataUpdated
  packageAttachment?: PackageAttachmentUpdated
  sellers?: SellersUpdated
  callCenterOperatorData?: CallCenterOperatorDataUpdated
  followUpEmail?: string
  lastMessage?: string
  hostname?: string
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  openTextField?: Record<string, unknown>
  roundingError?: number
  orderFormId?: string
  commercialConditionData?: string
  isCompleted?: boolean
  customData?: {
  customApps?: string[]
  customFields?: {
  linkedEntity?: {
  type?: string
  id?: string
}
  fields?: {
  name?: string
  value?: string
}[]
}[]
}
  storePreferencesData?: StorePreferencesDataUpdated
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  marketplace?: MarketplaceUpdated
  authorizedDate?: string
  invoicedDate?: string
  cancelReason?: string
  itemMetadata?: ItemMetadataUpdated
  subscriptionData?: SubscriptionDataUpdated
  taxData?: TaxDataUpdated
  checkedInPickupPointId?: string
  cancellationData?: CancellationDataUpdated
  cancellationRequests?: CancellationRequestsUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
}[]>({ method: 'GET', path: `/api/oms/pvt/orders/order-group/${params.orderGroup}` })
  }

  listOrders(params: {
  orderBy?: string
  page?: number
  per_page?: number
  f_hasInputInvoice?: boolean
  q?: string
  f_shippingEstimate?: string
  f_invoicedDate?: string
  f_creationDate?: string
  f_authorizedDate?: string
  f_UtmSource?: string
  f_sellerNames?: string
  f_callCenterOperatorName?: string
  f_salesChannel?: string
  salesChannelId?: string
  f_affiliateId?: string
  f_status?: string
  incompleteOrders?: boolean
  f_paymentNames?: string
  f_RnB?: string
  searchField?: string
  f_isInstore?: boolean
}): Promise<ListOrders> {
    return this.http.request<ListOrders>({ method: 'GET', path: `/api/oms/pvt/orders`, query: { 'orderBy': params.orderBy, 'page': params.page, 'per_page': params.per_page, 'f_hasInputInvoice': params.f_hasInputInvoice, 'q': params.q, 'f_shippingEstimate': params.f_shippingEstimate, 'f_invoicedDate': params.f_invoicedDate, 'f_creationDate': params.f_creationDate, 'f_authorizedDate': params.f_authorizedDate, 'f_UtmSource': params.f_UtmSource, 'f_sellerNames': params.f_sellerNames, 'f_callCenterOperatorName': params.f_callCenterOperatorName, 'f_salesChannel': params.f_salesChannel, 'salesChannelId': params.salesChannelId, 'f_affiliateId': params.f_affiliateId, 'f_status': params.f_status, 'incompleteOrders': params.incompleteOrders, 'f_paymentNames': params.f_paymentNames, 'f_RnB': params.f_RnB, 'searchField': params.searchField, 'f_isInstore': params.f_isInstore } })
  }

  startHandling(params: {
  orderId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/oms/pvt/orders/${params.orderId}/start-handling` })
  }

  cancelOrder(params: {
  orderId: string
  body: {
  reason?: string
}
}): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>({ method: 'POST', path: `/api/oms/pvt/orders/${params.orderId}/cancel`, body: params.body })
  }

  registerChange(params: {
  orderId: string
  body: {
  requestId: string
  reason: string
  discountValue: number
  incrementValue: number
  itemsRemoved?: {
  id: string
  price: number
  quantity: number
}[]
  itemsAdded?: {
  id: string
  price: number
  quantity: number
}[]
}
}): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>({ method: 'POST', path: `/api/oms/pvt/orders/${params.orderId}/changes`, body: params.body })
  }

  addLog(params: {
  orderId: string
  body: {
  source: string
  message: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/oms/pvt/orders/${params.orderId}/interactions`, body: params.body })
  }
}
class OrdersApi_invoice {
  constructor(private http: VtexHttpClient) {}

  invoiceNotification(params: {
  orderId: string
  body: {
  type: "Output" | "Input"
  issuanceDate: string
  invoiceNumber: string
  invoiceValue: string
  invoiceKey?: string
  invoiceUrl?: string
  embeddedInvoice?: string
  courier?: string
  trackingNumber?: string
  trackingUrl?: string
  dispatchedDate?: string
  items: {
  id: string
  price: number
  description?: string
  quantity: number
}[]
}
}): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>({ method: 'POST', path: `/api/oms/pvt/orders/${params.orderId}/invoice`, body: params.body })
  }

  updatepartialinvoiceSendTrackingNumber(params: {
  orderId: string
  invoiceNumber: string
  body: UpdatepartialinvoiceSendTrackingNumberRequest
}): Promise<UpdatepartialinvoiceSendTrackingNumber> {
    return this.http.request<UpdatepartialinvoiceSendTrackingNumber>({ method: 'PATCH', path: `/api/oms/pvt/orders/${params.orderId}/invoice/${params.invoiceNumber}`, body: params.body })
  }
}
class OrdersApi_tracking {
  constructor(private http: VtexHttpClient) {}

  updateTrackingStatus(params: {
  orderId: string
  invoiceNumber: string
  body: UpdateTrackingStatusRequest
}): Promise<UpdateTrackingStatus> {
    return this.http.request<UpdateTrackingStatus>({ method: 'PUT', path: `/api/oms/pvt/orders/${params.orderId}/invoice/${params.invoiceNumber}/tracking`, body: params.body })
  }
}
class OrdersApi_conversation {
  constructor(private http: VtexHttpClient) {}

  getConversation(params: {
  orderId: string
}): Promise<GetConversation[]> {
    return this.http.request<GetConversation[]>({ method: 'GET', path: `/api/oms/pvt/orders/${params.orderId}/conversation-message` })
  }
}
class OrdersApi_payment {
  constructor(private http: VtexHttpClient) {}

  getPaymenttransaction(params: {
  orderId: string
}): Promise<GetPaymenttransaction> {
    return this.http.request<GetPaymenttransaction>({ method: 'GET', path: `/api/oms/pvt/orders/${params.orderId}/payment-transaction` })
  }

  sendPaymentNotification(params: {
  orderId: string
  paymentId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/oms/pvt/orders/${params.orderId}/payments/${params.paymentId}/payment-notification` })
  }
}
class OrdersApi_feedV2Deprecated {
  constructor(private http: VtexHttpClient) {}

  getfeedorderstatus(params: {
  maxLot: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/oms/pvt/feed/orders/status`, query: { 'maxLot': params.maxLot } })
  }
}
class OrdersApi_feedV3 {
  constructor(private http: VtexHttpClient) {}

  getFeedConfiguration(params: Record<string, never>): Promise<{
  filter?: {
  type?: string
  status?: string[]
  expression?: string
  disableSingleFire?: boolean
}
  queue?: {
  visibilityTimeoutInSeconds?: number
  MessageRetentionPeriodInSeconds?: number
}
  quantity?: number
  approximateAgeOfOldestMessageInSeconds?: number
}> {
    return this.http.request<{
  filter?: {
  type?: string
  status?: string[]
  expression?: string
  disableSingleFire?: boolean
}
  queue?: {
  visibilityTimeoutInSeconds?: number
  MessageRetentionPeriodInSeconds?: number
}
  quantity?: number
  approximateAgeOfOldestMessageInSeconds?: number
}>({ method: 'GET', path: `/api/orders/feed/config` })
  }

  feedConfiguration(params: {
  body: {
  filter: {
  type: string
  status?: string[]
  expression?: string
  disableSingleFire?: boolean
}
  queue: {
  visibilityTimeoutInSeconds: number
  MessageRetentionPeriodInSeconds: number
}
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/orders/feed/config`, body: params.body })
  }

  feedConfigurationDelete(params: Record<string, never>): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/orders/feed/config` })
  }

  getfeedorderstatus1(params: {
  maxlot: string
}): Promise<Getfeedorderstatus[]> {
    return this.http.request<Getfeedorderstatus[]>({ method: 'GET', path: `/api/orders/feed`, query: { 'maxlot': params.maxlot } })
  }

  commititemfeedorderstatus(params: {
  body: {
  handles: string[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/orders/feed`, body: params.body })
  }

  testJSONataExpression(params: {
  body: {
  Expression: string
  Document: string
}
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'POST', path: `/api/orders/expressions/jsonata`, body: params.body })
  }
}
class OrdersApi_orderHook {
  constructor(private http: VtexHttpClient) {}

  getHookConfiguration(params: {
  clientEmail?: string
  page?: string
  per_page?: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/orders/hook/config`, query: { 'clientEmail': params.clientEmail, 'page': params.page, 'per_page': params.per_page } })
  }

  hookConfiguration(params: {
  body: HookConfigurationRequest
}): Promise<HookConfiguration> {
    return this.http.request<HookConfiguration>({ method: 'POST', path: `/api/orders/hook/config`, body: params.body })
  }

  deleteHookConfiguration(params: Record<string, never>): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/orders/hook/config` })
  }
}
class OrdersApi_orderModifications {
  constructor(private http: VtexHttpClient) {}

  getChangeSummary(params: {
  orderId: string
}): Promise<ChangeSummary> {
    return this.http.request<ChangeSummary>({ method: 'GET', path: `/api/orders/pvt/document/${params.orderId}/change-summary` })
  }

  getChangeHistory(params: {
  changeOrderId: string
  an: string
}): Promise<{
  requests: {
  requestId: string
  workflowId: string
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: {
  id?: string
  name?: string
  value?: number
}[]
  add: Record<string, unknown>
  remove: Record<string, unknown>
  replace: {
  from: From2
  to: To2
}[]
  date: string
  origin: OriginV2
  settings: Settings
}[]
  actions: Record<string, unknown>[]
}> {
    return this.http.request<{
  requests: {
  requestId: string
  workflowId: string
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: {
  id?: string
  name?: string
  value?: number
}[]
  add: Record<string, unknown>
  remove: Record<string, unknown>
  replace: {
  from: From2
  to: To2
}[]
  date: string
  origin: OriginV2
  settings: Settings
}[]
  actions: Record<string, unknown>[]
}>({ method: 'GET', path: `/api/order-system/orders/${params.changeOrderId}/changes`, query: { 'an': params.an } })
  }

  createchange(params: {
  changeOrderId: string
  accountName: string
  body: Createchange
}): Promise<Response202> {
    return this.http.request<Response202>({ method: 'PATCH', path: `/api/order-system/orders/${params.changeOrderId}/changes`, query: { 'accountName': params.accountName }, body: params.body })
  }

  getChangeDetail(params: {
  changeOrderId: string
  changeRequestId: string
  an: string
}): Promise<{
  requestId: string
  workflowId: string
  status: string
  inProgress: boolean
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: {
  id?: string
  name?: string
  value?: number
}[]
  add: string[]
  remove: string[]
  replace: Replace1[]
  date: string
  origin: OriginV2
  settings: Settings
}> {
    return this.http.request<{
  requestId: string
  workflowId: string
  status: string
  inProgress: boolean
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: {
  id?: string
  name?: string
  value?: number
}[]
  add: string[]
  remove: string[]
  replace: Replace1[]
  date: string
  origin: OriginV2
  settings: Settings
}>({ method: 'GET', path: `/api/order-system/orders/${params.changeOrderId}/changes/${params.changeRequestId}`, query: { 'an': params.an } })
  }

  previewChange(params: {
  changeOrderId: string
  an: string
  body: {
  reason: string
  replace: Replace[]
}
}): Promise<{
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: {
  id?: string
  name?: string
  value?: number
}[]
  add: string[]
  remove: string[]
  replace: {
  from: From2
  to: To2
}[]
  date: string
  origin: OriginV2
  settings: Settings
}> {
    return this.http.request<{
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: {
  id?: string
  name?: string
  value?: number
}[]
  add: string[]
  remove: string[]
  replace: {
  from: From2
  to: To2
}[]
  date: string
  origin: OriginV2
  settings: Settings
}>({ method: 'POST', path: `/api/order-system/orders/${params.changeOrderId}/changes/preview`, query: { 'an': params.an }, body: params.body })
  }

  retryChange(params: {
  changeOrderId: string
  changeRequestId: string
  an: string
  body: Createchange
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/order-system/orders/${params.changeOrderId}/changes/${params.changeRequestId}/retry`, query: { 'an': params.an }, body: params.body })
  }

  cancelChangeStoppedonError(params: {
  changeOrderId: string
  changeRequestId: string
  an: string
  body: {
  reason: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/order-system/orders/${params.changeOrderId}/changes/${params.changeRequestId}/cancel`, query: { 'an': params.an }, body: params.body })
  }

  getApiOrderSystemOrdersChangesSettings(params: {
  an: string
}): Promise<ChangeOrderSettingsResponse> {
    return this.http.request<ChangeOrderSettingsResponse>({ method: 'GET', path: `/api/order-system/orders/changes/settings`, query: { 'an': params.an } })
  }

  putApiOrderSystemOrdersChangesSettings(params: {
  an: string
  body: {
  paymentConfiguration?: {
  customPaymentSystemsAllowed?: string[]
}
  rolloutConfiguration?: {
  enableApi?: boolean
  enableAdminOrders?: {
  enabledWorkspaces?: string[]
}
  enableMyOrders?: {
  enabledWorkspaces?: string[]
}
}
  pipelineConfiguration?: {
  enableTaxHubRecalculation?: boolean
  compensateShippingChanges?: boolean
}
}
}): Promise<ChangeOrderSettingsResponse> {
    return this.http.request<ChangeOrderSettingsResponse>({ method: 'PUT', path: `/api/order-system/orders/changes/settings`, query: { 'an': params.an }, body: params.body })
  }
}
class OrdersApi_userOrders {
  constructor(private http: VtexHttpClient) {}

  userorderslist(params: {
  clientEmail?: string
  page?: string
  per_page?: string
  text?: string
  status?: string
  creation_date?: string
  purchase_agent_id?: string
  my_pending_approvals?: boolean
}): Promise<Userorderslist> {
    return this.http.request<Userorderslist>({ method: 'GET', path: `/api/oms/user/orders`, query: { 'clientEmail': params.clientEmail, 'page': params.page, 'per_page': params.per_page, 'text': params.text, 'status': params.status, 'creation_date': params.creation_date, 'purchase_agent_id': params.purchase_agent_id, 'my_pending_approvals': params.my_pending_approvals } })
  }

  userorderdetails(params: {
  orderId: string
  clientEmail?: string
  text?: string
  status?: string
  creation_date?: string
  purchase_agent_id?: string
  my_pending_approvals?: boolean
}): Promise<Userorderdetails> {
    return this.http.request<Userorderdetails>({ method: 'GET', path: `/api/oms/user/orders/${params.orderId}`, query: { 'clientEmail': params.clientEmail, 'text': params.text, 'status': params.status, 'creation_date': params.creation_date, 'purchase_agent_id': params.purchase_agent_id, 'my_pending_approvals': params.my_pending_approvals } })
  }
}
class OrdersApi_changeSeller {
  constructor(private http: VtexHttpClient) {}

  getWindowToChangeSeller(params: Record<string, never>): Promise<number> {
    return this.http.request<number>({ method: 'GET', path: `/api/checkout/pvt/configuration/window-to-change-seller` })
  }

  updateWindowToChangeSeller(params: {
  body: {
  waitingTime: number
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/checkout/pvt/configuration/window-to-change-seller`, body: params.body })
  }
}

export class OrdersApi {
  readonly orders: OrdersApi_orders
  readonly invoice: OrdersApi_invoice
  readonly tracking: OrdersApi_tracking
  readonly conversation: OrdersApi_conversation
  readonly payment: OrdersApi_payment
  readonly feedV2Deprecated: OrdersApi_feedV2Deprecated
  readonly feedV3: OrdersApi_feedV3
  readonly orderHook: OrdersApi_orderHook
  readonly orderModifications: OrdersApi_orderModifications
  readonly userOrders: OrdersApi_userOrders
  readonly changeSeller: OrdersApi_changeSeller
  constructor(http: VtexHttpClient) {
    this.orders = new OrdersApi_orders(http)
    this.invoice = new OrdersApi_invoice(http)
    this.tracking = new OrdersApi_tracking(http)
    this.conversation = new OrdersApi_conversation(http)
    this.payment = new OrdersApi_payment(http)
    this.feedV2Deprecated = new OrdersApi_feedV2Deprecated(http)
    this.feedV3 = new OrdersApi_feedV3(http)
    this.orderHook = new OrdersApi_orderHook(http)
    this.orderModifications = new OrdersApi_orderModifications(http)
    this.userOrders = new OrdersApi_userOrders(http)
    this.changeSeller = new OrdersApi_changeSeller(http)
  }
}
