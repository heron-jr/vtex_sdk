import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { TotalsUpdated, ItemsUpdated, ClientProfileDataUpdated, GiftRegistryDataUpdated, MarketingDataUpdated, RatesAndBenefitsDataUpdated, ShippingDataUpdated, PickupStoreInfoUpdated, PaymentDataUpdated, PackageAttachmentUpdated, SellersUpdated, InvoiceDataUpdated, ChangesAttachmentUpdated, CallCenterOperatorDataUpdated, StorePreferencesDataUpdated, MarketplaceUpdated, ItemMetadataUpdated, SubscriptionDataUpdated, TaxDataUpdated, CancellationDataUpdated, CancellationRequestsUpdated, ClientPreferencesDataUpdated, Total, Item, ItemAttachment, AdditionalInfo, Dimension, ClientProfileData, RatesAndBenefitsData, ShippingData, Address, LogisticsInfo, Sla, PickupStoreInfo, DeliveryId, SelectedAddress, PaymentData, Transaction, Payment, PackageAttachment, Seller, ChangesAttachment, ChangesDatum, ItemsRemoved, Receipt, StorePreferencesData, CurrencyFormatInfo, Marketplace, ListOrders, List, Paging, Stats, Stats1, TotalValue, Facets, Origin, Fulfillment, Marketplace1, CurrencyCode, BRL, TotalItems, Facets1, Origin1, Fulfillment1, Marketplace2, CurrencyCode1, BRL1, UpdatepartialinvoiceSendTrackingNumberRequest, UpdatepartialinvoiceSendTrackingNumber, UpdateTrackingStatusRequest, Event, UpdateTrackingStatus, GetConversation, From, To, GetPaymenttransaction, Payment1, ConnectorResponses, ConfirmitemfeedorderstatusRequest, Getfeedorderstatus, HookFilter, HookConfigurationRequest, Hook, Headers, HookConfiguration, Origin2, Userorderslist, List1, Item2, Stats2, Stats3, TotalValue1, TotalItems1, Userorderdetails, Createchange, Replace, Response202, Replace1, PaymentDataV2, ShippingData1, Item3, AdditionalInfoV2, LogisticsInfo1, SlaV2, PickupStoreInfoV2, OriginV2, Settings, From2, Item4, ShippingData3, LogisticsInfo2, DeliveryIdV2, DeliveryChannel, To2, PriceDefinition, ChangeOrderSettingsResponse, AuthorizationPolicyData, ChangeSummary, DeliveryIdResponse } from './types.js'

class OrdersApi_orders {
  constructor(private http: VtexHttpClient) {}

