export type UserIdentification = {
  anonymous: string
  session: string
}

export type SessionPing = {
  session: Session
  anonymous: Anonymous
  type: string
  agent: string
  device?: "mobile" | "desktop"
  ab?: string
  vtexSession?: string
  vtexMac?: string
}

export type PageCart = {
  session: Session
  anonymous: Anonymous
  products: CartProduct[]
  type: string
}

export type PageEmptyCart = {
  session: Session
  anonymous: Anonymous
  products: CartProduct[]
  type: string
}

export type PageConfirmation = {
  session: Session
  anonymous: Anonymous
  products: OrderProduct[]
  order: string
  type: string
}

export type Click = {
  type: string
  product: string
  position: number
  page?: string
  clickType?: string
  url?: string
  text: string
  agent?: string
  device?: "mobile" | "desktop"
  ab?: string
  vtexSession?: string
  vtexMac?: string
  anonymous: Anonymous
  session: Session
}

export type Query = {
  session: Session
  anonymous: Anonymous
  url?: string
  agent?: string
  device?: "mobile" | "desktop"
  ab?: string
  vtexSession?: string
  vtexMac?: string
  type: string
  text: string
  misspelled?: boolean | null
  match?: number
  products?: string[] | {
  id: string
  local: number
  global: number
}[]
  page?: number
  count?: number
  locale?: string
  operator: "and" | "or"
}

export type AutocompleteClick = {
  type: string
  product: string
  position: number
  page?: string
  clickType?: string
  url?: string
  text: string
  agent?: string
  device?: "mobile" | "desktop"
  ab?: string
  vtexSession?: string
  vtexMac?: string
  anonymous: Anonymous
  session: Session
}

export type AutocompleteQuery = {
  session: Session
  anonymous: Anonymous
  url?: string
  agent?: string
  device?: "mobile" | "desktop"
  ab?: string
  vtexSession?: string
  vtexMac?: string
  type: string
  text: string
  misspelled?: boolean | null
  match?: number
  products?: string[] | {
  id: string
  local: number
  global: number
}[]
  page?: number
  count?: number
  locale?: string
  operator: "and" | "or"
}

export type CartProduct = {
  product: string
  quantity: number
}

export type OrderProduct = {
  product: string
  price?: number
  quantity: number
}

export type Session = unknown

export type Anonymous = unknown
