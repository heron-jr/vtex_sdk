import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'

class CatalogApiSellerPortalApi_product {
  constructor(private http: VtexHttpClient) {}

  async getProduct(params: {
  productId: string
}, opts?: CallOptions): Promise<{
  id?: string
  externalId?: string
  status: string
  name: string
  brandId: string
  description?: string
  brandName: string
  categoryIds: string[]
  categoryNames: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  id: string
  externalId?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  transportModal?: string | null
  taxCode?: string | null
  origin: string
  createdAt: string
  updatedAt: string
}> {
    return this.http.request<{
  id?: string
  externalId?: string
  status: string
  name: string
  brandId: string
  description?: string
  brandName: string
  categoryIds: string[]
  categoryNames: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  id: string
  externalId?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  transportModal?: string | null
  taxCode?: string | null
  origin: string
  createdAt: string
  updatedAt: string
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/products/${encodePathParam(params.productId)}` }, opts))
  }

  async putProduct(params: {
  productId: string
  body: {
  id?: string
  externalId?: string
  status: string
  name: string
  brandId: string
  description?: string
  categoryIds: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  transportModal?: string | null
  taxCode?: string | null
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  id?: string
  name?: string
  externalId?: string
  description?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  origin: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog-seller-portal/products/${encodePathParam(params.productId)}`, body: params.body }, opts))
  }

  async getProductDescription(params: {
  productId: string
}, opts?: CallOptions): Promise<{
  productId: string
  createdAt: string
  updatedAt: string
}> {
    return this.http.request<{
  productId: string
  createdAt: string
  updatedAt: string
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/products/${encodePathParam(params.productId)}/description` }, opts))
  }

  async putProductDescription(params: {
  productId: string
  body: {
  productId: string
  description: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog-seller-portal/products/${encodePathParam(params.productId)}/description`, body: params.body }, opts))
  }

  async getProductQuery(params: {
  param: string
}, opts?: CallOptions): Promise<{
  id?: string
  externalId?: string
  description?: string
  status: string
  name: string
  brandId: string
  brandName: string
  categoryIds: string[]
  categoryNames: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  id: string
  externalId?: string
  description?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  transportModal?: string
  taxCode?: string
  origin: string
  createdAt: string
  updatedAt: string
}> {
    return this.http.request<{
  id?: string
  externalId?: string
  description?: string
  status: string
  name: string
  brandId: string
  brandName: string
  categoryIds: string[]
  categoryNames: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  id: string
  externalId?: string
  description?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  transportModal?: string
  taxCode?: string
  origin: string
  createdAt: string
  updatedAt: string
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/products/${encodePathParam(params.param)}` }, opts))
  }

  async postProduct(params: {
  body: {
  externalId?: string
  status: string
  name: string
  brandId: string
  description?: string
  categoryIds: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  name: string
  externalId?: string
  description?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  origin: string
  transportModal?: string | null
  taxCode?: string | null
}
}, opts?: CallOptions): Promise<{
  id?: string
  externalId?: string
  status: string
  name: string
  brandId: string
  brandName: string
  description?: string
  categoryIds: string[]
  categoryNames: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  id: string
  name?: string
  externalId?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  origin: string
  transportModal?: string | null
  taxCode?: string | null
  createdAt: string
  updatedAt: string
}> {
    return this.http.request<{
  id?: string
  externalId?: string
  status: string
  name: string
  brandId: string
  brandName: string
  description?: string
  categoryIds: string[]
  categoryNames: string[]
  specs: {
  name: string
  values: string[]
}[]
  attributes: {
  name: string
  value: string
}[]
  slug: string
  images: {
  id: string
  url: string
  alt?: string
}[]
  skus: {
  id: string
  name?: string
  externalId?: string
  ean?: string
  manufacturerCode?: string
  isActive: boolean
  weight: number
  dimensions: {
  width: number
  height: number
  length: number
}
  RealWeight?: number
  RealDimensions?: {
  width: number
  height: number
  length: number
}
  specs: {
  name: string
  value: string
}[] | null
  images: string[]
}[]
  origin: string
  transportModal?: string | null
  taxCode?: string | null
  createdAt: string
  updatedAt: string
}>(withCall({ method: 'POST', path: `/api/catalog-seller-portal/products`, body: params.body }, opts))
  }
}
class CatalogApiSellerPortalApi_sku {
  constructor(private http: VtexHttpClient) {}

  async searchSKU(params: {
  from?: string
  to?: string
  id?: number
  externalid?: number
} = {}, opts?: CallOptions): Promise<{
  data?: {
  id?: string
  productId?: string
  externalId?: string
}[]
  _metadata?: {
  total?: number
  from?: number
  to?: number
}
}> {
    return this.http.request<{
  data?: {
  id?: string
  productId?: string
  externalId?: string
}[]
  _metadata?: {
  total?: number
  from?: number
  to?: number
}
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/skus/_search`, query: { 'from': params.from, 'to': params.to, 'id': params.id, 'externalid': params.externalid } }, opts))
  }

  async listSKU(params: {
  from?: string
  to?: string
} = {}, opts?: CallOptions): Promise<{
  data?: string[]
  _metadata?: {
  total?: number
  from?: number
  to?: number
}
}> {
    return this.http.request<{
  data?: string[]
  _metadata?: {
  total?: number
  from?: number
  to?: number
}
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/skus/ids`, query: { 'from': params.from, 'to': params.to } }, opts))
  }
}
class CatalogApiSellerPortalApi_brand {
  constructor(private http: VtexHttpClient) {}

  async listBrand(params: {
  q?: string
  from?: string
  to?: string
  orderBy?: string
  name?: string
} = {}, opts?: CallOptions): Promise<{
  data: {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}[]
  _metadata: {
  total: number
  from: number
  to: number
  orderBy: string
}
}> {
    return this.http.request<{
  data: {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}[]
  _metadata: {
  total: number
  from: number
  to: number
  orderBy: string
}
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/brands`, query: { 'q': params.q, 'from': params.from, 'to': params.to, 'orderBy': params.orderBy, 'name': params.name } }, opts))
  }

  async postBrand(params: {
  body: {
  name: string
  isActive: boolean
}
}, opts?: CallOptions): Promise<{
  id?: string
  name?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}> {
    return this.http.request<{
  id?: string
  name?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}>(withCall({ method: 'POST', path: `/api/catalog-seller-portal/brands`, body: params.body }, opts))
  }

  async getBrand(params: {
  brandId: string
}, opts?: CallOptions): Promise<{
  id?: string
  name?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}> {
    return this.http.request<{
  id?: string
  name?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/brands/${encodePathParam(params.brandId)}` }, opts))
  }

  async putBrand(params: {
  brandId: string
  body: {
  id: string
  name: string
  isActive: boolean
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog-seller-portal/brands/${encodePathParam(params.brandId)}`, body: params.body }, opts))
  }
}
class CatalogApiSellerPortalApi_category {
  constructor(private http: VtexHttpClient) {}