  async getOrder(params: {
  orderId: string
}, opts?: CallOptions): Promise<{
  orderId?: string
  sequence?: string
  marketplaceOrderId?: string
  marketplaceServicesEndpoint?: string
  sellerOrderId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  affiliateId?: string
  salesChannel?: string
  merchantName?: string | null
  status?: string
  workflowIsInError?: boolean
  statusDescription?: string
  value?: number
  creationDate?: string
  lastChange?: string
  orderGroup?: string
  followUpEmail?: string
  lastMessage?: string | null
  hostname?: string
  isCompleted?: boolean
  roundingError?: number
  orderFormId?: string
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  authorizedDate?: string | null
  invoicedDate?: string | null
  cancelReason?: string | null
  checkedInPickupPointId?: string | null
  totals?: TotalsUpdated
  sellers?: SellersUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
  cancellationData?: {
  RequestedByUser?: boolean | null
  RequestedBySystem?: boolean | null
  RequestedBySellerNotification?: boolean | null
  RequestedByPaymentNotification?: boolean | null
  Reason?: string | null
  CancellationDate?: string | null
} | null
  taxData?: TaxDataUpdated
  subscriptionData?: {
  SubscriptionGroupId?: string | null
  Subscriptions?: {
  ExecutionCount?: number
  PriceAtSubscriptionDate?: number | null
  ItemIndex?: number
  Plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAY" | "WEEK" | "MONTH" | "YEAR"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string | null
}
}
}[] | null
} | null
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
  InputValues?: {
  [key: string]: unknown
} | null
  Composition?: {
  [key: string]: unknown
} | null
}[] | null
}[]
}
  marketplace?: MarketplaceUpdated
  storePreferencesData?: StorePreferencesDataUpdated
  customData?: {
  customApps?: ({
  id?: string
  major?: number
  fields?: {
  marketplacePaymentCnpjAcquirers?: string
  marketplacePaymentAuthorizationCodes?: string
  marketplacePaymentCreditCardBrands?: string
  marketplacePaymentMethods?: string
}
} | null)[] | null
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
} | null
  commercialConditionData?: string | null
  openTextField?: {
  [key: string]: string
} | null
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  callCenterOperatorData?: CallCenterOperatorDataUpdated
  packageAttachment?: {
  packages?: {
  items?: {
  itemIndex?: number
  quantity?: number
  price?: number
  description?: string | null
  unitMultiplier?: number | null
}[]
  courier?: string | null
  invoiceNumber?: string
  invoiceValue?: number
  invoiceUrl?: string | null
  issuanceDate?: string
  trackingNumber?: string | null
  invoiceKey?: string | null
  trackingUrl?: string | null
  embeddedInvoice?: string
  type?: "Output" | "Input"
  courierStatus?: {
  status?: string | null
  finished?: boolean
  deliveredDate?: string
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
} | null
  cfop?: string | null
  restitutions?: {
  Refund?: {
  value?: number
  giftCardData?: string | null
  items?: {
  useFreight?: boolean | null
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[] | null
}
}
  volumes?: number
  EnableInferItems?: boolean | null
}[]
} | null
  paymentData?: PaymentDataUpdated
  shippingData?: {
  id?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  versionId?: string | null
  entityId?: string | null
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string | null
  geoCoordinates?: number[]
}
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  lockTTL?: string
  price?: number
  listPrice?: number
  sellingPrice?: number
  deliveryWindow?: string | null
  deliveryCompany?: string
  shippingEstimate?: string
  shippingEstimateDate?: string
  slas?: {
  id?: string
  name?: string
  shippingEstimate?: string
  deliveryWindow?: string | null
  price?: number
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string | null
  address?: {
  addressType?: string | null
  receiverName?: string | null
  addressId?: string | null
  versionId?: string | null
  entityId?: string | null
  postalCode?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
  street?: string | null
  number?: string | null
  neighborhood?: string | null
  complement?: string | null
  reference?: string | null
  geoCoordinates?: (number | null)[] | null
} | null
  dockId?: string | null
  friendlyName?: string | null
  isPickupStore?: boolean
}
  polygonName?: string | null
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
  kitItemDetails?: string[] | null
}[]
  deliveryChannels?: {
  id?: string
  stockBalance?: number
}[]
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string | null
  address?: string | null
  dockId?: string | null
  friendlyName?: string | null
  isPickupStore?: boolean
} | null
  addressId?: string | null
  versionId?: string | null
  entityId?: string | null
  polygonName?: string | null
  pickupPointId?: string | null
  transitTime?: string | null
}[]
  trackingHints?: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[] | null
  selectedAddresses?: {
  addressId?: string
  versionId?: string | null
  entityId?: string | null
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
  reference?: string | null
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
  description?: string | null
  featured?: boolean
  id?: string
  name?: string
  matchedParameters?: {
  [key: string]: unknown
}
  additionalInfo?: Record<string, unknown> | null
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
} | null
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
} | null
  clientProfileData?: {
  id?: string
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
  userProfileId?: string
  userProfileVersion?: string | null
  customerClass?: string | null
  customerCode?: string | null
}
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  ean?: string | null
  lockId?: string
  itemAttachment?: {
  content?: Record<string, unknown>
  name?: string | null
}
  attachments?: string[]
  quantity?: number
  seller?: string
  name?: string
  refId?: string
  price?: number
  listPrice?: number
  manualPrice?: string | null
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
  name?: string | null
  required?: boolean | null
  schema?: Record<string, unknown> | null
}[] | null
  sellerSku?: string
  priceValidUntil?: string | null
  commission?: number
  tax?: number
  preSaleDate?: string | null
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
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  measurementUnit?: string
  unitMultiplier?: number
  sellingPrice?: number
  isGift?: boolean
  shippingPrice?: string | null
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
  taxCode?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  callCenterOperator?: string | null
  serialNumbers?: string | null
  assemblies?: string[] | null
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
  merchantName?: string | null
  status?: string
  workflowIsInError?: boolean
  statusDescription?: string
  value?: number
  creationDate?: string
  lastChange?: string
  orderGroup?: string
  followUpEmail?: string
  lastMessage?: string | null
  hostname?: string
  isCompleted?: boolean
  roundingError?: number
  orderFormId?: string
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  authorizedDate?: string | null
  invoicedDate?: string | null
  cancelReason?: string | null
  checkedInPickupPointId?: string | null
  totals?: TotalsUpdated
  sellers?: SellersUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
  cancellationData?: {
  RequestedByUser?: boolean | null
  RequestedBySystem?: boolean | null
  RequestedBySellerNotification?: boolean | null
  RequestedByPaymentNotification?: boolean | null
  Reason?: string | null
  CancellationDate?: string | null
} | null
  taxData?: TaxDataUpdated
  subscriptionData?: {
  SubscriptionGroupId?: string | null
  Subscriptions?: {
  ExecutionCount?: number
  PriceAtSubscriptionDate?: number | null
  ItemIndex?: number
  Plan?: {
  type?: string
  frequency?: {
  periodicity?: "DAY" | "WEEK" | "MONTH" | "YEAR"
  interval?: number
}
  validity?: {
  begin?: string
  end?: string | null
}
}
}[] | null
} | null
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
  InputValues?: {
  [key: string]: unknown
} | null
  Composition?: {
  [key: string]: unknown
} | null
}[] | null
}[]
}
  marketplace?: MarketplaceUpdated
  storePreferencesData?: StorePreferencesDataUpdated
  customData?: {
  customApps?: ({
  id?: string
  major?: number
  fields?: {
  marketplacePaymentCnpjAcquirers?: string
  marketplacePaymentAuthorizationCodes?: string
  marketplacePaymentCreditCardBrands?: string
  marketplacePaymentMethods?: string
}
} | null)[] | null
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
} | null
  commercialConditionData?: string | null
  openTextField?: {
  [key: string]: string
} | null
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  callCenterOperatorData?: CallCenterOperatorDataUpdated
  packageAttachment?: {
  packages?: {
  items?: {
  itemIndex?: number
  quantity?: number
  price?: number
  description?: string | null
  unitMultiplier?: number | null
}[]
  courier?: string | null
  invoiceNumber?: string
  invoiceValue?: number
  invoiceUrl?: string | null
  issuanceDate?: string
  trackingNumber?: string | null
  invoiceKey?: string | null
  trackingUrl?: string | null
  embeddedInvoice?: string
  type?: "Output" | "Input"
  courierStatus?: {
  status?: string | null
  finished?: boolean
  deliveredDate?: string
  data?: {
  lastChange?: string
  city?: string
  state?: string
  description?: string
  createDate?: string
}[]
} | null
  cfop?: string | null
  restitutions?: {
  Refund?: {
  value?: number
  giftCardData?: string | null
  items?: {
  useFreight?: boolean | null
  isCompensation?: boolean
  compensationValue?: number
  id?: string
  quantity?: number
  price?: number
  description?: string
}[] | null
}
}
  volumes?: number
  EnableInferItems?: boolean | null
}[]
} | null
  paymentData?: PaymentDataUpdated
  shippingData?: {
  id?: string
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  versionId?: string | null
  entityId?: string | null
  postalCode?: string
  city?: string
  state?: string
  country?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  reference?: string | null
  geoCoordinates?: number[]
}
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  lockTTL?: string
  price?: number
  listPrice?: number
  sellingPrice?: number
  deliveryWindow?: string | null
  deliveryCompany?: string
  shippingEstimate?: string
  shippingEstimateDate?: string
  slas?: {
  id?: string
  name?: string
  shippingEstimate?: string
  deliveryWindow?: string | null
  price?: number
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string | null
  address?: {
  addressType?: string | null
  receiverName?: string | null
  addressId?: string | null
  versionId?: string | null
  entityId?: string | null
  postalCode?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
  street?: string | null
  number?: string | null
  neighborhood?: string | null
  complement?: string | null
  reference?: string | null
  geoCoordinates?: (number | null)[] | null
} | null
  dockId?: string | null
  friendlyName?: string | null
  isPickupStore?: boolean
}
  polygonName?: string | null
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
  kitItemDetails?: string[] | null
}[]
  deliveryChannels?: {
  id?: string
  stockBalance?: number
}[]
  selectedDeliveryChannel?: string
  pickupStoreInfo?: {
  additionalInfo?: string | null
  address?: string | null
  dockId?: string | null
  friendlyName?: string | null
  isPickupStore?: boolean
} | null
  addressId?: string | null
  versionId?: string | null
  entityId?: string | null
  polygonName?: string | null
  pickupPointId?: string | null
  transitTime?: string | null
}[]
  trackingHints?: {
  trackingId?: string
  courierName?: string
  trackingUrl?: string
  trackingLabel?: string
}[] | null
  selectedAddresses?: {
  addressId?: string
  versionId?: string | null
  entityId?: string | null
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
  reference?: string | null
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
  description?: string | null
  featured?: boolean
  id?: string
  name?: string
  matchedParameters?: {
  [key: string]: unknown
}
  additionalInfo?: Record<string, unknown> | null
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
} | null
  giftRegistryData?: {
  giftRegistryId?: string
  giftRegistryType?: string
  giftRegistryTypeName?: string
  addressId?: string
  description?: string
} | null
  clientProfileData?: {
  id?: string
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
  userProfileId?: string
  userProfileVersion?: string | null
  customerClass?: string | null
  customerCode?: string | null
}
  items?: {
  uniqueId?: string
  id?: string
  productId?: string
  ean?: string | null
  lockId?: string
  itemAttachment?: {
  content?: Record<string, unknown>
  name?: string | null
}
  attachments?: string[]
  quantity?: number
  seller?: string
  name?: string
  refId?: string
  price?: number
  listPrice?: number
  manualPrice?: string | null
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
  name?: string | null
  required?: boolean | null
  schema?: Record<string, unknown> | null
}[] | null
  sellerSku?: string
  priceValidUntil?: string | null
  commission?: number
  tax?: number
  preSaleDate?: string | null
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
  offeringInfo?: string | null
  offeringType?: string | null
  offeringTypeId?: string | null
}
  measurementUnit?: string
  unitMultiplier?: number
  sellingPrice?: number
  isGift?: boolean
  shippingPrice?: string | null
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
  taxCode?: string | null
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  callCenterOperator?: string | null
  serialNumbers?: string | null
  assemblies?: string[] | null
  costPrice?: number
}[]
  marketplaceItems?: string[]
  authorizationPolicyData?: AuthorizationPolicyData
}>(withCall({ method: 'GET', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}` }, opts))
  }

  async getApiOmsPvtOrdersOrderGroupByOrderGroup(params: {
  orderGroup: string
}, opts?: CallOptions): Promise<{
  orderId?: string
  sequence?: string
  marketplaceOrderId?: string | null
  marketplaceServicesEndpoint?: string | null
  sellerOrderId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  affiliateId?: string | null
  salesChannel?: string
  merchantName?: string | null
  status?: string
  statusDescription?: string | null
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
  lastMessage?: string | null
  hostname?: string
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  openTextField?: {
  [key: string]: string
} | null
  roundingError?: number
  orderFormId?: string
  commercialConditionData?: string | null
  isCompleted?: boolean
  customData?: {
  customApps?: (string | null)[] | null
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
} | null
  storePreferencesData?: StorePreferencesDataUpdated
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  marketplace?: MarketplaceUpdated
  authorizedDate?: string | null
  invoicedDate?: string | null
  cancelReason?: string | null
  itemMetadata?: ItemMetadataUpdated
  subscriptionData?: SubscriptionDataUpdated
  taxData?: TaxDataUpdated
  checkedInPickupPointId?: string | null
  cancellationData?: CancellationDataUpdated
  cancellationRequests?: CancellationRequestsUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
}[]> {
    return this.http.request<{
  orderId?: string
  sequence?: string
  marketplaceOrderId?: string | null
  marketplaceServicesEndpoint?: string | null
  sellerOrderId?: string
  origin?: "Marketplace" | "Fulfillment" | "Chain"
  affiliateId?: string | null
  salesChannel?: string
  merchantName?: string | null
  status?: string
  statusDescription?: string | null
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
  lastMessage?: string | null
  hostname?: string
  invoiceData?: InvoiceDataUpdated
  changesAttachment?: ChangesAttachmentUpdated
  openTextField?: {
  [key: string]: string
} | null
  roundingError?: number
  orderFormId?: string
  commercialConditionData?: string | null
  isCompleted?: boolean
  customData?: {
  customApps?: (string | null)[] | null
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
} | null
  storePreferencesData?: StorePreferencesDataUpdated
  allowCancellation?: boolean
  allowEdition?: boolean
  isCheckedIn?: boolean
  marketplace?: MarketplaceUpdated
  authorizedDate?: string | null
  invoicedDate?: string | null
  cancelReason?: string | null
  itemMetadata?: ItemMetadataUpdated
  subscriptionData?: SubscriptionDataUpdated
  taxData?: TaxDataUpdated
  checkedInPickupPointId?: string | null
  cancellationData?: CancellationDataUpdated
  cancellationRequests?: CancellationRequestsUpdated
  clientPreferencesData?: ClientPreferencesDataUpdated
}[]>(withCall({ method: 'GET', path: `/api/oms/pvt/orders/order-group/${encodePathParam(params.orderGroup)}` }, opts))
  }

  async listOrders(params: {
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
} = {}, opts?: CallOptions): Promise<ListOrders> {
    return this.http.request<ListOrders>(withCall({ method: 'GET', path: `/api/oms/pvt/orders`, query: { 'orderBy': params.orderBy, 'page': params.page, 'per_page': params.per_page, 'f_hasInputInvoice': params.f_hasInputInvoice, 'q': params.q, 'f_shippingEstimate': params.f_shippingEstimate, 'f_invoicedDate': params.f_invoicedDate, 'f_creationDate': params.f_creationDate, 'f_authorizedDate': params.f_authorizedDate, 'f_UtmSource': params.f_UtmSource, 'f_sellerNames': params.f_sellerNames, 'f_callCenterOperatorName': params.f_callCenterOperatorName, 'f_salesChannel': params.f_salesChannel, 'salesChannelId': params.salesChannelId, 'f_affiliateId': params.f_affiliateId, 'f_status': params.f_status, 'incompleteOrders': params.incompleteOrders, 'f_paymentNames': params.f_paymentNames, 'f_RnB': params.f_RnB, 'searchField': params.searchField, 'f_isInstore': params.f_isInstore } }, opts))
  }

  async startHandling(params: {
  orderId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/start-handling` }, opts))
  }

  async cancelOrder(params: {
  orderId: string
  body: {
  reason?: string
}
}, opts?: CallOptions): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>(withCall({ method: 'POST', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/cancel`, body: params.body }, opts))
  }

  async registerChange(params: {
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
}, opts?: CallOptions): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>(withCall({ method: 'POST', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/changes`, body: params.body }, opts))
  }

  async addLog(params: {
  orderId: string
  body: {
  source: string
  message: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/interactions`, body: params.body }, opts))
  }
}
class OrdersApi_invoice {
  constructor(private http: VtexHttpClient) {}

  async invoiceNotification(params: {
  orderId: string
  body: {
  type: "Output" | "Input"
  issuanceDate: string
  invoiceNumber: string | null
  invoiceValue: string
  invoiceKey?: string | null
  invoiceUrl?: string | null
  embeddedInvoice?: string | null
  courier?: string
  trackingNumber?: string | null
  trackingUrl?: string | null
  dispatchedDate?: string | null
  items: {
  id: string
  price: number
  description?: string
  quantity: number
}[]
}
}, opts?: CallOptions): Promise<{
  date?: string
  orderId?: string
  receipt?: string
}> {
    return this.http.request<{
  date?: string
  orderId?: string
  receipt?: string
}>(withCall({ method: 'POST', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/invoice`, body: params.body }, opts))
  }

  async updatepartialinvoiceSendTrackingNumber(params: {
  orderId: string
  invoiceNumber: string
  body: UpdatepartialinvoiceSendTrackingNumberRequest
}, opts?: CallOptions): Promise<UpdatepartialinvoiceSendTrackingNumber> {
    return this.http.request<UpdatepartialinvoiceSendTrackingNumber>(withCall({ method: 'PATCH', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/invoice/${encodePathParam(params.invoiceNumber)}`, body: params.body }, opts))
  }
}
class OrdersApi_tracking {
  constructor(private http: VtexHttpClient) {}

  async updateTrackingStatus(params: {
  orderId: string
  invoiceNumber: string
  body: UpdateTrackingStatusRequest
}, opts?: CallOptions): Promise<UpdateTrackingStatus> {
    return this.http.request<UpdateTrackingStatus>(withCall({ method: 'PUT', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/invoice/${encodePathParam(params.invoiceNumber)}/tracking`, body: params.body }, opts))
  }
}
class OrdersApi_conversation {
  constructor(private http: VtexHttpClient) {}

