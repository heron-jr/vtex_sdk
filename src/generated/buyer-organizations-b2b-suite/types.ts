export type FileData = {
  accountName: string
  importId: string
  importState: string
  percentage: string
  lastUpdateDate: string
  fileName: string
}

export type ImportResult = {
  accountName: string
  importId: string
  importState: string
  percentage: string
  lastUpdateDate: string
  fileName: string
  importedAt: string
  importedUserEmail: string
  importedUserName: string
  importResult: {
  reportDownloadLink?: string
  imports?: {
  name?: string
  importedRows?: number
  rowsWithError?: number
}[]
}
}

export type ValidationResult = {
  accountName: string
  importId: string
  importState: string
  percentage: string
  lastUpdateDate: string
  fileName: string
  validationResult: {
  isValid?: boolean
  validationResult?: {
  name?: string
  validRows?: number
  invalidRows?: number
}[]
}
}
