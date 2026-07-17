import type { VtexHttpClient } from '../../core/http.js'
import type { SpecificationValuesSubcollectionIdResponse, SkuFileResponse, SKUFileURL, SKUFile, GetCategoryTree, GetCategoryTreeChild, Category, CreateCategoryRequest, GetorUpdateProductSpecification, GetSKUandContext, Dimension, RealDimension, Attachment, SkuSeller, Image, SkuSpecification, ProductSpecification, AlternateIds, GetSKUAltID, SkulistbyProductId, CreateSellerRequest, UpdateSellerRequest, CategorySpecification, SpecificationsGroup, SkuComplement, SkuKit, SKUSpecificationResponse, SKUService, SKUServiceTypeRequest, SKUServiceTypeResponse, SKUServiceValueRequest, SKUServiceValueResponse, BrandCreateUpdateRequest, BrandCreateUpdate, BrandGet, AttachmentResponse, AttachmentRequest, SupplierRequest, SupplierResponse, ProductAssortment, AssortmentCollectionAssociation, ErrorResponse } from './types.js'

class CatalogApi_product {
  constructor(private http: VtexHttpClient) {}

  productAndSkuIds(params: {
  categoryId?: number
  _from?: number
  _to?: number
}): Promise<{
  data?: {
  "Product ID"?: number[]
}
  range?: {
  total?: number
  from?: number
  to?: number
}
}> {
    return this.http.request<{
  data?: {
  "Product ID"?: number[]
}
  range?: {
  total?: number
  from?: number
  to?: number
}
}>({ method: 'GET', path: `/api/catalog_system/pvt/products/GetProductAndSkuIds`, query: { 'categoryId': params.categoryId, '_from': params._from, '_to': params._to } })
  }

  getProductbyid(params: {
  productId: string
}): Promise<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}>({ method: 'GET', path: `/api/catalog/pvt/product/${params.productId}` })
  }

  putApiCatalogPvtProductByProductId(params: {
  productId: number
  body: {
  Name: string
  DepartmentId?: number
  CategoryId: number
  BrandId: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}
}): Promise<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}>({ method: 'PUT', path: `/api/catalog/pvt/product/${params.productId}`, body: params.body })
  }

  productandTradePolicy(params: {
  productId: number
}): Promise<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  ListStoreId?: number[]
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  ListStoreId?: number[]
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
}>({ method: 'GET', path: `/api/catalog_system/pvt/products/productget/${params.productId}` })
  }

  productbyRefId(params: {
  refId: string
}): Promise<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  ListStoreId?: number[]
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  ListStoreId?: number[]
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
}>({ method: 'GET', path: `/api/catalog_system/pvt/products/productgetbyrefid/${params.refId}` })
  }

  productVariations(params: {
  productId: number
}): Promise<{
  productId?: number
  name?: string
  salesChannel?: string
  available?: boolean
  displayMode?: string
  dimensions?: string[]
  dimensionsInputType?: Record<string, unknown>
  dimensionsMap?: Record<string, unknown>
  skus?: {
  sku?: number
  skuname?: string
  dimensions?: Record<string, unknown>
  available?: boolean
  availablequantity?: number
  cacheVersionUsedToCallCheckout?: string
  listPriceFormated?: string
  listPrice?: number
  taxFormated?: string
  taxAsInt?: number
  bestPriceFormated?: string
  bestPrice?: number
  spotPrice?: number
  installments?: number
  installmentsValue?: number
  installmentsInsterestRate?: number
  image?: string
  sellerId?: string
  measures?: {
  cubicweight?: number
  height?: number
  length?: number
  weight?: number
  width?: number
}
  unitMultiplier?: number
  rewardValue?: number
}[]
}> {
    return this.http.request<{
  productId?: number
  name?: string
  salesChannel?: string
  available?: boolean
  displayMode?: string
  dimensions?: string[]
  dimensionsInputType?: Record<string, unknown>
  dimensionsMap?: Record<string, unknown>
  skus?: {
  sku?: number
  skuname?: string
  dimensions?: Record<string, unknown>
  available?: boolean
  availablequantity?: number
  cacheVersionUsedToCallCheckout?: string
  listPriceFormated?: string
  listPrice?: number
  taxFormated?: string
  taxAsInt?: number
  bestPriceFormated?: string
  bestPrice?: number
  spotPrice?: number
  installments?: number
  installmentsValue?: number
  installmentsInsterestRate?: number
  image?: string
  sellerId?: string
  measures?: {
  cubicweight?: number
  height?: number
  length?: number
  weight?: number
  width?: number
}
  unitMultiplier?: number
  rewardValue?: number
}[]
}>({ method: 'GET', path: `/api/catalog_system/pub/products/variations/${params.productId}` })
  }

  getApiAddonPvtReviewGetProductRateByProductId(params: {
  productId: number
}): Promise<number> {
    return this.http.request<number>({ method: 'GET', path: `/api/addon/pvt/review/GetProductRate/${params.productId}` })
  }

  postApiCatalogPvtProduct(params: {
  body: {
  Id?: number
  Name: string
  CategoryPath?: string
  DepartmentId?: number
  BrandName?: string
  RefId?: string
  Title?: string
  LinkId?: string
  Description?: string
  ReleaseDate?: string
  IsVisible?: boolean
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  ShowWithoutStock?: boolean
  LomadeeCampaignCode?: string
  Score?: number
} | {
  Id?: number
  Name: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}
}): Promise<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  DepartmentId?: number
  CategoryId?: number
  BrandId?: number
  LinkId?: string
  RefId?: string
  IsVisible?: boolean
  Description?: string
  DescriptionShort?: string
  ReleaseDate?: string
  KeyWords?: string
  Title?: string
  IsActive?: boolean
  TaxCode?: string
  MetaTagDescription?: string
  SupplierId?: number
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}>({ method: 'POST', path: `/api/catalog/pvt/product`, body: params.body })
  }
}
class CatalogApi_productSpecification {
  constructor(private http: VtexHttpClient) {}

  getProductSpecification(params: {
  productId: number
}): Promise<{
  Value: string[]
  Id?: number
  Name?: string
}[]> {
    return this.http.request<{
  Value: string[]
  Id?: number
  Name?: string
}[]>({ method: 'GET', path: `/api/catalog_system/pvt/products/${params.productId}/specification` })
  }

  updateProductSpecification(params: {
  productId: number
  body: GetorUpdateProductSpecification[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog_system/pvt/products/${params.productId}/specification`, body: params.body })
  }

  getProductSpecificationbyProductID(params: {
  productId: number
}): Promise<{
  Id?: number
  ProductId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}[]> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/product/${params.productId}/specification` })
  }

  postApiCatalogPvtProductByProductIdSpecification(params: {
  productId: number
  body: {
  FieldId: number
  FieldValueId?: number
  Text?: string
}
}): Promise<{
  Id?: number
  ProductId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}>({ method: 'POST', path: `/api/catalog/pvt/product/${params.productId}/specification`, body: params.body })
  }

  deleteAllProductSpecifications(params: {
  productId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/product/${params.productId}/specification` })
  }

  deleteaProductSpecification(params: {
  productId: number
  specificationId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/product/${params.productId}/specification/${params.specificationId}` })
  }

  putApiCatalogPvtProductByProductIdSpecificationvalue(params: {
  productId: number
  body: {
  FieldName: string
  GroupName: string
  RootLevelSpecification: boolean
  FieldValues: string[]
}
}): Promise<{
  Id?: number
  ProductId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}[]> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}[]>({ method: 'PUT', path: `/api/catalog/pvt/product/${params.productId}/specificationvalue`, body: params.body })
  }
}
class CatalogApi_sku {
  constructor(private http: VtexHttpClient) {}

  listallSKUIDs(params: {
  page: number
  pagesize: number
}): Promise<number[]> {
    return this.http.request<number[]>({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitids`, query: { 'page': params.page, 'pagesize': params.pagesize } })
  }

  skuContext(params: {
  skuId: number
  sc?: number
}): Promise<GetSKUandContext> {
    return this.http.request<GetSKUandContext>({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${params.skuId}`, query: { 'sc': params.sc } })
  }

