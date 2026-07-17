import type { VtexEnvironment, VtexHooks } from './core/types.js'
import { VtexClient } from './client.js'

export type VtexCreds = { appKey: string; appToken: string } | { authCookie: string }

export interface VtexFactoryConfig {
  credentials: (account: string) => VtexCreds | Promise<VtexCreds>
  environment?: VtexEnvironment
  maxRetries?: number
  timeoutMs?: number
  fetch?: typeof fetch
  hooks?: VtexHooks
}

export function createVtexFactory(config: VtexFactoryConfig) {
  const cache = new Map<string, Promise<VtexClient>>()

  async function build(account: string): Promise<VtexClient> {
    const creds = await config.credentials(account)
    return new VtexClient({
      account,
      environment: config.environment,
      maxRetries: config.maxRetries,
      timeoutMs: config.timeoutMs,
      fetch: config.fetch,
      hooks: config.hooks,
      ...creds,
    })
  }

  return {
    forAccount(account: string): Promise<VtexClient> {
      let entry = cache.get(account)
      if (!entry) {
        entry = build(account)
        cache.set(account, entry)
      }
      return entry
    },
    clear(account?: string): void {
      if (account) cache.delete(account)
      else cache.clear()
    },
  }
}