  async getConversation(params: {
  orderId: string
}, opts?: CallOptions): Promise<GetConversation[]> {
    return this.http.request<GetConversation[]>(withCall({ method: 'GET', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/conversation-message` }, opts))
  }
}
class OrdersApi_payment {
  constructor(private http: VtexHttpClient) {}

  async getPaymenttransaction(params: {
  orderId: string
}, opts?: CallOptions): Promise<GetPaymenttransaction> {
    return this.http.request<GetPaymenttransaction>(withCall({ method: 'GET', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/payment-transaction` }, opts))
  }

  async sendPaymentNotification(params: {
  orderId: string
  paymentId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/oms/pvt/orders/${encodePathParam(params.orderId)}/payments/${encodePathParam(params.paymentId)}/payment-notification` }, opts))
  }
}
class OrdersApi_feedV2Deprecated {
  constructor(private http: VtexHttpClient) {}

  async getfeedorderstatus(params: {
  maxLot: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/oms/pvt/feed/orders/status`, query: { 'maxLot': params.maxLot } }, opts))
  }
}
class OrdersApi_feedV3 {
  constructor(private http: VtexHttpClient) {}

  async getFeedConfiguration(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/orders/feed/config` }, opts))
  }

  async feedConfiguration(params: {
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/orders/feed/config`, body: params.body }, opts))
  }

  async feedConfigurationDelete(params: Record<string, never> = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/orders/feed/config` }, opts))
  }

  async getfeedorderstatus1(params: {
  maxlot: string
}, opts?: CallOptions): Promise<Getfeedorderstatus[]> {
    return this.http.request<Getfeedorderstatus[]>(withCall({ method: 'GET', path: `/api/orders/feed`, query: { 'maxlot': params.maxlot } }, opts))
  }

  async commititemfeedorderstatus(params: {
  body: {
  handles: string[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/orders/feed`, body: params.body }, opts))
  }

  async testJSONataExpression(params: {
  body: {
  Expression: string
  Document: string
}
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'POST', path: `/api/orders/expressions/jsonata`, body: params.body }, opts))
  }
}
class OrdersApi_orderHook {
  constructor(private http: VtexHttpClient) {}

