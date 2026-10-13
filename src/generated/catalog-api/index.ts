import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { SpecificationValuesSubcollectionIdResponse, SkuFileResponse, SKUFileURL, SKUFile, GetCategoryTree, GetCategoryTreeChild, Category, CreateCategoryRequest, GetorUpdateProductSpecification, GetSKUandContext, Dimension, RealDimension, Attachment, SkuSeller, Image, SkuSpecification, ProductSpecification, AlternateIds, GetSKUAltID, SkulistbyProductId, CreateSellerRequest, UpdateSellerRequest, CategorySpecification, SpecificationsGroup, SkuComplement, SkuKit, SKUSpecificationResponse, SKUService, SKUServiceTypeRequest, SKUServiceTypeResponse, SKUServiceValueRequest, SKUServiceValueResponse, BrandCreateUpdateRequest, BrandCreateUpdate, BrandGet, AttachmentResponse, AttachmentRequest, SupplierRequest, SupplierResponse, ProductAssortment, AssortmentCollectionAssociation, ErrorResponse } from './types.js'

class CatalogApi_product {
  constructor(private http: VtexHttpClient) {}

  productAndSkuIds(params: {
  categoryId?: number
  _from?: number
  _to?: number
} = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/products/GetProductAndSkuIds`, query: { 'categoryId': params.categoryId, '_from': params._from, '_to': params._to } }, opts))
  }

  getProductbyid(params: {
  productId: string
}, opts?: CallOptions): Promise<{
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
  SupplierId?: number | null
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
  SupplierId?: number | null
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}` }, opts))
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
  SupplierId?: number | null
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string | null
  LomadeeCampaignCode?: string | null
  Score?: number
}
}, opts?: CallOptions): Promise<{
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
  SupplierId?: number | null
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
  SupplierId?: number | null
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}`, body: params.body }, opts))
  }

  productandTradePolicy(params: {
  productId: number
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/products/productget/${encodePathParam(params.productId)}` }, opts))
  }

  productbyRefId(params: {
  refId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/products/productgetbyrefid/${encodePathParam(params.refId)}` }, opts))
  }

  productVariations(params: {
  productId: number
}, opts?: CallOptions): Promise<{
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
  cacheVersionUsedToCallCheckout?: string | null
  listPriceFormated?: string
  listPrice?: number
  taxFormated?: string
  taxAsInt?: number
  bestPriceFormated?: string
  bestPrice?: number
  spotPrice?: number
  installments?: number
  installmentsValue?: number
  installmentsInsterestRate?: number | null
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
  cacheVersionUsedToCallCheckout?: string | null
  listPriceFormated?: string
  listPrice?: number
  taxFormated?: string
  taxAsInt?: number
  bestPriceFormated?: string
  bestPrice?: number
  spotPrice?: number
  installments?: number
  installmentsValue?: number
  installmentsInsterestRate?: number | null
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
}>(withCall({ method: 'GET', path: `/api/catalog_system/pub/products/variations/${encodePathParam(params.productId)}` }, opts))
  }

  getApiAddonPvtReviewGetProductRateByProductId(params: {
  productId: number
}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'GET', path: `/api/addon/pvt/review/GetProductRate/${encodePathParam(params.productId)}` }, opts))
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
  LomadeeCampaignCode?: string | null
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
  SupplierId?: number | null
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string | null
  LomadeeCampaignCode?: string | null
  Score?: number
}
}, opts?: CallOptions): Promise<{
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
  SupplierId?: number | null
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string | null
  LomadeeCampaignCode?: string | null
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
  SupplierId?: number | null
  ShowWithoutStock?: boolean
  AdWordsRemarketingCode?: string | null
  LomadeeCampaignCode?: string | null
  Score?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/product`, body: params.body }, opts))
  }
}
class CatalogApi_productSpecification {
  constructor(private http: VtexHttpClient) {}

  getProductSpecification(params: {
  productId: number
}, opts?: CallOptions): Promise<{
  Value: string[]
  Id?: number
  Name?: string
}[]> {
    return this.http.request<{
  Value: string[]
  Id?: number
  Name?: string
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/products/${encodePathParam(params.productId)}/specification` }, opts))
  }

  updateProductSpecification(params: {
  productId: number
  body: GetorUpdateProductSpecification[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/products/${encodePathParam(params.productId)}/specification`, body: params.body }, opts))
  }

  getProductSpecificationbyProductID(params: {
  productId: number
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/specification` }, opts))
  }

  postApiCatalogPvtProductByProductIdSpecification(params: {
  productId: number
  body: {
  FieldId: number
  FieldValueId?: number
  Text?: string
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/specification`, body: params.body }, opts))
  }

  deleteAllProductSpecifications(params: {
  productId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/specification` }, opts))
  }

  deleteaProductSpecification(params: {
  productId: number
  specificationId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/specification/${encodePathParam(params.specificationId)}` }, opts))
  }

  putApiCatalogPvtProductByProductIdSpecificationvalue(params: {
  productId: number
  body: {
  FieldName: string
  GroupName: string
  RootLevelSpecification: boolean
  FieldValues: string[]
}
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'PUT', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/specificationvalue`, body: params.body }, opts))
  }
}
class CatalogApi_sku {
  constructor(private http: VtexHttpClient) {}

  listallSKUIDs(params: {
  page: number
  pagesize: number
}, opts?: CallOptions): Promise<number[]> {
    return this.http.request<number[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitids`, query: { 'page': params.page, 'pagesize': params.pagesize } }, opts))
  }

  skuContext(params: {
  skuId: number
  sc?: number
}, opts?: CallOptions): Promise<GetSKUandContext> {
    return this.http.request<GetSKUandContext>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${encodePathParam(params.skuId)}`, query: { 'sc': params.sc } }, opts))
  }

  getApiCatalogPvtStockkeepingunit(params: {
  RefId: string
}, opts?: CallOptions): Promise<{
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
  KitItensSellApart?: boolean
  Videos?: string[]
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit`, query: { 'RefId': params.RefId } }, opts))
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: "un" | "kg" | "g" | "mg" | "m" | "m²" | "m³" | "cm" | "cm²" | "cm³" | "mm" | "mm²" | "mm³" | "oz" | "lb" | "ft" | "ft²" | "ft³" | "in" | "in²" | "in³"
  UnitMultiplier?: number
  ModalType?: string | null
  KitItensSellApart?: boolean
  Videos?: string[]
}
}, opts?: CallOptions): Promise<{
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
  KitItensSellApart?: boolean
  Videos?: string[]
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit`, body: params.body }, opts))
  }

  skuIdbyRefId(params: {
  refId: string
}, opts?: CallOptions): Promise<string> {
    return this.http.request<string>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${encodePathParam(params.refId)}` }, opts))
  }

  skubyAlternateId(params: {
  alternateId: number
}, opts?: CallOptions): Promise<GetSKUAltID> {
    return this.http.request<GetSKUAltID>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitbyalternateId/${encodePathParam(params.alternateId)}` }, opts))
  }

  skulistbyProductId(params: {
  productId: number
}, opts?: CallOptions): Promise<SkulistbyProductId[]> {
    return this.http.request<SkulistbyProductId[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitByProductId/${encodePathParam(params.productId)}` }, opts))
  }

  skuIdlistbyRefIdlist(params: {
  body: string[]
}, opts?: CallOptions): Promise<{
  [key: string]: string
}> {
    return this.http.request<{
  [key: string]: string
}>(withCall({ method: 'POST', path: `/api/catalog_system/pub/sku/stockkeepingunitidsbyrefids`, body: params.body }, opts))
  }

  sku(params: {
  skuId: number
}, opts?: CallOptions): Promise<{
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
  KitItensSellApart?: boolean
  Videos?: string[]
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}` }, opts))
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: "un" | "kg" | "g" | "mg" | "m" | "m²" | "m³" | "cm" | "cm²" | "cm³" | "mm" | "mm²" | "mm³" | "oz" | "lb" | "ft" | "ft²" | "ft³" | "in" | "in²" | "in³"
  UnitMultiplier?: number
  ModalType?: string | null
  KitItensSellApart?: boolean
  Videos?: string[]
}
}, opts?: CallOptions): Promise<{
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
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
  EstimatedDateArrival?: string | null
  ManufacturerCode?: string
  CommercialConditionId?: number
  MeasurementUnit?: string
  UnitMultiplier?: number
  ModalType?: string | null
  KitItensSellApart?: boolean
  Videos?: string[]
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}`, body: params.body }, opts))
  }
}
class CatalogApi_skuComplement {
  constructor(private http: VtexHttpClient) {}

