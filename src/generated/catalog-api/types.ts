export type SpecificationValuesSubcollectionIdResponse = {
  Page?: number
  Size?: number
  TotalRows?: number
  TotalPage?: number
  Data?: {
  SubCollectionId?: number
  SpecificationValueId?: number
}[]
}

export type SkuFileResponse = {
  Id?: number
  ArchiveId?: number
  SkuId?: number
  Name?: string
  IsMain?: boolean
  Text?: string
  Label?: string | null
  Url?: string
  FileLocation?: string
  Position?: number
}[]

export type SKUFileURL = {
  IsMain?: boolean
  Label?: string
  Name: string
  Text?: string | null
  Url: string
  Position?: number
}

export type SKUFile = string

export type GetCategoryTree = {
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: GetCategoryTreeChild[]
  Title: string
  MetaTagDescription: string
}

export type GetCategoryTreeChild = {
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: string[]
  Title: string
  MetaTagDescription: string
}

export type Category = {
  Id: number
  Name: string
  FatherCategoryId: number | null
  Title: string
  Description: string
  Keywords: string
  IsActive: boolean
  LomadeeCampaignCode: string
  AdWordsRemarketingCode: string
  ShowInStoreFront: boolean
  ShowBrandFilter: boolean
  ActiveStoreFrontLink: boolean
  GlobalCategoryId: number
  StockKeepingUnitSelectionMode: string
  Score: number | null
  LinkId: string
  HasChildren: boolean
  TreePath: string[] | null
  TreePathIds: number[] | null
  TreePathLinkIds: string[] | null
}

export type CreateCategoryRequest = {
  Id?: number
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
  Score: number | null
  StockKeepingUnitSelectionMode: "SPECIFICATION" | "LIST"
}

export type GetorUpdateProductSpecification = {
  Value: string[]
  Id?: number
  Name?: string
}

export type GetSKUandContext = {
  Id: number
  ProductId: number
  NameComplete: string
  ComplementName?: string
  ProductName: string
  ProductDescription: string
  ProductRefId?: string
  TaxCode?: string
  SkuName: string
  IsActive: boolean
  IsTransported: boolean | null
  IsInventoried: boolean | null
  IsGiftCardRecharge: boolean
  ImageUrl: string
  DetailUrl: string
  CSCIdentification: string | null
  BrandId: string
  BrandName: string
  Dimension: Dimension
  RealDimension: RealDimension
  ManufacturerCode: string
  IsKit: boolean
  KitItems: string[]
  Services: string[]
  Categories: string[]
  Attachments: Attachment[]
  Collections: string[]
  SkuSellers: SkuSeller[]
  SalesChannels: number[]
  Images: Image[]
  SkuSpecifications: SkuSpecification[]
  ProductSpecifications: ProductSpecification[]
  ProductClustersIds: string
  ProductCategoryIds: string
  ProductGlobalCategoryId: number | null
  ProductCategories: {
  [key: string]: string
}
  CommercialConditionId: number
  RewardValue: number
  AlternateIds: AlternateIds
  AlternateIdValues: string[]
  EstimatedDateArrival: string | null
  MeasurementUnit: string
  UnitMultiplier: number
  InformationSource: string | null
  ModalType: string | null
  KeyWords?: string | null
  ReleaseDate?: string | null
  ProductIsVisible?: boolean
  ShowIfNotAvailable?: boolean
  IsProductActive?: boolean
  ProductFinalScore?: number
}

export type Dimension = {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}

export type RealDimension = {
  realCubicWeight: number
  realHeight: number
  realLength: number
  realWeight: number
  realWidth: number
}

export type Attachment = {
  Id: number
  Name: string
  Keys: string[]
  Fields: {
  FieldName: string
  MaxCaracters: string
  DomainValues: string | null
}[]
  IsActive: boolean
  IsRequired: boolean
}

export type SkuSeller = {
  SellerId: string
  StockKeepingUnitId: number
  SellerStockKeepingUnitId: string
  IsActive: boolean
  FreightCommissionPercentage: number
  ProductCommissionPercentage: number
}

export type Image = {
  ImageUrl: string
  ImageName: string | null
  FileId: number
}

export type SkuSpecification = {
  FieldId: number
  FieldName: string
  FieldValueIds: number[]
  FieldValues: string[]
}

