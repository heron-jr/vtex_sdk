import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { Getcoupons } from './types.js'

class PromotionsTaxesApiV2Api_coupons {
  constructor(private http: VtexHttpClient) {}

  async getgroupedcoupons(params: Record<string, never> = {}, opts?: CallOptions): Promise<Getcoupons> {
    return this.http.request<Getcoupons>(withCall({ method: 'GET', path: `/api/rnb/v2/pvt/coupon` }, opts))
  }

  async getgroupedarchivedcoupons(params: Record<string, never> = {}, opts?: CallOptions): Promise<Getcoupons> {
    return this.http.request<Getcoupons>(withCall({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/group/archived` }, opts))
  }

  async getcoupongroupinformation(params: {
  groupingKey: string
}, opts?: CallOptions): Promise<{
  configuration?: {
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}
  grouping?: {
  key?: string
  amount?: number
}
}> {
    return this.http.request<{
  configuration?: {
  lastModifiedUtc?: string
  utmSource?: string
  utmCampaign?: string
  isArchived?: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage?: number
  groupingKey?: string
}
  grouping?: {
  key?: string
  amount?: number
}
}>(withCall({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/group/${encodePathParam(params.groupingKey)}` }, opts))
  }

  async editcoupongroupconfiguration(params: {
  groupingKey: string
  body: {
  utmSource?: string
  utmCampaign?: string
  isArchived: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage: number
}
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'PUT', path: `/api/rnb/v2/pvt/coupon/group/${encodePathParam(params.groupingKey)}`, body: params.body }, opts))
  }

  async getcoupongroupcodes(params: {
  groupingKey: string
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/group/${encodePathParam(params.groupingKey)}/codes` }, opts))
  }

  async archivedcoupongroup(params: {
  groupingKey: string
}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'PUT', path: `/api/rnb/v2/pvt/coupon/group/${encodePathParam(params.groupingKey)}/archive` }, opts))
  }

  async creategroupsofcoupons(params: {
  body: {
  couponConfiguration: {
  utmSource?: string
  utmCampaign?: string
  couponCode: string
  expirationIntervalPerUse?: string
  maxItemsPerClient?: number
  maxUsage: number
}
  quantity: string
}[]
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'POST', path: `/api/rnb/v2/pvt/coupon/group`, body: params.body }, opts))
  }

  async unarchivedcoupongroup(params: {
  groupingKey: string
}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'PUT', path: `/api/rnb/v2/pvt/coupon/group/${encodePathParam(params.groupingKey)}/unarchive` }, opts))
  }

  async getnumberofusagesofasinglecoupon(params: {
  couponCode: string
}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/usage-count/${encodePathParam(params.couponCode)}` }, opts))
  }

  async getnumberofusagesofacouponbatch(params: {
  groupingKey: string
}, opts?: CallOptions): Promise<number> {
    return this.http.request<number>(withCall({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/usage-count/group/${encodePathParam(params.groupingKey)}` }, opts))
  }
}

export class PromotionsTaxesApiV2Api {
  readonly coupons: PromotionsTaxesApiV2Api_coupons
  constructor(http: VtexHttpClient) {
    this.coupons = new PromotionsTaxesApiV2Api_coupons(http)
  }
}
