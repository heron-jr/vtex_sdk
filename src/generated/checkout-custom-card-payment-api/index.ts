import type { VtexHttpClient } from '../../core/http.js'

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
  addresses: Record<string, unknown>
}
}): Promise<{
  profileId?: string
}> {
    return this.http.request<{
  profileId?: string
}>({ method: 'POST', path: `/api/profile-system/pvt/profiles`, body: params.body })
  }

  getApiProfileSystemPvtProfilesByProfileIdVcsCheckout(params: {
  profileId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/profile-system/pvt/profiles/${params.profileId}/vcs-checkout` })
  }

  deleteApiProfileSystemPvtProfilesByProfileIdPersonalData(params: {
  profileId: string
  an: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/profile-system/pvt/profiles/${params.profileId}/personalData`, query: { 'an': params.an } })
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
}): Promise<{
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
  addressId?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string
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
  addressId?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  number?: string
  complement?: string
}
}
  cardTokenData?: {
  type?: string
  expiration?: string
  value?: string
  label?: string
  useCvvForAuthorization?: boolean
}
}>({ method: 'POST', path: `/api/card-token-vault/tokens`, body: params.body })
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
}): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
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
  assemblies?: string[]
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
  manufacturerCode?: string
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  reason?: string
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
  address?: Record<string, unknown>
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
}
  paymentData?: {
  updateStatus?: string
  installmentOptions?: {
  paymentSystem?: string
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
  regex?: string
  mask?: string
  cardCodeRegex?: string
  cardCodeMask?: string
  weights?: number[]
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
  description?: string
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: Record<string, unknown>
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
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
  minimumOrderValue?: number
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
}
  openTextField?: string
  invoiceData?: Record<string, unknown>
  customData?: {
  customApps?: Record<string, unknown>[]
  customFields?: {
  linkedEntity?: {
  type?: "order" | "item" | "address"
  id?: string
}
  fields?: {
  name?: string
  value?: string
  refId?: string
}[]
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
  assemblyOptions?: {
  id?: string
}[]
}[]
}
  hooksData?: Record<string, unknown>
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
}[]
  teaser?: {
  id?: string
}[]
}
  subscriptionData?: Record<string, unknown>
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
  itemsOrdination?: Record<string, unknown>
}> {
    return this.http.request<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
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
  assemblies?: string[]
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
  manufacturerCode?: string
  priceDefinition?: {
  calculatedSellingPrice?: number
  total?: number
  sellingPrices?: {
  value?: number
  quantity?: number
}[]
  reason?: string
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
  address?: Record<string, unknown>
  logisticsInfo?: {
  itemIndex?: number
  selectedSla?: string
  selectedDeliveryChannel?: string
  addressId?: string
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
}
  paymentData?: {
  updateStatus?: string
  installmentOptions?: {
  paymentSystem?: string
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
  regex?: string
  mask?: string
  cardCodeRegex?: string
  cardCodeMask?: string
  weights?: number[]
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
  description?: string
  requiresAuthentication?: boolean
  dueDate?: string
  availablePayments?: Record<string, unknown>
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
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
  minimumOrderValue?: number
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
}
  openTextField?: string
  invoiceData?: Record<string, unknown>
  customData?: {
  customApps?: Record<string, unknown>[]
  customFields?: {
  linkedEntity?: {
  type?: "order" | "item" | "address"
  id?: string
}
  fields?: {
  name?: string
  value?: string
  refId?: string
}[]
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
  assemblyOptions?: {
  id?: string
}[]
}[]
}
  hooksData?: Record<string, unknown>
  ratesAndBenefitsData?: {
  rateAndBenefitsIdentifiers?: {
  id?: string
}[]
  teaser?: {
  id?: string
}[]
}
  subscriptionData?: Record<string, unknown>
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
  itemsOrdination?: Record<string, unknown>
}>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/items`, body: params.body })
  }

  postApiCheckoutPubOrderFormByOrderFormIdAttachmentsClientProfileData(params: {
  orderFormId: string
  body: {
  email: string
}
}): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  userType?: string
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
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
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
  complement?: string
  reference?: string
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
  complement?: string
  reference?: string
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
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
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
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  userType?: string
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
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
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
  complement?: string
  reference?: string
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
  complement?: string
  reference?: string
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
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/clientProfileData`, body: params.body })
  }

  postApiCheckoutPubOrderFormByOrderFormIdAttachmentsPaymentData(params: {
  orderFormId: string
  body: {
  payments: {
  hasDefaultBillingAddress?: boolean
  installmentsInterestRate?: number
  referenceValue?: number
  bin?: string
  accountId?: string
  value: number
  paymentSystem: string
  installments: number
}[]
}
}): Promise<{
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  userType?: string
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
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
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
  complement?: string
  reference?: string
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
  complement?: string
  reference?: string
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
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
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
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  userType?: string
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
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
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
  complement?: string
  reference?: string
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
  complement?: string
  reference?: string
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
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/paymentData`, body: params.body })
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
}): Promise<{
  id?: string
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
  orderGroup?: string
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  userType?: string
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
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
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
  complement?: string
  reference?: string
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
  complement?: string
  reference?: string
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
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}> {
    return this.http.request<{
  id?: string
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
  orderGroup?: string
  orderFormId?: string
  salesChannel?: string
  loggedIn?: boolean
  isCheckedIn?: boolean
  storeId?: string
  checkedInPickupPointId?: string
  allowManualPrice?: boolean
  canEditData?: boolean
  userProfileId?: string
  userType?: string
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
  complement?: string
  reference?: string
  geoCoordinates?: number[]
}
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
  complement?: string
  reference?: string
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
  complement?: string
  reference?: string
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
  updateStatus?: string
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
  availableAccounts?: {
  accountId?: string
  paymentSystem?: string
  paymentSystemName?: string
  cardNumber?: string
  bin?: string
  availableAddresses?: string[]
  expirationDate?: string
  isExpired?: boolean
  accountStatus?: string
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
  marketingData?: Record<string, unknown>
  sellers?: {
  id?: string
  name?: string
  logo?: string
}[]
  clientPreferencesData?: {
  locale?: string
  optinNewsLetter?: boolean
  savePersonalData?: boolean
  savePaymentData?: boolean
}
  commercialConditionData?: Record<string, unknown>
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
  merchantContextData?: Record<string, unknown>
  purchaseAgentsData?: Record<string, unknown>
  itemsOrdination?: {
  criteria?: string
  ascending?: boolean
}
}>({ method: 'POST', path: `/api/checkout/pub/orderForm/${params.orderFormId}/transaction`, body: params.body })
  }
}
class CheckoutCustomCardPaymentApi_authentication {
  constructor(private http: VtexHttpClient) {}

  postApiVtexidPubAuthenticationStartlogin(params: Record<string, never>): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/vtexid/pub/authentication/startlogin` })
  }

  postApiVtexidPubAuthenticationClassicValidate(params: {
  an: string
}): Promise<{
  authStatus?: string
  promptMFA?: boolean
  lastAttemptAvailable?: string
  clientToken?: string
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
  phoneNumber?: string
  scope?: string
}> {
    return this.http.request<{
  authStatus?: string
  promptMFA?: boolean
  lastAttemptAvailable?: string
  clientToken?: string
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
  phoneNumber?: string
  scope?: string
}>({ method: 'POST', path: `/api/vtexid/pub/authentication/classic/validate`, query: { 'an': params.an } })
  }
}
class CheckoutCustomCardPaymentApi_paymentGateway {
  constructor(private http: VtexHttpClient) {}

