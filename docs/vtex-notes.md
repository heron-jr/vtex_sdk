# VTEX operational notes

Internal reference distilled from the [VTEX API reference](https://developers.vtex.com/docs/api-reference)
and the OpenAPI schemas that generate it. Not a full transcription — see VTEX's
own docs for anything not covered here.

## Base URL

```
https://{account}.{environment}.com.br
```

- `{account}` — the VTEX account/tenant name (e.g. `lojax`).
- `{environment}` — `vtexcommercestable` (default, production) or
  `vtexcommercebeta` (beta/staging features). The SDK defaults to
  `vtexcommercestable`; pass `environment: 'vtexcommercebeta'` in
  `VtexClientConfig` to override.

## Authentication

Two mutually exclusive credential shapes, sent as headers on every request:

| Header | Used for | Config field |
|---|---|---|
| `X-VTEX-API-AppKey` + `X-VTEX-API-AppToken` | server-to-server app-key auth | `appKey` + `appToken` |
| `VtexIdclientAutCookie` | user/session auth (VTEX ID cookie) | `authCookie` |

App-key auth is the dominant scheme across VTEX's APIs (~60 of the 75
generated APIs); the cookie is used by the rest (~57 — some APIs accept
either). Both `appKey` and `appToken` must be supplied together or neither is;
the SDK throws synchronously at client construction if credentials are
missing or partial (see `src/core/auth.ts`).

These are server-side secrets — never ship them to a browser. This SDK is
Node-only by design.

## Rate limiting

- VTEX returns `429 Too Many Requests` when a client is throttled.
- Informational headers on (most) responses: `RateLimit-Limit`,
  `RateLimit-Remaining`, `RateLimit-Reset`.
- On `429`, prefer the `Retry-After` header (seconds) when present.
- VTEX's own guidance is exponential backoff with jitter when `Retry-After`
  is absent.

The SDK's retry policy (`src/core/retry.ts`, wired into `src/core/http.ts`):

- Retries on `429`, any `5xx`, and transient network errors (fetch throwing).
- Any other 4xx is never retried.
- If the response carries `Retry-After`, that value (seconds → ms) is used as
  the delay verbatim.
- Otherwise: `delay = 2^attempt * 200ms + random(0, 100ms)` jitter.
- Capped by `maxRetries` (default **3**, configurable per client or per
  factory). Once exhausted, the SDK throws `VtexRateLimitError` (429) or
  `VtexServerError` (5xx) with `.retryAfter` populated if VTEX sent it.

## Generated layer (`raw.*`) — how it's produced

`src/generated/` is produced by `scripts/codegen.ts` from the official OpenAPI
schemas at [github.com/vtex/openapi-schemas](https://github.com/vtex/openapi-schemas),
fetched by `scripts/fetch-schemas.ts` **pinned to a specific commit SHA** for
reproducibility (currently `1ca3d11c8dfc9dd17484eabad051d364e767c50d`). Schemas
are fetched once, committed to `schemas/`, and regenerated deliberately when
the pin is bumped — never at install time or at runtime. This means:

- Every VTEX API update requires a deliberate re-pin + `npm run codegen` +
  review of the resulting diff. Consumers never run codegen themselves.
- Measured surface at the current pin: 75 real API schemas (79 JSON files
  minus 4 tooling files), 1,061 operations, 735 component schemas, grouped
  into 266 generated namespace/sub-namespace classes.
- Method names come from a cascading strategy: `operationId` when present
  (42% of operations — 450/1,061 — have none), else derived from
  `METHOD + path` (e.g. `GET /api/oms/pvt/orders/{orderId}` →
  `getOrder`-style names within the `orders` sub-namespace), with dedup
  applied per namespace and globally where collisions occur (e.g. the
  4-way "Marketplace Protocol" title collision, and repeated
  `createservice` operationIds within one file).
- Generated output is validated by `tsc --noEmit` as a hard gate — a schema
  that can't be turned into valid, compiling TypeScript fails the codegen
  step loudly rather than emitting something broken.

## Known limitations

- **`nullable: true` is not modeled.** It appears **~1,345 times** across the
  pinned OpenAPI schemas, and the type generator currently ignores it. The
  practical effect: some generated fields are typed narrower than the live
  API actually returns — e.g. a field declared `nullable: true, type: string`
  in the schema is generated as `string`, when the real response can be
  `string | null`. Treat generated "non-optional, non-null" fields with a
  little skepticism if you see `null` in practice; this is a known, accepted
  precision gap, not a bug to chase.
- **21 operations reference their 4xx error responses via `$ref`** in a way
  the generator doesn't resolve into a distinct error type. This does **not**
  affect success-path types — all 21 are error (4xx) response schemas that
  are never read on the happy path — but it means those operations' error
  bodies aren't strongly typed the way a 2xx response is. Errors are still
  surfaced through the SDK's typed error classes (`VtexRequestError` and
  subclasses); only the raw generated *type* for the 4xx payload is looser.
- The generated layer is type-checked as a whole (`tsc --noEmit` over all
  1,061 operations), not unit-tested endpoint-by-endpoint — correctness of
  each generated type rests on the OpenAPI schema being accurate, which is
  VTEX's source of truth, not this SDK's.
