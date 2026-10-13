# vtex-sdk 0.2.0 Security Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the security defects (S1–S9) and correctness gaps (C1–C6) found in the 0.1.0 audit and ship vtex-sdk 0.2.0 on the existing GitHub repository.

**Architecture:** The existing design stays: core transport, generated `raw.*` layer, hand-written facades. The transport is hardened:
- host allowlist and path safety;
- method-aware retries;
- manual redirects;
- private credentials;
- typed network errors.

The generator is changed in three ways:
- it honors OpenAPI `servers`, request content types and header params, and generated methods gain per-call options;
- the type generator is fixed;
- schema quirks are corrected through targeted overrides.

Finally, the repository is cleaned up for publication.

**Tech Stack:** TypeScript 5.9, Node.js ≥ 20 (native `fetch`), tsup 8.5, vitest 4.1, tsx 4.

**Spec:** `docs/superpowers/specs/2026-10-12-vtex-sdk-hardening-design.md` (section numbers below refer to it).

---

## Conventions

- **Where to run things:** run every command from the repository root, with the clone on branch `fix/hardening-0.2.0`. Shell: Git Bash (POSIX).
- **Commits:** use the repo-local git identity already configured by the owner; Task 0 checks it. Commit with `git commit -F -` and a heredoc, exactly as shown in each task. Every message ends with a blank line followed by `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Pushing:** do not push before Task 20, and never force-push. `main` is only touched in Task 20's last step, and only after the owner approves.
- **Privacy:** do not write any company, customer or person name into the repository. It may become public.
- **Pass criterion:** "All tests pass" means the vitest summary reports no failed tests. "Typecheck clean" means `npm run typecheck` exits 0 and prints nothing.
- **Replacing a file:** "Replace the file with" means overwrite its entire content with the block shown.

## File map

| File | Responsibility | Task |
|---|---|---|
| `package.json`, `package-lock.json`, `tsup.config.ts` | Toolchain, Node ≥ 20, CJS type mapping, esbuild override | 1, 17, 18, 19 |
| `src/core/errors.ts` | `VtexError` hierarchy; non-enumerable bodies; HTTP-date `Retry-After` | 2 |
| `src/core/url.ts` | Account/environment validation, VTEX host allowlist, server resolution, path encoding, URL building | 3, 6 |
| `src/core/retry.ts` | Method-aware retry decision, `Retry-After` parsing, capped backoff, abortable sleep | 2, 4, 6 |
| `src/core/body.ts` | Content-type aware request body serialization | 5 |
| `src/core/types.ts` | `CallOptions`, `RequestOptions`, `maxRetryAfterMs` | 6 |
| `src/core/call.ts` | `withCall` (merge per-call options) and `encodePathParam` for generated code | 6 |
| `src/core/http.ts` | Hardened transport | 6 |
| `src/client.ts` | Public `request`/`requestRaw`, redacted inspection | 7 |
| `src/factory.ts` | Normalized cache keys, credential-only resolver, LRU, eviction on 401/403 | 8 |
| `scripts/codegen/types.ts` | Schema → TS type fixes | 9 |
| `scripts/codegen/overrides.ts` | Targeted schema overrides | 10 |
| `scripts/codegen/servers.ts` | Server selection, host rules, base-path overlap | 11 |
| `scripts/codegen/operation.ts` | Generated method shape | 12 |
| `scripts/codegen/integrity.ts`, `scripts/fetch-schemas.ts` | Verified schema downloads | 13 |
| `scripts/codegen.ts`, `src/generated/**` | Driver and regenerated output | 14 |
| `.gitignore`, `schemas/` | Stop committing upstream schemas | 15 |
| `src/facades/*` | Per-call options, encoded ids, page limits, Master Data validation | 16 |
| `src/index.ts` | Public surface, `VERSION` | 17 |
| `README.md`, `docs/vtex-notes.md`, `CHANGELOG.md`, `LICENSE`, `NOTICE`, older docs | Documentation and licensing | 18 |
| `.github/workflows/ci.yml`, `scripts/live-check.ts` | CI and optional live check | 19 |

---

## Task 0: Preflight

- [ ] **Step 1: Confirm branch, clean tree and identity**

```bash
git status --short --branch
git config user.name
git config user.email
```

Expected:
- The first line is `## fix/hardening-0.2.0` and nothing else is listed (the spec commit is already on the branch).
- The name and email are the owner's chosen identity. If they are empty, stop and ask the owner. Do not invent an identity.

- [ ] **Step 2: Baseline install and tests**

```bash
npm ci
npm test
```

Expected: `Test Files  19 passed (19)` and `Tests  84 passed (84)`.

---

## Task 1: Toolchain upgrade (spec §6)

**Files:**
- Modify: `package.json`, `package-lock.json`, `tsup.config.ts`

- [ ] **Step 1: Upgrade the dev dependencies**

```bash
npm install -D vitest@4.1.11 tsup@8.5.1 tsx@4.23.15 typescript@5.9.3 @types/node@^20.19.43
```

- [ ] **Step 2: Replace `package.json` with**

```json
{
  "name": "vtex-sdk",
  "version": "0.1.0",
  "description": "TypeScript SDK for the VTEX API (multi-account).",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  },
  "files": [
    "dist"
  ],
  "sideEffects": false,
  "engines": {
    "node": ">=20"
  },
  "scripts": {
    "build": "tsup",
    "prepare": "npm run build",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "fetch-schemas": "tsx scripts/fetch-schemas.ts",
    "codegen": "tsx scripts/codegen.ts"
  },
  "devDependencies": {
    "@types/node": "^20.19.43",
    "tsup": "^8.5.1",
    "tsx": "^4.23.15",
    "typescript": "^5.9.3",
    "vitest": "^4.1.11"
  },
  "overrides": {
    "tsup": {
      "esbuild": "^0.28.2"
    }
  }
}
```

The `overrides` entry moves tsup's esbuild off the version range affected by GHSA-g7r4-m6w7-qqqr. The nested `exports` conditions give CommonJS consumers their own `.d.cts` types.

- [ ] **Step 3: Apply the override to the lockfile**

```bash
npm install
```

- [ ] **Step 4: Target Node 20 in tsup**

```bash
sed -i "s/target: 'node18'/target: 'node20'/" tsup.config.ts
grep -n "target" tsup.config.ts
```

Expected: `  target: 'node20',`

- [ ] **Step 5: Verify**

```bash
npm audit
npm run typecheck
npm test
npm run build
node -e "const p=require('./package.json');const fs=require('fs');for(const c of ['import','require']){const t=p.exports['.'][c].types;if(!fs.existsSync(t))throw new Error(c+' types missing: '+t)}console.log('exports types ok')"
```

Expected:
- `found 0 vulnerabilities`;
- typecheck clean;
- `Tests  84 passed (84)`;
- three `Build success` lines (CJS, ESM, DTS);
- `exports types ok`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsup.config.ts
git commit -F - <<'EOF'
build: upgrade toolchain, require Node 20, map CJS types

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 2: Error hierarchy (spec §3.6, S7; `Retry-After` dates for S6)

**Files:**
- Modify: `src/core/errors.ts`, `src/core/retry.ts`
- Test: `test/core/errors.test.ts`

- [ ] **Step 1: Write the failing test.** Replace `test/core/errors.test.ts` with

```ts
import { inspect } from 'node:util'
import { describe, it, expect, vi } from 'vitest'
import {
  mapResponseToError, VtexAuthError, VtexNotFoundError,
  VtexValidationError, VtexRateLimitError, VtexServerError, VtexRequestError,
  VtexError, VtexNetworkError, VtexTimeoutError, VtexUsageError,
  VtexPaginationLimitError, VtexUnexpectedResponseError,
} from '../../src/core/errors.js'

const h = (init: Record<string, string> = {}) => new Headers(init)

describe('mapResponseToError', () => {
  it('maps 401/403 to VtexAuthError', () => {
    expect(mapResponseToError(401, {}, h())).toBeInstanceOf(VtexAuthError)
    expect(mapResponseToError(403, {}, h())).toBeInstanceOf(VtexAuthError)
  })
  it('maps 404 to VtexNotFoundError', () => {
    expect(mapResponseToError(404, {}, h())).toBeInstanceOf(VtexNotFoundError)
  })
  it('maps 400/422 to VtexValidationError', () => {
    expect(mapResponseToError(400, {}, h())).toBeInstanceOf(VtexValidationError)
    expect(mapResponseToError(422, {}, h())).toBeInstanceOf(VtexValidationError)
  })
  it('maps 429 to VtexRateLimitError with retryAfter from header', () => {
    const err = mapResponseToError(429, {}, h({ 'Retry-After': '30' })) as VtexRateLimitError
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect(err.retryAfter).toBe(30)
  })
  it('maps 5xx to VtexServerError', () => {
    expect(mapResponseToError(500, {}, h())).toBeInstanceOf(VtexServerError)
    expect(mapResponseToError(503, {}, h())).toBeInstanceOf(VtexServerError)
  })
  it('carries status, body and requestId', () => {
    const err = mapResponseToError(400, { error: 'bad' }, h({ 'x-request-id': 'abc' }))
    expect(err.status).toBe(400)
    expect(err.body).toEqual({ error: 'bad' })
    expect(err.requestId).toBe('abc')
    expect(err).toBeInstanceOf(VtexRequestError)
  })
  it('requestId falls back to x-vtex-request-id when x-request-id is absent', () => {
    const err = mapResponseToError(400, {}, h({ 'x-vtex-request-id': 'vtex-123' }))
    expect(err.requestId).toBe('vtex-123')
  })
  it('429 with no Retry-After header yields retryAfter as undefined', () => {
    const err = mapResponseToError(429, {}, h()) as VtexRateLimitError
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect(err.retryAfter).toBeUndefined()
  })
  it('429 with non-numeric Retry-After header yields retryAfter as undefined', () => {
    const err = mapResponseToError(429, {}, h({ 'Retry-After': 'abc' })) as VtexRateLimitError
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect(err.retryAfter).toBeUndefined()
  })
  it('converts delta-seconds Retry-After to whole seconds, rounding up', () => {
    const retryAfter = (value: string) => (mapResponseToError(429, {}, h({ 'Retry-After': value })) as VtexRateLimitError).retryAfter
    expect(retryAfter('1.5')).toBe(2)
    expect(retryAfter('0')).toBe(0)
  })
  it('parses an HTTP-date Retry-After into seconds', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-12T12:00:00Z'))
    try {
      const retryAfter = (value: string) => (mapResponseToError(429, {}, h({ 'Retry-After': value })) as VtexRateLimitError).retryAfter
      expect(retryAfter('Mon, 12 Oct 2026 12:00:10 GMT')).toBe(10)
      expect(retryAfter('Mon, 12 Oct 2026 11:00:00 GMT')).toBe(0)
    } finally {
      vi.useRealTimers()
    }
  })
  it('ignores Retry-After values that are neither delta-seconds nor an HTTP-date', () => {
    for (const value of ['abc 5', '-5', '.5', '2026-10-12', '9'.repeat(400)]) {
      expect((mapResponseToError(429, {}, h({ 'Retry-After': value })) as VtexRateLimitError).retryAfter).toBeUndefined()
    }
  })
  it('unmapped status code (405) maps to plain VtexRequestError, not a subclass', () => {
    const err = mapResponseToError(405, {}, h())
    expect(err).toBeInstanceOf(VtexRequestError)
    expect(err).not.toBeInstanceOf(VtexAuthError)
    expect(err).not.toBeInstanceOf(VtexNotFoundError)
    expect(err).not.toBeInstanceOf(VtexValidationError)
    expect(err).not.toBeInstanceOf(VtexRateLimitError)
    expect(err).not.toBeInstanceOf(VtexServerError)
    expect(err.constructor.name).toBe('VtexRequestError')
  })
  it('each error class reports its own name', () => {
    expect(mapResponseToError(401, {}, h()).name).toBe('VtexAuthError')
    expect(mapResponseToError(404, {}, h()).name).toBe('VtexNotFoundError')
    expect(mapResponseToError(400, {}, h()).name).toBe('VtexValidationError')
    expect(mapResponseToError(429, {}, h()).name).toBe('VtexRateLimitError')
    expect(mapResponseToError(500, {}, h()).name).toBe('VtexServerError')
    expect(mapResponseToError(405, {}, h()).name).toBe('VtexRequestError')
  })
})

describe('error hierarchy', () => {
  it('every SDK error extends VtexError', () => {
    const net = { cause: new Error('c'), method: 'GET', route: '/r', attempts: 1 }
    expect(mapResponseToError(404, {}, h())).toBeInstanceOf(VtexError)
    expect(new VtexNetworkError('x', net)).toBeInstanceOf(VtexError)
    expect(new VtexTimeoutError('x', net)).toBeInstanceOf(VtexNetworkError)
    expect(new VtexUsageError('x')).toBeInstanceOf(VtexError)
    expect(new VtexPaginationLimitError('x')).toBeInstanceOf(VtexError)
    expect(new VtexUnexpectedResponseError('x', [])).toBeInstanceOf(VtexError)
  })

  it('network errors carry cause, method, route and attempts', () => {
    const cause = new Error('socket hang up')
    const err = new VtexNetworkError('failed', { cause, method: 'POST', route: '/api/x', attempts: 3 })
    expect(err.cause).toBe(cause)
    expect(err.method).toBe('POST')
    expect(err.route).toBe('/api/x')
    expect(err.attempts).toBe(3)
    expect(err.name).toBe('VtexNetworkError')
    expect(new VtexTimeoutError('t', { cause, method: 'GET', route: '/r', attempts: 1 }).name).toBe('VtexTimeoutError')
  })

  it('keeps the response body readable but out of default serialization', () => {
    const err = mapResponseToError(400, { email: 'shopper@example.com' }, h())
    expect(err.body).toEqual({ email: 'shopper@example.com' })
    expect(Object.keys(err)).not.toContain('body')
    expect(JSON.stringify(err)).not.toContain('shopper@example.com')
    expect(inspect(err)).not.toContain('shopper@example.com')
  })

  it('VtexUnexpectedResponseError hides its body the same way', () => {
    const err = new VtexUnexpectedResponseError('bad', { email: 'shopper@example.com' })
    expect(err.body).toEqual({ email: 'shopper@example.com' })
    expect(JSON.stringify(err)).not.toContain('shopper@example.com')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/core/errors.test.ts`
Expected: FAIL. `VtexError`, `VtexNetworkError` and the other new classes are not exported.

- [ ] **Step 3: Add `parseRetryAfterMs` to the end of `src/core/retry.ts`**

Keep the existing `shouldRetry` and `computeBackoff` for now; Task 6 removes them.

```ts

/**
 * Parses Retry-After into milliseconds. Accepts delta-seconds and HTTP-dates
 * (IMF-fixdate or RFC 850, both ending in "hh:mm:ss GMT"); anything else is
 * ignored, because Date.parse also accepts junk such as "abc 5".
 */
export function parseRetryAfterMs(value: string | null | undefined, now: number = Date.now()): number | undefined {
  if (value === null || value === undefined) return undefined
  const trimmed = value.trim()
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const ms = Math.round(Number(trimmed) * 1000)
    return Number.isFinite(ms) ? ms : undefined
  }
  if (!/\d{2}:\d{2}:\d{2} GMT$/.test(trimmed)) return undefined
  const at = Date.parse(trimmed)
  if (Number.isNaN(at)) return undefined
  return Math.max(0, at - now)
}
```

- [ ] **Step 4: Replace `src/core/errors.ts` with**

```ts
import { parseRetryAfterMs } from './retry.js'

/** Base class of every error thrown by the SDK. */
export class VtexError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = new.target.name
  }
}

/** VTEX answered with a non-2xx HTTP status. */
export class VtexRequestError extends VtexError {
  readonly status: number
  /** Parsed response body. Non-enumerable, so default serializers do not log it (it may contain PII). */
  declare readonly body: unknown
  readonly requestId?: string
  /** Seconds to wait, from the Retry-After header (delta-seconds or HTTP-date). */
  readonly retryAfter?: number

  constructor(message: string, opts: { status: number; body: unknown; requestId?: string; retryAfter?: number }) {
    super(message)
    this.status = opts.status
    Object.defineProperty(this, 'body', { value: opts.body, enumerable: false, writable: true, configurable: true })
    this.requestId = opts.requestId
    this.retryAfter = opts.retryAfter
  }
}

export class VtexAuthError extends VtexRequestError {}
export class VtexNotFoundError extends VtexRequestError {}
export class VtexValidationError extends VtexRequestError {}
export class VtexRateLimitError extends VtexRequestError {}
export class VtexServerError extends VtexRequestError {}

/** The request never produced a usable HTTP response (DNS, connection, socket or body-read failure). */
export class VtexNetworkError extends VtexError {
  readonly method: string
  /** Request path without the query string. */
  readonly route: string
  readonly attempts: number

  constructor(message: string, opts: { cause: unknown; method: string; route: string; attempts: number }) {
    super(message, { cause: opts.cause })
    this.method = opts.method
    this.route = opts.route
    this.attempts = opts.attempts
  }
}

/** The per-attempt timeout elapsed and no retry was allowed or left. */
export class VtexTimeoutError extends VtexNetworkError {}

/** The SDK was called with an invalid argument or configuration; nothing was sent. */
export class VtexUsageError extends VtexError {}

/** A paginated facade reached a VTEX page limit while more results remained. */
export class VtexPaginationLimitError extends VtexError {}

/** VTEX answered 2xx with a body the SDK cannot interpret. */
export class VtexUnexpectedResponseError extends VtexError {
  declare readonly body: unknown

  constructor(message: string, body: unknown) {
    super(message)
    Object.defineProperty(this, 'body', { value: body, enumerable: false, writable: true, configurable: true })
  }
}

export function mapResponseToError(status: number, body: unknown, headers: Headers): VtexRequestError {
  const requestId = headers.get('x-request-id') ?? headers.get('x-vtex-request-id') ?? undefined
  const retryAfterMs = parseRetryAfterMs(headers.get('retry-after'))
  const retryAfter = retryAfterMs === undefined ? undefined : Math.ceil(retryAfterMs / 1000)
  const base = { status, body, requestId, retryAfter }
  const msg = `VTEX request failed with status ${status}`
  if (status === 401 || status === 403) return new VtexAuthError(msg, base)
  if (status === 404) return new VtexNotFoundError(msg, base)
  if (status === 400 || status === 422) return new VtexValidationError(msg, base)
  if (status === 429) return new VtexRateLimitError(msg, base)
  if (status >= 500) return new VtexServerError(msg, base)
  return new VtexRequestError(msg, base)
}
```

- [ ] **Step 5: Run the tests**

```bash
npx vitest run test/core/errors.test.ts
npm run typecheck
npm test
```

Expected: errors tests PASS, typecheck clean, all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/core/errors.ts src/core/retry.ts test/core/errors.test.ts
git commit -F - <<'EOF'
feat(core): VtexError hierarchy, typed network errors, private error bodies

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 3: URL safety primitives (spec §3.1, §3.2, S1, S2)

**Files:**
- Modify: `src/core/url.ts`
- Test: `test/core/url.test.ts`

- [ ] **Step 1: Write the failing test.** Replace `test/core/url.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import {
  buildQuery, normalizeAccount, validateEnvironment, isAllowlistedHost,
  resolveServer, encodePathParam, buildRequestUrl, DEFAULT_SERVER,
  VTEX_DOMAIN_ALLOWLIST, VTEX_ENVIRONMENTS,
} from '../../src/core/url.js'
import { VtexUsageError } from '../../src/core/errors.js'

const BACKSLASH = String.fromCharCode(92)

describe('normalizeAccount', () => {
  it('lowercases a valid account', () => {
    expect(normalizeAccount('LojaX')).toBe('lojax')
    expect(normalizeAccount('my-store-1')).toBe('my-store-1')
  })
  it('accepts the 63-character boundary', () => {
    expect(normalizeAccount('a'.repeat(63))).toHaveLength(63)
  })
  it.each([
    'evil.com#', 'evil.com/', 'evil.com?', 'a.evil.com?', 'evil.com\\', 'evil.com:8443#',
    'lojax.evil.com#', 'x@evil.com', ' lojax', '-lojax', '',
    'a.b', 'lojax.evil.com', 'acme.', '.acme', 'a'.repeat(64), 'acme\n', 'acme\t', 'acme-', 'a_b',
    '\u212Aacme',
  ])('rejects %j', (account) => {
    expect(() => normalizeAccount(account)).toThrow(VtexUsageError)
  })
  it.each([undefined, null, 123, {}, ['acme']])('rejects non-string %j', (account) => {
    expect(() => normalizeAccount(account)).toThrow(VtexUsageError)
  })
})

describe('validateEnvironment', () => {
  it('defaults to vtexcommercestable', () => {
    expect(validateEnvironment(undefined)).toBe('vtexcommercestable')
  })
  it('accepts vtexcommercebeta', () => {
    expect(validateEnvironment('vtexcommercebeta')).toBe('vtexcommercebeta')
  })
  it.each(['evil.com#', 'myvtex', 'VTEXCOMMERCESTABLE', ''])('rejects %j', (env) => {
    expect(() => validateEnvironment(env)).toThrow(VtexUsageError)
  })
})

describe('isAllowlistedHost', () => {
  it.each([
    'acme.vtexcommercestable.com.br', 'acme.myvtex.com', 'api.vtex.com',
    'acme.vtexpayments.com.br', 'portal.vtexcommercebeta.com.br',
    'vtex.com', 'myvtex.com', 'ACME.MyVtex.com',
  ])('allows %s', (host) => {
    expect(isAllowlistedHost(host)).toBe(true)
  })
  it.each([
    'evil.com', 'vtex.com.evil.com', 'evilvtex.com', 'acme.vtexcommercestable.com.br.evil.com',
    'acme.vtexcommercestable.com.br.', '127.0.0.1', '[::1]', '', 'a..vtex.com', ' api.vtex.com',
    'evil.com/.vtex.com',
  ])('blocks %j', (host) => {
    expect(isAllowlistedHost(host)).toBe(false)
  })
  it('checks the raw hostname shape before lowercasing', () => {
    expect(isAllowlistedHost(String.fromCharCode(0x212a) + 'acme.vtex.com')).toBe(false)
  })
  it('cannot be widened at runtime', () => {
    expect(Object.isFrozen(VTEX_DOMAIN_ALLOWLIST)).toBe(true)
    expect(Object.isFrozen(VTEX_ENVIRONMENTS)).toBe(true)
    expect(() => (VTEX_DOMAIN_ALLOWLIST as string[]).push('attacker.example')).toThrow(TypeError)
    expect(isAllowlistedHost('attacker.example')).toBe(false)
  })
})

describe('resolveServer', () => {
  it('resolves the default account host', () => {
    expect(resolveServer(DEFAULT_SERVER, 'acme', 'vtexcommercestable')).toEqual({
      origin: 'https://acme.vtexcommercestable.com.br', basePath: '',
    })
  })
  it('keeps a base path without the trailing slash', () => {
    expect(resolveServer('https://{accountName}.{environment}.com.br/api/', 'acme', 'vtexcommercebeta')).toEqual({
      origin: 'https://acme.vtexcommercebeta.com.br', basePath: '/api',
    })
  })
  it('supports account-in-path hosts', () => {
    expect(resolveServer('https://api.vtex.com/{accountName}', 'acme', 'vtexcommercestable')).toEqual({
      origin: 'https://api.vtex.com', basePath: '/acme',
    })
  })
  it('upgrades http to https', () => {
    expect(resolveServer('http://api.vtex.com', 'acme', 'vtexcommercestable').origin).toBe('https://api.vtex.com')
  })
  it.each([
    'https://evil.com', 'https://{accountName}.evil.com', 'https://{storeDomain}/api',
    'https://acme.vtexcommercestable.com.br:8443', 'https://u:p@api.vtex.com', 'ftp://api.vtex.com',
    'https://api.vtex.com/x?y=1',
    'https://api.vtex.com/#frag',
    'https://api.vtex.com/{storeDomain}',
    'https://{accountName}@api.vtex.com',
    'https://api.vtex.com:{accountName}',
    `https://evil.com${BACKSLASH}@api.vtex.com`,
    'https://evil.com#@api.vtex.com',
    'https://api.vtex.com\t.evil.com',
    'https://vt\u0435x.com',
    'https://127.0.0.1',
    'https://[::1]',
    'https://acme.vtexcommercestable.com.br.',
  ])('rejects %j', (template) => {
    expect(() => resolveServer(template, 'acme', 'vtexcommercestable')).toThrow(VtexUsageError)
  })
  it('never lets a backslash smuggle a second host', () => {
    expect(resolveServer(`https://api.vtex.com${BACKSLASH}@evil.com`, 'acme', 'vtexcommercestable').origin).toBe(
      'https://api.vtex.com',
    )
  })
  it('validates the account and environment itself (defense in depth)', () => {
    expect(() => resolveServer('https://api.vtex.com/{accountName}', '../../x', 'vtexcommercestable')).toThrow(VtexUsageError)
    expect(() => resolveServer('https://api.vtex.com/{accountName}', 'evil.com#', 'vtexcommercestable')).toThrow(VtexUsageError)
    expect(() => resolveServer(DEFAULT_SERVER, 'acme', 'evil.com#' as never)).toThrow(VtexUsageError)
    // Without environment validation this would resolve to the allowlisted acme.myvtex.com.
    expect(() => resolveServer('https://{accountName}.{environment}.com', 'acme', 'myvtex' as never)).toThrow(VtexUsageError)
  })
  it('rejects a non-string template', () => {
    expect(() => resolveServer(undefined as never, 'acme', 'vtexcommercestable')).toThrow(VtexUsageError)
  })
})

describe('encodePathParam', () => {
  it('encodes reserved characters', () => {
    expect(encodePathParam('a/b')).toBe('a%2Fb')
    expect(encodePathParam('x?y#z')).toBe('x%3Fy%23z')
    expect(encodePathParam('../x')).toBe('..%2Fx')
    expect(encodePathParam(42)).toBe('42')
  })
  it('double-encodes percent signs so %2e%2e stays a literal id', () => {
    expect(encodePathParam('%2e%2e')).toBe('%252e%252e')
    expect(encodePathParam('...')).toBe('...')
  })
  it.each(['', '.', '..'])('rejects %j', (value) => {
    expect(() => encodePathParam(value)).toThrow(VtexUsageError)
  })
  it.each([undefined, null, Number.NaN, Number.POSITIVE_INFINITY, {}, ['a', 'b']])('rejects %j', (value) => {
    expect(() => encodePathParam(value as never)).toThrow(VtexUsageError)
  })
  it('turns an unpaired surrogate into a usage error', () => {
    expect(() => encodePathParam('\uD800')).toThrow(VtexUsageError)
  })
})

