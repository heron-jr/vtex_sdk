export type AccountResponse = {
  isActive?: boolean
  id?: string
  name?: string
  accountName?: string
  lv?: string | null
  isOperating?: boolean
  defaultUrl?: string | null
  district?: string | null
  country?: string | null
  complement?: string | null
  companyName?: string
  cnpj?: string | null
  haveParentAccount?: boolean
  parentAccountId?: string | null
  parentAccountName?: string | null
  city?: string | null
  address?: string | null
  logo?: string | null
  hasLogo?: boolean
  number?: string | null
  postalCode?: string | null
  state?: string | null
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
  operationDate?: string | null
  inactivationDate?: string | null
  creationDate?: string
  hosts?: string[]
  sites?: SiteItems[]
  appKey?: {
  token?: string | null
  name?: string | null
}
  appKeys?: AppKeyItems[]
}

export type LicenseItems = {
  expiration?: string | null
  id?: number
  isPurchased?: boolean
  products?: {
  id?: number
  name?: string
  domains?: string[]
  endpoints?: {
  webApiUrl?: string | null
  consoleUrl?: string | null
}
}[]
  name?: string
}

export type SiteItems = {
  id?: number
  name?: string
  tradingName?: string
  LV?: string | null
  logo?: string | null
  monetaryUnitId?: number
  domains?: string[] | null
  hosts?: string[]
  aliases?: string[]
}

export type AppKeyItems = {
  id?: string
  appKey?: string
  appToken?: string | null
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
  appToken: string | null
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
  resources?: string | null
  logins?: string | null
  name?: string
}

export type ProductItems = {
  id?: string | null
  categoryId?: string | null
  categoryName?: string | null
  description?: string | null
  consoleUrlMask?: string | null
  urlConfiguration?: string | null
  webApiUrlMask?: string | null
  url?: string | null
  productResources?: string | null
  name?: string
}

export type StoreItems = {
  id?: number
  name?: string
  hosts?: string[]
}

export type VLMError = {
  Details?: string | null
  HttpStatusCode?: number
  VLMErrorCode?: number
  Message?: string
}
