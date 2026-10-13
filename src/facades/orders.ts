import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'
import { VtexPaginationLimitError, VtexUnexpectedResponseError, VtexUsageError } from '../core/errors.js'

/** VTEX's List Orders endpoint serves at most 30 pages per query. */
export const ORDERS_MAX_PAGES = 30

export interface OrderListFilters {
  status?: string
  q?: string
  orderBy?: string
  perPage?: number
  [key: string]: unknown
}

interface OrdersPage {
  list?: unknown
  paging?: { currentPage?: unknown; pages?: unknown; total?: unknown; perPage?: unknown }
}

export class OrdersFacade {
  constructor(private readonly http: VtexHttpClient) {}

  get(orderId: string, opts?: CallOptions): Promise<unknown> {
    return this.http.request(withCall({ method: 'GET', path: `/api/oms/pvt/orders/${encodePathParam(orderId)}` }, opts))
  }

  /**
   * Auto-paginated List Orders. VTEX serves at most 30 pages per query: when more
   * results match, this throws VtexPaginationLimitError after yielding page 30, so
   * callers narrow the filters (e.g. f_creationDate) instead of silently losing orders.
   * A response that doesn't look like a List Orders page throws VtexUnexpectedResponseError
   * rather than ending the iteration early.
   */
  list(filters: OrderListFilters = {}, opts?: CallOptions): AsyncGenerator<unknown> {
    const { status, perPage, page, per_page: perPageRaw, ...rest } = filters
    if (page !== undefined || perPageRaw !== undefined) {
      throw new VtexUsageError('list() pages by itself: use perPage instead of page/per_page')
    }
    const size = perPage ?? 100
    if (!Number.isInteger(size) || size < 1 || size > 100) {
      throw new VtexUsageError(`perPage must be an integer between 1 and 100 (got ${String(perPage)})`)
    }
    return this.#pages({ ...rest }, status, size, opts)
  }

  async *#pages(
    rest: Record<string, unknown>, status: string | undefined, size: number, opts: CallOptions | undefined,
  ): AsyncGenerator<unknown> {
    for (let page = 1; ; page++) {
      const query: Record<string, unknown> = { ...rest, page, per_page: size }
      if (status !== undefined) query['f_status'] = status
      const res = await this.http.request<OrdersPage>(withCall({ method: 'GET', path: '/api/oms/pvt/orders', query }, opts))
      if (typeof res !== 'object' || res === null || !Array.isArray(res.list)) {
        throw new VtexUnexpectedResponseError('List Orders returned a body without a list array', res)
      }
      const items = res.list
      for (const item of items) yield item
      const paging = res.paging
      const pages = typeof paging?.pages === 'number' ? paging.pages : undefined
      const total = typeof paging?.total === 'number' ? paging.total : undefined
      if (pages === undefined) {
        // Without paging info a full page may hide more results: refuse to guess.
        if (items.length === size) {
          throw new VtexUnexpectedResponseError('List Orders returned a full page without paging information', res)
        }
        return
      }
      if (page >= pages) {
        // Also catch a `pages` value that VTEX itself capped at the limit.
        if (page >= ORDERS_MAX_PAGES && total !== undefined && total > page * size) {
          throw this.#limitError(Math.ceil(total / size))
        }
        return
      }
      if (items.length === 0) {
        throw new VtexUnexpectedResponseError(`List Orders returned an empty page ${page} of ${pages}`, res)
      }
      if (page >= ORDERS_MAX_PAGES) throw this.#limitError(pages)
    }
  }

  #limitError(pages: number): VtexPaginationLimitError {
    return new VtexPaginationLimitError(
      `VTEX List Orders serves at most ${ORDERS_MAX_PAGES} pages, but ${pages} pages match these filters; ` +
        'narrow the query (e.g. f_creationDate) and iterate per window',
    )
  }
}
