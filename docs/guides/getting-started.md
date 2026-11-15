# Getting started

## Install

```bash
npm install github:heron-jr/vtex_sdk#v0.3.0
```

Pin a tag. Node.js 22.18+, 24.11+ or 26+ is required. The package has no runtime dependencies; npm builds
`dist/` through its `prepare` script.

## Credentials

The SDK authenticates with an app key and app token (`X-VTEX-API-AppKey` / `X-VTEX-API-AppToken`) or with a
user token (`VtexIdclientAutCookie`).

- Create a dedicated API key per integration in the VTEX Admin and give its role only the resources it needs.
- Keep keys out of source control: read them from the environment or a secret manager. `.env` is gitignored here; keep it that way in your own projects.
- Take `account` from trusted configuration, never from request input (see the README's *Security model*).

```ts
import { VtexClient } from 'vtex-sdk'

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set`)
  return value
}

const vtex = new VtexClient({
  account: requiredEnv('VTEX_ACCOUNT'),
  appKey: requiredEnv('VTEX_APP_KEY'),
  appToken: requiredEnv('VTEX_APP_TOKEN'),
  timeoutMs: 15_000,
})
```

The client never serializes its credentials: `JSON.stringify(vtex)` and `console.log(vtex)` show only
`{ account, environment }`.

## Calling an operation

```ts
// Facade
const order = await vtex.orders.get('1234567890123-01')

// Generated layer: find the call in docs/api-reference/, e.g. orders-api.md
const sameOrder = await vtex.raw.ordersAPI.orders.getOrder({ orderId: '1234567890123-01' })

// Every method takes per-call options last
const controller = new AbortController()
await vtex.orders.get('1234567890123-01', { signal: controller.signal, timeoutMs: 5_000, retry: false })
```

## Typing payloads

Request and response types come from VTEX's OpenAPI documents. Two ways to use them:

```ts
import type { OrdersApiTypes } from 'vtex-sdk'

// 1. Derive a body type from the method itself
type InvoiceBody = Parameters<typeof vtex.raw.ordersAPI.invoice.invoiceNotification>[0]['body']

// 2. Use a named schema from the API's type namespace
const filter: OrdersApiTypes.HookFilter = { type: 'FromWorkflow', status: ['invoiced'] }

declare const invoice: InvoiceBody
await vtex.raw.ordersAPI.invoice.invoiceNotification({ orderId: '1234567890123-01', body: invoice })
```

## Errors

Everything the SDK throws extends `VtexError`. HTTP failures are `VtexRequestError` subclasses with `status`,
`requestId` and `retryAfter`; the response `body` is readable but left out of `JSON.stringify(err)`.

```ts
import { VtexAuthError, VtexNotFoundError, VtexRateLimitError, VtexRequestError, VtexUsageError } from 'vtex-sdk'

async function findOrder(orderId: string): Promise<unknown | undefined> {
  try {
    return await vtex.orders.get(orderId)
  } catch (err) {
    if (err instanceof VtexNotFoundError) return undefined
    if (err instanceof VtexAuthError) throw new Error('Check the API key roles for the Orders API', { cause: err })
    if (err instanceof VtexRateLimitError) throw new Error(`Rate limited; retry in ${err.retryAfter ?? '?'} s`, { cause: err })
    if (err instanceof VtexUsageError) throw err // a bug in the call: nothing was sent
    if (err instanceof VtexRequestError) console.error('VTEX error', err.status, err.requestId)
    throw err
  }
}
```

## Retries and writes

GET, PUT and DELETE are retried on network errors, timeouts, 429 and 5xx. POST and PATCH are retried only on 429
or when no connection was made, because VTEX may already have applied the write. Override per call:

```ts
declare const coupon: Parameters<typeof vtex.raw.promotionsTaxesAPI.coupons.createOrUpdateCoupon>[0]['body']

// An upsert keyed by a natural id is safe to repeat
await vtex.raw.promotionsTaxesAPI.coupons.createOrUpdateCoupon({ body: coupon }, { idempotent: true })

// A command-style PUT should not be repeated after a timeout
declare const order: Parameters<typeof vtex.raw.checkoutAPI.orderPlacement.placeOrder>[0]['body']
await vtex.raw.checkoutAPI.orderPlacement.placeOrder({ body: order }, { idempotent: false })
```

## Many accounts

```ts
import { createVtexFactory } from 'vtex-sdk'

declare function loadCredentialsFor(account: string): Promise<{ appKey: string; appToken: string }>

const factory = createVtexFactory({ credentials: (account) => loadCredentialsFor(account) })
const client = await factory.forAccount('myaccount')
await client.orders.get('1234567890123-01')
```

A client is dropped from the cache after a 401/403, so rotated credentials are picked up on the next call.

## Logging

Hooks receive the method, URL, status and retry reason, never headers or bodies. The URL can still carry
personal data in its query string (for example a Master Data `_where=email=...`), so strip it before logging:

```ts
import { VtexClient } from 'vtex-sdk'

declare const appKey: string
declare const appToken: string

const withoutQuery = (url: string) => url.split('?')[0]

const vtex = new VtexClient({
  account: 'myaccount',
  appKey,
  appToken,
  hooks: {
    onResponse: ({ method, url, status, attempt }) => console.log(method, withoutQuery(url), status, attempt),
    onRetry: ({ method, url, delayMs, reason }) => console.warn('retry', method, withoutQuery(url), delayMs, reason),
  },
})
```
