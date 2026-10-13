const FORM_URLENCODED = 'application/x-www-form-urlencoded'

/** application/json, application/problem+json, application/vnd.vtex.giftcard.v1+json, … */
export function isJsonContentType(contentType: string): boolean {
  return /^application\/(?:[a-z0-9.!#$&^_-]+\+)?json(?:\s*;|\s*$)/i.test(contentType.trim())
}

export interface SerializedBody {
  body: RequestInit['body']
  /** undefined means "no body" or "let fetch decide" (FormData sets its own multipart boundary). */
  contentType: string | undefined
}

export function serializeBody(body: unknown, contentType = 'application/json'): SerializedBody {
  if (body === undefined) return { body: undefined, contentType: undefined }
  if (body instanceof FormData) return { body, contentType: undefined }
  if (body instanceof URLSearchParams) return { body, contentType: FORM_URLENCODED }
  if (body instanceof Blob) return { body, contentType: body.type || contentType }
  if (isJsonContentType(contentType)) return { body: JSON.stringify(body), contentType }
  if (contentType.toLowerCase().startsWith(FORM_URLENCODED)) {
    return { body: new URLSearchParams(body as Record<string, string>), contentType }
  }
  return { body: typeof body === 'string' ? body : String(body), contentType }
}
