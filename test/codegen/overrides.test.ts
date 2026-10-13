import { describe, it, expect } from 'vitest'
import { applyOverrides, OVERRIDES, type SchemaOverride } from '../../scripts/codegen/overrides.js'

const sample: SchemaOverride[] = [
  {
    file: 'A.json',
    pointer: '/components/schemas/Headers',
    transform: () => ({ type: 'object', additionalProperties: { type: 'string' } }),
    reason: 'test',
  },
  {
    file: 'A.json',
    pointer: '/paths/~1x~1{id}/get/servers',
    transform: () => undefined,
    reason: 'drop servers',
  },
]

describe('applyOverrides', () => {
  it('replaces or deletes the node at each pointer for the matching file', () => {
    const doc: any = {
      components: { schemas: { Headers: { properties: { key: { type: 'string' } } } } },
      paths: { '/x/{id}': { get: { servers: [{ url: 'https://other.example' }] } } },
    }
    expect(applyOverrides('A.json', doc, sample)).toBe(2)
    expect(doc.components.schemas.Headers).toEqual({ type: 'object', additionalProperties: { type: 'string' } })
    expect('servers' in doc.paths['/x/{id}'].get).toBe(false)
  })

  it('ignores overrides for other files', () => {
    expect(applyOverrides('B.json', {}, sample)).toBe(0)
  })

  it('fails loudly when a pointer no longer resolves', () => {
    expect(() => applyOverrides('A.json', { components: { schemas: {} } }, sample)).toThrow(/no longer applies/)
  })

  it('ships the documented overrides', () => {
    expect(OVERRIDES.map((o) => `${o.file} ${o.pointer}`)).toEqual([
      'VTEX - Orders API.json /components/schemas/Headers',
      'VTEX - Orders API.json /paths/~1api~1orders~1hook~1config/post/responses/200/content/application~1json/schema',
      'VTEX - Promotions & Taxes API.json /paths/~1api~1rnb~1pvt~1coupon~1usage~1{couponCode}/get/responses/200/content/application~1json/schema/properties/profileUsages',
      'VTEX - Search API.json /paths/~1api~1catalog_system~1pub~1products~1crossselling~1showtogether~1{productId}/get/servers',
      'VTEX - Search API.json /paths/~1api~1catalog_system~1pub~1products~1crossselling~1accessories~1{productId}/get/servers',
    ])
  })
})
