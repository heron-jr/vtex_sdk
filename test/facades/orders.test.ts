import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { OrdersFacade, ORDERS_MAX_PAGES } from '../../src/facades/orders.js'
import { VtexPaginationLimitError, VtexUnexpectedResponseError, VtexUsageError } from '../../src/core/errors.js'

const json = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } })

function page(list: unknown[], currentPage: number, pages: number, perPage = 100) {
  return json({ list, paging: { currentPage, pages, total: pages * perPage, perPage } })
}

const pageOf = (url: string) => Number(new URL(url).searchParams.get('page'))

function facadeWith(fetchMock: ReturnType<typeof vi.fn>) {
  return new OrdersFacade(
    new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock as unknown as typeof fetch, maxRetries: 0 }),
  )
}

async function collect(iter: AsyncIterable<unknown>): Promise<unknown[]> {
  const out: unknown[] = []
  for await (const item of iter) out.push(item)
  return out
}

describe('OrdersFacade', () => {
  it('get() fetches a single order by id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ orderId: '123-01' }))
    const order = await facadeWith(fetchMock).get('123-01')
    expect((order as any).orderId).toBe('123-01')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/oms/pvt/orders/123-01')
  })

  it('get() encodes the id and rejects dot segments', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({}))
    const facade = facadeWith(fetchMock)
    await facade.get('../../dataentities/CL/search')
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://x.vtexcommercestable.com.br/api/oms/pvt/orders/..%2F..%2Fdataentities%2FCL%2Fsearch',
    )
    expect(() => facade.get('..')).toThrow(VtexUsageError)
  })

  it('list() auto-paginates across pages', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(page([{ orderId: 'a' }, { orderId: 'b' }], 1, 2, 2))
      .mockResolvedValueOnce(page([{ orderId: 'c' }], 2, 2, 2))
    const items = await collect(facadeWith(fetchMock).list({ status: 'ready-for-handling', perPage: 2 }))
    expect(items.map((o: any) => o.orderId)).toEqual(['a', 'b', 'c'])
    const first = new URL(fetchMock.mock.calls[0][0]).searchParams
    expect(first.get('f_status')).toBe('ready-for-handling')
    expect(first.get('page')).toBe('1')
    expect(first.get('per_page')).toBe('2')
    expect(pageOf(fetchMock.mock.calls[1][0])).toBe(2)
  })

  it('list() refuses page/per_page passthrough filters', () => {
    const facade = facadeWith(vi.fn())
    expect(() => facade.list({ page: 5 })).toThrow(VtexUsageError)
    expect(() => facade.list({ per_page: 500 })).toThrow(/perPage/)
  })

  it('list() validates perPage up front', () => {
    const facade = facadeWith(vi.fn())
    for (const perPage of [0, 101, 500, 1.5, Number.NaN, '50' as never]) {
      expect(() => facade.list({ perPage })).toThrow(VtexUsageError)
    }
    for (const perPage of [1, 100]) expect(() => facade.list({ perPage })).not.toThrow()
  })

  it('list() reads exactly 30 pages without an error', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) =>
      Promise.resolve(page([{ orderId: `o${pageOf(url)}` }], pageOf(url), ORDERS_MAX_PAGES, 1)),
    )
    const items = await collect(facadeWith(fetchMock).list({ perPage: 1 }))
    expect(items).toHaveLength(ORDERS_MAX_PAGES)
    expect(fetchMock).toHaveBeenCalledTimes(ORDERS_MAX_PAGES)
  })

  it('list() throws after page 30 instead of requesting page 31', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) =>
      Promise.resolve(page([{ orderId: `o${pageOf(url)}` }], pageOf(url), 40, 1)),
    )
    const ids: unknown[] = []
    const consume = async () => {
      for await (const o of facadeWith(fetchMock).list({ perPage: 1 })) ids.push(o)
    }
    await expect(consume()).rejects.toBeInstanceOf(VtexPaginationLimitError)
    expect(ids).toHaveLength(ORDERS_MAX_PAGES)
    expect(fetchMock).toHaveBeenCalledTimes(ORDERS_MAX_PAGES)
  })

  it('list() detects more results even when VTEX caps pages at 30', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) =>
      Promise.resolve(json({ list: [{ id: pageOf(url) }], paging: { currentPage: pageOf(url), pages: 30, total: 45, perPage: 1 } })),
    )
    await expect(collect(facadeWith(fetchMock).list({ perPage: 1 }))).rejects.toBeInstanceOf(VtexPaginationLimitError)
    expect(fetchMock).toHaveBeenCalledTimes(ORDERS_MAX_PAGES)
  })

  it('list() never ends silently on a malformed page', async () => {
    const html = vi.fn().mockResolvedValue(new Response('<html>maintenance</html>', { headers: { 'content-type': 'text/html' } }))
    await expect(collect(facadeWith(html).list())).rejects.toBeInstanceOf(VtexUnexpectedResponseError)

    const listNotArray = vi.fn().mockResolvedValue(json({ list: {}, paging: { currentPage: 1, pages: 1 } }))
    await expect(collect(facadeWith(listNotArray).list())).rejects.toBeInstanceOf(VtexUnexpectedResponseError)

    const fullPageNoPaging = vi.fn().mockResolvedValue(json({ list: [1, 2] }))
    await expect(collect(facadeWith(fullPageNoPaging).list({ perPage: 2 }))).rejects.toBeInstanceOf(
      VtexUnexpectedResponseError,
    )
    const oversizedNoPaging = vi.fn().mockResolvedValue(json({ list: [1, 2, 3] }))
    await expect(collect(facadeWith(oversizedNoPaging).list({ perPage: 2 }))).rejects.toBeInstanceOf(
      VtexUnexpectedResponseError,
    )

    const emptyMidRun = vi.fn()
      .mockResolvedValueOnce(page([1], 1, 3, 1))
      .mockResolvedValueOnce(page([], 2, 3, 1))
    await expect(collect(facadeWith(emptyMidRun).list({ perPage: 1 }))).rejects.toBeInstanceOf(VtexUnexpectedResponseError)
  })

  it('list() ends normally on a short page without paging information', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ list: [1] }))
    expect(await collect(facadeWith(fetchMock).list({ perPage: 2 }))).toEqual([1])
  })

  it('list() forwards per-call options and stops on abort', async () => {
    const controller = new AbortController()
    const fetchMock = vi.fn().mockImplementation((url: string) =>
      Promise.resolve(page([{ id: pageOf(url) }], pageOf(url), 5, 1)),
    )
    const seen: unknown[] = []
    const consume = async () => {
      for await (const o of facadeWith(fetchMock).list({ perPage: 1 }, { headers: { 'X-Trace': 't1' }, signal: controller.signal })) {
        seen.push(o)
        controller.abort()
      }
    }
    await expect(consume()).rejects.toMatchObject({ name: 'AbortError' })
    expect(seen).toHaveLength(1)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1].headers['X-Trace']).toBe('t1')
  })
})
