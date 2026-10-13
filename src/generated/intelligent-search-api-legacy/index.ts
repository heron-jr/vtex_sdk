import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { AutocompleteSearchSuggestions, TopSearches, Correction, Banners, SearchSuggestions, ProductSearch, Product, Facets } from './types.js'

class IntelligentSearchApiLegacyApi_autocomplete {
  constructor(private http: VtexHttpClient) {}

  async getTopSearches(params: {
  locale?: string | null
} = {}, opts?: CallOptions): Promise<TopSearches> {
    return this.http.request<TopSearches>(withCall({ method: 'GET', path: `/top_searches`, query: { 'locale': params.locale }, server: 'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search' }, opts))
  }

  async getAutocompleteSuggestions(params: {
  query?: string
  locale?: string | null
} = {}, opts?: CallOptions): Promise<AutocompleteSearchSuggestions> {
    return this.http.request<AutocompleteSearchSuggestions>(withCall({ method: 'GET', path: `/autocomplete_suggestions`, query: { 'query': params.query, 'locale': params.locale }, server: 'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search' }, opts))
  }

  async getSearchSuggestions(params: {
  query?: string
  locale?: string | null
} = {}, opts?: CallOptions): Promise<SearchSuggestions> {
    return this.http.request<SearchSuggestions>(withCall({ method: 'GET', path: `/search_suggestions`, query: { 'query': params.query, 'locale': params.locale }, server: 'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search' }, opts))
  }
}
class IntelligentSearchApiLegacyApi_productListPage {
  constructor(private http: VtexHttpClient) {}

  async getCorrectionSearch(params: {
  query?: string
  locale?: string | null
} = {}, opts?: CallOptions): Promise<Correction> {
    return this.http.request<Correction>(withCall({ method: 'GET', path: `/correction_search`, query: { 'query': params.query, 'locale': params.locale }, server: 'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search' }, opts))
  }

  async getBannersByFacets(params: {
  facets: string
  query?: string
  locale?: string | null
}, opts?: CallOptions): Promise<Banners> {
    return this.http.request<Banners>(withCall({ method: 'GET', path: `/banners/${encodePathParam(params.facets)}`, query: { 'query': params.query, 'locale': params.locale }, server: 'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search' }, opts))
  }

  async getProductSearchByFacets(params: {
  facets: string
  query?: string
  count?: number | null
  page?: number | null
  sort?: "price:desc" | "price:asc" | "orders:desc" | "name:desc" | "name:asc" | "release:desc" | "discount:desc" | null
  locale?: string | null
  hideUnavailableItems?: boolean
  simulationBehavior?: "default" | "skip" | "only1P" | "only3P" | "regionalize1p" | null
  showSponsored?: boolean | null
  sponsoredCount?: string
  advertisementPlacement?: "top_search" | "middle_search" | "search_shelf" | "cart_shelf" | "plp_shelf" | "autocomplete" | "homepage"
  repeatSponsoredProducts?: boolean
}, opts?: CallOptions): Promise<ProductSearch> {
    return this.http.request<ProductSearch>(withCall({ method: 'GET', path: `/product_search/${encodePathParam(params.facets)}`, query: { 'query': params.query, 'count': params.count, 'page': params.page, 'sort': params.sort, 'locale': params.locale, 'hideUnavailableItems': params.hideUnavailableItems, 'simulationBehavior': params.simulationBehavior, 'showSponsored': params.showSponsored, 'sponsoredCount': params.sponsoredCount, 'advertisementPlacement': params.advertisementPlacement, 'repeatSponsoredProducts': params.repeatSponsoredProducts }, server: 'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search' }, opts))
  }

  async getFacetsByFacets(params: {
  facets: string
  query?: string
  locale?: string | null
  hideUnavailableItems?: boolean
  removeHiddenFacets?: boolean
}, opts?: CallOptions): Promise<Facets> {
    return this.http.request<Facets>(withCall({ method: 'GET', path: `/facets/${encodePathParam(params.facets)}`, query: { 'query': params.query, 'locale': params.locale, 'hideUnavailableItems': params.hideUnavailableItems, 'removeHiddenFacets': params.removeHiddenFacets }, server: 'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search' }, opts))
  }
}
class IntelligentSearchApiLegacyApi_deliveryPromise {
  constructor(private http: VtexHttpClient) {}

  async getPickupPointAvailabilityByFacets(params: {
  facets: string
  query?: string
  locale?: string | null
  pickupPoint?: string
  an: string
  coordinates?: string
  'zip-code'?: string
  country?: string
  deliveryZonesHash?: string
  pickupPointsHash?: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/pickup-point-availability/${encodePathParam(params.facets)}`, query: { 'query': params.query, 'locale': params.locale, 'pickupPoint': params.pickupPoint, 'an': params.an, 'coordinates': params.coordinates, 'zip-code': params['zip-code'], 'country': params.country, 'deliveryZonesHash': params.deliveryZonesHash, 'pickupPointsHash': params.pickupPointsHash }, server: 'https://{accountName}.{environment}.com.br/api/intelligent-search/v0' }, opts))
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
