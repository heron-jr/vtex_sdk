import type { RequestOptions, VtexClientConfig, VtexEnvironment } from './core/types.js'
import { VtexHttpClient } from './core/http.js'
import { RawNamespaces } from './generated/index.js'
import { OrdersFacade } from './facades/orders.js'
import { CatalogFacade } from './facades/catalog.js'
import { MasterDataFacade } from './facades/master-data.js'
import { PricingFacade } from './facades/pricing.js'
import { LogisticsFacade } from './facades/logistics.js'
import { CheckoutFacade } from './facades/checkout.js'

/** Same symbol as util.inspect.custom, without importing node:util. */
const INSPECT: unique symbol = Symbol.for('nodejs.util.inspect.custom')

/** Result of `requestRaw()`: the parsed body plus the response status and headers. */
export interface VtexRawResponse<T> {
  data: T
  headers: Headers
  status: number
}

export class VtexClient {
  readonly raw: RawNamespaces
  readonly orders: OrdersFacade
  readonly catalog: CatalogFacade
  readonly masterData: MasterDataFacade
  readonly pricing: PricingFacade
  readonly logistics: LogisticsFacade
  readonly checkout: CheckoutFacade
  // Private so the transport (and the credentials it holds) can't be swapped or reached from outside.
  readonly #http: VtexHttpClient

  constructor(config: VtexClientConfig) {
    this.#http = new VtexHttpClient(config)
    this.raw = new RawNamespaces(this.#http)
    this.orders = new OrdersFacade(this.#http)
    this.catalog = new CatalogFacade(this.#http)
    this.masterData = new MasterDataFacade(this.#http)
    this.pricing = new PricingFacade(this.#http)
    this.logistics = new LogisticsFacade(this.#http)
    this.checkout = new CheckoutFacade(this.#http)
  }

  /** Normalized (lowercase) account name; it always matches the host requests go to. */
  get account(): string {
    return this.#http.account
  }

  get environment(): VtexEnvironment {
    return this.#http.environment
  }

  /**
   * Low-level request with the same safety checks as generated methods (host allowlist,
   * path encoding, header validation, retries, same-origin redirects).
   *
   * Resolves with the parsed JSON body, the text body for other content types, or
   * `undefined` for 204/205 and empty bodies. `T` is not validated at runtime.
   * Rejects with `VtexUsageError` for invalid options and with a `VtexError` subclass
   * for HTTP, timeout and network failures. A caller abort (`signal`) rejects with the
   * signal's reason (an `AbortError` by default), not a `VtexError`.
   */
  request<T = unknown>(opts: RequestOptions): Promise<T> {
    return this.#http.request<T>(opts)
  }

  /** Like request(), but also returns the response status and headers (e.g. `REST-Content-Range`). */
  requestRaw<T = unknown>(opts: RequestOptions): Promise<VtexRawResponse<T>> {
    return this.#http.requestRaw<T>(opts)
  }

  /** Redaction boundary: must never include credential-bearing fields. */
  toJSON(): { account: string; environment: VtexEnvironment } {
    return { account: this.#http.account, environment: this.#http.environment }
  }

  [INSPECT](): string {
    return `VtexClient ${JSON.stringify(this.toJSON())}`
  }
}
