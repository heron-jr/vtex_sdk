export type Account = {
  name: string
  accountName: string
  isOperating: boolean
  defaultUrl: string
  district: string
  country: string
  complement: string
  companyName: string
  cnpj: string
  city: string
  address: string
  number: string
  postalCode: string
  state: string
  telephone: string
  tradingName: string
}

export type Address = {
  postalCode: string
  country: Country
  subregion1: Subregion1
  subregion2: Subregion2
  subregion3: Subregion3
  street: string
  number: string
  complement: string
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
}

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
  fantasyName: string
  stateRegistration: string
  id: string
  name: string
  address: Address
  email: string
  phone: string
}

export type Carrier = {
  cnpj: string
  fantasyName: string
  stateRegistration: string
  id: string
  name: string
  address: Address
  email: string
  phone: string
}

export type TrackingEventsRequest = {
  trackingNumber: string
}