  getApiCatalogPvtStockkeepingunit(params: {
  RefId: string
}): Promise<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  Ean?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  Ean?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit`, query: { 'RefId': params.RefId } })
  }

  postApiCatalogPvtStockkeepingunit(params: {
  body: {
  Id?: number
  ProductId: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name: string
  RefId?: string
  PackagedHeight: number
  PackagedLength: number
  PackagedWidth: number
  PackagedWeightKg: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: "un" | "kg" | "g" | "mg" | "m" | "m²" | "m³" | "cm" | "cm²" | "cm³" | "mm" | "mm²" | "mm³" | "oz" | "lb" | "ft" | "ft²" | "ft³" | "in" | "in²" | "in³"
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}
}): Promise<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}>({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit`, body: params.body })
  }

  skuIdbyRefId(params: {
  refId: string
}): Promise<string> {
    return this.http.request<string>({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${params.refId}` })
  }

  skubyAlternateId(params: {
  alternateId: number
}): Promise<GetSKUAltID> {
    return this.http.request<GetSKUAltID>({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitbyalternateId/${params.alternateId}` })
  }

  skulistbyProductId(params: {
  productId: number
}): Promise<SkulistbyProductId[]> {
    return this.http.request<SkulistbyProductId[]>({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitByProductId/${params.productId}` })
  }

  skuIdlistbyRefIdlist(params: {
  body: string[]
}): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>({ method: 'POST', path: `/api/catalog_system/pub/sku/stockkeepingunitidsbyrefids`, body: params.body })
  }

  sku(params: {
  skuId: number
}): Promise<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}` })
  }

  putApiCatalogPvtStockkeepingunitBySkuId(params: {
  skuId: number
  body: {
  ProductId: number
  IsActive: boolean
  ActivateIfPossible?: boolean
  Name: string
  RefId?: string
  PackagedHeight: number
  PackagedLength: number
  PackagedWidth: number
  PackagedWeightKg: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: "un" | "kg" | "g" | "mg" | "m" | "m²" | "m³" | "cm" | "cm²" | "cm³" | "mm" | "mm²" | "mm³" | "oz" | "lb" | "ft" | "ft²" | "ft³" | "in" | "in²" | "in³"
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}
}): Promise<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  IsActive?: boolean
  ActivateIfPossible?: boolean
  Name?: string
  RefId?: string
  PackagedHeight?: number
  PackagedLength?: number
  PackagedWidth?: number
  PackagedWeightKg?: number
  Height?: number
  Length?: number
  Width?: number
  WeightKg?: number
  CubicWeight?: number
  IsKit?: boolean
  CreationDate?: string
  RewardValue?: number
  EstimatedDateArrival?: string
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string
  KitItensSellApart?: boolean
  Videos?: string[]
}>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}`, body: params.body })
  }
}
class CatalogApi_skuComplement {
  constructor(private http: VtexHttpClient) {}

  getSKUComplementbySKUID(params: {
  skuId: number
}): Promise<SkuComplement> {
    return this.http.request<SkuComplement>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/complement` })
  }

  getSKUComplementsbyComplementTypeID(params: {
  skuId: number
  complementTypeId: number
}): Promise<SkuComplement> {
    return this.http.request<SkuComplement>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/complement/${params.complementTypeId}` })
  }

  getSKUcomplementsbytype(params: {
  parentSkuId: number
  type: number
}): Promise<{
  ParentSkuId: number
  ComplementSkuIds: number[]
  Type: "1" | "2" | "3" | "4" | "5"
}> {
    return this.http.request<{
  ParentSkuId: number
  ComplementSkuIds: number[]
  Type: "1" | "2" | "3" | "4" | "5"
}>({ method: 'GET', path: `/api/catalog_system/pvt/sku/complements/${params.parentSkuId}/${params.type}` })
  }

  createSKUComplement(params: {
  body: {
  ParentSkuId: number
  SkuId: number
  ComplementTypeId: 1 | 2 | 3 | 5
}
}): Promise<SkuComplement> {
    return this.http.request<SkuComplement>({ method: 'POST', path: `/api/catalog/pvt/skucomplement`, body: params.body })
  }

  getSKUComplementbySKUComplementID(params: {
  skuComplementId: number
}): Promise<SkuComplement> {
    return this.http.request<SkuComplement>({ method: 'GET', path: `/api/catalog/pvt/skucomplement/${params.skuComplementId}` })
  }

  deleteSKUComplementbySKUComplementID(params: {
  skuComplementId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skucomplement/${params.skuComplementId}` })
  }
}
class CatalogApi_skuEAN {
  constructor(private http: VtexHttpClient) {}

  skubyEAN(params: {
  ean: string
}): Promise<GetSKUAltID> {
    return this.http.request<GetSKUAltID>({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitbyean/${params.ean}` })
  }

  getApiCatalogPvtStockkeepingunitBySkuIdEan(params: {
  skuId: number
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean` })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdEan(params: {
  skuId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean` })
  }

  postApiCatalogPvtStockkeepingunitBySkuIdEanByEan(params: {
  skuId: number
  ean: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean/${params.ean}` })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdEanByEan(params: {
  skuId: number
  ean: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean/${params.ean}` })
  }
}
class CatalogApi_skuAttachment {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuattachment(params: {
  body: {
  AttachmentId: number
  SkuId: number
}
}): Promise<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}> {
    return this.http.request<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}>({ method: 'POST', path: `/api/catalog/pvt/skuattachment`, body: params.body })
  }

  deleteApiCatalogPvtSkuattachment(params: {
  skuId?: number
  attachmentId?: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skuattachment`, query: { 'skuId': params.skuId, 'attachmentId': params.attachmentId } })
  }

  getApiCatalogPvtStockkeepingunitBySkuIdAttachment(params: {
  skuId: number
}): Promise<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}[]> {
    return this.http.request<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}[]>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attachment` })
  }

  deleteApiCatalogPvtSkuattachmentBySkuAttachmentAssociationId(params: {
  skuAttachmentAssociationId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skuattachment/${params.skuAttachmentAssociationId}` })
  }

  associateattachmentstoSKU(params: {
  body: {
  SkuId: number
  AttachmentNames: string[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog_system/pvt/sku/associateattachments`, body: params.body })
  }
}
class CatalogApi_skuFile {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdFile(params: {
  skuId: number
}): Promise<SkuFileResponse> {
    return this.http.request<SkuFileResponse>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file` })
  }

  postApiCatalogPvtStockkeepingunitBySkuIdFile(params: {
  skuId: number
  body: SKUFileURL
}): Promise<SkuFileResponse> {
    return this.http.request<SkuFileResponse>({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file`, body: params.body })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdFile(params: {
  skuId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file` })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileId(params: {
  skuId: number
  skuFileId: number
  body: SKUFileURL
}): Promise<SkuFileResponse> {
    return this.http.request<SkuFileResponse>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}`, body: params.body })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileId(params: {
  skuId: number
  skuFileId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}` })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdFileReorder(params: {
  skuId: number
  body: {
  Id: number
  Position: number
}[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/reorder`, body: params.body })
  }

  putApiCatalogPvtStockkeepingunitCopyBySkuIdfromBySkuIdtoFile(params: {
  skuIdfrom: number
  skuIdto: number
}): Promise<{
  Id?: number
  ArchiveId?: number
  SkuId?: number
  IsMain?: boolean
  Label?: string
}[]> {
    return this.http.request<{
  Id?: number
  ArchiveId?: number
  SkuId?: number
  IsMain?: boolean
  Label?: string
}[]>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/copy/${params.skuIdfrom}/${params.skuIdto}/file` })
  }

  deleteApiCatalogPvtStockkeepingunitDisassociateBySkuIdFileBySkuFileId(params: {
  skuId: number
  skuFileId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/disassociate/${params.skuId}/file/${params.skuFileId}` })
  }
}
class CatalogApi_skuKit {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitkit(params: {
  skuId?: number
  parentSkuId?: number
}): Promise<SkuKit> {
    return this.http.request<SkuKit>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunitkit`, query: { 'skuId': params.skuId, 'parentSkuId': params.parentSkuId } })
  }

  postApiCatalogPvtStockkeepingunitkit(params: {
  body: {
  StockKeepingUnitParent: number
  StockKeepingUnitId: number
  Quantity: number
  UnitPrice: number
}
}): Promise<SkuKit> {
    return this.http.request<SkuKit>({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunitkit`, body: params.body })
  }

  deleteApiCatalogPvtStockkeepingunitkit(params: {
  skuId?: number
  parentSkuId?: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunitkit`, query: { 'skuId': params.skuId, 'parentSkuId': params.parentSkuId } })
  }

  getApiCatalogPvtStockkeepingunitkitByKitId(params: {
  kitId: number
}): Promise<SkuKit> {
    return this.http.request<SkuKit>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunitkit/${params.kitId}` })
  }

  deleteApiCatalogPvtStockkeepingunitkitByKitId(params: {
  kitId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunitkit/${params.kitId}` })
  }
}
class CatalogApi_skuSeller {
  constructor(private http: VtexHttpClient) {}

