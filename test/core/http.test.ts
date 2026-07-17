import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import { VtexRateLimitError, VtexNotFoundError } from '../../src/core/errors.js'

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  })
}

describe('VtexHttpClient.request', () => {
  it('sends auth headers, resolves URL, returns parsed JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ orderId: '1' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.request<{ orderId: string }>({ method: 'GET', path: '/api/oms/pvt/orders/1' })
    expect(out).toEqual({ orderId: '1' })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://lojax.vtexcommercestable.com.br/api/oms/pvt/orders/1')
    expect(init.headers['X-VTEX-API-AppKey']).toBe('K')
    expect(init.headers['X-VTEX-API-AppToken']).toBe('T')
  })

  it('appends query params', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([]))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    await http.request({ method: 'GET', path: '/api/oms/pvt/orders', query: { page: 2, per_page: 50 } })
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://lojax.vtexcommercestable.com.br/api/oms/pvt/orders?page=2&per_page=50',
    )
  })

  it('serializes a JSON body and sets content-type', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    await http.request({ method: 'POST', path: '/x', body: { a: 1 } })
    const init = fetchMock.mock.calls[0][1]
    expect(init.body).toBe('{"a":1}')
    expect(init.headers['Content-Type']).toBe('application/json')
  })

  it('throws a typed error on 404', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ error: 'nope' }, 404))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 0 })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexNotFoundError)
  })

  it('retries on 429 then succeeds, honoring Retry-After', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({}, 429, { 'Retry-After': '0' }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 2 })
    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('gives up after maxRetries on persistent 429', async () => {
    // Use a fresh Response per call (like a real fetch would return) rather than
    // `mockResolvedValue` reusing a single instance, since the retry path now
    // consumes/cancels each response's body as it loops back to refetch.
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 429, { 'Retry-After': '0' })))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 1 })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexRateLimitError)
    expect(fetchMock).toHaveBeenCalledTimes(2) // initial + 1 retry
  })

  it('returns undefined for 204 No Content', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.request({ method: 'DELETE', path: '/x' })
    expect(out).toBeUndefined()
  })

  it('clears the per-attempt timeout even when the onRequest hook throws synchronously', async () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({
      account: 'lojax',
      appKey: 'K',
      appToken: 'T',
      fetch: fetchMock,
      hooks: {
        onRequest: () => {
          throw new Error('boom from onRequest hook')
        },
      },
    })

    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toThrow('boom from onRequest hook')

    // fetch must never have been reached, since the hook throws before it.
    expect(fetchMock).not.toHaveBeenCalled()

    // Every timer armed by the request pipeline (setTimeout calls with a
    // numeric handle) must have a matching clearTimeout, i.e. no leaked timer.
    const timeoutCalls = setTimeoutSpy.mock.results.length
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(timeoutCalls)
    expect(timeoutCalls).toBeGreaterThan(0)

    setTimeoutSpy.mockRestore()
    clearTimeoutSpy.mockRestore()
  })

  it('drains/cancels the response body on the 429 retry path before refetching', async () => {
    const cancelSpies: Array<() => Promise<void>> = []

    function retryableResponse(status: number, headers: Record<string, string> = {}) {
      const real = new Response(JSON.stringify({}), {
        status,
        headers: { 'content-type': 'application/json', ...headers },
      })
      const cancelSpy = vi.fn(() => Promise.resolve())
      cancelSpies.push(cancelSpy)
      // Wrap `body` so we can observe whether the retry path releases it,
      // without touching the real readable stream (which parseBody may also
      // need to read from on the final, non-retry attempt).
      const realBody = real.body
      Object.defineProperty(real, 'body', {
        get() {
          if (!realBody) return realBody
          return new Proxy(realBody, {
            get(target, prop, receiver) {
              if (prop === 'cancel') return cancelSpy
              return Reflect.get(target, prop, receiver)
            },
          })
        },
      })
      return real
    }

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(retryableResponse(429, { 'Retry-After': '0' }))
      .mockResolvedValueOnce(retryableResponse(429, { 'Retry-After': '0' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 1 })

    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexRateLimitError)
    expect(fetchMock).toHaveBeenCalledTimes(2) // initial + 1 retry

    // The first response is retried (body must be drained); the second is
    // the final failure and its body is read by parseBody instead, not cancelled.
    expect(cancelSpies[0]).toHaveBeenCalledTimes(1)
  })
})
