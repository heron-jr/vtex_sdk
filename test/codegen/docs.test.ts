import { describe, it, expect } from 'vitest'
import { generateMethod, type GeneratedParam } from '../../scripts/codegen/operation.js'
import {
  PORTAL_BASE,
  callSignature,
  code,
  plain,
  portalUrl,
  renderApiDoc,
  renderIndex,
  type DocApi,
} from '../../scripts/codegen/docs.js'
import { DEFAULT_SERVER } from '../../src/core/url.js'

const refName = (r: string) => r.split('/').pop()!
const src = { repo: 'vtex/openapi-schemas', ref: 'a'.repeat(40) }

describe('generateMethod params metadata', () => {
  it('reports path, query, header and body keys in emitted order without changing the code', () => {
    const op = {
      parameters: [
        { name: 'orderId', in: 'path', required: true, schema: { type: 'string' } },
        { name: 'fields', in: 'query', required: false, schema: { type: 'string' } },
        { name: 'REST-Range', in: 'header', required: true, schema: { type: 'string' } },
        { name: 'Accept', in: 'header', required: true, schema: { type: 'string' } },
      ],
      requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
    }
    const params: GeneratedParam[] = []
    const base = { httpMethod: 'post', path: '/api/x/{orderId}', op, refName, name: 'doIt' }
    const withMeta = generateMethod({ ...base, params })
    expect(withMeta).toBe(generateMethod(base))
    expect(params).toEqual([
      { name: 'orderId', in: 'path', required: true },
      { name: 'fields', in: 'query', required: false },
      { name: 'REST-Range', in: 'header', required: true },
      { name: 'body', in: 'body', required: true },
    ])
  })
})

describe('docs helpers', () => {
  it('renders upstream text as plain, escaped, single-line Markdown', () => {
    expect(plain('Get <script>alert(1)</script>\n| *x* `y`')).toBe('Get \\<script\\>alert(1)\\</script\\> \\| \\*x\\* \\`y\\`')
    expect(plain(undefined)).toBe('')
    expect(plain('a'.repeat(200), 10)).toBe(`${'a'.repeat(9)}…`)
  })

  it('keeps code spans valid and table-safe', () => {
    expect(code('a|b')).toBe('`a b`')
    expect(code('a`b')).toBe('`` a`b ``')
  })

  it('lists only required keys in the call signature', () => {
    const op = {
      ns: 'orders', name: 'getOrder', httpMethod: 'get', path: '/x', server: DEFAULT_SERVER, summary: '', deprecated: false,
      params: [
        { name: 'orderId', in: 'path', required: true },
        { name: 'X-Flag', in: 'header', required: true },
        { name: 'q', in: 'query', required: false },
      ] as GeneratedParam[],
    }
    expect(callSignature(op)).toBe("orders.getOrder({ orderId, 'X-Flag': … })")
    expect(callSignature({ ...op, params: [] })).toBe('orders.getOrder()')
  })

  it('maps schema files to portal pages, with overrides and missing pages', () => {
    expect(portalUrl('VTEX - Orders API.json')).toBe(`${PORTAL_BASE}/orders-api`)
    expect(portalUrl('VTEX - Promotions & Taxes API.json')).toBe(`${PORTAL_BASE}/promotions-and-taxes-api`)
    expect(portalUrl('VTEX - Tracking.json')).toBeUndefined()
  })
})

describe('renderApiDoc / renderIndex', () => {
  const api: DocApi = {
    title: 'Orders API',
    file: 'VTEX - Orders API.json',
    slug: 'orders-api',
    rawNs: 'ordersAPI',
    typesNs: 'OrdersApiTypes',
    excludedCount: 1,
    operations: [
      {
        ns: 'orders', name: 'getOrder', httpMethod: 'get', path: '/api/oms/pvt/orders/{orderId}', server: DEFAULT_SERVER,
        summary: 'Get order', deprecated: false, params: [{ name: 'orderId', in: 'path', required: true }],
      },
      {
        ns: 'orders', name: 'oldThing', httpMethod: 'post', path: '/old', server: 'https://api.vtex.com/{accountName}',
        summary: 'Old', deprecated: true, params: [{ name: 'body', in: 'body', required: true }, { name: 'q', in: 'query', required: false }],
      },
    ],
  }

  it('renders a namespace table with HTTP, hosts and optional keys', () => {
    const md = renderApiDoc(api, src)
    expect(md).toContain('| SDK namespace | `vtex.raw.ordersAPI` |')
    expect(md).toContain('1 not callable')
    expect(md).toContain('| Call | HTTP | Host | Summary | Optional |')
    expect(md).toContain('| `orders.getOrder({ orderId })` | `GET /api/oms/pvt/orders/{orderId}` |')
    expect(md).toContain('| `orders.oldThing({ body })` | `POST /{accountName}/old` | `https://api.vtex.com` | **Deprecated.** Old | `q` |')
    expect(md).toContain(`blob/${src.ref}/VTEX%20-%20Orders%20API.json`)
  })

  it('renders types-only APIs without operation tables', () => {
    const md = renderApiDoc({ ...api, rawNs: undefined, operations: [] }, src)
    expect(md).toContain('not callable through `vtex.raw`')
    expect(md).not.toContain('| Call |')
  })

  it('indexes callable and types-only APIs', () => {
    const md = renderIndex([api, { ...api, title: 'Tracking', file: 'VTEX - Tracking.json', slug: 'tracking', rawNs: undefined, operations: [] }], src)
    expect(md).toContain('1 APIs and 2 operations are callable')
    expect(md).toContain('| [Orders API](./orders-api.md) | `vtex.raw.ordersAPI` | 2 |')
    expect(md).toContain('| [Tracking](./tracking.md) | `OrdersApiTypes` | — |')
  })
})
