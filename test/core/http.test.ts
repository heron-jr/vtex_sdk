import { inspect } from 'node:util'
import { describe, it, expect, vi } from 'vitest'
import { VtexHttpClient } from '../../src/core/http.js'
import {
  VtexRateLimitError, VtexNotFoundError, VtexServerError, VtexNetworkError,
  VtexTimeoutError, VtexUsageError, VtexRequestError,
} from '../../src/core/errors.js'

const BASE = { account: 'lojax', appKey: 'K', appToken: 'T-SECRET' }

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  })
}

function connectError(code: string) {
  return Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(code), { code }) })
}

/** A fetch that never answers until its signal aborts, like a stalled socket. */
function hangingFetch() {
  return vi.fn(
    (_input: string | URL | Request, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('This operation was aborted', 'AbortError')))
      }),
  )
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
    // A fresh Response per call, like a real fetch, because the retry path cancels each body.
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
    expect(fetchMock).not.toHaveBeenCalled()

    // Every timer armed by the request pipeline must have a matching clearTimeout.
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
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(cancelSpies[0]).toHaveBeenCalledTimes(1)
    expect(cancelSpies[1]).not.toHaveBeenCalled()
  })

  it('retries on a transient network error (fetch rejects) then succeeds', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('ECONNRESET'))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 2 })
    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not send at all when the caller signal is already aborted', async () => {
    const controller = new AbortController()
    controller.abort()
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }))
    const onRequest = vi.fn()
    const http = new VtexHttpClient({
      account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 3, hooks: { onRequest },
    })

    const err = await http.request({ method: 'POST', path: '/x', body: {}, signal: controller.signal }).catch((e: unknown) => e)
    expect((err as Error).name).toBe('AbortError')
    expect(fetchMock).not.toHaveBeenCalled()
    expect(onRequest).not.toHaveBeenCalled()
  })

  it('honors a caller abort during fetch instead of retrying', async () => {
    const controller = new AbortController()
    const fetchMock = vi.fn().mockImplementation(() => {
      controller.abort()
      return Promise.reject(Object.assign(new Error('aborted'), { name: 'AbortError' }))
    })
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock, maxRetries: 3 })

    await expect(http.request({ method: 'GET', path: '/x', signal: controller.signal })).rejects.toThrow()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('removes combined-signal abort listeners after a normal completion (no leak)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })

    const controller = new AbortController()
    const addSpy = vi.spyOn(controller.signal, 'addEventListener')
    const removeSpy = vi.spyOn(controller.signal, 'removeEventListener')

    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x', signal: controller.signal })
    expect(out).toEqual({ ok: true })

    const abortAdds = addSpy.mock.calls.filter(([type]) => type === 'abort').length
    const abortRemoves = removeSpy.mock.calls.filter(([type]) => type === 'abort').length
    expect(abortAdds).toBeGreaterThan(0)
    expect(abortRemoves).toBe(abortAdds)

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})

describe('VtexHttpClient.requestRaw', () => {
  it('surfaces response headers and status alongside parsed data', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }, 200, { 'X-VTEX-MD-TOKEN': 'tok1' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.requestRaw<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out.data).toEqual({ ok: true })
    expect(out.status).toBe(200)
    expect(out.headers.get('X-VTEX-MD-TOKEN')).toBe('tok1')
  })

  it('request() delegates to requestRaw and returns only the parsed data', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }, 200, { 'X-VTEX-MD-TOKEN': 'tok1' }))
    const http = new VtexHttpClient({ account: 'lojax', appKey: 'K', appToken: 'T', fetch: fetchMock })
    const out = await http.request<{ ok: boolean }>({ method: 'GET', path: '/x' })
    expect(out).toEqual({ ok: true })
  })
})

