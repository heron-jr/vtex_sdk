export type ErrorResponse = {
  message?: string
}

export type OrganizationUnit = {
  id?: string
  name?: string
  path?: {
  ids?: string
}
  createdAt?: string
  updatedAt?: string
}

export type ScopeResponse = {
  scope?: string
  ids?: string[]
}

export type ScopeValuesRequest = {
  ids: string[]
}

export type ScopeOperationResponse = {
  organizationUnitId?: string
  scope?: string
  ids?: string[]
}

export type UnitDto = {
  id?: string
  name?: string
}
