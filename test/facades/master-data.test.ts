import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { MasterDataFacade } from '../../src/facades/master-data.js'
import { VtexUnexpectedResponseError, VtexUsageError } from '../../src/core/errors.js'

function json(body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json', ...headers } })
}

describe('MasterDataFacade', () => {
  it('get() reads a single document', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ id: 'doc1' }))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const doc = await md.get('CL', 'doc1')
    expect((doc as any).id).toBe('doc1')
    expect(fetchMock.mock.calls[0][0]).toBe('https://x.vtexcommercestable.com.br/api/dataentities/CL/documents/doc1')
  })

  it('get() accepts fields', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ id: 'doc1' }))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    await md.get('CL', 'doc1', { fields: ['id', 'email'] })
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://x.vtexcommercestable.com.br/api/dataentities/CL/documents/doc1?_fields=id%2Cemail',
    )
  })

  it('rejects an entity that would change the path', async () => {
    const fetchMock = vi.fn()
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    await expect(md.get('CL/../../oms/pvt/orders', 'x')).rejects.toBeInstanceOf(VtexUsageError)
    expect(() => md.scroll('CL/search?_where=email=*#')).toThrow(VtexUsageError)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('scroll() follows the token until an empty page', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json([{ id: 1 }, { id: 2 }], { 'X-VTEX-MD-TOKEN': 'tok1' }))
      .mockResolvedValueOnce(json([], { 'X-VTEX-MD-TOKEN': 'tok1' }))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const ids: number[] = []
    for await (const d of md.scroll('CL', { fields: ['id'], size: 2 })) ids.push((d as any).id)
    expect(ids).toEqual([1, 2])
    const firstUrl = fetchMock.mock.calls[0][0] as string
    expect(firstUrl).toContain('/api/dataentities/CL/scroll')
    expect(firstUrl).toContain('_fields=id')
    expect(firstUrl).toContain('_size=2')
    expect(firstUrl).not.toContain('_token')
    const secondUrl = fetchMock.mock.calls[1][0] as string
    expect(secondUrl).toContain('_token=tok1')
  })

  it('scroll() stops immediately when the first page is empty', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json([]))
    const http = new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const md = new MasterDataFacade(http)
    const ids: number[] = []
    for await (const d of md.scroll('CL')) ids.push((d as any).id)
    expect(ids).toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('scroll() validates the page size', () => {
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: vi.fn() }))
    for (const size of [0, 1001, 1.5, Number.NaN]) expect(() => md.scroll('CL', { size })).toThrow(VtexUsageError)
    for (const size of [1, 1000]) expect(() => md.scroll('CL', { size })).not.toThrow()
  })

  it('scroll() snapshots its options at call time', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json([]))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const opts = { size: 10, fields: [] as string[] }
    const iter = md.scroll('CL', opts)
    opts.size = 50_000
    for await (const _ of iter) void _
    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.searchParams.get('_size')).toBe('10')
    expect(url.searchParams.has('_fields')).toBe(false)
  })

  it.each([
    ['a missing', {}],
    ['an empty', { 'X-VTEX-MD-TOKEN': '' }],
  ])('scroll() refuses to restart when rows come with %s token header', async (_label, headers) => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(json([{ id: 1 }], headers)))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const consume = async () => {
      for await (const _ of md.scroll('CL')) void _
    }
    await expect(consume()).rejects.toBeInstanceOf(VtexUnexpectedResponseError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('scroll() keeps the previous token when a later page omits it', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json([{ id: 1 }], { 'X-VTEX-MD-TOKEN': 'tok1' }))
      .mockResolvedValueOnce(json([{ id: 2 }]))
      .mockResolvedValueOnce(json([]))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const ids: number[] = []
    for await (const d of md.scroll('CL')) ids.push((d as any).id)
    expect(ids).toEqual([1, 2])
    expect(new URL(fetchMock.mock.calls[2][0]).searchParams.get('_token')).toBe('tok1')
  })

  it('scroll() treats an empty body mid-scroll as an error', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json([{ id: 1 }], { 'X-VTEX-MD-TOKEN': 'tok1' }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const consume = async () => {
      for await (const _ of md.scroll('CL')) void _
    }
    await expect(consume()).rejects.toBeInstanceOf(VtexUnexpectedResponseError)
  })

  it('scroll() forwards per-call options', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json([]))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    for await (const _ of md.scroll('CL', {}, { headers: { 'X-Trace': 't1' } })) void _
    expect(fetchMock.mock.calls[0][1].headers['X-Trace']).toBe('t1')
  })

  it('scroll() stops on abort between pages', async () => {
    const controller = new AbortController()
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(json([{ id: 1 }], { 'X-VTEX-MD-TOKEN': 'tok' })))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const consume = async () => {
      for await (const _ of md.scroll('CL', {}, { signal: controller.signal })) controller.abort()
    }
    await expect(consume()).rejects.toMatchObject({ name: 'AbortError' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('scroll() treats a null body mid-scroll as an error', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json([{ id: 1 }], { 'X-VTEX-MD-TOKEN': 'tok1' }))
      .mockResolvedValueOnce(json(null))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const consume = async () => {
      for await (const _ of md.scroll('CL')) void _
    }
    await expect(consume()).rejects.toBeInstanceOf(VtexUnexpectedResponseError)
  })

  it('get() forwards per-call options alongside fields', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({}))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    await md.get('CL', 'x', { fields: ['id'], headers: { 'X-Trace': 't1' } })
    expect(fetchMock.mock.calls[0][1].headers['X-Trace']).toBe('t1')
    expect(new URL(fetchMock.mock.calls[0][0]).searchParams.get('_fields')).toBe('id')
  })

  it('get() encodes or rejects traversal ids', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(json({})))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    for (const id of ['../../x', 'a/b', 'x#', 'x?y']) await md.get('CL', id)
    expect(fetchMock.mock.calls.map((c) => new URL(c[0]).pathname)).toEqual([
      '/api/dataentities/CL/documents/..%2F..%2Fx',
      '/api/dataentities/CL/documents/a%2Fb',
      '/api/dataentities/CL/documents/x%23',
      '/api/dataentities/CL/documents/x%3Fy',
    ])
    for (const id of ['..', '.', '']) await expect(md.get('CL', id)).rejects.toBeInstanceOf(VtexUsageError)
    await md.get('CL', 'doc1', null as never)
  })

  it('scroll() raises a typed error on a non-array body', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({ unexpected: true }))
    const md = new MasterDataFacade(new VtexHttpClient({ account: 'x', appKey: 'K', appToken: 'T', fetch: fetchMock }))
    const consume = async () => {
      for await (const _ of md.scroll('CL')) void _
    }
    await expect(consume()).rejects.toBeInstanceOf(VtexUnexpectedResponseError)
  })
})
