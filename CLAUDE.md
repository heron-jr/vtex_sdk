# CLAUDE.md

Guidance for Claude (and other coding agents) working with **vtex-sdk**, an unofficial TypeScript SDK for the
VTEX commerce APIs. Two situations are covered: writing code that *uses* the SDK, and changing the SDK itself.

## Where things are

| You need | Look in |
|---|---|
| Which VTEX system covers a task, with worked examples | [docs/guides/README.md](docs/guides/README.md) (systems map) |
| The exact SDK call for an endpoint (all 964 operations) | [docs/api-reference/](docs/api-reference/README.md), one file per API |
| Client options, retries, errors, security model | [README.md](README.md) |
| Hosts, auth and rate-limit notes about VTEX itself | [docs/vtex-notes.md](docs/vtex-notes.md) |
| Why the code is the way it is (0.2.0 hardening) | [docs/superpowers/specs/](docs/superpowers/specs/) |

To find an operation, search the reference by HTTP path or by a word from the summary:

```bash
grep -rn "orders/{orderId}/invoice" docs/api-reference/
grep -rln "gift card" docs/api-reference/
```

Each row gives the call (`invoice.invoiceNotification({ orderId, body })`), the HTTP method and path, and the
optional keys. Prefix it with `vtex.raw.<namespace>` from the top of that file.

## Using the SDK in another project

1. **Credentials** come from the environment or a secret manager, never from source, logs or test fixtures.
   `account` comes from trusted configuration, never from request input.
2. **Prefer the layers in order**: facade (`vtex.orders`, `vtex.catalog`, `vtex.masterData`, `vtex.pricing`,
   `vtex.logistics`, `vtex.checkout`) → generated (`vtex.raw.*`) → `vtex.request()` for undocumented endpoints.
   With `request()`, wrap every interpolated path value in `encodePathParam`.
3. **Type payloads from the method** instead of hand-writing interfaces:

   ```ts
   type InvoiceBody = Parameters<typeof vtex.raw.ordersAPI.invoice.invoiceNotification>[0]['body']
   ```

   Named schemas are also exported per API, e.g. `import type { OrdersApiTypes } from 'vtex-sdk'`.
4. **Writes**: POST and PATCH are not retried after a timeout or 5xx. Only pass `{ idempotent: true }` when
   repeating the call cannot change the outcome (an upsert keyed by a natural id). Pass `{ idempotent: false }`
   for command-style PUTs such as `checkoutAPI.orderPlacement.placeOrder`.
5. **Pagination**: `orders.list()` stops at VTEX's 30-page limit with `VtexPaginationLimitError`; split the
   query into time windows. `masterData.scroll()` never restarts an expired scroll; start a new one.
6. **Errors**: branch on classes (`VtexNotFoundError`, `VtexAuthError`, `VtexRateLimitError`, …), not on
   message text. `VtexUsageError` means the call was invalid and nothing was sent.
7. **Personal data**: Master Data, orders and checkout carry customer data. Request only the fields you need
   and don't log bodies or query strings.
8. Responses are **not validated at runtime**; the generated types describe VTEX's documented shape. Check the
   fields your code depends on.

## Changing the SDK

```bash
npm ci
npm run typecheck && npm test && npm run build
npm run check-doc-examples     # type-checks every ```ts block in README, CLAUDE.md and docs/guides
npm run fetch-schemas && npm run codegen   # only when regenerating; needs network
```

- `src/generated/` and `docs/api-reference/` are **generated**: never edit them by hand. Change
  `scripts/codegen/*` (or `scripts/codegen/overrides.ts` for a broken upstream schema) and run `npm run codegen`.
  CI fails if a regenerated tree differs from the committed one.
- `schemas/` (the VTEX OpenAPI documents) is downloaded on demand from the commit pinned in
  `scripts/schemas.lock.json`, with every file's blob SHA checked. It is gitignored: never commit it.
- Hand-written code: `src/core/` (transport, URL/host checks, retries, errors), `src/facades/`, `src/client.ts`,
  `src/factory.ts`. Tests live in `test/` and use an injected `fetch`; they never call VTEX.
- After a schema re-pin, run `npm run check-doc-links` to verify the developer-portal links.

### Security invariants (keep them; each has tests)

- Credentials are only sent to hosts in `VTEX_DOMAIN_ALLOWLIST` (`src/core/url.ts`); on `vtex.com` only
  `api.vtex.com` and `sp.vtex.com`. Never widen the allowlist without confirming VTEX owns the host.
- Path parameters are always encoded; dot segments and control characters are refused.
- Redirects never leave the origin; credentials never appear in `toJSON`, `inspect` or error objects.
- POST/PATCH are not retried on ambiguous failures unless the caller opts in.
- The package has **no runtime dependencies**. Don't add one; prefer Node built-ins. Dev dependencies stay
  minimal (typescript, tsup, tsx, vitest, @types/node).
- Never commit `.env`, keys, real account names, order ids or customer data, including in tests and docs.
  Use placeholders such as `myaccount` and `1234567890123-01`.

### Style

Conventional commits (`fix(core): …`, `feat(codegen): …`, `docs: …`). Keep docs short and concrete, and make
every ```ts example compile: inputs it doesn't define go in `declare const` lines.
