import { readFileSync } from 'node:fs'
import { describe, it, expect, expectTypeOf } from 'vitest'
import * as sdk from '../src/index.js'
import type { OrdersApiTypes, CallOptions } from '../src/index.js'

describe('public exports', () => {
  it('exports exactly the public runtime names', () => {
    // Pinned so internals can't leak into the package surface unnoticed.
    expect(Object.keys(sdk).sort()).toEqual([
      'DEFAULT_SERVER', 'ORDERS_MAX_PAGES', 'VERSION', 'VTEX_DOMAIN_ALLOWLIST', 'VtexAuthError', 'VtexClient',
      'VtexError', 'VtexHttpClient', 'VtexNetworkError', 'VtexNotFoundError', 'VtexPaginationLimitError',
      'VtexRateLimitError', 'VtexRequestError', 'VtexServerError', 'VtexTimeoutError', 'VtexUnexpectedResponseError',
      'VtexUsageError', 'VtexValidationError', 'createVtexFactory', 'encodePathParam',
    ])
  })

  it('reports the package version', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string }
    expect(sdk.VERSION).toBe(pkg.version)
  })

  it('exports encodePathParam for request() paths', () => {
    expect(sdk.encodePathParam('a/b c')).toBe('a%2Fb%20c')
  })

  it('exports the client, factory, and errors', () => {
    expect(typeof sdk.VtexClient).toBe('function')
    expect(typeof sdk.createVtexFactory).toBe('function')
    expect(typeof sdk.VtexRequestError).toBe('function')
    expect(typeof sdk.VtexRateLimitError).toBe('function')
  })

  it('exports the new error classes and security constants', () => {
    for (const name of [
      'VtexError', 'VtexNetworkError', 'VtexTimeoutError', 'VtexUsageError',
      'VtexPaginationLimitError', 'VtexUnexpectedResponseError',
    ] as const) {
      expect(typeof sdk[name]).toBe('function')
    }
    expect(sdk.DEFAULT_SERVER).toBe('https://{accountName}.{environment}.com.br')
    expect(sdk.VTEX_DOMAIN_ALLOWLIST).toContain('vtexcommercestable.com.br')
  })

  it('exports generated type namespaces and CallOptions', () => {
    expectTypeOf<OrdersApiTypes.HookFilter>().toHaveProperty('type')
    expectTypeOf<OrdersApiTypes.Headers>().toEqualTypeOf<{ [key: string]: string }>()
    expectTypeOf<CallOptions>().toHaveProperty('idempotent')
  })
})