describe('host and path safety', () => {
  it.each(['evil.com#', 'evil.com/', 'evil.com?', 'a.evil.com?', 'evil.com\\', 'evil.com:8443#', 'lojax.evil.com#'])(
    'rejects account %j before any request',
    (account) => {
      const fetchMock = vi.fn()
      expect(() => new VtexHttpClient({ ...BASE, account, fetch: fetchMock })).toThrow(VtexUsageError)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('rejects an injected environment', () => {
    expect(() => new VtexHttpClient({ ...BASE, environment: 'evil.com#' as never })).toThrow(VtexUsageError)
  })

  it('normalizes the account to lowercase', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, account: 'LojaX', fetch: fetchMock })
    await http.request({ method: 'GET', path: '/x' })
    expect(fetchMock.mock.calls[0][0]).toBe('https://lojax.vtexcommercestable.com.br/x')
  })

  it.each(['/a/../../dataentities/CL/search', '/a/./b', '/a/%2e%2e/b', 'relative', '/a?b=1', '/a#frag'])(
    'rejects path %j without sending',
    async (path) => {
      const fetchMock = vi.fn()
      const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
      await expect(http.request({ method: 'GET', path })).rejects.toBeInstanceOf(VtexUsageError)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('routes to an allowlisted server template with its base path', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 'g1' }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await http.request({ method: 'GET', path: '/giftcards/g1', server: 'https://{accountName}.{environment}.com.br/api' })
    expect(fetchMock.mock.calls[0][0]).toBe('https://lojax.vtexcommercestable.com.br/api/giftcards/g1')
  })

  it('refuses a non-VTEX server template', async () => {
    const fetchMock = vi.fn()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x', server: 'https://evil.example' })).rejects.toBeInstanceOf(
      VtexUsageError,
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('retry policy', () => {
  it('does not retry a POST on 503', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).rejects.toBeInstanceOf(VtexServerError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retries a POST marked idempotent on 503', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse({}, 503)).mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {}, idempotent: true })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('retries a POST on 429', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({}, 429, { 'Retry-After': '0' }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('retries a POST when the connection was refused', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(connectError('ECONNREFUSED')).mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not retry a POST when the connection was reset mid-flight', async () => {
    const reset = connectError('ECONNRESET')
    const fetchMock = vi.fn().mockRejectedValue(reset)
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    const err = await http.request({ method: 'POST', path: '/x', body: {} }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexNetworkError)
    expect(err).not.toBeInstanceOf(VtexTimeoutError)
    expect((err as VtexNetworkError).cause).toBe(reset)
    expect((err as VtexNetworkError).method).toBe('POST')
    expect((err as VtexNetworkError).route).toBe('/x')
    expect((err as VtexNetworkError).attempts).toBe(1)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not retry a POST that timed out', async () => {
    const fetchMock = hangingFetch()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3, timeoutMs: 20 })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).rejects.toBeInstanceOf(VtexTimeoutError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retries a GET that timed out, then reports VtexTimeoutError', async () => {
    const fetchMock = hangingFetch()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 1, timeoutMs: 20 })
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexTimeoutError)
    expect((err as VtexTimeoutError).attempts).toBe(2)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('idempotent: false demotes a command-style PUT so a 503 is not retried', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'PUT', path: '/x', body: {}, idempotent: false })).rejects.toBeInstanceOf(
      VtexServerError,
    )
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retry: false disables retries for a GET', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    await expect(http.request({ method: 'GET', path: '/x', retry: false })).rejects.toBeInstanceOf(VtexServerError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('retry.maxRetries overrides the client default', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503)))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 0 })
    await expect(http.request({ method: 'GET', path: '/x', retry: { maxRetries: 2 } })).rejects.toBeInstanceOf(
      VtexServerError,
    )
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })
})

describe('numeric option validation', () => {
  it.each([
    ['maxRetries', -1], ['maxRetries', 1.5], ['maxRetries', Number.NaN], ['maxRetries', Number.POSITIVE_INFINITY],
    ['timeoutMs', 0], ['timeoutMs', Number.NaN], ['timeoutMs', Number.POSITIVE_INFINITY],
    ['maxRetryAfterMs', -1], ['maxRetryAfterMs', Number.NaN], ['maxRetryAfterMs', Number.POSITIVE_INFINITY],
  ])('rejects %s = %s at construction', (name, value) => {
    expect(() => new VtexHttpClient({ ...BASE, [name]: value })).toThrow(VtexUsageError)
  })

  it('rejects invalid per-call timeout and retry options before sending', async () => {
    const fetchMock = vi.fn()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x', timeoutMs: Number.NaN })).rejects.toBeInstanceOf(VtexUsageError)
    await expect(http.request({ method: 'GET', path: '/x', retry: { maxRetries: -1 } })).rejects.toBeInstanceOf(
      VtexUsageError,
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('Retry-After handling', () => {
  it('throws immediately when Retry-After exceeds maxRetryAfterMs', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 429, { 'Retry-After': '3600' })))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    const started = Date.now()
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexRateLimitError)
    expect((err as VtexRateLimitError).retryAfter).toBe(3600)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(Date.now() - started).toBeLessThan(1_000)
  })

  it('stops waiting as soon as the caller aborts during a backoff', async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 503, { 'Retry-After': '3' })))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    const controller = new AbortController()
    let abortedAt = 0
    const pending = http.request({ method: 'GET', path: '/x', signal: controller.signal }).catch((e: unknown) => e)
    setTimeout(() => {
      abortedAt = Date.now()
      controller.abort()
    }, 30)
    const err = await pending
    expect((err as Error).name).toBe('AbortError')
    expect(Date.now() - abortedAt).toBeLessThan(200)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('redirects', () => {
  it('asks fetch for manual redirects', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    await new VtexHttpClient({ ...BASE, fetch: fetchMock }).request({ method: 'GET', path: '/x' })
    expect(fetchMock.mock.calls[0][1].redirect).toBe('manual')
  })

  it('follows a same-origin 307 preserving method and body', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 307, headers: { location: '/api/moved' } }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'POST', path: '/api/x', body: { a: 1 } })).resolves.toEqual({ ok: true })
    const [url, init] = fetchMock.mock.calls[1]
    expect(url).toBe('https://lojax.vtexcommercestable.com.br/api/moved')
    expect(init.method).toBe('POST')
    expect(init.body).toBe('{"a":1}')
  })

  it('blocks a cross-origin redirect without contacting the new host', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(
      new Response(null, { status: 302, headers: { location: 'https://evil.example/steal' } }),
    )
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexRequestError)
    expect((err as VtexRequestError).status).toBe(302)
    expect((err as Error).message).toMatch(/redirect blocked/i)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not follow a 302 for a POST', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(null, { status: 302, headers: { location: '/y' } }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'POST', path: '/x', body: {} })).rejects.toBeInstanceOf(VtexRequestError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('gives up after 3 same-origin hops', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response(null, { status: 307, headers: { location: '/loop' } })),
    )
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexRequestError)
    expect(fetchMock).toHaveBeenCalledTimes(4)
  })
})

