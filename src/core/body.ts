import { VtexUsageError } from './errors.js'

const FORM_URLENCODED = 'application/x-www-form-urlencoded'
const DEFAULT_CONTENT_TYPE = 'application/json'

/** "Application/JSON; charset=utf-8" -> "application/json" */
export function mediaType(contentType: string): string {
  return contentType.split(';', 1)[0].trim().toLowerCase()
}

/** application/json, application/problem+json, application/vnd.vtex.giftcard.v1+json, ... */
export function isJsonContentType(contentType: string): boolean {
  return /^application\/(?:[a-z0-9.!#$&^_-]+\+)?json$/.test(mediaType(contentType))
}

export interface SerializedBody {
  body: RequestInit['body']
  /** undefined means "no body" or "let fetch decide" (FormData sets its own multipart boundary). */
  contentType: string | undefined
}

/** Object.prototype.toString tag, so FormData/Blob/... from another realm or library are recognized too. */
function tagOf(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * Serializes a request body for fetch. Precedence:
 * - FormData is sent as is with no Content-Type, so fetch adds the multipart boundary.
 * - URLSearchParams, Blob/File and binary buffers are sent as is; a declared content type wins.
 * - JSON content types (the default): JSON.stringify, so a string becomes a JSON string value.
 * - application/x-www-form-urlencoded: strings pass through; flat objects of primitives become fields.
 * - Any other content type: only strings are accepted.
 * Anything that cannot be sent faithfully throws VtexUsageError before a request is made.
 */
export function serializeBody(body: unknown, contentType?: string): SerializedBody {
  if (body === undefined) return { body: undefined, contentType: undefined }
  const tag = tagOf(body)
  if (tag === 'FormData') return { body: body as FormData, contentType: undefined }
  if (tag === 'URLSearchParams') return { body: body as URLSearchParams, contentType: contentType || FORM_URLENCODED }
  if (tag === 'Blob' || tag === 'File') {
    return { body: body as Blob, contentType: contentType || (body as Blob).type || 'application/octet-stream' }
  }
  if (tag === 'ArrayBuffer' || ArrayBuffer.isView(body)) {
    return { body: body as ArrayBuffer, contentType: contentType || 'application/octet-stream' }
  }
  if (tag === 'ReadableStream') throw new VtexUsageError('Streaming request bodies are not supported')
  const declared = contentType || DEFAULT_CONTENT_TYPE
  if (isJsonContentType(declared)) return { body: toJson(body, declared), contentType: declared }
  if (mediaType(declared) === FORM_URLENCODED) {
    return { body: typeof body === 'string' ? body : toForm(body), contentType: declared }
  }
  if (typeof body === 'string') return { body, contentType: declared }
  throw new VtexUsageError(`Cannot send a ${tag} body as ${declared}`)
}

function toJson(body: unknown, contentType: string): string {
  let text: string | undefined
  try {
    text = JSON.stringify(body)
  } catch (cause) {
    throw new VtexUsageError(`Request body cannot be serialized as ${contentType}`, { cause })
  }
  if (text === undefined) throw new VtexUsageError(`Request body cannot be serialized as ${contentType}`)
  return text
}

function toForm(body: unknown): URLSearchParams {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new VtexUsageError('A form-urlencoded body must be a string, URLSearchParams or a flat object')
  }
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined) continue
    if (value === null || typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol') {
      throw new VtexUsageError(`Form field ${JSON.stringify(key)} must be a string, number or boolean`)
    }
    params.append(key, String(value))
  }
  return params
}