export type ProductSpecification = {
  FieldId: number
  FieldName: string
  FieldValueIds: number[]
  FieldValues: string[]
}

export type AlternateIds = {
  Ean?: string
  RefId?: string
}

export type GetSKUAltID = {
  Id: number
  ProductId: number
  NameComplete: string
  ComplementName?: string
  ProductName: string
  ProductDescription: string
  ProductRefId?: string
  TaxCode?: string
  SkuName: string
  IsActive: boolean
  IsTransported: boolean
  IsInventoried: boolean
  IsGiftCardRecharge: boolean
  ImageUrl: string
  DetailUrl: string
  CSCIdentification: string | null
  BrandId: string
  BrandName: string
  Dimension: Dimension
  RealDimension: RealDimension
  ManufacturerCode: string
  IsKit: boolean
  KitItems: string[]
  Services: string[]
  Categories: string[]
  CategoriesFullPath?: string[]
  Attachments: Attachment[]
  Collections: string[]
  SkuSellers: SkuSeller[]
  SalesChannels: number[]
  Images: Image[]
  SkuSpecifications: SkuSpecification[]
  ProductSpecifications: ProductSpecification[]
  ProductClustersIds: string
  PositionsInClusters?: {
  [key: string]: number
}
  ProductClusterNames?: {
  [key: string]: string
}
  ProductClusterHighlights?: {
  [key: string]: string
}
  ProductCategoryIds: string
  IsDirectCategoryActive?: boolean
  ProductGlobalCategoryId: number | null
  ProductCategories: {
  [key: string]: string
}
  CommercialConditionId: number
  RewardValue: number
  AlternateIds: AlternateIds
  AlternateIdValues: string[]
  EstimatedDateArrival: string | null
  MeasurementUnit: string
  UnitMultiplier: number
  InformationSource: string | null
  ModalType: string | null
  KeyWords?: string | null
  ReleaseDate?: string | null
  ProductIsVisible?: boolean
  ShowIfNotAvailable?: boolean
  IsProductActive?: boolean
  ProductFinalScore?: number
}

export type SkulistbyProductId = {
  IsPersisted?: boolean
  IsRemoved?: boolean
  Id?: number
  ProductId?: number
  IsActive?: boolean
  Name?: string
  Height?: number
  RealHeight?: number | null
  Width?: number
  RealWidth?: number | null
  Length?: number
  RealLength?: number | null
  WeightKg?: number | null
  RealWeightKg?: number | null
  ModalId?: number
  RefId?: string
  CubicWeight?: number
  IsKit?: boolean
  IsDynamicKit?: string | null
  InternalNote?: string | null
  DateUpdated?: string
  RewardValue?: number | null
  CommercialConditionId?: number
  EstimatedDateArrival?: string | null
  FlagKitItensSellApart?: boolean
  ManufacturerCode?: string
  ReferenceStockKeepingUnitId?: string | null
  Position?: number
  ActivateIfPossible?: boolean
  MeasurementUnit?: string
  UnitMultiplier?: number
  IsInventoried?: boolean | null
  IsTransported?: boolean | null
  IsGiftCardRecharge?: boolean | null
  ModalType?: string | null
  isKitOptimized?: boolean
}

export type CreateSellerRequest = {
  SellerId: string
  Name: string
  Email: string
  Description: string
  ExchangeReturnPolicy: string
  DeliveryPolicy: string
  UseHybridPaymentOptions: boolean
  UserName: string
  Password: string
  SecutityPrivacyPolicy: string
  CNPJ: string
  CSCIdentification: string
  ArchiveId: number
  UrlLogo: string
  ProductCommissionPercentage: number
  FreightCommissionPercentage: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint: string
  CatalogSystemEndpoint: string
  IsActive: boolean
  MerchantName?: string
  FulfillmentSellerId: number
  SellerType: number
  IsBetterScope: boolean
  TrustPolicy?: string
}

