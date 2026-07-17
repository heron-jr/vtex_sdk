import type { VtexHttpClient } from '../../core/http.js'
import type { AutocompleteSearchSuggestions, TopSearches, Correction, Banners, SearchSuggestions, ProductSearch, Product, Facets, ErrorResponse } from './types.js'

class IntelligentSearchApiV1Api_autocomplete {
  constructor(private http: VtexHttpClient) {}

  getTopSearches(params: {
  locale?: string
}): Promise<TopSearches> {
    return this.http.request<TopSearches>({ method: 'GET', path: `/top-searches`, query: { 'locale': params.locale } })
  }

  getAutocompleteSuggestions(params: {
  query?: string
  locale?: string
}): Promise<AutocompleteSearchSuggestions> {
    return this.http.request<AutocompleteSearchSuggestions>({ method: 'GET', path: `/autocomplete-suggestions`, query: { 'query': params.query, 'locale': params.locale } })
  }

  getSearchSuggestions(params: {
  query?: string
  locale?: string
}): Promise<SearchSuggestions> {
    return this.http.request<SearchSuggestions>({ method: 'GET', path: `/search-suggestions`, query: { 'query': params.query, 'locale': params.locale } })
  }
}
class IntelligentSearchApiV1Api_productListPage {
  constructor(private http: VtexHttpClient) {}

  getCorrectionSearch(params: {
  query?: string
  locale?: string
}): Promise<Correction> {
    return this.http.request<Correction>({ method: 'GET', path: `/correction-search`, query: { 'query': params.query, 'locale': params.locale } })
  }

  getBannersByFacets(params: {
  facets: string
  query?: string
  locale?: string
}): Promise<Banners> {
    return this.http.request<Banners>({ method: 'GET', path: `/banners/${params.facets}`, query: { 'query': params.query, 'locale': params.locale } })
  }

  getProductSearchByFacets(params: {
  facets: string
  query?: string
  count?: number
  page?: number
  sort?: "price:desc" | "price:asc" | "orders:desc" | "name:desc" | "name:asc" | "release:desc" | "discount:desc" | null
  locale?: string
  hideUnavailableItems?: boolean
  simulationBehavior?: "default" | "skip" | "only1P" | "only3P" | "regionalize1p"
  sc?: string
  regionId?: string
  country?: string
  'zip-code'?: string
  coordinates?: string
  pickupPoint?: string
  deliveryZonesHash?: string
  pickupPointsHash?: string
  utmSource?: string
  utmCampaign?: string
  utmiCampaign?: string
  campaigns?: string
  priceTables?: string
  showSponsored?: boolean
  sponsoredCount?: string
  advertisementPlacement?: "top_search" | "middle_search" | "search_shelf" | "cart_shelf" | "plp_shelf" | "autocomplete" | "homepage"
  repeatSponsoredProducts?: boolean
}): Promise<ProductSearch> {
    return this.http.request<ProductSearch>({ method: 'GET', path: `/product-search/${params.facets}`, query: { 'query': params.query, 'count': params.count, 'page': params.page, 'sort': params.sort, 'locale': params.locale, 'hideUnavailableItems': params.hideUnavailableItems, 'simulationBehavior': params.simulationBehavior, 'sc': params.sc, 'regionId': params.regionId, 'country': params.country, 'zip-code': params['zip-code'], 'coordinates': params.coordinates, 'pickupPoint': params.pickupPoint, 'deliveryZonesHash': params.deliveryZonesHash, 'pickupPointsHash': params.pickupPointsHash, 'utmSource': params.utmSource, 'utmCampaign': params.utmCampaign, 'utmiCampaign': params.utmiCampaign, 'campaigns': params.campaigns, 'priceTables': params.priceTables, 'showSponsored': params.showSponsored, 'sponsoredCount': params.sponsoredCount, 'advertisementPlacement': params.advertisementPlacement, 'repeatSponsoredProducts': params.repeatSponsoredProducts } })
  }