describe('buildRequestUrl', () => {
  const server = { origin: 'https://acme.vtexcommercestable.com.br', basePath: '/api' }
  it('joins base path, path and query', () => {
    expect(buildRequestUrl(server, '/giftcards/1', { a: 1 })).toBe(
      'https://acme.vtexcommercestable.com.br/api/giftcards/1?a=1',
    )
  })
  it('works with an empty base path', () => {
    expect(buildRequestUrl({ ...server, basePath: '' }, '/x')).toBe('https://acme.vtexcommercestable.com.br/x')
  })
  it('keeps encoded ids intact', () => {
    expect(buildRequestUrl(server, `/orders/${encodePathParam('a/b?c#d')}`)).toBe(
      'https://acme.vtexcommercestable.com.br/api/orders/a%2Fb%3Fc%23d',
    )
  })
  it.each([
    'giftcards', '/a/../b', '/a/./b', '/a/%2e%2e/b', '/a?b', '/a#b', '/a\\b', '/a b',
    '/a\tb', '/a\n../b', '/a/.\t./b', '/a/%2E%2E/b', '/a/%2e/b', '/caf\u00E9',
  ])('rejects %j', (path) => {
    expect(() => buildRequestUrl(server, path)).toThrow(VtexUsageError)
  })
  it('rejects a non-string path', () => {
    expect(() => buildRequestUrl(server, undefined as never)).toThrow(VtexUsageError)
    expect(() => buildRequestUrl(server, 1n as never)).toThrow(VtexUsageError)
  })
  it('rejects an unparsable server origin and one with a port', () => {
    expect(() => buildRequestUrl({ origin: 'not a url', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'https://acme.vtexcommercestable.com.br:8443', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a base path that would change the origin', () => {
    expect(() => buildRequestUrl({ ...server, basePath: '@evil.com' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a non-canonical server origin', () => {
    expect(() => buildRequestUrl({ origin: 'https://ACME.vtexcommercestable.com.br', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'https://acme.vtexcommercestable.com.br:443', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a server that is not https on an allowlisted host', () => {
    expect(() => buildRequestUrl({ origin: 'https://evil.com', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'http://acme.vtexcommercestable.com.br', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
})

describe('buildQuery', () => {
  it('returns empty string for no params', () => {
    expect(buildQuery()).toBe('')
    expect(buildQuery({})).toBe('')
  })
  it('serializes scalars and skips undefined/null', () => {
    expect(buildQuery({ page: 1, q: 'a b', skip: undefined, none: null })).toBe('?page=1&q=a+b')
  })
  it('repeats array values', () => {
    expect(buildQuery({ id: [1, 2] })).toBe('?id=1&id=2')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/core/url.test.ts`
Expected: FAIL. `normalizeAccount` and the other new functions are not exported.

- [ ] **Step 3: Replace `src/core/url.ts` with the following, then append the legacy shim below it**

```ts
import { VtexUsageError } from './errors.js'
import type { VtexEnvironment } from './types.js'

/** Default server template: the account host. */
export const DEFAULT_SERVER = 'https://{accountName}.{environment}.com.br'

export const VTEX_ENVIRONMENTS: readonly VtexEnvironment[] = Object.freeze(['vtexcommercestable', 'vtexcommercebeta'] as const)

/** Registrable domains the SDK may send credentials to. Frozen, because it is the core of host safety. */
export const VTEX_DOMAIN_ALLOWLIST: readonly string[] = Object.freeze([
  'vtexcommercestable.com.br',
  'vtexcommercebeta.com.br',
  'myvtex.com',
  'vtex.com',
  'vtexpayments.com.br',
])

const ACCOUNT_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i
const HOSTNAME_RE = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i

/** Validates a VTEX account name (a single ASCII DNS label) and lowercases it. */
export function normalizeAccount(account: unknown): string {
  if (typeof account !== 'string' || account === '') throw new VtexUsageError('VTEX account is required')
  if (!ACCOUNT_RE.test(account)) {
    throw new VtexUsageError(`Invalid VTEX account name ${JSON.stringify(account)}: use letters, digits and hyphens only`)
  }
  return account.toLowerCase()
}

/** Validates a VTEX environment name; defaults to vtexcommercestable. */
export function validateEnvironment(environment: unknown = 'vtexcommercestable'): VtexEnvironment {
  if (typeof environment !== 'string' || !(VTEX_ENVIRONMENTS as readonly string[]).includes(environment)) {
    throw new VtexUsageError(
      `Invalid VTEX environment ${JSON.stringify(environment)}: expected one of ${VTEX_ENVIRONMENTS.join(', ')}`,
    )
  }
  return environment as VtexEnvironment
}

/** True when a parsed URL hostname is an allowlisted VTEX domain or a subdomain of one. */
export function isAllowlistedHost(hostname: string): boolean {
  if (typeof hostname !== 'string' || !HOSTNAME_RE.test(hostname)) return false
  const host = hostname.toLowerCase()
  return VTEX_DOMAIN_ALLOWLIST.some((domain) => host === domain || host.endsWith(`.${domain}`))
}

export interface ResolvedServer {
  /** e.g. "https://acme.vtexcommercestable.com.br" */
  readonly origin: string
  /** Path prefix without a trailing slash, e.g. "/api" or "" */
  readonly basePath: string
}

/** Fills a server template with a validated account and environment, then checks the resulting host. */
export function resolveServer(template: string, account: string, environment: VtexEnvironment): ResolvedServer {
  if (typeof template !== 'string') throw new VtexUsageError(`Server template must be a string (got ${typeof template})`)
  const accountName = normalizeAccount(account)
  const env = validateEnvironment(environment)
  const filled = template.replaceAll('{accountName}', () => accountName).replaceAll('{environment}', () => env)
  if (/[{}]/.test(filled)) throw new VtexUsageError(`Unresolved variable in server template ${JSON.stringify(template)}`)
  let url: URL
  try {
    url = new URL(filled)
  } catch {
    throw new VtexUsageError(`Invalid server template ${JSON.stringify(template)}`)
  }
  if (url.protocol === 'http:') url.protocol = 'https:'
  if (url.protocol !== 'https:') throw new VtexUsageError(`Server template must use https: ${JSON.stringify(template)}`)
  if (url.username || url.password || url.port || url.search || url.hash) {
    throw new VtexUsageError(
      `Server template must not contain credentials, a port, a query or a fragment: ${JSON.stringify(template)}`,
    )
  }
  if (!isAllowlistedHost(url.hostname)) {
    throw new VtexUsageError(`Refusing to send VTEX credentials to non-VTEX host ${JSON.stringify(url.hostname)}`)
  }
  return { origin: url.origin, basePath: url.pathname.replace(/\/+$/, '') }
}

/** Encodes one path segment; rejects missing, non-finite and dot-segment values. */
export function encodePathParam(value: string | number): string {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new VtexUsageError(`Invalid path parameter ${String(value)}`)
  } else if (typeof value !== 'string') {
    throw new VtexUsageError('Path parameter must be a string or a finite number')
  }
  const text = String(value)
  if (text === '' || text === '.' || text === '..') throw new VtexUsageError(`Invalid path parameter ${JSON.stringify(text)}`)
  try {
    return encodeURIComponent(text)
  } catch {
    throw new VtexUsageError('Path parameter contains an unpaired surrogate')
  }
}

/** Serializes query parameters, skipping undefined/null and repeating array values. */
export function buildQuery(query?: Record<string, unknown>): string {
  if (!query) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, String(v))
    } else {
      params.append(key, String(value))
    }
  }
  const s = params.toString()
  return s ? `?${s}` : ''
}

/**
 * Joins server, path and query. Refuses paths that are not strings, are relative,
 * carry their own query/fragment, contain dot segments or characters the URL parser
 * would rewrite, and any result that is not https on an allowlisted host or that
 * changes the server's origin. Paths must be pre-encoded (see encodePathParam).
 */
export function buildRequestUrl(server: ResolvedServer, path: string, query?: Record<string, unknown>): string {
  if (typeof path !== 'string') throw new VtexUsageError(`Request path must be a string (got ${typeof path})`)
  if (!path.startsWith('/')) throw new VtexUsageError(`Request path must start with "/": ${JSON.stringify(path)}`)
  if (/[?#\\]/.test(path)) throw new VtexUsageError(`Request path must not contain "?", "#" or "\\": ${JSON.stringify(path)}`)
  const rawPath = server.basePath + path
  let url: URL
  try {
    url = new URL(server.origin + rawPath)
  } catch {
    throw new VtexUsageError(`Invalid request URL for path ${JSON.stringify(path)}`)
  }
  if (
    url.protocol !== 'https:' ||
    url.port !== '' ||
    !isAllowlistedHost(url.hostname) ||
    url.origin !== server.origin ||
    url.pathname !== rawPath
  ) {
    throw new VtexUsageError(`Request path is not normalized or escapes the server: ${JSON.stringify(path)}`)
  }
  return url.origin + url.pathname + buildQuery(query)
}
```

Legacy shim. Append it at the end of the file; Task 6 deletes it once the transport resolves servers itself:

```ts

/** Legacy helper used by the 0.1 transport until the transport rewrite. */
export function resolveBaseUrl(account: string, environment: VtexEnvironment = 'vtexcommercestable'): string {
  return resolveServer(DEFAULT_SERVER, normalizeAccount(account), validateEnvironment(environment)).origin
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/core/url.test.ts
npm run typecheck
npm test
```

Expected: url tests PASS, typecheck clean, all tests pass. The existing transport still uses `resolveBaseUrl`, which now validates the account.

- [ ] **Step 5: Commit**

```bash
git add src/core/url.ts test/core/url.test.ts
git commit -F - <<'EOF'
feat(core): validate account/environment, allowlist VTEX hosts, safe URL building

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 4: Retry primitives (spec §3.3, S3, S6)

**Files:**
- Modify: `src/core/retry.ts`
- Test: `test/core/retry.test.ts`

- [ ] **Step 1: Write the failing test.** Replace `test/core/retry.test.ts` with

```ts
import { getEventListeners } from 'node:events'
import { performance } from 'node:perf_hooks'
import { describe, it, expect, vi } from 'vitest'
import {
  isRetrySafe, isConnectPhaseError, shouldRetryFailure, parseRetryAfterMs, backoffDelay, sleep, MAX_TIMER_MS,
} from '../../src/core/retry.js'

describe('isRetrySafe', () => {
  it('treats GET/HEAD/OPTIONS/PUT/DELETE as retry-safe', () => {
    for (const method of ['GET', 'head', 'OPTIONS', 'PUT', 'DELETE']) expect(isRetrySafe(method)).toBe(true)
  })
  it('treats POST/PATCH as unsafe unless marked idempotent', () => {
    expect(isRetrySafe('POST')).toBe(false)
    expect(isRetrySafe('PATCH')).toBe(false)
    expect(isRetrySafe('POST', true)).toBe(true)
  })
  it('lets idempotent: false demote a command-style PUT/DELETE', () => {
    expect(isRetrySafe('PUT', false)).toBe(false)
    expect(isRetrySafe('DELETE', false)).toBe(false)
  })
})

describe('isConnectPhaseError', () => {
  const withCode = (code: string) =>
    Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(code), { code }) })

  it.each(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])('recognizes %s', (code) => {
    expect(isConnectPhaseError(withCode(code))).toBe(true)
  })
  it.each(['ECONNRESET', 'UND_ERR_SOCKET', 'EPIPE', 'ETIMEDOUT'])('does not treat %s as connect-phase', (code) => {
    expect(isConnectPhaseError(withCode(code))).toBe(false)
  })
  it('recognizes the shape undici uses for localhost (an AggregateError cause)', () => {
    const cause = Object.assign(new AggregateError([], 'connect'), { code: 'ECONNREFUSED' })
    expect(isConnectPhaseError(Object.assign(new TypeError('fetch failed'), { cause }))).toBe(true)
  })
  it('reads a top-level code, as an injected fetch may report it', () => {
    expect(isConnectPhaseError(Object.assign(new Error('refused'), { code: 'ECONNREFUSED' }))).toBe(true)
  })
  it('handles values without a usable code', () => {
    expect(isConnectPhaseError(new Error('x'))).toBe(false)
    expect(isConnectPhaseError(undefined)).toBe(false)
    expect(isConnectPhaseError(null)).toBe(false)
    expect(isConnectPhaseError('ECONNREFUSED')).toBe(false)
    expect(isConnectPhaseError({ cause: null })).toBe(false)
  })
})

describe('shouldRetryFailure', () => {
  const ctx = (method: string, extra: { idempotent?: boolean; attempt?: number; maxRetries?: number } = {}) => ({
    method, attempt: 0, maxRetries: 3, ...extra,
  })

  it('retries 429 for every method', () => {
    expect(shouldRetryFailure(ctx('POST'), { kind: 'status', status: 429 })).toBe(true)
  })
  it('retries 5xx only for retry-safe requests', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('POST'), { kind: 'status', status: 503 })).toBe(false)
    expect(shouldRetryFailure(ctx('POST', { idempotent: true }), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('PUT', { idempotent: false }), { kind: 'status', status: 503 })).toBe(false)
  })
  it('only treats 500-599 as server errors', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 500 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 599 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 600 })).toBe(false)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 408 })).toBe(false)
  })
  it('never retries other 4xx', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 404 })).toBe(false)
  })
  it('retries timeouts only for retry-safe requests', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'timeout' })).toBe(true)
    expect(shouldRetryFailure(ctx('PATCH'), { kind: 'timeout' })).toBe(false)
    expect(shouldRetryFailure(ctx('PATCH', { idempotent: true }), { kind: 'timeout' })).toBe(true)
  })
  it('retries connect-phase errors for every method, other network errors only when safe', () => {
    expect(shouldRetryFailure(ctx('POST'), { kind: 'network', connectPhase: true })).toBe(true)
    expect(shouldRetryFailure(ctx('POST'), { kind: 'network', connectPhase: false })).toBe(false)
    expect(shouldRetryFailure(ctx('POST', { idempotent: true }), { kind: 'network', connectPhase: false })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'network', connectPhase: false })).toBe(true)
  })
  it('stops exactly when the retry budget is spent', () => {
    expect(shouldRetryFailure(ctx('GET', { attempt: 2 }), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET', { attempt: 3 }), { kind: 'status', status: 503 })).toBe(false)
    expect(shouldRetryFailure(ctx('GET', { maxRetries: 0 }), { kind: 'status', status: 429 })).toBe(false)
  })
})

describe('parseRetryAfterMs', () => {
  it('parses delta-seconds', () => {
    expect(parseRetryAfterMs('3')).toBe(3000)
    expect(parseRetryAfterMs('0')).toBe(0)
    expect(parseRetryAfterMs('1.5')).toBe(1500)
  })
  it('parses an HTTP-date relative to now', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Mon, 12 Oct 2026 12:00:30 GMT', now)).toBe(30_000)
  })
  it('clamps past dates to zero', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Mon, 12 Oct 2026 11:00:00 GMT', now)).toBe(0)
  })
  it('accepts the obsolete RFC 850 date form', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Monday, 12-Oct-26 12:00:30 GMT', now)).toBe(30_000)
  })
  it('returns undefined for missing or invalid values', () => {
    expect(parseRetryAfterMs(null)).toBeUndefined()
    expect(parseRetryAfterMs('')).toBeUndefined()
    expect(parseRetryAfterMs('soon')).toBeUndefined()
  })
  it('rejects values that only look like dates or numbers', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    for (const value of ['abc 5', '-5', '+5', '.5', '1.', '2026-10-12', 'Mon Oct 12 12:00:30 2026', '9'.repeat(400)]) {
      expect(parseRetryAfterMs(value, now)).toBeUndefined()
    }
  })
})

describe('backoffDelay', () => {
  it('uses Retry-After when present, capped', () => {
    expect(backoffDelay(0, 2_000, 30_000)).toBe(2_000)
    expect(backoffDelay(0, 60_000, 30_000)).toBe(30_000)
  })
  it('uses full-jitter exponential backoff otherwise', () => {
    expect(backoffDelay(0, undefined, 30_000, () => 0.5)).toBe(100)
    expect(backoffDelay(2, undefined, 30_000, () => 0.5)).toBe(400)
    expect(backoffDelay(20, undefined, 1_000, () => 0.999)).toBe(999)
    expect(backoffDelay(0, undefined, 30_000, () => 0)).toBe(0)
  })
  it('keeps a huge attempt count under the cap', () => {
    expect(backoffDelay(5_000, undefined, 15_000, () => 0.999)).toBe(14_985)
  })
})

describe('sleep', () => {
  it('resolves after the delay and removes its abort listener', async () => {
    const controller = new AbortController()
    const started = performance.now()
    const pending = sleep(20, controller.signal)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(1)
    await pending
    expect(performance.now() - started).toBeGreaterThanOrEqual(15)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)
  })
  it('rejects promptly with the abort reason and removes its listener', async () => {
    const controller = new AbortController()
    const started = performance.now()
    const pending = sleep(5_000, controller.signal).catch((e: unknown) => e)
    setTimeout(() => controller.abort(), 10)
    const err = await pending
    expect((err as Error).name).toBe('AbortError')
    expect(performance.now() - started).toBeLessThan(1_000)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)
  })
  it('passes a custom abort reason through unchanged', async () => {
    const controller = new AbortController()
    const reason = new Error('shutting down')
    const pending = sleep(5_000, controller.signal).catch((e: unknown) => e)
    controller.abort(reason)
    expect(await pending).toBe(reason)
  })
  it('rejects immediately when already aborted', async () => {
    const controller = new AbortController()
    controller.abort()
    const err = await sleep(5_000, controller.signal).catch((e: unknown) => e)
    expect((err as Error).name).toBe('AbortError')
  })
  it('falls back to an AbortError when a signal has no reason', async () => {
    const signal = { aborted: true, reason: undefined } as unknown as AbortSignal
    const err = await sleep(5_000, signal).catch((e: unknown) => e)
    expect((err as Error).name).toBe('AbortError')
  })
  it('exposes the setTimeout ceiling', () => {
    expect(MAX_TIMER_MS).toBe(2_147_483_647)
  })
  it('keeps waiting for an oversized delay instead of firing after ~1 ms', async () => {
    const controller = new AbortController()
    let settled = false
    const pending = sleep(Number.POSITIVE_INFINITY, controller.signal).then(
      () => { settled = true },
      (e: unknown) => { settled = true; return e },
    )
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(settled).toBe(false)
    controller.abort()
    expect(((await pending) as Error).name).toBe('AbortError')
  })
  it('treats a NaN delay as zero', async () => {
    vi.useFakeTimers()
    try {
      let resolved = false
      const pending = sleep(Number.NaN).then(() => { resolved = true })
      await vi.advanceTimersByTimeAsync(0)
      await pending
      expect(resolved).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/core/retry.test.ts`
Expected: FAIL. `isRetrySafe` and the other new functions are not exported.

- [ ] **Step 3: Append to the end of `src/core/retry.ts`**

The old `shouldRetry`/`computeBackoff` stay until Task 6 because the current transport still imports them.

```ts

/** Largest delay setTimeout honors; larger values fire after about 1 ms. */
export const MAX_TIMER_MS = 2_147_483_647

export interface RetryContext {
  method: string
  idempotent?: boolean
  /** Retries already performed (0 on the first failure). */
  attempt: number
  maxRetries: number
}

export type Failure =
  | { kind: 'status'; status: number }
  | { kind: 'timeout' }
  | { kind: 'network'; connectPhase: boolean }

const RETRY_SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'])
const CONNECT_PHASE_CODES = new Set(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])

/**
 * GET/HEAD/OPTIONS/PUT/DELETE are retry-safe by default. An explicit `idempotent`
 * wins: `true` promotes a POST/PATCH, `false` demotes a command-style PUT/DELETE.
 */
export function isRetrySafe(method: string, idempotent?: boolean): boolean {
  return idempotent ?? RETRY_SAFE_METHODS.has(method.toUpperCase())
}

/** True when a fetch rejection happened before any request bytes were written. */
export function isConnectPhaseError(err: unknown): boolean {
  const error = err as { code?: unknown; cause?: { code?: unknown } | null } | null | undefined
  const code = error?.cause?.code ?? error?.code
  return typeof code === 'string' && CONNECT_PHASE_CODES.has(code)
}

/**
 * 429 is always retried. 5xx, timeouts and mid-flight network errors are retried only
 * for retry-safe requests, because a non-idempotent write may already have been applied.
 * Connect-phase failures are always retried: no request bytes were written.
 */
export function shouldRetryFailure(ctx: RetryContext, failure: Failure): boolean {
  if (ctx.attempt >= ctx.maxRetries) return false
  const safe = isRetrySafe(ctx.method, ctx.idempotent)
  switch (failure.kind) {
    case 'status':
      return failure.status === 429 || (safe && failure.status >= 500 && failure.status <= 599)
    case 'timeout':
      return safe
    case 'network':
      return safe || failure.connectPhase
  }
}

/**
 * Delay before the next attempt (`attempt` = retries already performed, 0-based):
 * Retry-After when given, else exponential backoff with full jitter. Callers must
 * reject a Retry-After above `capMs` before calling; the clamp here is a safety net.
 */
export function backoffDelay(
  attempt: number,
  retryAfterMs: number | undefined,
  capMs: number,
  rand: () => number = Math.random,
): number {
  if (retryAfterMs !== undefined) return Math.min(retryAfterMs, capMs)
  const ceiling = Math.min(capMs, 200 * 2 ** attempt)
  return Math.floor(rand() * ceiling)
}

/**
 * setTimeout-based sleep that rejects with the signal's reason (or an AbortError when
 * the signal has none) as soon as it aborts. `ms` is clamped to [0, MAX_TIMER_MS];
 * NaN counts as 0.
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const abortReason = () => signal?.reason ?? new DOMException('This operation was aborted', 'AbortError')
    if (signal?.aborted) {
      reject(abortReason())
      return
    }
    const onAbort = () => {
      clearTimeout(timer)
      reject(abortReason())
    }
    const delay = Math.min(Math.max(Number.isNaN(ms) ? 0 : ms, 0), MAX_TIMER_MS)
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, delay)
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/core/retry.test.ts
npm run typecheck
npm test
```

Expected: retry tests PASS, typecheck clean, all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/core/retry.ts test/core/retry.test.ts
git commit -F - <<'EOF'
feat(core): method-aware retry policy, capped backoff and abortable sleep

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 5: Body serialization (spec §4.4)

**Files:**
- Create: `src/core/body.ts`
- Test: `test/core/body.test.ts`

- [ ] **Step 1: Write the failing test.** Create `test/core/body.test.ts` with

```ts
import { Readable } from 'node:stream'
import { describe, it, expect } from 'vitest'
import { isJsonContentType, mediaType, serializeBody } from '../../src/core/body.js'
import { VtexUsageError } from '../../src/core/errors.js'

describe('mediaType', () => {
  it('drops parameters, trims and lowercases', () => {
    expect(mediaType(' Application/JSON ; charset=UTF-8')).toBe('application/json')
  })
})

describe('isJsonContentType', () => {
  it.each([
    'application/json', 'application/json; charset=utf-8', 'APPLICATION/JSON', ' application/json ',
    'application/json ;charset=utf-8', 'application/vnd.vtex.giftcard.v1+json', 'application/problem+json',
    'application/json-patch+json',
  ])('accepts %j', (ct) => {
    expect(isJsonContentType(ct)).toBe(true)
  })
  it.each([
    'text/plain', 'application/jsonp', 'multipart/form-data', 'application/x-www-form-urlencoded', '',
    'application/json-seq', 'application/jsonl', 'text/json', 'xapplication/json', 'application/json, application/xml',
  ])('rejects %j', (ct) => {
    expect(isJsonContentType(ct)).toBe(false)
  })
})

describe('serializeBody', () => {
  it('returns no body for undefined', () => {
    expect(serializeBody(undefined)).toStrictEqual({ body: undefined, contentType: undefined })
  })
  it('JSON-encodes objects with the default content type', () => {
    expect(serializeBody({ a: 1 })).toStrictEqual({ body: '{"a":1}', contentType: 'application/json' })
  })
  it('JSON-encodes with a vendor JSON content type', () => {
    expect(serializeBody({ a: 1 }, 'application/vnd.vtex.giftcard.v1+json')).toStrictEqual({
      body: '{"a":1}', contentType: 'application/vnd.vtex.giftcard.v1+json',
    })
  })
  it('JSON-encodes a string when the content type is JSON (VTEX has bare-string JSON bodies)', () => {
    expect(serializeBody('2025-12-09T08:00:00')).toStrictEqual({ body: '"2025-12-09T08:00:00"', contentType: 'application/json' })
  })
  it('JSON-encodes falsy values and null instead of dropping them', () => {
    expect(serializeBody(0).body).toBe('0')
    expect(serializeBody(false).body).toBe('false')
    expect(serializeBody('').body).toBe('""')
    expect(serializeBody(null).body).toBe('null')
  })
  it('rejects values JSON cannot represent', () => {
    const circular: Record<string, unknown> = {}
    circular.self = circular
    expect(() => serializeBody(circular)).toThrow(VtexUsageError)
    expect(() => serializeBody(1n)).toThrow(VtexUsageError)
    expect(() => serializeBody(() => 1)).toThrow(VtexUsageError)
  })
  it('passes strings through for text content types', () => {
    expect(serializeBody('a,b', 'text/csv')).toStrictEqual({ body: 'a,b', contentType: 'text/csv' })
  })
  it('rejects non-string bodies for text and other non-JSON content types', () => {
    expect(() => serializeBody({ a: 1 }, 'text/csv')).toThrow(VtexUsageError)
    expect(() => serializeBody({ f: 'v' }, 'multipart/form-data')).toThrow(VtexUsageError)
  })
  it('form-encodes flat objects for x-www-form-urlencoded, in any case and with parameters', () => {
    const out = serializeBody({ a: '1', b: 'x y', c: 2, d: true, skip: undefined }, 'Application/X-WWW-Form-Urlencoded; charset=UTF-8')
    expect(out.contentType).toBe('Application/X-WWW-Form-Urlencoded; charset=UTF-8')
    expect(String(out.body)).toBe('a=1&b=x+y&c=2&d=true')
  })
  it('passes a pre-encoded string form body through untouched', () => {
    expect(serializeBody('a=%ff&b=c%20d', 'application/x-www-form-urlencoded')).toStrictEqual({
      body: 'a=%ff&b=c%20d', contentType: 'application/x-www-form-urlencoded',
    })
  })
  it('rejects form bodies that are not flat objects of primitives', () => {
    expect(() => serializeBody({ a: { nested: 1 } }, 'application/x-www-form-urlencoded')).toThrow(VtexUsageError)
    expect(() => serializeBody({ a: null }, 'application/x-www-form-urlencoded')).toThrow(VtexUsageError)
    expect(() => serializeBody(['a'], 'application/x-www-form-urlencoded')).toThrow(VtexUsageError)
  })
  it('passes URLSearchParams through as a form', () => {
    const params = new URLSearchParams({ a: '1' })
    const out = serializeBody(params)
    expect(out.body).toBe(params)
    expect(out.contentType).toBe('application/x-www-form-urlencoded')
  })
  it('leaves the FormData content type to fetch (multipart boundary)', () => {
    const form = new FormData()
    form.append('f', 'v')
    const out = serializeBody(form, 'multipart/form-data')
    expect(out.body).toBe(form)
    expect(out.contentType).toBeUndefined()
  })
  it('recognizes a FormData from another realm or library by its tag', () => {
    class ForeignFormData {
      get [Symbol.toStringTag]() {
        return 'FormData'
      }
    }
    const foreign = new ForeignFormData()
    const out = serializeBody(foreign, 'multipart/form-data')
    expect(out.body).toBe(foreign)
    expect(out.contentType).toBeUndefined()
  })
  it('sends Blobs as is; a declared content type wins over the Blob type', () => {
    const blob = new Blob(['x'], { type: 'text/plain' })
    expect(serializeBody(blob).body).toBe(blob)
    expect(serializeBody(blob).contentType).toBe('text/plain')
    expect(serializeBody(blob, 'text/csv').contentType).toBe('text/csv')
    expect(serializeBody(new Blob(['x'])).contentType).toBe('application/octet-stream')
  })
  it('sends binary buffers as is', () => {
    const bytes = new Uint8Array([1, 2, 3])
    expect(serializeBody(bytes)).toStrictEqual({ body: bytes, contentType: 'application/octet-stream' })
  })
  it('refuses streaming bodies, web or Node', () => {
    expect(() => serializeBody(new ReadableStream())).toThrow(VtexUsageError)
    expect(() => serializeBody(Readable.from(['a']))).toThrow(VtexUsageError)
    expect(() => serializeBody({ async *[Symbol.asyncIterator]() { yield 'a' } })).toThrow(VtexUsageError)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/core/body.test.ts`
Expected: FAIL (cannot resolve `../../src/core/body.js`).

- [ ] **Step 3: Create `src/core/body.ts`**

```ts
import { VtexUsageError } from './errors.js'

const FORM_URLENCODED = 'application/x-www-form-urlencoded'
const DEFAULT_CONTENT_TYPE = 'application/json'

/** "Application/JSON; charset=utf-8" -> "application/json" */
export function mediaType(contentType: string): string {
  return contentType.split(';', 1)[0].trim().toLowerCase()
}

/** application/json, application/problem+json, application/vnd.vtex.giftcard.v1+json, ... */
export function isJsonContentType(contentType: string): boolean {
  return /^application\/(?:[a-z0-9.!#$&^_-]+\+)?json$/.test(mediaType(contentType))
}

export interface SerializedBody {
  body: RequestInit['body']
  /** undefined means "no body" or "let fetch decide" (FormData sets its own multipart boundary). */
  contentType: string | undefined
}

/** Node streams and other async iterables, which JSON.stringify would otherwise turn into internal state. */
function isNodeStreamLike(value: unknown): boolean {
  if (value === null || typeof value !== 'object') return false
  const candidate = value as { pipe?: unknown; [Symbol.asyncIterator]?: unknown }
  return typeof candidate.pipe === 'function' || typeof candidate[Symbol.asyncIterator] === 'function'
}

/** Object.prototype.toString tag, so FormData/Blob/... from another realm or library are recognized too. */
function tagOf(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * Serializes a request body for fetch. Precedence:
 * - FormData is sent as is with no Content-Type, so fetch adds the multipart boundary.
 * - URLSearchParams, Blob/File and binary buffers are sent as is; a declared content type wins.
 * - JSON content types (the default): JSON.stringify, so a string becomes a JSON string value.
 * - application/x-www-form-urlencoded: strings pass through; flat objects of primitives become fields.
 * - Any other content type: only strings are accepted.
 * Anything that cannot be sent faithfully throws VtexUsageError before a request is made.
 */
export function serializeBody(body: unknown, contentType?: string): SerializedBody {
  if (body === undefined) return { body: undefined, contentType: undefined }
  const tag = tagOf(body)
  if (tag === 'FormData') return { body: body as FormData, contentType: undefined }
  if (tag === 'URLSearchParams') return { body: body as URLSearchParams, contentType: contentType || FORM_URLENCODED }
  if (tag === 'Blob' || tag === 'File') {
    return { body: body as Blob, contentType: contentType || (body as Blob).type || 'application/octet-stream' }
  }
  if (tag === 'ArrayBuffer' || ArrayBuffer.isView(body)) {
    return { body: body as ArrayBuffer, contentType: contentType || 'application/octet-stream' }
  }
  if (tag === 'ReadableStream' || isNodeStreamLike(body)) {
    throw new VtexUsageError('Streaming request bodies are not supported')
  }
  const declared = contentType || DEFAULT_CONTENT_TYPE
  if (isJsonContentType(declared)) return { body: toJson(body, declared), contentType: declared }
  if (mediaType(declared) === FORM_URLENCODED) {
    return { body: typeof body === 'string' ? body : toForm(body), contentType: declared }
  }
  if (typeof body === 'string') return { body, contentType: declared }
  throw new VtexUsageError(`Cannot send a ${tag} body as ${declared}`)
}

function toJson(body: unknown, contentType: string): string {
  let text: string | undefined
  try {
    text = JSON.stringify(body)
  } catch (cause) {
    throw new VtexUsageError(`Request body cannot be serialized as ${contentType}`, { cause })
  }
  if (text === undefined) throw new VtexUsageError(`Request body cannot be serialized as ${contentType}`)
  return text
}

function toForm(body: unknown): URLSearchParams {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new VtexUsageError('A form-urlencoded body must be a string, URLSearchParams or a flat object')
  }
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined) continue
    if (value === null || typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol') {
      throw new VtexUsageError(`Form field ${JSON.stringify(key)} must be a string, number or boolean`)
    }
    params.append(key, String(value))
  }
  return params
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/core/body.test.ts
npm run typecheck
```

Expected: PASS; typecheck clean.

- [ ] **Step 5: Commit**

```bash
git add src/core/body.ts test/core/body.test.ts
git commit -F - <<'EOF'
feat(core): content-type aware request body serialization

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 6: Transport rewrite (spec §3.1–§3.6, §3.9, S1–S7)

**Files:**
- Modify: `src/core/types.ts`, `src/core/http.ts`, `src/core/retry.ts`, `src/core/url.ts`
- Create: `src/core/call.ts`
- Test: `test/core/http.test.ts`, `test/core/call.test.ts`, `test/core/url.test.ts`, `test/core/retry.test.ts`

- [ ] **Step 1: Write the failing tests.** Replace `test/core/http.test.ts` with

```ts
import { inspect } from 'node:util'
import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import {
  VtexRateLimitError, VtexNotFoundError, VtexServerError, VtexNetworkError,
  VtexTimeoutError, VtexUsageError, VtexRequestError,
} from '../../src/core/errors.js'

const BASE = { account: 'lojax', appKey: 'K', appToken: 'T-SECRET' }

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  })
}

function connectError(code: string) {
  return Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(code), { code }) })
}

/** A fetch that never answers until its signal aborts, like a stalled socket. */
function hangingFetch() {
  return vi.fn(
    (_input: string | URL | Request, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('This operation was aborted', 'AbortError')))
      }),
  )
}

describe('VtexHttpClient.request', () => {
  it('sends auth headers, resolves URL, returns parsed JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ orderId: '1' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.request<{ orderId: string }>({ method: 'GET', path: '/api/oms/pvt/orders/1' })
    expect(out).toEqual({ orderId: '1' })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://lojax.vtexcommercestable.com.br/api/oms/pvt/orders/1')
    expect(init.headers['X-VTEX-API-AppKey']).toBe('K')
    expect(init.headers['X-VTEX-API-AppToken']).toBe('T')
  })

  it('appends query params', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([]))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    await http.request({ method: 'GET', path: '/api/oms/pvt/orders', query: { page: 2, per_page: 50 } })
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://lojax.vtexcommercestable.com.br/api/oms/pvt/orders?page=2&per_page=50',
    )
  })

  it('serializes a JSON body and sets content-type', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    await http.request({ method: 'POST', path: '/x', body: { a: 1 } })
    const init = fetchMock.mock.calls[0][1]
    expect(init.body).toBe('{"a":1}')
    expect(init.headers['Content-Type']).toBe('application/json')
  })

  it('throws a typed error on 404', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ error: 'nope' }, 404))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 0 })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexNotFoundError)
  })

  it('retries on 429 then succeeds, honoring Retry-After', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({}, 429, { 'Retry-After': '0' }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 2 })
    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('gives up after maxRetries on persistent 429', async () => {
    // A fresh Response per call, like a real fetch, because the retry path cancels each body.
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 429, { 'Retry-After': '0' })))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 1 })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexRateLimitError)
    expect(fetchMock).toHaveBeenCalledTimes(2) // initial + 1 retry
  })

  it('returns undefined for 204 No Content', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.request({ method: 'DELETE', path: '/x' })
    expect(out).toBeUndefined()
  })

  it('clears the per-attempt timeout even when the onRequest hook throws synchronously', async () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({
      account: 'lojax',
      appKey: 'K',
      appToken: 'T',
      fetch: fetchMock,
      hooks: {
        onRequest: () => {
          throw new Error('boom from onRequest hook')
        },
      },
    })

    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toThrow('boom from onRequest hook')
    expect(fetchMock).not.toHaveBeenCalled()

    // Every timer armed by the request pipeline must have a matching clearTimeout.
    const timeoutCalls = setTimeoutSpy.mock.results.length
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(timeoutCalls)
    expect(timeoutCalls).toBeGreaterThan(0)

    setTimeoutSpy.mockRestore()
    clearTimeoutSpy.mockRestore()
  })

  it('drains/cancels the response body on the 429 retry path before refetching', async () => {
    const cancelSpies: Array<() => Promise<void>> = []

    function retryableResponse(status: number, headers: Record<string, string> = {}) {
      const real = new Response(JSON.stringify({}), {
        status,
        headers: { 'content-type': 'application/json', ...headers },
      })
      const cancelSpy = vi.fn(() => Promise.resolve())
      cancelSpies.push(cancelSpy)
      const realBody = real.body
      Object.defineProperty(real, 'body', {
        get() {
          if (!realBody) return realBody
          return new Proxy(realBody, {
            get(target, prop, receiver) {
              if (prop === 'cancel') return cancelSpy
              return Reflect.get(target, prop, receiver)
            },
          })
        },
      })
      return real
    }

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(retryableResponse(429, { 'Retry-After': '0' }))
      .mockResolvedValueOnce(retryableResponse(429, { 'Retry-After': '0' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 1 })

    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexRateLimitError)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(cancelSpies[0]).toHaveBeenCalledTimes(1)
    expect(cancelSpies[1]).not.toHaveBeenCalled()
  })

  it('retries on a transient network error (fetch rejects) then succeeds', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('ECONNRESET'))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 2 })
    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('honors a caller AbortSignal immediately instead of retrying a rejected fetch', async () => {
    const controller = new AbortController()
    controller.abort()
    const fetchMock = vi.fn().mockRejectedValue(Object.assign(new Error('aborted'), { name: 'AbortError' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 3 })

    await expect(http.request({ method: 'GET', path: '/x', signal: controller.signal })).rejects.toThrow()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('removes combined-signal abort listeners after a normal completion (no leak)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })

    const controller = new AbortController()
    const addSpy = vi.spyOn(controller.signal, 'addEventListener')
    const removeSpy = vi.spyOn(controller.signal, 'removeEventListener')

    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x', signal: controller.signal })
    expect(out).toEqual({ ok: true })

    const abortAdds = addSpy.mock.calls.filter(([type]) => type === 'abort').length
    const abortRemoves = removeSpy.mock.calls.filter(([type]) => type === 'abort').length
    expect(abortAdds).toBeGreaterThan(0)
    expect(abortRemoves).toBe(abortAdds)

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})

describe('VtexHttpClient.requestRaw', () => {
  it('surfaces response headers and status alongside parsed data', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }, 200, { 'X-VTEX-MD-TOKEN': 'tok1' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.requestRaw<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out.data).toEqual({ ok: true })
    expect(out.status).toBe(200)
    expect(out.headers.get('X-VTEX-MD-TOKEN')).toBe('tok1')
  })

  it('request() delegates to requestRaw and returns only the parsed data', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }, 200, { 'X-VTEX-MD-TOKEN': 'tok1' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out).toEqual({ ok: true })
  })
})

