import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { OrdersFacade } from '../../src/facades/orders.js'

function page(list: unknown[], currentPage: number, pages: number) {
  return new Response(JSON.stringify({ list, paging: { currentPage, pages, total: 3, perPage: 2 } }), {
    status: 200, headers: { 'content-type': 'application/json' },
  })
}

describe('OrdersFacade', () => {
  it('get() fetches a single order by id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ orderId: '123-01' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const facade = new OrdersFacade(http)
    const order = await facade.get('123-01')
    expect((order as any).orderId).toBe('123-01')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/oms/pvt/orders/123-01')
  })

  it('list() auto-paginates across pages', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(page([{ orderId: 'a' }, { orderId: 'b' }], 1, 2))
      .mockResolvedValueOnce(page([{ orderId: 'c' }], 2, 2))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const facade = new OrdersFacade(http)
    const ids: string[] = []
    for await (const o of facade.list({ status: 'ready-for-handling' })) ids.push((o as any).orderId)
    expect(ids).toEqual(['a', 'b', 'c'])
    // first call carries the status filter and page=1
    expect(fetchMock.mock.calls[0][0]).toContain('f_status=ready-for-handling')
    expect(fetchMock.mock.calls[0][0]).toContain('page=1')
    // second call requests page=2
    expect(fetchMock.mock.calls[1][0]).toContain('page=2')
  })

  it('list() pagination controls override passthrough filters', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(page([{ orderId: 'a' }], 1, 1))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const facade = new OrdersFacade(http)
    const ids: string[] = []
    for await (const o of facade.list({ page: 5 })) ids.push((o as any).orderId)
    expect(ids).toEqual(['a'])
    // internal control page=1 wins over passthrough page=5
    expect(fetchMock.mock.calls[0][0]).toContain('page=1')
  })
})