  getSKUseller(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<{
  IsPersisted: boolean
  IsRemoved: boolean
  SkuSellerId: number
  SellerId: string
  StockKeepingUnitId: number
  SellerStockKeepingUnitId: string
  IsActive: boolean
  UpdateDate: string
  RequestedUpdateDate: string
}> {
    return this.http.request<{
  IsPersisted: boolean
  IsRemoved: boolean
  SkuSellerId: number
  SellerId: string
  StockKeepingUnitId: number
  SellerStockKeepingUnitId: string
  IsActive: boolean
  UpdateDate: string
  RequestedUpdateDate: string
}>({ method: 'GET', path: `/api/catalog_system/pvt/skuseller/${params.sellerId}/${params.sellerSkuId}` })
  }

  deleteSKUsellerassociation(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog_system/pvt/skuseller/remove/${params.sellerId}/${params.sellerSkuId}` })
  }

  postApiCatalogSystemPvtSkusellerChangenotificationBySellerIdBySellerSkuId(params: {
  sellerId: string
  sellerSkuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog_system/pvt/skuseller/changenotification/${params.sellerId}/${params.sellerSkuId}` })
  }

  changeNotification(params: {
  skuId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog_system/pvt/skuseller/changenotification/${params.skuId}` })
  }
}
class CatalogApi_skuAttribute {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdAttribute(params: {
  skuId: number
}): Promise<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}[]> {
    return this.http.request<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}[]>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute` })
  }

  postApiCatalogPvtStockkeepingunitBySkuIdAttribute(params: {
  skuId: number
  body: {
  SpecificationName: string
  SpecificationValue: string
  IsVisible?: boolean
}
}): Promise<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}> {
    return this.http.request<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}>({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute`, body: params.body })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdAttribute(params: {
  skuId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute` })
  }

  getApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeId(params: {
  skuId: number
  skuAttributeId: number
}): Promise<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}> {
    return this.http.request<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute/${params.skuAttributeId}` })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeId(params: {
  skuId: number
  skuAttributeId: number
  body: {
  SpecificationName: string
  SpecificationValue: string
  IsVisible?: boolean
}
}): Promise<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}> {
    return this.http.request<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
  IsVisible?: boolean
}>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute/${params.skuAttributeId}`, body: params.body })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeId(params: {
  skuId: number
  skuAttributeId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute/${params.skuAttributeId}` })
  }
}
class CatalogApi_skuService {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSkuserviceBySkuServiceId(params: {
  skuServiceId: number
}): Promise<SKUService> {
    return this.http.request<SKUService>({ method: 'GET', path: `/api/catalog/pvt/skuservice/${params.skuServiceId}` })
  }

  putApiCatalogPvtSkuserviceBySkuServiceId(params: {
  skuServiceId: number
  body: {
  SkuServiceTypeId: number
  SkuServiceValueId: number
  SkuId: number
  Name: string
  Text: string
  IsActive: boolean
}
}): Promise<SKUService> {
    return this.http.request<SKUService>({ method: 'PUT', path: `/api/catalog/pvt/skuservice/${params.skuServiceId}`, body: params.body })
  }

  deleteApiCatalogPvtSkuserviceBySkuServiceId(params: {
  skuServiceId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skuservice/${params.skuServiceId}` })
  }

  postApiCatalogPvtSkuservice(params: {
  body: {
  SkuServiceTypeId: number
  SkuServiceValueId: number
  SkuId: number
  Name: string
  Text: string
  IsActive: boolean
}
}): Promise<SKUService> {
    return this.http.request<SKUService>({ method: 'POST', path: `/api/catalog/pvt/skuservice`, body: params.body })
  }
}
class CatalogApi_skuServiceAttachment {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuservicetypeattachment(params: {
  body: {
  AttachmentId: number
  SkuServiceTypeId: number
}
}): Promise<{
  Id?: number
  AttachmentId?: number
  SkuServiceTypeId?: number
}> {
    return this.http.request<{
  Id?: number
  AttachmentId?: number
  SkuServiceTypeId?: number
}>({ method: 'POST', path: `/api/catalog/pvt/skuservicetypeattachment`, body: params.body })
  }

  deleteApiCatalogPvtSkuservicetypeattachment(params: {
  attachmentId?: number
  skuServiceTypeId?: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skuservicetypeattachment`, query: { 'attachmentId': params.attachmentId, 'skuServiceTypeId': params.skuServiceTypeId } })
  }

  deleteApiCatalogPvtSkuservicetypeattachmentBySkuServiceTypeAttachmentId(params: {
  skuServiceTypeAttachmentId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skuservicetypeattachment/${params.skuServiceTypeAttachmentId}` })
  }
}
class CatalogApi_skuServiceType {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuservicetype(params: {
  body: SKUServiceTypeRequest
}): Promise<SKUServiceTypeResponse> {
    return this.http.request<SKUServiceTypeResponse>({ method: 'POST', path: `/api/catalog/pvt/skuservicetype`, body: params.body })
  }

  getApiCatalogPvtSkuservicetypeBySkuServiceTypeId(params: {
  skuServiceTypeId: number
}): Promise<SKUServiceTypeResponse> {
    return this.http.request<SKUServiceTypeResponse>({ method: 'GET', path: `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}` })
  }

  putApiCatalogPvtSkuservicetypeBySkuServiceTypeId(params: {
  skuServiceTypeId: number
  body: SKUServiceTypeRequest
}): Promise<SKUServiceTypeResponse> {
    return this.http.request<SKUServiceTypeResponse>({ method: 'PUT', path: `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}`, body: params.body })
  }

  deleteApiCatalogPvtSkuservicetypeBySkuServiceTypeId(params: {
  skuServiceTypeId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}` })
  }
}
class CatalogApi_skuServiceValue {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuservicevalue(params: {
  body: SKUServiceValueRequest
}): Promise<SKUServiceValueResponse> {
    return this.http.request<SKUServiceValueResponse>({ method: 'POST', path: `/api/catalog/pvt/skuservicevalue`, body: params.body })
  }

  getApiCatalogPvtSkuservicevalueBySkuServiceValueId(params: {
  skuServiceValueId: number
}): Promise<SKUServiceValueResponse> {
    return this.http.request<SKUServiceValueResponse>({ method: 'GET', path: `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}` })
  }

  putApiCatalogPvtSkuservicevalueBySkuServiceValueId(params: {
  skuServiceValueId: number
  body: SKUServiceValueRequest
}): Promise<SKUServiceValueResponse> {
    return this.http.request<SKUServiceValueResponse>({ method: 'PUT', path: `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}`, body: params.body })
  }

  deleteApiCatalogPvtSkuservicevalueBySkuServiceValueId(params: {
  skuServiceValueId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}` })
  }
}
class CatalogApi_skuSpecification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdSpecification(params: {
  skuId: number
}): Promise<SKUSpecificationResponse[]> {
    return this.http.request<SKUSpecificationResponse[]>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification` })
  }

  postApiCatalogPvtStockkeepingunitBySkuIdSpecification(params: {
  skuId: number
  body: {
  FieldId: number
  FieldValueId?: number
}
}): Promise<SKUSpecificationResponse> {
    return this.http.request<SKUSpecificationResponse>({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification`, body: params.body })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdSpecification(params: {
  skuId: number
  body: {
  Id: number
  SkuId?: number
  FieldId: number
  FieldValueId: number
  Text?: string
}
}): Promise<SKUSpecificationResponse[]> {
    return this.http.request<SKUSpecificationResponse[]>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification`, body: params.body })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdSpecification(params: {
  skuId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification` })
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdSpecificationBySpecificationId(params: {
  skuId: number
  specificationId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification/${params.specificationId}` })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdSpecificationvalue(params: {
  skuId: number
  body: {
  FieldName: string
  GroupName: string
  RootLevelSpecification: boolean
  FieldValues: string[]
}
}): Promise<{
  Id?: number
  SkuId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}[]> {
    return this.http.request<{
  Id?: number
  SkuId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}[]>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specificationvalue`, body: params.body })
  }
}
class CatalogApi_subcollection {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSubcollectionBySubCollectionIdStockkeepingunit(params: {
  subCollectionId: number
  body: {
  SkuId: number
}
}): Promise<{
  SubCollectionId?: number
  SkuId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  SkuId?: number
}>({ method: 'POST', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/stockkeepingunit`, body: params.body })
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdStockkeepingunitBySkuId(params: {
  subCollectionId: number
  skuId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/stockkeepingunit/${params.skuId}` })
  }

  postApiCatalogPvtSubcollectionBySubCollectionIdCategory(params: {
  subCollectionId: number
  body: {
  CategoryId: number
}
}): Promise<{
  SubCollectionId?: number
  CategoryId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  CategoryId?: number
}>({ method: 'POST', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/category`, body: params.body })
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdCategoryByCategoryId(params: {
  subCollectionId: number
  categoryId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/category/${params.categoryId}` })
  }

  postApiCatalogPvtSubcollectionBySubCollectionIdBrand(params: {
  subCollectionId: number
  body: {
  BrandId: number
}
}): Promise<{
  SubCollectionId?: number
  BrandId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  BrandId?: number
}>({ method: 'POST', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/brand`, body: params.body })
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdBrandByBrandId(params: {
  subCollectionId: number
  brandId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/brand/${params.brandId}` })
  }

  getApiCatalogPvtCollectionByCollectionIdSubcollection(params: {
  collectionId: number
}): Promise<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}[]> {
    return this.http.request<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}[]>({ method: 'GET', path: `/api/catalog/pvt/collection/${params.collectionId}/subcollection` })
  }

  getApiCatalogPvtSubcollectionBySubCollectionId(params: {
  subCollectionId: number
}): Promise<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}> {
    return this.http.request<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}>({ method: 'GET', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}` })
  }

  putApiCatalogPvtSubcollectionBySubCollectionId(params: {
  subCollectionId: number
  body: {
  CollectionId: number
  Name: string
  Type: string
  PreSale: boolean
  Release: boolean
}
}): Promise<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}> {
    return this.http.request<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}>({ method: 'PUT', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}`, body: params.body })
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionId(params: {
  subCollectionId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}` })
  }

  postApiCatalogPvtSubcollection(params: {
  body: {
  CollectionId: number
  Name: string
  Type: string
  PreSale: boolean
  Release: boolean
}
}): Promise<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}> {
    return this.http.request<{
  Id?: number
  CollectionId?: number
  Name?: string
  Type?: string
  PreSale?: boolean
  Release?: boolean
}>({ method: 'POST', path: `/api/catalog/pvt/subcollection`, body: params.body })
  }

  postApiCatalogPvtCollectionByCollectionIdPosition(params: {
  collectionId: number
  body: {
  skuId: number
  position: number
  subCollectionId: number
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog/pvt/collection/${params.collectionId}/position`, body: params.body })
  }

  getApiCatalogPvtSubcollectionBySubCollectionIdSpecificationvalue(params: {
  subCollectionId: number
}): Promise<SpecificationValuesSubcollectionIdResponse> {
    return this.http.request<SpecificationValuesSubcollectionIdResponse>({ method: 'GET', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/specificationvalue` })
  }

  postApiCatalogPvtSubcollectionBySubCollectionIdSpecificationvalue(params: {
  subCollectionId: number
  body: {
  SubCollectionId: number
  SpecificationValueId: number
}
}): Promise<{
  SubCollectionId?: number
  SpecificationValueId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  SpecificationValueId?: number
}>({ method: 'POST', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/specificationvalue`, body: params.body })
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdSpecificationvalue(params: {
  subCollectionId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${params.subCollectionId}/specificationvalue` })
  }
}
class CatalogApi_category {
  constructor(private http: VtexHttpClient) {}

  categoryTree(params: {
  categoryLevels: string
}): Promise<GetCategoryTree[]> {
    return this.http.request<GetCategoryTree[]>({ method: 'GET', path: `/api/catalog_system/pub/category/tree/${params.categoryLevels}` })
  }

  getApiCatalogPvtCategoryByCategoryId(params: {
  categoryId: number
  includeTreePath?: boolean
}): Promise<Category> {
    return this.http.request<Category>({ method: 'GET', path: `/api/catalog/pvt/category/${params.categoryId}`, query: { 'includeTreePath': params.includeTreePath } })
  }

  putApiCatalogPvtCategoryByCategoryId(params: {
  categoryId: number
  body: {
  Name: string
  Keywords: string
  Title: string
  Description: string
  AdWordsRemarketingCode: string
  LomadeeCampaignCode: string
  FatherCategoryId: number
  GlobalCategoryId: number
  ShowInStoreFront: boolean
  IsActive: boolean
  ActiveStoreFrontLink: boolean
  ShowBrandFilter: boolean
  Score: number
  StockKeepingUnitSelectionMode: string
}
}): Promise<Category> {
    return this.http.request<Category>({ method: 'PUT', path: `/api/catalog/pvt/category/${params.categoryId}`, body: params.body })
  }

  postApiCatalogPvtCategory(params: {
  body: CreateCategoryRequest
}): Promise<Category> {
    return this.http.request<Category>({ method: 'POST', path: `/api/catalog/pvt/category`, body: params.body })
  }
}
class CatalogApi_similarCategory {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtProductByProductIdSimilarcategory(params: {
  productId: number
}): Promise<{
  ProductId?: number
  CategoryId?: number
}[]> {
    return this.http.request<{
  ProductId?: number
  CategoryId?: number
}[]>({ method: 'GET', path: `/api/catalog/pvt/product/${params.productId}/similarcategory` })
  }

  postApiCatalogPvtProductByProductIdSimilarcategoryByCategoryId(params: {
  productId: number
  categoryId: number
}): Promise<{
  ProductId?: number
  StoreId?: number
}> {
    return this.http.request<{
  ProductId?: number
  StoreId?: number
}>({ method: 'POST', path: `/api/catalog/pvt/product/${params.productId}/similarcategory/${params.categoryId}` })
  }

  deleteApiCatalogPvtProductByProductIdSimilarcategoryByCategoryId(params: {
  productId: number
  categoryId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/product/${params.productId}/similarcategory/${params.categoryId}` })
  }
}
class CatalogApi_categorySpecification {
  constructor(private http: VtexHttpClient) {}

