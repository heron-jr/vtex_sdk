import type { VtexHttpClient } from '../../core/http.js'
import type { Getcoupons } from './types.js'

class PromotionsTaxesApiV2Api_coupons {
  constructor(private http: VtexHttpClient) {}

  getgroupedcoupons(params: Record<string, never>): Promise<Getcoupons> {
    return this.http.request<Getcoupons>({ method: 'GET', path: `/api/rnb/v2/pvt/coupon` })
  }

  getgroupedarchivedcoupons(params: Record<string, never>): Promise<Getcoupons> {
    return this.http.request<Getcoupons>({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/group/archived` })
  }

  getcoupongroupinformation(params: {
  groupingKey: string
}): Promise<{
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
}>({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/group/${params.groupingKey}` })
  }

  editcoupongroupconfiguration(params: {
  groupingKey: string
  body: {
  utmSource?: string
  utmCampaign?: string
  isArchived: boolean
  maxItemsPerClient?: number
  expirationIntervalPerUse?: string
  maxUsage: number
}
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'PUT', path: `/api/rnb/v2/pvt/coupon/group/${params.groupingKey}`, body: params.body })
  }

  getcoupongroupcodes(params: {
  groupingKey: string
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/group/${params.groupingKey}/codes` })
  }

  archivedcoupongroup(params: {
  groupingKey: string
}): Promise<number> {
    return this.http.request<number>({ method: 'PUT', path: `/api/rnb/v2/pvt/coupon/group/${params.groupingKey}/archive` })
  }

  creategroupsofcoupons(params: {
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
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'POST', path: `/api/rnb/v2/pvt/coupon/group`, body: params.body })
  }

  unarchivedcoupongroup(params: {
  groupingKey: string
}): Promise<number> {
    return this.http.request<number>({ method: 'PUT', path: `/api/rnb/v2/pvt/coupon/group/${params.groupingKey}/unarchive` })
  }

  getnumberofusagesofasinglecoupon(params: {
  couponCode: string
}): Promise<number> {
    return this.http.request<number>({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/usage-count/${params.couponCode}` })
  }

  getnumberofusagesofacouponbatch(params: {
  groupingKey: string
}): Promise<number> {
    return this.http.request<number>({ method: 'GET', path: `/api/rnb/v2/pvt/coupon/usage-count/group/${params.groupingKey}` })
  }
}

export class PromotionsTaxesApiV2Api {
  readonly coupons: PromotionsTaxesApiV2Api_coupons
  constructor(http: VtexHttpClient) {
    this.coupons = new PromotionsTaxesApiV2Api_coupons(http)
  }
}
