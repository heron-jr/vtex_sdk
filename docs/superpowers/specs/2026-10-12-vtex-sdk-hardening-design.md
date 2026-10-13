# vtex-sdk 0.2.0 — Security Hardening & Correctness — Design Spec

**Status:** Approved in brainstorming — pending user review of this document before implementation planning
**Date:** 2026-10-12
**Author:** Heron Jr + Claude
**Supersedes:** nothing. It amends `2026-07-17-vtex-sdk-design.md`, whose architecture (core + generated `raw.*` + hand-written facades) stays.

## 1. Context

A pre-publication audit of `main` @ `6788909` covered secrets, security and fitness for a real integration: orders feed, coupons, gift cards, Master Data and VTEX ID.

**What is fine**
- There are no real credentials or customer data anywhere in the git history.
- The SDK has zero runtime dependencies.
- 84/84 tests pass, and typecheck and build are clean.
- The facades encode their path parameters.

**Security defects (HIGH unless noted)**

| # | Defect | Effect |
|---|---|---|
| S1 | `account` and `environment` are interpolated into the host without validation (`src/core/url.ts`). | `account: "evil.com#"` sends `X-VTEX-API-AppKey`/`AppToken` to `evil.com`. |
| S2 | 726 of 1,061 generated methods interpolate path params raw (`scripts/codegen/operation.ts:132`). The `masterData` facade does the same with `dataEntity`. | An id such as `../../../dataentities/CL/search?...` reaches other admin endpoints with the app key. |
| S3 | Every HTTP method is retried on network errors, per-attempt timeouts, 429 and 5xx (`src/core/retry.ts`). | A POST can run up to 4 times: duplicate coupons, gift-card credits, payment transactions. |
| S4 (MEDIUM) | Credentials sit in an enumerable field. | `console.log(client)` / `JSON.stringify(client)` print the AppToken. |
| S5 (MEDIUM) | `fetch` follows redirects by default. | Cross-origin redirects keep custom headers, so the AppToken leaks. |
| S6 (LOW) | `Retry-After` is uncapped and the backoff sleep is not abortable. | A long `Retry-After` stalls the caller, and aborting does not stop the wait. |
| S7 (LOW) | Network and timeout failures escape as raw `TypeError` / `AbortError`. | Callers cannot catch them with the SDK's typed errors. |
| S8 (LOW) | The factory cache is keyed by the raw account string, the resolver output can override `account`, and the cache is unbounded. | Clients can be built for the wrong account, and the cache grows without limit. |
| S9 (LOW, build-time) | The generator writes schema path text into template literals unescaped. | A malicious schema could inject code into the generated output. |

**Correctness defects**

| # | Defect | Effect |
|---|---|---|
| C1 | The generator ignores OpenAPI `servers`, so every call goes to `https://{account}.{env}.com.br`. | About a third of operations (~360) target the wrong host or base path. Examples: Gift Card lacks `/api`; Pricing lives at `api.vtex.com/{account}`; VTEX ID and others at `{account}.myvtex.com`. |
| C2 | Only `application/json*` request bodies are emitted. | 21 operations silently drop their body, including `createGiftCard` (`application/vnd.vtex.giftcard.v1+json`) and the Gift Card Hub writes. |
| C3 | Generated methods drop header parameters and accept no per-call options. | No `REST-Range`, `signal`, `timeoutMs` or retry control. |
| C4 | Type generator gaps: `nullable` ignored (2,830 nodes); `"a" \| "b"[]` emitted for arrays of unions; `additionalProperties` ignored; placeholder keys such as `{fieldName}` emitted literally. | Several payload types are wrong (Master Data bodies, coupon usage, order-hook headers). Generated types are also not exported. |
| C5 | `orders.list` ignores VTEX's 30-page limit. `masterData.scroll` crashes on a non-array body. | List results can be silently truncated or broken; scroll throws an untyped error. |
| C6 | Packaging: no LICENSE; `schemas/` (an unlicensed upstream copy) is committed; CJS type definitions are mis-mapped; Node 18 floor (EOL); vulnerable dev dependencies (vitest 1.x). The README and `docs/vtex-notes.md` claim behavior the code does not have. | The repo cannot be safely published or relied on as documented. |

## 2. Goals and non-goals