  getFacetsByFacets(params: {
  facets: string
  query?: string
  locale?: string
  hideUnavailableItems?: boolean
  removeHiddenFacets?: boolean
  sc?: string
  regionId?: string
  country?: string
  'zip-code'?: string
  coordinates?: string
  pickupPoint?: string
  deliveryZonesHash?: string
  pickupPointsHash?: string
}): Promise<Facets> {
    return this.http.request<Facets>({ method: 'GET', path: `/facets/${params.facets}`, query: { 'query': params.query, 'locale': params.locale, 'hideUnavailableItems': params.hideUnavailableItems, 'removeHiddenFacets': params.removeHiddenFacets, 'sc': params.sc, 'regionId': params.regionId, 'country': params.country, 'zip-code': params['zip-code'], 'coordinates': params.coordinates, 'pickupPoint': params.pickupPoint, 'deliveryZonesHash': params.deliveryZonesHash, 'pickupPointsHash': params.pickupPointsHash } })
  }
}
class IntelligentSearchApiV1Api_productDetailsPagePDP {
  constructor(private http: VtexHttpClient) {}

  getProducts(params: {
  sc: string
  value: string
  field?: "id" | "slug" | "ean" | "sku" | "reference"
  locale?: string
  simulationBehavior?: "default" | "skip" | "only1P" | "only3P" | "regionalize1p"
  hideUnavailableItems?: boolean
  productClusterId?: string
  productOriginVtex?: boolean
  'show-invisible-items'?: boolean
  regionId?: string
  country?: string
  'zip-code'?: string
  coordinates?: string
  pickupPoint?: string
  deliveryZonesHash?: string
  pickupPointsHash?: string
  utmSource?: string
  utmCampaign?: string
  utmiCampaign?: string
  campaigns?: string
  priceTables?: string
}): Promise<Product> {
    return this.http.request<Product>({ method: 'GET', path: `/products`, query: { 'sc': params.sc, 'value': params.value, 'field': params.field, 'locale': params.locale, 'simulationBehavior': params.simulationBehavior, 'hideUnavailableItems': params.hideUnavailableItems, 'productClusterId': params.productClusterId, 'productOriginVtex': params.productOriginVtex, 'show-invisible-items': params['show-invisible-items'], 'regionId': params.regionId, 'country': params.country, 'zip-code': params['zip-code'], 'coordinates': params.coordinates, 'pickupPoint': params.pickupPoint, 'deliveryZonesHash': params.deliveryZonesHash, 'pickupPointsHash': params.pickupPointsHash, 'utmSource': params.utmSource, 'utmCampaign': params.utmCampaign, 'utmiCampaign': params.utmiCampaign, 'campaigns': params.campaigns, 'priceTables': params.priceTables } })
  }
}
class IntelligentSearchApiV1Api_deliveryPromise {
  constructor(private http: VtexHttpClient) {}

  getPickupPointAvailabilityByFacets(params: {
  facets: string
  query?: string
  locale?: string
  deliveryZonesHash?: string
  pickupPointsHash?: string
  country?: string
  'zip-code'?: string
  coordinates?: string
  pickupPoint?: string
}): Promise<{
  pickupPointDistances?: {
  pickupId?: string
  pickupName?: string
  distance?: number
  isActive?: boolean
  address?: {
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  postalCode?: string
}
  businessHours?: {
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  openingTime?: string
  closingTime?: string
}[]
}[]
}> {
    return this.http.request<{
  pickupPointDistances?: {
  pickupId?: string
  pickupName?: string
  distance?: number
  isActive?: boolean
  address?: {
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  postalCode?: string
}
  businessHours?: {
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  openingTime?: string
  closingTime?: string
}[]
}[]
}>({ method: 'GET', path: `/pickup-point-availability/${params.facets}`, query: { 'query': params.query, 'locale': params.locale, 'deliveryZonesHash': params.deliveryZonesHash, 'pickupPointsHash': params.pickupPointsHash, 'country': params.country, 'zip-code': params['zip-code'], 'coordinates': params.coordinates, 'pickupPoint': params.pickupPoint } })
  }
}

export class IntelligentSearchApiV1Api {
  readonly autocomplete: IntelligentSearchApiV1Api_autocomplete
  readonly productListPage: IntelligentSearchApiV1Api_productListPage
  readonly productDetailsPagePDP: IntelligentSearchApiV1Api_productDetailsPagePDP
  readonly deliveryPromise: IntelligentSearchApiV1Api_deliveryPromise
  constructor(http: VtexHttpClient) {
    this.autocomplete = new IntelligentSearchApiV1Api_autocomplete(http)
    this.productListPage = new IntelligentSearchApiV1Api_productListPage(http)
    this.productDetailsPagePDP = new IntelligentSearchApiV1Api_productDetailsPagePDP(http)
    this.deliveryPromise = new IntelligentSearchApiV1Api_deliveryPromise(http)
  }
}
