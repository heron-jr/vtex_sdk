import { VtexUsageError } from './errors.js'

/** RFC 9110 token characters. */
const HEADER_NAME_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/
/** Field values: tab, visible ASCII and Latin-1; never CR, LF or NUL. */
const HEADER_VALUE_RE = /^[\t\x20-\x7E\x80-\xFF]*$/

export function isValidHeaderName(name: string): boolean {
  return HEADER_NAME_RE.test(name)
}

export function isValidHeaderValue(value: string): boolean {
  return HEADER_VALUE_RE.test(value)
}

/** Throws VtexUsageError for an invalid header, naming the header but never echoing its value. */
export function assertHeader(name: string, value: string): void {
  if (!isValidHeaderName(name)) throw new VtexUsageError(`Invalid header name ${JSON.stringify(name)}`)
  if (!isValidHeaderValue(value)) throw new VtexUsageError(`Invalid value for header ${JSON.stringify(name)}`)
}

/** Sets a header, replacing any existing header with the same name in a different case. */
export function setHeader(headers: Record<string, string>, name: string, value: string): void {
  const lower = name.toLowerCase()
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === lower) delete headers[key]
  }
  headers[name] = value
}
