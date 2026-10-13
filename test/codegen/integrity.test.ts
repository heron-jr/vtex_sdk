import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import {
  assertSchemaFileName, gitBlobSha, parseSchemaLock, schemaDownloadUrl,
} from '../../scripts/codegen/integrity.js'

const REF = '1ca3d11c8dfc9dd17484eabad051d364e767c50d'
const SHA = 'ce013625030ba8dba906f756967f9e9ca394464a'

describe('gitBlobSha', () => {
  // Each expected value comes from `git hash-object` on the same bytes.
  it.each([
    ['hello\\n', new TextEncoder().encode('hello\n'), 'ce013625030ba8dba906f756967f9e9ca394464a'],
    ['empty', new Uint8Array(0), 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391'],
    ['multibyte (5 bytes, 4 chars)', new TextEncoder().encode('olá\n'), 'b30aa6deda68a4ddeadc2449be9025cbe409881c'],
    ['binary', new Uint8Array([0x00, 0xff, 0x0a]), '506cd141ad4a679eee22d6a21dd267cca5734b92'],
    ['BOM', new Uint8Array([0xef, 0xbb, 0xbf, 0x7b, 0x7d, 0x0a]), 'f1177889234785c56a3cffb98a6d63970f8813ed'],
    ['offset view', new TextEncoder().encode('XXhello\n').subarray(2), 'ce013625030ba8dba906f756967f9e9ca394464a'],
  ])('matches git hash-object for %s', (_label, bytes, expected) => {
    expect(gitBlobSha(bytes)).toBe(expected)
  })
})

describe('assertSchemaFileName', () => {
  it.each(['VTEX - Orders API.json', 'VTEX - Promotions & Taxes API.json', 'a.b-c.json'])('accepts %s', (name) => {
    expect(assertSchemaFileName(name)).toBe(name)
  })
  it.each([
    '../package.json', '..\\x.json', 'a/b.json', 'a\\b.json', '.hidden.json', 'x..json', 'C:x.json',
    'x.txt', '', 'x\u001b[31m.json', '__proto__.json', 42,
  ])('rejects %j', (name) => {
    expect(() => assertSchemaFileName(name)).toThrow(/Refusing unsafe schema file name/)
  })
})

describe('schemaDownloadUrl', () => {
  it('builds the URL from the pinned repo and commit only', () => {
    expect(schemaDownloadUrl(REF, 'VTEX - Promotions & Taxes API.json').href).toBe(
      `https://raw.githubusercontent.com/vtex/openapi-schemas/${REF}/VTEX%20-%20Promotions%20%26%20Taxes%20API.json`,
    )
  })
  it('rejects a branch name or an unsafe file name', () => {
    expect(() => schemaDownloadUrl('main', 'x.json')).toThrow(/ref/)
    expect(() => schemaDownloadUrl(REF, '../x.json')).toThrow(/unsafe/)
  })
})

describe('parseSchemaLock', () => {
  const valid = { repo: 'vtex/openapi-schemas', ref: REF, files: { 'A.json': SHA } }
  it('accepts a valid lock', () => {
    expect(parseSchemaLock(valid)).toEqual(valid)
  })
  it.each([
    ['another repo', { ...valid, repo: 'attacker/repo' }],
    ['a branch ref', { ...valid, ref: 'main' }],
    ['an unsafe name', { ...valid, files: { '../package.json': SHA } }],
    ['a bad sha', { ...valid, files: { 'A.json': 'nope' } }],
    ['no files', { ...valid, files: {} }],
    ['files as an array', { ...valid, files: [] }],
    ['null', null],
  ])('rejects %s', (_label, lock) => {
    expect(() => parseSchemaLock(lock)).toThrow()
  })
  it('accepts the committed lock', () => {
    const lock = parseSchemaLock(JSON.parse(readFileSync('scripts/schemas.lock.json', 'utf8')))
    expect(Object.keys(lock.files).length).toBeGreaterThan(50)
  })
})
