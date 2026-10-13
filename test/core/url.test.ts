import { describe, it, expect } from 'vitest'
import {
  buildQuery, normalizeAccount, validateEnvironment, isAllowlistedHost,
  resolveServer, encodePathParam, buildRequestUrl, DEFAULT_SERVER,
} from '../../src/core/url.js'
import { VtexUsageError } from '../../src/core/errors.js'

describe('normalizeAccount', () => {
  it('lowercases a valid account', () => {
    expect(normalizeAccount('LojaX')).toBe('lojax')
    expect(normalizeAccount('my-store-1')).toBe('my-store-1')
  })
  it.each([
    'evil.com#', 'evil.com/', 'evil.com?', 'a.evil.com?', 'evil.com\\', 'evil.com:8443#',
    'lojax.evil.com#', 'x@evil.com', ' lojax', '-lojax', '',
  ])('rejects %j', (account) => {
    expect(() => normalizeAccount(account)).toThrow(VtexUsageError)
  })
  it('rejects non-strings', () => {
    expect(() => normalizeAccount(undefined)).toThrow(VtexUsageError)
  })
})

describe('validateEnvironment', () => {
  it('defaults to vtexcommercestable', () => {
    expect(validateEnvironment(undefined)).toBe('vtexcommercestable')
  })
  it('accepts vtexcommercebeta', () => {
    expect(validateEnvironment('vtexcommercebeta')).toBe('vtexcommercebeta')
  })
  it.each(['evil.com#', 'myvtex', 'VTEXCOMMERCESTABLE', ''])('rejects %j', (env) => {
    expect(() => validateEnvironment(env)).toThrow(VtexUsageError)
  })
})

describe('isAllowlistedHost', () => {
  it.each([
    'acme.vtexcommercestable.com.br', 'acme.myvtex.com', 'api.vtex.com',
    'acme.vtexpayments.com.br', 'portal.vtexcommercebeta.com.br',
  ])('allows %s', (host) => {
    expect(isAllowlistedHost(host)).toBe(true)
  })
  it.each(['evil.com', 'vtex.com.evil.com', 'evilvtex.com', 'acme.vtexcommercestable.com.br.evil.com'])(
    'blocks %s',
    (host) => {
      expect(isAllowlistedHost(host)).toBe(false)
    },
  )
})

describe('resolveServer', () => {
  it('resolves the default account host', () => {
    expect(resolveServer(DEFAULT_SERVER, 'acme', 'vtexcommercestable')).toEqual({
      origin: 'https://acme.vtexcommercestable.com.br', basePath: '',
    })
  })
  it('keeps a base path without the trailing slash', () => {
    expect(resolveServer('https://{accountName}.{environment}.com.br/api/', 'acme', 'vtexcommercebeta')).toEqual({
      origin: 'https://acme.vtexcommercebeta.com.br', basePath: '/api',
    })
  })
  it('supports account-in-path hosts', () => {
    expect(resolveServer('https://api.vtex.com/{accountName}', 'acme', 'vtexcommercestable')).toEqual({
      origin: 'https://api.vtex.com', basePath: '/acme',
    })
  })
  it('upgrades http to https', () => {
    expect(resolveServer('http://api.vtex.com', 'acme', 'vtexcommercestable').origin).toBe('https://api.vtex.com')
  })
  it.each([
    'https://evil.com', 'https://{accountName}.evil.com', 'https://{storeDomain}/api',
    'https://acme.vtexcommercestable.com.br:8443', 'https://u:p@api.vtex.com', 'ftp://api.vtex.com',
    'https://api.vtex.com/x?y=1',
  ])('rejects %s', (template) => {
    expect(() => resolveServer(template, 'acme', 'vtexcommercestable')).toThrow(VtexUsageError)
  })
})

describe('encodePathParam', () => {
  it('encodes reserved characters', () => {
    expect(encodePathParam('a/b')).toBe('a%2Fb')
    expect(encodePathParam('x?y#z')).toBe('x%3Fy%23z')
    expect(encodePathParam('../x')).toBe('..%2Fx')
    expect(encodePathParam(42)).toBe('42')
  })
  it.each(['', '.', '..'])('rejects %j', (value) => {
    expect(() => encodePathParam(value)).toThrow(VtexUsageError)
  })
  it('rejects missing values', () => {
    expect(() => encodePathParam(undefined as unknown as string)).toThrow(VtexUsageError)
  })
})

describe('buildRequestUrl', () => {
  const server = { origin: 'https://acme.vtexcommercestable.com.br', basePath: '/api' }
  it('joins base path, path and query', () => {
    expect(buildRequestUrl(server, '/giftcards/1', { a: 1 })).toBe(
      'https://acme.vtexcommercestable.com.br/api/giftcards/1?a=1',
    )
  })
  it.each(['giftcards', '/a/../b', '/a/./b', '/a/%2e%2e/b', '/a?b', '/a#b', '/a\\b', '/a b'])(
    'rejects %j',
    (path) => {
      expect(() => buildRequestUrl(server, path)).toThrow(VtexUsageError)
    },
  )
})

describe('buildQuery', () => {
  it('returns empty string for no params', () => {
    expect(buildQuery()).toBe('')
    expect(buildQuery({})).toBe('')
  })
  it('serializes scalars and skips undefined/null', () => {
    expect(buildQuery({ page: 1, q: 'a b', skip: undefined, none: null })).toBe('?page=1&q=a+b')
  })
  it('repeats array values', () => {
    expect(buildQuery({ id: [1, 2] })).toBe('?id=1&id=2')
  })
})