describe('redirect origin rules', () => {
  const ORIGIN = 'https://lojax.vtexcommercestable.com.br'

  it.each([
    ['a scheme downgrade', 'http://lojax.vtexcommercestable.com.br/x'],
    ['a sibling VTEX account host', 'https://other.vtexcommercestable.com.br/x'],
    ['a protocol-relative URL', '//evil.com/x'],
    ['backslashes', 'https:\\\\evil.com/x'],
    ['a slash-backslash path', '/\\evil.com'],
    ['a non-default port', 'https://lojax.vtexcommercestable.com.br:8443/x'],
    ['userinfo on the same origin', 'https://u:p@lojax.vtexcommercestable.com.br/x'],
  ])('blocks a redirect to %s without a second request', async (_name, location) => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(null, { status: 307, headers: { location } }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexRequestError)
    expect((err as Error).message).toMatch(/redirect blocked/i)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('follows a same-origin 303 for a GET', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 303, headers: { location: '/y' } }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x' })).resolves.toEqual({ ok: true })
    expect(fetchMock.mock.calls[1][0]).toBe(`${ORIGIN}/y`)
    expect(fetchMock.mock.calls[1][1].method).toBe('GET')
  })

  it('treats a 3xx without Location as a plain error response', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(null, { status: 304 }))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock, maxRetries: 3 })
    const err = await http.request({ method: 'GET', path: '/x' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(VtexRequestError)
    expect((err as VtexRequestError).status).toBe(304)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('body read interruptions', () => {
  /** A 200 whose body never finishes until the request signal aborts. */
  function stalledBodyFetch() {
    return vi.fn((_input: string | URL | Request, init?: RequestInit) => {
      const res = new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })
      Object.defineProperty(res, 'text', {
        value: () =>
          new Promise<string>((_resolve, reject) => {
            init?.signal?.addEventListener('abort', () => reject(new DOMException('This operation was aborted', 'AbortError')))
          }),
      })
      return Promise.resolve(res)
    })
  }

  it('rethrows the caller abort reason when it happens during the body read', async () => {
    const controller = new AbortController()
    const reason = new Error('caller gave up')
    const http = new VtexHttpClient({ ...BASE, fetch: stalledBodyFetch() })
    const pending = http.request({ method: 'GET', path: '/x', signal: controller.signal }).catch((e: unknown) => e)
    setTimeout(() => controller.abort(reason), 20)
    expect(await pending).toBe(reason)
  })

  it('reports a body-read timeout as VtexTimeoutError', async () => {
    const http = new VtexHttpClient({ ...BASE, fetch: stalledBodyFetch(), timeoutMs: 20 })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexTimeoutError)
  })
})

