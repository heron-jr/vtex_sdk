import { parseRetryAfterMs } from './retry.js'

/** Base class of every error thrown by the SDK. */
export class VtexError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = new.target.name
  }
}

/** VTEX answered with a non-2xx HTTP status. */
export class VtexRequestError extends VtexError {
  readonly status: number
  /** Parsed response body. Non-enumerable, so default serializers do not log it (it may contain PII). */
  declare readonly body: unknown
  readonly requestId?: string
  /** Seconds to wait, from the Retry-After header (delta-seconds or HTTP-date). */
  readonly retryAfter?: number

  constructor(message: string, opts: { status: number; body: unknown; requestId?: string; retryAfter?: number }) {
    super(message)
    this.status = opts.status
    Object.defineProperty(this, 'body', { value: opts.body, enumerable: false, writable: false, configurable: true })
    this.requestId = opts.requestId
    this.retryAfter = opts.retryAfter
  }
}

export class VtexAuthError extends VtexRequestError {}
export class VtexNotFoundError extends VtexRequestError {}
export class VtexValidationError extends VtexRequestError {}
export class VtexRateLimitError extends VtexRequestError {}
export class VtexServerError extends VtexRequestError {}

/** The request never produced a usable HTTP response (DNS, connection, socket or body-read failure). */
export class VtexNetworkError extends VtexError {
  readonly method: string
  /** Request path without the query string. */
  readonly route: string
  readonly attempts: number

  constructor(message: string, opts: { cause: unknown; method: string; route: string; attempts: number }) {
    super(message, { cause: opts.cause })
    this.method = opts.method
    this.route = opts.route
    this.attempts = opts.attempts
  }
}

/** The per-attempt timeout elapsed and no retry was allowed or left. */
export class VtexTimeoutError extends VtexNetworkError {}

/** The SDK was called with an invalid argument or configuration; nothing was sent. */
export class VtexUsageError extends VtexError {}

/** A paginated facade reached a VTEX page limit while more results remained. */
export class VtexPaginationLimitError extends VtexError {}

/** VTEX answered 2xx with a body the SDK cannot interpret. */
export class VtexUnexpectedResponseError extends VtexError {
  declare readonly body: unknown

  constructor(message: string, body: unknown) {
    super(message)
    Object.defineProperty(this, 'body', { value: body, enumerable: false, writable: false, configurable: true })
  }
}

export function mapResponseToError(status: number, body: unknown, headers: Headers): VtexRequestError {
  const requestId = headers.get('x-request-id') ?? headers.get('x-vtex-request-id') ?? undefined
  const retryAfterMs = parseRetryAfterMs(headers.get('retry-after'))
  const retryAfter = retryAfterMs === undefined ? undefined : Math.ceil(retryAfterMs / 1000)
  const base = { status, body, requestId, retryAfter }
  const msg = `VTEX request failed with status ${status}`
  if (status === 401 || status === 403) return new VtexAuthError(msg, base)
  if (status === 404) return new VtexNotFoundError(msg, base)
  if (status === 400 || status === 422) return new VtexValidationError(msg, base)
  if (status === 429) return new VtexRateLimitError(msg, base)
  if (status >= 500) return new VtexServerError(msg, base)
  return new VtexRequestError(msg, base)
}
