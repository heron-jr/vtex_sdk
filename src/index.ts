export { VtexClient } from './client.js'
export type { VtexRawResponse } from './client.js'
export { createVtexFactory } from './factory.js'
export type { VtexFactory, VtexFactoryConfig, VtexCreds } from './factory.js'
export type {
  VtexClientConfig, VtexEnvironment, VtexHooks, RequestOptions, CallOptions,
} from './core/types.js'
export {
  VtexError, VtexRequestError, VtexAuthError, VtexNotFoundError,
  VtexValidationError, VtexRateLimitError, VtexServerError,
  VtexNetworkError, VtexTimeoutError, VtexUsageError,
  VtexPaginationLimitError, VtexUnexpectedResponseError,
} from './core/errors.js'
export { VtexHttpClient } from './core/http.js'
export { DEFAULT_SERVER, VTEX_DOMAIN_ALLOWLIST, encodePathParam } from './core/url.js'
export { ORDERS_MAX_PAGES } from './facades/orders.js'
export type { OrderListFilters } from './facades/orders.js'
export type { ScrollOptions, MasterDataGetOptions } from './facades/master-data.js'
export type * from './generated/types-index.js'
export const VERSION = '0.3.0'
