import { VtexUsageError } from './errors.js'
import { isValidHeaderValue } from './headers.js'
import type { VtexClientConfig } from './types.js'

/** undefined, null and '' count as "not configured" (e.g. a blank env var). */
function isSet(value: unknown): boolean {
  return value !== undefined && value !== null && value !== ''
}

/**
 * Validates a credential without ever echoing it. Leading/trailing HTTP whitespace is
 * stripped first, as fetch does for header values, so a secret file's trailing newline works.
 */
function credential(name: string, value: unknown): string {
  const trimmed = typeof value === 'string' ? value.replace(/^[\t\n\r ]+|[\t\n\r ]+$/g, '') : undefined
  if (trimmed === undefined || trimmed === '' || !isValidHeaderValue(trimmed)) {
    throw new VtexUsageError(`${name} must be a non-empty string without control characters`)
  }
  return trimmed
}

export function buildAuthHeaders(config: VtexClientConfig): Record<string, string> {
  if (isSet(config.appKey) || isSet(config.appToken)) {
    if (!isSet(config.appKey) || !isSet(config.appToken)) {
      throw new VtexUsageError('Both appKey and appToken are required for app-key authentication')
    }
    return {
      'X-VTEX-API-AppKey': credential('appKey', config.appKey),
      'X-VTEX-API-AppToken': credential('appToken', config.appToken),
    }
  }
  if (isSet(config.authCookie)) {
    return { VtexIdclientAutCookie: credential('authCookie', config.authCookie) }
  }
  throw new VtexUsageError('No VTEX credentials provided: supply appKey/appToken or authCookie')
}
