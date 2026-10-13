import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class CheckoutCustomCardPaymentApi_profileManagement {
  constructor(private http: VtexHttpClient) {}

  postApiProfileSystemPvtProfiles(params: {
  body: {
  personalData: {
  email: string
  firstName: string
  lastName: string
  document?: string
  documentType?: string
  gender?: string
  homePhone?: string
  cellPhone?: string
  businessPhone?: string
  isPJ?: boolean
}
  addresses: {
  [key: string]: {
  addressId?: string
  receiverName?: string
  isDisposable?: boolean
  addressType?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
}
}
}
}, opts?: CallOptions): Promise<{
  profileId?: string
}> {
    return this.http.request<{
  profileId?: string
}>(withCall({ method: 'POST', path: `/api/profile-system/pvt/profiles`, body: params.body }, opts))
  }

  getApiProfileSystemPvtProfilesByProfileIdVcsCheckout(params: {
  profileId: string
}, opts?: CallOptions): Promise<{
  paymentData?: string
  orderFormIds?: string
  lastOrderTimestamp?: string
  lastUserPurchases?: string
}> {
    return this.http.request<{
  paymentData?: string
  orderFormIds?: string
  lastOrderTimestamp?: string
  lastUserPurchases?: string
}>(withCall({ method: 'GET', path: `/api/profile-system/pvt/profiles/${encodePathParam(params.profileId)}/vcs-checkout` }, opts))
  }

  deleteApiProfileSystemPvtProfilesByProfileIdPersonalData(params: {
  profileId: string
  an: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/profile-system/pvt/profiles/${encodePathParam(params.profileId)}/personalData`, query: { 'an': params.an } }, opts))
  }
}
class CheckoutCustomCardPaymentApi_cardTokenVault {
  constructor(private http: VtexHttpClient) {}

  postApiCardTokenVaultTokens(params: {
  body: {
  providerId: string
  card: {
  paymentSystemName: string
  paymentSystemId: string
  firstDigits: string
  lastDigits: string
  address?: {
  addressType?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
}
  holderName: string
}
  cardTokenData: {
  type: string
  value: string
  expiration: string
  label?: string
  useCvvForAuthorization?: boolean
}
  email: string
}
}, opts?: CallOptions): Promise<{
  id?: string
  accountName?: string
  providerId?: string
  card?: {
  paymentSystemId?: string
  paymentSystemName?: string
  firstDigits?: string
  lastDigits?: string
  holderName?: string
  address?: {
  addressType?: string
  addressId?: string | null
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string | null
}
}
  cardTokenData?: {
  type?: string
  expiration?: string
  value?: string
  label?: string
  useCvvForAuthorization?: boolean
}
}> {
    return this.http.request<{
  id?: string
  accountName?: string
  providerId?: string
  card?: {
  paymentSystemId?: string
  paymentSystemName?: string
  firstDigits?: string
  lastDigits?: string
  holderName?: string
  address?: {
  addressType?: string
  addressId?: string | null
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string | null
}
}
  cardTokenData?: {
  type?: string
  expiration?: string
  value?: string
  label?: string
  useCvvForAuthorization?: boolean
}
}>(withCall({ method: 'POST', path: `/api/card-token-vault/tokens`, body: params.body }, opts))
  }
}
class CheckoutCustomCardPaymentApi_checkoutOperations {
  constructor(private http: VtexHttpClient) {}

  postApiCheckoutPubOrderFormByOrderFormIdItems(params: {
  orderFormId: string
  body: {
  orderItems: {
  id: number
  seller: string
  quantity: number
}[]
}
}, opts?: CallOptions): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
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
  modalType?: string
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  assemblies?: string[]
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
  productCategories?: Record<string, unknown>
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  components?: string[]
  bundleItems?: string[]
  attachments?: string[]
  attachmentOfferings?: string[]
  offerings?: string[]
  priceTags?: string[]
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
  reason?: string | null
}
  taxCode?: string
}[]
  selectableGifts?: string[]
  totalizers?: {
  id?: string
  name?: string
  value?: number
}[]
  shippingData?: {
  address?: Record<string, unknown> | null
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: string[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: string[]
  availableAddresses?: string[]
  pickupPoints?: string[]
  contactInformation?: string[]
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
  userProfileId?: string
  customerClass?: string
} | null
  paymentData?: {
  updateStatus?: string
  installmentOptions?: {
  paymentSystem?: string
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
  sellerMerchantInstallments?: {
  id?: string
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
}[]
}[]
}[]
  paymentSystems?: {
  id?: number
  name?: string
  groupName?: string
  validator?: {
  regex?: string | null
  mask?: string | null
  cardCodeRegex?: string | null
  cardCodeMask?: string | null
  weights?: number[] | null
  useCvv?: boolean
  useExpirationDate?: boolean
  useCardHolderName?: boolean
  useBillingAddress?: boolean
}
  stringId?: string
  template?: string
  requiresDocument?: boolean
  displayDocument?: boolean
  isCustom?: boolean
  description?: string | null
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: Record<string, unknown> | null
}[]
  payments?: {
  id?: string
}[]
  giftCards?: string[]
  giftCardMessages?: string[]
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string
  minimumOrderValue?: number
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean | null
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
  giftRegistryData?: {
  id?: string
} | null
  openTextField?: string | null
  invoiceData?: Record<string, unknown> | null
  customData?: {
  customApps?: (Record<string, unknown> | null)[] | null
  customFields?: ({
  linkedEntity?: {
  type?: "order" | "item" | "address"
  id?: string
}
  fields?: {
  name?: string
  value?: string
  refId?: string
}[]
} | null)[] | null
} | null
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
  assemblyOptions?: {
  id?: string
}[]
}[]
}
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
}[]
  teaser?: {
  id?: string
}[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: Record<string, unknown> | null
}> {
    return this.http.request<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
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
  modalType?: string
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
  assemblies?: string[]
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
  productCategories?: Record<string, unknown>
  quantity?: number
  seller?: string
  sellerChain?: string[]
  imageUrl?: string
  detailUrl?: string
  components?: string[]
  bundleItems?: string[]
  attachments?: string[]
  attachmentOfferings?: string[]
  offerings?: string[]
  priceTags?: string[]
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
  reason?: string | null
}
  taxCode?: string
}[]
  selectableGifts?: string[]
  totalizers?: {
  id?: string
  name?: string
  value?: number
}[]
  shippingData?: {
  address?: Record<string, unknown> | null
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string | null
  selectedDeliveryChannel?: string | null
  addressId?: string | null
  slas?: string[]
  shipsTo?: string[]
  itemId?: string
  deliveryChannels?: {
  id?: string
}[]
}[]
  selectedAddresses?: string[]
  availableAddresses?: string[]
  pickupPoints?: string[]
  contactInformation?: string[]
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
  userProfileId?: string
  customerClass?: string
} | null
  paymentData?: {
  updateStatus?: string
  installmentOptions?: {
  paymentSystem?: string
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
  sellerMerchantInstallments?: {
  id?: string
  count?: number
  hasInterestRate?: boolean
  interestRate?: number
  value?: number
  total?: number
}[]
}[]
}[]
  paymentSystems?: {
  id?: number
  name?: string
  groupName?: string
  validator?: {
  regex?: string | null
  mask?: string | null
  cardCodeRegex?: string | null
  cardCodeMask?: string | null
  weights?: number[] | null
  useCvv?: boolean
  useExpirationDate?: boolean
  useCardHolderName?: boolean
  useBillingAddress?: boolean
}
  stringId?: string
  template?: string
  requiresDocument?: boolean
  displayDocument?: boolean
  isCustom?: boolean
  description?: string | null
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: Record<string, unknown> | null
}[]
  payments?: {
  id?: string
}[]
  giftCards?: string[]
  giftCardMessages?: string[]
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string
  minimumOrderValue?: number
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean | null
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
  giftRegistryData?: {
  id?: string
} | null
  openTextField?: string | null
  invoiceData?: Record<string, unknown> | null
  customData?: {
  customApps?: (Record<string, unknown> | null)[] | null
  customFields?: ({
  linkedEntity?: {
  type?: "order" | "item" | "address"
  id?: string
}
  fields?: {
  name?: string
  value?: string
  refId?: string
}[]
} | null)[] | null
} | null
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
  assemblyOptions?: {
  id?: string
}[]
}[]
}
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
}[]
  teaser?: {
  id?: string
}[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: Record<string, unknown> | null
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/items`, body: params.body }, opts))
  }

  postApiCheckoutPubOrderFormByOrderFormIdAttachmentsClientProfileData(params: {
  orderFormId: string
  body: {
  email: string
}
}, opts?: CallOptions): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: {
  message?: string
}[]
  items?: {
  id?: string
}[]
  selectableGifts?: {
  id?: string
}[]
  totalizers?: {
  id?: string
  name?: string
}[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  id?: string
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  pickupPoints?: {
  id?: string
}[]
  contactInformation?: {
  id?: string
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string | null
} | null
  paymentData?: {
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
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
} | null
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
} | null
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
} | null
}> {
    return this.http.request<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: {
  message?: string
}[]
  items?: {
  id?: string
}[]
  selectableGifts?: {
  id?: string
}[]
  totalizers?: {
  id?: string
  name?: string
}[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  id?: string
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  pickupPoints?: {
  id?: string
}[]
  contactInformation?: {
  id?: string
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string | null
} | null
  paymentData?: {
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
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
} | null
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
} | null
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
} | null
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/clientProfileData`, body: params.body }, opts))
  }

  postApiCheckoutPubOrderFormByOrderFormIdAttachmentsPaymentData(params: {
  orderFormId: string
  body: {
  payments: {
  hasDefaultBillingAddress?: boolean
  installmentsInterestRate?: number | null
  referenceValue?: number
  bin?: string
  accountId?: string
  value: number
  paymentSystem: string
  installments: number
}[]
}
}, opts?: CallOptions): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: {
  message?: string
}[]
  items?: {
  id?: string
}[]
  selectableGifts?: {
  id?: string
}[]
  totalizers?: {
  id?: string
  name?: string
}[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  id?: string
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  pickupPoints?: {
  id?: string
}[]
  contactInformation?: {
  id?: string
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string | null
} | null
  paymentData?: {
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
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
} | null
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
} | null
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
} | null
}> {
    return this.http.request<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: {
  message?: string
}[]
  items?: {
  id?: string
}[]
  selectableGifts?: {
  id?: string
}[]
  totalizers?: {
  id?: string
  name?: string
}[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  id?: string
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  pickupPoints?: {
  id?: string
}[]
  contactInformation?: {
  id?: string
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string | null
} | null
  paymentData?: {
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
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
} | null
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
} | null
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
} | null
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/attachments/paymentData`, body: params.body }, opts))
  }

  postApiCheckoutPubOrderFormByOrderFormIdTransaction(params: {
  orderFormId: string
  body: {
  savePersonalData?: boolean
  optinNewsLetter?: boolean
  value: number
  referenceValue: number
  interestValue?: number
}
}, opts?: CallOptions): Promise<{
  id?: string | null
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
  receiverUri?: string | null
  gatewayCallbackTemplatePath?: string | null
  orderGroup?: string | null
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: {
  message?: string
}[]
  items?: {
  id?: string
}[]
  selectableGifts?: {
  id?: string
}[]
  totalizers?: {
  id?: string
  name?: string
}[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  id?: string
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  pickupPoints?: {
  id?: string
}[]
  contactInformation?: {
  id?: string
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string | null
} | null
  paymentData?: {
  updateStatus?: string
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
  description?: string | null
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
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
} | null
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
} | null
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
} | null
}> {
    return this.http.request<{
  id?: string | null
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
  receiverUri?: string | null
  gatewayCallbackTemplatePath?: string | null
  orderGroup?: string | null
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string | null
  checkedInPickupPointId?: string | null
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string | null
  userType?: string | null
  ignoreProfileData?: boolean
  value?: number
  messages?: {
  message?: string
}[]
  items?: {
  id?: string
}[]
  selectableGifts?: {
  id?: string
}[]
  totalizers?: {
  id?: string
  name?: string
}[]
  shippingData?: {
  address?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  id?: string
}[]
  selectedAddresses?: {
  addressType?: string
  receiverName?: string
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  addressId?: string
  isDisposable?: boolean
  editable?: boolean
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
  pickupPoints?: {
  id?: string
}[]
  contactInformation?: {
  id?: string
}[]
}
  clientProfileData?: {
  email?: string
  firstName?: string
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
  profileCompleteOnLoading?: boolean
  profileErrorOnLoading?: boolean
  customerClass?: string | null
} | null
  paymentData?: {
  updateStatus?: string
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
  description?: string | null
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string | null
  useCvvForAuthorization?: boolean
  isCardToken?: boolean
  cardLabel?: string
  cardOrigin?: string
}[]
  availableTokens?: string[]
  availableAssociations?: {
  id?: string
}
}
  marketingData?: Record<string, unknown> | null
  sellers?: {
  id?: string
  name?: string
  logo?: string | null
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown> | null
  storePreferencesData?: {
  countryCode?: string
  saveUserData?: boolean
  timeZone?: string
  currencyCode?: string
  currencyLocale?: number
  currencySymbol?: string
  currencyFormatInfo?: {
  currencyDecimalDigits?: number
  currencyDecimalSeparator?: string
  currencyGroupSeparator?: string
  currencyGroupSize?: number
  startsWithCurrencySymbol?: boolean
}
}
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
} | null
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
} | null
  hooksData?: Record<string, unknown> | null
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: string[]
  teaser?: string[]
}
  subscriptionData?: Record<string, unknown> | null
  merchantContextData?: Record<string, unknown> | null
  purchaseAgentsData?: Record<string, unknown> | null
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
} | null
}>(withCall({ method: 'POST', path: `/api/checkout/pub/orderForm/${encodePathParam(params.orderFormId)}/transaction`, body: params.body }, opts))
  }
}
class CheckoutCustomCardPaymentApi_authentication {
  constructor(private http: VtexHttpClient) {}

