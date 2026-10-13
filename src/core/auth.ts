import { VtexUsageError } from './errors.js'
import { isValidHeaderValue } from './headers.js'
import type { VtexClientConfig } from './types.js'

/** Validates a credential without ever echoing it. */
function credential(name: string, value: unknown): string {
  if (typeof value !== 'string' || value === '' || !isValidHeaderValue(value)) {
    throw new VtexUsageError(`${name} must be a non-empty string without control characters`)
  }
  return value
}

export function buildAuthHeaders(config: VtexClientConfig): Record<string, string> {
  if (config.appKey !== undefined || config.appToken !== undefined) {
    if (!config.appKey || !config.appToken) {
      throw new VtexUsageError('Both appKey and appToken are required for app-key authentication')
    }
    return {
      'X-VTEX-API-AppKey': credential('appKey', config.appKey),
      'X-VTEX-API-AppToken': credential('appToken', config.appToken),
    }
  }
  if (config.authCookie !== undefined) {
    return { VtexIdclientAutCookie: credential('authCookie', config.authCookie) }
  }
  throw new VtexUsageError('No VTEX credentials provided: supply appKey/appToken or authCookie')
}