describe('host and path safety', () => {
  it.each(['evil.com#', 'evil.com/', 'evil.com?', 'a.evil.com?', 'evil.com\\', 'evil.com:8443#', 'lojax.evil.com#'])(
    'rejects account %j before any request',
    (account) => {
      const fetchMock = vi.fn()
      expect(() => new VtexHttpClient({ ...BASE, account, fetch: fetchMock })).toThrow(VtexUsageError)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('rejects an injected environment', () => {
    expect(() => new VtexHttpClient({ ...BASE, environment: 'evil.com#' as never })).toThrow(VtexUsageError)
  })

  it('normalizes the account to lowercase', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, account: 'LojaX', fetch: fetchMock })
    await http.request({ method: 'GET', path: '/x' })
    expect(fetchMock.mock.calls[0][0]).toBe('https://lojax.vtexcommercestable.com.br/x')
  })

  it.each(['/a/../../dataentities/CL/search', '/a/./b', '/a/%2e%2e/b', 'relative', '/a?b=1', '/a#frag'])(
    'rejects path %j without sending',
    async (path) => {
      const fetchMock = vi.fn()
      const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
      await expect(http.request({ method: 'GET', path })).rejects.toBeInstanceOf(VtexUsageError)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('routes to an allowlisted server template with its base path', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 'g1' }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await http.request({ method: 'GET', path: '/giftcards/g1', server: 'https://{accountName}.{environment}.com.br/api' })
    expect(fetchMock.mock.calls[0][0]).toBe('https://lojax.vtexcommercestable.com.br/api/giftcards/g1')
  })

  it('refuses a non-VTEX server template', async () => {
    const fetchMock = vi.fn()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x', server: 'https://evil.example' })).rejects.toBeInstanceOf(
      VtexUsageError,
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('retry policy', () => {
  it('does not retry a POST on 503', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).rejects.toBeInstanceOf(VtexServerError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retries a POST marked idempotent on 503', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse({}, 503)).mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {}, idempotent: true })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('retries a POST on 429', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({}, 429, { 'Retry-After': '0' }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('retries a POST when the connection was refused', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(connectError('ECONNREFUSED')).mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not retry a POST when the connection was reset mid-flight', async () => {
    const reset = connectError('ECONNRESET')
    const fetchMock = vi.fn().mockRejectedValue(reset)
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    const err = await http.request({ method: 'POST', path: '/x', body: {} }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexNetworkError)
    expect(err).not.toBeInstanceOf(VtexTimeoutError)
    expect((err as VtexNetworkError).cause).toBe(reset)
    expect((err as VtexNetworkError).method).toBe('POST')
    expect((err as VtexNetworkError).route).toBe('/x')
    expect((err as VtexNetworkError).attempts).toBe(1)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not retry a POST that timed out', async () => {
    const fetchMock = hangingFetch()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3, timeoutMs: 20 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).rejects.toBeInstanceOf(VtexTimeoutError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retries a GET that timed out, then reports VtexTimeoutError', async () => {
    const fetchMock = hangingFetch()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 1, timeoutMs: 20 })
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexTimeoutError)
    expect((err as VtexTimeoutError).attempts).toBe(2)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('idempotent: false demotes a command-style PUT so a 503 is not retried', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'PUT', path: '/x', body: {}, idempotent: false })).rejects.toBeInstanceOf(
      VtexServerError,
    )
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retry: false disables retries for a GET', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'GET', path: '/x', retry: false })).rejects.toBeInstanceOf(VtexServerError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retry.maxRetries overrides the client default', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 0 })
    await expect(http.request({ method: 'GET', path: '/x', retry: { maxRetries: 2 } })).rejects.toBeInstanceOf(
      VtexServerError,
    )
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })
})

describe('numeric option validation', () => {
  it.each([
    ['maxRetries', -1], ['maxRetries', 1.5], ['maxRetries', Number.NaN], ['maxRetries', Number.POSITIVE_INFINITY],
    ['timeoutMs', 0], ['timeoutMs', Number.NaN], ['timeoutMs', Number.POSITIVE_INFINITY],
    ['maxRetryAfterMs', -1], ['maxRetryAfterMs', Number.NaN], ['maxRetryAfterMs', Number.POSITIVE_INFINITY],
  ])('rejects %s = %s at construction', (name, value) => {
    expect(() => new VtexHttpClient({ ...BASE, [name]: value })).toThrow(VtexUsageError)
  })

  it('rejects invalid per-call timeout and retry options before sending', async () => {
    const fetchMock = vi.fn()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x', timeoutMs: Number.NaN })).rejects.toBeInstanceOf(VtexUsageError)
    await expect(http.request({ method: 'GET', path: '/x', retry: { maxRetries: -1 } })).rejects.toBeInstanceOf(
      VtexUsageError,
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('Retry-After handling', () => {
  it('throws immediately when Retry-After exceeds maxRetryAfterMs', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 429, { 'Retry-After': '3600' })))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    const started = Date.now()
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect((err as VtexRateLimitError).retryAfter).toBe(3600)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(Date.now() - started).toBeLessThan(1_000)
  })

  it('stops waiting as soon as the caller aborts during a backoff', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503, { 'Retry-After': '3' })))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    const controller = new AbortController()
    let abortedAt = 0
    const pending = http.request({ method: 'GET', path: '/x', signal: controller.signal }).catch((e: unknown) => e)
    setTimeout(() => {
      abortedAt = Date.now()
      controller.abort()
    }, 30)
    const err = await pending
    expect((err as Error).name).toBe('AbortError')
    expect(Date.now() - abortedAt).toBeLessThan(200)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('redirects', () => {
  it('asks fetch for manual redirects', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    await new VtexHttpClient({ ...BASE, fetch: fetchMock }).request({ method: 'GET', path: '/x' })
    expect(fetchMock.mock.calls[0][1].redirect).toBe('manual')
  })

  it('follows a same-origin 307 preserving method and body', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 307, headers: { location: '/api/moved' } }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'POST', path: '/api/x', body: { a: 1 } })).resolves.toEqual({ ok: true })
    const [url, init] = fetchMock.mock.calls[1]
    expect(url).toBe('https://lojax.vtexcommercestable.com.br/api/moved')
    expect(init.method).toBe('POST')
    expect(init.body).toBe('{"a":1}')
  })

  it('blocks a cross-origin redirect without contacting the new host', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(
      new Response(null, { status: 302, headers: { location: 'https://evil.example/steal' } }),
    )
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexRequestError)
    expect((err as VtexRequestError).status).toBe(302)
    expect((err as Error).message).toMatch(/redirect blocked/i)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not follow a 302 for a POST', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(null, { status: 302, headers: { location: '/y' } }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).rejects.toBeInstanceOf(VtexRequestError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('gives up after 3 same-origin hops', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response(null, { status: 307, headers: { location: '/loop' } })),
    )
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexRequestError)
    expect(fetchMock).toHaveBeenCalledTimes(4)
  })
})

describe('credential confidentiality', () => {
  it('never prints or serializes credentials', () => {
    const http = new VtexHttpClient({ ...BASE })
    expect(inspect(http)).not.toContain('T-SECRET')
    expect(JSON.stringify(http)).toBe('{"account":"lojax","environment":"vtexcommercestable"}')
    expect(Object.keys(http)).toEqual(['account', 'environment'])
  })
})

describe('bodies and headers', () => {
  it('sends vendor JSON with its content type', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await http.request({ method: 'POST', path: '/x', body: { a: 1 }, contentType: 'application/vnd.vtex.giftcard.v1+json' })
    const init = fetchMock.mock.calls[0][1]
    expect(init.headers['Content-Type']).toBe('application/vnd.vtex.giftcard.v1+json')
    expect(init.body).toBe('{"a":1}')
  })

  it('lets fetch set the multipart boundary for FormData', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    const form = new FormData()
    form.append('f', 'v')
    await http.request({ method: 'POST', path: '/x', body: form, contentType: 'multipart/form-data' })
    const init = fetchMock.mock.calls[0][1]
    expect(init.body).toBe(form)
    expect(Object.keys(init.headers).some((k) => k.toLowerCase() === 'content-type')).toBe(false)
  })

  it('lets caller headers override defaults case-insensitively and skips undefined values', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await http.request({
      method: 'POST', path: '/x', body: 'x', contentType: 'text/plain',
      headers: { 'content-type': 'text/csv', 'REST-Range': 'resources=0-9', 'X-Skip': undefined },
    })
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>
    expect(Object.keys(headers).filter((k) => k.toLowerCase() === 'content-type')).toEqual(['content-type'])
    expect(headers['content-type']).toBe('text/csv')
    expect(headers['REST-Range']).toBe('resources=0-9')
    expect('X-Skip' in headers).toBe(false)
  })

  it('parses vendor JSON responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('{"id":"g1"}', { headers: { 'content-type': 'application/vnd.vtex.giftcards.v1+json' } }),
    )
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x' })).resolves.toEqual({ id: 'g1' })
  })

  it('wraps a failed body read as a network error', async () => {
    const res = jsonResponse({})
    Object.defineProperty(res, 'text', { value: () => Promise.reject(new TypeError('terminated')) })
    const fetchMock = vi.fn().mockResolvedValue(res)
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexNetworkError)
  })
})
```

Replace `test/core/url.test.ts` with the final version. It adds cases from the Task 3 review: a non-string template, the `myvtex` environment, a server origin with a port or that cannot be parsed, a BigInt path, and a raw lookalike hostname.

```ts
import { describe, it, expect } from 'vitest'
import {
  buildQuery, normalizeAccount, validateEnvironment, isAllowlistedHost,
  resolveServer, encodePathParam, buildRequestUrl, DEFAULT_SERVER,
  VTEX_DOMAIN_ALLOWLIST, VTEX_ENVIRONMENTS,
} from '../../src/core/url.js'
import { VtexUsageError } from '../../src/core/errors.js'

const BACKSLASH = String.fromCharCode(92)

describe('normalizeAccount', () => {
  it('lowercases a valid account', () => {
    expect(normalizeAccount('LojaX')).toBe('lojax')
    expect(normalizeAccount('my-store-1')).toBe('my-store-1')
  })
  it('accepts the 63-character boundary', () => {
    expect(normalizeAccount('a'.repeat(63))).toHaveLength(63)
  })
  it.each([
    'evil.com#', 'evil.com/', 'evil.com?', 'a.evil.com?', 'evil.com\\', 'evil.com:8443#',
    'lojax.evil.com#', 'x@evil.com', ' lojax', '-lojax', '',
    'a.b', 'lojax.evil.com', 'acme.', '.acme', 'a'.repeat(64), 'acme\n', 'acme\t', 'acme-', 'a_b',
    '\u212Aacme',
  ])('rejects %j', (account) => {
    expect(() => normalizeAccount(account)).toThrow(VtexUsageError)
  })
  it.each([undefined, null, 123, {}, ['acme']])('rejects non-string %j', (account) => {
    expect(() => normalizeAccount(account)).toThrow(VtexUsageError)
  })
})

describe('validateEnvironment', () => {
  it('defaults to vtexcommercestable', () => {
    expect(validateEnvironment(undefined)).toBe('vtexcommercestable')
  })
  it('accepts vtexcommercebeta', () => {
    expect(validateEnvironment('vtexcommercebeta')).toBe('vtexcommercebeta')
  })
  it.each(['evil.com#', 'myvtex', 'VTEXCOMMERCESTABLE', ''])('rejects %j', (env) => {
    expect(() => validateEnvironment(env)).toThrow(VtexUsageError)
  })
})

describe('isAllowlistedHost', () => {
  it.each([
    'acme.vtexcommercestable.com.br', 'acme.myvtex.com', 'api.vtex.com',
    'acme.vtexpayments.com.br', 'portal.vtexcommercebeta.com.br',
    'vtex.com', 'myvtex.com', 'ACME.MyVtex.com',
  ])('allows %s', (host) => {
    expect(isAllowlistedHost(host)).toBe(true)
  })
  it.each([
    'evil.com', 'vtex.com.evil.com', 'evilvtex.com', 'acme.vtexcommercestable.com.br.evil.com',
    'acme.vtexcommercestable.com.br.', '127.0.0.1', '[::1]', '', 'a..vtex.com', ' api.vtex.com',
    'evil.com/.vtex.com',
  ])('blocks %j', (host) => {
    expect(isAllowlistedHost(host)).toBe(false)
  })
  it('checks the raw hostname shape before lowercasing', () => {
    expect(isAllowlistedHost(String.fromCharCode(0x212a) + 'acme.vtex.com')).toBe(false)
  })
  it('cannot be widened at runtime', () => {
    expect(Object.isFrozen(VTEX_DOMAIN_ALLOWLIST)).toBe(true)
    expect(Object.isFrozen(VTEX_ENVIRONMENTS)).toBe(true)
    expect(() => (VTEX_DOMAIN_ALLOWLIST as string[]).push('attacker.example')).toThrow(TypeError)
    expect(isAllowlistedHost('attacker.example')).toBe(false)
  })
})

describe('resolveServer', () => {
  it('resolves the default account host', () => {
    expect(resolveServer(DEFAULT_SERVER, 'acme', 'vtexcommercestable')).toEqual({
      origin: 'https://acme.vtexcommercestable.com.br', basePath: '',
    })
  })
  it('keeps a base path without the trailing slash', () => {
    expect(resolveServer('https://{accountName}.{environment}.com.br/api/', 'acme', 'vtexcommercebeta')).toEqual({
      origin: 'https://acme.vtexcommercebeta.com.br', basePath: '/api',
    })
  })
  it('supports account-in-path hosts', () => {
    expect(resolveServer('https://api.vtex.com/{accountName}', 'acme', 'vtexcommercestable')).toEqual({
      origin: 'https://api.vtex.com', basePath: '/acme',
    })
  })
  it('upgrades http to https', () => {
    expect(resolveServer('http://api.vtex.com', 'acme', 'vtexcommercestable').origin).toBe('https://api.vtex.com')
  })
  it.each([
    'https://evil.com', 'https://{accountName}.evil.com', 'https://{storeDomain}/api',
    'https://acme.vtexcommercestable.com.br:8443', 'https://u:p@api.vtex.com', 'ftp://api.vtex.com',
    'https://api.vtex.com/x?y=1',
    'https://api.vtex.com/#frag',
    'https://api.vtex.com/{storeDomain}',
    'https://{accountName}@api.vtex.com',
    'https://api.vtex.com:{accountName}',
    `https://evil.com${BACKSLASH}@api.vtex.com`,
    'https://evil.com#@api.vtex.com',
    'https://api.vtex.com\t.evil.com',
    'https://vt\u0435x.com',
    'https://127.0.0.1',
    'https://[::1]',
    'https://acme.vtexcommercestable.com.br.',
  ])('rejects %j', (template) => {
    expect(() => resolveServer(template, 'acme', 'vtexcommercestable')).toThrow(VtexUsageError)
  })
  it('never lets a backslash smuggle a second host', () => {
    expect(resolveServer(`https://api.vtex.com${BACKSLASH}@evil.com`, 'acme', 'vtexcommercestable').origin).toBe(
      'https://api.vtex.com',
    )
  })
  it('validates the account and environment itself (defense in depth)', () => {
    expect(() => resolveServer('https://api.vtex.com/{accountName}', '../../x', 'vtexcommercestable')).toThrow(VtexUsageError)
    expect(() => resolveServer('https://api.vtex.com/{accountName}', 'evil.com#', 'vtexcommercestable')).toThrow(VtexUsageError)
    expect(() => resolveServer(DEFAULT_SERVER, 'acme', 'evil.com#' as never)).toThrow(VtexUsageError)
    // Without environment validation this would resolve to the allowlisted acme.myvtex.com.
    expect(() => resolveServer('https://{accountName}.{environment}.com', 'acme', 'myvtex' as never)).toThrow(VtexUsageError)
  })
  it('rejects a non-string template', () => {
    expect(() => resolveServer(undefined as never, 'acme', 'vtexcommercestable')).toThrow(VtexUsageError)
  })
})

describe('encodePathParam', () => {
  it('encodes reserved characters', () => {
    expect(encodePathParam('a/b')).toBe('a%2Fb')
    expect(encodePathParam('x?y#z')).toBe('x%3Fy%23z')
    expect(encodePathParam('../x')).toBe('..%2Fx')
    expect(encodePathParam(42)).toBe('42')
  })
  it('double-encodes percent signs so %2e%2e stays a literal id', () => {
    expect(encodePathParam('%2e%2e')).toBe('%252e%252e')
    expect(encodePathParam('...')).toBe('...')
  })
  it.each(['', '.', '..'])('rejects %j', (value) => {
    expect(() => encodePathParam(value)).toThrow(VtexUsageError)
  })
  it.each([undefined, null, Number.NaN, Number.POSITIVE_INFINITY, {}, ['a', 'b']])('rejects %j', (value) => {
    expect(() => encodePathParam(value as never)).toThrow(VtexUsageError)
  })
  it('turns an unpaired surrogate into a usage error', () => {
    expect(() => encodePathParam('\uD800')).toThrow(VtexUsageError)
  })
})

describe('buildRequestUrl', () => {
  const server = { origin: 'https://acme.vtexcommercestable.com.br', basePath: '/api' }
  it('joins base path, path and query', () => {
    expect(buildRequestUrl(server, '/giftcards/1', { a: 1 })).toBe(
      'https://acme.vtexcommercestable.com.br/api/giftcards/1?a=1',
    )
  })
  it('works with an empty base path', () => {
    expect(buildRequestUrl({ ...server, basePath: '' }, '/x')).toBe('https://acme.vtexcommercestable.com.br/x')
  })
  it('keeps encoded ids intact', () => {
    expect(buildRequestUrl(server, `/orders/${encodePathParam('a/b?c#d')}`)).toBe(
      'https://acme.vtexcommercestable.com.br/api/orders/a%2Fb%3Fc%23d',
    )
  })
  it.each([
    'giftcards', '/a/../b', '/a/./b', '/a/%2e%2e/b', '/a?b', '/a#b', '/a\\b', '/a b',
    '/a\tb', '/a\n../b', '/a/.\t./b', '/a/%2E%2E/b', '/a/%2e/b', '/caf\u00E9',
  ])('rejects %j', (path) => {
    expect(() => buildRequestUrl(server, path)).toThrow(VtexUsageError)
  })
  it('rejects a non-string path', () => {
    expect(() => buildRequestUrl(server, undefined as never)).toThrow(VtexUsageError)
    expect(() => buildRequestUrl(server, 1n as never)).toThrow(VtexUsageError)
  })
  it('rejects an unparsable server origin and one with a port', () => {
    expect(() => buildRequestUrl({ origin: 'not a url', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'https://acme.vtexcommercestable.com.br:8443', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a base path that would change the origin', () => {
    expect(() => buildRequestUrl({ ...server, basePath: '@evil.com' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a non-canonical server origin', () => {
    expect(() => buildRequestUrl({ origin: 'https://ACME.vtexcommercestable.com.br', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'https://acme.vtexcommercestable.com.br:443', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a server that is not https on an allowlisted host', () => {
    expect(() => buildRequestUrl({ origin: 'https://evil.com', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'http://acme.vtexcommercestable.com.br', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
})

describe('buildQuery', () => {
  it('returns empty string for no params', () => {
    expect(buildQuery()).toBe('')
    expect(buildQuery({})).toBe('')
  })
  it('serializes scalars and skips undefined/null', () => {
    expect(buildQuery({ page: 1, q: 'a b', skip: undefined, none: null })).toBe('?page=1&q=a+b')
  })
  it('repeats array values', () => {
    expect(buildQuery({ id: [1, 2] })).toBe('?id=1&id=2')
  })
})
```

Replace `test/core/retry.test.ts` with the final version. It adds behavioral tests for the `sleep` clamp, the real undici error shape, and `Infinity` option values from the Task 4 review.

```ts
import { getEventListeners } from 'node:events'
import { performance } from 'node:perf_hooks'
import { describe, it, expect, vi } from 'vitest'
import {
  isRetrySafe, isConnectPhaseError, shouldRetryFailure, parseRetryAfterMs, backoffDelay, sleep, MAX_TIMER_MS,
} from '../../src/core/retry.js'

describe('isRetrySafe', () => {
  it('treats GET/HEAD/OPTIONS/PUT/DELETE as retry-safe', () => {
    for (const method of ['GET', 'head', 'OPTIONS', 'PUT', 'DELETE']) expect(isRetrySafe(method)).toBe(true)
  })
  it('treats POST/PATCH as unsafe unless marked idempotent', () => {
    expect(isRetrySafe('POST')).toBe(false)
    expect(isRetrySafe('PATCH')).toBe(false)
    expect(isRetrySafe('POST', true)).toBe(true)
  })
  it('lets idempotent: false demote a command-style PUT/DELETE', () => {
    expect(isRetrySafe('PUT', false)).toBe(false)
    expect(isRetrySafe('DELETE', false)).toBe(false)
  })
})

describe('isConnectPhaseError', () => {
  const withCode = (code: string) =>
    Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(code), { code }) })

  it.each(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])('recognizes %s', (code) => {
    expect(isConnectPhaseError(withCode(code))).toBe(true)
  })
  it.each(['ECONNRESET', 'UND_ERR_SOCKET', 'EPIPE', 'ETIMEDOUT'])('does not treat %s as connect-phase', (code) => {
    expect(isConnectPhaseError(withCode(code))).toBe(false)
  })
  it('recognizes the shape undici uses for localhost (an AggregateError cause)', () => {
    const cause = Object.assign(new AggregateError([], 'connect'), { code: 'ECONNREFUSED' })
    expect(isConnectPhaseError(Object.assign(new TypeError('fetch failed'), { cause }))).toBe(true)
  })
  it('reads a top-level code, as an injected fetch may report it', () => {
    expect(isConnectPhaseError(Object.assign(new Error('refused'), { code: 'ECONNREFUSED' }))).toBe(true)
  })
  it('handles values without a usable code', () => {
    expect(isConnectPhaseError(new Error('x'))).toBe(false)
    expect(isConnectPhaseError(undefined)).toBe(false)
    expect(isConnectPhaseError(null)).toBe(false)
    expect(isConnectPhaseError('ECONNREFUSED')).toBe(false)
    expect(isConnectPhaseError({ cause: null })).toBe(false)
  })
})

describe('shouldRetryFailure', () => {
  const ctx = (method: string, extra: { idempotent?: boolean; attempt?: number; maxRetries?: number } = {}) => ({
    method, attempt: 0, maxRetries: 3, ...extra,
  })

  it('retries 429 for every method', () => {
    expect(shouldRetryFailure(ctx('POST'), { kind: 'status', status: 429 })).toBe(true)
  })
  it('retries 5xx only for retry-safe requests', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('POST'), { kind: 'status', status: 503 })).toBe(false)
    expect(shouldRetryFailure(ctx('POST', { idempotent: true }), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('PUT', { idempotent: false }), { kind: 'status', status: 503 })).toBe(false)
  })
  it('only treats 500-599 as server errors', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 500 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 599 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 600 })).toBe(false)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 408 })).toBe(false)
  })
  it('never retries other 4xx', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'status', status: 404 })).toBe(false)
  })
  it('retries timeouts only for retry-safe requests', () => {
    expect(shouldRetryFailure(ctx('GET'), { kind: 'timeout' })).toBe(true)
    expect(shouldRetryFailure(ctx('PATCH'), { kind: 'timeout' })).toBe(false)
    expect(shouldRetryFailure(ctx('PATCH', { idempotent: true }), { kind: 'timeout' })).toBe(true)
  })
  it('retries connect-phase errors for every method, other network errors only when safe', () => {
    expect(shouldRetryFailure(ctx('POST'), { kind: 'network', connectPhase: true })).toBe(true)
    expect(shouldRetryFailure(ctx('POST'), { kind: 'network', connectPhase: false })).toBe(false)
    expect(shouldRetryFailure(ctx('POST', { idempotent: true }), { kind: 'network', connectPhase: false })).toBe(true)
    expect(shouldRetryFailure(ctx('GET'), { kind: 'network', connectPhase: false })).toBe(true)
  })
  it('stops exactly when the retry budget is spent', () => {
    expect(shouldRetryFailure(ctx('GET', { attempt: 2 }), { kind: 'status', status: 503 })).toBe(true)
    expect(shouldRetryFailure(ctx('GET', { attempt: 3 }), { kind: 'status', status: 503 })).toBe(false)
    expect(shouldRetryFailure(ctx('GET', { maxRetries: 0 }), { kind: 'status', status: 429 })).toBe(false)
  })
})

