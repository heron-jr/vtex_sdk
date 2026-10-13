import type { VtexHttpClient } from '../core/http.js'
import { AudienceApi } from './audience-api/index.js'
import { B2bAddressesApi } from './b2b-addresses-api/index.js'
import { B2bBuyerDataApi } from './b2b-buyer-data-api/index.js'
import { B2bContractsApi } from './b2b-contracts-api/index.js'
import { BudgetsApi } from './budgets-api/index.js'
import { BulkPricingApi } from './bulk-pricing-api/index.js'
import { BuyerOrganizationsB2bSuiteApi } from './buyer-organizations-b2b-suite/index.js'
import { BuyingPoliciesApi } from './buying-policies-api/index.js'
import { CardTokenVaultApi } from './card-token-vault-api/index.js'
import { CatalogApiSellerPortalApi } from './catalog-api-seller-portal/index.js'
import { CatalogApi } from './catalog-api/index.js'
import { CheckoutApi } from './checkout-api/index.js'
import { CheckoutCustomCardPaymentApi } from './checkout-custom-card-payment-api/index.js'
import { CustomFieldsApi } from './custom-fields-api/index.js'
import { CustomerCreditApi } from './customer-credit-api/index.js'
import { DataSubjectRightsApiPiiDataArchitectureApi } from './data-subject-rights-api-pii-data-architecture/index.js'
import { DefaultValuesApi } from './default-values-api/index.js'
import { DeliveryPromiseNotificationApi } from './delivery-promise-notification-api/index.js'
import { DeliveryPromiseSuggestionsApi } from './delivery-promise-suggestions-api/index.js'
import { GiftcardHubApi } from './giftcard-hub-api/index.js'
import { GiftcardApi } from './giftcard-api/index.js'
import { VtexHeadlessCmsApi } from './vtex-headless-cms/index.js'
import { IntelligentSearchApiV1Api } from './intelligent-search-api-v1/index.js'
import { IntelligentSearchApiLegacyApi } from './intelligent-search-api-legacy/index.js'
import { VtexIntelligentSearchEventsApiHeadlessApi } from './vtex-intelligent-search-events-api-headless/index.js'
import { LegacyCmsPortalApi } from './legacy-cms-portal-api/index.js'
import { LicenseManagerApi } from './license-manager-api/index.js'
import { LogisticsApi } from './logistics-api/index.js'
import { SentOffersApi } from './sent-offers/index.js'
import { SuggestionsApi } from './suggestions/index.js'
import { MarketplaceApi } from './marketplace-api/index.js'
import { MarketplaceProtocolApi } from './marketplace-protocol/index.js'
import { MarketplaceProtocolExternalMarketplaceOrdersApi } from './marketplace-protocol-external-marketplace-orders/index.js'
import { MasterDataApiV2Api } from './master-data-api-v2/index.js'
import { MasterDataApiV1Api } from './master-data-api-v1/index.js'
import { MessageCenterApi } from './message-center-api/index.js'
import { OperationalCapacityApi } from './operational-capacity-api/index.js'
import { OrdersApiPiiDataArchitectureApi } from './orders-api-pii-data-architecture/index.js'
import { OrdersApi } from './orders-api/index.js'
import { OrganizationUnitsApi } from './organization-units-api/index.js'
import { PaymentPoliciesApi } from './payment-policies-api/index.js'
import { PaymentsGatewayApi } from './payments-gateway-api/index.js'
import { PickAndPackOrderChangesApi } from './pick-and-pack-order-changes-api/index.js'
import { PoliciesSystemApi } from './policies-system-api/index.js'
import { PricingApi } from './pricing-api/index.js'
import { PricingHubDeprecatedApi } from './pricing-hub-deprecated/index.js'
import { ProfileSystemPiiDataArchitectureApi } from './profile-system-pii-data-architecture/index.js'
import { PromotionsTaxesApiV2Api } from './promotions-taxes-api-v2/index.js'
import { PromotionsTaxesApi } from './promotions-taxes-api/index.js'
import { RecommendationsBffApi } from './recommendations-bff-api/index.js'
import { ReviewsAndRatingsApi } from './reviews-and-ratings-api/index.js'
import { SkuBindingsApi } from './sku-bindings-api/index.js'
import { SslCertificatesApi } from './ssl-certificates-api/index.js'
import { LegacySearchApi } from './legacy-search-api/index.js'
import { SessionManagerApi } from './session-manager-api/index.js'
import { VtexShopeeIntegrationApi } from './vtex-shopee-integration-api/index.js'
import { StorefrontRolesApi } from './storefront-roles-api/index.js'
import { SubscriptionsApiV3Api } from './subscriptions-api-v3/index.js'
import { UserRightsApi } from './user-rights-api/index.js'
import { VtexDoApi } from './vtex-do-api/index.js'
import { VtexIdApi } from './vtex-id/index.js'
import { MtlsApi } from './mtls-api/index.js'

