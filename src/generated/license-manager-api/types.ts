export type AccountResponse = {
  isActive?: boolean
  id?: string
  name?: string
  accountName?: string
  lv?: string
  isOperating?: boolean
  defaultUrl?: string
  district?: string
  country?: string
  complement?: string
  companyName?: string
  cnpj?: string
  haveParentAccount?: boolean
  parentAccountId?: string
  parentAccountName?: string
  city?: string
  address?: string
  logo?: string
  hasLogo?: boolean
  number?: string
  postalCode?: string
  state?: string
  telephone?: string
  tradingName?: string
  licenses?: LicenseItems[]
  sponsor?: {
  name?: string
  email?: string
  phone?: string
}
  contact?: {
  name?: string
  email?: string
  phone?: string
}
  operationDate?: string
  inactivationDate?: string
  creationDate?: string
  hosts?: string[]
  sites?: SiteItems[]
  appKey?: {
  token?: string
  name?: string
}
  appKeys?: AppKeyItems[]
}

export type LicenseItems = {
  expiration?: string
  id?: number
  isPurchased?: boolean
  products?: {
  id?: number
  name?: string
  domains?: string[]
  endpoints?: {
  webApiUrl?: string
  consoleUrl?: string
}
}[]
  name?: string
}

export type SiteItems = {
  id?: number
  name?: string
  tradingName?: string
  LV?: string
  logo?: string
  monetaryUnitId?: number
  domains?: string[]
  hosts?: string[]
  aliases?: string[]
}

export type AppKeyItems = {
  id?: string
  appKey?: string
  appToken?: string
  label?: string
  createdIn?: string
  isActive?: boolean
  isBlocked?: boolean
}

export type CreateUserRequest = {
  name?: string
  email: string
}

export type CreatenewappkeyRequest = {
  label: string
}

export type CreatenewappkeyResponse = {
  id: string
  appKey: string
  appToken: string
  label: string
  createdIn: string
  isActive: boolean
}

export type UpdateappkeyRequest = {
  isActive: boolean
}

export type Getappkeysfromaccount = {
  id: string
  appKey: string
  label: string
  createdIn: string
  isActive: boolean
}

export type ListUsersResponse = {
  items?: UserItems[]
  paging?: Paging
}

export type ListRolesResponse = {
  items?: RoleItems[]
  paging?: Paging
}

export type Paging = {
  page: number
  perPage: number
  total: number
  pages: number
}

export type UserItems = {
  id?: string
  email?: string
  isAdmin?: boolean
  isReliable?: boolean
  isBlocked?: boolean
  roles?: string[]
  accountNames?: string[]
  name?: string
}

export type RoleItems = {
  id?: number
  isAdmin?: boolean
  roleType?: number
  products?: ProductItems[]
  resources?: string
  logins?: string
  name?: string
}

export type ProductItems = {
  id?: string
  categoryId?: string
  categoryName?: string
  description?: string
  consoleUrlMask?: string
  urlConfiguration?: string
  webApiUrlMask?: string
  url?: string
  productResources?: string
  name?: string
}

export type StoreItems = {
  id?: number
  name?: string
  hosts?: string[]
}

export type VLMError = {
  Details?: string
  HttpStatusCode?: number
  VLMErrorCode?: number
  Message?: string
}