export type UpdateSellerRequest = {
  SellerId: string
  Name: string
  Email: string
  Description: string
  ExchangeReturnPolicy: string
  DeliveryPolicy: string
  UseHybridPaymentOptions: boolean
  UserName: string
  Password: string
  SecutityPrivacyPolicy: string
  CNPJ: string
  CSCIdentification: string
  ArchiveId: number
  UrlLogo: string
  ProductCommissionPercentage: number
  FreightCommissionPercentage: number
  CategoryCommissionPercentage?: string
  FulfillmentEndpoint: string
  CatalogSystemEndpoint: string
  IsActive: boolean
  MerchantName?: string
  FulfillmentSellerId: number
  SellerType: number
  IsBetterScope: boolean
  TrustPolicy?: string
}

export type CategorySpecification = {
  Name?: string
  CategoryId?: number
  FieldId?: number
  IsActive?: boolean
  IsStockKeepingUnit?: boolean
}[]

export type SpecificationsGroup = {
  CategoryId: number | null
  Id: number
  Name: string
  Position: number | null
}

export type SkuComplement = {
  Id?: number
  SkuId?: number
  ParentSkuId?: number
  ComplementTypeId?: 1 | 2 | 3 | 4 | 5
}[]

export type SkuKit = {
  Id?: number
  StockKeepingUnitParent?: number
  StockKeepingUnitId?: number
  Quantity?: number
  UnitPrice?: number
}

export type SKUSpecificationResponse = {
  Id?: number
  SkuId?: number
  FieldId?: number
  FieldValueId?: number
  Text?: string
}

export type SKUService = {
  Id?: number
  SkuServiceTypeId?: number
  SkuServiceValueId?: number
  SkuId?: number
  Name?: string
  Text?: string
  IsActive?: boolean
}

export type SKUServiceTypeRequest = {
  Name: string
  IsActive: boolean
  ShowOnProductFront: boolean
  ShowOnCartFront: boolean
  ShowOnAttachmentFront: boolean
  ShowOnFileUpload: boolean
  IsGiftCard: boolean
  IsRequired: boolean
}

export type SKUServiceTypeResponse = {
  Id?: number
  Name?: string
  IsActive?: boolean
  ShowOnProductFront?: boolean
  ShowOnCartFront?: boolean
  ShowOnAttachmentFront?: boolean
  ShowOnFileUpload?: boolean
  IsGiftCard?: boolean
  IsRequired?: boolean
}

export type SKUServiceValueRequest = {
  SkuServiceTypeId: number
  Name: string
  Value: number
  Cost: number
}

export type SKUServiceValueResponse = {
  Id?: number
  SkuServiceTypeId: number
  Name: string
  Value: number
  Cost: number
}

export type BrandCreateUpdateRequest = {
  Id: number
  Name: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  AdWordsRemarketingCode?: string | null
  LomadeeCampaignCode?: string | null
  Score?: number | null
  MenuHome?: boolean
  Active?: boolean
  LinkId?: string | null
}

export type BrandCreateUpdate = {
  Id: number
  Name: string
  Text?: string
  Keywords?: string
  SiteTitle?: string
  AdWordsRemarketingCode?: string
  LomadeeCampaignCode?: string
  Score?: number | null
  MenuHome?: boolean
  Active?: boolean
  LinkId?: string | null
}

export type BrandGet = {
  id: number
  name: string
  isActive: boolean
  title: string
  metaTagDescription: string
  imageUrl: string | null
}

export type AttachmentResponse = {
  Id: number
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: {
  FieldName?: string
  MaxCaracters?: string
  DomainValues?: string
}[]
}

export type AttachmentRequest = {
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: {
  FieldName?: string
  MaxCaracters?: string
  DomainValues?: string
}[]
}

export type SupplierRequest = {
  Name: string
  CorporateName: string
  StateInscription: string
  Cnpj: string
  Phone: string
  CellPhone: string
  CorportePhone: string
  Email: string
  IsActive: boolean
}

export type SupplierResponse = {
  Id?: number
  Name?: string
  CorporateName?: string
  StateInscription?: string
  Cnpj?: string
  Phone?: string
  CellPhone?: string
  CorportePhone?: string
  Email?: string
  IsActive?: boolean
}

export type ProductAssortment = {
  Id?: number
  Name?: string
  CreatedAt?: string
  UpdatedAt?: string
  IncludedCollections?: number[]
  ExcludedCollections?: number[]
}

export type AssortmentCollectionAssociation = {
  assortmentId?: number
  collectionId?: number
}

export type ErrorResponse = {
  Message?: string
}
