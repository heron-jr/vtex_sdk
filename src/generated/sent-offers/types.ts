export type CreateChannel = {
  vendor: string
  name: string
  logo: string
}

export type CreateFeedRequest = {
  id: string
  affiliateId: string
  SalesChannels?: string
}

export type UpdateFeedRequest = {
  affiliateId: string
  salesChannels: string
}

export type CreateInteractionRequest = {
  startDate: string
  source: string
  origin: string
  context: string
}

export type CreateLogRequest = {
  description: string
  date: string
  type: string
  agent: string
  evidence: Evidence
  data: Data
  errors: Errors
}

export type Evidence = {
  request: string
  response: string
}

export type Data = {
  externalOfferId: string
  inventory: string
  salesPrice: string
  currency: string
  status: string
}

export type Errors = {
  code: string
  externalCode: string
  title: string
  description: string
  closableOrigins: unknown[]
}