  getSKUComplementbySKUID(params: {
  skuId: number
}, opts?: CallOptions): Promise<SkuComplement> {
    return this.http.request<SkuComplement>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/complement` }, opts))
  }

  getSKUComplementsbyComplementTypeID(params: {
  skuId: number
  complementTypeId: number
}, opts?: CallOptions): Promise<SkuComplement> {
    return this.http.request<SkuComplement>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/complement/${encodePathParam(params.complementTypeId)}` }, opts))
  }

  getSKUcomplementsbytype(params: {
  parentSkuId: number
  type: number
}, opts?: CallOptions): Promise<{
  ParentSkuId: number
  ComplementSkuIds: number[]
  Type: "1" | "2" | "3" | "4" | "5"
}> {
    return this.http.request<{
  ParentSkuId: number
  ComplementSkuIds: number[]
  Type: "1" | "2" | "3" | "4" | "5"
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/complements/${encodePathParam(params.parentSkuId)}/${encodePathParam(params.type)}` }, opts))
  }

  createSKUComplement(params: {
  body: {
  ParentSkuId: number
  SkuId: number
  ComplementTypeId: 1 | 2 | 3 | 5
}
}, opts?: CallOptions): Promise<SkuComplement> {
    return this.http.request<SkuComplement>(withCall({ method: 'POST', path: `/api/catalog/pvt/skucomplement`, body: params.body }, opts))
  }

  getSKUComplementbySKUComplementID(params: {
  skuComplementId: number
}, opts?: CallOptions): Promise<SkuComplement> {
    return this.http.request<SkuComplement>(withCall({ method: 'GET', path: `/api/catalog/pvt/skucomplement/${encodePathParam(params.skuComplementId)}` }, opts))
  }

  deleteSKUComplementbySKUComplementID(params: {
  skuComplementId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skucomplement/${encodePathParam(params.skuComplementId)}` }, opts))
  }
}
class CatalogApi_skuEAN {
  constructor(private http: VtexHttpClient) {}

  skubyEAN(params: {
  ean: string
}, opts?: CallOptions): Promise<GetSKUAltID> {
    return this.http.request<GetSKUAltID>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitbyean/${encodePathParam(params.ean)}` }, opts))
  }

  getApiCatalogPvtStockkeepingunitBySkuIdEan(params: {
  skuId: number
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/ean` }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdEan(params: {
  skuId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/ean` }, opts))
  }

  postApiCatalogPvtStockkeepingunitBySkuIdEanByEan(params: {
  skuId: number
  ean: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/ean/${encodePathParam(params.ean)}` }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdEanByEan(params: {
  skuId: number
  ean: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/ean/${encodePathParam(params.ean)}` }, opts))
  }
}
class CatalogApi_skuAttachment {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuattachment(params: {
  body: {
  AttachmentId: number
  SkuId: number
}
}, opts?: CallOptions): Promise<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}> {
    return this.http.request<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/skuattachment`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSkuattachment(params: {
  skuId?: number
  attachmentId?: number
} = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skuattachment`, query: { 'skuId': params.skuId, 'attachmentId': params.attachmentId } }, opts))
  }

  getApiCatalogPvtStockkeepingunitBySkuIdAttachment(params: {
  skuId: number
}, opts?: CallOptions): Promise<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}[]> {
    return this.http.request<{
  Id?: number
  AttachmentId?: number
  SkuId?: number
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attachment` }, opts))
  }

  deleteApiCatalogPvtSkuattachmentBySkuAttachmentAssociationId(params: {
  skuAttachmentAssociationId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skuattachment/${encodePathParam(params.skuAttachmentAssociationId)}` }, opts))
  }

  associateattachmentstoSKU(params: {
  body: {
  SkuId: number
  AttachmentNames: string[]
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/sku/associateattachments`, body: params.body }, opts))
  }
}
class CatalogApi_skuFile {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdFile(params: {
  skuId: number
}, opts?: CallOptions): Promise<SkuFileResponse> {
    return this.http.request<SkuFileResponse>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file` }, opts))
  }

  postApiCatalogPvtStockkeepingunitBySkuIdFile(params: {
  skuId: number
  body: SKUFileURL
}, opts?: CallOptions): Promise<SkuFileResponse> {
    return this.http.request<SkuFileResponse>(withCall({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file`, body: params.body }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdFile(params: {
  skuId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file` }, opts))
  }

  putApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileId(params: {
  skuId: number
  skuFileId: number
  body: SKUFileURL
}, opts?: CallOptions): Promise<SkuFileResponse> {
    return this.http.request<SkuFileResponse>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file/${encodePathParam(params.skuFileId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileId(params: {
  skuId: number
  skuFileId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file/${encodePathParam(params.skuFileId)}` }, opts))
  }

  putApiCatalogPvtStockkeepingunitBySkuIdFileReorder(params: {
  skuId: number
  body: {
  Id: number
  Position: number
}[]
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file/reorder`, body: params.body }, opts))
  }

  putApiCatalogPvtStockkeepingunitCopyBySkuIdfromBySkuIdtoFile(params: {
  skuIdfrom: number
  skuIdto: number
}, opts?: CallOptions): Promise<{
  Id?: number
  ArchiveId?: number
  SkuId?: number
  IsMain?: boolean
  Label?: string | null
}[]> {
    return this.http.request<{
  Id?: number
  ArchiveId?: number
  SkuId?: number
  IsMain?: boolean
  Label?: string | null
}[]>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/copy/${encodePathParam(params.skuIdfrom)}/${encodePathParam(params.skuIdto)}/file` }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitDisassociateBySkuIdFileBySkuFileId(params: {
  skuId: number
  skuFileId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/disassociate/${encodePathParam(params.skuId)}/file/${encodePathParam(params.skuFileId)}` }, opts))
  }
}
class CatalogApi_skuKit {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitkit(params: {
  skuId?: number
  parentSkuId?: number
} = {}, opts?: CallOptions): Promise<SkuKit> {
    return this.http.request<SkuKit>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunitkit`, query: { 'skuId': params.skuId, 'parentSkuId': params.parentSkuId } }, opts))
  }

  postApiCatalogPvtStockkeepingunitkit(params: {
  body: {
  StockKeepingUnitParent: number
  StockKeepingUnitId: number
  Quantity: number
  UnitPrice: number
}
}, opts?: CallOptions): Promise<SkuKit> {
    return this.http.request<SkuKit>(withCall({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunitkit`, body: params.body }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitkit(params: {
  skuId?: number
  parentSkuId?: number
} = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunitkit`, query: { 'skuId': params.skuId, 'parentSkuId': params.parentSkuId } }, opts))
  }

  getApiCatalogPvtStockkeepingunitkitByKitId(params: {
  kitId: number
}, opts?: CallOptions): Promise<SkuKit> {
    return this.http.request<SkuKit>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunitkit/${encodePathParam(params.kitId)}` }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitkitByKitId(params: {
  kitId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunitkit/${encodePathParam(params.kitId)}` }, opts))
  }
}
class CatalogApi_skuSeller {
  constructor(private http: VtexHttpClient) {}

