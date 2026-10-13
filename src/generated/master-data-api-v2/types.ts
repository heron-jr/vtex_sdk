export type DocumentRequest = {
  [key: string]: unknown
}

export type UsingFieldsAll = {
  id: string
  accountId: string
  accountName: string
  dataEntityId: string
}

export type SaveschemabynameRequest = {
  properties: {
  name?: {
  type: "array" | "boolean" | "integer" | "number" | "object" | "string"
}
}
  "v-indexed"?: string[]
}

export type GetSchemasResponse = {
  name: string
  schema: {
  properties?: {
  name?: {
  type: "array" | "boolean" | "integer" | "number" | "object" | "string"
}
}
}
}

export type Properties = {
  name: Name
}

export type Name = {
  type: "array" | "boolean" | "integer" | "number" | "object" | "string"
}

export type PutindicesRequest = {
  name: string
  multiple: boolean
  fields: string
}

export type Index = {
  name?: string
  acronym?: string
  isGlobal?: boolean
  multiple?: boolean
  fields?: string
}

export type Listversion = {
  id: string
  date: string
  document?: {
  id?: string
  dataEntityId?: string
  isNewsletterOptIn?: boolean | null
  createdBy?: string
}
}

export type Getversion = {
  id: string
  author: string
  document: Document
}

export type Document = {
  id: string
  dataEntityId: string
  accountId: string
  accountName: string
  followers: string[]
  schemas?: string[]
  email?: string
}

export type CreateDocumentResponse = {
  Id: string
  Href: string
  DocumentId: string
}

export type DocumentResponse = {
  Id: string
  Href: string
}
