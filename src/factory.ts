import type { VtexClientConfig, VtexEnvironment, VtexHooks } from './core/types.js'
import { VtexUsageError } from './core/errors.js'
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
  if (typeof creds !== 'object' || creds === null) {
    throw new VtexUsageError('The credentials resolver must return an object')
  }
  const source = creds as { appKey?: unknown; appToken?: unknown; authCookie?: unknown }
  const picked: Credentials = {}
  if (typeof source.appKey === 'string') picked.appKey = source.appKey
  if (typeof source.appToken === 'string') picked.appToken = source.appToken
  if (typeof source.authCookie === 'string') picked.authCookie = source.authCookie
  return picked
}

export function createVtexFactory(config: VtexFactoryConfig) {
  const maxEntries = config.maxCachedClients === undefined ? 100 : config.maxCachedClients
  if (typeof maxEntries !== 'number' || !Number.isInteger(maxEntries) || maxEntries < 1) {
    throw new VtexUsageError(`maxCachedClients must be an integer >= 1 (got ${String(maxEntries)})`)
  }
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