describe('header and request validation', () => {
  it.each([
    ['a CRLF in a caller header value', { 'X-A': 'a\r\nX-Injected: 1' }],
    ['a NUL in a caller header value', { 'X-A': 'a\0b' }],
    ['an invalid header name', { 'Bad Name': 'v' }],
  ])('rejects %s before sending', async (_name, headers) => {
    const fetchMock = vi.fn()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x', headers })).rejects.toBeInstanceOf(VtexUsageError)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a malformed credential at construction without echoing it', () => {
    let caught: unknown
    try {
      new VtexHttpClient({ ...BASE, appToken: 'SUPER-SECRET-TOKEN\nX' })
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(VtexUsageError)
    expect(inspect(caught)).not.toContain('SUPER-SECRET-TOKEN')
  })

  it('rejects a body on GET and HEAD', async () => {
    const fetchMock = vi.fn()
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x', body: { a: 1 } })).rejects.toBeInstanceOf(VtexUsageError)
    await expect(http.request({ method: 'HEAD', path: '/x', body: 'x' })).rejects.toBeInstanceOf(VtexUsageError)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each(['GE T', '', 'GET\r\n'])('rejects the HTTP method %j', async (method) => {
    const http = new VtexHttpClient({ ...BASE, fetch: vi.fn() })
    await expect(http.request({ method, path: '/x' })).rejects.toBeInstanceOf(VtexUsageError)
  })

  it('skips null header values instead of sending "null"', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await http.request({ method: 'GET', path: '/x', headers: { 'X-Opt': null as never } })
    expect('X-Opt' in fetchMock.mock.calls[0][1].headers).toBe(false)
  })
})

describe('credential confidentiality', () => {
  it('never prints or serializes credentials', () => {
    const http = new VtexHttpClient({ ...BASE })
    expect(inspect(http)).not.toContain('T-SECRET')
    expect(JSON.stringify(http)).toBe('{"account":"lojax","environment":"vtexcommercestable"}')
    expect(Object.keys(http)).toEqual(['account', 'environment'])
  })

  it('cannot be re-pointed at another account at runtime', () => {
    const http = new VtexHttpClient({ ...BASE })
    expect(Object.isFrozen(http)).toBe(true)
    expect(() => {
      ;(http as unknown as { account: string }).account = 'otherstore'
    }).toThrow(TypeError)
    expect(http.account).toBe('lojax')
  })
})

describe('hooks', () => {
  it('releases the response body when onResponse throws', async () => {
    const cancel = vi.fn(() => Promise.resolve())
    const res = jsonResponse({ ok: true })
    const realBody = res.body
    Object.defineProperty(res, 'body', {
      get: () => (realBody ? new Proxy(realBody, { get: (t, p, r) => (p === 'cancel' ? cancel : Reflect.get(t, p, r)) }) : realBody),
    })
    const http = new VtexHttpClient({
      ...BASE,
      fetch: vi.fn().mockResolvedValue(res),
      hooks: { onResponse: () => { throw new Error('hook failed') } },
    })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toThrow('hook failed')
    expect(cancel).toHaveBeenCalledTimes(1)
  })
})

describe('bodies and headers', () => {
  it('sends vendor JSON with its content type', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await http.request({ method: 'POST', path: '/x', body: { a: 1 }, contentType: 'application/vnd.vtex.giftcard.v1+json' })
    const init = fetchMock.mock.calls[0][1]
    expect(init.headers['Content-Type']).toBe('application/vnd.vtex.giftcard.v1+json')
    expect(init.body).toBe('{"a":1}')
  })

  it('lets fetch set the multipart boundary for FormData', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    const form = new FormData()
    form.append('f', 'v')
    await http.request({ method: 'POST', path: '/x', body: form, contentType: 'multipart/form-data' })
    const init = fetchMock.mock.calls[0][1]
    expect(init.body).toBe(form)
    expect(Object.keys(init.headers).some((k) => k.toLowerCase() === 'content-type')).toBe(false)
  })

  it('lets caller headers override defaults case-insensitively and skips undefined values', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await http.request({
      method: 'POST', path: '/x', body: 'x', contentType: 'text/plain',
      headers: { 'content-type': 'text/csv', 'REST-Range': 'resources=0-9', 'X-Skip': undefined },
    })
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>
    expect(Object.keys(headers).filter((k) => k.toLowerCase() === 'content-type')).toEqual(['content-type'])
    expect(headers['content-type']).toBe('text/csv')
    expect(headers['REST-Range']).toBe('resources=0-9')
    expect('X-Skip' in headers).toBe(false)
  })

  it('parses vendor JSON responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('{"id":"g1"}', { headers: { 'content-type': 'application/vnd.vtex.giftcards.v1+json' } }),
    )
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x' })).resolves.toEqual({ id: 'g1' })
  })

  it('wraps a failed body read as a network error', async () => {
    const res = jsonResponse({})
    Object.defineProperty(res, 'text', { value: () => Promise.reject(new TypeError('terminated')) })
    const fetchMock = vi.fn().mockResolvedValue(res)
    const http = new VtexHttpClient({ ...BASE, fetch: fetchMock })
    await expect(http.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(VtexNetworkError)
  })
})