  specificationsByCategoryId(params: {
  categoryId: number
}): Promise<CategorySpecification> {
    return this.http.request<CategorySpecification>({ method: 'GET', path: `/api/catalog_system/pub/specification/field/listByCategoryId/${params.categoryId}` })
  }

  specificationsTreeByCategoryId(params: {
  categoryId: number
}): Promise<CategorySpecification> {
    return this.http.request<CategorySpecification>({ method: 'GET', path: `/api/catalog_system/pub/specification/field/listTreeByCategoryId/${params.categoryId}` })
  }
}
class CatalogApi_brand {
  constructor(private http: VtexHttpClient) {}

  brandList(params: Record<string, never>): Promise<BrandGet[]> {
    return this.http.request<BrandGet[]>({ method: 'GET', path: `/api/catalog_system/pvt/brand/list` })
  }

  brandListPerPage(params: {
  pageSize: number
  page: number
}): Promise<{
  items: BrandGet[]
  paging: {
  page: number
  perPage: number
  total: number
  pages: number
}
}> {
    return this.http.request<{
  items: BrandGet[]
  paging: {
  page: number
  perPage: number
  total: number
  pages: number
}
}>({ method: 'GET', path: `/api/catalog_system/pvt/brand/pagedlist`, query: { 'pageSize': params.pageSize, 'page': params.page } })
  }

  brand(params: {
  brandId: string
}): Promise<BrandGet> {
    return this.http.request<BrandGet>({ method: 'GET', path: `/api/catalog_system/pvt/brand/${params.brandId}` })
  }

  postApiCatalogPvtBrand(params: {
  body: BrandCreateUpdateRequest
}): Promise<BrandCreateUpdate> {
    return this.http.request<BrandCreateUpdate>({ method: 'POST', path: `/api/catalog/pvt/brand`, body: params.body })
  }

  getApiCatalogPvtBrandByBrandId(params: {
  brandId: string
}): Promise<BrandCreateUpdate> {
    return this.http.request<BrandCreateUpdate>({ method: 'GET', path: `/api/catalog/pvt/brand/${params.brandId}` })
  }

  putApiCatalogPvtBrandByBrandId(params: {
  brandId: string
  body: BrandCreateUpdateRequest
}): Promise<BrandCreateUpdate> {
    return this.http.request<BrandCreateUpdate>({ method: 'PUT', path: `/api/catalog/pvt/brand/${params.brandId}`, body: params.body })
  }

  deleteApiCatalogPvtBrandByBrandId(params: {
  brandId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/brand/${params.brandId}` })
  }
}
class CatalogApi_attachment {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtAttachmentByAttachmentid(params: {
  attachmentid: string
}): Promise<AttachmentResponse> {
    return this.http.request<AttachmentResponse>({ method: 'GET', path: `/api/catalog/pvt/attachment/${params.attachmentid}` })
  }

  putApiCatalogPvtAttachmentByAttachmentid(params: {
  attachmentid: string
  body: AttachmentRequest
}): Promise<AttachmentResponse> {
    return this.http.request<AttachmentResponse>({ method: 'PUT', path: `/api/catalog/pvt/attachment/${params.attachmentid}`, body: params.body })
  }

  deleteApiCatalogPvtAttachmentByAttachmentid(params: {
  attachmentid: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/attachment/${params.attachmentid}` })
  }

  postApiCatalogPvtAttachment(params: {
  body: AttachmentRequest
}): Promise<AttachmentResponse> {
    return this.http.request<AttachmentResponse>({ method: 'POST', path: `/api/catalog/pvt/attachment`, body: params.body })
  }

  getApiCatalogPvtAttachments(params: Record<string, never>): Promise<{
  Page?: number
  Size?: number
  TotalRows?: number
  TotalPage?: number
  Data?: {
  Id: number
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: {
  FieldName?: string
  MaxCaracters?: string
  DomainValues?: string
}[]
}[]
}> {
    return this.http.request<{
  Page?: number
  Size?: number
  TotalRows?: number
  TotalPage?: number
  Data?: {
  Id: number
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: {
  FieldName?: string
  MaxCaracters?: string
  DomainValues?: string
}[]
}[]
}>({ method: 'GET', path: `/api/catalog/pvt/attachments` })
  }
}
class CatalogApi_collection {
  constructor(private http: VtexHttpClient) {}

  getAllInactiveCollections(params: Record<string, never>): Promise<number[]> {
    return this.http.request<number[]>({ method: 'GET', path: `/api/catalog/pvt/collection/inactive` })
  }