  getSKUseller(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<{
  IsPersisted: boolean
  IsRemoved: boolean
  SkuSellerId: number
  SellerId: string
  StockKeepingUnitId: number
  SellerStockKeepingUnitId: string
  IsActive: boolean
  UpdateDate: string
  RequestedUpdateDate: string | null
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
  RequestedUpdateDate: string | null
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/skuseller/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}` }, opts))
  }

  deleteSKUsellerassociation(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/skuseller/remove/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}` }, opts))
  }

  postApiCatalogSystemPvtSkusellerChangenotificationBySellerIdBySellerSkuId(params: {
  sellerId: string
  sellerSkuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/skuseller/changenotification/${encodePathParam(params.sellerId)}/${encodePathParam(params.sellerSkuId)}` }, opts))
  }

  changeNotification(params: {
  skuId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/skuseller/changenotification/${encodePathParam(params.skuId)}` }, opts))
  }
}
class CatalogApi_skuAttribute {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdAttribute(params: {
  skuId: number
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute` }, opts))
  }

  postApiCatalogPvtStockkeepingunitBySkuIdAttribute(params: {
  skuId: number
  body: {
  SpecificationName: string
  SpecificationValue: string
  IsVisible?: boolean
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute`, body: params.body }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdAttribute(params: {
  skuId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute` }, opts))
  }

  getApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeId(params: {
  skuId: number
  skuAttributeId: number
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute/${encodePathParam(params.skuAttributeId)}` }, opts))
  }

  putApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeId(params: {
  skuId: number
  skuAttributeId: number
  body: {
  SpecificationName: string
  SpecificationValue: string
  IsVisible?: boolean
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute/${encodePathParam(params.skuAttributeId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeId(params: {
  skuId: number
  skuAttributeId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute/${encodePathParam(params.skuAttributeId)}` }, opts))
  }
}
class CatalogApi_skuService {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSkuserviceBySkuServiceId(params: {
  skuServiceId: number
}, opts?: CallOptions): Promise<SKUService> {
    return this.http.request<SKUService>(withCall({ method: 'GET', path: `/api/catalog/pvt/skuservice/${encodePathParam(params.skuServiceId)}` }, opts))
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
}, opts?: CallOptions): Promise<SKUService> {
    return this.http.request<SKUService>(withCall({ method: 'PUT', path: `/api/catalog/pvt/skuservice/${encodePathParam(params.skuServiceId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSkuserviceBySkuServiceId(params: {
  skuServiceId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skuservice/${encodePathParam(params.skuServiceId)}` }, opts))
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
}, opts?: CallOptions): Promise<SKUService> {
    return this.http.request<SKUService>(withCall({ method: 'POST', path: `/api/catalog/pvt/skuservice`, body: params.body }, opts))
  }
}
class CatalogApi_skuServiceAttachment {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuservicetypeattachment(params: {
  body: {
  AttachmentId: number
  SkuServiceTypeId: number
}
}, opts?: CallOptions): Promise<{
  Id?: number
  AttachmentId?: number
  SkuServiceTypeId?: number
}> {
    return this.http.request<{
  Id?: number
  AttachmentId?: number
  SkuServiceTypeId?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/skuservicetypeattachment`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSkuservicetypeattachment(params: {
  attachmentId?: number
  skuServiceTypeId?: number
} = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skuservicetypeattachment`, query: { 'attachmentId': params.attachmentId, 'skuServiceTypeId': params.skuServiceTypeId } }, opts))
  }

  deleteApiCatalogPvtSkuservicetypeattachmentBySkuServiceTypeAttachmentId(params: {
  skuServiceTypeAttachmentId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skuservicetypeattachment/${encodePathParam(params.skuServiceTypeAttachmentId)}` }, opts))
  }
}
class CatalogApi_skuServiceType {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuservicetype(params: {
  body: SKUServiceTypeRequest
}, opts?: CallOptions): Promise<SKUServiceTypeResponse> {
    return this.http.request<SKUServiceTypeResponse>(withCall({ method: 'POST', path: `/api/catalog/pvt/skuservicetype`, body: params.body }, opts))
  }

  getApiCatalogPvtSkuservicetypeBySkuServiceTypeId(params: {
  skuServiceTypeId: number
}, opts?: CallOptions): Promise<SKUServiceTypeResponse> {
    return this.http.request<SKUServiceTypeResponse>(withCall({ method: 'GET', path: `/api/catalog/pvt/skuservicetype/${encodePathParam(params.skuServiceTypeId)}` }, opts))
  }

  putApiCatalogPvtSkuservicetypeBySkuServiceTypeId(params: {
  skuServiceTypeId: number
  body: SKUServiceTypeRequest
}, opts?: CallOptions): Promise<SKUServiceTypeResponse> {
    return this.http.request<SKUServiceTypeResponse>(withCall({ method: 'PUT', path: `/api/catalog/pvt/skuservicetype/${encodePathParam(params.skuServiceTypeId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSkuservicetypeBySkuServiceTypeId(params: {
  skuServiceTypeId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skuservicetype/${encodePathParam(params.skuServiceTypeId)}` }, opts))
  }
}
class CatalogApi_skuServiceValue {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSkuservicevalue(params: {
  body: SKUServiceValueRequest
}, opts?: CallOptions): Promise<SKUServiceValueResponse> {
    return this.http.request<SKUServiceValueResponse>(withCall({ method: 'POST', path: `/api/catalog/pvt/skuservicevalue`, body: params.body }, opts))
  }

  getApiCatalogPvtSkuservicevalueBySkuServiceValueId(params: {
  skuServiceValueId: number
}, opts?: CallOptions): Promise<SKUServiceValueResponse> {
    return this.http.request<SKUServiceValueResponse>(withCall({ method: 'GET', path: `/api/catalog/pvt/skuservicevalue/${encodePathParam(params.skuServiceValueId)}` }, opts))
  }

  putApiCatalogPvtSkuservicevalueBySkuServiceValueId(params: {
  skuServiceValueId: number
  body: SKUServiceValueRequest
}, opts?: CallOptions): Promise<SKUServiceValueResponse> {
    return this.http.request<SKUServiceValueResponse>(withCall({ method: 'PUT', path: `/api/catalog/pvt/skuservicevalue/${encodePathParam(params.skuServiceValueId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSkuservicevalueBySkuServiceValueId(params: {
  skuServiceValueId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/skuservicevalue/${encodePathParam(params.skuServiceValueId)}` }, opts))
  }
}
class CatalogApi_skuSpecification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdSpecification(params: {
  skuId: number
}, opts?: CallOptions): Promise<SKUSpecificationResponse[]> {
    return this.http.request<SKUSpecificationResponse[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/specification` }, opts))
  }

  postApiCatalogPvtStockkeepingunitBySkuIdSpecification(params: {
  skuId: number
  body: {
  FieldId: number
  FieldValueId?: number
}
}, opts?: CallOptions): Promise<SKUSpecificationResponse> {
    return this.http.request<SKUSpecificationResponse>(withCall({ method: 'POST', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/specification`, body: params.body }, opts))
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
}, opts?: CallOptions): Promise<SKUSpecificationResponse[]> {
    return this.http.request<SKUSpecificationResponse[]>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/specification`, body: params.body }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdSpecification(params: {
  skuId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/specification` }, opts))
  }

  deleteApiCatalogPvtStockkeepingunitBySkuIdSpecificationBySpecificationId(params: {
  skuId: number
  specificationId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/specification/${encodePathParam(params.specificationId)}` }, opts))
  }

  putApiCatalogPvtStockkeepingunitBySkuIdSpecificationvalue(params: {
  skuId: number
  body: {
  FieldName: string
  GroupName: string
  RootLevelSpecification: boolean
  FieldValues: string[]
}
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/specificationvalue`, body: params.body }, opts))
  }
}
class CatalogApi_subcollection {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSubcollectionBySubCollectionIdStockkeepingunit(params: {
  subCollectionId: number
  body: {
  SkuId: number
}
}, opts?: CallOptions): Promise<{
  SubCollectionId?: number
  SkuId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  SkuId?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/stockkeepingunit`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdStockkeepingunitBySkuId(params: {
  subCollectionId: number
  skuId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/stockkeepingunit/${encodePathParam(params.skuId)}` }, opts))
  }

  postApiCatalogPvtSubcollectionBySubCollectionIdCategory(params: {
  subCollectionId: number
  body: {
  CategoryId: number
}
}, opts?: CallOptions): Promise<{
  SubCollectionId?: number
  CategoryId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  CategoryId?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/category`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdCategoryByCategoryId(params: {
  subCollectionId: number
  categoryId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/category/${encodePathParam(params.categoryId)}` }, opts))
  }

  postApiCatalogPvtSubcollectionBySubCollectionIdBrand(params: {
  subCollectionId: number
  body: {
  BrandId: number
}
}, opts?: CallOptions): Promise<{
  SubCollectionId?: number
  BrandId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  BrandId?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/brand`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdBrandByBrandId(params: {
  subCollectionId: number
  brandId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/brand/${encodePathParam(params.brandId)}` }, opts))
  }

  getApiCatalogPvtCollectionByCollectionIdSubcollection(params: {
  collectionId: number
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}/subcollection` }, opts))
  }

  getApiCatalogPvtSubcollectionBySubCollectionId(params: {
  subCollectionId: number
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}` }, opts))
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
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionId(params: {
  subCollectionId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}` }, opts))
  }

  postApiCatalogPvtSubcollection(params: {
  body: {
  CollectionId: number
  Name: string
  Type: string
  PreSale: boolean
  Release: boolean
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/subcollection`, body: params.body }, opts))
  }

  postApiCatalogPvtCollectionByCollectionIdPosition(params: {
  collectionId: number
  body: {
  skuId: number
  position: number
  subCollectionId: number
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}/position`, body: params.body }, opts))
  }

  getApiCatalogPvtSubcollectionBySubCollectionIdSpecificationvalue(params: {
  subCollectionId: number
}, opts?: CallOptions): Promise<SpecificationValuesSubcollectionIdResponse> {
    return this.http.request<SpecificationValuesSubcollectionIdResponse>(withCall({ method: 'GET', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/specificationvalue` }, opts))
  }

  postApiCatalogPvtSubcollectionBySubCollectionIdSpecificationvalue(params: {
  subCollectionId: number
  body: {
  SubCollectionId: number
  SpecificationValueId: number
}
}, opts?: CallOptions): Promise<{
  SubCollectionId?: number
  SpecificationValueId?: number
}> {
    return this.http.request<{
  SubCollectionId?: number
  SpecificationValueId?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/specificationvalue`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSubcollectionBySubCollectionIdSpecificationvalue(params: {
  subCollectionId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/subcollection/${encodePathParam(params.subCollectionId)}/specificationvalue` }, opts))
  }
}
class CatalogApi_category {
  constructor(private http: VtexHttpClient) {}

