export class VtexRequestError extends Error {
  readonly status: number
  readonly body: unknown
  readonly requestId?: string
  readonly retryAfter?: number

  constructor(message: string, opts: { status: number; body: unknown; requestId?: string; retryAfter?: number }) {
    super(message)
    this.name = new.target.name
    this.status = opts.status
    this.body = opts.body
    this.requestId = opts.requestId
    this.retryAfter = opts.retryAfter
  }
}

export class VtexAuthError extends VtexRequestError {}
export class VtexNotFoundError extends VtexRequestError {}
export class VtexValidationError extends VtexRequestError {}
export class VtexRateLimitError extends VtexRequestError {}
export class VtexServerError extends VtexRequestError {}

function parseRetryAfter(headers: Headers): number | undefined {
  const raw = headers.get('Retry-After')
  if (!raw) return undefined
  const n = Number(raw)
  return Number.isFinite(n) ? n : undefined
}

export function mapResponseToError(status: number, body: unknown, headers: Headers): VtexRequestError {
  const requestId = headers.get('x-request-id') ?? headers.get('x-vtex-request-id') ?? undefined
  const retryAfter = parseRetryAfter(headers)
  const base = { status, body, requestId, retryAfter }
  const msg = `VTEX request failed with status ${status}`
  if (status === 401 || status === 403) return new VtexAuthError(msg, base)
  if (status === 404) return new VtexNotFoundError(msg, base)
  if (status === 400 || status === 422) return new VtexValidationError(msg, base)
  if (status === 429) return new VtexRateLimitError(msg, base)
  if (status >= 500) return new VtexServerError(msg, base)
  return new VtexRequestError(msg, base)
}