  postCreateCollection(params: {
  body: {
  Name: string
  Description: string
  Searchable: boolean
  Highlight: boolean
  DateFrom: string
  DateTo: string
}
}): Promise<{
  Id?: number
  Name?: string
  Description?: string
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  Description?: string
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}>({ method: 'POST', path: `/api/catalog/pvt/collection`, body: params.body })
  }

  getImportfileexample(params: Record<string, never>): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/catalog/pvt/collection/stockkeepingunit/importfileexample` })
  }

  postAddproductsbyimportfile(params: {
  collectionId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog/pvt/collection/${params.collectionId}/stockkeepingunit/importinsert` })
  }

  postRemoveproductsbyimportfile(params: {
  collectionId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog/pvt/collection/${params.collectionId}/stockkeepingunit/importexclude` })
  }

  getProductsfromacollection(params: {
  collectionId: number
  page?: number
  pageSize?: number
  Filter?: string
  Active?: boolean
  Visible?: boolean
  CategoryId?: number
  BrandId?: number
  SupplierId?: number
  SalesChannelId?: number
  ReleaseFrom?: string
  ReleaseTo?: string
  SpecificationProduct?: string
  SpecificationFieldId?: number
}): Promise<{
  Page?: number
  Size?: number
  TotalRows?: number
  TotalPage?: number
  Data?: {
  ProductId?: number
  SkuId?: number
  SubCollectionId?: number
  Position?: number
  ProductName?: string
  SkuImageUrl?: string
}[]
}> {
    return this.http.request<{
  Page?: number
  Size?: number
  TotalRows?: number
  TotalPage?: number
  Data?: {
  ProductId?: number
  SkuId?: number
  SubCollectionId?: number
  Position?: number
  ProductName?: string
  SkuImageUrl?: string
}[]
}>({ method: 'GET', path: `/api/catalog/pvt/collection/${params.collectionId}/products`, query: { 'page': params.page, 'pageSize': params.pageSize, 'Filter': params.Filter, 'Active': params.Active, 'Visible': params.Visible, 'CategoryId': params.CategoryId, 'BrandId': params.BrandId, 'SupplierId': params.SupplierId, 'SalesChannelId': params.SalesChannelId, 'ReleaseFrom': params.ReleaseFrom, 'ReleaseTo': params.ReleaseTo, 'SpecificationProduct': params.SpecificationProduct, 'SpecificationFieldId': params.SpecificationFieldId } })
  }

  getApiCatalogPvtCollectionByCollectionId(params: {
  collectionId: number
}): Promise<{
  Id?: number
  Name?: string
  Description?: string
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  Description?: string
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}>({ method: 'GET', path: `/api/catalog/pvt/collection/${params.collectionId}` })
  }

  putApiCatalogPvtCollectionByCollectionId(params: {
  collectionId: number
  body: {
  Name: string
  Searchable: boolean
  Highlight: boolean
  DateFrom: string
  DateTo: string
}
}): Promise<{
  Id?: number
  Name?: string
  Description?: string
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  Description?: string
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}>({ method: 'PUT', path: `/api/catalog/pvt/collection/${params.collectionId}`, body: params.body })
  }

  deleteApiCatalogPvtCollectionByCollectionId(params: {
  collectionId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/collection/${params.collectionId}` })
  }
}
class CatalogApi_specification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationBySpecificationId(params: {
  specificationId: number
}): Promise<{
  Id: number
  FieldTypeId: 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9
  CategoryId: number
  FieldGroupId: number
  Name: string
  Description: string
  Position: number
  IsFilter: boolean
  IsRequired: boolean
  IsOnProductDetails: boolean
  IsStockKeepingUnit: boolean
  IsWizard: boolean
  IsActive: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string
}> {
    return this.http.request<{
  Id: number
  FieldTypeId: 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9
  CategoryId: number
  FieldGroupId: number
  Name: string
  Description: string
  Position: number
  IsFilter: boolean
  IsRequired: boolean
  IsOnProductDetails: boolean
  IsStockKeepingUnit: boolean
  IsWizard: boolean
  IsActive: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string
}>({ method: 'GET', path: `/api/catalog/pvt/specification/${params.specificationId}` })
  }

  putApiCatalogPvtSpecificationBySpecificationId(params: {
  specificationId: number
  body: {
  FieldTypeId: 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9
  CategoryId: number
  FieldGroupId: number
  Name: string
  Description: string
  Position: number
  IsFilter: boolean
  IsRequired: boolean
  IsOnProductDetails: boolean
  IsStockKeepingUnit: boolean
  IsWizard: boolean
  IsActive: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string
}
}): Promise<{
  Id?: number
  FieldTypeId?: number
  CategoryId?: number
  FieldGroupId?: number
  Name?: string
  Description?: string
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}> {
    return this.http.request<{
  Id?: number
  FieldTypeId?: number
  CategoryId?: number
  FieldGroupId?: number
  Name?: string
  Description?: string
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}>({ method: 'PUT', path: `/api/catalog/pvt/specification/${params.specificationId}`, body: params.body })
  }

  postApiCatalogPvtSpecification(params: {
  body: {
  FieldTypeId: 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9
  CategoryId?: number
  FieldGroupId: number
  Name: string
  Description?: string
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}
}): Promise<{
  Id?: number
  FieldTypeId?: number
  CategoryId?: number
  FieldGroupId?: number
  Name?: string
  Description?: string
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}> {
    return this.http.request<{
  Id?: number
  FieldTypeId?: number
  CategoryId?: number
  FieldGroupId?: number
  Name?: string
  Description?: string
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}>({ method: 'POST', path: `/api/catalog/pvt/specification`, body: params.body })
  }
}
class CatalogApi_specificationField {
  constructor(private http: VtexHttpClient) {}

  specificationsField(params: {
  fieldId: number
}): Promise<{
  Name?: string
  FieldId?: number
  IsActive?: boolean
  IsRequired?: boolean
  FieldTypeId?: number
  FieldTypeName?: string
  FieldValueId?: number
  Description?: string
  IsStockKeepingUnit?: boolean
  IsFilter?: boolean
  IsOnProductDetails?: boolean
  Position?: number
  IsWizard?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
  FieldGroupId?: number
  FieldGroupName?: string
}> {
    return this.http.request<{
  Name?: string
  FieldId?: number
  IsActive?: boolean
  IsRequired?: boolean
  FieldTypeId?: number
  FieldTypeName?: string
  FieldValueId?: number
  Description?: string
  IsStockKeepingUnit?: boolean
  IsFilter?: boolean
  IsOnProductDetails?: boolean
  Position?: number
  IsWizard?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
  FieldGroupId?: number
  FieldGroupName?: string
}>({ method: 'GET', path: `/api/catalog_system/pub/specification/fieldGet/${params.fieldId}` })
  }

  specificationsInsertField(params: {
  body: {
  Name: string
  CategoryId: number
  FieldId: number
  IsActive: boolean
  IsRequired: boolean
  FieldTypeId: number
  FieldValueId: number
  Description: string
  IsStockKeepingUnit: boolean
  IsFilter: boolean
  IsOnProductDetails: boolean
  Position: number
  IsWizard: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string
  FieldGroupId: number
  FieldGroupName: string
}
}): Promise<number> {
    return this.http.request<number>({ method: 'POST', path: `/api/catalog_system/pvt/specification/field`, body: params.body })
  }

  specificationsInsertFieldUpdate(params: {
  body: {
  Name: string
  CategoryId: number
  FieldId: number
  IsActive: boolean
  IsRequired: boolean
  FieldTypeId: number
  FieldValueId?: number
  Description: string
  IsStockKeepingUnit: boolean
  IsFilter: boolean
  IsOnProductDetails: boolean
  Position: number
  IsWizard: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string
  FieldGroupId: number
  FieldGroupName: string
}
}): Promise<number> {
    return this.http.request<number>({ method: 'PUT', path: `/api/catalog_system/pvt/specification/field`, body: params.body })
  }
}
class CatalogApi_specificationFieldValue {
  constructor(private http: VtexHttpClient) {}

  specificationsGetFieldValue(params: {
  fieldValueId: string
}): Promise<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}> {
    return this.http.request<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}>({ method: 'GET', path: `/api/catalog_system/pvt/specification/fieldValue/${params.fieldValueId}` })
  }

  specificationsValuesByFieldId(params: {
  fieldId: number
}): Promise<{
  FieldValueId: number
  Value: string
  IsActive: boolean
  Position: number
}[]> {
    return this.http.request<{
  FieldValueId: number
  Value: string
  IsActive: boolean
  Position: number
}[]>({ method: 'GET', path: `/api/catalog_system/pub/specification/fieldvalue/${params.fieldId}` })
  }

  specificationsInsertFieldValue(params: {
  body: {
  FieldId: number
  Name: string
  Text: string
  IsActive: boolean
  Position: number
}
}): Promise<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}> {
    return this.http.request<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}>({ method: 'POST', path: `/api/catalog_system/pvt/specification/fieldValue`, body: params.body })
  }

  specificationsUpdateFieldValue(params: {
  body: {
  FieldId: number
  Name: string
  Text: string
  IsActive: boolean
  Position: number
}
}): Promise<string> {
    return this.http.request<string>({ method: 'PUT', path: `/api/catalog_system/pvt/specification/fieldValue`, body: params.body })
  }
}
class CatalogApi_specificationValue {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationvalueBySpecificationValueId(params: {
  specificationValueId: number
}): Promise<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}> {
    return this.http.request<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}>({ method: 'GET', path: `/api/catalog/pvt/specificationvalue/${params.specificationValueId}` })
  }

  putApiCatalogPvtSpecificationvalueBySpecificationValueId(params: {
  specificationValueId: number
  body: {
  FieldId: number
  Name: string
  Text?: string
  IsActive?: boolean
  Position?: number
}
}): Promise<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}> {
    return this.http.request<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}>({ method: 'PUT', path: `/api/catalog/pvt/specificationvalue/${params.specificationValueId}`, body: params.body })
  }

  postApiCatalogPvtSpecificationvalue(params: {
  body: {
  FieldId: number
  Name: string
  Text?: string
  IsActive?: boolean
  Position?: number
}
}): Promise<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}> {
    return this.http.request<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
  Position?: number
}>({ method: 'POST', path: `/api/catalog/pvt/specificationvalue`, body: params.body })
  }
}
class CatalogApi_specificationGroup {
  constructor(private http: VtexHttpClient) {}

