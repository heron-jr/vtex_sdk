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
})
