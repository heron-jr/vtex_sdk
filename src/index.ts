export { VtexClient } from './client.js'
export { createVtexFactory } from './factory.js'
export type { VtexFactoryConfig, VtexCreds } from './factory.js'
export type {
  VtexClientConfig, VtexEnvironment, VtexHooks, RequestOptions,
} from './core/types.js'
export {
  VtexRequestError, VtexAuthError, VtexNotFoundError,
  VtexValidationError, VtexRateLimitError, VtexServerError,
} from './core/errors.js'
export { VtexHttpClient } from './core/http.js'
export type { OrderListFilters } from './facades/orders.js'
export type { ScrollOptions } from './facades/master-data.js'
export const VERSION = '0.1.0'
