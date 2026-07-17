import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { LogisticsFacade } from '../../src/facades/logistics.js'

describe('LogisticsFacade', () => {
  it('listWarehouses() reads warehouses', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: 'w1' }]), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await new LogisticsFacade(http).listWarehouses()
    expect(Array.isArray(out)).toBe(true)
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/logistics/pvt/configuration/warehouses')
  })
})