  postApiVtexidPubAuthenticationStartlogin(params: Record<string, never> = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/vtexid/pub/authentication/startlogin` }, opts))
  }

  postApiVtexidPubAuthenticationClassicValidate(params: {
  an: string
  body: URLSearchParams | Record<string, string>
}, opts?: CallOptions): Promise<{
  authStatus?: string
  promptMFA?: boolean
  lastAttemptAvailable?: string | null
  clientToken?: string | null
  authCookie?: {
  Name?: string
  Value?: string
}
  accountAuthCookie?: {
  Name?: string
  Value?: string
}
  expiresIn?: number
  userId?: string
  phoneNumber?: string | null
  scope?: string | null
}> {
    return this.http.request<{
  authStatus?: string
  promptMFA?: boolean
  lastAttemptAvailable?: string | null
  clientToken?: string | null
  authCookie?: {
  Name?: string
  Value?: string
}
  accountAuthCookie?: {
  Name?: string
  Value?: string
}
  expiresIn?: number
  userId?: string
  phoneNumber?: string | null
  scope?: string | null
}>(withCall({ method: 'POST', path: `/api/vtexid/pub/authentication/classic/validate`, query: { 'an': params.an }, body: params.body, contentType: 'application/x-www-form-urlencoded' }, opts))
  }
}
class CheckoutCustomCardPaymentApi_paymentGateway {
  constructor(private http: VtexHttpClient) {}

  getApiPvtTransactionsByTransactionId(params: {
  transactionId: string
}, opts?: CallOptions): Promise<{
  status?: "Approved"
  transactionId?: string
}> {
    return this.http.request<{
  status?: "Approved"
  transactionId?: string
}>(withCall({ method: 'GET', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}` }, opts))
  }

  getApiPvtTransactionsByTransactionIdPayments(params: {
  transactionId: string
  an: string
}, opts?: CallOptions): Promise<{
  id?: string
  fields?: {
  name?: string
  value?: string
}[]
}[]> {
    return this.http.request<{
  id?: string
  fields?: {
  name?: string
  value?: string
}[]
}[]>(withCall({ method: 'GET', path: `/api/pvt/transactions/${encodePathParam(params.transactionId)}/payments`, query: { 'an': params.an } }, opts))
  }

  getApiPvtAccountsByAccountId(params: {
  accountId: string
}, opts?: CallOptions): Promise<{
  bin?: string
  lastDigits?: string
  expiryMonth?: string
  expiryYear?: string
  mask?: string
  paymentSystem?: number
  paymentSystemName?: string
  address?: string
  document?: string | null
  label?: string
  tokens?: {
  providerId?: string
  type?: string
  value?: string
  expiration?: string
  href?: string | null
  providerCardTokentId?: string
  useCvvForAuthorization?: boolean
  extraData?: Record<string, unknown> | null
}[]
}> {
    return this.http.request<{
  bin?: string
  lastDigits?: string
  expiryMonth?: string
  expiryYear?: string
  mask?: string
  paymentSystem?: number
  paymentSystemName?: string
  address?: string
  document?: string | null
  label?: string
  tokens?: {
  providerId?: string
  type?: string
  value?: string
  expiration?: string
  href?: string | null
  providerCardTokentId?: string
  useCvvForAuthorization?: boolean
  extraData?: Record<string, unknown> | null
}[]
}>(withCall({ method: 'GET', path: `/api/pvt/accounts/${encodePathParam(params.accountId)}` }, opts))
  }
}

export class CheckoutCustomCardPaymentApi {
  readonly profileManagement: CheckoutCustomCardPaymentApi_profileManagement
  readonly cardTokenVault: CheckoutCustomCardPaymentApi_cardTokenVault
  readonly checkoutOperations: CheckoutCustomCardPaymentApi_checkoutOperations
  readonly authentication: CheckoutCustomCardPaymentApi_authentication
  readonly paymentGateway: CheckoutCustomCardPaymentApi_paymentGateway
  constructor(http: VtexHttpClient) {
    this.profileManagement = new CheckoutCustomCardPaymentApi_profileManagement(http)
    this.cardTokenVault = new CheckoutCustomCardPaymentApi_cardTokenVault(http)
    this.checkoutOperations = new CheckoutCustomCardPaymentApi_checkoutOperations(http)
    this.authentication = new CheckoutCustomCardPaymentApi_authentication(http)
    this.paymentGateway = new CheckoutCustomCardPaymentApi_paymentGateway(http)
  }
}
