export type CreateEditSessionRequest = {
  public: {
  additionalProperties?: {
  value?: string
}
  [key: string]: unknown
}
}

export type CreateEditSessionResponse = {
  sessionToken?: string
  segmentToken?: string
}

export type GetSessionResponse = {
  id?: string
  namespaces?: {
  account?: {
  id?: {
  value?: string
  keepAlive?: boolean
}
  accountName?: {
  value?: string
}
}
  store?: {
  channel?: {
  value?: string
}
  countryCode?: {
  value?: string
}
  cultureInfo?: {
  value?: string
}
  currencyCode?: {
  value?: string
}
  currencySymbol?: {
  value?: string
}
  channelPrivacy?: {
  value?: string
}
}
  public?: {
  [key: string]: {
  value?: string
}
}
  checkout?: {
  regionId?: {
  value?: string
}
}
}
}

export type Segment = {
  campaigns?: string | null
  channel?: string
  priceTables?: string | null
  regionId?: string
  utm_campaign?: string | null
  utm_source?: string | null
  utmi_campaign?: string | null
  currencyCode?: string
  currencySymbol?: string
  countryCode?: string
  cultureInfo?: string
  channelPrivacy?: string
}
