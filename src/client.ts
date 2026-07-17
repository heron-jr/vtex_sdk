import type { VtexClientConfig } from './core/types.js'
import { VtexHttpClient } from './core/http.js'
import { RawNamespaces } from './generated/index.js'

export class VtexClient {
  readonly account: string
  readonly raw: RawNamespaces
  /** @internal shared HTTP client for facades */
  protected readonly http: VtexHttpClient

  constructor(config: VtexClientConfig) {
    this.account = config.account
    this.http = new VtexHttpClient(config)
    this.raw = new RawNamespaces(this.http)
  }
}