**Goals**
1. Close S1–S9 with defense in depth. The core must refuse unsafe requests even if a generated method or facade forgets to encode something.
2. Make `raw.*` reach the documented host and base path for every operation it exposes, with correct bodies and headers.
3. Fix the type-generator gaps in C4, and export the generated types.
4. Make the repository fit to be public: license, notice, accurate docs, no committed upstream schemas, CI.
5. Stay backward compatible for the common consumer path: the constructor options, `orders.get`, and the error classes `VtexNotFoundError` / `VtexAuthError`.

**Non-goals**
- New facades (promotions, coupons, feed, gift card, VTEX ID). Consumers wrap the now-correct `raw.*`.
- Renaming generated methods. Names stay stable.
- Replacing the type generator with a third-party one.
- Rewriting git history or publishing to npm. Distribution is the existing GitHub repo plus git tags (§8).

## 3. Core transport (`src/core/*`)

### 3.1 Host and URL safety (S1)
- **`account`** must be a DNS label: `^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$`. It is lowercased before validation, and anything else throws `VtexUsageError` at construction.
- **`environment`** is checked at runtime against `vtexcommercestable | vtexcommercebeta`.
- **Server templates.** URLs are built from a server template (default `https://{accountName}.{environment}.com.br`, see §4.1) through `resolveServer(template, account, environment)`, which:
  1. substitutes only `{accountName}` and `{environment}` with the validated values;
  2. parses the result with `new URL()`;
  3. requires `https:` (`http:` templates are upgraded);
  4. requires the hostname to equal, or end with `.` plus, a domain in the **VTEX domain allowlist**. Initially: `vtexcommercestable.com.br`, `vtexcommercebeta.com.br`, `myvtex.com`, `vtex.com`, `vtexpayments.com.br`. More domains are added only with evidence of VTEX ownership (see §10).
- **Credentials never go to a non-allowlisted origin.** Allowlist failure throws `VtexUsageError` before any network call.

### 3.2 Path safety (S2, defense in depth)
- **Encoding.** A new core helper, `encodePathParam(value: string | number)`, applies `encodeURIComponent`. It rejects `''`, `'.'` and `'..'` with `VtexUsageError`. Generated code (§4.3) and facades use it.
- **Final-URL check.** Before every fetch, the core builds the final URL and checks it:
  - `path` must start with `/`, contain no raw `?` or `#`, and contain no `.` or `..` segments. This is checked by comparing the concatenated path with its `new URL()`-normalized form.
  - The final origin must equal the resolved server origin.
  - The pathname must start with the server's base path.
  - Any violation throws `VtexUsageError` and no request is sent.

### 3.3 Retry policy (S3, S6)
**Classes of request**
- **Retry-safe:** `GET`, `HEAD`, `OPTIONS`, `PUT`, `DELETE` by default, or any request whose call options set `idempotent: true`. An explicit `idempotent: false` demotes a command-style PUT/DELETE; the VTEX schemas contain such commands, for example placing an order or debiting a credit account.
  - Retried on: network errors, per-attempt timeout, 429 and 500–599.
- **Non-idempotent:** `POST`, `PATCH` (default).
  - Retried only on:
    - 429;
    - connect-phase failures, where the request never reached the server: `cause.code` in `ECONNREFUSED`, `ENOTFOUND`, `EAI_AGAIN`, `UND_ERR_CONNECT_TIMEOUT`.
  - Never retried on 5xx, timeouts or mid-flight resets (`ECONNRESET`, `UND_ERR_SOCKET`). These are ambiguous: the server may already have applied the write.

