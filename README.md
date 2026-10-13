# vtex-sdk

Unofficial TypeScript SDK for the [VTEX APIs](https://developers.vtex.com/docs/api-reference), for Node.js 20 or newer
(Node 20 is end-of-life; prefer 22 or 24).
It is generated from VTEX's public OpenAPI documents and adds hand-written facades over the most used APIs.
This project is not affiliated with, endorsed by or sponsored by VTEX.

- **`raw.*`**: 964 operations across 62 VTEX APIs.
  - Each call goes to the host and base path its API reference declares: for example Gift Card under `/api`, Pricing on `api.vtex.com/{account}`, and several APIs on `{account}.myvtex.com`.
  - Not callable here, though their types are exported:
    - protocols that *you* implement: payment, antifraud and gift card providers, external promotions, B2B password migration and the seller protocols;
    - APIs served by third-party hosts: Ads, Pick and Pack, Punchout, Tracking, and the Shipping Network API (carriers' VTEX IO apps).
- **Facades**: orders, catalog, master data, pricing, logistics and checkout, with auto-pagination.
- **Core**:
  - credentials only go to VTEX hosts, and path parameters are encoded;
  - non-idempotent writes are not retried blindly;
  - redirects never leave the origin;
  - typed errors, timeouts and hooks.

## Install

The package is installed from GitHub; it is not published to npm. Pin a tag:

```bash
npm install github:heron-jr/vtex-sdk#v0.2.0
```

npm builds `dist/` during install through the package's `prepare` script. Installs that skip lifecycle scripts (`--ignore-scripts`, or package managers that don't run dependency scripts) end up without `dist/`; enable scripts for this package, or build it once with `npm run build` inside `node_modules/vtex-sdk`.

## Quick start

```ts
import { VtexClient } from 'vtex-sdk'

const vtex = new VtexClient({
  account: 'myaccount',
  appKey: process.env.VTEX_APP_KEY!,
  appToken: process.env.VTEX_APP_TOKEN!,
})

// Facade: one order
const order = await vtex.orders.get('1234567890123-01')

// Facade: auto-paginated list (AsyncGenerator)
for await (const summary of vtex.orders.list({ status: 'invoiced' })) {
  console.log(summary)
}

// Generated layer: any operation from the API reference
const feedConfig = await vtex.raw.ordersAPI.feedV3.getFeedConfiguration()
```

## Per-call options

Every generated and facade method takes optional per-call options as its last argument:

```ts
const controller = new AbortController()
await vtex.orders.get('1234567890123-01', { signal: controller.signal, timeoutMs: 5_000 })

// Header parameters declared by the API reference are typed on the params object
await vtex.raw.giftcardAPI.giftCard.searchGiftCardsfromcartdata({ 'REST-Range': 'resources=0-9', body })
```

`CallOptions` contains:
- `headers`;
- `signal`;
- `timeoutMs`, applied per attempt;
- `retry`: `false`, or `{ maxRetries }`;
- `idempotent`.

## Retries and idempotency

**GET, HEAD, OPTIONS, PUT and DELETE**
- Retried on network errors, timeouts, 429 and 5xx.
- 3 retries by default, with exponential backoff and full jitter.

**POST and PATCH**
- Retried only on 429, and when the connection could not be established.
- A timeout, a 5xx or a dropped connection on a write is reported, not retried, because VTEX may already have applied it.

You can override the default per call:

```ts
// Upsert keyed by couponCode: safe to repeat
await vtex.raw.promotionsTaxesAPI.coupons.createOrUpdateCoupon({ body: coupon }, { idempotent: true })

// Some VTEX PUTs are commands (placing an order, debiting a credit account):
// idempotent: false stops retries on 5xx/timeouts but keeps 429 retries
await vtex.request({ method: 'PUT', path: '/api/checkout/pub/orders', body: order, idempotent: false })

// No retries at all
await vtex.orders.get(id, { retry: false })
```

A connection that cannot be established times out in about 10 s, and each attempt waits for it. A POST to an unreachable host can therefore take about 40 s over 4 attempts before failing.

**`Retry-After`**
- Both delta-seconds and HTTP-date values are honored, up to `maxRetryAfterMs` (default 30 s).
- A longer wait throws right away, with `retryAfter` set in seconds, so a job runner can reschedule. The error matches the status: `VtexRateLimitError` for a 429, `VtexServerError` for a 503.

## Errors

| Class | When |
|---|---|
| `VtexError` | Base class of everything the SDK throws |
| `VtexRequestError` | Non-2xx response; exposes `status`, `body` (readable, not enumerable), `requestId`, `retryAfter` |
| `VtexAuthError` | 401 / 403 |
| `VtexNotFoundError` | 404 |
| `VtexValidationError` | 400 / 422 |
| `VtexRateLimitError` | 429 after retries, or a 429 whose `Retry-After` is above the cap |
| `VtexServerError` | 5xx after retries, or a 5xx whose `Retry-After` is above the cap |
| `VtexNetworkError` | No complete response (DNS, connection, socket, body read); exposes `cause`, `method`, `route`, `attempts` |
| `VtexTimeoutError` | Per-attempt timeout; a subclass of `VtexNetworkError` |
| `VtexUsageError` | Invalid configuration, account, environment, server, path, header or argument (for example `perPage` outside 1–100); nothing was sent |
| `VtexPaginationLimitError` | `orders.list()` reached VTEX's 30-page limit; narrow the filters |
| `VtexUnexpectedResponseError` | A 2xx response the SDK cannot use safely: a malformed or truncated List Orders page, or Master Data scroll rows without a scroll token |

A caller's `AbortSignal` rejects with the signal's reason, which is an `AbortError` by default.

## Security model

**What is validated before anything is sent**
- `account` must be a single DNS label.
- `environment` is `vtexcommercestable` (the default) or `vtexcommercebeta`.

**Where credentials go:** only to hosts under `vtexcommercestable.com.br`, `vtexcommercebeta.com.br`, `myvtex.com`, `vtex.com` or `vtexpayments.com.br`. The list is exported (frozen) as `VTEX_DOMAIN_ALLOWLIST`. Hosts under `io.vtex.com` (VTEX IO app routes, which run third-party app code) are refused even though they are under `vtex.com`.

**Where the account comes from:** take `account` from trusted configuration, never from request input. The allowlist cannot stop a valid account name chosen by an attacker (`attacker.myvtex.com` is still a VTEX host). With the factory, the resolver must return that account's own credentials.

**Paths**
- Path parameters are percent-encoded.
- Empty, `.` and `..` values are rejected.
- A URL that would change origin or contain dot segments is refused.

**Redirects:** followed only within the same origin, at most 3 hops, and 301/302/303 only for GET and HEAD.

**What gets printed**
- `console.log(client)` and `JSON.stringify(client)` show only `{ account, environment }`.
- Error bodies are left out of default serialization.
- Hook payloads contain the full URL, including the query string. Avoid logging them verbatim when queries carry personal data.

## Auth and environments

```ts
// App-key auth (server to server)
new VtexClient({ account: 'myaccount', appKey, appToken })

// User/session auth with a VTEX ID token
new VtexClient({ account: 'myaccount', authCookie })

// Beta environment
new VtexClient({ account: 'myaccount', appKey, appToken, environment: 'vtexcommercebeta' })
```

`environment` applies to hosts written with `{environment}`. A few APIs document a fixed stable host (Card Token Vault, Legacy CMS, Payment Policies), and those calls go to `vtexcommercestable` regardless.

App keys and tokens are server-side secrets. The SDK is Node-only.

## Multiple accounts

```ts
import { createVtexFactory } from 'vtex-sdk'

const factory = createVtexFactory({
  // Called once per account; return only credentials.
  credentials: async (account) => loadCredentialsFor(account),
  maxCachedClients: 100,
})

const client = await factory.forAccount('myaccount')
factory.clear('myaccount') // or factory.clear() for all
```

Behavior:
- Account names are normalized before they are used as cache keys.
- Only `appKey`, `appToken` and `authCookie` are taken from the resolver.
- A client is evicted after a 401 or 403, so the next `forAccount` call picks up rotated credentials.
  - This includes a 401/403 from an allowlisted `server` override.
  - A 403 caused by a missing role re-runs the resolver every time, so keep the resolver cheap or cache on your side.
- The resolver must always settle. A promise that never resolves blocks that account until `clear()`, so give slow secret stores a timeout.
- `clear()` with no argument drops every client. `clear(undefined)` does nothing.
- Options are copied when the factory is created. `credentials`, `environment` and `maxCachedClients` are validated then; numeric client options (`maxRetries`, `timeoutMs`, `maxRetryAfterMs`) are validated when the first client is built.

## Facades

| Facade | Methods (each also accepts `CallOptions` last) |
|---|---|
| `vtex.orders` | `get(orderId)`, `list(filters?)` (AsyncGenerator, max 30 pages per query; `perPage` 1–100, default 100; `page`/`per_page` are rejected) |
| `vtex.catalog` | `getProduct(productId)`, `getSku(skuId)` |
| `vtex.masterData` | `get(dataEntity, id, { fields? })`, `scroll(dataEntity, { fields?, size?, query?, sort? })` |
| `vtex.pricing` | `getPrice(skuId)`, `setPrice(skuId, body)` |
| `vtex.logistics` | `listWarehouses()`, `getInventoryBySku(skuId)` |
| `vtex.checkout` | `getCart(orderFormId)`, `simulate(body)` (retried like a GET) |

The Master Data scroll token expires after 20 minutes without a request, and that includes your processing time between rows; an expired token surfaces as an error after earlier rows were yielded. The scroll is never restarted automatically (that would duplicate rows), so start a new one. `orders.list()` throws `VtexPaginationLimitError` only after yielding page 30, so write orders idempotently (upserts) when backfilling.

## Low-level requests

```ts
const { data, headers, status } = await vtex.requestRaw({
  method: 'GET',
  path: '/api/dataentities/CL/search',
  query: { _where: 'email=someone@example.com', _fields: 'id,email' },
  headers: { 'REST-Range': 'resources=0-0' },
})
```

`request()` / `requestRaw()` go through the same host, header, retry and redirect checks as generated methods. Pass `server` to target another allowlisted host template, for example `'https://{accountName}.{environment}.com.br/api'`.

`path` is validated but not encoded: wrap every interpolated value, or an id containing `/` silently points the call at another endpoint.

```ts
import { encodePathParam } from 'vtex-sdk'

await vtex.request({ method: 'GET', path: `/api/oms/pvt/orders/${encodePathParam(orderId)}` })
```

The type argument is not validated at runtime. The client's transport is private: custom helpers should depend on `Pick<VtexClient, 'request' | 'requestRaw'>`.

## Types

```ts
import type { OrdersApiTypes, GiftcardApiTypes, CallOptions } from 'vtex-sdk'

const filter: OrdersApiTypes.HookFilter = { type: 'FromWorkflow', status: ['invoiced'] }
```

## Observability

```ts
new VtexClient({
  account: 'myaccount', appKey, appToken,
  hooks: {
    onRequest: ({ method, url, attempt }) => console.log('->', method, url, attempt),
    onResponse: ({ status }) => console.log('<-', status),
    onRetry: ({ delayMs, reason }) => console.log('retrying in', delayMs, 'ms:', reason),
  },
})
```

## Development

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run fetch-schemas   # download the locked OpenAPI documents (verified)
npm run fetch-schemas -- --update-lock <commit-sha>   # re-pin; review the lock diff
npm run codegen         # regenerate src/generated from them
npx tsx --env-file=.env scripts/live-check.ts   # optional, GET-only; VTEX_ACCOUNT/APP_KEY/APP_TOKEN in .env
```

Notes for contributors:
- The development toolchain (vitest/vite) needs Node 20.19+ or 22.12+. Consumers only need Node 20.
- `--update-lock` calls the GitHub API anonymously; set `GITHUB_TOKEN` to avoid its rate limit. Plain `fetch-schemas` needs no token.
- Keep secrets in `.env` (gitignored) rather than inline on the command line, where they end up in shell history.
- `package.json` overrides tsup's esbuild to `^0.28.2`, because esbuild 0.27.x is affected by GHSA-g7r4-m6w7-qqqr. Remove the override once tsup depends on esbuild 0.28.2 or newer, or after moving to tsdown.
- Update dependencies with npm 11, so the lockfile keeps its platform (`libc`) annotations.

See [`docs/vtex-notes.md`](./docs/vtex-notes.md) for VTEX hosts, authentication, rate limiting and how the generated layer is produced.

## License

MIT, see [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
