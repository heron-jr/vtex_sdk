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
})

describe('dedupe', () => {
  it('suffixes collisions, keeping order', () => {
    expect(dedupe(['get', 'get', 'list', 'get'])).toEqual(['get', 'get2', 'list', 'get3'])
  })
})

describe('tagToNamespace', () => {
  it('camelCases a tag', () => {
    expect(tagToNamespace('Orders')).toBe('orders')
    expect(tagToNamespace('SKU Bindings')).toBe('skuBindings')
    expect(tagToNamespace('Promotions & Taxes')).toBe('promotionsTaxes')
  })
})
