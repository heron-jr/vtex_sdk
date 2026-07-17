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
    // Empty enum array falls through to type
    expect(schemaToType({ type: 'string', enum: [] }, ref)).toBe('string')
    // Empty allOf falls through
    expect(schemaToType({ allOf: [] }, ref)).toBe('unknown')
    // Missing items on array
    expect(schemaToType({ type: 'array' }, ref)).toBe('unknown[]')
    // Object without properties
    expect(schemaToType({ type: 'object' }, ref)).toBe('Record<string, unknown>')
    // Null schema
    expect(schemaToType(null, ref)).toBe('unknown')
  })
  it('handles non-array required field without throwing', () => {
    // required as object (not array)
    const t1 = schemaToType(
      { type: 'object', properties: { id: { type: 'string' } }, required: {} },
      ref,
    )
    expect(t1).toContain('id?: string')
    // required as string (not array)
    const t2 = schemaToType(
      { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } }, required: 'id' },
      ref,
    )
    expect(t2).toContain('id?: string')
    expect(t2).toContain('name?: string')
  })
})