  categoryTree(params: {
  categoryLevels: string
}, opts?: CallOptions): Promise<GetCategoryTree[]> {
    return this.http.request<GetCategoryTree[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/category/tree/${encodePathParam(params.categoryLevels)}` }, opts))
  }

  getApiCatalogPvtCategoryByCategoryId(params: {
  categoryId: number
  includeTreePath?: boolean
}, opts?: CallOptions): Promise<Category> {
    return this.http.request<Category>(withCall({ method: 'GET', path: `/api/catalog/pvt/category/${encodePathParam(params.categoryId)}`, query: { 'includeTreePath': params.includeTreePath } }, opts))
  }

  putApiCatalogPvtCategoryByCategoryId(params: {
  categoryId: number
  body: {
  Name: string
  Keywords: string
  Title: string
  Description: string
  AdWordsRemarketingCode: string | null
  LomadeeCampaignCode: string | null
  FatherCategoryId: number | null
  GlobalCategoryId: number
  ShowInStoreFront: boolean
  IsActive: boolean
  ActiveStoreFrontLink: boolean
  ShowBrandFilter: boolean
  Score: number
  StockKeepingUnitSelectionMode: string
}
}, opts?: CallOptions): Promise<Category> {
    return this.http.request<Category>(withCall({ method: 'PUT', path: `/api/catalog/pvt/category/${encodePathParam(params.categoryId)}`, body: params.body }, opts))
  }

  postApiCatalogPvtCategory(params: {
  body: CreateCategoryRequest
}, opts?: CallOptions): Promise<Category> {
    return this.http.request<Category>(withCall({ method: 'POST', path: `/api/catalog/pvt/category`, body: params.body }, opts))
  }
}
class CatalogApi_similarCategory {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtProductByProductIdSimilarcategory(params: {
  productId: number
}, opts?: CallOptions): Promise<{
  ProductId?: number
  CategoryId?: number
}[]> {
    return this.http.request<{
  ProductId?: number
  CategoryId?: number
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/similarcategory` }, opts))
  }

  postApiCatalogPvtProductByProductIdSimilarcategoryByCategoryId(params: {
  productId: number
  categoryId: number
}, opts?: CallOptions): Promise<{
  ProductId?: number
  StoreId?: number
}> {
    return this.http.request<{
  ProductId?: number
  StoreId?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/similarcategory/${encodePathParam(params.categoryId)}` }, opts))
  }

  deleteApiCatalogPvtProductByProductIdSimilarcategoryByCategoryId(params: {
  productId: number
  categoryId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/similarcategory/${encodePathParam(params.categoryId)}` }, opts))
  }
}
class CatalogApi_categorySpecification {
  constructor(private http: VtexHttpClient) {}

  specificationsByCategoryId(params: {
  categoryId: number
}, opts?: CallOptions): Promise<CategorySpecification> {
    return this.http.request<CategorySpecification>(withCall({ method: 'GET', path: `/api/catalog_system/pub/specification/field/listByCategoryId/${encodePathParam(params.categoryId)}` }, opts))
  }

  specificationsTreeByCategoryId(params: {
  categoryId: number
}, opts?: CallOptions): Promise<CategorySpecification> {
    return this.http.request<CategorySpecification>(withCall({ method: 'GET', path: `/api/catalog_system/pub/specification/field/listTreeByCategoryId/${encodePathParam(params.categoryId)}` }, opts))
  }
}
class CatalogApi_brand {
  constructor(private http: VtexHttpClient) {}

