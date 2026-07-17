export type CreateEditSessionRequest = {
  public: {
  additionalProperties?: {
  value?: string
}
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
  public?: Record<string, unknown>
  checkout?: {
  regionId?: {
  value?: string
}
}
}
}

export type Segment = {
  campaigns?: string
  channel?: string
  priceTables?: string
  regionId?: string
  utm_campaign?: string
  utm_source?: string
  utmi_campaign?: string
  currencyCode?: string
  currencySymbol?: string
  countryCode?: string
  cultureInfo?: string
  channelPrivacy?: string
}
