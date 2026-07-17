import type { VtexHttpClient } from '../../core/http.js'

class VtexAdsApi_catalogSynchronization {
  constructor(private http: VtexHttpClient) {}

  postProductBulkProducts(params: {
  body: {
  product_sku: string
  parent_sku?: string
  name: string
  url: string
  image_url?: string
  categories: string[]
  brand?: string
  gtins?: string[]
  metadata?: Record<string, unknown>
  tags?: string[]
  sellers?: string[]
}[]
}): Promise<{
  messages?: string[]
}> {
    return this.http.request<{
  messages?: string[]
}>({ method: 'POST', path: `/product/bulk/products`, body: params.body })
  }

  postProductBulkInventories(params: {
  body: {
  product_sku: string
  store_id?: string
  price: number
  promotional_price: number
  is_available: boolean
  metadata?: Record<string, unknown>
}[]
}): Promise<{
  messages?: string[]
}> {
    return this.http.request<{
  messages?: string[]
}>({ method: 'POST', path: `/product/bulk/inventories`, body: params.body })
  }
}
class VtexAdsApi_adsEventsNotification {
  constructor(private http: VtexHttpClient) {}

  postV1BeaconImpressionByAdId(params: {
  ad_id: string
  pos?: string
  body: Record<string, unknown> | Record<string, unknown>
}): Promise<{
  messages?: string[]
}> {
    return this.http.request<{
  messages?: string[]
}>({ method: 'POST', path: `/v1/beacon/impression/${params.ad_id}`, query: { 'pos': params.pos }, body: params.body })
  }

  postV1BeaconClickByAdId(params: {
  ad_id: string
  pos?: string
  body: Record<string, unknown> | Record<string, unknown>
}): Promise<{
  messages?: string[]
}> {
    return this.http.request<{
  messages?: string[]
}>({ method: 'POST', path: `/v1/beacon/click/${params.ad_id}`, query: { 'pos': params.pos }, body: params.body })
  }

  postV1BeaconViewByAdId(params: {
  ad_id: string
  pos?: string
  body: Record<string, unknown> | Record<string, unknown>
}): Promise<{
  messages?: string[]
}> {
    return this.http.request<{
  messages?: string[]
}>({ method: 'POST', path: `/v1/beacon/view/${params.ad_id}`, query: { 'pos': params.pos }, body: params.body })
  }

  postV1BeaconConversion(params: {
  body: {
  channel: string
  brand?: string
  publisher_id: string
  user_id: string
  session_id: string
  order_id: string
  email_hashed: string
  items: {
  sku: string
  quantity: number
  price: number
  promotional_price: number
  seller_id?: string
  product_id?: string
}[]
  created_at: string
  is_company?: boolean
  gender?: "F" | "M" | "O" | null
  uf?: string
  city?: string
  phone_hashed?: string
  social_id_hashed?: string
  first_name_hashed?: string
  last_name_hashed?: string
}
}): Promise<{
  messages?: string[]
}> {
    return this.http.request<{
  messages?: string[]
}>({ method: 'POST', path: `/v1/beacon/conversion`, body: params.body })
  }
}
class VtexAdsApi_ads {
  constructor(private http: VtexHttpClient) {}

  postV1RmaByPublisherId(params: {
  publisher_id: string
  body: {
  session_id: string
  user_id?: string
  store_id?: string
  context: "home" | "category" | "search" | "product_page" | "brand_page" | "digital_signage"
  term?: string
  category_name?: string
  product_sku?: string
  brand_name?: string
  placements: Record<string, unknown>
  product_attributes?: {
  category_name?: string
  brand_name?: string
}
  channel: "site" | "msite" | "app"
  device_id?: string
  store_name?: string
  brand?: string
  userAgent?: string
  tags?: string[]
  skus?: string[]
  dedup_campaign_ads?: boolean
  dedup_ads?: boolean
  segmentation?: {
  key: "AGE" | "GENDER" | "STATE" | "CITY" | "AUDIENCES" | "NBO_CATEGORIES"
  values: string[]
}[]
}
}): Promise<Record<string, unknown>> {
    return this.http.request<Record<string, unknown>>({ method: 'POST', path: `/v1/rma/${params.publisher_id}`, body: params.body })
  }
}
class VtexAdsApi_reports {
  constructor(private http: VtexHttpClient) {}

