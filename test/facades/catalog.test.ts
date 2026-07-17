import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { CatalogFacade } from '../../src/facades/catalog.js'

describe('CatalogFacade', () => {
  it('getProduct() reads a product by id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ Id: 5 }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await new CatalogFacade(http).getProduct(5)
    expect((out as any).Id).toBe(5)
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/catalog/pvt/product/5')
  })
})
