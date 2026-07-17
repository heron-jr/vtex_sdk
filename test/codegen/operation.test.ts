import { describe, it, expect } from 'vitest'
import { generateMethod } from '../../scripts/codegen/operation.js'

const refName = (r: string) => r.split('/').pop()!

describe('generateMethod', () => {
  it('emits a method with a path param and typed return', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/oms/pvt/orders/{orderId}',
      op: {
        operationId: 'GetOrder',
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } } } },
      },
      refName,
    })
    expect(code).toContain('getOrder(')
    expect(code).toContain('orderId')
    expect(code).toContain('`/api/oms/pvt/orders/${params.orderId}`')
    expect(code).toContain('Promise<Order>')
    expect(code).toContain("method: 'GET'")
  })

  it('emits a query param and request body', () => {
    const code = generateMethod({
      httpMethod: 'post',
      path: '/api/x',
      op: {
        operationId: 'DoX',
        parameters: [{ name: 'sc', in: 'query', required: false, schema: { type: 'integer' } }],
        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/XBody' } } } },
        responses: { '201': { content: { 'application/json': { schema: { type: 'object' } } } } },
      },
      refName,
    })
    expect(code).toContain('query:')
    expect(code).toContain('body:')
    expect(code).toContain('XBody')
  })

  it('derives a required path param from the path template when only a $ref parameter is declared and no resolver is given', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{orderId}',
      op: {
        operationId: 'GetX',
        parameters: [{ $ref: '#/components/parameters/orderId' }],
        responses: { '200': { content: { 'application/json': { schema: { type: 'object' } } } } },
      },
      refName,
    })
    expect(code).not.toContain('Record<string, never>')
    expect(code).toMatch(/orderId:\s*string \| number/)
    expect(code).toMatch(/\$\{params\.orderId\}|\$\{params\['orderId'\]\}/)
  })

  it('resolves a $ref path parameter via resolveRef and uses its schema type', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{orderId}',
      op: {
        operationId: 'GetX',
        parameters: [{ $ref: '#/components/parameters/orderId' }],
        responses: { '200': { content: { 'application/json': { schema: { type: 'object' } } } } },
      },
      refName,
      resolveRef: (ref) => ({ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }),
    })
    expect(code).toMatch(/orderId:\s*string(?!\s*\|)/)
  })

  it('escapes non-identifier param names in the options type, path interpolation, and query object', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{document-id}',
      op: {
        operationId: 'GetY',
        parameters: [
          { name: 'zip-code', in: 'query', required: false, schema: { type: 'string' } },
        ],
        responses: { '200': { content: { 'application/json': { schema: { type: 'object' } } } } },
      },
      refName,
    })
    expect(code).toContain("'zip-code'")
    expect(code).toContain("params['zip-code']")
    expect(code).toContain("${params['document-id']}")
  })
})
