import { describe, it, expect } from 'vitest'
import {
  buildQuery, normalizeAccount, validateEnvironment, isAllowlistedHost,
  resolveServer, encodePathParam, buildRequestUrl, DEFAULT_SERVER,
  VTEX_DOMAIN_ALLOWLIST, VTEX_ENVIRONMENTS,
} from '../../src/core/url.js'
import { VtexUsageError } from '../../src/core/errors.js'

const BACKSLASH = String.fromCharCode(92)

describe('normalizeAccount', () => {
  it('lowercases a valid account', () => {
    expect(normalizeAccount('LojaX')).toBe('lojax')
    expect(normalizeAccount('my-store-1')).toBe('my-store-1')
  })
  it('accepts the 63-character boundary', () => {
    expect(normalizeAccount('a'.repeat(63))).toHaveLength(63)
  })
  it.each([
    'evil.com#', 'evil.com/', 'evil.com?', 'a.evil.com?', 'evil.com\\', 'evil.com:8443#',
    'lojax.evil.com#', 'x@evil.com', ' lojax', '-lojax', '',
    'a.b', 'lojax.evil.com', 'acme.', '.acme', 'a'.repeat(64), 'acme\n', 'acme\t', 'acme-', 'a_b',
    'Kacme',
  ])('rejects %j', (account) => {
    expect(() => normalizeAccount(account)).toThrow(VtexUsageError)
  })
  it.each([undefined, null, 123, {}, ['acme']])('rejects non-string %j', (account) => {
    expect(() => normalizeAccount(account)).toThrow(VtexUsageError)
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
    'vtex.com', 'myvtex.com', 'ACME.MyVtex.com',
  ])('allows %s', (host) => {
    expect(isAllowlistedHost(host)).toBe(true)
  })
  it.each([
    'evil.com', 'vtex.com.evil.com', 'evilvtex.com', 'acme.vtexcommercestable.com.br.evil.com',
    'acme.vtexcommercestable.com.br.', '127.0.0.1', '[::1]', '', 'a..vtex.com', ' api.vtex.com',
    'evil.com/.vtex.com',
  ])('blocks %j', (host) => {
    expect(isAllowlistedHost(host)).toBe(false)
  })
  it('cannot be widened at runtime', () => {
    expect(Object.isFrozen(VTEX_DOMAIN_ALLOWLIST)).toBe(true)
    expect(Object.isFrozen(VTEX_ENVIRONMENTS)).toBe(true)
    expect(() => (VTEX_DOMAIN_ALLOWLIST as string[]).push('attacker.example')).toThrow(TypeError)
    expect(isAllowlistedHost('attacker.example')).toBe(false)
  })
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
    'https://api.vtex.com/#frag',
    'https://api.vtex.com/{storeDomain}',
    'https://{accountName}@api.vtex.com',
    'https://api.vtex.com:{accountName}',
    `https://evil.com${BACKSLASH}@api.vtex.com`,
    'https://evil.com#@api.vtex.com',
    'https://api.vtex.com\t.evil.com',
    'https://vtеx.com',
    'https://127.0.0.1',
    'https://[::1]',
    'https://acme.vtexcommercestable.com.br.',
  ])('rejects %j', (template) => {
    expect(() => resolveServer(template, 'acme', 'vtexcommercestable')).toThrow(VtexUsageError)
  })
  it('never lets a backslash smuggle a second host', () => {
    expect(resolveServer(`https://api.vtex.com${BACKSLASH}@evil.com`, 'acme', 'vtexcommercestable').origin).toBe(
      'https://api.vtex.com',
    )
  })
  it('validates the account and environment itself (defense in depth)', () => {
    expect(() => resolveServer('https://api.vtex.com/{accountName}', '../../x', 'vtexcommercestable')).toThrow(VtexUsageError)
    expect(() => resolveServer('https://api.vtex.com/{accountName}', 'evil.com#', 'vtexcommercestable')).toThrow(VtexUsageError)
    expect(() => resolveServer(DEFAULT_SERVER, 'acme', 'evil.com#' as never)).toThrow(VtexUsageError)
  })
})

describe('encodePathParam', () => {
  it('encodes reserved characters', () => {
    expect(encodePathParam('a/b')).toBe('a%2Fb')
    expect(encodePathParam('x?y#z')).toBe('x%3Fy%23z')
    expect(encodePathParam('../x')).toBe('..%2Fx')
    expect(encodePathParam(42)).toBe('42')
  })
  it('double-encodes percent signs so %2e%2e stays a literal id', () => {
    expect(encodePathParam('%2e%2e')).toBe('%252e%252e')
    expect(encodePathParam('...')).toBe('...')
  })
  it.each(['', '.', '..'])('rejects %j', (value) => {
    expect(() => encodePathParam(value)).toThrow(VtexUsageError)
  })
  it.each([undefined, null, Number.NaN, Number.POSITIVE_INFINITY, {}, ['a', 'b']])('rejects %j', (value) => {
    expect(() => encodePathParam(value as never)).toThrow(VtexUsageError)
  })
  it('turns an unpaired surrogate into a usage error', () => {
    expect(() => encodePathParam('\uD800')).toThrow(VtexUsageError)
  })
})

describe('buildRequestUrl', () => {
  const server = { origin: 'https://acme.vtexcommercestable.com.br', basePath: '/api' }
  it('joins base path, path and query', () => {
    expect(buildRequestUrl(server, '/giftcards/1', { a: 1 })).toBe(
      'https://acme.vtexcommercestable.com.br/api/giftcards/1?a=1',
    )
  })
  it('works with an empty base path', () => {
    expect(buildRequestUrl({ ...server, basePath: '' }, '/x')).toBe('https://acme.vtexcommercestable.com.br/x')
  })
  it('keeps encoded ids intact', () => {
    expect(buildRequestUrl(server, `/orders/${encodePathParam('a/b?c#d')}`)).toBe(
      'https://acme.vtexcommercestable.com.br/api/orders/a%2Fb%3Fc%23d',
    )
  })
  it.each([
    'giftcards', '/a/../b', '/a/./b', '/a/%2e%2e/b', '/a?b', '/a#b', '/a\\b', '/a b',
    '/a\tb', '/a\n../b', '/a/.\t./b', '/a/%2E%2E/b', '/a/%2e/b', '/café',
  ])('rejects %j', (path) => {
    expect(() => buildRequestUrl(server, path)).toThrow(VtexUsageError)
  })
  it('rejects a non-string path', () => {
    expect(() => buildRequestUrl(server, undefined as never)).toThrow(VtexUsageError)
  })
  it('rejects a base path that would change the origin', () => {
    expect(() => buildRequestUrl({ ...server, basePath: '@evil.com' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a non-canonical server origin', () => {
    expect(() => buildRequestUrl({ origin: 'https://ACME.vtexcommercestable.com.br', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'https://acme.vtexcommercestable.com.br:443', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
  it('rejects a server that is not https on an allowlisted host', () => {
    expect(() => buildRequestUrl({ origin: 'https://evil.com', basePath: '' }, '/x')).toThrow(VtexUsageError)
    expect(() => buildRequestUrl({ origin: 'http://acme.vtexcommercestable.com.br', basePath: '' }, '/x')).toThrow(VtexUsageError)
  })
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