  getApiPvtTransactionsByTransactionId(params: {
  transactionId: string
}): Promise<{
  status?: "Approved"
  transactionId?: string
}> {
    return this.http.request<{
  status?: "Approved"
  transactionId?: string
}>({ method: 'GET', path: `/api/pvt/transactions/${params.transactionId}` })
  }

  getApiPvtTransactionsByTransactionIdPayments(params: {
  transactionId: string
  an: string
}): Promise<{
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
}[]>({ method: 'GET', path: `/api/pvt/transactions/${params.transactionId}/payments`, query: { 'an': params.an } })
  }

  getApiPvtAccountsByAccountId(params: {
  accountId: string
}): Promise<{
  bin?: string
  lastDigits?: string
  expiryMonth?: string
  expiryYear?: string
  mask?: string
  paymentSystem?: number
  paymentSystemName?: string
  address?: string
  document?: string
  label?: string
  tokens?: {
  providerId?: string
  type?: string
  value?: string
  expiration?: string
  href?: string
  providerCardTokentId?: string
  useCvvForAuthorization?: boolean
  extraData?: Record<string, unknown>
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
  document?: string
  label?: string
  tokens?: {
  providerId?: string
  type?: string
  value?: string
  expiration?: string
  href?: string
  providerCardTokentId?: string
  useCvvForAuthorization?: boolean
  extraData?: Record<string, unknown>
}[]
}>({ method: 'GET', path: `/api/pvt/accounts/${params.accountId}` })
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
