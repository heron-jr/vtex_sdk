import { describe, it, expect } from 'vitest'
import ts from 'typescript'
import { generateMethod } from '../../scripts/codegen/operation.js'
import { isValidHeaderValue } from '../../src/core/headers.js'

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
    for (const path of [
      '/a/`x`', '/a/${x}', '/a b', '/a\\b', '/a/{bad name}', "/a/{x'y}", '/a/{a:b}',
      '/a/../b', '/a/%2e%2e/b', '/a/%2E/b', '//x', '/a//b', '/a/{', '/a/}', '/a/{}', '/a/%zz', '/a/{constructor}',
    ]) {
      expect(() =>
        generateMethod({ httpMethod: 'get', path, op: { operationId: 'X', responses: ok }, refName }),
      ).toThrow(/unsafe/)
    }
  })

  it('keeps mid-segment placeholders', () => {
    const code = generateMethod({
      httpMethod: 'get', path: '/c/carrier@{capacityType}@{shippingPolicyId}', op: { operationId: 'X', responses: ok }, refName,
    })
    expect(code).toContain('`/c/carrier@${encodePathParam(params.capacityType)}@${encodePathParam(params.shippingPolicyId)}`')
  })

  it('escapes quotes, backslashes and line terminators in string literals', () => {
    const sep = String.fromCharCode(0x2028)
    const code = generateMethod({
      httpMethod: 'get',
      path: '/x',
      op: {
        operationId: 'X',
        parameters: [
          { name: "a'b", in: 'query', schema: { type: 'string' } },
          { name: 'a\\b', in: 'query', schema: { type: 'string' } },
          { name: `l\n${sep}`, in: 'query', schema: { type: 'string' } },
        ],
        responses: ok,
      },
      refName,
    })
    expect(code).toContain("'a\\'b': params['a\\'b']")
    expect(code).toContain("'a\\\\b': params['a\\\\b']")
    expect(code).toContain("'l\\u000a\\u2028'")
    expect(code).not.toContain('\n' + sep)
  })

  it('refuses invalid header names, reserved names and a body/param clash', () => {
    const gen = (op: any, httpMethod = 'post', name?: string) =>
      () => generateMethod({ httpMethod, path: '/x', op: { operationId: 'X', responses: ok, ...op }, refName, name })
    expect(gen({ parameters: [{ name: 'X-VTEX-API-AppToken ', in: 'header' }] })).toThrow(/invalid header name/)
    expect(gen({ parameters: [{ name: ' Authorization', in: 'header' }] })).toThrow(/invalid header name/)
    expect(gen({ parameters: [{ name: '__proto__', in: 'query' }] })).toThrow(/parameter named/)
    expect(gen({ parameters: [{ name: 'constructor', in: 'query' }] })).toThrow(/parameter named/)
    expect(gen({ parameters: [{ name: 'toString', in: 'query' }] })).toThrow(/parameter named/)
    expect(gen({ parameters: [{ name: 'valueOf', in: 'header' }] })).toThrow(/parameter named/)
    expect(gen({ parameters: [{ name: 'constructor', in: 'cookie' }] })).not.toThrow()
    expect(
      gen({ requestBody: { content: { 'application/vnd.x+json;\r\nX-Evil: 1': { schema: { type: 'object' } } } } }),
    ).toThrow(/content type/)
    expect(gen({}, 'get', 'constructor')).toThrow(/method named/)
    expect(gen({}, 'get', 'http')).toThrow(/method named/)
    expect(gen({}, 'trace')).toThrow(/HTTP method/)
    expect(
      gen({
        parameters: [{ name: 'body', in: 'query', schema: { type: 'string' } }],
        requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
      }),
    ).toThrow(/named "body"/)
  })

  it('requires params when only a header or only a body is required', () => {
    const header = generateMethod({
      httpMethod: 'get', path: '/x', refName,
      op: { operationId: 'X', parameters: [{ name: 'X-Tenant', in: 'header', required: true, schema: { type: 'string' } }], responses: ok },
    })
    expect(header).toContain('x(params: {')
    expect(header).not.toContain('} = {}')
    const body = generateMethod({
      httpMethod: 'post', path: '/x', refName,
      op: { operationId: 'X', requestBody: { content: { 'application/json': { schema: { type: 'object' } } } }, responses: ok },
    })
    expect(body).not.toContain('} = {}')
  })

  it('limits header and path param types to what the runtime sends', () => {
    const code = generateMethod({
      httpMethod: 'get',
      path: '/x/{flag}/{id}',
      refName,
      op: {
        operationId: 'X',
        parameters: [
          { name: 'flag', in: 'path', schema: { type: 'boolean' } },
          { name: 'id', in: 'path', schema: { type: 'integer' } },
          { name: 'X-List', in: 'header', schema: { type: 'array', items: { type: 'string' } } },
          { name: 'X-Mode', in: 'header', schema: { type: 'string', enum: ['a', 'b'], nullable: true } },
        ],
        responses: ok,
      },
    })
    expect(code).toContain('  flag: string | number')
    expect(code).toContain('  id: number')
    expect(code).toMatch(/^  'X-List'\?: string$/m)
    expect(code).toContain(`  'X-Mode'?: "a" | "b"`)
  })

  it('uses exact JSON media types and sends other bodies as bytes', () => {
    const gen = (ct: string) =>
      generateMethod({
        httpMethod: 'post', path: '/x', refName,
        op: { operationId: 'X', requestBody: { content: { [ct]: { schema: { type: 'object' } } } }, responses: ok },
      })
    expect(gen('application/json-patch+json')).toContain("contentType: 'application/json-patch+json'")
    expect(gen('application/json; charset=utf-8')).not.toContain('contentType:')
    expect(gen('application/octet-stream')).toContain('body: Blob | ArrayBuffer | Uint8Array | string')
    expect(gen('application/octet-stream')).toContain("contentType: 'application/octet-stream'")
    expect(gen('*/*')).toContain("contentType: 'application/octet-stream'")
    expect(gen('multipart/form-data; boundary=x')).toContain('body: FormData')
  })

  it('emits exactly one well-formed method for hostile schema values', () => {
    const hostile = ["'", '\\', '`', '${x}', '*/', '\r\n', String.fromCharCode(0x2028), '"; }; x(); //']
    for (const h of hostile) {
      const code = generateMethod({
        httpMethod: 'post',
        path: '/x',
        refName,
        server: `https://api.vtex.com/{accountName}${h}`,
        op: {
          operationId: 'X',
          parameters: [{ name: `q${h}`, in: 'query', schema: { type: 'string', enum: [h] } }],
          // Content types that aren't valid header values are refused (tested above); the rest are escaped.
          requestBody: {
            content: {
              [isValidHeaderValue(h) ? `application/vnd.x+json;${h}` : 'application/vnd.x+json']: {
                schema: { type: 'object', properties: { [h]: { type: 'string' } } },
              },
            },
          },
          responses: ok,
        },
      })
      const source = ts.createSourceFile('m.ts', `class C {\n${code}\n}`, ts.ScriptTarget.ES2022, true)
      expect((source as unknown as { parseDiagnostics: unknown[] }).parseDiagnostics).toEqual([])
      const cls = source.statements[0] as ts.ClassDeclaration
      expect(source.statements).toHaveLength(1)
      expect(cls.members).toHaveLength(1)
      const method = cls.members[0] as ts.MethodDeclaration
      expect(method.body?.statements).toHaveLength(1)
      expect(ts.isReturnStatement(method.body!.statements[0])).toBe(true)
    }
  })
})