  brandList(params: Record<string, never> = {}, opts?: CallOptions): Promise<BrandGet[]> {
    return this.http.request<BrandGet[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/brand/list` }, opts))
  }

  brandListPerPage(params: {
  pageSize: number
  page: number
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/brand/pagedlist`, query: { 'pageSize': params.pageSize, 'page': params.page } }, opts))
  }

  brand(params: {
  brandId: string
}, opts?: CallOptions): Promise<BrandGet> {
    return this.http.request<BrandGet>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/brand/${encodePathParam(params.brandId)}` }, opts))
  }

  postApiCatalogPvtBrand(params: {
  body: BrandCreateUpdateRequest
}, opts?: CallOptions): Promise<BrandCreateUpdate> {
    return this.http.request<BrandCreateUpdate>(withCall({ method: 'POST', path: `/api/catalog/pvt/brand`, body: params.body }, opts))
  }

  getApiCatalogPvtBrandByBrandId(params: {
  brandId: string
}, opts?: CallOptions): Promise<BrandCreateUpdate> {
    return this.http.request<BrandCreateUpdate>(withCall({ method: 'GET', path: `/api/catalog/pvt/brand/${encodePathParam(params.brandId)}` }, opts))
  }

  putApiCatalogPvtBrandByBrandId(params: {
  brandId: string
  body: BrandCreateUpdateRequest
}, opts?: CallOptions): Promise<BrandCreateUpdate> {
    return this.http.request<BrandCreateUpdate>(withCall({ method: 'PUT', path: `/api/catalog/pvt/brand/${encodePathParam(params.brandId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtBrandByBrandId(params: {
  brandId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/brand/${encodePathParam(params.brandId)}` }, opts))
  }
}
class CatalogApi_attachment {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtAttachmentByAttachmentid(params: {
  attachmentid: string
}, opts?: CallOptions): Promise<AttachmentResponse> {
    return this.http.request<AttachmentResponse>(withCall({ method: 'GET', path: `/api/catalog/pvt/attachment/${encodePathParam(params.attachmentid)}` }, opts))
  }

  putApiCatalogPvtAttachmentByAttachmentid(params: {
  attachmentid: string
  body: AttachmentRequest
}, opts?: CallOptions): Promise<AttachmentResponse> {
    return this.http.request<AttachmentResponse>(withCall({ method: 'PUT', path: `/api/catalog/pvt/attachment/${encodePathParam(params.attachmentid)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtAttachmentByAttachmentid(params: {
  attachmentid: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/attachment/${encodePathParam(params.attachmentid)}` }, opts))
  }

  postApiCatalogPvtAttachment(params: {
  body: AttachmentRequest
}, opts?: CallOptions): Promise<AttachmentResponse> {
    return this.http.request<AttachmentResponse>(withCall({ method: 'POST', path: `/api/catalog/pvt/attachment`, body: params.body }, opts))
  }

  getApiCatalogPvtAttachments(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/attachments` }, opts))
  }
}
class CatalogApi_collection {
  constructor(private http: VtexHttpClient) {}

  getAllInactiveCollections(params: Record<string, never> = {}, opts?: CallOptions): Promise<number[]> {
    return this.http.request<number[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/collection/inactive` }, opts))
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
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/collection`, body: params.body }, opts))
  }

  getImportfileexample(params: Record<string, never> = {}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/catalog/pvt/collection/stockkeepingunit/importfileexample` }, opts))
  }

  postAddproductsbyimportfile(params: {
  collectionId: number
  body: FormData
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}/stockkeepingunit/importinsert`, body: params.body, contentType: 'multipart/form-data' }, opts))
  }

  postRemoveproductsbyimportfile(params: {
  collectionId: number
  body: FormData
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}/stockkeepingunit/importexclude`, body: params.body, contentType: 'multipart/form-data' }, opts))
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
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}/products`, query: { 'page': params.page, 'pageSize': params.pageSize, 'Filter': params.Filter, 'Active': params.Active, 'Visible': params.Visible, 'CategoryId': params.CategoryId, 'BrandId': params.BrandId, 'SupplierId': params.SupplierId, 'SalesChannelId': params.SalesChannelId, 'ReleaseFrom': params.ReleaseFrom, 'ReleaseTo': params.ReleaseTo, 'SpecificationProduct': params.SpecificationProduct, 'SpecificationFieldId': params.SpecificationFieldId } }, opts))
  }

  getApiCatalogPvtCollectionByCollectionId(params: {
  collectionId: number
}, opts?: CallOptions): Promise<{
  Id?: number
  Name?: string
  Description?: string | null
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
  Description?: string | null
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}` }, opts))
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
}, opts?: CallOptions): Promise<{
  Id?: number
  Name?: string
  Description?: string | null
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
  Description?: string | null
  Searchable?: boolean
  Highlight?: boolean
  DateFrom?: string
  DateTo?: string
  TotalProducts?: number
  Type?: string
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtCollectionByCollectionId(params: {
  collectionId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}` }, opts))
  }
}
class CatalogApi_specification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationBySpecificationId(params: {
  specificationId: number
}, opts?: CallOptions): Promise<{
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
  DefaultValue: string | null
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
  DefaultValue: string | null
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/specification/${encodePathParam(params.specificationId)}` }, opts))
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
}, opts?: CallOptions): Promise<{
  Id?: number
  FieldTypeId?: number
  CategoryId?: number
  FieldGroupId?: number
  Name?: string
  Description?: string | null
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean | null
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
  Description?: string | null
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean | null
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/specification/${encodePathParam(params.specificationId)}`, body: params.body }, opts))
  }

  postApiCatalogPvtSpecification(params: {
  body: {
  FieldTypeId: 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9
  CategoryId?: number
  FieldGroupId: number
  Name: string
  Description?: string | null
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean | null
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}
}, opts?: CallOptions): Promise<{
  Id?: number
  FieldTypeId?: number
  CategoryId?: number
  FieldGroupId?: number
  Name?: string
  Description?: string | null
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean | null
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
  Description?: string | null
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean | null
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/specification`, body: params.body }, opts))
  }
}
class CatalogApi_specificationField {
  constructor(private http: VtexHttpClient) {}

  specificationsField(params: {
  fieldId: number
}, opts?: CallOptions): Promise<{
  Name?: string
  FieldId?: number
  IsActive?: boolean
  IsRequired?: boolean
  FieldTypeId?: number
  FieldTypeName?: string
  FieldValueId?: number | null
  Description?: string | null
  IsStockKeepingUnit?: boolean
  IsFilter?: boolean
  IsOnProductDetails?: boolean
  Position?: number
  IsWizard?: boolean | null
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string | null
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
  FieldValueId?: number | null
  Description?: string | null
  IsStockKeepingUnit?: boolean
  IsFilter?: boolean
  IsOnProductDetails?: boolean
  Position?: number
  IsWizard?: boolean | null
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue?: string | null
  FieldGroupId?: number
  FieldGroupName?: string
}>(withCall({ method: 'GET', path: `/api/catalog_system/pub/specification/fieldGet/${encodePathParam(params.fieldId)}` }, opts))
  }

  specificationsInsertField(params: {
  body: {
  Name: string
  CategoryId: number | null
  FieldId: number | null
  IsActive: boolean
  IsRequired: boolean
  FieldTypeId: number
  FieldValueId: number | null
  Description: string | null
  IsStockKeepingUnit: boolean
  IsFilter: boolean
  IsOnProductDetails: boolean
  Position: number
  IsWizard: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string | null
  FieldGroupId: number
  FieldGroupName: string
}
}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/specification/field`, body: params.body }, opts))
  }

  specificationsInsertFieldUpdate(params: {
  body: {
  Name: string
  CategoryId: number | null
  FieldId: number | null
  IsActive: boolean
  IsRequired: boolean
  FieldTypeId: number
  FieldValueId?: number | null
  Description: string | null
  IsStockKeepingUnit: boolean
  IsFilter: boolean
  IsOnProductDetails: boolean
  Position: number
  IsWizard: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string | null
  FieldGroupId: number
  FieldGroupName: string
}
}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'PUT', path: `/api/catalog_system/pvt/specification/field`, body: params.body }, opts))
  }
}
class CatalogApi_specificationFieldValue {
  constructor(private http: VtexHttpClient) {}

  specificationsGetFieldValue(params: {
  fieldValueId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/specification/fieldValue/${encodePathParam(params.fieldValueId)}` }, opts))
  }

  specificationsValuesByFieldId(params: {
  fieldId: number
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pub/specification/fieldvalue/${encodePathParam(params.fieldId)}` }, opts))
  }

  specificationsInsertFieldValue(params: {
  body: {
  FieldId: number
  Name: string
  Text: string
  IsActive: boolean
  Position: number
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/specification/fieldValue`, body: params.body }, opts))
  }

  specificationsUpdateFieldValue(params: {
  body: {
  FieldId: number | null
  Name: string
  Text: string | null
  IsActive: boolean
  Position: number
}
}, opts?: CallOptions): Promise<string> {
    return this.http.request<string>(withCall({ method: 'PUT', path: `/api/catalog_system/pvt/specification/fieldValue`, body: params.body }, opts))
  }
}
class CatalogApi_specificationValue {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationvalueBySpecificationValueId(params: {
  specificationValueId: number
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/specificationvalue/${encodePathParam(params.specificationValueId)}` }, opts))
  }

  putApiCatalogPvtSpecificationvalueBySpecificationValueId(params: {
  specificationValueId: number
  body: {
  FieldId: number
  Name: string
  Text?: string | null
  IsActive?: boolean
  Position?: number
}
}, opts?: CallOptions): Promise<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string | null
  IsActive?: boolean
  Position?: number
}> {
    return this.http.request<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string | null
  IsActive?: boolean
  Position?: number
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/specificationvalue/${encodePathParam(params.specificationValueId)}`, body: params.body }, opts))
  }

  postApiCatalogPvtSpecificationvalue(params: {
  body: {
  FieldId: number
  Name: string
  Text?: string | null
  IsActive?: boolean
  Position?: number
}
}, opts?: CallOptions): Promise<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string | null
  IsActive?: boolean
  Position?: number
}> {
    return this.http.request<{
  FieldValueId?: number
  FieldId?: number
  Name?: string
  Text?: string | null
  IsActive?: boolean
  Position?: number
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/specificationvalue`, body: params.body }, opts))
  }
}
class CatalogApi_specificationGroup {
  constructor(private http: VtexHttpClient) {}