  async getCategoryTree(params: {
  depth?: number
} = {}, opts?: CallOptions): Promise<{
  roots: {
  value: {
  id: string
  name: string
  isActive: boolean
}
  children: {
  value: {
  id: string
  name: string
  isActive: boolean
}
}[]
}[]
  createdAt?: string
  updatedAt?: string
}> {
    return this.http.request<{
  roots: {
  value: {
  id: string
  name: string
  isActive: boolean
}
  children: {
  value: {
  id: string
  name: string
  isActive: boolean
}
}[]
}[]
  createdAt?: string
  updatedAt?: string
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/category-tree`, query: { 'depth': params.depth } }, opts))
  }

  async updateCategoryTree(params: {
  body: {
  roots: {
  value: {
  id: string
  name: string
  isActive: boolean
}
  children: {
  value: {
  id: string
  name: string
  isActive: boolean
}
}[]
}[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog-seller-portal/category-tree`, body: params.body }, opts))
  }

  async getbyid(params: {
  categoryId: string
}, opts?: CallOptions): Promise<{
  value: {
  id: string
  name: string
  isActive: boolean
}
  children: {
  value: {
  id: string
  name: string
  isActive: boolean
}
}[]
}> {
    return this.http.request<{
  value: {
  id: string
  name: string
  isActive: boolean
}
  children: {
  value: {
  id: string
  name: string
  isActive: boolean
}
}[]
}>(withCall({ method: 'GET', path: `/api/catalog-seller-portal/category-tree/categories/${encodePathParam(params.categoryId)}` }, opts))
  }

  async createCategory(params: {
  body: {
  parentId: string
  Name: string
}
}, opts?: CallOptions): Promise<{
  value: {
  id: string
  name: string
  isActive: boolean
}
  children: {
  value: {
  id: string
  name: string
  isActive: boolean
}
}[]
}> {
    return this.http.request<{
  value: {
  id: string
  name: string
  isActive: boolean
}
  children: {
  value: {
  id: string
  name: string
  isActive: boolean
}
}[]
}>(withCall({ method: 'POST', path: `/api/catalog-seller-portal/category-tree/categories`, body: params.body }, opts))
  }
}

export class CatalogApiSellerPortalApi {
  readonly product: CatalogApiSellerPortalApi_product
  readonly sku: CatalogApiSellerPortalApi_sku
  readonly brand: CatalogApiSellerPortalApi_brand
  readonly category: CatalogApiSellerPortalApi_category
  constructor(http: VtexHttpClient) {
    this.product = new CatalogApiSellerPortalApi_product(http)
    this.sku = new CatalogApiSellerPortalApi_sku(http)
    this.brand = new CatalogApiSellerPortalApi_brand(http)
    this.category = new CatalogApiSellerPortalApi_category(http)
  }
}
