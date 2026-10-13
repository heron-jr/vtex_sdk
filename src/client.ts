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

  [INSPECT](): string {
    return `VtexClient ${JSON.stringify(this.toJSON())}`
  }
}