  getReportV2Advertisers(params: {
  start_date: string
  end_date: string
  account_info?: boolean
  page?: number
  quantity?: number
  count?: boolean
  download?: boolean
}): Promise<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  name?: string
  account_id?: string
  checking_account_id?: string
  seller_id?: string
  advertiser_tags?: string[]
  metrics?: {
  total_campaigns?: string
  total_daily_budget?: string
  balance?: string
  advertiser_id?: string
  impressions?: string
  views?: string
  clicks?: string
  conversions?: string
  conversion_rate?: string
  total_conversions_items_quantity?: string
  ctr?: string
  income?: string
  ecpm?: string
  total_spent?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  conversions_quantity?: string
  roas?: string
  adcost?: string
  consumed_daily_budget?: string
}
  account_logo?: string
  account_theme?: {
  primary_color?: string
  header_color?: string
  second_color?: string
  dark_color?: string
}
}[]
}> {
    return this.http.request<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  name?: string
  account_id?: string
  checking_account_id?: string
  seller_id?: string
  advertiser_tags?: string[]
  metrics?: {
  total_campaigns?: string
  total_daily_budget?: string
  balance?: string
  advertiser_id?: string
  impressions?: string
  views?: string
  clicks?: string
  conversions?: string
  conversion_rate?: string
  total_conversions_items_quantity?: string
  ctr?: string
  income?: string
  ecpm?: string
  total_spent?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  conversions_quantity?: string
  roas?: string
  adcost?: string
  consumed_daily_budget?: string
}
  account_logo?: string
  account_theme?: {
  primary_color?: string
  header_color?: string
  second_color?: string
  dark_color?: string
}
}[]
}>({ method: 'GET', path: `/report/v2/advertisers`, query: { 'start_date': params.start_date, 'end_date': params.end_date, 'account_info': params.account_info, 'page': params.page, 'quantity': params.quantity, 'count': params.count, 'download': params.download } })
  }

  getReportV2Publishers(params: {
  start_date: string
  end_date: string
  publisher_name?: string
  account_info?: boolean
  page?: number
  quantity?: number
  count?: boolean
  order_by?: "name" | "balance" | "total_daily_budget" | "total_campaigns" | "impressions" | "clicks" | "ctr" | "total_spent" | "conversions" | "conversion_rate" | "income" | "roas"
  order_direction?: "asc" | "desc"
  download?: boolean
}): Promise<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  name?: string
  account_id?: string
  checking_account_id?: string
  metrics?: {
  total_campaigns?: string
  total_daily_budget?: string
  balance?: string
  publisher_id?: string
  impressions?: string
  views?: string
  clicks?: string
  conversions?: string
  conversion_rate?: string
  total_conversions_items_quantity?: string
  ctr?: string
  income?: string
  ecpm?: string
  total_spent?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  conversions_quantity?: string
  roas?: string
  adcost?: string
}
  account_logo?: string
  account_theme?: {
  primary_color?: string
  header_color?: string
  second_color?: string
  dark_color?: string
}
}[]
}> {
    return this.http.request<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  name?: string
  account_id?: string
  checking_account_id?: string
  metrics?: {
  total_campaigns?: string
  total_daily_budget?: string
  balance?: string
  publisher_id?: string
  impressions?: string
  views?: string
  clicks?: string
  conversions?: string
  conversion_rate?: string
  total_conversions_items_quantity?: string
  ctr?: string
  income?: string
  ecpm?: string
  total_spent?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  conversions_quantity?: string
  roas?: string
  adcost?: string
}
  account_logo?: string
  account_theme?: {
  primary_color?: string
  header_color?: string
  second_color?: string
  dark_color?: string
}
}[]
}>({ method: 'GET', path: `/report/v2/publishers`, query: { 'start_date': params.start_date, 'end_date': params.end_date, 'publisher_name': params.publisher_name, 'account_info': params.account_info, 'page': params.page, 'quantity': params.quantity, 'count': params.count, 'order_by': params.order_by, 'order_direction': params.order_direction, 'download': params.download } })
  }

  getReportNetworkPublishers(params: {
  start_date: string
  end_date: string
  publisher_name?: string
  account_info?: boolean
  page?: number
  quantity?: number
  count?: boolean
  order_by?: "name" | "impressions" | "clicks" | "ctr" | "conversions" | "conversion_rate" | "income" | "roas" | "requests"
  order_direction?: "asc" | "desc"
  download?: boolean
}): Promise<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  name?: string
  account_id?: string
  metrics?: {
  publisher_id?: string
  impressions?: string
  views?: string
  clicks?: string
  conversions?: string
  conversion_rate?: string
  total_conversions_items_quantity?: string
  ctr?: string
  income?: string
  ecpm?: string
  total_spent?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  conversions_quantity?: string
  roas?: string
  adcost?: string
  requests?: string
}
  account_logo?: string
  account_theme?: {
  primary_color?: string
  header_color?: string
  second_color?: string
  dark_color?: string
}
}[]
}> {
    return this.http.request<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  name?: string
  account_id?: string
  metrics?: {
  publisher_id?: string
  impressions?: string
  views?: string
  clicks?: string
  conversions?: string
  conversion_rate?: string
  total_conversions_items_quantity?: string
  ctr?: string
  income?: string
  ecpm?: string
  total_spent?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  conversions_quantity?: string
  roas?: string
  adcost?: string
  requests?: string
}
  account_logo?: string
  account_theme?: {
  primary_color?: string
  header_color?: string
  second_color?: string
  dark_color?: string
}
}[]
}>({ method: 'GET', path: `/report/network/publishers`, query: { 'start_date': params.start_date, 'end_date': params.end_date, 'publisher_name': params.publisher_name, 'account_info': params.account_info, 'page': params.page, 'quantity': params.quantity, 'count': params.count, 'order_by': params.order_by, 'order_direction': params.order_direction, 'download': params.download } })
  }

  getCampaignV2(params: {
  start_date: string
  end_date: string
  status?: string
  advertiser_id?: string
  ad_type?: "banner" | "product" | "sponsored_brand" | "digital_signage"
  name?: string
  account_info?: boolean
  page?: number
  quantity?: number
  count?: boolean
  order_by?: "name" | "impressions" | "clicks" | "ctr" | "conversions" | "conversion_rate" | "income" | "roas" | "created_at" | "start_at" | "daily_budget" | "ad_type" | "advertiser_name" | "status"
  order_direction?: "asc" | "desc"
  download?: boolean
}): Promise<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  advertiser_id?: string
  name?: string
  status?: string
  type?: string
  settings?: {
  daily_budget?: number
  cpc?: number
  cpm?: number
  budget_type?: string
}
  start_at?: string
  end_at?: string
  disabled_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  description?: string
  publisher_id?: string
  ad_type?: string
  cid?: number
  seller_id?: string
  target?: string
  network_id?: string
  audience_id?: string
  targeting_type?: string
  strategy_type?: string
  total_budget?: string
  active?: boolean
  advertiser_name?: string
  advertiser_account_id?: string
  publisher_name?: string
  publisher_account_id?: string
  consumed_budget?: string
  daily_budget?: string
  campaign_status?: number
  advertiser_tags?: string[]
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: number
  conversions?: number
  impressions?: number
  views?: number
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
}[]
}> {
    return this.http.request<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  advertiser_id?: string
  name?: string
  status?: string
  type?: string
  settings?: {
  daily_budget?: number
  cpc?: number
  cpm?: number
  budget_type?: string
}
  start_at?: string
  end_at?: string
  disabled_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  description?: string
  publisher_id?: string
  ad_type?: string
  cid?: number
  seller_id?: string
  target?: string
  network_id?: string
  audience_id?: string
  targeting_type?: string
  strategy_type?: string
  total_budget?: string
  active?: boolean
  advertiser_name?: string
  advertiser_account_id?: string
  publisher_name?: string
  publisher_account_id?: string
  consumed_budget?: string
  daily_budget?: string
  campaign_status?: number
  advertiser_tags?: string[]
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: number
  conversions?: number
  impressions?: number
  views?: number
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
}[]
}>({ method: 'GET', path: `/campaign/v2`, query: { 'start_date': params.start_date, 'end_date': params.end_date, 'status': params.status, 'advertiser_id': params.advertiser_id, 'ad_type': params.ad_type, 'name': params.name, 'account_info': params.account_info, 'page': params.page, 'quantity': params.quantity, 'count': params.count, 'order_by': params.order_by, 'order_direction': params.order_direction, 'download': params.download } })
  }

  getCampaignByCampaignId(params: {
  campaign_id: string
  start_date: string
  end_date: string
}): Promise<{
  id?: string
  advertiser_id?: string
  name?: string
  description?: string
  status?: string
  type?: string
  settings?: {
  daily_budget?: number
  cpc?: number
  cpm?: number
  budget_type?: string
}
  start_at?: string
  end_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  ad_type?: string
  targeting_type?: string
  strategy_type?: string
  total_budget?: string
  active?: boolean
  publisher_id?: string
  seller_id?: string
  target?: string
  network_id?: string
  audience_id?: string
  advertiser_name?: string
  advertiser_account_id?: string
  publisher_name?: string
  publisher_account_id?: string
  conversions_quantity?: string
  consumed_budget?: string
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: number
  conversions?: number
  impressions?: number
  views?: number
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
  ads?: {
  id?: string
  campaign_id?: string
  url?: string
  settings?: {
  ad_size?: string
  media_url?: string
  type?: string
}
  disabled_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  status?: string
  aid?: number
  asset_type?: string
  active?: boolean
  campaign_name?: string
  ad_type?: string
  campaign_status?: string
  is_running?: boolean
  campaign_settings?: {
  daily_budget?: number
  cpm?: number
  budget_type?: string
}
  metrics?: Record<string, unknown>
}[]
  products?: {
  id?: string
  name?: string
  sku?: string
  image_url?: string
}[]
  status_history?: {
  id?: string
  status?: string
  created_at?: string
}[]
}> {
    return this.http.request<{
  id?: string
  advertiser_id?: string
  name?: string
  description?: string
  status?: string
  type?: string
  settings?: {
  daily_budget?: number
  cpc?: number
  cpm?: number
  budget_type?: string
}
  start_at?: string
  end_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  ad_type?: string
  targeting_type?: string
  strategy_type?: string
  total_budget?: string
  active?: boolean
  publisher_id?: string
  seller_id?: string
  target?: string
  network_id?: string
  audience_id?: string
  advertiser_name?: string
  advertiser_account_id?: string
  publisher_name?: string
  publisher_account_id?: string
  conversions_quantity?: string
  consumed_budget?: string
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: number
  conversions?: number
  impressions?: number
  views?: number
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
  ads?: {
  id?: string
  campaign_id?: string
  url?: string
  settings?: {
  ad_size?: string
  media_url?: string
  type?: string
}
  disabled_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  status?: string
  aid?: number
  asset_type?: string
  active?: boolean
  campaign_name?: string
  ad_type?: string
  campaign_status?: string
  is_running?: boolean
  campaign_settings?: {
  daily_budget?: number
  cpm?: number
  budget_type?: string
}
  metrics?: Record<string, unknown>
}[]
  products?: {
  id?: string
  name?: string
  sku?: string
  image_url?: string
}[]
  status_history?: {
  id?: string
  status?: string
  created_at?: string
}[]
}>({ method: 'GET', path: `/campaign/${params.campaign_id}`, query: { 'start_date': params.start_date, 'end_date': params.end_date } })
  }

  getReportAdvertisersCampaignsDetailed(params: {
  start_date: string
  end_date: string
  campaign_id?: string
  campaign_status?: string
  publisher_id?: string
  publisher_name?: string
  ad_type?: "banner" | "product" | "sponsored_brand" | "digital_signage"
  ad_status?: "enabled" | "paused" | "rejected" | "pending_review" | "stock_out" | "invalid_cost"
  seller_id?: string
  tag_id?: string
  targeting_type?: string
  sub_publisher_id?: string
  sub_publisher_name?: string
  page?: number
  quantity?: number
  count?: boolean
  order_by?: "advertiser_name" | "name" | "ad_type" | "status" | "sub_publisher_name" | "daily_budget" | "impressions" | "views" | "clicks" | "ctr" | "total_spent" | "conversions" | "conversion_rate" | "income" | "roas" | "created_at" | "start_at"
  order_direction?: "asc" | "desc"
  download?: boolean
}): Promise<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  advertiser_id?: string
  name?: string
  status?: string
  type?: string
  publisher_id?: string
  publisher_name?: string
  advertiser_name?: string
  sub_publisher_id?: string
  sub_publisher_name?: string
  active?: boolean
  daily_budget?: string
  consumed_budget?: string
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: number
  conversions?: number
  total_conversions_items_quantity?: number
  impressions?: number
  views?: number
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
}[]
}> {
    return this.http.request<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  advertiser_id?: string
  name?: string
  status?: string
  type?: string
  publisher_id?: string
  publisher_name?: string
  advertiser_name?: string
  sub_publisher_id?: string
  sub_publisher_name?: string
  active?: boolean
  daily_budget?: string
  consumed_budget?: string
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: number
  conversions?: number
  total_conversions_items_quantity?: number
  impressions?: number
  views?: number
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
}[]
}>({ method: 'GET', path: `/report/advertisers/campaigns-detailed`, query: { 'start_date': params.start_date, 'end_date': params.end_date, 'campaign_id': params.campaign_id, 'campaign_status': params.campaign_status, 'publisher_id': params.publisher_id, 'publisher_name': params.publisher_name, 'ad_type': params.ad_type, 'ad_status': params.ad_status, 'seller_id': params.seller_id, 'tag_id': params.tag_id, 'targeting_type': params.targeting_type, 'sub_publisher_id': params.sub_publisher_id, 'sub_publisher_name': params.sub_publisher_name, 'page': params.page, 'quantity': params.quantity, 'count': params.count, 'order_by': params.order_by, 'order_direction': params.order_direction, 'download': params.download } })
  }

  getReportAdvertisersAdsDetailed(params: {
  start_date: string
  end_date: string
  campaign_name?: string
  campaign_id?: string
  publisher_id?: string
  advertiser_id?: string
  product_sku?: string
  ad_status?: "enabled" | "paused" | "rejected" | "pending_review" | "stock_out" | "invalid_cost"
  ad_type?: "banner" | "product" | "sponsored_brand" | "digital_signage"
  targeting_type?: string
  tag_id?: string
  sub_publisher_id?: string
  sub_publisher_name?: string
  show_inactive?: boolean
  hide_pending_rejected?: boolean
  page?: number
  quantity?: number
  count?: boolean
  order_by?: "ad_type" | "ad_status" | "impressions" | "conversion_rate" | "ctr" | "income" | "total_spent" | "roas" | "conversions" | "total_conversions_items_quantity" | "advertiser_name" | "campaign_name" | "clicks" | "adcost" | "created_at" | "sub_publisher_name"
  order_direction?: "asc" | "desc"
  download?: boolean
}): Promise<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  campaign_id?: string
  url?: string
  status?: string
  active?: boolean
  product_sku?: string
  campaign_name?: string
  campaign_status?: string
  ad_type?: string
  publisher_id?: string
  publisher_name?: string
  publisher_account_id?: string
  advertiser_id?: string
  advertiser_name?: string
  advertiser_account_id?: string
  sub_publisher_id?: string
  sub_publisher_name?: string
  sub_publisher_account_id?: string
  metrics?: {
  clicks?: string
  conversions?: string
  total_conversions_items_quantity?: string
  impressions?: string
  views?: string
  conversion_rate?: string
  ctr?: string
  roas?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
}
}[]
}> {
    return this.http.request<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  campaign_id?: string
  url?: string
  status?: string
  active?: boolean
  product_sku?: string
  campaign_name?: string
  campaign_status?: string
  ad_type?: string
  publisher_id?: string
  publisher_name?: string
  publisher_account_id?: string
  advertiser_id?: string
  advertiser_name?: string
  advertiser_account_id?: string
  sub_publisher_id?: string
  sub_publisher_name?: string
  sub_publisher_account_id?: string
  metrics?: {
  clicks?: string
  conversions?: string
  total_conversions_items_quantity?: string
  impressions?: string
  views?: string
  conversion_rate?: string
  ctr?: string
  roas?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
}
}[]
}>({ method: 'GET', path: `/report/advertisers/ads-detailed`, query: { 'start_date': params.start_date, 'end_date': params.end_date, 'campaign_name': params.campaign_name, 'campaign_id': params.campaign_id, 'publisher_id': params.publisher_id, 'advertiser_id': params.advertiser_id, 'product_sku': params.product_sku, 'ad_status': params.ad_status, 'ad_type': params.ad_type, 'targeting_type': params.targeting_type, 'tag_id': params.tag_id, 'sub_publisher_id': params.sub_publisher_id, 'sub_publisher_name': params.sub_publisher_name, 'show_inactive': params.show_inactive, 'hide_pending_rejected': params.hide_pending_rejected, 'page': params.page, 'quantity': params.quantity, 'count': params.count, 'order_by': params.order_by, 'order_direction': params.order_direction, 'download': params.download } })
  }

  getAdResultsV2(params: {
  start_date: string
  end_date: string
  campaign_name?: string
  campaign_id?: string
  advertiser_id?: string
  product_sku?: string
  ad_status?: "enabled" | "paused" | "rejected" | "pending_review" | "stock_out" | "invalid_cost"
  ad_type?: "banner" | "product" | "sponsored_brand" | "digital_signage"
  targeting_type?: string
  show_inactive?: boolean
  account_info?: boolean
  page?: number
  quantity?: number
  count?: boolean
  order_by?: "ad_type" | "ad_status" | "impressions" | "conversion_rate" | "ctr" | "income" | "total_spent" | "roas" | "conversions" | "total_conversions_item_quantity"
  order_direction?: "asc" | "desc"
  download?: boolean
}): Promise<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  campaign_id?: string
  url?: string
  settings?: {
  cpc?: number
  cpm?: number
  type?: string
  categories?: string[]
  keywords?: string[]
}
  disabled_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  status?: string
  aid?: number
  asset_type?: string
  active?: boolean
  product_id?: string
  product_sku?: string
  name?: string
  image_url?: string
  categories?: string[]
  campaign_name?: string
  ad_type?: string
  campaign_status?: string
  campaign_settings?: {
  daily_budget?: number
  cpm?: number
  budget_type?: string
}
  publisher_id?: string
  advertiser_id?: string
  advertiser_name?: string
  advertiser_account_id?: string
  publisher_name?: string
  publisher_account_id?: string
  ad_id?: string
  conversions_quantity?: string
  is_running?: boolean
  advertiser_tags?: string[]
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: string
  conversions?: string
  total_conversions_items_quantity?: string
  impressions?: string
  views?: string
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
}[]
}> {
    return this.http.request<{
  total?: number
  pages?: number
  currentPage?: number
  data?: {
  id?: string
  campaign_id?: string
  url?: string
  settings?: {
  cpc?: number
  cpm?: number
  type?: string
  categories?: string[]
  keywords?: string[]
}
  disabled_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  status?: string
  aid?: number
  asset_type?: string
  active?: boolean
  product_id?: string
  product_sku?: string
  name?: string
  image_url?: string
  categories?: string[]
  campaign_name?: string
  ad_type?: string
  campaign_status?: string
  campaign_settings?: {
  daily_budget?: number
  cpm?: number
  budget_type?: string
}
  publisher_id?: string
  advertiser_id?: string
  advertiser_name?: string
  advertiser_account_id?: string
  publisher_name?: string
  publisher_account_id?: string
  ad_id?: string
  conversions_quantity?: string
  is_running?: boolean
  advertiser_tags?: string[]
  pending?: {
  label?: "ads"
  quantity?: number
}[]
  metrics?: {
  clicks?: string
  conversions?: string
  total_conversions_items_quantity?: string
  impressions?: string
  views?: string
  conversions_click?: string
  conversions_view?: string
  conversion_rate?: string
  conversion_rate_click?: string
  conversion_rate_view?: string
  ctr?: string
  roas?: string
  roas_click?: string
  roas_view?: string
  roas_halo?: string
  roas_overall?: string
  adcost?: string
  income?: string
  total_spent?: string
  ecpm?: string
  cpa?: string
  avg_cpc?: string
  avg_cpm?: string
  halo_revenue?: string
  halo_orders?: string
  halo_items?: string
}
}[]
}>({ method: 'GET', path: `/ad/results/v2`, query: { 'start_date': params.start_date, 'end_date': params.end_date, 'campaign_name': params.campaign_name, 'campaign_id': params.campaign_id, 'advertiser_id': params.advertiser_id, 'product_sku': params.product_sku, 'ad_status': params.ad_status, 'ad_type': params.ad_type, 'targeting_type': params.targeting_type, 'show_inactive': params.show_inactive, 'account_info': params.account_info, 'page': params.page, 'quantity': params.quantity, 'count': params.count, 'order_by': params.order_by, 'order_direction': params.order_direction, 'download': params.download } })
  }
}
class VtexAdsApi_creditTransfer {
  constructor(private http: VtexHttpClient) {}