  specificationsGroupListbyCategory(params: {
  categoryId: string
}): Promise<SpecificationsGroup[]> {
    return this.http.request<SpecificationsGroup[]>({ method: 'GET', path: `/api/catalog_system/pvt/specification/groupbycategory/${params.categoryId}` })
  }

  specificationsGroupGet(params: {
  groupId: string
}): Promise<SpecificationsGroup> {
    return this.http.request<SpecificationsGroup>({ method: 'GET', path: `/api/catalog_system/pub/specification/groupGet/${params.groupId}` })
  }

  specificationGroupInsert2(params: {
  body: {
  CategoryId: number
  Name: string
}
}): Promise<{
  Id?: number
  CategoryId?: number
  Name?: string
  Position?: number
}> {
    return this.http.request<{
  Id?: number
  CategoryId?: number
  Name?: string
  Position?: number
}>({ method: 'POST', path: `/api/catalog/pvt/specificationgroup`, body: params.body })
  }

  putApiCatalogPvtSpecificationgroupByGroupId(params: {
  groupId: number
  body: {
  CategoryId: number
  Id: number
  Name: string
  Position: number
}
}): Promise<{
  CategoryId?: number
  Id?: number
  Name?: string
  Position?: number
}> {
    return this.http.request<{
  CategoryId?: number
  Id?: number
  Name?: string
  Position?: number
}>({ method: 'PUT', path: `/api/catalog/pvt/specificationgroup/${params.groupId}`, body: params.body })
  }
}
class CatalogApi_nonStructuredSpecification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationNonstructuredById(params: {
  Id: number
}): Promise<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
}[]> {
    return this.http.request<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/specification/nonstructured/${params.Id}` })
  }

  deleteApiCatalogPvtSpecificationNonstructuredById(params: {
  Id: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/specification/nonstructured/${params.Id}` })
  }

  getApiCatalogPvtSpecificationNonstructured(params: {
  skuId: number
}): Promise<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
}[]> {
    return this.http.request<{
  Id?: number
  SkuId?: number
  SpecificationName?: string
  SpecificationValue?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/specification/nonstructured`, query: { 'skuId': params.skuId } })
  }

  deleteApiCatalogPvtSpecificationNonstructured(params: {
  skuId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/specification/nonstructured`, query: { 'skuId': params.skuId } })
  }
}
class CatalogApi_salesChannel {
  constructor(private http: VtexHttpClient) {}

  salesChannelList(params: Record<string, never>): Promise<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number
  CountryCode?: string
  CultureInfo?: string
  TimeZone?: string
  CurrencyCode?: string
  CurrencySymbol?: string
  CurrencyLocale?: number
  CurrencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  Origin?: string
  Position?: number
  ConditionRule?: string
  CurrencyDecimalDigits?: number
}[]> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number
  CountryCode?: string
  CultureInfo?: string
  TimeZone?: string
  CurrencyCode?: string
  CurrencySymbol?: string
  CurrencyLocale?: number
  CurrencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  Origin?: string
  Position?: number
  ConditionRule?: string
  CurrencyDecimalDigits?: number
}[]>({ method: 'GET', path: `/api/catalog_system/pvt/saleschannel/list` })
  }

  salesChannelbyId(params: {
  salesChannelId: string
}): Promise<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number
  CountryCode?: string
  CultureInfo?: string
  TimeZone?: string
  CurrencyCode?: string
  CurrencySymbol?: string
  CurrencyLocale?: number
  CurrencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  Origin?: string
  Position?: number
  ConditionRule?: string
  CurrencyDecimalDigits?: number
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number
  CountryCode?: string
  CultureInfo?: string
  TimeZone?: string
  CurrencyCode?: string
  CurrencySymbol?: string
  CurrencyLocale?: number
  CurrencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  Origin?: string
  Position?: number
  ConditionRule?: string
  CurrencyDecimalDigits?: number
}>({ method: 'GET', path: `/api/catalog_system/pub/saleschannel/${params.salesChannelId}` })
  }

  getApiCatalogPvtProductByProductIdSalespolicy(params: {
  productId: number
}): Promise<{
  ProductId?: number
  StoreId?: number
}[]> {
    return this.http.request<{
  ProductId?: number
  StoreId?: number
}[]>({ method: 'GET', path: `/api/catalog/pvt/product/${params.productId}/salespolicy` })
  }

  postApiCatalogPvtProductByProductIdSalespolicyByTradepolicyId(params: {
  productId: number
  tradepolicyId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/api/catalog/pvt/product/${params.productId}/salespolicy/${params.tradepolicyId}` })
  }

  deleteApiCatalogPvtProductByProductIdSalespolicyByTradepolicyId(params: {
  productId: number
  tradepolicyId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/product/${params.productId}/salespolicy/${params.tradepolicyId}` })
  }

  getApiCatalogSystemPvtSkuStockkeepingunitidsbysaleschannel(params: {
  sc: number
  page?: number
  pageSize?: number
  onlyAssigned?: boolean
}): Promise<number[]> {
    return this.http.request<number[]>({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitidsbysaleschannel`, query: { 'sc': params.sc, 'page': params.page, 'pageSize': params.pageSize, 'onlyAssigned': params.onlyAssigned } })
  }
}
class CatalogApi_seller {
  constructor(private http: VtexHttpClient) {}

  sellerList(params: {
  sc?: number
  sellerType?: number
  isBetterScope?: boolean
}): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}[]> {
    return this.http.request<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}[]>({ method: 'GET', path: `/api/catalog_system/pvt/seller/list`, query: { 'sc': params.sc, 'sellerType': params.sellerType, 'isBetterScope': params.isBetterScope } })
  }

  getSellerbyId(params: {
  sellerId: string
}): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}> {
    return this.http.request<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>({ method: 'GET', path: `/api/catalog_system/pvt/seller/${params.sellerId}` })
  }

  createSeller(params: {
  body: CreateSellerRequest
}): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}> {
    return this.http.request<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>({ method: 'POST', path: `/api/catalog_system/pvt/seller`, body: params.body })
  }

  updateSeller(params: {
  body: UpdateSellerRequest
}): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}> {
    return this.http.request<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>({ method: 'PUT', path: `/api/catalog_system/pvt/seller`, body: params.body })
  }

  getSellersbyId(params: {
  sellerId: string
}): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}> {
    return this.http.request<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>({ method: 'GET', path: `/api/catalog_system/pvt/sellers/${params.sellerId}` })
  }
}
class CatalogApi_supplier {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSupplier(params: {
  body: SupplierRequest
}): Promise<SupplierResponse> {
    return this.http.request<SupplierResponse>({ method: 'POST', path: `/api/catalog/pvt/supplier`, body: params.body })
  }

  putApiCatalogPvtSupplierBySupplierId(params: {
  supplierId: number
  body: SupplierRequest
}): Promise<SupplierResponse> {
    return this.http.request<SupplierResponse>({ method: 'PUT', path: `/api/catalog/pvt/supplier/${params.supplierId}`, body: params.body })
  }

  deleteApiCatalogPvtSupplierBySupplierId(params: {
  supplierId: number
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'DELETE', path: `/api/catalog/pvt/supplier/${params.supplierId}` })
  }
}
class CatalogApi_productIndexing {
  constructor(private http: VtexHttpClient) {}

  indexedInfo(params: {
  productId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/api/catalog_system/pvt/products/GetIndexedInfo/${params.productId}` })
  }
}
class CatalogApi_commercialConditions {
  constructor(private http: VtexHttpClient) {}

  getAllCommercialConditions(params: Record<string, never>): Promise<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}[]> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}[]>({ method: 'GET', path: `/api/catalog_system/pvt/commercialcondition/list` })
  }

  getCommercialConditions(params: {
  commercialConditionId: number
}): Promise<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}>({ method: 'GET', path: `/api/catalog_system/pvt/commercialcondition/${params.commercialConditionId}` })
  }
}
class CatalogApi_giftList {
  constructor(private http: VtexHttpClient) {}

