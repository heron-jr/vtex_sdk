export type Example = {
  productId: string
  productName: string
  brand: string
  linkText: string
  productReference: string
  categories: string[]
  link: string
  description: string | null
  items: Item[]
}

export type Item = {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId?: ReferenceId[]
  measurementUnit: string
  unitMultiplier: number
  images: Image[]
  sellers: Seller[]
  COR?: string[]
  TAMANHO?: string[]
  variations?: string[]
}

export type ReferenceId = {
  Key: string
  Value: string
}

export type Image = {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string | null
}

export type Seller = {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

export type CommertialOffer = {
  DeliverySlaSamplesPerRegion: {
  [key: string]: GeneratedObject
}
  Installments: Installment[]
  DiscountHighLight: string[]
  GiftSkuIds: string[]
  Teasers: {
  "<Name>k__BackingField"?: string
  "<GeneralValues>k__BackingField"?: {
  [key: string]: string
}
  "<Conditions>k__BackingField"?: {
  "<MinimumQuantity>k__BackingField"?: number
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
  "<Effects>k__BackingField"?: {
  "<Parameters>k__BackingField"?: {
  "<Name>k__BackingField"?: string
  "<Value>k__BackingField"?: string
}[]
}
}[]
  PromotionTeasers?: {
  Name?: string
  GeneralValues?: {
  [key: string]: string
}
  Conditions?: {
  MinimumQuantity?: number
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
  Effects?: {
  Parameters?: {
  Name?: string
  Value?: string
}[]
}
}[]
  BuyTogether: string[]
  Price: number
  ListPrice: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  DeliverySlaSamples: DeliverySlaSample[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
}

export type GeneratedObject = {
  DeliverySlaPerTypes: DeliverySlaPerType[]
  Region: Region
}

export type DeliverySlaPerType = {
  TypeName: string
  Price: number
  EstimatedTimeSpanToDelivery: string
}

export type Region = {
  IsPersisted: boolean
  IsRemoved: boolean
  Id: number
  Name: string
  CountryCode: string
  ZipCode: string
  CultureInfoName: string
} | null

export type Installment = {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

export type DeliverySlaSample = {
  DeliverySlaPerTypes: DeliverySlaPerType2[]
  Region: Region2
}

export type DeliverySlaPerType2 = {
  TypeName?: string
  Price?: number
  EstimatedTimeSpanToDelivery?: string
}

export type Region2 = {
  IsPersisted?: boolean
  IsRemoved?: boolean
  Id?: number
  Name?: string
  CountryCode?: string
  ZipCode?: string
  CultureInfoName?: string
} | null

export type Example2 = {
  Departments: Department[]
  Brands: Brand[]
  SpecificationFilters: SpecificationFilters
  CategoriesTrees: CategoriesTree[]
}

export type Department = {
  Quantity: number
  Name: string
  Link: string
}

export type Brand = {
  Quantity: number
  Name: string
  Link: string
}

export type SpecificationFilters = {
  "Resolução": ResoluO[]
  "Tamanho da Tela": TamanhoDaTela[]
  "Aplicativos de TV": AplicativosDeTV[]
}

export type ResoluO = {
  Quantity: number
  Name: string
  Link: string
}

export type TamanhoDaTela = {
  Quantity: number
  Name: string
  Link: string
}

export type AplicativosDeTV = {
  Quantity: number
  Name: string
  Link: string
}

export type CategoriesTree = {
  Quantity: number
  Name: string
  Link: string
  Children: Child[]
}

export type Child = {
  Quantity: number
  Name: string
  Link: string
  Children: Child1[]
}

export type Child1 = {
  Quantity: number
  Name: string
  Link: string
  Children: string[]
}

export type Example3 = {
  itemsReturned: ItemsReturned[]
}

export type ItemsReturned = {
  thumb: string
  name: string
  href: string
  criteria: string | null
}