  postWebhookMarketplaceTransfersByPublisherId(params: {
  publisher_id: string
  body: {
  transaction_id: string
  status: "success" | "failure"
  message?: string
}
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'POST', path: `/webhook/marketplace/transfers/${params.publisher_id}`, body: params.body })
  }
}
class VtexAdsApi_audiences {
  constructor(private http: VtexHttpClient) {}

  postAudienceUploadUrl(params: Record<string, never>): Promise<{
  url?: string
  fields?: Record<string, unknown>
  key?: string
  bucket?: string
  expires_in?: number
  max_bytes?: number
  upload?: {
  method?: string
  enctype?: string
}
}> {
    return this.http.request<{
  url?: string
  fields?: Record<string, unknown>
  key?: string
  bucket?: string
  expires_in?: number
  max_bytes?: number
  upload?: {
  method?: string
  enctype?: string
}
}>({ method: 'POST', path: `/audience/upload-url` })
  }
}
class VtexAdsApi_singleSignOn {
  constructor(private http: VtexHttpClient) {}

  postSsoMarketplace(params: {
  body: {
  sso_token: string
  email: string
  user_id: string
  name: string
  marketplace_name: string
}
}): Promise<{
  redirect_url?: string
}> {
    return this.http.request<{
  redirect_url?: string
}>({ method: 'POST', path: `/sso/marketplace`, body: params.body })
  }
}

export class VtexAdsApi {
  readonly catalogSynchronization: VtexAdsApi_catalogSynchronization
  readonly adsEventsNotification: VtexAdsApi_adsEventsNotification
  readonly ads: VtexAdsApi_ads
  readonly reports: VtexAdsApi_reports
  readonly creditTransfer: VtexAdsApi_creditTransfer
  readonly audiences: VtexAdsApi_audiences
  readonly singleSignOn: VtexAdsApi_singleSignOn
  constructor(http: VtexHttpClient) {
    this.catalogSynchronization = new VtexAdsApi_catalogSynchronization(http)
    this.adsEventsNotification = new VtexAdsApi_adsEventsNotification(http)
    this.ads = new VtexAdsApi_ads(http)
    this.reports = new VtexAdsApi_reports(http)
    this.creditTransfer = new VtexAdsApi_creditTransfer(http)
    this.audiences = new VtexAdsApi_audiences(http)
    this.singleSignOn = new VtexAdsApi_singleSignOn(http)
  }
}
