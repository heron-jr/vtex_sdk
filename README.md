# vtex-sdk

TypeScript SDK for the [VTEX API](https://developers.vtex.com/docs/api-reference).
Full endpoint coverage generated from VTEX's official OpenAPI schemas
([github.com/vtex/openapi-schemas](https://github.com/vtex/openapi-schemas)),
with ergonomic facades over the hot APIs. Node ≥18, dual ESM/CJS, zero HTTP
dependencies (uses native `fetch`).

- **`raw.*`** — 75 APIs, 1,061 endpoints, fully typed, generated straight from VTEX's OpenAPI schemas. Nothing is out of reach.
- **Facades** — hand-written ergonomics over the 6 hottest APIs (orders, catalog, master data, pricing, logistics, checkout): auto-pagination, clean method names, sane defaults.
- **Core** — typed errors, retry with backoff + jitter, timeouts, hooks, multi-account support. Never a raw `fetch` throw.

## Install

```bash
npm install vtex-sdk
```

## Quick start (single account)

```ts
import { VtexClient } from 'vtex-sdk'

const vtex = new VtexClient({
  account: 'lojax',
  appKey: process.env.VTEX_APP_KEY!,
  appToken: process.env.VTEX_APP_TOKEN!,
})

// Facade — get a single order
const order = await vtex.orders.get('1234567890123-01')

// Facade — auto-paginated list (AsyncGenerator, walks pages for you)
for await (const order of vtex.orders.list({ status: 'ready-for-handling' })) {
  console.log(order)
}

// Full coverage via raw.* for anything not covered by a facade
const raw = await vtex.raw.ordersAPI.orders.getOrder({ orderId: '1234567890123-01' })
```

## Multiple accounts

Each `VtexClient` is immutable and bound to a single account — there is no
global state. For apps that serve many VTEX accounts, `createVtexFactory`
resolves and caches one client per account:

```ts
import { createVtexFactory } from 'vtex-sdk'

const factory = createVtexFactory({
  // Called once per account; resolve from env, a vault, or a database.
  credentials: async (account) => loadCredsFor(account),
})

const lojaY = await factory.forAccount('lojay')
await lojaY.orders.get('5678-01')

// Same account returns the same cached client instance.
const lojaYAgain = await factory.forAccount('lojay')

// Evict a cached client (e.g. after credential rotation), or clear all.
factory.clear('lojay')
factory.clear()
```

`credentials` returns either `{ appKey, appToken }` or `{ authCookie }`.

## `raw.*` vs facades

Every VTEX endpoint is reachable through `vtex.raw.<namespace>.<subNamespace>.<method>(...)`,
grouped by the same tags VTEX uses in its OpenAPI schemas (one namespace per
API, one class per tag within it). This is the full 1,061-endpoint surface —
reach for it whenever there's no facade, or when you need a field the facade
doesn't expose.

```ts
// Orders API — orders sub-namespace
await vtex.raw.ordersAPI.orders.getOrder({ orderId: '1234567890123-01' })

// Catalog API
const product = await vtex.catalog.getProduct(123)
const sku = await vtex.catalog.getSku(456)
```

Facades sit on top of `raw.*` and add the ergonomics worth hand-writing:
auto-pagination, cursor handling, and short, memorable method names. The six
facades and their methods:

| Facade | Methods |
|---|---|
| `vtex.orders` | `get(orderId)`, `list(filters?)` — auto-paginated `AsyncGenerator` |
| `vtex.catalog` | `getProduct(productId)`, `getSku(skuId)` |
| `vtex.masterData` | `get(dataEntity, id)`, `scroll(dataEntity, opts?)` — auto-paginated `AsyncGenerator` over the MD scroll cursor |
| `vtex.pricing` | `getPrice(skuId)`, `setPrice(skuId, body)` |
| `vtex.logistics` | `listWarehouses()`, `getInventoryBySku(skuId)` |
| `vtex.checkout` | `getCart(orderFormId)`, `simulate(body)` |

```ts
// Master Data — scroll a whole data entity without managing the cursor
for await (const doc of vtex.masterData.scroll('CL', { fields: ['id', 'email'] })) {
  console.log(doc)
}

// Pricing
const price = await vtex.pricing.getPrice('123')
await vtex.pricing.setPrice('123', { basePrice: 99.9 })

// Logistics
const warehouses = await vtex.logistics.listWarehouses()
const inventory = await vtex.logistics.getInventoryBySku('123')

// Checkout
const cart = await vtex.checkout.getCart(orderFormId)
const simulation = await vtex.checkout.simulate({ items: [{ id: '123', quantity: 1, seller: '1' }] })
```

## Errors

All failures throw a typed error — never a raw `fetch` rejection:

```ts
import { VtexRateLimitError, VtexNotFoundError } from 'vtex-sdk'

try {
  await vtex.orders.get('does-not-exist')
} catch (err) {
  if (err instanceof VtexNotFoundError) {
    // 404
  } else if (err instanceof VtexRateLimitError) {
    // 429 after retries were exhausted; err.retryAfter (seconds) if VTEX sent one
  } else {
    throw err
  }
}
```

| Class | Trigger |
|---|---|
| `VtexRequestError` | base class — exposes `status`, `body`, `requestId`, `retryAfter` |
| `VtexAuthError` | 401 / 403 |
| `VtexNotFoundError` | 404 |
| `VtexValidationError` | 400 / 422 |
| `VtexRateLimitError` | 429, once `maxRetries` is exhausted |
| `VtexServerError` | 5xx, once `maxRetries` is exhausted |

## Auth & environments

Two supported credential shapes, mutually exclusive:

```ts
// App-key auth (server-to-server) — most common
new VtexClient({ account: 'lojax', appKey, appToken })

// User/session auth — cookie obtained via VTEX ID
new VtexClient({ account: 'lojax', authCookie })
```

The default environment is `vtexcommercestable`; pass `environment: 'vtexcommercebeta'`
to target beta instead:

```ts
new VtexClient({ account: 'lojax', appKey, appToken, environment: 'vtexcommercebeta' })
```

Every request goes to `https://{account}.{environment}.com.br`.

## Rate limiting

On HTTP `429` (and on `5xx` or a network error) the SDK retries automatically:
it honors the `Retry-After` header when VTEX sends one, and otherwise backs
off exponentially with jitter. Retries are capped by `maxRetries` (default
**3**); once exhausted, the original `429`/`5xx` surfaces as a
`VtexRateLimitError` / `VtexServerError` with `.retryAfter` set when known.

```ts
new VtexClient({ account: 'lojax', appKey, appToken, maxRetries: 5 })
```

## Observability & timeouts

Optional hooks for logging/metrics, and a configurable per-request timeout
(default 30s):

```ts
new VtexClient({
  account: 'lojax',
  appKey,
  appToken,
  timeoutMs: 10_000,
  hooks: {
    onRequest: ({ method, url, attempt }) => console.log('->', method, url, attempt),
    onResponse: ({ status }) => console.log('<-', status),
    onRetry: ({ delayMs, reason }) => console.log('retrying in', delayMs, 'ms:', reason),
  },
})
```

## More

See [`docs/vtex-notes.md`](./docs/vtex-notes.md) for a distilled internal
reference on VTEX auth, base URLs, rate limiting, and how the generated
`raw.*` layer is produced — including known limitations of the generated
types.
