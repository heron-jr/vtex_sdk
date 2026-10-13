export type PolicyActionGetResponse = {
  id?: string
  metadata?: {
  [key: string]: unknown
}
}

export type EvaluatePolicyRequest = {
  resource: string
  context: {
  [key: string]: unknown
}
}

export type PolicySaveRequest = {
  name: string
  description: string
  status?: string
  statements: StatementGet[]
}

export type PolicyGetResponse = {
  id?: string
  name?: string
  description?: string
  statements?: StatementGetResponse[]
}

export type StatementGet = {
  effect: string
  actions?: {
  id?: "SendSlackMessage" | "SendEmail" | "DeactivatePromotions"
  metadata?: {
  [key: string]: unknown
}
}[]
  resource?: string
  condition?: {
  operation?: "None" | "stringEquals" | "stringEqualsIgnoreCase" | "numericEquals" | "numericLessThan" | "numericLessThanEquals" | "numericGreaterThan" | "numericGreaterThanEquals" | "bool" | "not" | "or" | "and" | "dateTimeUtcGreaterThan" | "dateTimeUtcLessThan" | "between"
  conditions?: {
  conditions?: [] | ["stringEquals"] | ["numericGreaterThan"]
  operation?: "None" | "stringEquals" | "stringEqualsIgnoreCase" | "numericEquals" | "numericLessThan" | "numericLessThanEquals" | "numericGreaterThan" | "numericGreaterThanEquals" | "bool" | "not" | "or" | "and" | "dateTimeUtcGreaterThan" | "dateTimeUtcLessThan" | "between"
  key?: "skuId" | "brandId" | "discountPercentage"
  values?: string[]
}[]
}
}

export type StatementGetResponse = {
  effect: string
  actions?: {
  id?: "SendSlackMessage" | "SendEmail" | "DeactivatePromotions"
  metadata?: {
  [key: string]: unknown
}
}[]
  resource?: string
  condition?: {
  operation?: "None" | "stringEquals" | "stringEqualsIgnoreCase" | "numericEquals" | "numericLessThan" | "numericLessThanEquals" | "numericGreaterThan" | "numericGreaterThanEquals" | "bool" | "not" | "or" | "and" | "dateTimeUtcGreaterThan" | "dateTimeUtcLessThan" | "between"
  conditions?: {
  conditions?: [] | ["stringEquals"] | ["numericGreaterThan"]
  operation?: "None" | "stringEquals" | "stringEqualsIgnoreCase" | "numericEquals" | "numericLessThan" | "numericLessThanEquals" | "numericGreaterThan" | "numericGreaterThanEquals" | "bool" | "not" | "or" | "and" | "dateTimeUtcGreaterThan" | "dateTimeUtcLessThan" | "between"
  key?: "skuId" | "brandId" | "discountPercentage"
  values?: string[]
}[]
}
}
