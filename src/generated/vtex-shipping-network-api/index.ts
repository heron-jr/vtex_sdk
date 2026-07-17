import type { VtexHttpClient } from '../../core/http.js'
import type { Account, Address, Country, Subregion1, Subregion2, Subregion3, Location, NotifyCarrierwithAppRequest, DispatchOrder, Sender, Carrier, TrackingEventsRequest } from './types.js'

class VtexShippingNetworkApi_notification {
  constructor(private http: VtexHttpClient) {}

  notifyCarrierwithApp(params: {
  app_name: string
  app_version: string
  account: string
  workspace: string
  body: NotifyCarrierwithAppRequest
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/${params.app_name}/v${params.app_version}/${params.account}/${params.workspace}/notify`, body: params.body })
  }
}
class VtexShippingNetworkApi_tracking {
  constructor(private http: VtexHttpClient) {}

  trackingEvents(params: {
  app_name: string
  app_version: string
  account: string
  workspace: string
  body: TrackingEventsRequest[]
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/${params.app_name}/v${params.app_version}/${params.account}/${params.workspace}/tracking`, body: params.body })
  }
}

export class VtexShippingNetworkApi {
  readonly notification: VtexShippingNetworkApi_notification
  readonly tracking: VtexShippingNetworkApi_tracking
  constructor(http: VtexHttpClient) {
    this.notification = new VtexShippingNetworkApi_notification(http)
    this.tracking = new VtexShippingNetworkApi_tracking(http)
  }
}
