import { describe, it, expect } from 'vitest'
import { methodName, dedupe, tagToNamespace } from '../../scripts/codegen/naming.js'

describe('methodName', () => {
  it('uses a sanitized operationId when present', () => {
    expect(methodName({ operationId: 'ListOrders' }, 'get', '/api/oms/pvt/orders')).toBe('listOrders')
    expect(methodName({ operationId: 'Get order' }, 'get', '/x')).toBe('getOrder')
  })
  it('derives from method + path when operationId is missing', () => {
    expect(methodName({}, 'get', '/api/oms/pvt/orders/{orderId}')).toBe('getApiOmsPvtOrdersByOrderId')
    expect(methodName({}, 'post', '/api/catalog/pvt/product')).toBe('postApiCatalogPvtProduct')
  })
  it('produces a valid identifier when the operationId starts with a digit', () => {
    const result = methodName({ operationId: '1RetrieveToken' }, 'get', '/x')
    expect(result).toBe('_1RetrieveToken')
    expect(result).toMatch(/^[A-Za-z_$][A-Za-z0-9_$]*$/)
  })
})

describe('dedupe', () => {
  it('suffixes collisions, keeping order', () => {
    expect(dedupe(['get', 'get', 'list', 'get'])).toEqual(['get', 'get2', 'list', 'get3'])
  })
  it('avoids collisions with pre-existing suffixed names', () => {
    const result = dedupe(['foo', 'foo2', 'foo'])
    expect(result).toEqual(['foo', 'foo2', 'foo3'])
    expect(new Set(result).size).toBe(result.length)
  })
  it('ensures all emitted names are globally unique', () => {
    const result = dedupe(['a', 'a', 'a2'])
    expect(new Set(result).size).toBe(result.length)
    expect(result).toEqual(['a', 'a2', 'a22'])
  })
})

describe('tagToNamespace', () => {
  it('camelCases a tag', () => {
    expect(tagToNamespace('Orders')).toBe('orders')
    expect(tagToNamespace('SKU Bindings')).toBe('skuBindings')
    expect(tagToNamespace('Promotions & Taxes')).toBe('promotionsTaxes')
  })
})
