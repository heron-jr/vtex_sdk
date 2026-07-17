import type { VtexClientConfig } from './types.js'

export function buildAuthHeaders(config: VtexClientConfig): Record<string, string> {
  if (config.appKey || config.appToken) {
    if (!config.appKey || !config.appToken) {
      throw new Error('Both appKey and appToken are required for app-key authentication')
    }
    return {
      'X-VTEX-API-AppKey': config.appKey,
      'X-VTEX-API-AppToken': config.appToken,
    }
  }
  if (config.authCookie) {
    return { VtexIdclientAutCookie: config.authCookie }
  }
  throw new Error('No VTEX credentials provided: supply appKey/appToken or authCookie')
}
