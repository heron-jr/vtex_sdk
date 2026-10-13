# Changelog

## 0.2.0 (2026-10-13)

Security hardening and correctness release. Design: `docs/superpowers/specs/2026-10-12-vtex-sdk-hardening-design.md`.

### Breaking
- POST and PATCH are no longer retried after 5xx responses, timeouts or dropped connections, because the write may already have been applied. Pass `{ idempotent: true }` for writes you know are safe to repeat.
- Invalid configuration throws `VtexUsageError` when the client is constructed: an invalid `account` or `environment`, and a non-finite or negative `maxRetries`, `timeoutMs` or `maxRetryAfterMs` (watch for `Number(process.env.X)` giving `NaN`).
- Credentials and header values containing control characters, a body on GET/HEAD, and empty, `.` or `..` path ids throw `VtexUsageError` before anything is sent.
- Generated operations call the host and base path their OpenAPI document declares (for example Gift Card under `/api`, Pricing on `api.vtex.com/{account}`, several APIs on `{account}.myvtex.com`).
- APIs and operations served only by third-party or variable hosts were removed from `raw.*`: provider protocols (payment, antifraud, gift card, external promotions, seller), B2B Password Migration, Ads, Pick and Pack, Punchout, Tracking, VTEX Shipping Network, and two operations with placeholder or vault hosts. Their types are still exported.
- `VtexClient` no longer has a protected `http` member; use `request()` / `requestRaw()`. `client.account` is the normalized (lowercase) account, and `account`/`environment` are read-only.
- `VtexHttpClient` instances are frozen, so the class cannot be subclassed with extra fields.
- `orders.list()` requires `perPage` between 1 and 100. Master Data entity names must match `^[A-Za-z0-9_-]{1,64}$`.
- `request({ server })` only accepts `api.vtex.com` and `sp.vtex.com` on the `vtex.com` domain. CONNECT, TRACE and TRACK are refused as methods, and account names starting with `xn--` are rejected.
- Facade and generated methods are `async`: argument errors arrive as a rejected promise instead of a synchronous throw.
- Network failures throw `VtexNetworkError`, and timeouts throw `VtexTimeoutError`, instead of a raw `TypeError` / `AbortError`. A caller abort still rejects with the signal's reason.
- `VtexRequestError.body` is non-enumerable: still readable and writable, but left out of `JSON.stringify(err)` and default logging.
- `retryAfter` on errors is now whole seconds, rounded up (`'1.5'` gives `2`). It is also derived from HTTP-dates. Values that are neither delta-seconds nor an HTTP-date are ignored.
- `orders.list()` throws `VtexPaginationLimitError` instead of requesting page 31 and beyond, and `VtexUnexpectedResponseError` instead of ending early on a malformed, empty or unpaged full page. It rejects `page`/`per_page` filters (use `perPage`).
- A `Retry-After` longer than `maxRetryAfterMs` (default 30 s) throws immediately instead of sleeping.
- Node.js 20 or newer is required. Node 20 reached end-of-life in April 2026; it still works and CI still tests it, but prefer Node 22 or 24.

### Security
- Credentials are sent only to hosts under the allowlisted VTEX domains, after the account and environment are validated. On `vtex.com` only `api.vtex.com` and `sp.vtex.com` qualify. The allowlist is frozen at runtime.
- Path parameters are percent-encoded. Empty, `.` and `..` values are rejected, and a URL that would change origin or contain dot segments is refused before sending.
- Redirects are handled manually: same origin only, at most 3 hops.
- `console.log(client)` and `JSON.stringify(client)` no longer reveal credentials.
- The factory takes only credentials from its resolver, normalizes accounts, bounds its cache and evicts a client after 401/403.
- Codegen refuses unsafe schema paths, parameter names and server templates. No generated method targets third-party VTEX IO app routes, and the runtime refuses any `*.io.vtex.com` host, even through `request({ server })`.

### Added
- Per-call options on every generated and facade method: `headers`, `signal`, `timeoutMs`, `retry`, `idempotent`.
- `client.request()` and `client.requestRaw()`, the latter returning `{ data, headers, status }` (exported as `VtexRawResponse<T>`).
- Typed header parameters on generated methods (for example `REST-Range`). `params` is optional when nothing is required.
- Request bodies for vendor JSON, multipart, form-urlencoded and text content types; this fixes `createGiftCard`.
- Exported type namespaces per API (for example `OrdersApiTypes`), the `VtexError` base class and the new error classes, `DEFAULT_SERVER`, `VTEX_DOMAIN_ALLOWLIST`, `ORDERS_MAX_PAGES` and `encodePathParam` (for `request()` paths).
- `maxRetryAfterMs` client option and `maxCachedClients` factory option.
- `scripts/live-check.ts` (`npm run live-check`, or `npx tsx --env-file=.env scripts/live-check.ts`): an optional, GET-only check against a real account.
- CI: typecheck, tests and build on Node 20/22/24, plus a codegen reproducibility check.

### Fixed
- Generated types: `nullable`, OpenAPI 3.1 type arrays, arrays of unions, `additionalProperties`, placeholder keys, and targeted overrides for order-hook headers, the hook-config response, coupon usage and two operations with a foreign host.
- CommonJS consumers resolve `index.d.cts` under `node16`/`nodenext`.
- `masterData.scroll()` raises a typed error on an unexpected body, validates `size`, and refuses to restart the scroll when VTEX returns rows without a token (it used to loop over the first page forever). `masterData.get()` accepts `fields`.

### Removed
- `schemas/` is no longer committed; `npm run fetch-schemas` downloads it on demand.
- The internal `paginate` helper.
