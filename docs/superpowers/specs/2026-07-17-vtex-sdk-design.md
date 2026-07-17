# VTEX TypeScript SDK — Design Spec

**Status:** Approved (brainstorming) — pending user review before implementation planning
**Date:** 2026-07-17
**Author:** vasto.heron@gmail.com + Claude

## 1. Purpose & Context

A reusable, production-grade TypeScript SDK for the [VTEX API](https://developers.vtex.com/docs/api-reference), to be used **across multiple VTEX accounts and multiple projects**, distributed as a **private npm package**.

### Why this design

The VTEX API reference is not hand-maintained HTML — it is rendered from **official OpenAPI 3.0 schemas** published at [github.com/vtex/openapi-schemas](https://github.com/vtex/openapi-schemas), auto-synced to the Developer Portal. Measured surface (pinned clone):

| Metric | Value |
|---|---|
| Real API schemas | 75 (79 JSON files − 4 tooling files: `config.json`, `package.json`, `package-lock.json`, `rating-config.json`) |
| Endpoints (operations) | 1,061 |
| Component schemas (types) | 735 |
| Dominant auth | `appKey`/`appToken` (60 APIs), `VtexIdclientAutCookie` (57) |
| Host pattern | `https://{accountName}.{environment}.com.br` |

**Consequence:** hand-transcribing 1,061 endpoints from HTML is infeasible and would silently rot. The SDK is generated from the OpenAPI source of truth, with a hand-written ergonomic layer over the hot paths.

### Key discovery constraints (drive the code)

- **42% of operations (450/1,061) have no `operationId`.** Codegen cannot rely on `operationId` for method names — it needs a cascading naming strategy with dedup.
- **4 duplicate `operationId`s** exist within files — dedup required.
- Host is parameterized by `{accountName}` — fits multi-account: each client resolves its own base URL.
- `appKey`/`appToken` are **server-side credentials** — SDK targets Node only, never ships them to a browser.
- Rate limiting: `429 Too Many Requests` with `Retry-After` (seconds); status headers `RateLimit-Limit` / `RateLimit-Remaining` / `RateLimit-Reset`. VTEX recommends exponential backoff with jitter.

## 2. Decisions (from brainstorming)

| Question | Decision |
|---|---|
| Coverage approach | **Hybrid**: full codegen (`raw.*`) + hand-written ergonomic facades over hot APIs |
| Runtime | **Node ≥18 only**, native `fetch`, no HTTP dependency |
| Distribution | **Private npm package** (npm org or GitHub Packages) |
| Multi-account model | **Client-per-account + optional factory** (immutable, no global state; Stripe/AWS style) |
| Supporting docs role | **Enrich spec + SDK doc-comments/README** (distill auth, rate limits, environments, quirks — not full transcription) |
| Quality bar | **Production-grade**, hot layer unit-tested, generated layer type-checked |

## 3. Architecture

Three stacked layers, each usable independently:

```
┌─────────────────────────────────────────────────────────┐
│  Facades (hand-written)                                   │  DX: auto-pagination,
│  vtex.orders, vtex.catalog, vtex.checkout, vtex.pricing, │  helpers, clean names
│  vtex.masterData, vtex.logistics                         │
├─────────────────────────────────────────────────────────┤
│  Generated layer (codegen from 75 OpenAPI schemas)       │  100% coverage
│  vtex.raw.* — 1,061 endpoints, 735 types, fully typed    │  1,061 endpoints
├─────────────────────────────────────────────────────────┤
│  Core HTTP (hand-written)                                 │  auth, retry, rate
│  request(), auth, retry/backoff, rate-limit, errors      │  limit, base URL
└─────────────────────────────────────────────────────────┘
```

Facades call the generated layer, which calls the core. When VTEX updates the OpenAPI schemas, only the generated layer is regenerated; facades and core are unaffected. No global state — each `VtexClient` is immutable and bound to one account.

- Generated endpoints are grouped by OpenAPI **tag** into sub-clients: `vtex.raw.catalog`, `vtex.raw.orders`, etc.
- Facades sit at the top level without a prefix: `vtex.orders`, `vtex.catalog`, etc.

### Public API shape

```ts
// Direct use — one client per account
const lojaX = new VtexClient({ account: 'lojax', appKey, appToken })
await lojaX.orders.get('1234-01')                 // facade
await lojaX.raw.catalog.getSkuById({ skuId: 42 }) // generated, full coverage

// Auto-pagination via AsyncIterable
for await (const o of lojaX.orders.list({ status: 'ready-for-handling' })) {
  console.log(o.orderId)
}

// Multi-account via factory (resolves + caches clients per account)
const vtex = createVtexFactory({
  credentials: async (account) => await vault.get(account), // env, vault, or DB
})
const lojaY = await vtex.forAccount('lojay')
await lojaY.orders.get('5678-01')
```

## 4. Core HTTP layer (hand-written, tested)

Five isolated, independently-testable responsibilities:

### 4.1 Config & base URL
- Input: `{ account, environment?, appKey, appToken }` or `{ account, authCookie }`.
- Host: `https://{account}.{environment}.com.br`, default `environment = 'vtexcommercestable'`.
- Auth headers: `X-VTEX-API-AppKey` / `X-VTEX-API-AppToken`. Cookie alternative: `VtexIdclientAutCookie`.
- Standard headers: `Accept: application/json`, `Content-Type: application/json`.

### 4.2 Retry with exponential backoff + jitter
- Retries on `429`, `5xx`, and transient network errors.
- Respects `Retry-After` header when present; otherwise exponential backoff with jitter.
- Configurable `maxRetries` (default **3**), fully disableable.

### 4.3 Typed errors
Every failure becomes an SDK error class — never a raw `fetch` throw.

| Class | Trigger |
|---|---|
| `VtexRequestError` | base (exposes `status`, `body`, `requestId`) |
| `VtexAuthError` | 401 / 403 |
| `VtexRateLimitError` | 429 after retries exhausted (exposes `retryAfter`) |
| `VtexNotFoundError` | 404 |
| `VtexValidationError` | 400 / 422 (exposes error body) |
| `VtexServerError` | 5xx after retries |

### 4.4 Hooks / observability
- Optional `onRequest` / `onResponse` / `onRetry` callbacks for logging and metrics.
- No coupling to any concrete logger.

### 4.5 Timeout & cancellation
- `AbortSignal` propagated through every request.
- Per-request `timeout` (default **30s**).

## 5. Codegen pipeline

A Node script (`scripts/codegen.ts`) that runs **offline during SDK development** — never a runtime dependency.

1. **Fetch** the 75 API JSONs from `vtex/openapi-schemas`, pinned by commit SHA for reproducibility; skip the 4 tooling files.
2. **Parse + normalize** — resolve `$ref`, group operations by tag, apply cascading naming: `operationId` → derived from `method + path` (e.g. `GET /api/oms/pvt/orders/{orderId}` → `getOrdersByOrderId`) → dedup collisions.
3. **Generate types** — each `components.schemas` entry → a TS `interface`/`type`; params and response bodies typed.
4. **Generate methods** — each operation → a method calling `core.request()` with path, method, typed params, typed return.
5. **Emit** to `src/generated/` (one folder per API). **This folder is committed** (not generated on install) so consumers need no codegen and every VTEX update is a reviewable git diff.

**Validation:** generated output must pass `tsc --noEmit`. A schema that breaks generation fails loudly — no silent bad emit.

## 6. Facades (hand-written, tested)

Ergonomic layer over hot APIs: **orders, catalog, checkout, pricing, masterData, logistics**. They provide, on top of the raw layer:

- Auto-pagination as `AsyncIterable` (`for await`).
- Clean method names and resource grouping.
- Helpers for tedious flows (e.g. `orders.list()` iterating pages; `masterData.scroll()` for large datasets).

## 7. File structure

```
vtex-sdk/
├── src/
│   ├── core/            # HTTP, auth, retry, errors, rate-limit  (hand, tested)
│   ├── generated/       # 75 generated APIs — vtex.raw.*         (codegen, committed)
│   ├── facades/         # orders, catalog, checkout, pricing,
│   │                    #   masterData, logistics                (hand, tested)
│   ├── factory.ts       # createVtexFactory — per-account resolve/cache
│   ├── client.ts        # VtexClient — assembles raw + facades
│   └── index.ts         # public API
├── scripts/codegen.ts   # generation pipeline
├── test/                # unit tests with mocked fetch
├── docs/                # README + distilled notes from VTEX guides
├── package.json         # ESM+CJS, Node ≥18, "sideEffects": false
├── tsconfig.json
└── tsup.config.ts       # dual ESM/CJS build
```

## 8. Testing & build

- **Tests (Vitest):** core and facades unit-tested with mocked `fetch` — auth headers, retry on 429/5xx, `Retry-After` respect, auto-pagination, and each error class. Generated layer validated by type compilation (`tsc --noEmit`), not per-endpoint unit tests.
- **Smoke test:** optional, behind an env var with real credentials; not in CI.
- **Build:** `tsup` → ESM + CJS + `.d.ts`. `package.json` with `exports` map, `engines.node >=18`, marked server-side.

## 9. Out of scope (YAGNI)

- Browser/isomorphic build.
- A generated documentation site.
- Facades beyond the 6 hot APIs (everything else is reachable via `raw.*`).
- Runtime codegen (generation is a dev-time step; output is committed).

## 10. Success criteria

1. `raw.*` covers all 1,061 endpoints and compiles under `tsc --noEmit`.
2. Facades for the 6 hot APIs with auto-pagination, typed errors, retry/backoff.
3. Client-per-account + factory, no global state, safe under concurrency.
4. Core unit tests pass (auth, retry, rate-limit, errors, pagination).
5. Dual ESM/CJS build consumable by a private npm install.
6. Codegen is re-runnable against a newer VTEX schema pin with a reviewable diff.