  getGiftList(params: {
  listId: number
}): Promise<{
  giftListId?: number
  name?: string
  userId?: string
  fileId?: number
  giftListTypeId?: number
  giftListTypeName?: string
  giftCardId?: number
  message?: string
  urlFolder?: string
  dateCreated?: string
  profileSystemUserAddressName?: string
  profileSystemUserId?: string
  eventDate?: string
  eventLocation?: string
  eventCity?: string
  eventState?: string
  telemarketingId?: number
  telemarketingObservation?: string
  IsPublic?: boolean
  isActive?: boolean
  shipsToOwner?: boolean
  isAddressOk?: boolean
  version?: number
  giftCardRechargeSkuId?: number
  memberNames?: string
  giftListMembers?: {
  giftListMemberId?: number
  giftListId?: number
  userId?: string
  clientId?: string
  title?: string
  name?: string
  surname?: string
  isAdmin?: boolean
  isActive?: boolean
  text1?: string
  text2?: string
}[]
  giftListSkuIds?: string[]
  address?: string
  fileUrl?: string
}> {
    return this.http.request<{
  giftListId?: number
  name?: string
  userId?: string
  fileId?: number
  giftListTypeId?: number
  giftListTypeName?: string
  giftCardId?: number
  message?: string
  urlFolder?: string
  dateCreated?: string
  profileSystemUserAddressName?: string
  profileSystemUserId?: string
  eventDate?: string
  eventLocation?: string
  eventCity?: string
  eventState?: string
  telemarketingId?: number
  telemarketingObservation?: string
  IsPublic?: boolean
  isActive?: boolean
  shipsToOwner?: boolean
  isAddressOk?: boolean
  version?: number
  giftCardRechargeSkuId?: number
  memberNames?: string
  giftListMembers?: {
  giftListMemberId?: number
  giftListId?: number
  userId?: string
  clientId?: string
  title?: string
  name?: string
  surname?: string
  isAdmin?: boolean
  isActive?: boolean
  text1?: string
  text2?: string
}[]
  giftListSkuIds?: string[]
  address?: string
  fileUrl?: string
}>({ method: 'GET', path: `/api/addon/pvt/giftlist/get/${params.listId}` })
  }
}
class CatalogApi_multiLanguage {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtProductByProductIdLanguage(params: {
  productId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Title?: string
  MetaTagDescription?: string
  DescriptionShort?: string
  Keywords?: string
  LinkId?: string
  Category?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}
  Categories?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[]
  SimilarCategories?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[]
  Brand?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  LinkId?: string
}
  Skus?: {
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: {
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
  Services?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  SkuServiceType?: {
  Id?: number
  Locale?: string
  Name?: string
  Values?: {
  Id?: number
  Locale?: string
  Name?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
}
}[]
  SpecificationGroups?: {
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Value?: {
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]
}[]
}[]
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string
}[]
}[]
  SpecificationGroups?: {
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Values?: {
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]
}[]
}[]
  Collections?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  LinkId?: string
}[]
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Title?: string
  MetaTagDescription?: string
  DescriptionShort?: string
  Keywords?: string
  LinkId?: string
  Category?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}
  Categories?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[]
  SimilarCategories?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[]
  Brand?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  LinkId?: string
}
  Skus?: {
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: {
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
  Services?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  SkuServiceType?: {
  Id?: number
  Locale?: string
  Name?: string
  Values?: {
  Id?: number
  Locale?: string
  Name?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
}
}[]
  SpecificationGroups?: {
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Value?: {
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]
}[]
}[]
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string
}[]
}[]
  SpecificationGroups?: {
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Values?: {
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]
}[]
}[]
  Collections?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  LinkId?: string
}[]
}[]>({ method: 'GET', path: `/api/catalog/pvt/product/${params.productId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtProductByProductIdLanguage(params: {
  productId: number
  body: {
  Locale: string
  Name: string
  Title: string
  Description?: string
  MetaTagDescription?: string
  DescriptionShort?: string
  Keywords?: string
  LinkId?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/product/${params.productId}/language`, body: params.body })
  }

  getApiCatalogPvtProductsByProductIdSpecificationBySpecificationIdLanguage(params: {
  productId: number
  specificationId: number
  locale?: string
}): Promise<{
  Id?: number
  ProductId?: number
  SpecificationId?: number
  Locale?: string
  Name?: string
  Value?: string
  Values?: string[]
}[]> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  SpecificationId?: number
  Locale?: string
  Name?: string
  Value?: string
  Values?: string[]
}[]>({ method: 'GET', path: `/api/catalog/pvt/products/${params.productId}/specification/${params.specificationId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtProductsByProductIdSpecificationBySpecificationIdLanguage(params: {
  productId: number
  specificationId: number
  body: {
  ProductId: number
  SpecificationId: number
  Locale: string
  Name: string
  Value: string
  Values?: string[]
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/products/${params.productId}/specification/${params.specificationId}/language`, body: params.body })
  }
}
class CatalogApi_multiLanguageSKU {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdLanguage(params: {
  skuId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: {
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
  Services?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  SkuServiceType?: {
  Id?: number
  Locale?: string
  Name?: string
  Values?: {
  Id?: number
  Locale?: string
  Name?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
}
}[]
  SpecificationGroups?: {
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Value?: {
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]
}[]
}[]
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string
}[]
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: {
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
  Services?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  SkuServiceType?: {
  Id?: number
  Locale?: string
  Name?: string
  Values?: {
  Id?: number
  Locale?: string
  Name?: string
}[]
  Attachments?: {
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
}[]
}
}[]
  SpecificationGroups?: {
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Value?: {
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]
}[]
}[]
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string
}[]
}[]>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdLanguage(params: {
  skuId: number
  body: {
  Locale: string
  Name: string
  MeasurementUnit: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/language`, body: params.body })
  }

  getApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeIdLanguage(params: {
  skuId: number
  skuAttributeId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute/${params.skuAttributeId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeIdLanguage(params: {
  skuId: number
  skuAttributeId: number
  body: {
  Id: number
  Locale: string
  AttributeName: string
  AttributeValue: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute/${params.skuAttributeId}/language`, body: params.body })
  }

  getApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileIdLanguage(params: {
  skuId: number
  skuFileId: number
  locale?: string
}): Promise<{
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Text?: string
}[]> {
    return this.http.request<{
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Text?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileIdLanguage(params: {
  skuId: number
  skuFileId: number
  body: {
  Locale: string
  Label: string
  Name: string
  Text: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}/language`, body: params.body })
  }
}
class CatalogApi_multiLanguageSpecification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationgroupBySpecificationGroupIdLanguage(params: {
  specificationGroupId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: string[]
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: string[]
}[]>({ method: 'GET', path: `/api/catalog/pvt/specificationgroup/${params.specificationGroupId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtSpecificationgroupBySpecificationGroupIdLanguage(params: {
  specificationGroupId: number
  body: {
  Locale: string
  Name: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/specificationgroup/${params.specificationGroupId}/language`, body: params.body })
  }

  getApiCatalogPvtSpecificationBySpecificationIdLanguage(params: {
  specificationId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Values?: string[]
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  Values?: string[]
}[]>({ method: 'GET', path: `/api/catalog/pvt/specification/${params.specificationId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtSpecificationBySpecificationIdLanguage(params: {
  specificationId: number
  body: {
  Locale: string
  Name: string
  Description?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/specification/${params.specificationId}/language`, body: params.body })
  }

  getApiCatalogPvtSpecificationvalueByValueIdLanguage(params: {
  valueId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean
}[]>({ method: 'GET', path: `/api/catalog/pvt/specificationvalue/${params.valueId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtSpecificationvalueByValueIdLanguage(params: {
  valueId: number
  body: {
  Locale: string
  Name: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/specificationvalue/${params.valueId}/language`, body: params.body })
  }
}
class CatalogApi_multiLanguageCategory {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtCategoryByCategoryIdLanguage(params: {
  categoryId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/category/${params.categoryId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtCategoryByCategoryIdLanguage(params: {
  categoryId: number
  body: {
  Locale: string
  Name: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/category/${params.categoryId}/language`, body: params.body })
  }
}
class CatalogApi_multiLanguageBrand {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtBrandByBrandIdLanguage(params: {
  brandId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  LinkId?: string
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  LinkId?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/brand/${params.brandId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtBrandByBrandIdLanguage(params: {
  brandId: number
  body: {
  Locale: string
  Name: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  LinkId?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/brand/${params.brandId}/language`, body: params.body })
  }
}
class CatalogApi_multiLanguageAttachmentAndService {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtAttachmentByAttachmentIdLanguage(params: {
  attachmentId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Domains?: string[]
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Domains?: string[]
}[]>({ method: 'GET', path: `/api/catalog/pvt/attachment/${params.attachmentId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtAttachmentByAttachmentIdLanguage(params: {
  attachmentId: number
  body: {
  Locale: string
  Name: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/attachment/${params.attachmentId}/language`, body: params.body })
  }

  getApiCatalogPvtSkuservicetypeBySkuServiceTypeIdLanguage(params: {
  skuServiceTypeId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Values?: string[]
  Attachments?: string[]
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Values?: string[]
  Attachments?: string[]
}[]>({ method: 'GET', path: `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtSkuservicetypeBySkuServiceTypeIdLanguage(params: {
  skuServiceTypeId: number
  body: {
  Locale: string
  Name: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}/language`, body: params.body })
  }

  getApiCatalogPvtSkuserviceBySkuserviceIdLanguage(params: {
  skuserviceId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/skuservice/${params.skuserviceId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtSkuserviceBySkuserviceIdLanguage(params: {
  skuserviceId: number
  body: {
  Locale: string
  Name: string
  Text?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/skuservice/${params.skuserviceId}/language`, body: params.body })
  }

  getApiCatalogPvtSkuservicevalueBySkuServiceValueIdLanguage(params: {
  skuServiceValueId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtSkuservicevalueBySkuServiceValueIdLanguage(params: {
  skuServiceValueId: number
  body: {
  Locale: string
  Name: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}/language`, body: params.body })
  }
}
class CatalogApi_multiLanguageCollection {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtCollectionByCollectionIdLanguage(params: {
  collectionId: number
  locale?: string
}): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  LinkId?: string
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  LinkId?: string
}[]>({ method: 'GET', path: `/api/catalog/pvt/collection/${params.collectionId}/language`, query: { 'locale': params.locale } })
  }

  putApiCatalogPvtCollectionByCollectionIdLanguage(params: {
  collectionId: number
  body: {
  Locale: string
  Name: string
  Description?: string
  LinkId?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'PUT', path: `/api/catalog/pvt/collection/${params.collectionId}/language`, body: params.body })
  }
}
class CatalogApi_assortment {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtAssortment(params: {
  name?: string
  after?: number
  size?: number
  collectionId?: number
}): Promise<{
  TotalRows?: number
  Data?: {
  Id?: number
  Name?: string
  CreatedAt?: string
  UpdatedAt?: string
  IncludedCollections?: number[]
  ExcludedCollections?: number[]
}[]
  Size?: number
}> {
    return this.http.request<{
  TotalRows?: number
  Data?: {
  Id?: number
  Name?: string
  CreatedAt?: string
  UpdatedAt?: string
  IncludedCollections?: number[]
  ExcludedCollections?: number[]
}[]
  Size?: number
}>({ method: 'GET', path: `/api/catalog/pvt/assortment`, query: { 'name': params.name, 'after': params.after, 'size': params.size, 'collectionId': params.collectionId } })
  }

  postApiCatalogPvtAssortment(params: {
  body: {
  name: string
}
}): Promise<ProductAssortment> {
    return this.http.request<ProductAssortment>({ method: 'POST', path: `/api/catalog/pvt/assortment`, body: params.body })
  }

  getApiCatalogPvtAssortmentByProductAssortmentID(params: {
  productAssortmentID: number
}): Promise<ProductAssortment> {
    return this.http.request<ProductAssortment>({ method: 'GET', path: `/api/catalog/pvt/assortment/${params.productAssortmentID}` })
  }

  putApiCatalogPvtAssortmentByProductAssortmentID(params: {
  productAssortmentID: number
  body: {
  name: string
}
}): Promise<ProductAssortment> {
    return this.http.request<ProductAssortment>({ method: 'PUT', path: `/api/catalog/pvt/assortment/${params.productAssortmentID}`, body: params.body })
  }

  deleteApiCatalogPvtAssortmentByProductAssortmentID(params: {
  productAssortmentID: number
}): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>({ method: 'DELETE', path: `/api/catalog/pvt/assortment/${params.productAssortmentID}` })
  }

  postApiCatalogPvtAssortmentByProductAssortmentIDIncludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}): Promise<AssortmentCollectionAssociation> {
    return this.http.request<AssortmentCollectionAssociation>({ method: 'POST', path: `/api/catalog/pvt/assortment/${params.productAssortmentID}/included-collections/${params.collectionID}` })
  }

  deleteApiCatalogPvtAssortmentByProductAssortmentIDIncludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>({ method: 'DELETE', path: `/api/catalog/pvt/assortment/${params.productAssortmentID}/included-collections/${params.collectionID}` })
  }

  postApiCatalogPvtAssortmentByProductAssortmentIDExcludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}): Promise<AssortmentCollectionAssociation> {
    return this.http.request<AssortmentCollectionAssociation>({ method: 'POST', path: `/api/catalog/pvt/assortment/${params.productAssortmentID}/excluded-collections/${params.collectionID}` })
  }

  deleteApiCatalogPvtAssortmentByProductAssortmentIDExcludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>({ method: 'DELETE', path: `/api/catalog/pvt/assortment/${params.productAssortmentID}/excluded-collections/${params.collectionID}` })
  }
}

export class CatalogApi {
  readonly product: CatalogApi_product
  readonly productSpecification: CatalogApi_productSpecification
  readonly sku: CatalogApi_sku
  readonly skuComplement: CatalogApi_skuComplement
  readonly skuEAN: CatalogApi_skuEAN
  readonly skuAttachment: CatalogApi_skuAttachment
  readonly skuFile: CatalogApi_skuFile
  readonly skuKit: CatalogApi_skuKit
  readonly skuSeller: CatalogApi_skuSeller
  readonly skuAttribute: CatalogApi_skuAttribute
  readonly skuService: CatalogApi_skuService
  readonly skuServiceAttachment: CatalogApi_skuServiceAttachment
  readonly skuServiceType: CatalogApi_skuServiceType
  readonly skuServiceValue: CatalogApi_skuServiceValue
  readonly skuSpecification: CatalogApi_skuSpecification
  readonly subcollection: CatalogApi_subcollection
  readonly category: CatalogApi_category
  readonly similarCategory: CatalogApi_similarCategory
  readonly categorySpecification: CatalogApi_categorySpecification
  readonly brand: CatalogApi_brand
  readonly attachment: CatalogApi_attachment
  readonly collection: CatalogApi_collection
  readonly specification: CatalogApi_specification
  readonly specificationField: CatalogApi_specificationField
  readonly specificationFieldValue: CatalogApi_specificationFieldValue
  readonly specificationValue: CatalogApi_specificationValue
  readonly specificationGroup: CatalogApi_specificationGroup
  readonly nonStructuredSpecification: CatalogApi_nonStructuredSpecification
  readonly salesChannel: CatalogApi_salesChannel
  readonly seller: CatalogApi_seller
  readonly supplier: CatalogApi_supplier
  readonly productIndexing: CatalogApi_productIndexing
  readonly commercialConditions: CatalogApi_commercialConditions
  readonly giftList: CatalogApi_giftList
  readonly multiLanguage: CatalogApi_multiLanguage
  readonly multiLanguageSKU: CatalogApi_multiLanguageSKU
  readonly multiLanguageSpecification: CatalogApi_multiLanguageSpecification
  readonly multiLanguageCategory: CatalogApi_multiLanguageCategory
  readonly multiLanguageBrand: CatalogApi_multiLanguageBrand
  readonly multiLanguageAttachmentAndService: CatalogApi_multiLanguageAttachmentAndService
  readonly multiLanguageCollection: CatalogApi_multiLanguageCollection
  readonly assortment: CatalogApi_assortment
  constructor(http: VtexHttpClient) {
    this.product = new CatalogApi_product(http)
    this.productSpecification = new CatalogApi_productSpecification(http)
    this.sku = new CatalogApi_sku(http)
    this.skuComplement = new CatalogApi_skuComplement(http)
    this.skuEAN = new CatalogApi_skuEAN(http)
    this.skuAttachment = new CatalogApi_skuAttachment(http)
    this.skuFile = new CatalogApi_skuFile(http)
    this.skuKit = new CatalogApi_skuKit(http)
    this.skuSeller = new CatalogApi_skuSeller(http)
    this.skuAttribute = new CatalogApi_skuAttribute(http)
    this.skuService = new CatalogApi_skuService(http)
    this.skuServiceAttachment = new CatalogApi_skuServiceAttachment(http)
    this.skuServiceType = new CatalogApi_skuServiceType(http)
    this.skuServiceValue = new CatalogApi_skuServiceValue(http)
    this.skuSpecification = new CatalogApi_skuSpecification(http)
    this.subcollection = new CatalogApi_subcollection(http)
    this.category = new CatalogApi_category(http)
    this.similarCategory = new CatalogApi_similarCategory(http)
    this.categorySpecification = new CatalogApi_categorySpecification(http)
    this.brand = new CatalogApi_brand(http)
    this.attachment = new CatalogApi_attachment(http)
    this.collection = new CatalogApi_collection(http)
    this.specification = new CatalogApi_specification(http)
    this.specificationField = new CatalogApi_specificationField(http)
    this.specificationFieldValue = new CatalogApi_specificationFieldValue(http)
    this.specificationValue = new CatalogApi_specificationValue(http)
    this.specificationGroup = new CatalogApi_specificationGroup(http)
    this.nonStructuredSpecification = new CatalogApi_nonStructuredSpecification(http)
    this.salesChannel = new CatalogApi_salesChannel(http)
    this.seller = new CatalogApi_seller(http)
    this.supplier = new CatalogApi_supplier(http)
    this.productIndexing = new CatalogApi_productIndexing(http)
    this.commercialConditions = new CatalogApi_commercialConditions(http)
    this.giftList = new CatalogApi_giftList(http)
    this.multiLanguage = new CatalogApi_multiLanguage(http)
    this.multiLanguageSKU = new CatalogApi_multiLanguageSKU(http)
    this.multiLanguageSpecification = new CatalogApi_multiLanguageSpecification(http)
    this.multiLanguageCategory = new CatalogApi_multiLanguageCategory(http)
    this.multiLanguageBrand = new CatalogApi_multiLanguageBrand(http)
    this.multiLanguageAttachmentAndService = new CatalogApi_multiLanguageAttachmentAndService(http)
    this.multiLanguageCollection = new CatalogApi_multiLanguageCollection(http)
    this.assortment = new CatalogApi_assortment(http)
  }
}
