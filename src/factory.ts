import type { VtexClientConfig, VtexEnvironment, VtexHooks } from './core/types.js'
import { VtexUsageError } from './core/errors.js'
import { normalizeAccount, validateEnvironment } from './core/url.js'
import { VtexClient } from './client.js'

export type VtexCreds = { appKey: string; appToken: string } | { authCookie: string }

export interface VtexFactoryConfig {
  /**
   * Returns the credentials for an account. Called once per cached account, and again after
   * a 401/403 evicts it. It must always settle: a promise that never resolves blocks that
   * account until `clear()`, so put a timeout on slow secret stores.
   */
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

export interface VtexFactory {
  /** Cached client for the account (normalized to lowercase). Rejects with VtexUsageError for an invalid name. */
  forAccount(account: string): Promise<VtexClient>
  /** Drops every cached client. */
  clear(): void
  /** Drops one account's client. `clear(undefined)` (e.g. a missing request param) does nothing. */
  clear(account: string): void
}

type Credentials = Pick<VtexClientConfig, 'appKey' | 'appToken' | 'authCookie'>

/** Only credential fields are taken from the resolver, so it cannot redirect the client elsewhere. */
function pickCredentials(creds: VtexCreds): Credentials {
  if (typeof creds !== 'object' || creds === null) {
    throw new VtexUsageError('The credentials resolver must return an object')
  }
  // Values are copied as-is; the client validates them without echoing them.
  const source = creds as Credentials
  const picked: Credentials = {}
  if (source.appKey !== undefined) picked.appKey = source.appKey
  if (source.appToken !== undefined) picked.appToken = source.appToken
  if (source.authCookie !== undefined) picked.authCookie = source.authCookie
  return picked
}

export function createVtexFactory(config: VtexFactoryConfig): VtexFactory {
  if (typeof config.credentials !== 'function') {
    throw new VtexUsageError('credentials must be a function returning the credentials for an account')
  }
  const maxEntries = config.maxCachedClients === undefined ? 100 : config.maxCachedClients
  if (typeof maxEntries !== 'number' || !Number.isInteger(maxEntries) || maxEntries < 1) {
    const got = typeof maxEntries === 'number' ? String(maxEntries) : typeof maxEntries
    throw new VtexUsageError(`maxCachedClients must be an integer >= 1 (got ${got})`)
  }
  // Snapshot the options so later changes to `config` don't affect clients built afterwards.
  const resolve = config.credentials
  const userHooks = config.hooks ?? {}
  const options = {
    environment: validateEnvironment(config.environment ?? 'vtexcommercestable'),
    maxRetries: config.maxRetries,
    timeoutMs: config.timeoutMs,
    maxRetryAfterMs: config.maxRetryAfterMs,
    fetch: config.fetch,
  }
  const cache = new Map<string, Promise<VtexClient>>()

  function evict(account: string, entry: Promise<VtexClient>): void {
    if (cache.get(account) === entry) cache.delete(account)
  }

  async function build(account: string, onAuthFailure: () => void): Promise<VtexClient> {
    const creds = await resolve(account)
    return new VtexClient({
      ...pickCredentials(creds),
      ...options,
      account,
      hooks: {
        // Call through the user's object (not a spread copy) so prototype methods and `this` survive.
        onRequest: (info) => userHooks.onRequest?.(info),
        onRetry: (info) => userHooks.onRetry?.(info),
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
      // Referring to `entry` in its own initializer is safe: build() awaits the resolver
      // before any request (and so any eviction callback) can run.
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
    clear(...args: [account?: string]): void {
      // Only a call with no argument clears everything; clear(undefined) (e.g. a missing
      // request param) is a no-op rather than a full flush.
      if (args.length === 0) {
        cache.clear()
        return
      }
      try {
        cache.delete(normalizeAccount(args[0] as string))
      } catch {
        // An invalid account name can never be in the cache.
      }
    },
  }
}
