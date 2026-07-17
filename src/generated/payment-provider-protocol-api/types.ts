export type Success = {
  paymentMethods: string[]
}

export type SuccessManifest = {
  paymentMethods: {
  name: string
  allowsSplit: "onAuthorize" | "onCapture" | "disabled"
}[]
  customFields?: {
  name?: string
  type?: "text" | "password" | "select"
  options?: {
  text?: string
  value?: string
}[]
}[]
  autoSettleDelay?: {
  minimum: string
  maximum: string
}
  metadataFields?: string[]
}

export type SuccessApproved = {
  paymentId: string
  status: string
  authorizationId: string
  bankIssueInvoiceId?: string
  paymentUrl?: string
  paymentAppData?: {
  appName: string
  payload: string
}
  identificationNumber?: string
  identificationNumberFormatted?: string
  barCodeImageType?: string
  barCodeImageNumber?: string
  tid: string
  nsu: string
  acquirer: string
  redirectUrl?: string
  code?: string
  message?: string
  delayToAutoSettle: number
  delayToAutoSettleAfterAntifraud: number
  delayToCancel: number
  maxValue?: number
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type FailBadRequest = {
  status: string
  code: string
  message: string
}

export type CancelPaymentRequest = {
  paymentId: string
  requestId: string
  authorizationId: string
  tid?: string
  transactionId?: string
  value?: number
  nsu?: string
  sandboxMode?: boolean
  merchantSettings?: {
  name: string
  value: string
}[]
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type Success1 = {
  paymentId: string
  cancellationId: string
  code: string
  message: string
  requestId: string
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type FailGenericError1 = {
  paymentId: string
  cancellationId: string
  code: string
  message: string
  requestId: string
}

export type Success2 = {
  paymentId: string
  settleId: string
  value: number
  code: string
  message: string
  requestId: string
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type FailGenericError2 = {
  paymentId: string
  settleId: string
  value: number
  code: string
  message: string
  requestId: string
}

export type Success3 = {
  paymentId: string
  refundId: string
  value: number
  code: string
  message: string
  requestId: string
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type FailGenericError3 = {
  paymentId: string
  refundId: string
  value: number
  code: string
  message: string
  requestId: string
}

export type SettlePayment = {
  transactionId: string
  requestId: string
  paymentId: string
  value: number
  authorizationId: string
  tid?: string
  nsu?: string
  recipients?: {
  id: string
  name: string
  documentType: string
  document: string
  role: string
  chargeProcessingFee?: boolean
  chargebackLiable?: boolean
  amount: number
  commissionAmount?: number
}[]
  sandboxMode?: boolean
  merchantSettings?: {
  name: string
  value: string
}[]
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type RefundPayment = {
  requestId: string
  settleId: string
  paymentId: string
  tid: string
  value: number
  transactionId: string
  authorizationId?: string
  nsu?: string
  recipients?: {
  id: string
  name: string
  documentType: string
  document: string
  role: string
  chargeProcessingFee?: boolean
  chargebackLiable?: boolean
  amount: number
  comissionAmount?: number
}[]
  sandboxMode?: boolean
  merchantSettings?: {
  name: string
  value: string
}[]
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type InboundRequestBETARequest = {
  requestId: string
  transactionId: string
  paymentId: string
  authorizationId: string
  nsu: string
  tid: string
  requestData: RequestData
  merchantSettings?: {
  name: string
  value: string
}[]
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type RequestData = {
  body: string
}

export type Success4 = {
  requestId: string
  paymentId: string
  code?: string
  message?: string
  responseData: ResponseData
  connectorMetadata?: {
  name: string
  value: string
}[]
}

export type ResponseData = {
  statusCode: number
  contentType: string
  content: string
}

export type CreateAuthorizationTokenRequest = {
  applicationId: string
  returnUrl: string
}

export type Success5 = {
  applicationId: string
  token: string
}

export type Success6 = {
  applicationId: string
  appKey: string
  appToken: string
}
