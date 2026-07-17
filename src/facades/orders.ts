import type { VtexHttpClient } from '../core/http.js'
import { paginate } from './pagination.js'

export interface OrderListFilters {
  status?: string
  q?: string
  orderBy?: string
  perPage?: number
  [key: string]: unknown
}

interface OrdersPage {
  list: unknown[]
  paging?: { currentPage: number; pages: number; total: number; perPage: number }
}

export class OrdersFacade {
  constructor(private readonly http: VtexHttpClient) {}

  get(orderId: string): Promise<unknown> {
    return this.http.request({ method: 'GET', path: `/api/oms/pvt/orders/${encodeURIComponent(orderId)}` })
  }

  list(filters: OrderListFilters = {}): AsyncGenerator<unknown> {
    const { status, perPage, ...rest } = filters
    const http = this.http
    return paginate<unknown>(async (page) => {
      const query: Record<string, unknown> = {
        ...rest,
        page,
        per_page: perPage ?? 100,
      }
      if (status !== undefined) query['f_status'] = status
      const res = (await http.request({ method: 'GET', path: '/api/oms/pvt/orders', query })) as OrdersPage
      const paging = res.paging ?? { currentPage: page, pages: page }
      return { items: res.list ?? [], hasMore: paging.currentPage < paging.pages }
    })
  }
}
