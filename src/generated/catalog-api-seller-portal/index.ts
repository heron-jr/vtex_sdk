import type { VtexHttpClient } from '../../core/http.js'

class CatalogApiSellerPortalApi_product {
  constructor(private http: VtexHttpClient) {}

  getProduct(params: {
  productId: string
}): Promise<{
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
}[]
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
}[]
  images: string[]
}[]
  transportModal?: string
  taxCode?: string
  origin: string
  createdAt: string
  updatedAt: string
}>({ method: 'GET', path: `/api/catalog-seller-portal/products/${params.productId}` })
  }

  putProduct(params: {
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
  transportModal?: string
  taxCode?: string
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
}[]
  images: string[]
}[]
  origin: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog-seller-portal/products/${params.productId}`, body: params.body })
  }

  getProductDescription(params: {
  productId: string
}): Promise<{
  productId: string
  createdAt: string
  updatedAt: string
}> {
    return this.http.request<{
  productId: string
  createdAt: string
  updatedAt: string
}>({ method: 'GET', path: `/api/catalog-seller-portal/products/${params.productId}/description` })
  }

  putProductDescription(params: {
  productId: string
  body: {
  productId: string
  description: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog-seller-portal/products/${params.productId}/description`, body: params.body })
  }

  getProductQuery(params: {
  param: string
}): Promise<{
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
}[]
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
}[]
  images: string[]
}[]
  transportModal?: string
  taxCode?: string
  origin: string
  createdAt: string
  updatedAt: string
}>({ method: 'GET', path: `/api/catalog-seller-portal/products/${params.param}` })
  }

  postProduct(params: {
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
}[]
  images: string[]
}[]
  origin: string
  transportModal?: string
  taxCode?: string
}
}): Promise<{
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
}[]
  images: string[]
}[]
  origin: string
  transportModal?: string
  taxCode?: string
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
}[]
  images: string[]
}[]
  origin: string
  transportModal?: string
  taxCode?: string
  createdAt: string
  updatedAt: string
}>({ method: 'POST', path: `/api/catalog-seller-portal/products`, body: params.body })
  }
}
class CatalogApiSellerPortalApi_sku {
  constructor(private http: VtexHttpClient) {}

  searchSKU(params: {
  from?: string
  to?: string
  id?: number
  externalid?: number
}): Promise<{
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
}>({ method: 'GET', path: `/api/catalog-seller-portal/skus/_search`, query: { 'from': params.from, 'to': params.to, 'id': params.id, 'externalid': params.externalid } })
  }

  listSKU(params: {
  from?: string
  to?: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/catalog-seller-portal/skus/ids`, query: { 'from': params.from, 'to': params.to } })
  }
}
class CatalogApiSellerPortalApi_brand {
  constructor(private http: VtexHttpClient) {}

  listBrand(params: {
  q?: string
  from?: string
  to?: string
  orderBy?: string
  name?: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/catalog-seller-portal/brands`, query: { 'q': params.q, 'from': params.from, 'to': params.to, 'orderBy': params.orderBy, 'name': params.name } })
  }

  postBrand(params: {
  body: {
  name: string
  isActive: boolean
}
}): Promise<{
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
}>({ method: 'POST', path: `/api/catalog-seller-portal/brands`, body: params.body })
  }

  getBrand(params: {
  brandId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/catalog-seller-portal/brands/${params.brandId}` })
  }

  putBrand(params: {
  brandId: string
  body: {
  id: string
  name: string
  isActive: boolean
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog-seller-portal/brands/${params.brandId}`, body: params.body })
  }
}
class CatalogApiSellerPortalApi_category {
  constructor(private http: VtexHttpClient) {}

  getCategoryTree(params: {
  depth?: number
}): Promise<{
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
}>({ method: 'GET', path: `/api/catalog-seller-portal/category-tree`, query: { 'depth': params.depth } })
  }

  updateCategoryTree(params: {
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
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog-seller-portal/category-tree`, body: params.body })
  }

  getbyid(params: {
  categoryId: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/catalog-seller-portal/category-tree/categories/${params.categoryId}` })
  }

  createCategory(params: {
  body: {
  parentId: string
  Name: string
}
}): Promise<{
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
}>({ method: 'POST', path: `/api/catalog-seller-portal/category-tree/categories`, body: params.body })
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