  async getHookConfiguration(params: {
  clientEmail?: string
  page?: string
  per_page?: string
} = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/orders/hook/config`, query: { 'clientEmail': params.clientEmail, 'page': params.page, 'per_page': params.per_page } }, opts))
  }

  async hookConfiguration(params: {
  body: HookConfigurationRequest
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/orders/hook/config`, body: params.body }, opts))
  }

  async deleteHookConfiguration(params: Record<string, never> = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/orders/hook/config` }, opts))
  }
}
class OrdersApi_orderModifications {
  constructor(private http: VtexHttpClient) {}

  async getChangeSummary(params: {
  orderId: string
}, opts?: CallOptions): Promise<ChangeSummary> {
    return this.http.request<ChangeSummary>(withCall({ method: 'GET', path: `/api/orders/pvt/document/${encodePathParam(params.orderId)}/change-summary` }, opts))
  }

  async getChangeHistory(params: {
  changeOrderId: string
  an: string
}, opts?: CallOptions): Promise<{
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
  add: Record<string, unknown> | null
  remove: Record<string, unknown> | null
  replace: {
  from: From2
  to: To2
}[]
  date: string
  origin: OriginV2
  settings: Settings
}[]
  actions: (Record<string, unknown> | null)[]
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
  add: Record<string, unknown> | null
  remove: Record<string, unknown> | null
  replace: {
  from: From2
  to: To2
}[]
  date: string
  origin: OriginV2
  settings: Settings
}[]
  actions: (Record<string, unknown> | null)[]
}>(withCall({ method: 'GET', path: `/api/order-system/orders/${encodePathParam(params.changeOrderId)}/changes`, query: { 'an': params.an } }, opts))
  }

  async createchange(params: {
  changeOrderId: string
  accountName: string
  body: Createchange
}, opts?: CallOptions): Promise<Response202> {
    return this.http.request<Response202>(withCall({ method: 'PATCH', path: `/api/order-system/orders/${encodePathParam(params.changeOrderId)}/changes`, query: { 'accountName': params.accountName }, body: params.body }, opts))
  }

  async getChangeDetail(params: {
  changeOrderId: string
  changeRequestId: string
  an: string
}, opts?: CallOptions): Promise<{
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
  add: string[] | null
  remove: string[] | null
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
  add: string[] | null
  remove: string[] | null
  replace: Replace1[]
  date: string
  origin: OriginV2
  settings: Settings
}>(withCall({ method: 'GET', path: `/api/order-system/orders/${encodePathParam(params.changeOrderId)}/changes/${encodePathParam(params.changeRequestId)}`, query: { 'an': params.an } }, opts))
  }

  async previewChange(params: {
  changeOrderId: string
  an: string
  body: {
  reason: string
  replace: Replace[]
}
}, opts?: CallOptions): Promise<{
  reason: string
  manualDiscountValue: number
  manualIncrementValue: number
  totalChangeValue: number
  totals: {
  id?: string
  name?: string
  value?: number
}[]
  add: string[] | null
  remove: string[] | null
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
  add: string[] | null
  remove: string[] | null
  replace: {
  from: From2
  to: To2
}[]
  date: string
  origin: OriginV2
  settings: Settings
}>(withCall({ method: 'POST', path: `/api/order-system/orders/${encodePathParam(params.changeOrderId)}/changes/preview`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async retryChange(params: {
  changeOrderId: string
  changeRequestId: string
  an: string
  body: Createchange
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/order-system/orders/${encodePathParam(params.changeOrderId)}/changes/${encodePathParam(params.changeRequestId)}/retry`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async cancelChangeStoppedonError(params: {
  changeOrderId: string
  changeRequestId: string
  an: string
  body: {
  reason: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/order-system/orders/${encodePathParam(params.changeOrderId)}/changes/${encodePathParam(params.changeRequestId)}/cancel`, query: { 'an': params.an }, body: params.body }, opts))
  }

  async getApiOrderSystemOrdersChangesSettings(params: {
  an: string
}, opts?: CallOptions): Promise<ChangeOrderSettingsResponse> {
    return this.http.request<ChangeOrderSettingsResponse>(withCall({ method: 'GET', path: `/api/order-system/orders/changes/settings`, query: { 'an': params.an } }, opts))
  }

  async putApiOrderSystemOrdersChangesSettings(params: {
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
}, opts?: CallOptions): Promise<ChangeOrderSettingsResponse> {
    return this.http.request<ChangeOrderSettingsResponse>(withCall({ method: 'PUT', path: `/api/order-system/orders/changes/settings`, query: { 'an': params.an }, body: params.body }, opts))
  }
}
class OrdersApi_userOrders {
  constructor(private http: VtexHttpClient) {}

  async userorderslist(params: {
  clientEmail?: string
  page?: string
  per_page?: string
  text?: string
  status?: string
  creation_date?: string
  purchase_agent_id?: string
  my_pending_approvals?: boolean
} = {}, opts?: CallOptions): Promise<Userorderslist> {
    return this.http.request<Userorderslist>(withCall({ method: 'GET', path: `/api/oms/user/orders`, query: { 'clientEmail': params.clientEmail, 'page': params.page, 'per_page': params.per_page, 'text': params.text, 'status': params.status, 'creation_date': params.creation_date, 'purchase_agent_id': params.purchase_agent_id, 'my_pending_approvals': params.my_pending_approvals } }, opts))
  }

  async userorderdetails(params: {
  orderId: string
  clientEmail?: string
  text?: string
  status?: string
  creation_date?: string
  purchase_agent_id?: string
  my_pending_approvals?: boolean
}, opts?: CallOptions): Promise<Userorderdetails> {
    return this.http.request<Userorderdetails>(withCall({ method: 'GET', path: `/api/oms/user/orders/${encodePathParam(params.orderId)}`, query: { 'clientEmail': params.clientEmail, 'text': params.text, 'status': params.status, 'creation_date': params.creation_date, 'purchase_agent_id': params.purchase_agent_id, 'my_pending_approvals': params.my_pending_approvals } }, opts))
  }
}
class OrdersApi_changeSeller {
  constructor(private http: VtexHttpClient) {}

  async getWindowToChangeSeller(params: Record<string, never> = {}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'GET', path: `/api/checkout/pvt/configuration/window-to-change-seller` }, opts))
  }

  async updateWindowToChangeSeller(params: {
  body: {
  waitingTime: number
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/checkout/pvt/configuration/window-to-change-seller`, body: params.body }, opts))
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
