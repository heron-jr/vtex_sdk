import type { VtexClientConfig } from './core/types.js'
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
    this.account = config.account
    this.http = new VtexHttpClient(config)
    this.raw = new RawNamespaces(this.http)
    this.orders = new OrdersFacade(this.http)
    this.catalog = new CatalogFacade(this.http)
    this.masterData = new MasterDataFacade(this.http)
    this.pricing = new PricingFacade(this.http)
    this.logistics = new LogisticsFacade(this.http)
    this.checkout = new CheckoutFacade(this.http)
  }
}