  specificationsGroupListbyCategory(params: {
  categoryId: string
}, opts?: CallOptions): Promise<SpecificationsGroup[]> {
    return this.http.request<SpecificationsGroup[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/specification/groupbycategory/${encodePathParam(params.categoryId)}` }, opts))
  }

  specificationsGroupGet(params: {
  groupId: string
}, opts?: CallOptions): Promise<SpecificationsGroup> {
    return this.http.request<SpecificationsGroup>(withCall({ method: 'GET', path: `/api/catalog_system/pub/specification/groupGet/${encodePathParam(params.groupId)}` }, opts))
  }

  specificationGroupInsert2(params: {
  body: {
  CategoryId: number
  Name: string
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'POST', path: `/api/catalog/pvt/specificationgroup`, body: params.body }, opts))
  }

  putApiCatalogPvtSpecificationgroupByGroupId(params: {
  groupId: number
  body: {
  CategoryId: number
  Id: number
  Name: string
  Position: number
}
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'PUT', path: `/api/catalog/pvt/specificationgroup/${encodePathParam(params.groupId)}`, body: params.body }, opts))
  }
}
class CatalogApi_nonStructuredSpecification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationNonstructuredById(params: {
  Id: number
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/specification/nonstructured/${encodePathParam(params.Id)}` }, opts))
  }

  deleteApiCatalogPvtSpecificationNonstructuredById(params: {
  Id: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/specification/nonstructured/${encodePathParam(params.Id)}` }, opts))
  }

  getApiCatalogPvtSpecificationNonstructured(params: {
  skuId: number
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/specification/nonstructured`, query: { 'skuId': params.skuId } }, opts))
  }

  deleteApiCatalogPvtSpecificationNonstructured(params: {
  skuId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/specification/nonstructured`, query: { 'skuId': params.skuId } }, opts))
  }
}
class CatalogApi_salesChannel {
  constructor(private http: VtexHttpClient) {}

  salesChannelList(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number | null
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
  Origin?: string | null
  Position?: number | null
  ConditionRule?: string | null
  CurrencyDecimalDigits?: number | null
}[]> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number | null
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
  Origin?: string | null
  Position?: number | null
  ConditionRule?: string | null
  CurrencyDecimalDigits?: number | null
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/saleschannel/list` }, opts))
  }

  salesChannelbyId(params: {
  salesChannelId: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number | null
  CountryCode?: string
  CultureInfo?: string
  TimeZone?: string
  CurrencyCode?: string | null
  CurrencySymbol?: string
  CurrencyLocale?: number
  CurrencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  Origin?: string | null
  Position?: number | null
  ConditionRule?: string | null
  CurrencyDecimalDigits?: number
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsActive?: boolean
  ProductClusterId?: number | null
  CountryCode?: string
  CultureInfo?: string
  TimeZone?: string
  CurrencyCode?: string | null
  CurrencySymbol?: string
  CurrencyLocale?: number
  CurrencyFormatInfo?: {
  CurrencyDecimalDigits?: number
  CurrencyDecimalSeparator?: string
  CurrencyGroupSeparator?: string
  CurrencyGroupSize?: number
  StartsWithCurrencySymbol?: boolean
}
  Origin?: string | null
  Position?: number | null
  ConditionRule?: string | null
  CurrencyDecimalDigits?: number
}>(withCall({ method: 'GET', path: `/api/catalog_system/pub/saleschannel/${encodePathParam(params.salesChannelId)}` }, opts))
  }

  getApiCatalogPvtProductByProductIdSalespolicy(params: {
  productId: number
}, opts?: CallOptions): Promise<{
  ProductId?: number
  StoreId?: number
}[]> {
    return this.http.request<{
  ProductId?: number
  StoreId?: number
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/salespolicy` }, opts))
  }

  postApiCatalogPvtProductByProductIdSalespolicyByTradepolicyId(params: {
  productId: number
  tradepolicyId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'POST', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/salespolicy/${encodePathParam(params.tradepolicyId)}` }, opts))
  }

  deleteApiCatalogPvtProductByProductIdSalespolicyByTradepolicyId(params: {
  productId: number
  tradepolicyId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/salespolicy/${encodePathParam(params.tradepolicyId)}` }, opts))
  }

  getApiCatalogSystemPvtSkuStockkeepingunitidsbysaleschannel(params: {
  sc: number
  page?: number
  pageSize?: number
  onlyAssigned?: boolean
}, opts?: CallOptions): Promise<number[]> {
    return this.http.request<number[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sku/stockkeepingunitidsbysaleschannel`, query: { 'sc': params.sc, 'page': params.page, 'pageSize': params.pageSize, 'onlyAssigned': params.onlyAssigned } }, opts))
  }
}
class CatalogApi_seller {
  constructor(private http: VtexHttpClient) {}

  sellerList(params: {
  sc?: number
  sellerType?: number
  isBetterScope?: boolean
} = {}, opts?: CallOptions): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string | null
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
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
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string | null
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/seller/list`, query: { 'sc': params.sc, 'sellerType': params.sellerType, 'isBetterScope': params.isBetterScope } }, opts))
  }

  getSellerbyId(params: {
  sellerId: string
}, opts?: CallOptions): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
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
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/seller/${encodePathParam(params.sellerId)}` }, opts))
  }

  createSeller(params: {
  body: CreateSellerRequest
}, opts?: CallOptions): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string | null
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
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
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string | null
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>(withCall({ method: 'POST', path: `/api/catalog_system/pvt/seller`, body: params.body }, opts))
  }

  updateSeller(params: {
  body: UpdateSellerRequest
}, opts?: CallOptions): Promise<{
  SellerId?: string
  Name?: string
  Email?: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string | null
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
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
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string | null
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>(withCall({ method: 'PUT', path: `/api/catalog_system/pvt/seller`, body: params.body }, opts))
  }

  getSellersbyId(params: {
  sellerId: string
}, opts?: CallOptions): Promise<{
  SellerId?: string
  Name?: string | null
  Email?: string | null
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}> {
    return this.http.request<{
  SellerId?: string
  Name?: string | null
  Email?: string | null
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions?: boolean
  UserName?: string | null
  Password?: string | null
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification?: string
  ArchiveId?: number | null
  UrlLogo?: string
  ProductCommissionPercentage?: number
  FreightCommissionPercentage?: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint?: string | null
  CatalogSystemEndpoint?: string
  IsActive?: boolean
  MerchantName?: string
  FulfillmentSellerId?: number | null
  SellerType?: number
  IsBetterScope?: boolean
  TrustPolicy?: string
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/sellers/${encodePathParam(params.sellerId)}` }, opts))
  }
}
class CatalogApi_supplier {
  constructor(private http: VtexHttpClient) {}

  postApiCatalogPvtSupplier(params: {
  body: SupplierRequest
}, opts?: CallOptions): Promise<SupplierResponse> {
    return this.http.request<SupplierResponse>(withCall({ method: 'POST', path: `/api/catalog/pvt/supplier`, body: params.body }, opts))
  }

  putApiCatalogPvtSupplierBySupplierId(params: {
  supplierId: number
  body: SupplierRequest
}, opts?: CallOptions): Promise<SupplierResponse> {
    return this.http.request<SupplierResponse>(withCall({ method: 'PUT', path: `/api/catalog/pvt/supplier/${encodePathParam(params.supplierId)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtSupplierBySupplierId(params: {
  supplierId: number
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/supplier/${encodePathParam(params.supplierId)}` }, opts))
  }
}
class CatalogApi_productIndexing {
  constructor(private http: VtexHttpClient) {}

  indexedInfo(params: {
  productId: string
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/products/GetIndexedInfo/${encodePathParam(params.productId)}` }, opts))
  }
}
class CatalogApi_commercialConditions {
  constructor(private http: VtexHttpClient) {}

