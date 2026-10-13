import { describe, it, expect } from 'vitest'
import { applyOverrides, OVERRIDES, type SchemaOverride } from '../../scripts/codegen/overrides.js'

const sample: SchemaOverride[] = [
  {
    file: 'A.json',
    pointer: '/components/schemas/Headers',
    matches: (n) => n?.properties?.key !== undefined,
    transform: () => ({ type: 'object', additionalProperties: { type: 'string' } }),
    reason: 'test',
  },
  {
    file: 'A.json',
    pointer: '/paths/~1x~1{id}/get/servers',
    matches: Array.isArray,
    transform: () => undefined,
    reason: 'drop servers',
  },
]

const sampleDoc = (): any => ({
  components: { schemas: { Headers: { properties: { key: { type: 'string' } } } } },
  paths: { '/x/{id}': { get: { servers: [{ url: 'https://other.example' }] } } },
})

const otherStoreServers = () => [
  {
    url: 'https://otherstore.{environment}.com.br/api/catalog_system/pub/products/crossselling/accessories',
    variables: { environment: { default: 'DefaultParameterValue' } },
  },
]

/** Minimal copies of the current VTEX "before" shapes each shipped override targets. */
const fixtures = (): Record<string, any> => ({
  'VTEX - Orders API.json': {
    paths: {
      '/api/orders/hook/config': {
        post: {
          responses: {
            200: { content: { 'application/json': { schema: { $ref: '#/components/schemas/HookConfiguration' } } } },
          },
        },
      },
    },
    components: {
      schemas: {
        Headers: {
          title: 'Headers', required: ['key'], type: 'object',
          properties: { key: { type: 'string' } }, example: { key: 'value' },
        },
      },
    },
  },
  'VTEX - Promotions & Taxes API.json': {
    paths: {
      '/api/rnb/pvt/coupon/usage/{couponCode}': {
        get: {
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    properties: {
                      profileUsages: {
                        type: 'object',
                        description: 'Object with information where and when the coupon was used.',
                        properties: {
                          profileId: {
                            type: 'object',
                            description: 'Profile ID.',
                            properties: { orderUsage: { type: 'array', items: { type: 'object' } } },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  'VTEX - Search API.json': {
    paths: {
      '/api/catalog_system/pub/products/crossselling/showtogether/{productId}': { get: { servers: otherStoreServers() } },
      '/api/catalog_system/pub/products/crossselling/accessories/{productId}': { get: { servers: otherStoreServers() } },
    },
  },
})

describe('applyOverrides', () => {
  it('replaces or deletes the node at each pointer for the matching file', () => {
    const doc = sampleDoc()
    expect(applyOverrides('A.json', doc, sample)).toBe(2)
    expect(doc.components.schemas.Headers).toEqual({ type: 'object', additionalProperties: { type: 'string' } })
    expect('servers' in doc.paths['/x/{id}'].get).toBe(false)
  })

  it('ignores overrides for other files', () => {
    expect(applyOverrides('B.json', {}, sample)).toBe(0)
  })

  it('fails loudly, naming file, pointer and reason, when a pointer no longer resolves', () => {
    expect(() => applyOverrides('A.json', { components: { schemas: {} } }, sample)).toThrow(
      'Schema override for A.json no longer applies: /components/schemas/Headers (test)',
    )
    expect(() => applyOverrides('A.json', { components: 'x' }, sample)).toThrow(/no longer applies/)
    expect(() => applyOverrides('A.json', null, sample)).toThrow(/no longer applies/)
  })

  it('fails loudly when the node no longer has the known-bad shape', () => {
    const doc = sampleDoc()
    doc.components.schemas.Headers = { type: 'object', additionalProperties: { type: 'string' } }
    expect(() => applyOverrides('A.json', doc, sample)).toThrow(/no longer applies \(shape changed\)/)
  })

  it('requires a leading slash even when the shifted pointer would resolve', () => {
    const override: SchemaOverride = { ...sample[0], pointer: 'components/schemas/Headers' }
    const doc: any = { schemas: { Headers: { properties: { key: {} } } } }
    expect(() => applyOverrides('A.json', doc, [override])).toThrow(/no longer applies/)
    expect(doc.schemas.Headers).toEqual({ properties: { key: {} } })
  })

  it('refuses array parents', () => {
    const override: SchemaOverride = { file: 'A.json', pointer: '/a/1', matches: () => true, transform: () => undefined, reason: 'x' }
    const doc: any = { a: [1, 2] }
    expect(() => applyOverrides('A.json', doc, [override])).toThrow(/no longer applies/)
    expect(doc.a).toEqual([1, 2])
  })

  it('refuses an own __proto__ key created by JSON.parse', () => {
    const override: SchemaOverride = { file: 'A.json', pointer: '/a/__proto__', matches: () => true, transform: () => 1, reason: 'x' }
    expect(() => applyOverrides('A.json', JSON.parse('{"a":{"__proto__":{}}}'), [override])).toThrow(/no longer applies/)
  })

  it('wraps errors thrown by a matcher', () => {
    const throwing: SchemaOverride[] = [{ ...sample[0], matches: () => { throw new Error('boom') } }]
    expect(() => applyOverrides('A.json', sampleDoc(), throwing)).toThrow(/no longer applies/)
  })

  it('wraps errors thrown by a transform', () => {
    const throwing: SchemaOverride[] = [{ ...sample[0], transform: () => { throw new Error('boom') } }]
    expect(() => applyOverrides('A.json', sampleDoc(), throwing)).toThrow(/no longer applies/)
  })

  it.each(['/__proto__/toString', '/constructor/prototype', '/components/schemas/constructor', 'components/schemas/Headers'])(
    'refuses pointer %s without touching prototypes',
    (pointer) => {
      const override: SchemaOverride = { file: 'A.json', pointer, matches: () => true, transform: () => 'PWNED', reason: 'x' }
      expect(() => applyOverrides('A.json', { components: { schemas: {} } }, [override])).toThrow(/no longer applies/)
      expect(Object.prototype.toString).not.toBe('PWNED')
      expect(({} as any).constructor).toBe(Object)
    },
  )

  it('decodes ~0 and ~1 in pointer segments', () => {
    const override: SchemaOverride = { file: 'A.json', pointer: '/a~1b/c~0d', matches: () => true, transform: () => 1, reason: 'x' }
    const doc: any = { 'a/b': { 'c~d': 0 } }
    applyOverrides('A.json', doc, [override])
    expect(doc['a/b']['c~d']).toBe(1)
  })
})

describe('shipped OVERRIDES', () => {
  it('apply to the current VTEX shapes and produce the corrected schemas', () => {
    const docs = fixtures()
    let applied = 0
    for (const [file, doc] of Object.entries(docs)) applied += applyOverrides(file, doc)
    expect(applied).toBe(OVERRIDES.length)

    const orders = docs['VTEX - Orders API.json']
    expect(orders.components.schemas.Headers).toEqual({
      title: 'Headers', type: 'object', additionalProperties: { type: 'string' },
    })
    expect(orders.paths['/api/orders/hook/config'].post.responses[200].content['application/json'].schema).toEqual({})

    const usages =
      docs['VTEX - Promotions & Taxes API.json'].paths['/api/rnb/pvt/coupon/usage/{couponCode}'].get.responses[200]
        .content['application/json'].schema.properties.profileUsages
    expect(usages.properties).toBeUndefined()
    expect(usages.additionalProperties.properties.orderUsage.type).toBe('array')

    const search = docs['VTEX - Search API.json'].paths
    for (const p of Object.keys(search)) expect('servers' in search[p].get).toBe(false)
  })

  it('refuse to run once VTEX fixes a schema', () => {
    const docs = fixtures()
    docs['VTEX - Orders API.json'].paths['/api/orders/hook/config'].post.responses[200].content['application/json'].schema = {
      $ref: '#/components/schemas/HookConfigurationResponse',
    }
    expect(() => applyOverrides('VTEX - Orders API.json', docs['VTEX - Orders API.json'])).toThrow(/no longer applies/)

    const promo = fixtures()['VTEX - Promotions & Taxes API.json']
    const usages =
      promo.paths['/api/rnb/pvt/coupon/usage/{couponCode}'].get.responses[200].content['application/json'].schema
        .properties.profileUsages
    usages.properties.other = { type: 'string' }
    expect(() => applyOverrides('VTEX - Promotions & Taxes API.json', promo)).toThrow(/no longer applies/)

    const headers = fixtures()['VTEX - Orders API.json']
    headers.components.schemas.Headers.properties = { key: { type: 'string' }, other: { type: 'string' } }
    expect(() => applyOverrides('VTEX - Orders API.json', headers)).toThrow(/shape changed/)

    const search = fixtures()['VTEX - Search API.json']
    search.paths['/api/catalog_system/pub/products/crossselling/accessories/{productId}'].get.servers = [
      { url: 'https://{accountName}.{environment}.com.br' },
    ]
    expect(() => applyOverrides('VTEX - Search API.json', search)).toThrow(/shape changed/)
  })
})
