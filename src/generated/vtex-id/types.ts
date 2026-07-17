export type Credentials = {
  appkey: string
  apptoken: string
}

export type ValidateSessionResponse = {
  authStatus?: "Success" | "InvalidEmail" | "InvalidToken" | "WrongCredentials"
  promptMFA?: boolean
  lastAttemptAvailable?: number
  clientToken?: string
  authCookie?: {
  Name?: string
  Value?: string
}
  accountAuthCookie?: {
  Name?: string
  Value?: string
}
  expiresIn?: number
  userId?: string
  phoneNumber?: string
  scope?: string
}