  getAllCommercialConditions(params: Record<string, never> = {}, opts?: CallOptions): Promise<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}[]> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}[]>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/commercialcondition/list` }, opts))
  }

  getCommercialConditions(params: {
  commercialConditionId: number
}, opts?: CallOptions): Promise<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}> {
    return this.http.request<{
  Id?: number
  Name?: string
  IsDefault?: boolean
}>(withCall({ method: 'GET', path: `/api/catalog_system/pvt/commercialcondition/${encodePathParam(params.commercialConditionId)}` }, opts))
  }
}
class CatalogApi_giftList {
  constructor(private http: VtexHttpClient) {}

  getGiftList(params: {
  listId: number
}, opts?: CallOptions): Promise<{
  giftListId?: number
  name?: string
  userId?: string
  fileId?: number | null
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
  telemarketingId?: number | null
  telemarketingObservation?: string | null
  IsPublic?: boolean
  isActive?: boolean
  shipsToOwner?: boolean
  isAddressOk?: boolean
  version?: number
  giftCardRechargeSkuId?: number | null
  memberNames?: string
  giftListMembers?: {
  giftListMemberId?: number
  giftListId?: number
  userId?: string
  clientId?: string | null
  title?: string | null
  name?: string
  surname?: string
  isAdmin?: boolean
  isActive?: boolean
  text1?: string | null
  text2?: string | null
}[]
  giftListSkuIds?: string[] | null
  address?: string | null
  fileUrl?: string | null
}> {
    return this.http.request<{
  giftListId?: number
  name?: string
  userId?: string
  fileId?: number | null
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
  telemarketingId?: number | null
  telemarketingObservation?: string | null
  IsPublic?: boolean
  isActive?: boolean
  shipsToOwner?: boolean
  isAddressOk?: boolean
  version?: number
  giftCardRechargeSkuId?: number | null
  memberNames?: string
  giftListMembers?: {
  giftListMemberId?: number
  giftListId?: number
  userId?: string
  clientId?: string | null
  title?: string | null
  name?: string
  surname?: string
  isAdmin?: boolean
  isActive?: boolean
  text1?: string | null
  text2?: string | null
}[]
  giftListSkuIds?: string[] | null
  address?: string | null
  fileUrl?: string | null
}>(withCall({ method: 'GET', path: `/api/addon/pvt/giftlist/get/${encodePathParam(params.listId)}` }, opts))
  }
}
class CatalogApi_multiLanguage {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtProductByProductIdLanguage(params: {
  productId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string | null
  Title?: string | null
  MetaTagDescription?: string | null
  DescriptionShort?: string | null
  Keywords?: string
  LinkId?: string | null
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
  LinkId?: string | null
}[]
  SimilarCategories?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[] | null
  Brand?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  LinkId?: string
} | null
  Skus?: {
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: ({
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
} | null)[] | null
  Attachments?: ({
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
} | null)[] | null
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
}[] | null
  SpecificationGroups?: ({
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
} | null)[] | null
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string | null
}[] | null
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
}[] | null
  Collections?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  LinkId?: string | null
}[]
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string | null
  Title?: string | null
  MetaTagDescription?: string | null
  DescriptionShort?: string | null
  Keywords?: string
  LinkId?: string | null
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
  LinkId?: string | null
}[]
  SimilarCategories?: {
  Id?: number
  Locale?: string
  Name?: string
  Title?: string
  Description?: string
  Keywords?: string
  LinkId?: string
}[] | null
  Brand?: {
  Id?: number
  Locale?: string
  Name?: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  LinkId?: string
} | null
  Skus?: {
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: ({
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
} | null)[] | null
  Attachments?: ({
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
} | null)[] | null
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
}[] | null
  SpecificationGroups?: ({
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
} | null)[] | null
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string | null
}[] | null
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
}[] | null
  Collections?: {
  Id?: number
  Locale?: string
  Name?: string
  Description?: string
  LinkId?: string | null
}[]
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtProductByProductIdLanguage(params: {
  productId: number
  body: {
  Locale: string
  Name: string
  Title: string | null
  Description?: string | null
  MetaTagDescription?: string | null
  DescriptionShort?: string | null
  Keywords?: string | null
  LinkId?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/product/${encodePathParam(params.productId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtProductsByProductIdSpecificationBySpecificationIdLanguage(params: {
  productId: number
  specificationId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  ProductId?: number
  SpecificationId?: number
  Locale?: string
  Name?: string
  Value?: string
  Values?: string[] | null
}[]> {
    return this.http.request<{
  Id?: number
  ProductId?: number
  SpecificationId?: number
  Locale?: string
  Name?: string
  Value?: string
  Values?: string[] | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/products/${encodePathParam(params.productId)}/specification/${encodePathParam(params.specificationId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtProductsByProductIdSpecificationBySpecificationIdLanguage(params: {
  productId: number
  specificationId: number
  body: {
  ProductId: number
  SpecificationId: number
  Locale: string
  Name: string
  Value: string | null
  Values?: string[] | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/products/${encodePathParam(params.productId)}/specification/${encodePathParam(params.specificationId)}/language`, body: params.body }, opts))
  }
}
class CatalogApi_multiLanguageSKU {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtStockkeepingunitBySkuIdLanguage(params: {
  skuId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: ({
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
} | null)[] | null
  Attachments?: ({
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
} | null)[] | null
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
}[] | null
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
}[] | null
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string | null
}[] | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  MeasurementUnit?: string
  Attributes?: ({
  Id?: number
  Locale?: string
  AttributeName?: string
  AttributeValue?: string
} | null)[] | null
  Attachments?: ({
  Id?: number
  Locale?: string
  Name?: string
  Domains?: {
  OriginalFieldName?: string
  FieldName?: string
  DomainValues?: string
}[]
} | null)[] | null
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
}[] | null
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
}[] | null
  Files?: {
  Id?: number
  FileId?: number
  Locale?: string
  Label?: string
  Name?: string
  Text?: string | null
}[] | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtStockkeepingunitBySkuIdLanguage(params: {
  skuId: number
  body: {
  Locale: string
  Name: string
  MeasurementUnit: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtStockkeepingunitBySkuIdAttributeBySkuAttributeIdLanguage(params: {
  skuId: number
  skuAttributeId: number
  locale?: string
}, opts?: CallOptions): Promise<{
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
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute/${encodePathParam(params.skuAttributeId)}/language`, query: { 'locale': params.locale } }, opts))
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
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/attribute/${encodePathParam(params.skuAttributeId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileIdLanguage(params: {
  skuId: number
  skuFileId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  FileId?: number | null
  Locale?: string
  Label?: string | null
  Text?: string | null
}[]> {
    return this.http.request<{
  Id?: number
  FileId?: number | null
  Locale?: string
  Label?: string | null
  Text?: string | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file/${encodePathParam(params.skuFileId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtStockkeepingunitBySkuIdFileBySkuFileIdLanguage(params: {
  skuId: number
  skuFileId: number
  body: {
  Locale: string
  Label: string | null
  Name: string
  Text: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(params.skuId)}/file/${encodePathParam(params.skuFileId)}/language`, body: params.body }, opts))
  }
}
class CatalogApi_multiLanguageSpecification {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtSpecificationgroupBySpecificationGroupIdLanguage(params: {
  specificationGroupId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: string[] | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Specifications?: string[] | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/specificationgroup/${encodePathParam(params.specificationGroupId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtSpecificationgroupBySpecificationGroupIdLanguage(params: {
  specificationGroupId: number
  body: {
  Locale: string
  Name: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/specificationgroup/${encodePathParam(params.specificationGroupId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtSpecificationBySpecificationIdLanguage(params: {
  specificationId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string | null
  Values?: string[] | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string | null
  Values?: string[] | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/specification/${encodePathParam(params.specificationId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtSpecificationBySpecificationIdLanguage(params: {
  specificationId: number
  body: {
  Locale: string
  Name: string
  Description?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/specification/${encodePathParam(params.specificationId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtSpecificationvalueByValueIdLanguage(params: {
  valueId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  IsCustomValue?: boolean | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/specificationvalue/${encodePathParam(params.valueId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtSpecificationvalueByValueIdLanguage(params: {
  valueId: number
  body: {
  Locale: string
  Name: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/specificationvalue/${encodePathParam(params.valueId)}/language`, body: params.body }, opts))
  }
}
class CatalogApi_multiLanguageCategory {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtCategoryByCategoryIdLanguage(params: {
  categoryId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Title?: string | null
  Description?: string | null
  Keywords?: string | null
  LinkId?: string | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Title?: string | null
  Description?: string | null
  Keywords?: string | null
  LinkId?: string | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/category/${encodePathParam(params.categoryId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtCategoryByCategoryIdLanguage(params: {
  categoryId: number
  body: {
  Locale: string
  Name: string
  Title?: string | null
  Description?: string | null
  Keywords?: string | null
  LinkId?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/category/${encodePathParam(params.categoryId)}/language`, body: params.body }, opts))
  }
}
class CatalogApi_multiLanguageBrand {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtBrandByBrandIdLanguage(params: {
  brandId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string | null
  Keywords?: string | null
  SiteTitle?: string | null
  LinkId?: string | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string | null
  Keywords?: string | null
  SiteTitle?: string | null
  LinkId?: string | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/brand/${encodePathParam(params.brandId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtBrandByBrandIdLanguage(params: {
  brandId: number
  body: {
  Locale: string
  Name: string
  Text?: string | null
  Keywords?: string | null
  SiteTitle?: string | null
  LinkId?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/brand/${encodePathParam(params.brandId)}/language`, body: params.body }, opts))
  }
}
class CatalogApi_multiLanguageAttachmentAndService {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtAttachmentByAttachmentIdLanguage(params: {
  attachmentId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Domains?: string[] | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Domains?: string[] | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/attachment/${encodePathParam(params.attachmentId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtAttachmentByAttachmentIdLanguage(params: {
  attachmentId: number
  body: {
  Locale: string
  Name: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/attachment/${encodePathParam(params.attachmentId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtSkuservicetypeBySkuServiceTypeIdLanguage(params: {
  skuServiceTypeId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Values?: string[] | null
  Attachments?: string[] | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Values?: string[] | null
  Attachments?: string[] | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/skuservicetype/${encodePathParam(params.skuServiceTypeId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtSkuservicetypeBySkuServiceTypeIdLanguage(params: {
  skuServiceTypeId: number
  body: {
  Locale: string
  Name: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/skuservicetype/${encodePathParam(params.skuServiceTypeId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtSkuserviceBySkuserviceIdLanguage(params: {
  skuserviceId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Text?: string | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/skuservice/${encodePathParam(params.skuserviceId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtSkuserviceBySkuserviceIdLanguage(params: {
  skuserviceId: number
  body: {
  Locale: string
  Name: string
  Text?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/skuservice/${encodePathParam(params.skuserviceId)}/language`, body: params.body }, opts))
  }

  getApiCatalogPvtSkuservicevalueBySkuServiceValueIdLanguage(params: {
  skuServiceValueId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/skuservicevalue/${encodePathParam(params.skuServiceValueId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtSkuservicevalueBySkuServiceValueIdLanguage(params: {
  skuServiceValueId: number
  body: {
  Locale: string
  Name: string
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/skuservicevalue/${encodePathParam(params.skuServiceValueId)}/language`, body: params.body }, opts))
  }
}
class CatalogApi_multiLanguageCollection {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtCollectionByCollectionIdLanguage(params: {
  collectionId: number
  locale?: string
}, opts?: CallOptions): Promise<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string | null
  LinkId?: string | null
}[]> {
    return this.http.request<{
  Id?: number
  Locale?: string
  Name?: string
  Description?: string | null
  LinkId?: string | null
}[]>(withCall({ method: 'GET', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}/language`, query: { 'locale': params.locale } }, opts))
  }

  putApiCatalogPvtCollectionByCollectionIdLanguage(params: {
  collectionId: number
  body: {
  Locale: string
  Name: string
  Description?: string | null
  LinkId?: string | null
}
}, opts?: CallOptions): Promise<unknown> {
    return this.http.request<unknown>(withCall({ method: 'PUT', path: `/api/catalog/pvt/collection/${encodePathParam(params.collectionId)}/language`, body: params.body }, opts))
  }
}
class CatalogApi_assortment {
  constructor(private http: VtexHttpClient) {}

  getApiCatalogPvtAssortment(params: {
  name?: string
  after?: number
  size?: number
  collectionId?: number
} = {}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/api/catalog/pvt/assortment`, query: { 'name': params.name, 'after': params.after, 'size': params.size, 'collectionId': params.collectionId } }, opts))
  }

  postApiCatalogPvtAssortment(params: {
  body: {
  name: string
}
}, opts?: CallOptions): Promise<ProductAssortment> {
    return this.http.request<ProductAssortment>(withCall({ method: 'POST', path: `/api/catalog/pvt/assortment`, body: params.body }, opts))
  }

  getApiCatalogPvtAssortmentByProductAssortmentID(params: {
  productAssortmentID: number
}, opts?: CallOptions): Promise<ProductAssortment> {
    return this.http.request<ProductAssortment>(withCall({ method: 'GET', path: `/api/catalog/pvt/assortment/${encodePathParam(params.productAssortmentID)}` }, opts))
  }

  putApiCatalogPvtAssortmentByProductAssortmentID(params: {
  productAssortmentID: number
  body: {
  name: string
}
}, opts?: CallOptions): Promise<ProductAssortment> {
    return this.http.request<ProductAssortment>(withCall({ method: 'PUT', path: `/api/catalog/pvt/assortment/${encodePathParam(params.productAssortmentID)}`, body: params.body }, opts))
  }

  deleteApiCatalogPvtAssortmentByProductAssortmentID(params: {
  productAssortmentID: number
}, opts?: CallOptions): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/assortment/${encodePathParam(params.productAssortmentID)}` }, opts))
  }

  postApiCatalogPvtAssortmentByProductAssortmentIDIncludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}, opts?: CallOptions): Promise<AssortmentCollectionAssociation> {
    return this.http.request<AssortmentCollectionAssociation>(withCall({ method: 'POST', path: `/api/catalog/pvt/assortment/${encodePathParam(params.productAssortmentID)}/included-collections/${encodePathParam(params.collectionID)}` }, opts))
  }

  deleteApiCatalogPvtAssortmentByProductAssortmentIDIncludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}, opts?: CallOptions): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/assortment/${encodePathParam(params.productAssortmentID)}/included-collections/${encodePathParam(params.collectionID)}` }, opts))
  }

  postApiCatalogPvtAssortmentByProductAssortmentIDExcludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}, opts?: CallOptions): Promise<AssortmentCollectionAssociation> {
    return this.http.request<AssortmentCollectionAssociation>(withCall({ method: 'POST', path: `/api/catalog/pvt/assortment/${encodePathParam(params.productAssortmentID)}/excluded-collections/${encodePathParam(params.collectionID)}` }, opts))
  }

  deleteApiCatalogPvtAssortmentByProductAssortmentIDExcludedCollectionsByCollectionID(params: {
  productAssortmentID: number
  collectionID: number
}, opts?: CallOptions): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>(withCall({ method: 'DELETE', path: `/api/catalog/pvt/assortment/${encodePathParam(params.productAssortmentID)}/excluded-collections/${encodePathParam(params.collectionID)}` }, opts))
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
