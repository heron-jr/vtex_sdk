import { describe, it, expect } from 'vitest'
import ts from 'typescript'
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
  it('widens placeholder keys mixed with named keys to unknown', () => {
    const t = schemaToType({ type: 'object', properties: { id: { type: 'string' }, '{field}': { type: 'number' } } }, ref)
    expect(t).toBe('{\n  id?: string\n  [key: string]: unknown\n}')
  })
  it('never emits a duplicate null', () => {
    expect(schemaToType({ type: 'string', enum: ['a', null], nullable: true }, ref)).toBe('"a" | null')
    expect(schemaToType({ type: ['string', 'null'], nullable: true }, ref)).toBe('string | null')
  })
  it('makes an intersection nullable as a whole', () => {
    const t = schemaToType({ allOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }], nullable: true }, ref)
    expect(t).toBe('A & B | null')
  })
  it('handles type arrays with several or no entries', () => {
    expect(schemaToType({ type: ['string', 'integer', 'null'] }, ref)).toBe('string | number | null')
    expect(schemaToType({ type: ['integer', 'number'] }, ref)).toBe('number')
    expect(schemaToType({ type: [] }, ref)).toBe('unknown')
    expect(schemaToType({ type: [], nullable: true }, ref)).toBe('unknown')
  })
  it('stays linear on repetitive nested type arrays', () => {
    let schema: any = { type: 'string' }
    for (let i = 0; i < 12; i++) {
      schema = { type: ['object', 'object', 'object', 'object'], properties: { a: schema } }
    }
    const start = Date.now()
    schemaToType(schema, ref)
    expect(Date.now() - start).toBeLessThan(1000)
  })
  it('distinguishes additionalProperties false and {}', () => {
    expect(schemaToType({ type: 'object', additionalProperties: false }, ref)).toBe('Record<string, never>')
    expect(schemaToType({ type: 'object', additionalProperties: {} }, ref)).toBe('{\n  [key: string]: unknown\n}')
  })
  it('quotes keys that are not identifiers', () => {
    expect(schemaToType({ type: 'object', properties: { 'x-y': { type: 'string' } }, required: ['x-y'] }, ref)).toBe(
      '{\n  "x-y": string\n}',
    )
  })
  it('parenthesizes only top-level unions in array items', () => {
    expect(schemaToType({ type: 'array', items: { type: 'object', properties: { a: { type: 'string', nullable: true } } } }, ref)).toBe(
      '{\n  a?: string | null\n}[]',
    )
    expect(schemaToType({ type: 'array', items: { type: 'array', items: { type: 'string', nullable: true } } }, ref)).toBe(
      '(string | null)[][]',
    )
    expect(schemaToType({ type: 'array', items: { type: 'string', enum: ['a|b', 'c'] } }, ref)).toBe('("a|b" | "c")[]')
  })
  it('rejects a non-string $ref with a clear error', () => {
    expect(() => schemaToType({ $ref: 123 }, ref)).toThrow(/Invalid \$ref/)
    expect(() => schemaToType({ $ref: '' }, ref)).toThrow(/Invalid \$ref/)
  })
  it('emits syntactically valid TypeScript for odd inputs', () => {
    const odd = [
      { type: [] }, { type: [], nullable: true }, { enum: ['*/', '`${x}`', '"; export const x = 1; //', '\u2028'] },
      { type: 'object', properties: JSON.parse('{"*/ evil":{"type":"string"},"__proto__":{"type":"number"}}') },
      { allOf: [{ oneOf: [{ type: 'string' }, { type: 'number' }] }, { type: 'object', additionalProperties: true }] },
    ]
    for (const schema of odd) {
      const out = ts.transpileModule(`type T = ${schemaToType(schema, ref)}`, { reportDiagnostics: true })
      expect(out.diagnostics ?? []).toEqual([])
    }
  })
})