describe('parseRetryAfterMs', () => {
  it('parses delta-seconds', () => {
    expect(parseRetryAfterMs('3')).toBe(3000)
    expect(parseRetryAfterMs('0')).toBe(0)
    expect(parseRetryAfterMs('1.5')).toBe(1500)
  })
  it('parses an HTTP-date relative to now', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Mon, 12 Oct 2026 12:00:30 GMT', now)).toBe(30_000)
  })
  it('clamps past dates to zero', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Mon, 12 Oct 2026 11:00:00 GMT', now)).toBe(0)
  })
  it('accepts the obsolete RFC 850 date form', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    expect(parseRetryAfterMs('Monday, 12-Oct-26 12:00:30 GMT', now)).toBe(30_000)
  })
  it('returns undefined for missing or invalid values', () => {
    expect(parseRetryAfterMs(null)).toBeUndefined()
    expect(parseRetryAfterMs('')).toBeUndefined()
    expect(parseRetryAfterMs('soon')).toBeUndefined()
  })
  it('rejects values that only look like dates or numbers', () => {
    const now = Date.parse('2026-10-12T12:00:00Z')
    for (const value of ['abc 5', '-5', '+5', '.5', '1.', '2026-10-12', 'Mon Oct 12 12:00:30 2026', '9'.repeat(400)]) {
      expect(parseRetryAfterMs(value, now)).toBeUndefined()
    }
  })
})

describe('backoffDelay', () => {
  it('uses Retry-After when present, capped', () => {
    expect(backoffDelay(0, 2_000, 30_000)).toBe(2_000)
    expect(backoffDelay(0, 60_000, 30_000)).toBe(30_000)
  })
  it('uses full-jitter exponential backoff otherwise', () => {
    expect(backoffDelay(0, undefined, 30_000, () => 0.5)).toBe(100)
    expect(backoffDelay(2, undefined, 30_000, () => 0.5)).toBe(400)
    expect(backoffDelay(20, undefined, 1_000, () => 0.999)).toBe(999)
    expect(backoffDelay(0, undefined, 30_000, () => 0)).toBe(0)
  })
  it('keeps a huge attempt count under the cap', () => {
    expect(backoffDelay(5_000, undefined, 15_000, () => 0.999)).toBe(14_985)
  })
})

describe('sleep', () => {
  it('resolves after the delay and removes its abort listener', async () => {
    const controller = new AbortController()
    const started = performance.now()
    const pending = sleep(20, controller.signal)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(1)
    await pending
    expect(performance.now() - started).toBeGreaterThanOrEqual(15)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)
  })
  it('rejects promptly with the abort reason and removes its listener', async () => {
    const controller = new AbortController()
    const started = performance.now()
    const pending = sleep(5_000, controller.signal).catch((e: unknown) => e)
    setTimeout(() => controller.abort(), 10)
    const err = await pending
    expect((err as Error).name).toBe('AbortError')
    expect(performance.now() - started).toBeLessThan(1_000)
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)
  })
  it('passes a custom abort reason through unchanged', async () => {
    const controller = new AbortController()
    const reason = new Error('shutting down')
    const pending = sleep(5_000, controller.signal).catch((e: unknown) => e)
    controller.abort(reason)
    expect(await pending).toBe(reason)
  })
  it('rejects immediately when already aborted', async () => {
    const controller = new AbortController()
    controller.abort()
    const err = await sleep(5_000, controller.signal).catch((e: unknown) => e)
    expect((err as Error).name).toBe('AbortError')
  })
  it('falls back to an AbortError when a signal has no reason', async () => {
    const signal = { aborted: true, reason: undefined } as unknown as AbortSignal
    const err = await sleep(5_000, signal).catch((e: unknown) => e)
    expect((err as Error).name).toBe('AbortError')
  })
  it('exposes the setTimeout ceiling', () => {
    expect(MAX_TIMER_MS).toBe(2_147_483_647)
  })
  it('keeps waiting for an oversized delay instead of firing after ~1 ms', async () => {
    const controller = new AbortController()
    let settled = false
    const pending = sleep(Number.POSITIVE_INFINITY, controller.signal).then(
      () => { settled = true },
      (e: unknown) => { settled = true; return e },
    )
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(settled).toBe(false)
    controller.abort()
    expect(((await pending) as Error).name).toBe('AbortError')
  })
  it('treats a NaN delay as zero', async () => {
    vi.useFakeTimers()
    try {
      let resolved = false
      const pending = sleep(Number.NaN).then(() => { resolved = true })
      await vi.advanceTimersByTimeAsync(0)
      await pending
      expect(resolved).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })
})
```

Create `test/core/call.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import { withCall, encodePathParam } from '../../src/core/call.js'

describe('withCall', () => {
  const base = { method: 'GET', path: '/x', headers: { 'REST-Range': 'resources=0-9' } }

  it('returns the base request when there are no call options', () => {
    expect(withCall(base)).toBe(base)
  })
  it('merges headers, caller last', () => {
    expect(withCall(base, { headers: { 'REST-Range': 'resources=0-1', 'X-A': '1' } }).headers).toEqual({
      'REST-Range': 'resources=0-1', 'X-A': '1',
    })
  })
  it('copies signal, timeout, retry and idempotent', () => {
    const signal = new AbortController().signal
    const merged = withCall({ ...base, idempotent: true }, { signal, timeoutMs: 5, retry: false })
    expect(merged.signal).toBe(signal)
    expect(merged.timeoutMs).toBe(5)
    expect(merged.retry).toBe(false)
    expect(merged.idempotent).toBe(true)
  })
  it('lets the caller override a facade default', () => {
    expect(withCall({ ...base, idempotent: true }, { idempotent: false }).idempotent).toBe(false)
  })
  it('re-exports encodePathParam for generated code', () => {
    expect(encodePathParam('a/b')).toBe('a%2Fb')
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run test/core/http.test.ts test/core/call.test.ts`
Expected: FAIL. `call.js` is missing, and the new transport behaviors (allowlist, retries, redirects, redaction) fail.

- [ ] **Step 3: Replace `src/core/types.ts` with**

```ts
export type VtexEnvironment = 'vtexcommercestable' | 'vtexcommercebeta'

export interface VtexHooks {
  onRequest?: (info: { method: string; url: string; attempt: number }) => void
  onResponse?: (info: { method: string; url: string; status: number; attempt: number }) => void
  onRetry?: (info: { method: string; url: string; attempt: number; delayMs: number; reason: string }) => void
}

export interface VtexClientConfig {
  account: string
  environment?: VtexEnvironment
  appKey?: string
  appToken?: string
  authCookie?: string
  maxRetries?: number
  timeoutMs?: number
  /**
   * Longest `Retry-After` (in ms) the SDK waits before retrying. A longer value
   * makes the request fail immediately with `VtexRateLimitError`. Default 30000.
   */
  maxRetryAfterMs?: number
  /** Injectable for tests; defaults to global fetch. */
  fetch?: typeof fetch
  hooks?: VtexHooks
}

/** Per-call options accepted by every generated method and facade method. */
export interface CallOptions {
  headers?: Record<string, string>
  signal?: AbortSignal
  timeoutMs?: number
  /** `false` disables retries for this call; `{ maxRetries }` overrides the client default. */
  retry?: false | { maxRetries?: number }
  /**
   * Overrides the method's default retry safety: `true` promotes a POST/PATCH (e.g. an
   * upsert keyed by a natural id); `false` demotes a command-style PUT/DELETE.
   */
  idempotent?: boolean
}

export interface RequestOptions extends Omit<CallOptions, 'headers'> {
  method: string
  path: string
  query?: Record<string, unknown>
  body?: unknown
  /** Request content type; defaults to application/json when a body is present. */
  contentType?: string
  headers?: Record<string, string | number | boolean | undefined>
  /** Server URL template (see DEFAULT_SERVER); must resolve to an allowlisted VTEX host. */
  server?: string
}
```

- [ ] **Step 4: Create `src/core/call.ts`**

```ts
import type { CallOptions, RequestOptions } from './types.js'

export { encodePathParam } from './url.js'

/** Merges per-call options into a request description built by a generated method or facade. */
export function withCall(base: RequestOptions, opts?: CallOptions): RequestOptions {
  if (!opts) return base
  return {
    ...base,
    headers: opts.headers ? { ...base.headers, ...opts.headers } : base.headers,
    signal: opts.signal ?? base.signal,
    timeoutMs: opts.timeoutMs ?? base.timeoutMs,
    retry: opts.retry ?? base.retry,
    idempotent: opts.idempotent ?? base.idempotent,
  }
}
```

- [ ] **Step 5: Replace `src/core/http.ts` with**

```ts
import { inspect } from 'node:util'
import type { RequestOptions, VtexClientConfig, VtexEnvironment, VtexHooks } from './types.js'
import {
  DEFAULT_SERVER, buildRequestUrl, normalizeAccount, resolveServer, validateEnvironment, type ResolvedServer,
} from './url.js'
import { buildAuthHeaders } from './auth.js'
import { VtexNetworkError, VtexRequestError, VtexTimeoutError, VtexUsageError, mapResponseToError } from './errors.js'
import {
  MAX_TIMER_MS, backoffDelay, isConnectPhaseError, parseRetryAfterMs, shouldRetryFailure, sleep, type Failure,
} from './retry.js'
import { isJsonContentType, serializeBody } from './body.js'

const MAX_REDIRECTS = 3

/** Rejects NaN, Infinity, negatives and (optionally) fractions in numeric options. */
function checkedNumber(name: string, value: unknown, min: number, integer = false): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || (integer && !Number.isInteger(value))) {
    throw new VtexUsageError(`${name} must be a finite ${integer ? 'integer' : 'number'} >= ${min} (got ${String(value)})`)
  }
  return value
}

/**
 * Combines multiple AbortSignals into one that aborts when any of them abort.
 *
 * Returns both the combined signal and a `dispose` callback that removes
 * every listener this function registered. Callers MUST invoke `dispose`
 * once the operation settles (success, failure, or abort) — otherwise a
 * long-lived input signal (e.g. one AbortController shared across many
 * `request()` calls) accumulates one permanent listener per call.
 */
function combineSignals(
  signals: Array<AbortSignal | undefined>,
): { signal: AbortSignal; dispose: () => void } {
  const valid = signals.filter((s): s is AbortSignal => Boolean(s))
  if (valid.length === 1) return { signal: valid[0], dispose: () => {} }
  const controller = new AbortController()
  const cleanups: Array<() => void> = []
  for (const s of valid) {
    if (s.aborted) {
      controller.abort(s.reason)
      break
    }
    const handler = () => controller.abort(s.reason)
    s.addEventListener('abort', handler)
    cleanups.push(() => s.removeEventListener('abort', handler))
  }
  return {
    signal: controller.signal,
    dispose: () => {
      for (const c of cleanups) c()
    },
  }
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204 || res.status === 205) return undefined
  const ct = res.headers.get('content-type') ?? ''
  const text = await res.text()
  if (!text) return undefined
  if (isJsonContentType(ct)) {
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }
  return text
}

/** Sets a header, replacing any existing header with the same name in a different case. */
function setHeader(headers: Record<string, string>, name: string, value: string): void {
  const lower = name.toLowerCase()
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === lower) delete headers[key]
  }
  headers[name] = value
}

/** Next URL for a redirect the SDK may follow, or undefined when it must be blocked. */
function redirectTarget(currentUrl: string, res: Response, method: string): string | undefined {
  const location = res.headers.get('location')
  if (!location) return undefined
  let next: URL
  try {
    next = new URL(location, currentUrl)
  } catch {
    return undefined
  }
  if (next.origin !== new URL(currentUrl).origin) return undefined
  if (res.status === 307 || res.status === 308) return next.href
  if ((res.status === 301 || res.status === 302 || res.status === 303) && (method === 'GET' || method === 'HEAD')) {
    return next.href
  }
  return undefined
}

export class VtexHttpClient {
  readonly account: string
  readonly environment: VtexEnvironment
  readonly #authHeaders: Record<string, string>
  readonly #maxRetries: number
  readonly #timeoutMs: number
  readonly #maxRetryAfterMs: number
  readonly #fetch: typeof fetch
  readonly #hooks: VtexHooks
  readonly #servers = new Map<string, ResolvedServer>()

  constructor(config: VtexClientConfig) {
    this.account = normalizeAccount(config.account)
    this.environment = validateEnvironment(config.environment ?? 'vtexcommercestable')
    this.#authHeaders = buildAuthHeaders(config)
    this.#maxRetries = checkedNumber('maxRetries', config.maxRetries ?? 3, 0, true)
    this.#timeoutMs = Math.min(checkedNumber('timeoutMs', config.timeoutMs ?? 30_000, 1), MAX_TIMER_MS)
    this.#maxRetryAfterMs = Math.min(checkedNumber('maxRetryAfterMs', config.maxRetryAfterMs ?? 30_000, 0), MAX_TIMER_MS)
    this.#fetch = config.fetch ?? fetch
    this.#hooks = config.hooks ?? {}
    this.#server(DEFAULT_SERVER)
  }

  toJSON(): { account: string; environment: VtexEnvironment } {
    return { account: this.account, environment: this.environment }
  }

  [inspect.custom](): string {
    return `VtexHttpClient ${JSON.stringify(this.toJSON())}`
  }

  #server(template: string): ResolvedServer {
    let resolved = this.#servers.get(template)
    if (!resolved) {
      resolved = resolveServer(template, this.account, this.environment)
      this.#servers.set(template, resolved)
    }
    return resolved
  }

  async request<T>(opts: RequestOptions): Promise<T> {
    return (await this.requestRaw<T>(opts)).data
  }

  async requestRaw<T>(opts: RequestOptions): Promise<{ data: T; headers: Headers; status: number }> {
    const method = opts.method.toUpperCase()
    const server = this.#server(opts.server ?? DEFAULT_SERVER)
    let url = buildRequestUrl(server, opts.path, opts.query)
    const route = server.basePath + opts.path
    const { body, contentType } = serializeBody(opts.body, opts.contentType)

    const headers: Record<string, string> = { Accept: 'application/json', ...this.#authHeaders }
    if (contentType) setHeader(headers, 'Content-Type', contentType)
    for (const [name, value] of Object.entries(opts.headers ?? {})) {
      if (value !== undefined) setHeader(headers, name, String(value))
    }

    const maxRetries =
      opts.retry === false ? 0 : checkedNumber('retry.maxRetries', opts.retry?.maxRetries ?? this.#maxRetries, 0, true)
    const timeoutMs =
      opts.timeoutMs === undefined ? this.#timeoutMs : Math.min(checkedNumber('timeoutMs', opts.timeoutMs, 1), MAX_TIMER_MS)
    let attempt = 0
    let redirects = 0

    for (;;) {
      const controller = new AbortController()
      let timedOut = false
      const timer = setTimeout(() => {
        timedOut = true
        controller.abort()
      }, timeoutMs)
      let dispose: () => void = () => {}

      try {
        const combined = combineSignals([opts.signal, controller.signal])
        dispose = combined.dispose
        this.#hooks.onRequest?.({ method, url, attempt })

        let res: Response
        try {
          res = await this.#fetch(url, { method, headers, body, signal: combined.signal, redirect: 'manual' })
        } catch (err) {
          if (opts.signal?.aborted) throw opts.signal.reason ?? err
          const failure: Failure = timedOut ? { kind: 'timeout' } : { kind: 'network', connectPhase: isConnectPhaseError(err) }
          if (shouldRetryFailure({ method, idempotent: opts.idempotent, attempt, maxRetries }, failure)) {
            const delayMs = backoffDelay(attempt, undefined, this.#maxRetryAfterMs)
            this.#hooks.onRetry?.({ method, url, attempt, delayMs, reason: failure.kind })
            await sleep(delayMs, opts.signal)
            attempt++
            continue
          }
          throw this.#networkError(err, timedOut, method, route, attempt + 1)
        }

        this.#hooks.onResponse?.({ method, url, status: res.status, attempt })

        if (res.status >= 300 && res.status < 400 && res.headers.has('location')) {
          await res.body?.cancel().catch(() => {})
          const next = redirects < MAX_REDIRECTS ? redirectTarget(url, res, method) : undefined
          if (!next) {
            throw new VtexRequestError(`VTEX redirect blocked (status ${res.status})`, { status: res.status, body: undefined })
          }
          url = next
          redirects++
          continue
        }

        if (res.ok) {
          const data = (await this.#readBody(res, opts.signal, () => timedOut, method, route, attempt)) as T
          return { data, headers: res.headers, status: res.status }
        }

        const retryAfterMs = parseRetryAfterMs(res.headers.get('retry-after'))
        const waitTooLong = retryAfterMs !== undefined && retryAfterMs > this.#maxRetryAfterMs
        const failure: Failure = { kind: 'status', status: res.status }
        if (!waitTooLong && shouldRetryFailure({ method, idempotent: opts.idempotent, attempt, maxRetries }, failure)) {
          await res.body?.cancel().catch(() => {})
          const delayMs = backoffDelay(attempt, retryAfterMs, this.#maxRetryAfterMs)
          this.#hooks.onRetry?.({ method, url, attempt, delayMs, reason: `status ${res.status}` })
          await sleep(delayMs, opts.signal)
          attempt++
          continue
        }
        const errorBody = await this.#readBody(res, opts.signal, () => timedOut, method, route, attempt)
        throw mapResponseToError(res.status, errorBody, res.headers)
      } finally {
        clearTimeout(timer)
        dispose()
      }
    }
  }

  async #readBody(
    res: Response, signal: AbortSignal | undefined, isTimedOut: () => boolean, method: string, route: string, attempt: number,
  ): Promise<unknown> {
    try {
      return await parseBody(res)
    } catch (err) {
      if (signal?.aborted) throw signal.reason ?? err
      throw this.#networkError(err, isTimedOut(), method, route, attempt + 1)
    }
  }

  #networkError(cause: unknown, timedOut: boolean, method: string, route: string, attempts: number): VtexNetworkError {
    const what = timedOut ? 'timed out' : 'failed before a complete response was received'
    const message = `VTEX request ${method} ${route} ${what} (attempts: ${attempts})`
    return timedOut
      ? new VtexTimeoutError(message, { cause, method, route, attempts })
      : new VtexNetworkError(message, { cause, method, route, attempts })
  }
}
```

- [ ] **Step 6: Replace `src/core/retry.ts` with the final version (drops `shouldRetry`/`computeBackoff`)**

```ts
/** Largest delay setTimeout honors; larger values fire after about 1 ms. */
export const MAX_TIMER_MS = 2_147_483_647

export interface RetryContext {
  method: string
  idempotent?: boolean
  /** Retries already performed (0 on the first failure). */
  attempt: number
  maxRetries: number
}

export type Failure =
  | { kind: 'status'; status: number }
  | { kind: 'timeout' }
  | { kind: 'network'; connectPhase: boolean }

const RETRY_SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'])
const CONNECT_PHASE_CODES = new Set(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])

/**
 * GET/HEAD/OPTIONS/PUT/DELETE are retry-safe by default. An explicit `idempotent`
 * wins: `true` promotes a POST/PATCH, `false` demotes a command-style PUT/DELETE.
 */
export function isRetrySafe(method: string, idempotent?: boolean): boolean {
  return idempotent ?? RETRY_SAFE_METHODS.has(method.toUpperCase())
}

/** True when a fetch rejection happened before any request bytes were written. */
export function isConnectPhaseError(err: unknown): boolean {
  const error = err as { code?: unknown; cause?: { code?: unknown } | null } | null | undefined
  const code = error?.cause?.code ?? error?.code
  return typeof code === 'string' && CONNECT_PHASE_CODES.has(code)
}

/**
 * 429 is always retried. 5xx, timeouts and mid-flight network errors are retried only
 * for retry-safe requests, because a non-idempotent write may already have been applied.
 * Connect-phase failures are always retried: no request bytes were written.
 */
export function shouldRetryFailure(ctx: RetryContext, failure: Failure): boolean {
  if (ctx.attempt >= ctx.maxRetries) return false
  const safe = isRetrySafe(ctx.method, ctx.idempotent)
  switch (failure.kind) {
    case 'status':
      return failure.status === 429 || (safe && failure.status >= 500 && failure.status <= 599)
    case 'timeout':
      return safe
    case 'network':
      return safe || failure.connectPhase
  }
}

/**
 * Parses Retry-After into milliseconds. Accepts delta-seconds and HTTP-dates
 * (IMF-fixdate or RFC 850, both ending in "hh:mm:ss GMT"); anything else is
 * ignored, because Date.parse also accepts junk such as "abc 5".
 */
export function parseRetryAfterMs(value: string | null | undefined, now: number = Date.now()): number | undefined {
  if (value === null || value === undefined) return undefined
  const trimmed = value.trim()
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const ms = Math.round(Number(trimmed) * 1000)
    return Number.isFinite(ms) ? ms : undefined
  }
  if (!/\d{2}:\d{2}:\d{2} GMT$/.test(trimmed)) return undefined
  const at = Date.parse(trimmed)
  if (Number.isNaN(at)) return undefined
  return Math.max(0, at - now)
}

/**
 * Delay before the next attempt (`attempt` = retries already performed, 0-based):
 * Retry-After when given, else exponential backoff with full jitter. Callers must
 * reject a Retry-After above `capMs` before calling; the clamp here is a safety net.
 */
export function backoffDelay(
  attempt: number,
  retryAfterMs: number | undefined,
  capMs: number,
  rand: () => number = Math.random,
): number {
  if (retryAfterMs !== undefined) return Math.min(retryAfterMs, capMs)
  const ceiling = Math.min(capMs, 200 * 2 ** attempt)
  return Math.floor(rand() * ceiling)
}

/**
 * setTimeout-based sleep that rejects with the signal's reason (or an AbortError when
 * the signal has none) as soon as it aborts. `ms` is clamped to [0, MAX_TIMER_MS];
 * NaN counts as 0.
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const abortReason = () => signal?.reason ?? new DOMException('This operation was aborted', 'AbortError')
    if (signal?.aborted) {
      reject(abortReason())
      return
    }
    const onAbort = () => {
      clearTimeout(timer)
      reject(abortReason())
    }
    const delay = Math.min(Math.max(Number.isNaN(ms) ? 0 : ms, 0), MAX_TIMER_MS)
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, delay)
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
```

- [ ] **Step 7: Replace `src/core/url.ts` with its final version**

This drops the legacy `resolveBaseUrl` shim from Task 3 and adds the small input guards from the Task 3 review:
- a string check on the server template;
- a hostname shape check on the raw input;
- a static message for a non-string path;
- no explicit port in the final URL.

```ts
import { VtexUsageError } from './errors.js'
import type { VtexEnvironment } from './types.js'

/** Default server template: the account host. */
export const DEFAULT_SERVER = 'https://{accountName}.{environment}.com.br'

export const VTEX_ENVIRONMENTS: readonly VtexEnvironment[] = Object.freeze(['vtexcommercestable', 'vtexcommercebeta'] as const)

/** Registrable domains the SDK may send credentials to. Frozen, because it is the core of host safety. */
export const VTEX_DOMAIN_ALLOWLIST: readonly string[] = Object.freeze([
  'vtexcommercestable.com.br',
  'vtexcommercebeta.com.br',
  'myvtex.com',
  'vtex.com',
  'vtexpayments.com.br',
])

const ACCOUNT_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i
const HOSTNAME_RE = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i

/** Validates a VTEX account name (a single ASCII DNS label) and lowercases it. */
export function normalizeAccount(account: unknown): string {
  if (typeof account !== 'string' || account === '') throw new VtexUsageError('VTEX account is required')
  if (!ACCOUNT_RE.test(account)) {
    throw new VtexUsageError(`Invalid VTEX account name ${JSON.stringify(account)}: use letters, digits and hyphens only`)
  }
  return account.toLowerCase()
}

/** Validates a VTEX environment name; defaults to vtexcommercestable. */
export function validateEnvironment(environment: unknown = 'vtexcommercestable'): VtexEnvironment {
  if (typeof environment !== 'string' || !(VTEX_ENVIRONMENTS as readonly string[]).includes(environment)) {
    throw new VtexUsageError(
      `Invalid VTEX environment ${JSON.stringify(environment)}: expected one of ${VTEX_ENVIRONMENTS.join(', ')}`,
    )
  }
  return environment as VtexEnvironment
}

/** True when a parsed URL hostname is an allowlisted VTEX domain or a subdomain of one. */
export function isAllowlistedHost(hostname: string): boolean {
  if (typeof hostname !== 'string' || !HOSTNAME_RE.test(hostname)) return false
  const host = hostname.toLowerCase()
  return VTEX_DOMAIN_ALLOWLIST.some((domain) => host === domain || host.endsWith(`.${domain}`))
}

export interface ResolvedServer {
  /** e.g. "https://acme.vtexcommercestable.com.br" */
  readonly origin: string
  /** Path prefix without a trailing slash, e.g. "/api" or "" */
  readonly basePath: string
}

/** Fills a server template with a validated account and environment, then checks the resulting host. */
export function resolveServer(template: string, account: string, environment: VtexEnvironment): ResolvedServer {
  if (typeof template !== 'string') throw new VtexUsageError(`Server template must be a string (got ${typeof template})`)
  const accountName = normalizeAccount(account)
  const env = validateEnvironment(environment)
  const filled = template.replaceAll('{accountName}', () => accountName).replaceAll('{environment}', () => env)
  if (/[{}]/.test(filled)) throw new VtexUsageError(`Unresolved variable in server template ${JSON.stringify(template)}`)
  let url: URL
  try {
    url = new URL(filled)
  } catch {
    throw new VtexUsageError(`Invalid server template ${JSON.stringify(template)}`)
  }
  if (url.protocol === 'http:') url.protocol = 'https:'
  if (url.protocol !== 'https:') throw new VtexUsageError(`Server template must use https: ${JSON.stringify(template)}`)
  if (url.username || url.password || url.port || url.search || url.hash) {
    throw new VtexUsageError(
      `Server template must not contain credentials, a port, a query or a fragment: ${JSON.stringify(template)}`,
    )
  }
  if (!isAllowlistedHost(url.hostname)) {
    throw new VtexUsageError(`Refusing to send VTEX credentials to non-VTEX host ${JSON.stringify(url.hostname)}`)
  }
  return { origin: url.origin, basePath: url.pathname.replace(/\/+$/, '') }
}

/** Encodes one path segment; rejects missing, non-finite and dot-segment values. */
export function encodePathParam(value: string | number): string {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new VtexUsageError(`Invalid path parameter ${String(value)}`)
  } else if (typeof value !== 'string') {
    throw new VtexUsageError('Path parameter must be a string or a finite number')
  }
  const text = String(value)
  if (text === '' || text === '.' || text === '..') throw new VtexUsageError(`Invalid path parameter ${JSON.stringify(text)}`)
  try {
    return encodeURIComponent(text)
  } catch {
    throw new VtexUsageError('Path parameter contains an unpaired surrogate')
  }
}