**Limits and delays**
- **Per-call overrides:** `retry: false` disables retries. `retry: { maxRetries }` overrides the count. `idempotent: true` promotes a POST/PATCH to retry-safe; `idempotent: false` demotes a PUT/DELETE.
- **Connect-phase detection:** the error code is read from `cause.code`, falling back to a top-level `code` (undici's AggregateError, or an injected fetch).
- **Default `maxRetries`:** 3, unchanged.
- **`Retry-After`:** accepts delta-seconds and HTTP-date.
  - Capped by the new config `maxRetryAfterMs`, default `30000`.
  - If the server asks for longer than the cap, the SDK does not wait. It throws `VtexRateLimitError` (with `retryAfter`) immediately, so job runners can reschedule.
- **Backoff without `Retry-After`:** exponential with full jitter, base 200 ms, capped at `maxRetryAfterMs`.
- **Abortable waits:** every backoff sleep listens to the caller's `signal`. Aborting rejects promptly with the caller's abort reason. An already-aborted signal stops the request before anything is sent.
- **Body reads:** a failure or timeout while reading a response body is reported (`VtexNetworkError` / `VtexTimeoutError`) and not retried, even for retry-safe methods.
- **Cap scope:** `maxRetryAfterMs` caps both `Retry-After` waits and computed backoff, so `0` means "never wait" (immediate retries, still bounded by `maxRetries`).

### 3.4 Redirects (S5)
- **fetch setting:** every fetch uses `redirect: 'manual'`.
- **Same-origin redirects:** followed for at most 3 hops, and only:
  - 307 and 308, preserving method and body;
  - 301, 302 and 303 for `GET` and `HEAD` only.
- **Everything else:** cross-origin (including an http downgrade, another port, or another account's VTEX host), a `Location` carrying userinfo, or a 301/302/303 on another method, throws `VtexRequestError`. Its `status` is the 3xx code and its message says "redirect blocked". Headers are never re-sent to the new location.

### 3.5 Credential confidentiality (S4)
- **Private storage:** `VtexHttpClient` keeps auth headers in a `#private` field. The instance is frozen, so `account`/`environment` cannot be re-pointed at runtime. A frozen instance cannot take subclass fields, so the class is documented as not for subclassing; wrap it or use `VtexClient.request()`.
- **Header validation before sending:**
  - Credentials must be non-empty strings with no CR, LF or NUL. Header names must be RFC 9110 tokens, and values must contain no CR, LF or NUL.
  - Leading and trailing space, tab, CR and LF are stripped from a credential first, which is the same normalization fetch applies. A secret file's trailing newline therefore works. A credential that is empty after trimming is rejected.
  - `undefined`, `null` and `''` all count as "not configured". With `appKey=''`, `appToken=''` (blank env vars) and an `authCookie`, the client uses cookie authentication.
  - A violation throws `VtexUsageError`, naming the header but never echoing its value. Otherwise `fetch` would reject inside the retry loop with an error message containing the value, which may be a credential.
  - A body on GET/HEAD and an invalid HTTP method are rejected the same way.
  - `null` header values are skipped like `undefined`.
- **Redacted output:** `VtexHttpClient` and `VtexClient` implement `toJSON()` and `[Symbol.for('nodejs.util.inspect.custom')]`, both returning `{ account, environment }` only.
- **Coverage:** facades and generated namespaces reference the client only through these classes, so logging any of them is safe.
- **Error bodies:** `VtexRequestError.body` stays readable but becomes non-enumerable. Default serializers (`JSON.stringify`, most loggers) therefore omit response bodies, which can contain customer data.
- **Hooks:** hook payloads are unchanged for compatibility. The README documents that `url` includes the query string.

### 3.6 Errors (S7)
New hierarchy; existing classes keep their names and fields:

```
VtexError                         (new base, extends Error)
├─ VtexRequestError               (HTTP status; unchanged API; body non-enumerable)
│  ├─ VtexAuthError / VtexNotFoundError / VtexValidationError
│  ├─ VtexRateLimitError / VtexServerError
├─ VtexNetworkError               (new: cause, method, route, attempts)
│  └─ VtexTimeoutError            (new: per-attempt timeout exhausted)
├─ VtexUsageError                 (new: invalid account/environment/server/path/param/argument)
├─ VtexPaginationLimitError       (new: §5)
└─ VtexUnexpectedResponseError    (new: §5)
```

- `route` is the path without its query string, so no PII is carried.
- A caller-initiated abort is re-thrown as the native `AbortError` and stays distinguishable from `VtexTimeoutError`.

### 3.7 Factory (S8)
- **`forAccount(account)`** normalizes and validates the account (§3.1) and uses the normalized value as the cache key.
- **Resolver output:** only `appKey`, `appToken` and `authCookie` are taken from it. It can no longer change `account`, `environment`, `fetch` or `hooks`.
  - A non-object result rejects with `VtexUsageError` and is not cached.
- **Cache bound:** LRU, default 100 entries, configurable with `maxCachedClients`.
  - The value must be an integer ≥ 1. Anything else, such as `NaN` (which would otherwise leave the cache unbounded), throws `VtexUsageError` when the factory is created.
- **Auth failures:** an entry is evicted when its client gets a 401 or 403. The factory composes an internal response hook with the user's hooks.
  - The resolver runs again on the next `forAccount`. A 403 caused by a missing role therefore re-resolves credentials each time, so the resolver should be cheap or cache on its own side.
  - Callers that already hold the evicted client keep using it.

### 3.8 Public request API
- **New methods:** `VtexClient` gains public `request<T>(opts)` and `requestRaw<T>(opts)`. `requestRaw` returns `{ data, headers, status }`, exported as `VtexRawResponse<T>`.
- **Private transport:** the transport is a `#private` field of `VtexClient`, not a public or protected `http` member, so it can't be swapped to bypass the checks. `account` and `environment` are getters that read it.
- **Options:** `{ method, path, query?, body?, contentType?, headers?, server?, signal?, timeoutMs?, retry?, idempotent? }`.
- **Same safeguards:** these methods go through §3.1–§3.5. A `server` outside the allowlist is rejected. This replaces subclassing or reaching into `client.http` to read response headers (e.g. `REST-Content-Range`).
- **`VtexHttpClient`:** stays exported, with the same protections.

### 3.9 Config additions
- `maxRetryAfterMs?: number`, default `30000`.
- `maxCachedClients?: number`, factory only, default `100`.

Nothing is removed.

**Validation:** `maxRetries` (an integer >= 0), `timeoutMs` (> 0) and `maxRetryAfterMs` (>= 0) must be finite numbers, both at construction and per call. Otherwise the SDK throws `VtexUsageError`. Without this check, a `NaN` from an unset environment variable would silently turn every backoff into a retry after about 1 ms. Every timer delay is also clamped to setTimeout's ceiling (`MAX_TIMER_MS`).

## 4. Code generator (`scripts/codegen*`)

### 4.1 Servers (C1)
**Picking the server for an operation**
- **Precedence:** operation `servers` > path-item `servers` > document `servers`. Within a level, the first resolvable entry wins.
- **Variable resolution at generation time:**
  - **`accountName`** is resolved at runtime.
  - **`environment`** depends on its schema default:
    - `vtexcommercestable` or `vtexcommercebeta`: resolved at runtime from config.
    - `myvtex`: baked into the template at generation time, which yields `{accountName}.myvtex.com`.
    - Any other default (e.g. the junk `DefaultParameterValue`): resolved at runtime.
  - **`account`** is a spelling used by some Pricing servers and is treated as an alias of `accountName`.
  - **Any other variable** makes that entry unresolvable. Examples: `providerApiEndpoint`, `storeDomain`, `storeHost`, `middlewareEndpoint`, `fulfillmentEndpoint`, `workspace`.
- **No hard-coded accounts.** On account-scoped domains (`vtexcommercestable.com.br`, `vtexcommercebeta.com.br`, `myvtex.com`, `vtexpayments.com.br`), the host's first label must be `{accountName}` or a shared VTEX service label (`api`, `logistics`, `portal`, `prchub`, `rnb`). Otherwise the entry is unresolvable. This stops a schema example host such as `entelperu.vtexcommercestable.com.br` from receiving our credentials.
- **Base-path overlap.** When the server's last base-path segment equals the operation path's first segment, the duplicate is dropped. The 7 Pricing operations whose server ends in `/pricing` and whose paths start with `/pricing/` resolve to `api.vtex.com/{account}/pricing/...`, matching the API reference. Without the rule they would get `/pricing/pricing/...`.

**How the result is emitted**
- Each generated call passes `server: '<template>'`, for example `'https://{accountName}.{environment}.com.br/api'`.
- The default account template is omitted, so generated code stays compact.

### 4.2 Excluded APIs
- **What is excluded:** an API is left out of `RawNamespaces` when none of its operations resolves to an allowlisted VTEX host. These are protocols that integrators implement, not call, plus third-party hosts:
  - Payment Provider Protocol, Antifraud Provider API, Giftcard Provider Protocol, External Promotions Protocol;
  - the Marketplace Protocol external seller/marketplace specs;
  - B2B Password Migration Protocol;
  - Punchout;
  - Ads (newtail);
  - Pick and Pack (pickingnpacking.com).
- **Partial exclusion:** individual operations whose only servers are external are dropped from otherwise-included APIs.
- **Expected numbers at the current pin:** 966 operations included and 95 excluded.
  - 12 APIs are excluded in full: Ads, Antifraud Provider, B2B Password Migration, External Promotions, Giftcard Provider, the two Marketplace Protocol external-seller specs, Payment Provider, Pick and Pack, Pick and Pack Last Mile, Punchout, Tracking.
  - Two operations are dropped from otherwise-included APIs: Payments Gateway `POST /api/payments/transactions/{transactionId}/payments` (`api.vtexvault.com`, see §10) and Promotions & Taxes `POST /pub/bundles` (placeholder host `example.com`).
- **Types are kept:** excluded APIs still get their `types.ts`, and the types are exported (§4.7). Implementers of these protocols can use them.
- **Visibility:** the generator prints the exclusion list.

### 4.3 Call shape (S2, C3)
- **Path params:** emitted as `${encodePathParam(params.x)}`.
- **Header params:** parameters with `in: 'header'` become typed fields on `params`, required when the schema says so.
  - Except a case-insensitive denylist managed by the SDK or by `fetch`: `accept`, `content-type`, `content-length`, `host`, `x-vtex-api-appkey`, `x-vtex-api-apptoken`, `vtexidclientautcookie`, `cookie`, `authorization`.
  - Values are sent in the request headers.
  - Name collisions with path, query or body keys keep the first, which is the existing rule.
- **Per-call options:** every method gains `opts?: CallOptions = { headers?, signal?, timeoutMs?, retry?, idempotent? }`.
  - `opts.headers` are merged last, exactly as today, so a caller can deliberately override a header for one call.
  - Generated header *params* can never carry auth headers, because of the denylist above.
- **Optional params:** when no params field is required, `params` becomes optional. This removes the dummy `{}` that 62 methods need today and is backward compatible.

### 4.4 Request and response content types (C2)
**Request body type, chosen by the first matching declared content type**

| Declared content type | Body type in TS | How it is sent |
|---|---|---|
| `application/json` and `application/*+json` | typed JSON | JSON with that exact `Content-Type`, e.g. `application/vnd.vtex.giftcard.v1+json`. This fixes `createGiftCard` and the Hub writes. |
| `multipart/form-data` and `form-data` | `FormData` | `Content-Type` left for `fetch` to set, so the boundary is included. The generated call still declares `multipart/form-data`, so a non-FormData body is rejected rather than sent as JSON. |
| `application/x-www-form-urlencoded` | `URLSearchParams \| Record<string, string>` | form-encoded |
| `text/csv` and `text/plain` | `string` | as-is |

**Plumbing**
- `RequestOptions` gains `contentType?`.
- The core serializes by `contentType`:
  - **Sent as is:** `FormData`, `URLSearchParams`, `Blob`/`File` and binary buffers.
    - They are recognized by their `toString` tag, so instances from another realm or library also work.
    - A declared content type wins over the body's own type.
    - `FormData` never sets `Content-Type`.
  - **JSON types (the default):** `JSON.stringify`. A string therefore becomes a JSON string value, which matches the VTEX operations whose JSON body is a bare string.
  - **`application/x-www-form-urlencoded`:** strings pass through untouched. A flat object of primitives becomes `URLSearchParams` (`undefined` fields are skipped).
  - **Any other content type:** only strings are accepted.
  - **Rejected:** everything else (streams, nested form values, values JSON cannot represent) throws `VtexUsageError`, and nothing is sent.

**Response parsing:** `parseBody` treats `application/json` and `application/*+json` as JSON.

### 4.5 Types (C4)
- **`nullable: true`:** `T | null`.
- **OpenAPI 3.1-style `type: [...]` arrays:** a union. One schema, Profile System, uses them.
- **Arrays:** the item type is parenthesized when it is a union or intersection, giving `(A | B)[]`.
- **`additionalProperties`:**
  - `true` or `{}` adds `[key: string]: unknown`;
  - a schema adds `[key: string]: T`;
  - the index signature is merged with any declared properties.
- **Placeholder keys:** property keys of the form `{name}` become an index signature `[key: string]: T` instead of a literal key. There are 24 such keys, e.g. `{fieldName}` in Master Data and `{ID}` in Checkout.
- **Targeted schema overrides** (`scripts/codegen/overrides.ts`) fix quirks where a VTEX schema uses a *literal* key to mean "any key". The generic rules cannot detect these. Each override names its file, its JSON pointer, a transform and the reason. Codegen fails if a pointer no longer resolves, so a schema re-pin surfaces stale overrides. Initial set:
  - Orders API `components/schemas/Headers`: from `{ key: string }` to `Record<string, string>` (order-hook headers).
  - Orders API `POST /api/orders/hook/config` 200 schema: from the notification payload to `unknown`.
  - Promotions & Taxes API coupon usage `profileUsages`: from a literal `profileId` property to a map keyed by profile id.
  - Search API `GET .../crossselling/showtogether/{productId}` and `GET .../crossselling/accessories/{productId}`: their operation-level `servers` were copied from another store (`entelperu`) and are removed. Both fall back to the account host.

### 4.6 Generator hardening (S9)
- **Paths:** schema paths must match `^/[A-Za-z0-9\-._~!&'()*+,;=:@%/{}]*$`, and placeholder names must match `^[A-Za-z0-9_.-]+$`. Anything else, such as a backtick, `$`, `\` or whitespace, fails generation loudly.
- **String literals:** every emitted literal (names, keys, header names, server templates) goes through `JSON.stringify`/`quoteString`. Nothing is interpolated raw.
- **Server templates:** they also pass the §4.1 resolution and are allowlist-checked at generation time.

### 4.7 Type exports
- **Root export:** the root entry exports one type namespace per API, e.g. `import type { OrdersApiTypes, GiftcardApiTypes } from 'vtex-sdk'`. The generator emits an aggregator, `src/generated/types-index.ts`.
- **Implementation note:** the exact re-export form (`export type * as` versus `import type * as` plus `export type { }`) is whatever `tsup`'s d.ts bundling handles. This is verified by the build and by an `exports` test.

## 5. Facades
- **`orders.list`**
  - Validates `perPage` (1–100).
  - Stops after page 30.
  - If VTEX reports more pages, it throws `VtexPaginationLimitError` after yielding page 30, with a message to narrow `f_creationDate`. It never silently truncates.
- **`masterData`**
  - Validates `dataEntity` (`^[A-Za-z0-9_-]{1,64}$`) and encodes it.
  - `get(entity, id, opts?)` accepts `fields`.
  - `scroll` validates `_size` (1–1000) and throws `VtexUnexpectedResponseError` on a non-array body.
  - The 20-minute scroll-token inactivity expiry is documented. It is not auto-restarted, because restarting would duplicate rows.
- **All facades**
  - Every facade method accepts a trailing `opts?: CallOptions`.
  - `checkout.simulate` defaults to `idempotent: true`, since it is a read-like POST.
  - Facades keep their existing paths. The account-host `/api/pricing` works in production and stays.

## 6. Repository, licensing, packaging
**Upstream schemas**
- `schemas/` is removed from the tree and added to `.gitignore`.
- **`scripts/fetch-schemas.ts`:**
  - keeps the pinned commit;
  - accepts `download_url`s only on `raw.githubusercontent.com`;
  - verifies each file's git blob SHA-1 against the SHA in the GitHub listing.
- **`npm run codegen`** fails with a clear message when `schemas/` is missing.
- `src/generated/` stays committed, so consumers never run codegen.

**Licensing**
- `LICENSE`: MIT, "Copyright (c) 2026 Heron Jr".
- `NOTICE`: generated types and methods derive from VTEX's OpenAPI documents (© VTEX). This is an unofficial project with no affiliation to VTEX.

**`package.json`**
- `version: "0.2.0"`, `license: "MIT"`, `repository`, `engines: { node: ">=20" }`.
- `exports` uses nested `import`/`require` conditions, each with its own `types` (`index.d.ts` / `index.d.cts`).
- `prepare` is kept, so git installs build `dist/`.
- `src/index.ts`: `VERSION = '0.2.0'`.

**Build and dev dependencies**
- tsup `target: 'node20'`.
- Dev dependencies are upgraded (vitest et al.) until `npm audit` reports 0.

**`.gitignore`** gains `schemas/`, `.env*`, `coverage/`, `*.tgz` and `.npmrc`.

**Docs**
- README rewritten:
  - claims match the code: coverage, servers, retry semantics, per-call options, errors, security notes;
  - install via git tag;
  - unofficial disclaimer.
- `docs/vtex-notes.md` corrected.
- `CHANGELOG.md` added.
- `docs/superpowers/specs/2026-07-17-vtex-sdk-design.md`: the author line becomes "Heron Jr + Claude".
- `docs/superpowers/plans/2026-07-17-vtex-sdk.md`: the earlier scoped package name (`@<scope>/vtex-sdk`) becomes `vtex-sdk`.

**CI** (`.github/workflows/ci.yml`)
- Main job, on push and PR, Node 20/22/24:
  - `npm ci`;
  - `typecheck`;
  - `test`;
  - `build`.
- A second job runs `fetch-schemas` and `codegen`, then `git diff --exit-code src/generated`, to prove the generated code is reproducible.

## 7. Testing (vitest; all offline unless stated)
- **Regression:** the existing 84 tests pass. Retry tests are updated to §3.3 semantics.
- **S1:** the audit's hostile inputs throw `VtexUsageError` before `fetch` is called:
  - accounts: `evil.com#`, `evil.com/`, `evil.com?`, `a.evil.com?`, `evil.com\`, `evil.com:8443#`, `lojax.evil.com#`;
  - an injected `environment`;
  - `factory.forAccount('attacker.example#')`.
- **S2:**
  - traversal ids (`..`, `.`, `../../x`, `a/b`, `x#`, `x?y`) on a generated method and on `masterData.get`/`scroll` are encoded or rejected;
  - a hand-built `request()` with a dot-segment path is rejected.
- **S3**, each case asserting the number of `fetch` calls:
  - POST + 503: 1 call;
  - POST + timeout: 1 call, `VtexTimeoutError`;
  - POST + 429: retried;
  - POST + `ECONNREFUSED`: retried;
  - POST + `ECONNRESET`: not retried;
  - POST with `idempotent: true` + 503: retried;
  - GET + 503: retried;
  - `retry: false`: no retries.
- **S4:** `util.inspect` and `JSON.stringify` of `VtexClient`, `VtexHttpClient`, a facade, a raw namespace and a `VtexRequestError` contain no token. `err.body` is still readable.
- **S5:** an injected fetch returns 3xx:
  - a same-origin 307 is followed with method and body preserved;
  - a cross-origin 302 throws without a second call to the foreign host;
  - fetch was always called with `redirect: 'manual'`;
  - the hop limit holds.
- **S6:**
  - `Retry-After: 3` is waited;
  - an HTTP-date is parsed;
  - `Retry-After: 3600` throws `VtexRateLimitError` immediately;
  - aborting during backoff settles in under 50 ms.
- **S7:** network and timeout failures surface as `VtexNetworkError` / `VtexTimeoutError` with `cause`. A caller abort surfaces as `AbortError`.
- **S8:**
  - the resolver cannot change the account;
  - the LRU bound holds;
  - an entry is evicted on 401.
- **Generator unit tests:**
  - server precedence (op > path > doc);
  - `myvtex` baking;
  - unresolvable-variable exclusion;
  - `/api` base for Gift Card;
  - `vnd+json` body emission;
  - header params typed and denylist honored;
  - optional `params`;
  - hostile path rejected;
  - the four type cases.
- **Host contract test:** for every generated operation, resolving its server with `account: 'acme'`, `environment: 'vtexcommercestable'` yields an allowlisted https origin. Spot checks:
  - `POST /api/giftcards`;
  - `api.vtex.com/acme/pricing/...`;
  - `acme.myvtex.com/api/vtexid/...`;
  - `/api/rnb/pvt/coupon`;
  - `/api/orders/feed`.
- **Downstream-compatibility test:** reproduces a known consumer's usage verbatim:
  - `new VtexClient({ account, environment: 'vtexcommercestable', appKey, appToken, maxRetries: 4, timeoutMs: 30_000 })`;
  - `orders.get(id)`;
  - `instanceof VtexNotFoundError` / `VtexAuthError`.
- **Optional live check:** `scripts/live-check.ts` is read-only and never runs in CI. It runs only when `VTEX_ACCOUNT`/`VTEX_APP_KEY`/`VTEX_APP_TOKEN` are set in the environment. It makes these calls:
  - list orders with `per_page=1`;
  - get a random non-existent coupon, expecting 404;
  - gift-card `_search` with `REST-Range`.

**Definition of done:** `typecheck`, `test`, `build`, `npm audit` and `npm pack --dry-run` are clean, with output attached to the hand-off. CI is green on the branch.

## 8. Delivery
- **Working copy:** a local clone of the repository, branch `fix/hardening-0.2.0`.
- **Commits:**
  - authored with the owner's chosen personal git identity, set in the repo-local git config;
  - granular, in the existing conventional style (`fix(core): …`, `feat(codegen): …`, `docs: …`), with `Co-Authored-By` trailers as in the existing history.
- **Order of steps:**
  1. Push the branch to `origin` (`github.com/heron-jr/vtex-sdk`).
  2. The owner reviews.
  3. Fast-forward `main`, tag `v0.2.0`, and push the tag.
- **Visibility:** making the repository public is a separate, manual decision by the owner (§10).
- **Consumers:**
  - New consumers install the pinned tag: `npm install github:heron-jr/vtex-sdk#v0.2.0`. The `prepare` script builds `dist/`.
  - Existing consumers that vendor a tarball upgrade on their own schedule.

## 9. Compatibility and breaking changes (0.1.0 → 0.2.0)
**Breaking**
1. POST/PATCH are no longer retried on 5xx, timeouts or mid-flight network errors. Opt in per call with `idempotent: true`.
2. Invalid `account`/`environment` throw `VtexUsageError` at construction.
3. Operations now hit their documented host/base path, e.g. Gift Card `/api/...`, Pricing on `api.vtex.com`, and myvtex-hosted APIs.
4. Non-VTEX-hosted APIs and operations are removed from `raw` (§4.2); their types remain.
5. Network and timeout failures throw `VtexNetworkError` / `VtexTimeoutError` instead of `TypeError` / `AbortError`.
6. `VtexRequestError.body` is non-enumerable, so it is omitted by `JSON.stringify(err)`.
7. `orders.list` throws `VtexPaginationLimitError` instead of requesting page 31+.
8. A `Retry-After` beyond `maxRetryAfterMs` throws immediately instead of sleeping.
9. Node ≥ 20.

**Additive**
- Per-call `opts`.
- Public `request`/`requestRaw`.
- Typed header params.
- Optional `params`.
- Exported type namespaces.
- `VtexError` base and the new error classes.
- `maxRetryAfterMs` and `maxCachedClients`.

**Unchanged**
- Constructor options.
- Facade method names and paths.
- Generated method names.
- The existing error classes and their fields.
- The hook payloads.

## 10. Accepted risks and open items
- **History stays as is (owner decision).** If the repo is made public, old commits still show:
  - author emails;
  - the earlier scoped package name;
  - the formerly committed VTEX OpenAPI files. These include VTEX's own example credentials, which will raise GitHub secret-scanning alerts. They are false positives and can be dismissed.
- **Upstream licensing.** `vtex/openapi-schemas` declares no license. Mitigations:
  - the schemas are no longer redistributed;
  - NOTICE and the disclaimer cover the derived code;
  - optionally, ask VTEX for an explicit license.
- **Allowlist candidates.** `vtexvault.com` (Payments Gateway card vault) and `vtextracking.com` (Tracking) are added only if VTEX ownership is confirmed from developers.vtex.com during implementation. Otherwise their operations are excluded (§4.2).
- **Live behavior.** Live behavior of the corrected hosts is verified only by the optional live check (§7). Offline tests prove the URLs, not VTEX's responses.

## Appendix A — Finding → section map

| Finding | Fixed in |
|---|---|
| S1 host injection | §3.1, §3.7 |
| S2 path injection | §3.2, §4.3, §5 |
| S3 non-idempotent retries | §3.3 |
| S4 credential serialization | §3.5 |
| S5 redirect leak | §3.4 |
| S6 Retry-After / abort | §3.3 |
| S7 untyped network errors | §3.6 |
| S8 factory cache | §3.7 |
| S9 codegen injection | §4.6 |
| C1 servers ignored | §4.1, §4.2 |
| C2 dropped bodies | §4.4 |
| C3 headers / per-call options | §4.3, §3.8 |
| C4 type gaps / exports | §4.5, §4.7 |
| C5 facade limits | §5 |
| C6 packaging / docs | §6 |
