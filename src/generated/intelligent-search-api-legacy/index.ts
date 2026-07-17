import type { VtexHttpClient } from '../../core/http.js'
import type { AutocompleteSearchSuggestions, TopSearches, Correction, Banners, SearchSuggestions, ProductSearch, Product, Facets } from './types.js'

class IntelligentSearchApiLegacyApi_autocomplete {
  constructor(private http: VtexHttpClient) {}

  getTopSearches(params: {
  locale?: string
}): Promise<TopSearches> {
    return this.http.request<TopSearches>({ method: 'GET', path: `/top_searches`, query: { 'locale': params.locale } })
  }

  getAutocompleteSuggestions(params: {
  query?: string
  locale?: string
}): Promise<AutocompleteSearchSuggestions> {
    return this.http.request<AutocompleteSearchSuggestions>({ method: 'GET', path: `/autocomplete_suggestions`, query: { 'query': params.query, 'locale': params.locale } })
  }

  getSearchSuggestions(params: {
  query?: string
  locale?: string
}): Promise<SearchSuggestions> {
    return this.http.request<SearchSuggestions>({ method: 'GET', path: `/search_suggestions`, query: { 'query': params.query, 'locale': params.locale } })
  }
}
class IntelligentSearchApiLegacyApi_productListPage {
  constructor(private http: VtexHttpClient) {}

  getCorrectionSearch(params: {
  query?: string
  locale?: string
}): Promise<Correction> {
    return this.http.request<Correction>({ method: 'GET', path: `/correction_search`, query: { 'query': params.query, 'locale': params.locale } })
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
  showSponsored?: boolean
  sponsoredCount?: string
  advertisementPlacement?: "top_search" | "middle_search" | "search_shelf" | "cart_shelf" | "plp_shelf" | "autocomplete" | "homepage"
  repeatSponsoredProducts?: boolean
}): Promise<ProductSearch> {
    return this.http.request<ProductSearch>({ method: 'GET', path: `/product_search/${params.facets}`, query: { 'query': params.query, 'count': params.count, 'page': params.page, 'sort': params.sort, 'locale': params.locale, 'hideUnavailableItems': params.hideUnavailableItems, 'simulationBehavior': params.simulationBehavior, 'showSponsored': params.showSponsored, 'sponsoredCount': params.sponsoredCount, 'advertisementPlacement': params.advertisementPlacement, 'repeatSponsoredProducts': params.repeatSponsoredProducts } })
  }

  getFacetsByFacets(params: {
  facets: string
  query?: string
  locale?: string
  hideUnavailableItems?: boolean
  removeHiddenFacets?: boolean
}): Promise<Facets> {
    return this.http.request<Facets>({ method: 'GET', path: `/facets/${params.facets}`, query: { 'query': params.query, 'locale': params.locale, 'hideUnavailableItems': params.hideUnavailableItems, 'removeHiddenFacets': params.removeHiddenFacets } })
  }
}
class IntelligentSearchApiLegacyApi_deliveryPromise {
  constructor(private http: VtexHttpClient) {}

  getPickupPointAvailabilityByFacets(params: {
  facets: string
  query?: string
  locale?: string
  pickupPoint?: string
  an: string
  coordinates?: string
  'zip-code'?: string
  country?: string
  deliveryZonesHash?: string
  pickupPointsHash?: string
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
}>({ method: 'GET', path: `/pickup-point-availability/${params.facets}`, query: { 'query': params.query, 'locale': params.locale, 'pickupPoint': params.pickupPoint, 'an': params.an, 'coordinates': params.coordinates, 'zip-code': params['zip-code'], 'country': params.country, 'deliveryZonesHash': params.deliveryZonesHash, 'pickupPointsHash': params.pickupPointsHash } })
  }
}

export class IntelligentSearchApiLegacyApi {
  readonly autocomplete: IntelligentSearchApiLegacyApi_autocomplete
  readonly productListPage: IntelligentSearchApiLegacyApi_productListPage
  readonly deliveryPromise: IntelligentSearchApiLegacyApi_deliveryPromise
  constructor(http: VtexHttpClient) {
    this.autocomplete = new IntelligentSearchApiLegacyApi_autocomplete(http)
    this.productListPage = new IntelligentSearchApiLegacyApi_productListPage(http)
    this.deliveryPromise = new IntelligentSearchApiLegacyApi_deliveryPromise(http)
  }
}
