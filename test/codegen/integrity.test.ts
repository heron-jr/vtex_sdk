import { describe, it, expect } from 'vitest'
import { assertSchemaDownloadUrl, gitBlobSha } from '../../scripts/codegen/integrity.js'

describe('gitBlobSha', () => {
  it('matches git hash-object', () => {
    // `printf 'hello\n' | git hash-object --stdin`
    expect(gitBlobSha(new TextEncoder().encode('hello\n'))).toBe('ce013625030ba8dba906f756967f9e9ca394464a')
  })
})

describe('assertSchemaDownloadUrl', () => {
  it('accepts raw.githubusercontent.com over https', () => {
    expect(assertSchemaDownloadUrl('https://raw.githubusercontent.com/vtex/openapi-schemas/abc/x.json').hostname).toBe(
      'raw.githubusercontent.com',
    )
  })
  it.each(['http://raw.githubusercontent.com/x.json', 'https://evil.example/x.json', 'https://raw.githubusercontent.com.evil.example/x.json'])(
    'rejects %s',
    (url) => {
      expect(() => assertSchemaDownloadUrl(url)).toThrow(/Refusing/)
    },
  )
})
