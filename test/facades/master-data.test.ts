import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { MasterDataFacade } from '../../src/facades/master-data.js'

describe('MasterDataFacade', () => {
  it('get() reads a single document', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'doc1' }), { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const doc = await md.get('CL', 'doc1')
    expect((doc as any).id).toBe('doc1')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/dataentities/CL/documents/doc1')
  })

  it('scroll() follows the token until an empty page', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([{ id: 1 }, { id: 2 }]), {
        status: 200, headers: { 'content-type': 'application/json', 'X-VTEX-MD-TOKEN': 'tok1' },
      }))
      .mockResolvedValueOnce(new Response(JSON.stringify([]), {
        status: 200, headers: { 'content-type': 'application/json', 'X-VTEX-MD-TOKEN': 'tok1' },
      }))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const ids: number[] = []
    for await (const d of md.scroll('CL', { fields: ['id'], size: 2 })) ids.push((d as any).id)
    expect(ids).toEqual([1, 2])
    // first call: no _token yet, has _fields and _size
    const firstUrl = fetchMock.mock.calls[0][0] as string
    expect(firstUrl).toContain('/api/dataentities/CL/scroll')
    expect(firstUrl).toContain('_fields=id')
    expect(firstUrl).toContain('_size=2')
    expect(firstUrl).not.toContain('_token')
    // second call: carries the token read from the response header
    const secondUrl = fetchMock.mock.calls[1][0] as string
    expect(secondUrl).toContain('_token=tok1')
  })

  it('scroll() stops immediately when the first page is empty', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify([]), {
      status: 200, headers: { 'content-type': 'application/json' },
    }))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const ids: number[] = []
    for await (const d of md.scroll('CL')) ids.push((d as any).id)
    expect(ids).toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