export class RawNamespaces {
  readonly audienceAPI: AudienceApi
  readonly b2bAddressesAPI: B2bAddressesApi
  readonly b2bBuyerDataAPI: B2bBuyerDataApi
  readonly b2bContractsAPI: B2bContractsApi
  readonly budgetsAPI: BudgetsApi
  readonly bulkPricingAPI: BulkPricingApi
  readonly buyerOrganizationsB2BSuite: BuyerOrganizationsB2bSuiteApi
  readonly buyingPoliciesAPI: BuyingPoliciesApi
  readonly cardTokenVaultAPI: CardTokenVaultApi
  readonly catalogAPISellerPortal: CatalogApiSellerPortalApi
  readonly catalogAPI: CatalogApi
  readonly checkoutAPI: CheckoutApi
  readonly checkoutCustomCardPaymentAPI: CheckoutCustomCardPaymentApi
  readonly customFieldsAPI: CustomFieldsApi
  readonly customerCreditAPI: CustomerCreditApi
  readonly dataSubjectRightsAPIPIIDataArchitecture: DataSubjectRightsApiPiiDataArchitectureApi
  readonly defaultValuesAPI: DefaultValuesApi
  readonly deliveryPromiseNotificationAPI: DeliveryPromiseNotificationApi
  readonly deliveryPromiseSuggestionsAPI: DeliveryPromiseSuggestionsApi
  readonly giftcardHubAPI: GiftcardHubApi
  readonly giftcardAPI: GiftcardApi
  readonly vtexHeadlessCMS: VtexHeadlessCmsApi
  readonly intelligentSearchAPIV1: IntelligentSearchApiV1Api
  readonly intelligentSearchAPILegacy: IntelligentSearchApiLegacyApi
  readonly vtexIntelligentSearchEventsAPIHeadless: VtexIntelligentSearchEventsApiHeadlessApi
  readonly legacyCMSPortalAPI: LegacyCmsPortalApi
  readonly licenseManagerAPI: LicenseManagerApi
  readonly logisticsAPI: LogisticsApi
  readonly sentOffers: SentOffersApi
  readonly suggestions: SuggestionsApi
  readonly marketplaceAPI: MarketplaceApi
  readonly marketplaceProtocol: MarketplaceProtocolApi
  readonly marketplaceProtocolExternalMarketplaceOrders: MarketplaceProtocolExternalMarketplaceOrdersApi
  readonly masterDataAPIV2: MasterDataApiV2Api
  readonly masterDataAPIV1: MasterDataApiV1Api
  readonly messageCenterAPI: MessageCenterApi
  readonly operationalCapacityAPI: OperationalCapacityApi
  readonly ordersAPIPIIDataArchitecture: OrdersApiPiiDataArchitectureApi
  readonly ordersAPI: OrdersApi
  readonly organizationUnitsAPI: OrganizationUnitsApi
  readonly paymentPoliciesAPI: PaymentPoliciesApi
  readonly paymentsGatewayAPI: PaymentsGatewayApi
  readonly pickAndPackOrderChangesAPI: PickAndPackOrderChangesApi
  readonly policiesSystemAPI: PoliciesSystemApi
  readonly pricingAPI: PricingApi
  readonly pricingHubDEPRECATED: PricingHubDeprecatedApi
  readonly profileSystemPIIDataArchitecture: ProfileSystemPiiDataArchitectureApi
  readonly promotionsTaxesAPIV2: PromotionsTaxesApiV2Api
  readonly promotionsTaxesAPI: PromotionsTaxesApi
  readonly recommendationsBFFAPI: RecommendationsBffApi
  readonly reviewsAndRatingsAPI: ReviewsAndRatingsApi
  readonly skuBindingsAPI: SkuBindingsApi
  readonly sslCertificatesAPI: SslCertificatesApi
  readonly legacySearchAPI: LegacySearchApi
  readonly sessionManagerAPI: SessionManagerApi
  readonly vtexShopeeIntegrationAPI: VtexShopeeIntegrationApi
  readonly storefrontRolesAPI: StorefrontRolesApi
  readonly subscriptionsAPIV3: SubscriptionsApiV3Api
  readonly userRightsAPI: UserRightsApi
  readonly vtexDOAPI: VtexDoApi
  readonly vtexID: VtexIdApi
  readonly mTLSAPI: MtlsApi
  constructor(http: VtexHttpClient) {
    this.audienceAPI = new AudienceApi(http)
    this.b2bAddressesAPI = new B2bAddressesApi(http)
    this.b2bBuyerDataAPI = new B2bBuyerDataApi(http)
    this.b2bContractsAPI = new B2bContractsApi(http)
    this.budgetsAPI = new BudgetsApi(http)
    this.bulkPricingAPI = new BulkPricingApi(http)
    this.buyerOrganizationsB2BSuite = new BuyerOrganizationsB2bSuiteApi(http)
    this.buyingPoliciesAPI = new BuyingPoliciesApi(http)
    this.cardTokenVaultAPI = new CardTokenVaultApi(http)
    this.catalogAPISellerPortal = new CatalogApiSellerPortalApi(http)
    this.catalogAPI = new CatalogApi(http)
    this.checkoutAPI = new CheckoutApi(http)
    this.checkoutCustomCardPaymentAPI = new CheckoutCustomCardPaymentApi(http)
    this.customFieldsAPI = new CustomFieldsApi(http)
    this.customerCreditAPI = new CustomerCreditApi(http)
    this.dataSubjectRightsAPIPIIDataArchitecture = new DataSubjectRightsApiPiiDataArchitectureApi(http)
    this.defaultValuesAPI = new DefaultValuesApi(http)
    this.deliveryPromiseNotificationAPI = new DeliveryPromiseNotificationApi(http)
    this.deliveryPromiseSuggestionsAPI = new DeliveryPromiseSuggestionsApi(http)
    this.giftcardHubAPI = new GiftcardHubApi(http)
    this.giftcardAPI = new GiftcardApi(http)
    this.vtexHeadlessCMS = new VtexHeadlessCmsApi(http)
    this.intelligentSearchAPIV1 = new IntelligentSearchApiV1Api(http)
    this.intelligentSearchAPILegacy = new IntelligentSearchApiLegacyApi(http)
    this.vtexIntelligentSearchEventsAPIHeadless = new VtexIntelligentSearchEventsApiHeadlessApi(http)
    this.legacyCMSPortalAPI = new LegacyCmsPortalApi(http)
    this.licenseManagerAPI = new LicenseManagerApi(http)
    this.logisticsAPI = new LogisticsApi(http)
    this.sentOffers = new SentOffersApi(http)
    this.suggestions = new SuggestionsApi(http)
    this.marketplaceAPI = new MarketplaceApi(http)
    this.marketplaceProtocol = new MarketplaceProtocolApi(http)
    this.marketplaceProtocolExternalMarketplaceOrders = new MarketplaceProtocolExternalMarketplaceOrdersApi(http)
    this.masterDataAPIV2 = new MasterDataApiV2Api(http)
    this.masterDataAPIV1 = new MasterDataApiV1Api(http)
    this.messageCenterAPI = new MessageCenterApi(http)
    this.operationalCapacityAPI = new OperationalCapacityApi(http)
    this.ordersAPIPIIDataArchitecture = new OrdersApiPiiDataArchitectureApi(http)
    this.ordersAPI = new OrdersApi(http)
    this.organizationUnitsAPI = new OrganizationUnitsApi(http)
    this.paymentPoliciesAPI = new PaymentPoliciesApi(http)
    this.paymentsGatewayAPI = new PaymentsGatewayApi(http)
    this.pickAndPackOrderChangesAPI = new PickAndPackOrderChangesApi(http)
    this.policiesSystemAPI = new PoliciesSystemApi(http)
    this.pricingAPI = new PricingApi(http)
    this.pricingHubDEPRECATED = new PricingHubDeprecatedApi(http)
    this.profileSystemPIIDataArchitecture = new ProfileSystemPiiDataArchitectureApi(http)
    this.promotionsTaxesAPIV2 = new PromotionsTaxesApiV2Api(http)
    this.promotionsTaxesAPI = new PromotionsTaxesApi(http)
    this.recommendationsBFFAPI = new RecommendationsBffApi(http)
    this.reviewsAndRatingsAPI = new ReviewsAndRatingsApi(http)
    this.skuBindingsAPI = new SkuBindingsApi(http)
    this.sslCertificatesAPI = new SslCertificatesApi(http)
    this.legacySearchAPI = new LegacySearchApi(http)
    this.sessionManagerAPI = new SessionManagerApi(http)
    this.vtexShopeeIntegrationAPI = new VtexShopeeIntegrationApi(http)
    this.storefrontRolesAPI = new StorefrontRolesApi(http)
    this.subscriptionsAPIV3 = new SubscriptionsApiV3Api(http)
    this.userRightsAPI = new UserRightsApi(http)
    this.vtexDOAPI = new VtexDoApi(http)
    this.vtexID = new VtexIdApi(http)
    this.mTLSAPI = new MtlsApi(http)
  }
}
