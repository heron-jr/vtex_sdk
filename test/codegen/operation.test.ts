import { describe, it, expect } from 'vitest'
import { generateMethod } from '../../scripts/codegen/operation.js'

const refName = (r: string) => r.split('/').pop()!
const ok = { '200': { content: { 'application/json': { schema: { type: 'object' } } } } }

describe('generateMethod', () => {
  it('emits an encoded path param, typed return and per-call options', () => {
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
    expect(code).toContain('getOrder(params: {')
    expect(code).toContain('opts?: CallOptions): Promise<Order>')
    expect(code).toContain('`/api/oms/pvt/orders/${encodePathParam(params.orderId)}`')
    expect(code).toContain("method: 'GET'")
    expect(code).toContain('withCall({')
    expect(code).not.toContain('server:')
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
    expect(code).toContain('body: params.body')
    expect(code).toContain('XBody')
    expect(code).not.toContain('contentType:')
  })

  it('derives a required path param from the path template when only a $ref parameter is declared and no resolver is given', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{orderId}',
      op: {
        operationId: 'GetX',
        parameters: [{ $ref: '#/components/parameters/orderId' }],
        responses: ok,
      },
      refName,
    })
    expect(code).not.toContain('Record<string, never>')
    expect(code).toMatch(/orderId:\s*string \| number/)
    expect(code).toContain('${encodePathParam(params.orderId)}')
  })

  it('resolves a $ref path parameter via resolveRef and uses its schema type', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{orderId}',
      op: {
        operationId: 'GetX',
        parameters: [{ $ref: '#/components/parameters/orderId' }],
        responses: ok,
      },
      refName,
      resolveRef: () => ({ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }),
    })
    expect(code).toMatch(/orderId:\s*string(?!\s*\|)/)
  })

  it('never types a path param as nullable', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{id}',
      op: {
        operationId: 'GetX',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', nullable: true } }],
        responses: ok,
      },
      refName,
    })
    expect(code).toMatch(/id: string\n/)
  })

  it('escapes non-identifier param names in the options type, path interpolation, and query object', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/x/{document-id}',
      op: {
        operationId: 'GetY',
        parameters: [{ name: 'zip-code', in: 'query', required: false, schema: { type: 'string' } }],
        responses: ok,
      },
      refName,
    })
    expect(code).toContain("'zip-code'")
    expect(code).toContain("params['zip-code']")
    expect(code).toContain("${encodePathParam(params['document-id'])}")
  })

  it('makes params optional when nothing is required', () => {
    const none = generateMethod({ httpMethod: 'get', path: '/api/feed/config', op: { operationId: 'GetFeedConfig', responses: ok }, refName })
    expect(none).toContain('getFeedConfig(params: Record<string, never> = {}, opts?: CallOptions)')
    const optionalQuery = generateMethod({
      httpMethod: 'get',
      path: '/api/x',
      op: { operationId: 'X', parameters: [{ name: 'q', in: 'query', schema: { type: 'string' } }], responses: ok },
      refName,
    })
    expect(optionalQuery).toContain('} = {}, opts?: CallOptions)')
  })

  it('exposes schema header params but never SDK-managed headers', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/api/dataentities/{acronym}/search',
      op: {
        operationId: 'Search',
        parameters: [
          { name: 'acronym', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'REST-Range', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'Accept', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'X-VTEX-API-AppToken', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'Host', in: 'header', required: false, schema: { type: 'string' } },
        ],
        responses: ok,
      },
      refName,
    })
    expect(code).toContain("'REST-Range': string")
    expect(code).toContain("headers: { 'REST-Range': params['REST-Range'] }")
    expect(code).not.toContain("'Accept'")
    expect(code).not.toContain('AppToken')
    expect(code).not.toContain("'Host'")
  })

  it('sends vendor JSON bodies with their content type and server', () => {
    const code = generateMethod({
      httpMethod: 'post',
      path: '/giftcards',
      op: {
        operationId: 'CreateGiftCard',
        requestBody: { content: { 'application/vnd.vtex.giftcard.v1+json': { schema: { $ref: '#/components/schemas/CreateGiftCardRequest' } } } },
        responses: { '201': { content: { 'application/vnd.vtex.giftcard.v1+json': { schema: { $ref: '#/components/schemas/GiftCard' } } } } },
      },
      refName,
      server: 'https://{accountName}.{environment}.com.br/api',
    })
    expect(code).toContain('body: CreateGiftCardRequest')
    expect(code).toContain("contentType: 'application/vnd.vtex.giftcard.v1+json'")
    expect(code).toContain("server: 'https://{accountName}.{environment}.com.br/api'")
    expect(code).toContain('Promise<GiftCard>')
  })

  it('omits the server when it is the default account host', () => {
    const code = generateMethod({
      httpMethod: 'get', path: '/x', op: { operationId: 'X', responses: ok }, refName,
      server: 'https://{accountName}.{environment}.com.br',
    })
    expect(code).not.toContain('server:')
  })

  it('types multipart, form and text bodies', () => {
    const gen = (ct: string) =>
      generateMethod({
        httpMethod: 'post',
        path: '/x',
        op: { operationId: 'Up', requestBody: { content: { [ct]: { schema: { type: 'object' } } } }, responses: ok },
        refName,
      })
    expect(gen('multipart/form-data')).toContain('body: FormData')
    expect(gen('multipart/form-data')).toContain("contentType: 'multipart/form-data'")
    expect(gen('form-data')).toContain("contentType: 'multipart/form-data'")
    expect(gen('application/x-www-form-urlencoded')).toContain('body: URLSearchParams | Record<string, string>')
    expect(gen('text/csv')).toContain('body: string')
    expect(gen('text/csv')).toContain("contentType: 'text/csv'")
  })

  it('refuses unsafe paths', () => {
    for (const path of ['/a/`x`', '/a/${x}', '/a b', '/a\\b', '/a/{bad name}']) {
      expect(() =>
        generateMethod({ httpMethod: 'get', path, op: { operationId: 'X', responses: ok }, refName }),
      ).toThrow(/unsafe/)
    }
  })
})
