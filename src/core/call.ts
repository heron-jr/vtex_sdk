import type { CallOptions, RequestOptions } from './types.js'

export { encodePathParam } from './url.js'

/** Merges per-call options into a request description built by a generated method or facade. */
export function withCall(base: RequestOptions, opts?: CallOptions): RequestOptions {
  if (!opts) return base
  return {
    ...base,
    headers: opts.headers ? { ...base.headers, ...opts.headers } : base.headers,
    signal: opts.signal ?? base.signal,
    timeoutMs: opts.timeoutMs ?? base.timeoutMs,
    retry: opts.retry ?? base.retry,
    idempotent: opts.idempotent ?? base.idempotent,
  }
}
