# VTEX operational notes

Reference notes distilled from the [VTEX API reference](https://developers.vtex.com/docs/api-reference)
and the OpenAPI documents that generate it. See VTEX's own documentation for anything not covered here.

## Hosts

Each generated operation calls the server that its OpenAPI document declares. The operation level wins over the path item, which wins over the document. Most APIs live on the account host:

```
https://{account}.{environment}.com.br
```

- `{account}` is the VTEX account name, a single DNS label such as `myaccount`.
- `{environment}` is `vtexcommercestable` (the default) or `vtexcommercebeta`.

Other APIs use a base path or a different VTEX host. Examples at the current pin (operation counts in parentheses):

| Server | APIs |
|---|---|
| `https://{account}.{environment}.com.br/api` | Gift Card (all), Marketplace, SKU Bindings |
| `https://{account}.myvtex.com` | Budgets (all 26), Organization Units (all 20), Custom Fields, Reviews and Ratings, Headless CMS; also some routes of VTEX ID (4 of 21) and Buying Policies (1 of 9) |
| `https://{account}.vtexpayments.com.br` | Payments Gateway |
| `https://api.vtex.com/{account}` | Pricing, Suggestions |
| `https://portal.{environment}.com.br` | Marketplace sent offers and mapper |
| `https://logistics.{environment}.com.br/{account}`, `https://rnb.{environment}.com.br/api/pricing/pvt`, `https://prchub.{environment}.com.br`, `https://api.{environment}.com.br`, `https://sp.vtex.com/event-api/v1/{account}`, `https://api.vtex.com` | a few Logistics, Promotions, Pricing Hub, Recommendations, Intelligent Search Events and Data Subject Rights routes |
| `https://{account}.vtexcommercestable.com.br`, `https://{account}.pcs.vtexcommercestable.com.br` | Card Token Vault, Legacy CMS, Payment Policies. These hosts are fixed to the stable environment, so `environment: 'vtexcommercebeta'` does not apply to them. |

The complete, reviewed list of host templates is `EXPECTED_TEMPLATES` in `test/generated-hosts.test.ts`; a schema re-pin that adds a host fails that test until it is reviewed.

Credentials are only sent to hosts under the allowlisted VTEX domains (`VTEX_DOMAIN_ALLOWLIST`). Hosts under `io.vtex.com` (VTEX IO app routes) are always refused.

## Authentication

| Header | Used for | Config field |
|---|---|---|
| `X-VTEX-API-AppKey` + `X-VTEX-API-AppToken` | Server-to-server app-key auth | `appKey` + `appToken` |
| `VtexIdclientAutCookie` | User/session auth (VTEX ID token) | `authCookie` |

`appKey` and `appToken` must be supplied together. The SDK throws at construction when credentials are missing or partial.

They are server-side secrets: never ship them to a browser. The SDK is Node-only.

## Rate limiting and retries

**What VTEX does**
- VTEX answers `429 Too Many Requests` when a client is throttled, usually with `Retry-After`.
- Limits apply per account, route and IP. Most are undisclosed; a few are documented per endpoint, for example Get Order and the Gift Card API.
- `RateLimit-*` headers are documented for the Pricing API only.
- VTEX recommends exponential backoff. The Orders feed guide recommends pausing about a minute after a 429.

**SDK policy** (`src/core/retry.ts`, applied in `src/core/http.ts`)
- Retry-safe requests are GET, HEAD, OPTIONS, PUT and DELETE, plus any request with `idempotent: true`. They retry on network errors, per-attempt timeouts, 429 and 5xx.
- POST and PATCH retry only on 429 and on connect-phase failures: `ECONNREFUSED`, `ENOTFOUND`, `EAI_AGAIN` and `UND_ERR_CONNECT_TIMEOUT`.
- The delay before a retry:
  - is `Retry-After` (delta-seconds or HTTP-date) when present;
  - otherwise is drawn with full jitter from `200ms * 2^attempt`;
  - is capped by `maxRetryAfterMs` (default 30 s) in both cases. A `Retry-After` above the cap throws the error for that status immediately (`VtexRateLimitError` for a 429, `VtexServerError` for a 503).
- `maxRetries` defaults to 3 per client and can be overridden per call with `retry`.
- Backoff waits honor the caller's `AbortSignal`.

## Generated layer (`raw.*`)

`src/generated/` is produced by `scripts/codegen.ts` from the OpenAPI documents at
[github.com/vtex/openapi-schemas](https://github.com/vtex/openapi-schemas). They are pinned to commit
`1ca3d11c8dfc9dd17484eabad051d364e767c50d` in `scripts/schemas.lock.json`, together with each file's git blob SHA.

**How it is produced**
- The schemas are not committed. `npm run fetch-schemas` downloads exactly the files in the lock from `raw.githubusercontent.com/vtex/openapi-schemas/<commit>/`, verifies each git blob SHA and replaces `schemas/` only when every file verifies.
- `npm run codegen` refuses to run when `schemas/` has extra, missing or edited files.
- Re-pinning (`--update-lock <commit>`) rewrites the lock from GitHub's listing; the lock diff is the review point.
- `npm run codegen` applies targeted fixes from `scripts/codegen/overrides.ts`, picks each operation's server (`scripts/codegen/servers.ts`) and regenerates everything. Consumers never run codegen.
- CI regenerates from the pinned schemas and fails if the result differs from the committed tree.
- `npm run typecheck` is a separate step; codegen itself does not run `tsc`.

**Coverage at the current pin**
- 75 OpenAPI documents with 1,061 operations.
- 964 operations in 62 APIs are callable through `raw.*`.
- 97 operations are excluded, 13 APIs of them in full, because their servers are third-party or variable hosts: provider protocols, Ads, Pick and Pack, Punchout, Tracking and the Shipping Network API (served by third-party VTEX IO apps on `app.io.vtex.com`, which must never receive the merchant's app key). Their types are still exported.
- 7 Pricing operations declare a duplicated `/pricing` base path, which the generator trims.

**Method names**
- They come from `operationId` when present; 450 of the 1,061 operations have none.
- Otherwise they are derived from `METHOD + path` and deduplicated per namespace.
- Excluding an operation never renames another.

## Types

- These are modeled: `nullable`, OpenAPI 3.1 type arrays, arrays of unions, `additionalProperties`, and placeholder keys such as `{fieldName}`.
- When an object mixes named properties with an index signature, the index signature is `unknown`.
- Many operations still return `unknown` because their schema declares no JSON success body.
- 4xx response schemas are not turned into typed error bodies. Errors surface as the SDK's error classes, with `body` holding the parsed payload.
- The generated types are only as accurate as VTEX's schemas. Known schema quirks are corrected in `scripts/codegen/overrides.ts`, each with its reason.
