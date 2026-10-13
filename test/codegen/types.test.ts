import { describe, it, expect } from 'vitest'
import { schemaToType } from '../../scripts/codegen/types.js'

const ref = (r: string) => r.split('/').pop()!

describe('schemaToType', () => {
  it('maps primitives', () => {
    expect(schemaToType({ type: 'string' }, ref)).toBe('string')
    expect(schemaToType({ type: 'integer' }, ref)).toBe('number')
    expect(schemaToType({ type: 'boolean' }, ref)).toBe('boolean')
  })
  it('maps $ref to the type name', () => {
    expect(schemaToType({ $ref: '#/components/schemas/Order' }, ref)).toBe('Order')
  })
  it('maps arrays', () => {
    expect(schemaToType({ type: 'array', items: { type: 'string' } }, ref)).toBe('string[]')
  })
  it('maps enums to unions', () => {
    expect(schemaToType({ type: 'string', enum: ['a', 'b'] }, ref)).toBe('"a" | "b"')
  })
  it('maps objects with required/optional props', () => {
    const t = schemaToType(
      { type: 'object', properties: { id: { type: 'string' }, n: { type: 'integer' } }, required: ['id'] },
      ref,
    )
    expect(t).toContain('id: string')
    expect(t).toContain('n?: number')
  })
  it('falls back to unknown', () => {
    expect(schemaToType({}, ref)).toBe('unknown')
  })
  it('handles edge cases without throwing', () => {
    expect(schemaToType({ type: 'string', enum: [] }, ref)).toBe('string')
    expect(schemaToType({ allOf: [] }, ref)).toBe('unknown')
    expect(schemaToType({ type: 'array' }, ref)).toBe('unknown[]')
    expect(schemaToType({ type: 'object' }, ref)).toBe('Record<string, unknown>')
    expect(schemaToType(null, ref)).toBe('unknown')
  })
  it('handles non-array required field without throwing', () => {
    const t1 = schemaToType({ type: 'object', properties: { id: { type: 'string' } }, required: {} }, ref)
    expect(t1).toContain('id?: string')
    const t2 = schemaToType(
      { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } }, required: 'id' },
      ref,
    )
    expect(t2).toContain('id?: string')
    expect(t2).toContain('name?: string')
  })

  it('models nullable', () => {
    expect(schemaToType({ type: 'string', nullable: true }, ref)).toBe('string | null')
    expect(schemaToType({ $ref: '#/components/schemas/Order', nullable: true }, ref)).toBe('Order | null')
  })
  it('models OpenAPI 3.1 type arrays', () => {
    expect(schemaToType({ type: ['string', 'null'] }, ref)).toBe('string | null')
  })
  it('parenthesizes union item types in arrays', () => {
    expect(schemaToType({ type: 'array', items: { type: 'string', enum: ['a', 'b'] } }, ref)).toBe('("a" | "b")[]')
    expect(schemaToType({ type: 'array', items: { type: 'string', nullable: true } }, ref)).toBe('(string | null)[]')
  })
  it('parenthesizes unions inside intersections', () => {
    const schema = {
      allOf: [
        { $ref: '#/components/schemas/A' },
        { oneOf: [{ $ref: '#/components/schemas/B' }, { $ref: '#/components/schemas/C' }] },
      ],
    }
    expect(schemaToType(schema, ref)).toBe('A & (B | C)')
  })
  it('turns additionalProperties into an index signature', () => {
    expect(schemaToType({ type: 'object', additionalProperties: { type: 'string' } }, ref)).toBe(
      '{\n  [key: string]: string\n}',
    )
    expect(schemaToType({ type: 'object', additionalProperties: true }, ref)).toBe('{\n  [key: string]: unknown\n}')
  })
  it('widens the index signature to unknown when named properties are present', () => {
    const t = schemaToType(
      { type: 'object', properties: { id: { type: 'string' } }, additionalProperties: { type: 'number' } },
      ref,
    )
    expect(t).toBe('{\n  id?: string\n  [key: string]: unknown\n}')
  })
  it('maps placeholder keys like {fieldName} to an index signature', () => {
    expect(schemaToType({ type: 'object', properties: { '{fieldName}': { type: 'string' } } }, ref)).toBe(
      '{\n  [key: string]: string\n}',
    )
  })
})
