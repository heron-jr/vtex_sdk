import { describe, it, expect, vi } from 'vitest'
import { VtexClient, VtexNotFoundError, VtexAuthError } from '../src/index.js'

// Mirrors how a 0.1.x consumer uses the SDK: constructor options, orders.get and two error classes.
const config = {
  account: 'lojax',
  environment: 'vtexcommercestable' as const,
  appKey: 'K',
  appToken: 'T',
  maxRetries: 4,
  timeoutMs: 30_000,
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

describe('0.1.x consumer compatibility', () => {
  it('orders.get returns the parsed order', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ orderId: '1234567890123-01' }))
    const client = new VtexClient({ ...config, fetch: fetchMock })
    const order = (await client.orders.get('1234567890123-01')) as { orderId: string }
    expect(order.orderId).toBe('1234567890123-01')
    expect(fetchMock.mock.calls[0][0]).toBe('https://lojax.vtexcommercestable.com.br/api/oms/pvt/orders/1234567890123-01')
  })

  it('a missing order is a VtexNotFoundError and is not retried', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(json({}, 404)))
    const client = new VtexClient({ ...config, fetch: fetchMock })
    await expect(client.orders.get('1')).rejects.toBeInstanceOf(VtexNotFoundError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('a bad key is a VtexAuthError with the 0.1.x fields, and is not retried', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ error: 'unauthorized' }), {
          status: 401,
          headers: { 'content-type': 'application/json', 'x-request-id': 'req-1' },
        }),
      ),
    )
    const client = new VtexClient({ ...config, fetch: fetchMock })
    const err = await client.orders.get('1').catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexAuthError)
    expect((err as VtexAuthError).status).toBe(401)
    expect((err as VtexAuthError).body).toEqual({ error: 'unauthorized' })
    expect((err as VtexAuthError).requestId).toBe('req-1')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('works with exactly the minimal 0.1.x config', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ orderId: '1' }))
    vi.stubGlobal('fetch', fetchMock)
    try {
      const client = new VtexClient({ account: 'lojax', appKey: 'K', appToken: 'T' })
      await client.orders.get('1')
      expect(fetchMock.mock.calls[0][0]).toBe('https://lojax.vtexcommercestable.com.br/api/oms/pvt/orders/1')
      expect(fetchMock.mock.calls[0][1].headers['X-VTEX-API-AppKey']).toBe('K')
    } finally {
      vi.unstubAllGlobals()
    }
  })
})