/** Serializes query parameters, skipping undefined/null and repeating array values. */
export function buildQuery(query?: Record<string, unknown>): string {
  if (!query) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, String(v))
    } else {
      params.append(key, String(value))
    }
  }
  const s = params.toString()
  return s ? `?${s}` : ''
}

/**
 * Joins server, path and query. Refuses paths that are not strings, are relative,
 * carry their own query/fragment, contain dot segments or characters the URL parser
 * would rewrite, and any result that is not https on an allowlisted host or that
 * changes the server's origin. Paths must be pre-encoded (see encodePathParam).
 */
export function buildRequestUrl(server: ResolvedServer, path: string, query?: Record<string, unknown>): string {
  if (typeof path !== 'string') throw new VtexUsageError(`Request path must be a string (got ${typeof path})`)
  if (!path.startsWith('/')) throw new VtexUsageError(`Request path must start with "/": ${JSON.stringify(path)}`)
  if (/[?#\\]/.test(path)) throw new VtexUsageError(`Request path must not contain "?", "#" or "\\": ${JSON.stringify(path)}`)
  const rawPath = server.basePath + path
  let url: URL
  try {
    url = new URL(server.origin + rawPath)
  } catch {
    throw new VtexUsageError(`Invalid request URL for path ${JSON.stringify(path)}`)
  }
  if (
    url.protocol !== 'https:' ||
    url.port !== '' ||
    !isAllowlistedHost(url.hostname) ||
    url.origin !== server.origin ||
    url.pathname !== rawPath
  ) {
    throw new VtexUsageError(`Request path is not normalized or escapes the server: ${JSON.stringify(path)}`)
  }
  return url.origin + url.pathname + buildQuery(query)
}
```

Then confirm nothing references the removed names:

```bash
grep -rn "resolveBaseUrl\|computeBackoff\|shouldRetry(" src test || echo "no references"
```

Expected: `no references`

- [ ] **Step 8: Run the tests**

```bash
npx vitest run test/core
npm run typecheck
npm test
```

Expected: all core tests PASS, typecheck clean, all tests pass. The generated code and facades still use the old call shape, which remains compatible.

- [ ] **Step 9: Commit**

```bash
git add src/core test/core
git commit -F - <<'EOF'
feat(core)!: hardened transport (allowlisted servers, path safety, method-aware retries, manual redirects, private credentials)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 7: VtexClient surface (spec §3.5, §3.8)

**Files:**
- Modify: `src/client.ts`
- Test: `test/client.test.ts`

- [ ] **Step 1: Write the failing test.** Replace `test/client.test.ts` with

```ts
import { inspect } from 'node:util'
import { describe, it, expect, vi } from 'vitest'
import { VtexClient } from '../src/client.js'
import { VtexUsageError } from '../src/core/errors.js'

describe('VtexClient', () => {
  it('exposes account and a raw namespace', () => {
    const client = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T' })
    expect(client.account).toBe('lojax')
    expect(client.raw).toBeDefined()
  })

  it('routes a raw call through the injected fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ orderId: '9' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const client = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await client.raw.ordersAPI.orders.getOrder({ orderId: '9' })
    expect(out).toBeDefined()
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('exposes the ergonomic facades', () => {
    const c = new VtexClient({ account: 'x', appKey: 'K', appToken: 'T' })
    expect(c.orders).toBeDefined()
    expect(c.catalog).toBeDefined()
    expect(c.masterData).toBeDefined()
    expect(c.pricing).toBeDefined()
    expect(c.logistics).toBeDefined()
    expect(c.checkout).toBeDefined()
  })

  it('normalizes the account and exposes the environment', () => {
    const c = new VtexClient({ account: 'LojaX', appKey: 'K', appToken: 'T' })
    expect(c.account).toBe('lojax')
    expect(c.environment).toBe('vtexcommercestable')
  })

  it('never prints or serializes credentials (client, facade, raw namespace)', () => {
    const c = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T-SECRET' })
    expect(inspect(c)).not.toContain('T-SECRET')
    expect(JSON.stringify(c)).toBe('{"account":"lojax","environment":"vtexcommercestable"}')
    expect(inspect(c.orders, { depth: 5 })).not.toContain('T-SECRET')
    expect(JSON.stringify(c.orders)).not.toContain('T-SECRET')
    expect(inspect(c.raw.ordersAPI, { depth: 5 })).not.toContain('T-SECRET')
    expect(JSON.stringify(c.raw.ordersAPI)).not.toContain('T-SECRET')
  })

  it('exposes request() and requestRaw() with the same safety checks', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json', 'REST-Content-Range': 'resources 0-0/1' },
      }),
    )
    const c = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const raw = await c.requestRaw<{ ok: boolean }>({
      method: 'GET', path: '/api/dataentities/CL/search', headers: { 'REST-Range': 'resources=0-0' },
    })
    expect(raw.data).toEqual({ ok: true })
    expect(raw.headers.get('REST-Content-Range')).toBe('resources 0-0/1')
    expect(fetchMock.mock.calls[0][1].headers['REST-Range']).toBe('resources=0-0')
    await expect(c.request({ method: 'GET', path: '/x', server: 'https://evil.example' })).rejects.toBeInstanceOf(
      VtexUsageError,
    )
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/client.test.ts`
Expected: FAIL. `c.environment` is undefined, `inspect(c)` shows the token, and `requestRaw` does not exist.

- [ ] **Step 3: Replace `src/client.ts` with**

```ts
import { inspect } from 'node:util'
import type { RequestOptions, VtexClientConfig, VtexEnvironment } from './core/types.js'
import { VtexHttpClient } from './core/http.js'
import { RawNamespaces } from './generated/index.js'
import { OrdersFacade } from './facades/orders.js'
import { CatalogFacade } from './facades/catalog.js'
import { MasterDataFacade } from './facades/master-data.js'
import { PricingFacade } from './facades/pricing.js'
import { LogisticsFacade } from './facades/logistics.js'
import { CheckoutFacade } from './facades/checkout.js'

export class VtexClient {
  readonly account: string
  readonly environment: VtexEnvironment
  readonly raw: RawNamespaces
  readonly orders: OrdersFacade
  readonly catalog: CatalogFacade
  readonly masterData: MasterDataFacade
  readonly pricing: PricingFacade
  readonly logistics: LogisticsFacade
  readonly checkout: CheckoutFacade
  /** @internal shared HTTP client for facades */
  protected readonly http: VtexHttpClient

  constructor(config: VtexClientConfig) {
    this.http = new VtexHttpClient(config)
    this.account = this.http.account
    this.environment = this.http.environment
    this.raw = new RawNamespaces(this.http)
    this.orders = new OrdersFacade(this.http)
    this.catalog = new CatalogFacade(this.http)
    this.masterData = new MasterDataFacade(this.http)
    this.pricing = new PricingFacade(this.http)
    this.logistics = new LogisticsFacade(this.http)
    this.checkout = new CheckoutFacade(this.http)
  }

  /** Low-level request with the same safety checks as generated methods. */
  request<T = unknown>(opts: RequestOptions): Promise<T> {
    return this.http.request<T>(opts)
  }

  /** Like request(), but also returns the response headers and status. */
  requestRaw<T = unknown>(opts: RequestOptions): Promise<{ data: T; headers: Headers; status: number }> {
    return this.http.requestRaw<T>(opts)
  }

  toJSON(): { account: string; environment: VtexEnvironment } {
    return { account: this.account, environment: this.environment }
  }

  [inspect.custom](): string {
    return `VtexClient ${JSON.stringify(this.toJSON())}`
  }
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/client.test.ts
npm run typecheck
npm test
```

Expected: PASS; typecheck clean; all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/client.ts test/client.test.ts
git commit -F - <<'EOF'
feat: VtexClient request()/requestRaw(), normalized account, redacted inspection

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 8: Factory hardening (spec §3.7, S8)

**Files:**
- Modify: `src/factory.ts`
- Test: `test/factory.test.ts`

- [ ] **Step 1: Write the failing test.** Replace `test/factory.test.ts` with

```ts
import { describe, it, expect, vi } from 'vitest'
import { createVtexFactory } from '../src/factory.js'
import { VtexAuthError, VtexUsageError } from '../src/core/errors.js'

describe('createVtexFactory', () => {
  it('creates and caches one client per account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const a1 = await factory.forAccount('lojax')
    const a2 = await factory.forAccount('lojax')
    const b = await factory.forAccount('lojay')
    expect(a1).toBe(a2) // cached
    expect(b).not.toBe(a1)
    expect(a1.account).toBe('lojax')
    expect(credentials).toHaveBeenCalledTimes(2) // once per distinct account
  })

  it('clear() drops the cache for an account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const a1 = await factory.forAccount('lojax')
    factory.clear('lojax')
    const a2 = await factory.forAccount('lojax')
    expect(a1).not.toBe(a2)
    expect(credentials).toHaveBeenCalledTimes(2)
  })

  it('deduplicates concurrent calls for the same account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const [a, b] = await Promise.all([factory.forAccount('x'), factory.forAccount('x')])
    expect(a).toBe(b)
    expect(credentials).toHaveBeenCalledTimes(1)
  })

  it('evicts failed entries on build rejection', async () => {
    let callCount = 0
    const credentials = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) throw new Error('First call fails')
      return { appKey: 'K', appToken: 'T' }
    })
    const factory = createVtexFactory({ credentials })
    await expect(factory.forAccount('bad')).rejects.toThrow('First call fails')
    const client = await factory.forAccount('bad')
    expect(client).toBeDefined()
    expect(credentials).toHaveBeenCalledTimes(2)
  })

  it('passes the configured fetch through to the client', async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchSpy })
    const client = await factory.forAccount('x')
    await client.orders.get('1')
    expect(fetchSpy).toHaveBeenCalledOnce()
  })

  it('normalizes the account used as cache key', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials })
    const a = await factory.forAccount('LojaX')
    const b = await factory.forAccount('lojax')
    expect(a).toBe(b)
    expect(credentials).toHaveBeenCalledWith('lojax')
  })

  it('rejects an invalid account without calling the resolver', async () => {
    const credentials = vi.fn()
    const factory = createVtexFactory({ credentials })
    await expect(factory.forAccount('attacker.example#')).rejects.toBeInstanceOf(VtexUsageError)
    expect(credentials).not.toHaveBeenCalled()
  })

  it('takes only credentials from the resolver, never the account', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T', account: 'other-tenant' })
    const factory = createVtexFactory({ credentials })
    const client = await factory.forAccount('tenant-a')
    expect(client.account).toBe('tenant-a')
  })

  it('bounds the cache, dropping the least recently used client', async () => {
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, maxCachedClients: 2 })
    await factory.forAccount('a')
    await factory.forAccount('b')
    await factory.forAccount('a') // a is now the most recently used
    await factory.forAccount('c') // evicts b
    await factory.forAccount('a') // still cached
    expect(credentials).toHaveBeenCalledTimes(3)
    await factory.forAccount('b') // rebuilt
    expect(credentials).toHaveBeenCalledTimes(4)
  })

  it('evicts a client after an auth failure so rotated credentials are picked up', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response('{}', { status: 401, headers: { 'content-type': 'application/json' } })),
    )
    const credentials = vi.fn().mockResolvedValue({ appKey: 'K', appToken: 'T' })
    const factory = createVtexFactory({ credentials, fetch: fetchMock, maxRetries: 0 })
    const first = await factory.forAccount('x')
    await expect(first.orders.get('1')).rejects.toBeInstanceOf(VtexAuthError)
    const second = await factory.forAccount('x')
    expect(second).not.toBe(first)
    expect(credentials).toHaveBeenCalledTimes(2)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/factory.test.ts`
Expected: FAIL in the new cases:
- the account is not normalized;
- an invalid account reaches the resolver;
- the resolver overrides the account;
- the cache has no bound;
- there is no eviction after 401.

- [ ] **Step 3: Replace `src/factory.ts` with**

```ts
import type { VtexClientConfig, VtexEnvironment, VtexHooks } from './core/types.js'
import { normalizeAccount } from './core/url.js'
import { VtexClient } from './client.js'

export type VtexCreds = { appKey: string; appToken: string } | { authCookie: string }

export interface VtexFactoryConfig {
  credentials: (account: string) => VtexCreds | Promise<VtexCreds>
  environment?: VtexEnvironment
  maxRetries?: number
  timeoutMs?: number
  maxRetryAfterMs?: number
  /** Upper bound on cached clients; the least recently used one is dropped first. Default 100. */
  maxCachedClients?: number
  fetch?: typeof fetch
  hooks?: VtexHooks
}

type Credentials = Pick<VtexClientConfig, 'appKey' | 'appToken' | 'authCookie'>

/** Only credential fields are taken from the resolver, so it cannot redirect the client elsewhere. */
function pickCredentials(creds: VtexCreds): Credentials {
  const source = creds as { appKey?: unknown; appToken?: unknown; authCookie?: unknown }
  const picked: Credentials = {}
  if (typeof source.appKey === 'string') picked.appKey = source.appKey
  if (typeof source.appToken === 'string') picked.appToken = source.appToken
  if (typeof source.authCookie === 'string') picked.authCookie = source.authCookie
  return picked
}

export function createVtexFactory(config: VtexFactoryConfig) {
  const maxEntries = Math.max(1, config.maxCachedClients ?? 100)
  const cache = new Map<string, Promise<VtexClient>>()

  function evict(account: string, entry: Promise<VtexClient>): void {
    if (cache.get(account) === entry) cache.delete(account)
  }

  async function build(account: string, onAuthFailure: () => void): Promise<VtexClient> {
    const creds = await config.credentials(account)
    const userHooks = config.hooks ?? {}
    return new VtexClient({
      ...pickCredentials(creds),
      account,
      environment: config.environment,
      maxRetries: config.maxRetries,
      timeoutMs: config.timeoutMs,
      maxRetryAfterMs: config.maxRetryAfterMs,
      fetch: config.fetch,
      hooks: {
        ...userHooks,
        onResponse: (info) => {
          if (info.status === 401 || info.status === 403) onAuthFailure()
          userHooks.onResponse?.(info)
        },
      },
    })
  }

  return {
    forAccount(account: string): Promise<VtexClient> {
      let key: string
      try {
        key = normalizeAccount(account)
      } catch (err) {
        return Promise.reject(err)
      }
      const cached = cache.get(key)
      if (cached) {
        cache.delete(key)
        cache.set(key, cached)
        return cached
      }
      const entry: Promise<VtexClient> = build(key, () => evict(key, entry))
      cache.set(key, entry)
      entry.catch(() => evict(key, entry))
      while (cache.size > maxEntries) {
        const oldest = cache.keys().next().value
        if (oldest === undefined) break
        cache.delete(oldest)
      }
      return entry
    },
    clear(account?: string): void {
      if (account === undefined) {
        cache.clear()
        return
      }
      try {
        cache.delete(normalizeAccount(account))
      } catch {
        // An invalid account name can never be in the cache.
      }
    },
  }
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/factory.test.ts
npm run typecheck
npm test
```

Expected: PASS; typecheck clean; all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/factory.ts test/factory.test.ts
git commit -F - <<'EOF'
fix(factory): normalized keys, credential-only resolver, LRU bound, eviction on 401/403

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 9: Type generator fixes (spec §4.5, C4)

**Files:**
- Modify: `scripts/codegen/types.ts`
- Test: `test/codegen/types.test.ts`

- [ ] **Step 1: Write the failing test.** Replace `test/codegen/types.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import { schemaToType } from '../../scripts/codegen/types.js'

const ref = (r: string) => r.split('/').pop()!

describe('schemaToType', () => {
  it('maps primitives', () => {
    expect(schemaToType({ type: 'string' }, ref)).toBe('string')
    expect(schemaToType({ type: 'integer' }, ref)).toBe('number')
    expect(schemaToType({ type: 'boolean' }, ref)).toBe('boolean')
  })
  it('maps $ref to the type name', () => {
    expect(schemaToType({ $ref: '#/components/schemas/Order' }, ref)).toBe('Order')
  })
  it('maps arrays', () => {
    expect(schemaToType({ type: 'array', items: { type: 'string' } }, ref)).toBe('string[]')
  })
  it('maps enums to unions', () => {
    expect(schemaToType({ type: 'string', enum: ['a', 'b'] }, ref)).toBe('"a" | "b"')
  })
  it('maps objects with required/optional props', () => {
    const t = schemaToType(
      { type: 'object', properties: { id: { type: 'string' }, n: { type: 'integer' } }, required: ['id'] },
      ref,
    )
    expect(t).toContain('id: string')
    expect(t).toContain('n?: number')
  })
  it('falls back to unknown', () => {
    expect(schemaToType({}, ref)).toBe('unknown')
  })
  it('handles edge cases without throwing', () => {
    expect(schemaToType({ type: 'string', enum: [] }, ref)).toBe('string')
    expect(schemaToType({ allOf: [] }, ref)).toBe('unknown')
    expect(schemaToType({ type: 'array' }, ref)).toBe('unknown[]')
    expect(schemaToType({ type: 'object' }, ref)).toBe('Record<string, unknown>')
    expect(schemaToType(null, ref)).toBe('unknown')
  })
  it('handles non-array required field without throwing', () => {
    const t1 = schemaToType({ type: 'object', properties: { id: { type: 'string' } }, required: {} }, ref)
    expect(t1).toContain('id?: string')
    const t2 = schemaToType(
      { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } }, required: 'id' },
      ref,
    )
    expect(t2).toContain('id?: string')
    expect(t2).toContain('name?: string')
  })

  it('models nullable', () => {
    expect(schemaToType({ type: 'string', nullable: true }, ref)).toBe('string | null')
    expect(schemaToType({ $ref: '#/components/schemas/Order', nullable: true }, ref)).toBe('Order | null')
  })
  it('models OpenAPI 3.1 type arrays', () => {
    expect(schemaToType({ type: ['string', 'null'] }, ref)).toBe('string | null')
  })
  it('parenthesizes union item types in arrays', () => {
    expect(schemaToType({ type: 'array', items: { type: 'string', enum: ['a', 'b'] } }, ref)).toBe('("a" | "b")[]')
    expect(schemaToType({ type: 'array', items: { type: 'string', nullable: true } }, ref)).toBe('(string | null)[]')
  })
  it('parenthesizes unions inside intersections', () => {
    const schema = {
      allOf: [
        { $ref: '#/components/schemas/A' },
        { oneOf: [{ $ref: '#/components/schemas/B' }, { $ref: '#/components/schemas/C' }] },
      ],
    }
    expect(schemaToType(schema, ref)).toBe('A & (B | C)')
  })
  it('turns additionalProperties into an index signature', () => {
    expect(schemaToType({ type: 'object', additionalProperties: { type: 'string' } }, ref)).toBe(
      '{\n  [key: string]: string\n}',
    )
    expect(schemaToType({ type: 'object', additionalProperties: true }, ref)).toBe('{\n  [key: string]: unknown\n}')
  })
  it('widens the index signature to unknown when named properties are present', () => {
    const t = schemaToType(
      { type: 'object', properties: { id: { type: 'string' } }, additionalProperties: { type: 'number' } },
      ref,
    )
    expect(t).toBe('{\n  id?: string\n  [key: string]: unknown\n}')
  })
  it('maps placeholder keys like {fieldName} to an index signature', () => {
    expect(schemaToType({ type: 'object', properties: { '{fieldName}': { type: 'string' } } }, ref)).toBe(
      '{\n  [key: string]: string\n}',
    )
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/codegen/types.test.ts`
Expected: FAIL in the nullable, type-array, union-array, intersection, `additionalProperties` and placeholder-key cases.

- [ ] **Step 3: Replace `scripts/codegen/types.ts` with**

```ts
const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/
/** Keys such as "{fieldName}" stand for "any key" in VTEX schemas. */
const PLACEHOLDER_KEY_RE = /^\{[^}]+\}$/

function wrap(type: string): string {
  return type.includes(' | ') || type.includes(' & ') ? `(${type})` : type
}

export function schemaToType(schema: any, refName: (ref: string) => string): string {
  if (!schema || typeof schema !== 'object') return 'unknown'
  const base = baseType(schema, refName)
  if (schema.nullable === true && base !== 'unknown' && base !== 'null') return `${base} | null`
  return base
}

function baseType(schema: any, refName: (ref: string) => string): string {
  if (schema.$ref) return refName(schema.$ref)
  if (Array.isArray(schema.enum) && schema.enum.length > 0) {
    return schema.enum.map((v: unknown) => JSON.stringify(v)).join(' | ')
  }
  if (Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    return schema.allOf.map((s: any) => wrap(schemaToType(s, refName))).join(' & ')
  }
  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return schema.oneOf.map((s: any) => schemaToType(s, refName)).join(' | ')
  }
  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    return schema.anyOf.map((s: any) => schemaToType(s, refName)).join(' | ')
  }
  if (Array.isArray(schema.type)) {
    const parts = schema.type.map((t: unknown) =>
      t === 'null' ? 'null' : schemaToType({ ...schema, type: t, nullable: false }, refName),
    )
    return [...new Set(parts)].join(' | ')
  }
  switch (schema.type) {
    case 'string': return 'string'
    case 'number':
    case 'integer': return 'number'
    case 'boolean': return 'boolean'
    case 'null': return 'null'
    case 'array': return `${wrap(schemaToType(schema.items ?? {}, refName))}[]`
    case 'object':
    default: return objectType(schema, refName)
  }
}

function objectType(schema: any, refName: (ref: string) => string): string {
  const props: Record<string, any> =
    schema.properties && typeof schema.properties === 'object' ? schema.properties : {}
  const required: string[] = Array.isArray(schema.required) ? schema.required : []
  const lines: string[] = []
  const indexTypes: string[] = []
  for (const [key, sub] of Object.entries(props)) {
    if (PLACEHOLDER_KEY_RE.test(key)) {
      indexTypes.push(schemaToType(sub, refName))
      continue
    }
    const opt = required.includes(key) ? '' : '?'
    const safeKey = IDENT_RE.test(key) ? key : JSON.stringify(key)
    lines.push(`  ${safeKey}${opt}: ${schemaToType(sub, refName)}`)
  }
  const extra = schema.additionalProperties
  if (extra === true || (extra && typeof extra === 'object' && Object.keys(extra).length === 0)) {
    indexTypes.push('unknown')
  } else if (extra && typeof extra === 'object') {
    indexTypes.push(schemaToType(extra, refName))
  }
  if (lines.length === 0 && indexTypes.length === 0) {
    return schema.type === 'object' || schema.properties ? 'Record<string, unknown>' : 'unknown'
  }
  if (indexTypes.length > 0) {
    // Named properties must be assignable to the index signature, so mixing them widens it.
    const unique = [...new Set(indexTypes)]
    const indexType = lines.length > 0 || unique.includes('unknown') ? 'unknown' : unique.join(' | ')
    lines.push(`  [key: string]: ${indexType}`)
  }
  return `{\n${lines.join('\n')}\n}`
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/codegen/types.test.ts
npm run typecheck
```

Expected: PASS; typecheck clean. `src/generated` is not regenerated until Task 14.

- [ ] **Step 5: Commit**

```bash
git add scripts/codegen/types.ts test/codegen/types.test.ts
git commit -F - <<'EOF'
fix(codegen): model nullable, union arrays, additionalProperties and placeholder keys

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 10: Targeted schema overrides (spec §4.5)

**Files:**
- Create: `scripts/codegen/overrides.ts`
- Test: `test/codegen/overrides.test.ts`

- [ ] **Step 1: Write the failing test.** Create `test/codegen/overrides.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import { applyOverrides, OVERRIDES, type SchemaOverride } from '../../scripts/codegen/overrides.js'

const sample: SchemaOverride[] = [
  {
    file: 'A.json',
    pointer: '/components/schemas/Headers',
    transform: () => ({ type: 'object', additionalProperties: { type: 'string' } }),
    reason: 'test',
  },
  {
    file: 'A.json',
    pointer: '/paths/~1x~1{id}/get/servers',
    transform: () => undefined,
    reason: 'drop servers',
  },
]

describe('applyOverrides', () => {
  it('replaces or deletes the node at each pointer for the matching file', () => {
    const doc: any = {
      components: { schemas: { Headers: { properties: { key: { type: 'string' } } } } },
      paths: { '/x/{id}': { get: { servers: [{ url: 'https://other.example' }] } } },
    }
    expect(applyOverrides('A.json', doc, sample)).toBe(2)
    expect(doc.components.schemas.Headers).toEqual({ type: 'object', additionalProperties: { type: 'string' } })
    expect('servers' in doc.paths['/x/{id}'].get).toBe(false)
  })

  it('ignores overrides for other files', () => {
    expect(applyOverrides('B.json', {}, sample)).toBe(0)
  })

  it('fails loudly when a pointer no longer resolves', () => {
    expect(() => applyOverrides('A.json', { components: { schemas: {} } }, sample)).toThrow(/no longer applies/)
  })

  it('ships the documented overrides', () => {
    expect(OVERRIDES.map((o) => `${o.file} ${o.pointer}`)).toEqual([
      'VTEX - Orders API.json /components/schemas/Headers',
      'VTEX - Orders API.json /paths/~1api~1orders~1hook~1config/post/responses/200/content/application~1json/schema',
      'VTEX - Promotions & Taxes API.json /paths/~1api~1rnb~1pvt~1coupon~1usage~1{couponCode}/get/responses/200/content/application~1json/schema/properties/profileUsages',
      'VTEX - Search API.json /paths/~1api~1catalog_system~1pub~1products~1crossselling~1showtogether~1{productId}/get/servers',
      'VTEX - Search API.json /paths/~1api~1catalog_system~1pub~1products~1crossselling~1accessories~1{productId}/get/servers',
    ])
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/codegen/overrides.test.ts`
Expected: FAIL (cannot resolve `overrides.js`).

- [ ] **Step 3: Create `scripts/codegen/overrides.ts`**

```ts
/**
 * Targeted corrections for VTEX schema quirks the generic generator cannot detect,
 * such as a literal property name used to mean "any key". Codegen fails when a
 * pointer no longer resolves, so a schema re-pin surfaces stale overrides.
 */
export interface SchemaOverride {
  /** Schema file name under schemas/. */
  file: string
  /** RFC 6901 JSON pointer to the node to replace. */
  pointer: string
  /** Returns the replacement node; `undefined` deletes the node. */
  transform: (node: any) => unknown
  reason: string
}

export const OVERRIDES: SchemaOverride[] = [
  {
    file: 'VTEX - Orders API.json',
    pointer: '/components/schemas/Headers',
    transform: () => ({ title: 'Headers', type: 'object', additionalProperties: { type: 'string' } }),
    reason: 'Order-hook headers are a header-name to value map; the schema shows a literal "key" property.',
  },
  {
    file: 'VTEX - Orders API.json',
    pointer: '/paths/~1api~1orders~1hook~1config/post/responses/200/content/application~1json/schema',
    transform: () => ({}),
    reason: 'The documented 200 schema is the hook notification payload, not the configuration response.',
  },
  {
    file: 'VTEX - Promotions & Taxes API.json',
    pointer:
      '/paths/~1api~1rnb~1pvt~1coupon~1usage~1{couponCode}/get/responses/200/content/application~1json/schema/properties/profileUsages',
    transform: (node) => {
      if (!node?.properties?.profileId) throw new Error('profileUsages.properties.profileId not found')
      return { type: 'object', description: node.description, additionalProperties: node.properties.profileId }
    },
    reason: 'profileUsages is keyed by profile id; the schema shows a literal "profileId" property.',
  },
  {
    file: 'VTEX - Search API.json',
    pointer: '/paths/~1api~1catalog_system~1pub~1products~1crossselling~1showtogether~1{productId}/get/servers',
    transform: () => undefined,
    reason: 'The operation-level server was copied from another store (entelperu); use the account host.',
  },
  {
    file: 'VTEX - Search API.json',
    pointer: '/paths/~1api~1catalog_system~1pub~1products~1crossselling~1accessories~1{productId}/get/servers',
    transform: () => undefined,
    reason: 'The operation-level server was copied from another store (entelperu); use the account host.',
  },
]

function decodeSegment(segment: string): string {
  return segment.replace(/~1/g, '/').replace(/~0/g, '~')
}

/** Applies every override registered for `file` to `doc` in place and returns how many were applied. */
export function applyOverrides(file: string, doc: any, overrides: SchemaOverride[] = OVERRIDES): number {
  let applied = 0
  for (const override of overrides) {
    if (override.file !== file) continue
    const fail = () => new Error(`Schema override for ${file} no longer applies: ${override.pointer} (${override.reason})`)
    const segments = override.pointer.split('/').slice(1).map(decodeSegment)
    const last = segments.pop()
    let parent = doc
    for (const segment of segments) {
      parent = parent?.[segment]
      if (parent === null || typeof parent !== 'object') throw fail()
    }
    if (last === undefined || !(last in parent)) throw fail()
    const next = override.transform(parent[last])
    if (next === undefined) delete parent[last]
    else parent[last] = next
    applied++
  }
  return applied
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/codegen/overrides.test.ts
npm run typecheck
```

Expected: PASS; typecheck clean.

- [ ] **Step 5: Commit**

```bash
git add scripts/codegen/overrides.ts test/codegen/overrides.test.ts
git commit -F - <<'EOF'
feat(codegen): targeted overrides for VTEX schema quirks

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 11: Server selection (spec §4.1, §4.2, C1)

**Files:**
- Create: `scripts/codegen/servers.ts`
- Test: `test/codegen/servers.test.ts`

- [ ] **Step 1: Write the failing test.** Create `test/codegen/servers.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import { normalizeServer, pickServer, trimBasePathOverlap } from '../../scripts/codegen/servers.js'
import { DEFAULT_SERVER } from '../../src/core/url.js'

const stable = { environment: { default: 'vtexcommercestable' } }

describe('normalizeServer', () => {
  it('keeps account/environment templates', () => {
    expect(normalizeServer({ url: 'https://{accountName}.{environment}.com.br', variables: stable })).toBe(
      'https://{accountName}.{environment}.com.br',
    )
  })
  it('bakes the myvtex environment', () => {
    expect(
      normalizeServer({ url: 'https://{accountName}.{environment}.com', variables: { environment: { default: 'myvtex' } } }),
    ).toBe('https://{accountName}.myvtex.com')
  })
  it('treats {account} as an alias of {accountName}', () => {
    expect(normalizeServer({ url: 'https://api.vtex.com/{account}/pricing' })).toBe(
      'https://api.vtex.com/{accountName}/pricing',
    )
  })
  it('upgrades http and trims trailing slashes', () => {
    expect(normalizeServer({ url: 'http://api.vtex.com/' })).toBe('https://api.vtex.com')
  })
  it.each([
    'https://{providerApiEndpoint}',
    'https://{storeDomain}/api',
    'https://{workspace}--{accountName}.myvtex.com',
    'https://api-retail-media.newtail.com.br',
    'https://auth.pickingnpacking.com/prod',
    'https://entelperu.{environment}.com.br/api/catalog_system',
    'http://example.com/.{environment}.com.br/api/rnb',
  ])('rejects %s', (url) => {
    expect(normalizeServer({ url, variables: stable })).toBeUndefined()
  })
  it.each([
    'https://portal.{environment}.com.br',
    'https://rnb.{environment}.com.br/api/pricing/pvt',
    'https://{accountName}.pcs.vtexcommercestable.com.br',
    'https://sp.vtex.com/event-api/v1/{accountName}',
  ])('accepts VTEX service host %s', (url) => {
    expect(normalizeServer({ url, variables: stable })).toBe(url)
  })
})

describe('pickServer', () => {
  const doc = [{ url: 'https://{accountName}.{environment}.com.br' }]

  it('prefers operation over path over document servers', () => {
    expect(pickServer([[{ url: 'https://api.vtex.com/{accountName}' }], [{ url: 'https://{accountName}.myvtex.com' }], doc])).toBe(
      'https://api.vtex.com/{accountName}',
    )
    expect(pickServer([undefined, [{ url: 'https://{accountName}.myvtex.com' }], doc])).toBe('https://{accountName}.myvtex.com')
    expect(pickServer([undefined, undefined, doc])).toBe('https://{accountName}.{environment}.com.br')
  })
  it('takes the first resolvable entry within a level', () => {
    expect(pickServer([[{ url: 'https://{storeDomain}' }, { url: 'https://{accountName}.myvtex.com' }]])).toBe(
      'https://{accountName}.myvtex.com',
    )
  })
  it('does not fall back to outer levels when the declaring level is unresolvable', () => {
    expect(pickServer([[{ url: 'https://{providerApiEndpoint}' }], undefined, doc])).toBeUndefined()
  })
  it('defaults to the account host when nothing declares servers', () => {
    expect(pickServer([undefined, undefined, undefined])).toBe(DEFAULT_SERVER)
  })
})

describe('trimBasePathOverlap', () => {
  it('drops a base-path segment repeated at the start of the path', () => {
    expect(trimBasePathOverlap('https://api.vtex.com/{accountName}/pricing', '/pricing/tables')).toBe(
      'https://api.vtex.com/{accountName}',
    )
  })
  it('leaves non-overlapping templates alone', () => {
    expect(trimBasePathOverlap('https://{accountName}.{environment}.com.br/api', '/giftcards')).toBe(
      'https://{accountName}.{environment}.com.br/api',
    )
    expect(trimBasePathOverlap('https://{accountName}.{environment}.com.br', '/api/x')).toBe(
      'https://{accountName}.{environment}.com.br',
    )
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/codegen/servers.test.ts`
Expected: FAIL (cannot resolve `servers.js`).

- [ ] **Step 3: Create `scripts/codegen/servers.ts`**

```ts
import { DEFAULT_SERVER, isAllowlistedHost } from '../../src/core/url.js'

export interface ServerObject {
  url: string
  variables?: Record<string, { default?: unknown; enum?: unknown[] }>
}

/** Domains where the first host label identifies an account (or a shared VTEX service). */
const ACCOUNT_SCOPED_DOMAINS = ['vtexcommercestable.com.br', 'vtexcommercebeta.com.br', 'myvtex.com', 'vtexpayments.com.br']
const SHARED_SERVICE_LABELS = new Set(['api', 'logistics', 'portal', 'prchub', 'rnb'])

/**
 * Normalizes an OpenAPI server into a template that only contains {accountName}
 * and/or {environment}, or returns undefined when the SDK must not call it.
 */
export function normalizeServer(server: ServerObject): string | undefined {
  let url = server.url.replaceAll('{account}', '{accountName}')
  const names = new Set([...url.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]))
  for (const name of names) {
    if (name === 'accountName') continue
    if (name === 'environment') {
      if (server.variables?.environment?.default === 'myvtex') url = url.replaceAll('{environment}', 'myvtex')
      continue
    }
    return undefined
  }
  if (url.startsWith('http://')) url = `https://${url.slice('http://'.length)}`
  url = url.replace(/\/+$/, '')
  let sample: URL
  try {
    sample = new URL(url.replaceAll('{accountName}', 'acme').replaceAll('{environment}', 'vtexcommercestable'))
  } catch {
    return undefined
  }
  if (sample.protocol !== 'https:' || sample.username || sample.password || sample.port || sample.search || sample.hash) {
    return undefined
  }
  if (!isAllowlistedHost(sample.hostname)) return undefined
  const accountScoped = ACCOUNT_SCOPED_DOMAINS.some((d) => sample.hostname === d || sample.hostname.endsWith(`.${d}`))
  if (accountScoped) {
    const firstLabel = url.slice('https://'.length).split('/')[0].split('.')[0]
    if (firstLabel !== '{accountName}' && !SHARED_SERVICE_LABELS.has(firstLabel)) return undefined
  }
  return url
}

/**
 * Picks the server for an operation: operation > path item > document. The first
 * level that declares servers decides; within it, the first resolvable entry wins.
 * When no level declares servers, the account host is used.
 */
export function pickServer(levels: Array<ServerObject[] | undefined>): string | undefined {
  for (const level of levels) {
    if (!Array.isArray(level) || level.length === 0) continue
    for (const server of level) {
      const template = normalizeServer(server)
      if (template) return template
    }
    return undefined
  }
  return DEFAULT_SERVER
}

/** Drops a base-path segment that the operation path repeats (e.g. ".../pricing" + "/pricing/tables"). */
export function trimBasePathOverlap(template: string, path: string): string {
  const pathStart = template.indexOf('/', 'https://'.length)
  if (pathStart === -1) return template
  const origin = template.slice(0, pathStart)
  const baseSegments = template.slice(pathStart).split('/').filter(Boolean)
  const firstPathSegment = path.split('/').filter(Boolean)[0]
  if (baseSegments.length === 0 || baseSegments[baseSegments.length - 1] !== firstPathSegment) return template
  baseSegments.pop()
  return baseSegments.length > 0 ? `${origin}/${baseSegments.join('/')}` : origin
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/codegen/servers.test.ts
npm run typecheck
```

Expected: PASS; typecheck clean.

- [ ] **Step 5: Commit**

```bash
git add scripts/codegen/servers.ts test/codegen/servers.test.ts
git commit -F - <<'EOF'
feat(codegen): pick each operation's server under a VTEX host allowlist

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 12: Operation generator (spec §4.3, §4.4, §4.6, S2, S9, C2, C3)

**Files:**
- Modify: `scripts/codegen/operation.ts`
- Test: `test/codegen/operation.test.ts`

- [ ] **Step 1: Write the failing test.** Replace `test/codegen/operation.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import { generateMethod } from '../../scripts/codegen/operation.js'

const refName = (r: string) => r.split('/').pop()!
const ok = { '200': { content: { 'application/json': { schema: { type: 'object' } } } } }

describe('generateMethod', () => {
  it('emits an encoded path param, typed return and per-call options', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/oms/pvt/orders/{orderId}',
      op: {
        operationId: 'GetOrder',
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } } } },
      },
      refName,
    })
    expect(code).toContain('getOrder(params: {')
    expect(code).toContain('opts?: CallOptions): Promise<Order>')
    expect(code).toContain('`/api/oms/pvt/orders/${encodePathParam(params.orderId)}`')
    expect(code).toContain("method: 'GET'")
    expect(code).toContain('withCall({')
    expect(code).not.toContain('server:')
  })

  it('emits a query param and request body', () => {
    const code = generateMethod({
      httpMethod: 'post',
      path: '/api/x',
      op: {
        operationId: 'DoX',
        parameters: [{ name: 'sc', in: 'query', required: false, schema: { type: 'integer' } }],
        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/XBody' } } } },
        responses: { '201': { content: { 'application/json': { schema: { type: 'object' } } } } },
      },
      refName,
    })
    expect(code).toContain('query:')
    expect(code).toContain('body: params.body')
    expect(code).toContain('XBody')
    expect(code).not.toContain('contentType:')
  })

  it('derives a required path param from the path template when only a $ref parameter is declared and no resolver is given', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{orderId}',
      op: {
        operationId: 'GetX',
        parameters: [{ $ref: '#/components/parameters/orderId' }],
        responses: ok,
      },
      refName,
    })
    expect(code).not.toContain('Record<string, never>')
    expect(code).toMatch(/orderId:\s*string \| number/)
    expect(code).toContain('${encodePathParam(params.orderId)}')
  })

  it('resolves a $ref path parameter via resolveRef and uses its schema type', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{orderId}',
      op: {
        operationId: 'GetX',
        parameters: [{ $ref: '#/components/parameters/orderId' }],
        responses: ok,
      },
      refName,
      resolveRef: () => ({ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }),
    })
    expect(code).toMatch(/orderId:\s*string(?!\s*\|)/)
  })

  it('never types a path param as nullable', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{id}',
      op: {
        operationId: 'GetX',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', nullable: true } }],
        responses: ok,
      },
      refName,
    })
    expect(code).toMatch(/id: string\n/)
  })

  it('escapes non-identifier param names in the options type, path interpolation, and query object', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{document-id}',
      op: {
        operationId: 'GetY',
        parameters: [{ name: 'zip-code', in: 'query', required: false, schema: { type: 'string' } }],
        responses: ok,
      },
      refName,
    })
    expect(code).toContain("'zip-code'")
    expect(code).toContain("params['zip-code']")
    expect(code).toContain("${encodePathParam(params['document-id'])}")
  })

  it('makes params optional when nothing is required', () => {
    const none = generateMethod({ httpMethod: 'get', path: '/api/feed/config', op: { operationId: 'GetFeedConfig', responses: ok }, refName })
    expect(none).toContain('getFeedConfig(params: Record<string, never> = {}, opts?: CallOptions)')
    const optionalQuery = generateMethod({
      httpMethod: 'get',
      path: '/api/x',
      op: { operationId: 'X', parameters: [{ name: 'q', in: 'query', schema: { type: 'string' } }], responses: ok },
      refName,
    })
    expect(optionalQuery).toContain('} = {}, opts?: CallOptions)')
  })

  it('exposes schema header params but never SDK-managed headers', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/dataentities/{acronym}/search',
      op: {
        operationId: 'Search',
        parameters: [
          { name: 'acronym', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'REST-Range', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'Accept', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'X-VTEX-API-AppToken', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'Host', in: 'header', required: false, schema: { type: 'string' } },
        ],
        responses: ok,
      },
      refName,
    })
    expect(code).toContain("'REST-Range': string")
    expect(code).toContain("headers: { 'REST-Range': params['REST-Range'] }")
    expect(code).not.toContain("'Accept'")
    expect(code).not.toContain('AppToken')
    expect(code).not.toContain("'Host'")
  })

  it('sends vendor JSON bodies with their content type and server', () => {
    const code = generateMethod({
      httpMethod: 'post',
      path: '/giftcards',
      op: {
        operationId: 'CreateGiftCard',
        requestBody: { content: { 'application/vnd.vtex.giftcard.v1+json': { schema: { $ref: '#/components/schemas/CreateGiftCardRequest' } } } },
        responses: { '201': { content: { 'application/vnd.vtex.giftcard.v1+json': { schema: { $ref: '#/components/schemas/GiftCard' } } } } },
      },
      refName,
      server: 'https://{accountName}.{environment}.com.br/api',
    })
    expect(code).toContain('body: CreateGiftCardRequest')
    expect(code).toContain("contentType: 'application/vnd.vtex.giftcard.v1+json'")
    expect(code).toContain("server: 'https://{accountName}.{environment}.com.br/api'")
    expect(code).toContain('Promise<GiftCard>')
  })

  it('omits the server when it is the default account host', () => {
    const code = generateMethod({
      httpMethod: 'get', path: '/x', op: { operationId: 'X', responses: ok }, refName,
      server: 'https://{accountName}.{environment}.com.br',
    })
    expect(code).not.toContain('server:')
  })

  it('types multipart, form and text bodies', () => {
    const gen = (ct: string) =>
      generateMethod({
        httpMethod: 'post',
        path: '/x',
        op: { operationId: 'Up', requestBody: { content: { [ct]: { schema: { type: 'object' } } } }, responses: ok },
        refName,
      })
    expect(gen('multipart/form-data')).toContain('body: FormData')
    expect(gen('multipart/form-data')).toContain("contentType: 'multipart/form-data'")
    expect(gen('form-data')).toContain("contentType: 'multipart/form-data'")
    expect(gen('application/x-www-form-urlencoded')).toContain('body: URLSearchParams | Record<string, string>')
    expect(gen('text/csv')).toContain('body: string')
    expect(gen('text/csv')).toContain("contentType: 'text/csv'")
  })

  it('refuses unsafe paths', () => {
    for (const path of ['/a/`x`', '/a/${x}', '/a b', '/a\\b', '/a/{bad name}']) {
      expect(() =>
        generateMethod({ httpMethod: 'get', path, op: { operationId: 'X', responses: ok }, refName }),
      ).toThrow(/unsafe/)
    }
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/codegen/operation.test.ts`
Expected: FAIL:
- there is no `encodePathParam`, `withCall` or `CallOptions` in the output;
- header params, optional params and non-JSON bodies are missing;
- unsafe paths are accepted.

- [ ] **Step 3: Replace `scripts/codegen/operation.ts` with**

```ts
import { methodName } from './naming.js'
import { schemaToType } from './types.js'
import { DEFAULT_SERVER } from '../../src/core/url.js'

interface Ctx {
  httpMethod: string
  path: string
  op: any
  refName: (ref: string) => string
  /** Resolve a `$ref` (e.g. "#/components/parameters/X") to the referenced parameter object. */
  resolveRef?: (ref: string) => any
  /**
   * Override the computed method name (e.g. after a caller has run per-namespace
   * `dedupe()` across a batch of operations). When omitted, falls back to
   * `methodName(op, httpMethod, path)`.
   */
  name?: string
  /** Normalized server template from `pickServer()`; omit (or pass DEFAULT_SERVER) for the account host. */
  server?: string
}

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/
const SAFE_PATH_RE = /^\/[A-Za-z0-9\-._~!&'()*+,;=:@%/{}]*$/
const SAFE_PLACEHOLDER_RE = /^[A-Za-z0-9_.-]+$/
/** Headers managed by the SDK or by fetch; schema-declared params with these names are not exposed. */
const MANAGED_HEADERS = new Set([
  'accept', 'content-type', 'content-length', 'host',
  'x-vtex-api-appkey', 'x-vtex-api-apptoken', 'vtexidclientautcookie', 'cookie', 'authorization',
])

function isSafeIdent(name: string): boolean {
  return IDENT_RE.test(name)
}

/** Single-quoted string literal, escaping backslashes/quotes as needed. */
function quoteString(name: string): string {
  return `'${name.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

/** Key for an object type literal / value, quoting it when it isn't a valid identifier. */
function quoteKey(name: string): string {
  return isSafeIdent(name) ? name : quoteString(name)
}

/** Expression to read `name` off the `params` object, using bracket access when needed. */
function accessExpr(name: string): string {
  return isSafeIdent(name) ? `params.${name}` : `params[${quoteString(name)}]`
}

function isJsonMediaType(type: string): boolean {
  return /^application\/(?:[a-z0-9.!#$&^_-]+\+)?json(?:\s*;|\s*$)/i.test(type)
}

function jsonSchemaOf(container: any): any | undefined {
  const content = container?.content
  if (!content) return undefined
  const types = Object.keys(content)
  const key = types.find((t) => t.startsWith('application/json')) ?? types.find(isJsonMediaType)
  return key ? content[key].schema : undefined
}

interface BodyInfo {
  type: string
  /** Emitted only when it differs from the default application/json. */
  contentType?: string
}

function requestBodyInfo(requestBody: any, refName: (ref: string) => string): BodyInfo | undefined {
  const content = requestBody?.content
  if (!content || typeof content !== 'object') return undefined
  const types = Object.keys(content)
  const plainJson = types.find((t) => t.startsWith('application/json'))
  if (plainJson) return { type: schemaToType(content[plainJson].schema ?? {}, refName) }
  const vendorJson = types.find(isJsonMediaType)
  if (vendorJson) return { type: schemaToType(content[vendorJson].schema ?? {}, refName), contentType: vendorJson }
  // Declared so that a non-FormData body is rejected instead of being sent as JSON.
  if (types.some((t) => /^(multipart\/)?form-data$/i.test(t))) return { type: 'FormData', contentType: 'multipart/form-data' }
  const form = types.find((t) => /^application\/x-www-form-urlencoded/i.test(t))
  if (form) return { type: 'URLSearchParams | Record<string, string>', contentType: form }
  const text = types.find((t) => /^text\//i.test(t))
  if (text) return { type: 'string', contentType: text }
  return undefined
}

function successSchema(op: any): any | undefined {
  const responses = op.responses ?? {}
  const code = Object.keys(responses).find((c) => c.startsWith('2')) // 200/201/202/204
  if (!code) return undefined
  return jsonSchemaOf(responses[code])
}

/** Extract the `{name}` placeholders from a path template, in order of first appearance. */
function pathPlaceholders(path: string): string[] {
  const names: string[] = []
  const seen = new Set<string>()
  for (const m of path.matchAll(/\{([^}]+)\}/g)) {
    const n = m[1]
    if (!seen.has(n)) {
      seen.add(n)
      names.push(n)
    }
  }
  return names
}

export function generateMethod(ctx: Ctx): string {
  const { httpMethod, path, op, refName, resolveRef } = ctx
  if (!SAFE_PATH_RE.test(path)) throw new Error(`Refusing to generate a method for unsafe path ${JSON.stringify(path)}`)
  const name = ctx.name ?? methodName(op, httpMethod, path)
  const rawParams: any[] = op.parameters ?? []

  // Resolve `$ref` parameter entries (best-effort; unresolved/no-resolver entries are dropped —
  // path placeholders are covered independently via the path template itself).
  const resolvedParams: any[] = []
  for (const p of rawParams) {
    if (p && typeof p === 'object' && typeof p.$ref === 'string') {
      const resolved = resolveRef ? resolveRef(p.$ref) : undefined
      if (resolved) resolvedParams.push(resolved)
    } else if (p) {
      resolvedParams.push(p)
    }
  }

  const inlinePathParams = new Map<string, any>()
  const queryParams: any[] = []
  const headerParams: any[] = []
  const seenQueryNames = new Set<string>()
  const seenHeaderNames = new Set<string>()
  for (const p of resolvedParams) {
    if (!p || !p.name) continue
    const lowerName = String(p.name).toLowerCase()
    if (p.in === 'path') {
      inlinePathParams.set(p.name, p)
    } else if (p.in === 'query' && !seenQueryNames.has(p.name)) {
      seenQueryNames.add(p.name)
      queryParams.push(p)
    } else if (p.in === 'header' && !MANAGED_HEADERS.has(lowerName) && !seenHeaderNames.has(lowerName)) {
      seenHeaderNames.add(lowerName)
      headerParams.push(p)
    }
  }

  // The path template is the source of truth for what params the URL needs.
  const placeholders = pathPlaceholders(path)
  for (const p of placeholders) {
    if (!SAFE_PLACEHOLDER_RE.test(p)) {
      throw new Error(`Refusing to generate a method for unsafe placeholder ${JSON.stringify(p)} in ${JSON.stringify(path)}`)
    }
  }

  const body = requestBodyInfo(op.requestBody, refName)
  const retSchema = successSchema(op)
  const retType = retSchema ? schemaToType(retSchema, refName) : 'unknown'

  // Options-object type. Build with a used-keys set so path/query/header/body never collide.
  const usedKeys = new Set<string>()
  const optionFields: string[] = []
  let hasRequired = false

  for (const n of placeholders) {
    usedKeys.add(n)
    const inline = inlinePathParams.get(n)
    // A path segment can never be null, whatever the schema says.
    const type = inline ? schemaToType({ ...(inline.schema ?? {}), nullable: false }, refName) : 'string | number'
    optionFields.push(`  ${quoteKey(n)}: ${type}`)
    hasRequired = true
  }

  for (const p of queryParams) {
    if (usedKeys.has(p.name)) continue
    usedKeys.add(p.name)
    if (p.required) hasRequired = true
    optionFields.push(`  ${quoteKey(p.name)}${p.required ? '' : '?'}: ${schemaToType(p.schema ?? {}, refName)}`)
  }

  const emittedHeaders: any[] = []
  for (const p of headerParams) {
    if (usedKeys.has(p.name)) continue
    usedKeys.add(p.name)
    emittedHeaders.push(p)
    if (p.required) hasRequired = true
    optionFields.push(`  ${quoteKey(p.name)}${p.required ? '' : '?'}: ${schemaToType(p.schema ?? {}, refName)}`)
  }

  if (body && !usedKeys.has('body')) {
    usedKeys.add('body')
    hasRequired = true
    optionFields.push(`  body: ${body.type}`)
  }

  const optionsType = optionFields.length ? `{\n${optionFields.join('\n')}\n}` : 'Record<string, never>'
  const paramsDecl = hasRequired ? `params: ${optionsType}` : `params: ${optionsType} = {}`

  // Interpolated path: every placeholder goes through encodePathParam.
  const tsPath = path.replace(/\{([^}]+)\}/g, (_m, g) => `\${encodePathParam(${accessExpr(g)})}`)

  const queryObj = queryParams.length
    ? `{ ${queryParams.map((p) => `${quoteString(p.name)}: ${accessExpr(p.name)}`).join(', ')} }`
    : undefined
  const headersObj = emittedHeaders.length
    ? `{ ${emittedHeaders.map((p) => `${quoteString(p.name)}: ${accessExpr(p.name)}`).join(', ')} }`
    : undefined

  const callFields = [`method: '${httpMethod.toUpperCase()}'`, `path: \`${tsPath}\``]
  if (queryObj) callFields.push(`query: ${queryObj}`)
  if (headersObj) callFields.push(`headers: ${headersObj}`)
  if (body) callFields.push('body: params.body')
  if (body?.contentType) callFields.push(`contentType: ${quoteString(body.contentType)}`)
  if (ctx.server && ctx.server !== DEFAULT_SERVER) callFields.push(`server: ${quoteString(ctx.server)}`)

  return [
    `  ${name}(${paramsDecl}, opts?: CallOptions): Promise<${retType}> {`,
    `    return this.http.request<${retType}>(withCall({ ${callFields.join(', ')} }, opts))`,
    `  }`,
  ].join('\n')
}
```

- [ ] **Step 4: Run the tests**

```bash
npx vitest run test/codegen/operation.test.ts
npm run typecheck
```

Expected: PASS; typecheck clean.

- [ ] **Step 5: Commit**

```bash
git add scripts/codegen/operation.ts test/codegen/operation.test.ts
git commit -F - <<'EOF'
feat(codegen): encoded path params, typed header params, per-call options, non-JSON bodies

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 13: Verified schema downloads (spec §6)

**Files:**
- Create: `scripts/codegen/integrity.ts`
- Modify: `scripts/fetch-schemas.ts`
- Test: `test/codegen/integrity.test.ts`

- [ ] **Step 1: Write the failing test.** Create `test/codegen/integrity.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import { assertSchemaDownloadUrl, gitBlobSha } from '../../scripts/codegen/integrity.js'

describe('gitBlobSha', () => {
  it('matches git hash-object', () => {
    // `printf 'hello\n' | git hash-object --stdin`
    expect(gitBlobSha(new TextEncoder().encode('hello\n'))).toBe('ce013625030ba8dba906f756967f9e9ca394464a')
  })
})

describe('assertSchemaDownloadUrl', () => {
  it('accepts raw.githubusercontent.com over https', () => {
    expect(assertSchemaDownloadUrl('https://raw.githubusercontent.com/vtex/openapi-schemas/abc/x.json').hostname).toBe(
      'raw.githubusercontent.com',
    )
  })
  it.each(['http://raw.githubusercontent.com/x.json', 'https://evil.example/x.json', 'https://raw.githubusercontent.com.evil.example/x.json'])(
    'rejects %s',
    (url) => {
      expect(() => assertSchemaDownloadUrl(url)).toThrow(/Refusing/)
    },
  )
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/codegen/integrity.test.ts`
Expected: FAIL (cannot resolve `integrity.js`).

- [ ] **Step 3: Create `scripts/codegen/integrity.ts`**

```ts
import { createHash } from 'node:crypto'

/** Git blob SHA-1 of `content`, the value GitHub's contents API reports as `sha`. */
export function gitBlobSha(content: Uint8Array): string {
  return createHash('sha1').update(`blob ${content.byteLength}\0`).update(content).digest('hex')
}

/** Only raw.githubusercontent.com over https is accepted as a schema download source. */
export function assertSchemaDownloadUrl(downloadUrl: string): URL {
  const url = new URL(downloadUrl)
  if (url.protocol !== 'https:' || url.hostname !== 'raw.githubusercontent.com') {
    throw new Error(`Refusing to download a schema from ${url.origin}`)
  }
  return url
}
```

- [ ] **Step 4: Replace `scripts/fetch-schemas.ts` with**

```ts
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { assertSchemaDownloadUrl, gitBlobSha } from './codegen/integrity.js'

// Pin to a specific commit for reproducibility. Update deliberately.
const REF = '1ca3d11c8dfc9dd17484eabad051d364e767c50d'
const API = `https://api.github.com/repos/vtex/openapi-schemas/contents?ref=${REF}`
const SKIP = new Set(['config.json', 'package.json', 'package-lock.json', 'rating-config.json'])

async function main() {
  const headers: Record<string, string> = { 'User-Agent': 'vtex-sdk-codegen' }
  // Optional: avoids the anonymous GitHub API rate limit (e.g. in CI).
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(API, { headers })
  if (!res.ok) throw new Error(`GitHub listing failed: ${res.status}`)
  const entries = (await res.json()) as Array<{ name: string; download_url: string; sha: string }>
  const schemas = entries.filter((e) => e.name.endsWith('.json') && !SKIP.has(e.name))
  await mkdir('schemas', { recursive: true })
  for (const e of schemas) {
    const url = assertSchemaDownloadUrl(e.download_url)
    const raw = await fetch(url, { headers: { 'User-Agent': 'vtex-sdk-codegen' }, redirect: 'error' })
    if (!raw.ok) throw new Error(`Download failed for ${e.name}: ${raw.status}`)
    const content = new Uint8Array(await raw.arrayBuffer())
    const sha = gitBlobSha(content)
    if (sha !== e.sha) throw new Error(`Integrity check failed for ${e.name}: expected blob ${e.sha}, got ${sha}`)
    await writeFile(join('schemas', e.name), content)
    console.log(`saved ${e.name}`)
  }
  console.log(`\nDownloaded and verified ${schemas.length} API schemas (skipped ${SKIP.size} tooling files).`)
}

main().catch((err) => { console.error(err); process.exit(1) })
```

- [ ] **Step 5: Run the tests**

```bash
npx vitest run test/codegen/integrity.test.ts
npm run typecheck
```

Expected: PASS; typecheck clean. Do not run `fetch-schemas` here: the committed `schemas/` is still the generator input until Task 15.

- [ ] **Step 6: Commit**

```bash
git add scripts/codegen/integrity.ts scripts/fetch-schemas.ts test/codegen/integrity.test.ts
git commit -F - <<'EOF'
fix(scripts): verify schema downloads by git blob SHA and source host

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 14: Codegen driver and regeneration (spec §4.1–§4.7)

**Files:**
- Modify: `scripts/codegen.ts`
- Regenerate: `src/generated/**` (new: `src/generated/types-index.ts`)
- Test: `test/generated-hosts.test.ts`

- [ ] **Step 1: Write the failing test.** Create `test/generated-hosts.test.ts` with

```ts
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, vi } from 'vitest'
import { DEFAULT_SERVER, resolveServer } from '../src/core/url.js'
import { VtexClient } from '../src/client.js'

const GENERATED_DIR = fileURLToPath(new URL('../src/generated/', import.meta.url))

function generatedServerTemplates(): string[] {
  const templates = new Set<string>([DEFAULT_SERVER])
  for (const entry of readdirSync(GENERATED_DIR, { withFileTypes: true })) {
    const index = join(GENERATED_DIR, entry.name, 'index.ts')
    if (!entry.isDirectory() || !existsSync(index)) continue
    for (const match of readFileSync(index, 'utf8').matchAll(/server: '([^']+)'/g)) templates.add(match[1])
  }
  return [...templates]
}

function client() {
  const fetchMock = vi.fn().mockImplementation(() =>
    Promise.resolve(new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })),
  )
  return { fetchMock, vtex: new VtexClient({ account: 'acme', appKey: 'K', appToken: 'T', fetch: fetchMock }) }
}

describe('generated hosts', () => {
  it('every generated server template resolves to an allowlisted https VTEX origin', () => {
    const templates = generatedServerTemplates()
    expect(templates.length).toBeGreaterThan(10)
    for (const template of templates) {
      expect(resolveServer(template, 'acme', 'vtexcommercestable').origin).toMatch(/^https:\/\//)
    }
  })

  it('creates gift cards on /api with the vendor content type and the body', async () => {
    const { fetchMock, vtex } = client()
    await vtex.raw.giftcardAPI.giftCard.createGiftCard({
      body: { relationName: 'loyalty', expiringDate: '2027-01-01T00:00:00.000', caption: 'club', profileId: 'p1' },
    })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://acme.vtexcommercestable.com.br/api/giftcards')
    expect(init.headers['Content-Type']).toBe('application/vnd.vtex.giftcard.v1+json')
    expect(JSON.parse(init.body)).toMatchObject({ profileId: 'p1' })
  })

  it('sends the typed REST-Range header param on gift card search', async () => {
    const { fetchMock, vtex } = client()
    await vtex.raw.giftcardAPI.giftCard.searchGiftCardsfromcartdata({ 'REST-Range': 'resources=0-9', body: {} as never })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://acme.vtexcommercestable.com.br/api/giftcards/_search')
    expect(init.headers['REST-Range']).toBe('resources=0-9')
  })

  it.each([
    ['pricing price', (v: VtexClient) => v.raw.pricingAPI.pricesAndFixedPrices.getPrice({ itemId: 42 }), 'https://api.vtex.com/acme/pricing/prices/42'],
    ['pricing config (overlap trimmed)', (v: VtexClient) => v.raw.pricingAPI.pricingConfiguration.getPricingConfig(), 'https://api.vtex.com/acme/pricing/config'],
    ['VTEX ID token validation', (v: VtexClient) => v.raw.vtexID.authentication.postApiVtexidCredentialValidate({ an: 'acme', body: { token: 't' } }), 'https://acme.vtexcommercestable.com.br/api/vtexid/credential/validate?an=acme'],
    ['coupon upsert', (v: VtexClient) => v.raw.promotionsTaxesAPI.coupons.createOrUpdateCoupon({ body: { utmSource: 's', couponCode: 'c', maxItemsPerClient: 0, expirationIntervalPerUse: '00:00:00' } }), 'https://acme.vtexcommercestable.com.br/api/rnb/pvt/coupon'],
    ['orders feed', (v: VtexClient) => v.raw.ordersAPI.feedV3.getfeedorderstatus1({ maxlot: '10' }), 'https://acme.vtexcommercestable.com.br/api/orders/feed?maxlot=10'],
    ['myvtex-hosted API', (v: VtexClient) => v.raw.reviewsAndRatingsAPI.review.getReviewbyReviewId({ reviewId: 'r1' }), 'https://acme.myvtex.com/reviews-and-ratings/api/review/r1'],
  ])('routes %s to the documented host', async (_name, call, expectedUrl) => {
    const { fetchMock, vtex } = client()
    await call(vtex)
    expect(fetchMock.mock.calls[0][0]).toBe(expectedUrl)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run test/generated-hosts.test.ts`
Expected: FAIL:
- gift cards still go to `/giftcards` on the account host, with no body;
- Pricing goes to the account host;
- the myvtex API goes to the account host.

- [ ] **Step 3: Replace `scripts/codegen.ts` with**

```ts
/**
 * Codegen driver.
 *
 * Reads every OpenAPI document in `schemas/*.json` (downloaded by `npm run fetch-schemas`;
 * not committed) and emits, per API:
 *   - `src/generated/<slug>/types.ts`  — every `components.schemas` entry as an exported type.
 *   - `src/generated/<slug>/index.ts`  — a class per tag (namespace), grouping generated
 *     methods, aggregated into one exported `<Api>` class constructed from a `VtexHttpClient`.
 *     Only emitted for APIs with at least one operation served by an allowlisted VTEX host.
 * plus `src/generated/index.ts` exporting `class RawNamespaces`, and
 * `src/generated/types-index.ts` exporting one type namespace per API.
 *
 * Integration concerns handled here:
 *
 *  1. Wiring `resolveRef` so `$ref` query/header parameters resolve against each schema
 *     file's own `components.parameters`.
 *  2. Deduping method names *per namespace* over ALL operations (including excluded ones),
 *     so excluding an operation never renames another.
 *  3. Guaranteeing every generated identifier that matters for `tsc` is unique (slugs,
 *     API classes, top-level namespaces), computed for every file in a fixed order so
 *     names stay stable when an API is excluded.
 *  4. Making every bare type name emitted by `schemaToType`/`generateMethod` resolve
 *     (sanitized keys, `unknown` fallbacks for dangling refs, named type imports).
 *  5. Applying targeted schema overrides (`codegen/overrides.ts`) before anything else.
 *  6. Choosing each operation's server (`codegen/servers.ts`). Operations without an
 *     allowlisted VTEX server are excluded from `raw.*` and reported.
 */
import { existsSync } from 'node:fs'
import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { methodName, dedupe, tagToNamespace } from './codegen/naming.js'
import { schemaToType } from './codegen/types.js'
import { generateMethod } from './codegen/operation.js'
import { applyOverrides, OVERRIDES } from './codegen/overrides.js'
import { pickServer, trimBasePathOverlap } from './codegen/servers.js'

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const
type HttpMethod = (typeof HTTP_METHODS)[number]

/** Identifiers imported by every generated index.ts; schema types must not shadow them. */
const RESERVED_TYPE_NAMES = ['VtexHttpClient', 'CallOptions']

// ---------------------------------------------------------------------------
// Identifier helpers
// ---------------------------------------------------------------------------

/** Directory-safe slug: lowercase, non-alnum runs collapsed to single hyphens. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Splits on runs of non-alphanumeric characters, dropping empties. */
function identifierParts(input: string): string[] {
  return input
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

/** PascalCase identifier, safe for a leading digit. Already-clean names pass through unchanged. */
function pascalCase(input: string): string {
  const parts = identifierParts(input)
  if (parts.length === 0) return 'X'
  const result = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  return /^[0-9]/.test(result) ? `_${result}` : result
}

/**
 * Sanitizes a `components.schemas` key (or any `$ref` last-segment) into a valid TS
 * type identifier. Idempotent on names that are already clean (e.g. "Order" -> "Order").
 */
function sanitizeTypeName(raw: string): string {
  return pascalCase(raw)
}

/** First candidate not already in `used`; if all given candidates collide, numeric-suffix the first. */
function uniqueName(candidates: string[], used: Set<string>): string {
  for (const c of candidates) {
    if (c && !used.has(c)) {
      used.add(c)
      return c
    }
  }
  const base = candidates[0] || 'x'
  let n = 2
  let candidate = `${base}${n}`
  while (used.has(candidate)) {
    n += 1
    candidate = `${base}${n}`
  }
  used.add(candidate)
  return candidate
}

/** Per-API class name, derived from the (already-unique) slug so it inherits that uniqueness. */
function apiClassName(slug: string): string {
  const base = pascalCase(slug)
  return /Api$/.test(base) ? base : `${base}Api`
}

// ---------------------------------------------------------------------------
// Per-file $ref resolution (type names + parameter refs)
// ---------------------------------------------------------------------------

/**
 * Builds a `refName` resolver scoped to one schema document: declared `components.schemas`
 * keys are sanitized + deduped up front (in declaration order); any ref seen later
 * that doesn't match a declared key is treated as dangling and assigned a name lazily,
 * on first sight, from the same collision-free pool.
 */
function makeRefResolver(schemas: Record<string, unknown>) {
  const used = new Set<string>(RESERVED_TYPE_NAMES)
  const declared = new Map<string, string>() // raw schema key -> final type name
  for (const raw of Object.keys(schemas)) {
    declared.set(raw, uniqueName([sanitizeTypeName(raw)], used))
  }
  const dangling = new Map<string, string>() // raw ref last-segment -> final type name

  const refName = (ref: string): string => {
    const raw = ref.split('/').pop()!
    const known = declared.get(raw)
    if (known) return known
    const existing = dangling.get(raw)
    if (existing) return existing
    const assigned = uniqueName([sanitizeTypeName(raw)], used)
    dangling.set(raw, assigned)
    return assigned
  }

  return { refName, declared, dangling }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

interface OpEntry {
  httpMethod: HttpMethod
  path: string
  op: any
  /** undefined when the operation has no allowlisted VTEX server (excluded from raw). */
  server: string | undefined
}

async function main() {
  const dir = 'schemas'
  if (!existsSync(dir)) {
    throw new Error('schemas/ is missing: run `npm run fetch-schemas` first (schemas are not committed).')
  }
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json')).sort()
  await rm('src/generated', { recursive: true, force: true })
  await mkdir('src/generated', { recursive: true })

  const usedSlugs = new Set<string>()
  const usedApiClasses = new Set<string>()
  const usedTopNamespaces = new Set<string>()

  const rawImports: string[] = []
  const rawFields: { ns: string; cls: string }[] = []
  const typeExports: string[] = []
  const excludedOps: string[] = []
  const excludedApis: string[] = []

  let totalMethods = 0
  let totalNamespaces = 0
  let overridesApplied = 0
  let basePathsTrimmed = 0

  for (const file of files) {
    const doc = JSON.parse(await readFile(join(dir, file), 'utf8'))
    overridesApplied += applyOverrides(file, doc)
    const title: string = doc.info?.title ?? file.replace(/\.json$/, '')
    // Disambiguation source for collisions: several files legitimately share an
    // identical `info.title` (e.g. four "Marketplace Protocol" documents that only
    // differ by filename/description), so fall back to the filename when needed.
    const fileBase = file.replace(/\.json$/, '').replace(/^VTEX\s*-\s*/, '')

    const slug = uniqueName([slugify(title), slugify(fileBase)], usedSlugs)
    const apiClass = uniqueName([apiClassName(slug)], usedApiClasses)
    const topNs = uniqueName([tagToNamespace(title), tagToNamespace(fileBase)], usedTopNamespaces)

    const schemas: Record<string, any> = doc.components?.schemas ?? {}
    const parameters: Record<string, any> = doc.components?.parameters ?? {}
    const { refName, declared, dangling } = makeRefResolver(schemas)
    const resolveRef = (ref: string) => {
      const name = ref.split('/').pop()!
      return parameters[name]
    }

    // --- Group operations by namespace (first tag), choosing each operation's server ---
    const groups = new Map<string, OpEntry[]>()
    for (const [path, item] of Object.entries<any>(doc.paths ?? {})) {
      for (const httpMethod of HTTP_METHODS) {
        const op = item[httpMethod]
        if (!op) continue
        const picked = pickServer([op.servers, item.servers, doc.servers])
        let server: string | undefined
        if (picked === undefined) {
          excludedOps.push(`${fileBase}: ${httpMethod.toUpperCase()} ${path}`)
        } else {
          server = trimBasePathOverlap(picked, path)
          if (server !== picked) basePathsTrimmed++
        }
        const tag = (op.tags && op.tags[0]) || title
        const ns = tagToNamespace(tag)
        if (!groups.has(ns)) groups.set(ns, [])
        groups.get(ns)!.push({ httpMethod, path, op, server })
      }
    }

    // --- Emit one class per namespace; names are deduped over all operations ---------
    const nsClasses: string[] = []
    const nsFieldNames: string[] = []
    for (const [ns, entries] of groups) {
      const finalNames = dedupe(entries.map((e) => methodName(e.op, e.httpMethod, e.path)))
      const included = entries
        .map((e, i) => ({ ...e, name: finalNames[i] }))
        .filter((e): e is OpEntry & { name: string; server: string } => e.server !== undefined)
      if (included.length === 0) continue
      const methodsCode = included.map((e) =>
        generateMethod({
          httpMethod: e.httpMethod,
          path: e.path,
          op: e.op,
          refName,
          resolveRef,
          name: e.name,
          server: e.server,
        }),
      )
      totalMethods += methodsCode.length
      const className = `${apiClass}_${ns}`
      nsClasses.push(
        [
          `class ${className} {`,
          `  constructor(private http: VtexHttpClient) {}`,
          ``,
          methodsCode.join('\n\n'),
          `}`,
        ].join('\n'),
      )
      nsFieldNames.push(ns)
    }
    totalNamespaces += nsFieldNames.length

    // --- types.ts: declared schemas + fallback `unknown` aliases for dangling refs -
    const typeLines: string[] = []
    for (const [raw, schema] of Object.entries(schemas)) {
      typeLines.push(`export type ${declared.get(raw)} = ${schemaToType(schema, refName)}\n`)
    }
    for (const [, finalName] of dangling) {
      typeLines.push(`export type ${finalName} = unknown\n`)
    }
    await mkdir(join('src/generated', slug), { recursive: true })
    await writeFile(join('src/generated', slug, 'types.ts'), typeLines.join('\n') || 'export {}\n')
    typeExports.push(`export type * as ${apiClass}Types from './${slug}/types.js'`)

    if (nsClasses.length === 0) {
      excludedApis.push(fileBase)
      continue
    }

    // --- index.ts: namespace classes + aggregating <Api> class ---------------------
    const allTypeNames = [...new Set([...declared.values(), ...dangling.values()])]
    const typeImport = allTypeNames.length
      ? `import type { ${allTypeNames.join(', ')} } from './types.js'\n`
      : ''
    const usesPathParams = nsClasses.some((c) => c.includes('encodePathParam('))

    const indexSource = [
      `import type { VtexHttpClient } from '../../core/http.js'`,
      `import type { CallOptions } from '../../core/types.js'`,
      `import { ${usesPathParams ? 'encodePathParam, withCall' : 'withCall'} } from '../../core/call.js'`,
      typeImport ? typeImport.trimEnd() : undefined,
      ``,
      ...nsClasses,
      ``,
      `export class ${apiClass} {`,
      ...nsFieldNames.map((ns) => `  readonly ${ns}: ${apiClass}_${ns}`),
      `  constructor(http: VtexHttpClient) {`,
      ...nsFieldNames.map((ns) => `    this.${ns} = new ${apiClass}_${ns}(http)`),
      `  }`,
      `}`,
      ``,
    ]
      .filter((line): line is string => line !== undefined)
      .join('\n')

    await writeFile(join('src/generated', slug, 'index.ts'), indexSource)

    rawImports.push(`import { ${apiClass} } from './${slug}/index.js'`)
    rawFields.push({ ns: topNs, cls: apiClass })
  }

  if (overridesApplied !== OVERRIDES.length) {
    throw new Error(`Expected ${OVERRIDES.length} schema overrides to apply, applied ${overridesApplied}`)
  }

  // --- Top-level RawNamespaces aggregator + type namespaces ----------------------
  const aggregator = [
    `import type { VtexHttpClient } from '../core/http.js'`,
    ...rawImports,
    ``,
    `export class RawNamespaces {`,
    ...rawFields.map(({ ns, cls }) => `  readonly ${ns}: ${cls}`),
    `  constructor(http: VtexHttpClient) {`,
    ...rawFields.map(({ ns, cls }) => `    this.${ns} = new ${cls}(http)`),
    `  }`,
    `}`,
    ``,
  ].join('\n')
  await writeFile('src/generated/index.ts', aggregator)
  await writeFile('src/generated/types-index.ts', `${typeExports.join('\n')}\n`)

  console.log(
    `Generated ${rawFields.length} raw APIs (${totalNamespaces} namespaces, ${totalMethods} methods) ` +
      `and ${files.length} type modules into src/generated/.\n` +
      `Excluded ${excludedOps.length} operations served by non-VTEX or variable hosts ` +
      `(${excludedApis.length} APIs in full: ${excludedApis.join(', ')}).\n` +
      `Applied ${overridesApplied} schema overrides; trimmed ${basePathsTrimmed} overlapping base paths.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 4: Regenerate**

Run: `npm run codegen`
Expected output, exactly:

```
Generated 63 raw APIs (235 namespaces, 966 methods) and 75 type modules into src/generated/.
Excluded 95 operations served by non-VTEX or variable hosts (12 APIs in full: Ads API, Antifraud Provider API, B2B Password Migration Protocol, External Promotions Protocol API, Giftcard Provider Protocol, Marketplace Protocol - External Seller Fulfillment, Marketplace Protocol - External Seller Marketplace, Payment Provider Protocol, Pick and Pack API, Pick and Pack Last Mile Protocol API, Punchout API, Tracking).
Applied 5 schema overrides; trimmed 7 overlapping base paths.
```

- [ ] **Step 5: Verify that no generated method was renamed**

Excluded operations may disappear; existing names must not change.

```bash
old=$(mktemp); new=$(mktemp)
git grep -h -E '^  [A-Za-z0-9_$]+\(params' HEAD -- src/generated | sed -E 's/^  ([A-Za-z0-9_$]+)\(.*/\1/' | sort -u > "$old"
grep -rhE '^  [A-Za-z0-9_$]+\(params' src/generated | sed -E 's/^  ([A-Za-z0-9_$]+)\(.*/\1/' | sort -u > "$new"
comm -13 "$old" "$new"
echo "renamed-or-new: $(comm -13 "$old" "$new" | wc -l)"
```

Expected: `renamed-or-new: 0`

- [ ] **Step 6: Run the tests**

```bash
npx vitest run test/generated-hosts.test.ts
npm run typecheck
npm test
```

Expected: PASS; typecheck clean (the regenerated code compiles); all tests pass.

- [ ] **Step 7: Commit**

```bash
git add scripts/codegen.ts src/generated test/generated-hosts.test.ts
git commit -F - <<'EOF'
feat(codegen)!: honor OpenAPI servers, exclude non-VTEX hosts, regenerate raw layer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 15: Stop committing upstream schemas (spec §6, C6)

**Files:**
- Modify: `.gitignore`
- Untrack: `schemas/`. The files stay on disk as the local generator input.

- [ ] **Step 1: Replace `.gitignore` with**

```
node_modules
dist
*.log
.DS_Store
schemas/
coverage/
.env
.env.*
*.tgz
.npmrc
```

- [ ] **Step 2: Untrack the schemas**

```bash
git rm -r -q --cached schemas
ls schemas | wc -l
git status --short | grep -c '^D  schemas/'
```

Expected: `75` files still on disk; `75` staged deletions.

- [ ] **Step 3: Prove the generated tree is unchanged**

```bash
npm run codegen
git status --short -- src/generated
```

Expected: the same three summary lines as in Task 14, and no output from `git status`.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -F - <<'EOF'
chore: stop committing upstream OpenAPI schemas; extend .gitignore

Schemas are downloaded on demand by `npm run fetch-schemas` (pinned commit,
verified by git blob SHA). The generated code stays committed.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 16: Facades (spec §5, C5)

**Files:**
- Modify: `src/facades/orders.ts`, `src/facades/master-data.ts`, `src/facades/checkout.ts`, `src/facades/pricing.ts`, `src/facades/catalog.ts`, `src/facades/logistics.ts`
- Delete: `src/facades/pagination.ts`, `test/facades/pagination.test.ts` (only `orders` used it; it now pages itself)
- Test: `test/facades/orders.test.ts`, `test/facades/master-data.test.ts`, `test/facades/checkout.test.ts`

- [ ] **Step 1: Write the failing tests.** Replace `test/facades/orders.test.ts` with

```ts
import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { OrdersFacade, ORDERS_MAX_PAGES } from '../../src/facades/orders.js'
import { VtexPaginationLimitError, VtexUsageError } from '../../src/core/errors.js'

function page(list: unknown[], currentPage: number, pages: number) {
  return new Response(JSON.stringify({ list, paging: { currentPage, pages, total: 3, perPage: 2 } }), {
    status: 200, headers: { 'content-type': 'application/json' },
  })
}

describe('OrdersFacade', () => {
  it('get() fetches a single order by id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ orderId: '123-01' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const facade = new OrdersFacade(http)
    const order = await facade.get('123-01')
    expect((order as any).orderId).toBe('123-01')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/oms/pvt/orders/123-01')
  })

  it('get() encodes the id and rejects dot segments', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { headers: { 'content-type': 'application/json' } }))
    const facade = new OrdersFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    await facade.get('../../dataentities/CL/search')
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://x.vtexcommercestable.com.br/api/oms/pvt/orders/..%2F..%2Fdataentities%2FCL%2Fsearch',
    )
    expect(() => facade.get('..')).toThrow(VtexUsageError)
  })

  it('list() auto-paginates across pages', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(page([{ orderId: 'a' }, { orderId: 'b' }], 1, 2))
      .mockResolvedValueOnce(page([{ orderId: 'c' }], 2, 2))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const facade = new OrdersFacade(http)
    const ids: string[] = []
    for await (const o of facade.list({ status: 'ready-for-handling' })) ids.push((o as any).orderId)
    expect(ids).toEqual(['a', 'b', 'c'])
    expect(fetchMock.mock.calls[0][0]).toContain('f_status=ready-for-handling')
    expect(fetchMock.mock.calls[0][0]).toContain('page=1')
    expect(fetchMock.mock.calls[1][0]).toContain('page=2')
  })

  it('list() pagination controls override passthrough filters', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(page([{ orderId: 'a' }], 1, 1))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const facade = new OrdersFacade(http)
    const ids: string[] = []
    for await (const o of facade.list({ page: 5 })) ids.push((o as any).orderId)
    expect(ids).toEqual(['a'])
    expect(fetchMock.mock.calls[0][0]).toContain('page=1')
  })

  it('list() validates perPage up front', () => {
    const facade = new OrdersFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: vi.fn() }))
    expect(() => facade.list({ perPage: 500 })).toThrow(VtexUsageError)
    expect(() => facade.list({ perPage: 0 })).toThrow(VtexUsageError)
  })

  it('list() throws after page 30 instead of requesting page 31', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      const current = Number(new URL(url).searchParams.get('page'))
      return Promise.resolve(page([{ orderId: `o${current}` }], current, 40))
    })
    const facade = new OrdersFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const ids: string[] = []
    const consume = async () => {
      for await (const o of facade.list()) ids.push((o as any).orderId)
    }
    await expect(consume()).rejects.toBeInstanceOf(VtexPaginationLimitError)
    expect(ids).toHaveLength(ORDERS_MAX_PAGES)
    expect(fetchMock).toHaveBeenCalledTimes(ORDERS_MAX_PAGES)
  })
})
```

Replace `test/facades/master-data.test.ts` with

```ts
import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { MasterDataFacade } from '../../src/facades/master-data.js'
import { VtexUnexpectedResponseError, VtexUsageError } from '../../src/core/errors.js'

function json(body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json', ...headers } })
}

describe('MasterDataFacade', () => {
  it('get() reads a single document', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ id: 'doc1' }))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const doc = await md.get('CL', 'doc1')
    expect((doc as any).id).toBe('doc1')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/dataentities/CL/documents/doc1')
  })

  it('get() accepts fields', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ id: 'doc1' }))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    await md.get('CL', 'doc1', { fields: ['id', 'email'] })
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://x.vtexcommercestable.com.br/api/dataentities/CL/documents/doc1?_fields=id%2Cemail',
    )
  })

  it('rejects an entity that would change the path', () => {
    const fetchMock = vi.fn()
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    expect(() => md.get('CL/../../oms/pvt/orders', 'x')).toThrow(VtexUsageError)
    expect(() => md.scroll('CL/search?_where=email=*#')).toThrow(VtexUsageError)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('scroll() follows the token until an empty page', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json([{ id: 1 }, { id: 2 }], { 'X-VTEX-MD-TOKEN': 'tok1' }))
      .mockResolvedValueOnce(json([], { 'X-VTEX-MD-TOKEN': 'tok1' }))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const ids: number[] = []
    for await (const d of md.scroll('CL', { fields: ['id'], size: 2 })) ids.push((d as any).id)
    expect(ids).toEqual([1, 2])
    const firstUrl = fetchMock.mock.calls[0][0] as string
    expect(firstUrl).toContain('/api/dataentities/CL/scroll')
    expect(firstUrl).toContain('_fields=id')
    expect(firstUrl).toContain('_size=2')
    expect(firstUrl).not.toContain('_token')
    const secondUrl = fetchMock.mock.calls[1][0] as string
    expect(secondUrl).toContain('_token=tok1')
  })

  it('scroll() stops immediately when the first page is empty', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json([]))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const ids: number[] = []
    for await (const d of md.scroll('CL')) ids.push((d as any).id)
    expect(ids).toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('scroll() validates the page size', () => {
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: vi.fn() }))
    expect(() => md.scroll('CL', { size: 1001 })).toThrow(VtexUsageError)
  })

  it('scroll() raises a typed error on a non-array body', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({ unexpected: true }))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const consume = async () => {
      for await (const _ of md.scroll('CL')) void _
    }
    await expect(consume()).rejects.toBeInstanceOf(VtexUnexpectedResponseError)
  })
})
```

Replace `test/facades/checkout.test.ts` with

```ts
import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { CheckoutFacade } from '../../src/facades/checkout.js'

describe('CheckoutFacade', () => {
  it('getCart() reads an order form by id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ orderFormId: 'of1' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await new CheckoutFacade(http).getCart('of1')
    expect((out as any).orderFormId).toBe('of1')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/checkout/pub/orderForm/of1')
  })

  it('simulate() creates a simulation order with body forwarding', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ items: [{ id: '1', quantity: 1, seller: '1' }], country: 'BRA' }), {
        status: 200, headers: { 'content-type': 'application/json' },
      }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const payload = { items: [{ id: '1', quantity: 1, seller: '1' }], country: 'BRA' }
    const out = await new CheckoutFacade(http).simulate(payload)
    expect((out as any).items[0].id).toBe('1')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/checkout/pub/orderForms/simulation')
    expect(fetchMock.mock.calls[0][1].method).toBe('POST')
    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(payload))
  })

  it('simulate() is retried on 503 because it is read-like', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response('{}', { status: 503, headers: { 'content-type': 'application/json' } }))
      .mockResolvedValueOnce(new Response('{"ok":true}', { status: 200, headers: { 'content-type': 'application/json' } }))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    await expect(new CheckoutFacade(http).simulate({ items: [] })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run test/facades`
Expected: FAIL:
- `ORDERS_MAX_PAGES` is not exported;
- `perPage` is not validated;
- there is no 30-page limit;
- the entity path can be changed;
- `fields` is ignored;
- scroll has no size validation;
- `simulate` is not retried.

- [ ] **Step 3: Replace the facades**

Replace `src/facades/orders.ts` with

```ts
import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'
import { VtexPaginationLimitError, VtexUsageError } from '../core/errors.js'

/** VTEX's List Orders endpoint serves at most 30 pages per query. */
export const ORDERS_MAX_PAGES = 30

export interface OrderListFilters {
  status?: string
  q?: string
  orderBy?: string
  perPage?: number
  [key: string]: unknown
}

interface OrdersPage {
  list?: unknown[]
  paging?: { currentPage: number; pages: number; total: number; perPage: number }
}

export class OrdersFacade {
  constructor(private readonly http: VtexHttpClient) {}

  get(orderId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: `/api/oms/pvt/orders/${encodePathParam(orderId)}` }, opts))
  }

  /**
   * Auto-paginated List Orders. VTEX serves at most 30 pages per query: when more
   * results match, this throws VtexPaginationLimitError after yielding page 30, so
   * callers narrow the filters (e.g. f_creationDate) instead of silently losing orders.
   */
  list(filters: OrderListFilters = {}, opts?: CallOptions): AsyncGenerator<unknown> {
    const { status, perPage, ...rest } = filters
    const size = perPage ?? 100
    if (!Number.isInteger(size) || size < 1 || size > 100) {
      throw new VtexUsageError(`perPage must be an integer between 1 and 100 (got ${String(perPage)})`)
    }
    return this.#pages(rest, status, size, opts)
  }

  async *#pages(
    rest: Record<string, unknown>, status: string | undefined, size: number, opts: CallOptions | undefined,
  ): AsyncGenerator<unknown> {
    for (let page = 1; ; page++) {
      const query: Record<string, unknown> = { ...rest, page, per_page: size }
      if (status !== undefined) query['f_status'] = status
      const res = await this.http.request<OrdersPage>(withCall({ method: 'GET', path: '/api/oms/pvt/orders', query }, opts))
      const items = res.list ?? []
      for (const item of items) yield item
      const paging = res.paging ?? { currentPage: page, pages: page }
      if (items.length === 0 || paging.currentPage >= paging.pages) return
      if (page >= ORDERS_MAX_PAGES) {
        throw new VtexPaginationLimitError(
          `VTEX List Orders serves at most ${ORDERS_MAX_PAGES} pages, but ${paging.pages} match these filters; ` +
            'narrow the query (e.g. f_creationDate) and iterate per window',
        )
      }
    }
  }
}
```

Replace `src/facades/master-data.ts` with

```ts
import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'
import { VtexUnexpectedResponseError, VtexUsageError } from '../core/errors.js'

export interface ScrollOptions {
  fields?: string[]
  /** Page size, 1–1000. */
  size?: number
  /** Master Data `_where` expression. */
  query?: string
  sort?: string
}

export interface MasterDataGetOptions extends CallOptions {
  fields?: string[]
}

const ENTITY_RE = /^[A-Za-z0-9_-]{1,64}$/
const MAX_SCROLL_SIZE = 1000

function entitySegment(dataEntity: string): string {
  if (!ENTITY_RE.test(dataEntity)) throw new VtexUsageError(`Invalid Master Data entity ${JSON.stringify(dataEntity)}`)
  return encodePathParam(dataEntity)
}

export class MasterDataFacade {
  constructor(private readonly http: VtexHttpClient) {}

  get(dataEntity: string, id: string, opts: MasterDataGetOptions = {}): Promise<unknown> {
    const { fields, ...call } = opts
    const query = fields?.length ? { _fields: fields.join(',') } : undefined
    const path = `/api/dataentities/${entitySegment(dataEntity)}/documents/${encodePathParam(id)}`
    return this.http.request(withCall({ method: 'GET', path, query }, call))
  }

  /**
   * Iterates a whole data entity with the scroll API. VTEX expires the scroll token
   * after 20 minutes without a request, so consume pages promptly.
   */
  scroll(dataEntity: string, opts: ScrollOptions = {}, call?: CallOptions): AsyncGenerator<unknown> {
    const entity = entitySegment(dataEntity)
    if (opts.size !== undefined && (!Number.isInteger(opts.size) || opts.size < 1 || opts.size > MAX_SCROLL_SIZE)) {
      throw new VtexUsageError(`size must be an integer between 1 and ${MAX_SCROLL_SIZE} (got ${String(opts.size)})`)
    }
    return this.#scroll(entity, opts, call)
  }

  async *#scroll(entity: string, opts: ScrollOptions, call: CallOptions | undefined): AsyncGenerator<unknown> {
    let token: string | undefined
    for (;;) {
      const query: Record<string, unknown> = {}
      if (opts.fields) query['_fields'] = opts.fields.join(',')
      if (opts.size) query['_size'] = opts.size
      if (opts.query) query['_where'] = opts.query
      if (opts.sort) query['_sort'] = opts.sort
      if (token) query['_token'] = token
      const { data, headers } = await this.http.requestRaw<unknown>(
        withCall({ method: 'GET', path: `/api/dataentities/${entity}/scroll`, query }, call),
      )
      const rows = data ?? []
      if (!Array.isArray(rows)) throw new VtexUnexpectedResponseError('Master Data scroll returned a non-array body', data)
      for (const row of rows) yield row
      if (rows.length === 0) return
      token = headers.get('X-VTEX-MD-TOKEN') ?? token
    }
  }
}
```

Replace `src/facades/checkout.ts` with

```ts
import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class CheckoutFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getCart(orderFormId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'GET', path: `/api/checkout/pub/orderForm/${encodePathParam(orderFormId)}` }, opts),
    )
  }

  /** A read-like POST, so it is retried like a GET unless the caller overrides `idempotent`. */
  simulate(body: unknown, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'POST', path: '/api/checkout/pub/orderForms/simulation', body, idempotent: true }, opts),
    )
  }
}
```

Replace `src/facades/pricing.ts` with

```ts
import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class PricingFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getPrice(skuId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: `/api/pricing/prices/${encodePathParam(skuId)}` }, opts))
  }

  setPrice(skuId: string, body: unknown, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'PUT', path: `/api/pricing/prices/${encodePathParam(skuId)}`, body }, opts))
  }
}
```

Replace `src/facades/catalog.ts` with

```ts
import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class CatalogFacade {
  constructor(private readonly http: VtexHttpClient) {}

  getProduct(productId: number | string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: `/api/catalog/pvt/product/${encodePathParam(productId)}` }, opts))
  }

  getSku(skuId: number | string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'GET', path: `/api/catalog/pvt/stockkeepingunit/${encodePathParam(skuId)}` }, opts),
    )
  }
}
```

Replace `src/facades/logistics.ts` with

```ts
import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'

export class LogisticsFacade {
  constructor(private readonly http: VtexHttpClient) {}

  listWarehouses(opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: '/api/logistics/pvt/configuration/warehouses' }, opts))
  }

  getInventoryBySku(skuId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(
      withCall({ method: 'GET', path: `/api/logistics/pvt/inventory/skus/${encodePathParam(skuId)}` }, opts),
    )
  }
}
```

- [ ] **Step 4: Delete the unused pagination helper**

```bash
git rm -q src/facades/pagination.ts test/facades/pagination.test.ts
grep -rn "pagination" src test || echo "no references"
```

Expected: `no references`

- [ ] **Step 5: Run the tests**

```bash
npx vitest run test/facades
npm run typecheck
npm test
```

Expected: PASS; typecheck clean; all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/facades test/facades
git commit -F - <<'EOF'
feat(facades): per-call options, encoded ids, 30-page limit, Master Data validation

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 17: Public API surface and version (spec §4.7, §9)

**Files:**
- Modify: `src/index.ts`, `package.json` (version)
- Create: `test/compat.test.ts`
- Test: `test/exports.test.ts`, `test/smoke.test.ts`

- [ ] **Step 1: Write the failing tests.** Replace `test/exports.test.ts` with

```ts
import { describe, it, expect, expectTypeOf } from 'vitest'
import * as sdk from '../src/index.js'
import type { OrdersApiTypes, CallOptions } from '../src/index.js'

describe('public exports', () => {
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
```

Replace `test/smoke.test.ts` with

```ts
import { describe, it, expect } from 'vitest'
import { VERSION } from '../src/index.js'

describe('package', () => {
  it('exposes a version', () => {
    expect(VERSION).toBe('0.2.0')
  })
})
```

Create `test/compat.test.ts` with

```ts
import { describe, it, expect, vi } from 'vitest'
import { VtexClient, VtexNotFoundError, VtexAuthError } from '../src/index.js'

// Mirrors how a 0.1.x consumer uses the SDK: constructor options, orders.get and two error classes.
const config = {
  account: 'lojax',
  environment: 'vtexcommercestable' as const,
  appKey: 'K',
  appToken: 'T',
  maxRetries: 4,
  timeoutMs: 30_000,
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

describe('0.1.x consumer compatibility', () => {
  it('orders.get returns the parsed order', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ orderId: '1234567890123-01' }))
    const client = new VtexClient({ ...config, fetch: fetchMock })
    const order = (await client.orders.get('1234567890123-01')) as { orderId: string }
    expect(order.orderId).toBe('1234567890123-01')
    expect(fetchMock.mock.calls[0][0]).toBe('https://lojax.vtexcommercestable.com.br/api/oms/pvt/orders/1234567890123-01')
  })

  it('a missing order is a VtexNotFoundError and is not retried', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(json({}, 404)))
    const client = new VtexClient({ ...config, fetch: fetchMock })
    await expect(client.orders.get('1')).rejects.toBeInstanceOf(VtexNotFoundError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('a bad key is a VtexAuthError', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(json({}, 401)))
    const client = new VtexClient({ ...config, fetch: fetchMock })
    await expect(client.orders.get('1')).rejects.toBeInstanceOf(VtexAuthError)
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run test/exports.test.ts test/smoke.test.ts test/compat.test.ts && npm run typecheck`
Expected: FAIL:
- `VERSION` is still `0.1.0`;
- `VtexError` and the other new classes are not exported from the root;
- typecheck errors on `OrdersApiTypes` / `CallOptions`.

- [ ] **Step 3: Replace `src/index.ts` with**

```ts
export { VtexClient } from './client.js'
export { createVtexFactory } from './factory.js'
export type { VtexFactoryConfig, VtexCreds } from './factory.js'
export type {
  VtexClientConfig, VtexEnvironment, VtexHooks, RequestOptions, CallOptions,
} from './core/types.js'
export {
  VtexError, VtexRequestError, VtexAuthError, VtexNotFoundError,
  VtexValidationError, VtexRateLimitError, VtexServerError,
  VtexNetworkError, VtexTimeoutError, VtexUsageError,
  VtexPaginationLimitError, VtexUnexpectedResponseError,
} from './core/errors.js'
export { VtexHttpClient } from './core/http.js'
export { DEFAULT_SERVER, VTEX_DOMAIN_ALLOWLIST } from './core/url.js'
export type { OrderListFilters } from './facades/orders.js'
export type { ScrollOptions, MasterDataGetOptions } from './facades/master-data.js'
export type * from './generated/types-index.js'
export const VERSION = '0.2.0'
```

- [ ] **Step 4: Bump the package version**

```bash
npm pkg set version=0.2.0
npm install --package-lock-only
node -p "require('./package.json').version + ' ' + require('./package-lock.json').version"
```

Expected: `0.2.0 0.2.0`

- [ ] **Step 5: Run the tests and a consumer type check**

```bash
npm test
npm run typecheck
npm run build
cat > probe-consumer.ts <<'EOF'
import { VtexClient, type OrdersApiTypes, VtexTimeoutError } from './dist/index.js'
const c = new VtexClient({ account: 'acme', appKey: 'k', appToken: 't' })
const h: OrdersApiTypes.Headers = { 'x-secret': 'v' }
void c.raw.giftcardAPI.giftCard.createGiftCard(
  { body: { relationName: 'r', expiringDate: '2027-01-01T00:00:00.000', caption: 'c', profileId: 'p' } },
  { retry: false },
)
console.log(h, VtexTimeoutError.name)
EOF
npx tsc --noEmit --module nodenext --moduleResolution nodenext --skipLibCheck probe-consumer.ts && echo "consumer types ok"
rm probe-consumer.ts
```

Expected: all tests pass; typecheck clean; build succeeds; `consumer types ok`.

- [ ] **Step 6: Commit**

```bash
git add src/index.ts package.json package-lock.json test/exports.test.ts test/smoke.test.ts test/compat.test.ts
git commit -F - <<'EOF'
feat!: vtex-sdk 0.2.0 public surface (error classes, CallOptions, type namespaces)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 18: Documentation and licensing (spec §6, §10)

**Files:**
- Create: `LICENSE`, `NOTICE`, `CHANGELOG.md`
- Modify: `README.md`, `docs/vtex-notes.md`, `docs/superpowers/specs/2026-07-17-vtex-sdk-design.md`, `docs/superpowers/plans/2026-07-17-vtex-sdk.md`, `package.json`

- [ ] **Step 1: Create `LICENSE`**

```
MIT License

Copyright (c) 2026 Heron Jr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 2: Create `NOTICE`**

```
vtex-sdk
Copyright (c) 2026 Heron Jr. Licensed under the MIT License (see LICENSE).

This is an unofficial project. It is not affiliated with, endorsed by or
sponsored by VTEX. "VTEX" is a trademark of its owner.

The generated code in src/generated/ (method signatures and TypeScript types)
is derived from the OpenAPI documents published by VTEX at
https://github.com/vtex/openapi-schemas (© VTEX). Those documents are not
redistributed in this repository: `npm run fetch-schemas` downloads them from
the upstream repository at a pinned commit.
```

- [ ] **Step 3: Create `CHANGELOG.md`**

```markdown
# Changelog

## 0.2.0 (2026-10-12)

Security hardening and correctness release. Design: `docs/superpowers/specs/2026-10-12-vtex-sdk-hardening-design.md`.

### Breaking
- POST and PATCH are no longer retried after 5xx responses, timeouts or dropped connections, because the write may already have been applied. Pass `{ idempotent: true }` for writes you know are safe to repeat.
- An invalid `account` or `environment` throws `VtexUsageError` when the client is constructed.
- Generated operations call the host and base path their OpenAPI document declares (for example Gift Card under `/api`, Pricing on `api.vtex.com/{account}`, several APIs on `{account}.myvtex.com`).
- APIs and operations served only by third-party or variable hosts were removed from `raw.*`: provider protocols, Ads, Pick and Pack, Punchout, Tracking, and two operations with placeholder or vault hosts. Their types are still exported.
- Network failures throw `VtexNetworkError`, and timeouts throw `VtexTimeoutError`, instead of a raw `TypeError` / `AbortError`. A caller abort still rejects with the signal's reason.
- `VtexRequestError.body` is non-enumerable: still readable and writable, but left out of `JSON.stringify(err)` and default logging.
- `retryAfter` on errors is now whole seconds, rounded up (`'1.5'` gives `2`). It is also derived from HTTP-dates. Values that are neither delta-seconds nor an HTTP-date are ignored.
- `orders.list()` throws `VtexPaginationLimitError` instead of requesting page 31 and beyond.
- A `Retry-After` longer than `maxRetryAfterMs` (default 30 s) throws immediately instead of sleeping.
- Node.js 20 or newer is required.

### Security
- Credentials are sent only to hosts under the allowlisted VTEX domains, after the account and environment are validated. The allowlist is frozen at runtime.
- Path parameters are percent-encoded. Empty, `.` and `..` values are rejected, and a URL that would change origin or contain dot segments is refused before sending.
- Redirects are handled manually: same origin only, at most 3 hops.
- `console.log(client)` and `JSON.stringify(client)` no longer reveal credentials.
- The factory takes only credentials from its resolver, normalizes accounts, bounds its cache and evicts a client after 401/403.
- Codegen refuses unsafe schema paths. Schema downloads are verified by host and git blob SHA.

### Added
- Per-call options on every generated and facade method: `headers`, `signal`, `timeoutMs`, `retry`, `idempotent`.
- `client.request()` and `client.requestRaw()`, the latter returning `{ data, headers, status }`.
- Typed header parameters on generated methods (for example `REST-Range`). `params` is optional when nothing is required.
- Request bodies for vendor JSON, multipart, form-urlencoded and text content types; this fixes `createGiftCard`.
- Exported type namespaces per API (for example `OrdersApiTypes`), the `VtexError` base class and the new error classes, `DEFAULT_SERVER` and `VTEX_DOMAIN_ALLOWLIST`.
- `maxRetryAfterMs` client option and `maxCachedClients` factory option.
- `npm run live-check`: an optional read-only check against a real account.
- CI: typecheck, tests and build on Node 20/22/24, plus a codegen reproducibility check.

### Fixed
- Generated types: `nullable`, OpenAPI 3.1 type arrays, arrays of unions, `additionalProperties`, placeholder keys, and targeted overrides for order-hook headers, the hook-config response, coupon usage and two operations with a foreign host.
- CommonJS consumers resolve `index.d.cts` under `node16`/`nodenext`.
- `masterData.scroll()` raises a typed error on an unexpected body and validates `size`. `masterData.get()` accepts `fields`.

### Removed
- `schemas/` is no longer committed; `npm run fetch-schemas` downloads it on demand.
- The internal `paginate` helper.
```

- [ ] **Step 4: Replace `README.md` with**

````markdown
# vtex-sdk

Unofficial TypeScript SDK for the [VTEX APIs](https://developers.vtex.com/docs/api-reference), for Node.js 20 or newer.
It is generated from VTEX's public OpenAPI documents and adds hand-written facades over the most used APIs.
This project is not affiliated with, endorsed by or sponsored by VTEX.

- **`raw.*`**: 966 operations across 63 VTEX APIs.
  - Each call goes to the host and base path its API reference declares: for example Gift Card under `/api`, Pricing on `api.vtex.com/{account}`, and several APIs on `{account}.myvtex.com`.
  - Protocols that *you* implement are not callable here: payment, antifraud and gift card providers, external promotions, and the seller protocols. Their types are exported.
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

npm builds `dist/` during install through the package's `prepare` script.

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
- A longer wait throws `VtexRateLimitError` right away, with `retryAfter` set in seconds, so a job runner can reschedule.

## Errors

| Class | When |
|---|---|
| `VtexError` | Base class of everything the SDK throws |
| `VtexRequestError` | Non-2xx response; exposes `status`, `body` (readable, not enumerable), `requestId`, `retryAfter` |
| `VtexAuthError` | 401 / 403 |
| `VtexNotFoundError` | 404 |
| `VtexValidationError` | 400 / 422 |
| `VtexRateLimitError` | 429 after retries, or `Retry-After` above the cap |
| `VtexServerError` | 5xx after retries |
| `VtexNetworkError` | No complete response (DNS, connection, socket, body read); exposes `cause`, `method`, `route`, `attempts` |
| `VtexTimeoutError` | Per-attempt timeout; a subclass of `VtexNetworkError` |
| `VtexUsageError` | Invalid account, environment, server, path or argument; nothing was sent |
| `VtexPaginationLimitError` | `orders.list()` reached VTEX's 30-page limit; narrow the filters |
| `VtexUnexpectedResponseError` | 2xx with a body the SDK cannot interpret |

A caller's `AbortSignal` rejects with the signal's reason, which is an `AbortError` by default.

## Security model

**What is validated before anything is sent**
- `account` must be a single DNS label.
- `environment` is `vtexcommercestable` (the default) or `vtexcommercebeta`.

**Where credentials go:** only to hosts under `vtexcommercestable.com.br`, `vtexcommercebeta.com.br`, `myvtex.com`, `vtex.com` or `vtexpayments.com.br`. The list is exported (frozen) as `VTEX_DOMAIN_ALLOWLIST`.

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

## Facades

| Facade | Methods (each also accepts `CallOptions` last) |
|---|---|
| `vtex.orders` | `get(orderId)`, `list(filters?)` (AsyncGenerator, max 30 pages per query) |
| `vtex.catalog` | `getProduct(productId)`, `getSku(skuId)` |
| `vtex.masterData` | `get(dataEntity, id, { fields? })`, `scroll(dataEntity, { fields?, size?, query?, sort? })` |
| `vtex.pricing` | `getPrice(skuId)`, `setPrice(skuId, body)` |
| `vtex.logistics` | `listWarehouses()`, `getInventoryBySku(skuId)` |
| `vtex.checkout` | `getCart(orderFormId)`, `simulate(body)` (retried like a GET) |

The Master Data scroll token expires after 20 minutes without a request, so consume pages promptly.

## Low-level requests

```ts
const { data, headers, status } = await vtex.requestRaw({
  method: 'GET',
  path: '/api/dataentities/CL/search',
  query: { _where: 'email=someone@example.com', _fields: 'id,email' },
  headers: { 'REST-Range': 'resources=0-0' },
})
```

`request()` / `requestRaw()` go through the same checks as generated methods. Pass `server` to target another allowlisted host template, for example `'https://{accountName}.{environment}.com.br/api'`.

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
npm run fetch-schemas   # download the pinned OpenAPI documents (verified)
npm run codegen         # regenerate src/generated from them
VTEX_ACCOUNT=... VTEX_APP_KEY=... VTEX_APP_TOKEN=... npm run live-check   # optional, read-only
```

Notes for contributors:
- The development toolchain (vitest/vite) needs Node 20.19+ or 22.12+. Consumers only need Node 20.
- `package.json` overrides tsup's esbuild to `^0.28.2`, because esbuild 0.27.x is affected by GHSA-g7r4-m6w7-qqqr. Remove the override once tsup depends on esbuild 0.28.1 or newer, or after moving to tsdown.
- Update dependencies with npm 11, so the lockfile keeps its platform (`libc`) annotations.

See [`docs/vtex-notes.md`](./docs/vtex-notes.md) for VTEX hosts, authentication, rate limiting and how the generated layer is produced.

## License

MIT, see [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
````

- [ ] **Step 5: Replace `docs/vtex-notes.md` with**

````markdown
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

Other APIs use a base path or a different VTEX host:

| API | Server |
|---|---|
| Gift Card | `https://{account}.{environment}.com.br/api` |
| Pricing | `https://api.vtex.com/{account}` |
| VTEX ID (most routes), Reviews and Ratings, Buying Policies | `https://{account}.myvtex.com` |
| Payments Gateway | `https://{account}.vtexpayments.com.br` |
| Marketplace sent offers and mapper | `https://portal.{environment}.com.br` |

Credentials are only sent to hosts under the allowlisted VTEX domains (`VTEX_DOMAIN_ALLOWLIST`).

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
  - is capped by `maxRetryAfterMs` (default 30 s) in both cases. A `Retry-After` above the cap throws `VtexRateLimitError` immediately.
- `maxRetries` defaults to 3 per client and can be overridden per call with `retry`.
- Backoff waits honor the caller's `AbortSignal`.

## Generated layer (`raw.*`)

`src/generated/` is produced by `scripts/codegen.ts` from the OpenAPI documents at
[github.com/vtex/openapi-schemas](https://github.com/vtex/openapi-schemas). They are pinned to commit
`1ca3d11c8dfc9dd17484eabad051d364e767c50d` in `scripts/fetch-schemas.ts`.

**How it is produced**
- The schemas are not committed. `npm run fetch-schemas` downloads them into `schemas/`, accepting only `raw.githubusercontent.com` and verifying each file's git blob SHA against the pinned listing.
- `npm run codegen` applies targeted fixes from `scripts/codegen/overrides.ts`, picks each operation's server (`scripts/codegen/servers.ts`) and regenerates everything. Consumers never run codegen.
- CI regenerates from the pinned schemas and fails if the result differs from the committed tree.
- `npm run typecheck` is a separate step; codegen itself does not run `tsc`.

**Coverage at the current pin**
- 75 OpenAPI documents with 1,061 operations.
- 966 operations in 63 APIs are callable through `raw.*`.
- 95 operations are excluded, 12 APIs of them in full, because their servers are third-party or variable hosts: provider protocols, Ads, Pick and Pack, Punchout and Tracking. Their types are still exported.
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
````

- [ ] **Step 6: Clean up the older design docs**

```bash
sed -i -E 's/^\*\*Author:\*\* [^ ]+@[^ ]+ \+ Claude$/**Author:** Heron Jr + Claude/' docs/superpowers/specs/2026-07-17-vtex-sdk-design.md
sed -i -E 's#@[a-z0-9-]+/vtex-sdk#vtex-sdk#g' docs/superpowers/plans/2026-07-17-vtex-sdk.md
grep -n "Author" docs/superpowers/specs/2026-07-17-vtex-sdk-design.md | head -1
grep -c -E "@[a-z0-9-]+/vtex-sdk" docs/superpowers/plans/2026-07-17-vtex-sdk.md
```

Expected: `5:**Author:** Heron Jr + Claude` and `0`.

- [ ] **Step 7: Package metadata**

```bash
npm pkg set description="Unofficial TypeScript SDK for the VTEX APIs (Node.js)."
npm pkg set license=MIT author="Heron Jr"
npm pkg set repository.type=git repository.url="git+https://github.com/heron-jr/vtex-sdk.git"
npm pkg set homepage="https://github.com/heron-jr/vtex-sdk#readme" bugs.url="https://github.com/heron-jr/vtex-sdk/issues"
npm pkg set "keywords[]=vtex" "keywords[]=sdk" "keywords[]=typescript" "keywords[]=openapi"
npm pkg set "files[]=LICENSE" "files[]=NOTICE"
npm install --package-lock-only
node -p "const p=require('./package.json'); [p.license, p.files.join(','), p.repository.url].join(' | ')"
```

Expected: `MIT | dist,LICENSE,NOTICE | git+https://github.com/heron-jr/vtex-sdk.git`

- [ ] **Step 8: Hygiene check**

```bash
git grep -n -i -E 'lai[v]on|not[t]a|not[t]inha|luck[y] ?club' ; echo "matches-exit: $?"
```

Expected: `matches-exit: 1` (no matches).

- [ ] **Step 9: Commit**

```bash
git add LICENSE NOTICE CHANGELOG.md README.md docs/vtex-notes.md docs/superpowers/specs/2026-07-17-vtex-sdk-design.md docs/superpowers/plans/2026-07-17-vtex-sdk.md package.json package-lock.json
git commit -F - <<'EOF'
docs: README, notes, changelog, MIT license and notice for 0.2.0

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 19: CI and optional live check (spec §6, §7)

**Files:**
- Create: `.github/workflows/ci.yml`, `scripts/live-check.ts`
- Modify: `package.json` (script)

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: ci

on:
  push:
  pull_request:

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node: [20, 22, 24]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
      - name: Package types resolve for ESM and CJS consumers
        if: matrix.node == 22
        run: npx --yes @arethetypeswrong/cli@0.18.5 --pack .

  codegen-reproducible:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run fetch-schemas
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - run: npm run codegen
      - name: Generated code matches the committed tree
        run: |
          git diff --exit-code -- src/generated
          test -z "$(git status --porcelain -- src/generated)"
```

- [ ] **Step 2: Create `scripts/live-check.ts`**

```ts
/**
 * Optional, read-only check against a real VTEX account. Never runs in CI.
 *
 *   VTEX_ACCOUNT=myaccount VTEX_APP_KEY=... VTEX_APP_TOKEN=... npm run live-check
 *
 * A 401/403 means the route exists but the key lacks the role; a 404 on a route
 * that should exist means the SDK is calling the wrong URL.
 */
import { VtexAuthError, VtexClient, VtexNotFoundError } from '../src/index.js'

const account = process.env.VTEX_ACCOUNT
const appKey = process.env.VTEX_APP_KEY
const appToken = process.env.VTEX_APP_TOKEN
if (!account || !appKey || !appToken) {
  console.error('Set VTEX_ACCOUNT, VTEX_APP_KEY and VTEX_APP_TOKEN to run the live check.')
  process.exit(2)
}

const vtex = new VtexClient({ account, appKey, appToken, maxRetries: 1 })
let failures = 0

async function check(name: string, run: () => Promise<string>): Promise<void> {
  try {
    console.log(`ok    ${name}: ${await run()}`)
  } catch (err) {
    if (err instanceof VtexAuthError) {
      console.log(`ok    ${name}: route exists (HTTP ${err.status}, key lacks the role)`)
      return
    }
    failures++
    console.log(`FAIL  ${name}: ${(err as Error).name}: ${(err as Error).message}`)
  }
}

await check('list orders (1 item)', async () => {
  const res = await vtex.requestRaw<{ list?: unknown[] }>({ method: 'GET', path: '/api/oms/pvt/orders', query: { per_page: 1 } })
  return `HTTP ${res.status}, ${res.data.list?.length ?? 0} item(s)`
})

await check('get a random coupon (expects 404)', async () => {
  const couponCode = `live-check-${Date.now().toString(36)}`
  try {
    await vtex.raw.promotionsTaxesAPI.coupons.getbycouponcode({ couponCode })
    return 'unexpectedly found'
  } catch (err) {
    if (err instanceof VtexNotFoundError) return '404 as expected'
    throw err
  }
})

await check('gift card search on /api', async () => {
  const res = await vtex.raw.giftcardAPI.giftCard.searchGiftCardsfromcartdata(
    { 'REST-Range': 'resources=0-0', body: { client: { id: 'live-check', email: '', document: '' }, cart: {} } as never },
    { idempotent: true },
  )
  return `answered (${Array.isArray(res) ? res.length : typeof res})`
})

process.exit(failures === 0 ? 0 : 1)
```

- [ ] **Step 3: Add the script and verify**

```bash
npm pkg set scripts.live-check="tsx scripts/live-check.ts"
npm run typecheck
npm run live-check; echo "exit: $?"
```

Expected:
- typecheck clean;
- `Set VTEX_ACCOUNT, VTEX_APP_KEY and VTEX_APP_TOKEN to run the live check.`;
- `exit: 2` (npm may also print its own error lines for the non-zero exit).

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml scripts/live-check.ts package.json
git commit -F - <<'EOF'
ci: typecheck/test/build on Node 20, 22 and 24; codegen reproducibility; optional live check

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Task 20: Final verification and push (spec §7 definition of done, §8)

- [ ] **Step 1: Clean install and full checks**

```bash
rm -rf node_modules dist
npm ci
npm run typecheck
npm test
npm run build
npm audit
npm pack --dry-run
```

Expected:
- typecheck clean;
- `Test Files  25 passed (25)` and `Tests  399 passed (399)`;
- three `Build success` lines;
- `found 0 vulnerabilities`;
- the `npm pack` file list includes `LICENSE`, `NOTICE`, `README.md`, `package.json` and the `dist/index.*` files, but no `schemas/`, `src/`, `scripts/`, `test/` or `docs/`.

Keep this output for the hand-off.

- [ ] **Step 2: Repository hygiene**

```bash
git status --short
git ls-files schemas | wc -l
git log --format='%an <%ae>' origin/main..HEAD | sort -u
git grep -n -i -E 'lai[v]on|not[t]a|not[t]inha|luck[y] ?club' ; echo "matches-exit: $?"
```

Expected:
- clean tree;
- `0` tracked schema files;
- a single author line, the identity from Task 0;
- `matches-exit: 1`.

- [ ] **Step 3: Push the branch**

The owner asked for the fix to be pushed to the existing repository.

```bash
git push -u origin fix/hardening-0.2.0
```

- [ ] **Step 4: Stop and hand off**

Report to the owner:
- the branch name and commit list (`git log --oneline origin/main..HEAD`);
- the Step 1 output;
- the link to the CI run in the GitHub Actions tab.

Do not merge or tag without explicit approval.

- [ ] **Step 5: After the owner approves, merge and tag**

```bash
git checkout main
git pull --ff-only
git merge --ff-only fix/hardening-0.2.0
git tag -a v0.2.0 -m "vtex-sdk 0.2.0"
git push origin main v0.2.0
```

Making the repository public is a separate manual step for the owner, in GitHub settings. The commit history stays as it is (spec §10).
