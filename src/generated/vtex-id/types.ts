export type Credentials = {
  appkey: string
  apptoken: string
}

export type ValidateSessionResponse = {
  authStatus?: "Success" | "InvalidEmail" | "InvalidToken" | "WrongCredentials"
  promptMFA?: boolean
  lastAttemptAvailable?: number | null
  clientToken?: string | null
  authCookie?: {
  Name?: string
  Value?: string
} | null
  accountAuthCookie?: {
  Name?: string
  Value?: string
} | null
  expiresIn?: number
  userId?: string | null
  phoneNumber?: string | null
  scope?: string | null
}
