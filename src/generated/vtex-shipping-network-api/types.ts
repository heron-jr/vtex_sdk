export type Account = {
  name: string
  accountName: string
  isOperating: boolean
  defaultUrl: string | null
  district: string | null
  country: string
  complement: string | null
  companyName: string
  cnpj: string
  city: string | null
  address: string | null
  number: string | null
  postalCode: string | null
  state: string | null
  telephone: string | null
  tradingName: string
}

export type Address = {
  postalCode: string | null
  country: Country
  subregion1: Subregion1
  subregion2: Subregion2
  subregion3: Subregion3
  street: string
  number: string
  complement: string | null
  location: Location
}

export type Country = {
  code: string
  name: string
}

export type Subregion1 = {
  code: string
  name: string
}

export type Subregion2 = {
  code: string
  name: string
}

export type Subregion3 = {
  code: string
  name: string
}

export type Location = {
  lat: number
  lng: number
} | null

export type NotifyCarrierwithAppRequest = {
  account: Account
  email: string
  dispatchOrder: DispatchOrder
}

export type DispatchOrder = {
  id: string
  packageIds: string[]
  sender: Sender
  carrier: Carrier
}

export type Sender = {
  cnpj: string
  fantasyName: string | null
  stateRegistration: string | null
  id: string | null
  name: string
  address: Address
  email: string | null
  phone: string | null
}

export type Carrier = {
  cnpj: string
  fantasyName: string
  stateRegistration: string
  id: string
  name: string
  address: Address
  email: string
  phone: string | null
}

export type TrackingEventsRequest = {
  trackingNumber: string
}
