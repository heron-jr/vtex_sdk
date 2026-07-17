import { describe, it, expect } from 'vitest'
import { resolveBaseUrl, buildQuery } from '../../src/core/url.js'

describe('resolveBaseUrl', () => {
  it('defaults to vtexcommercestable', () => {
    expect(resolveBaseUrl('lojax')).toBe('https://lojax.vtexcommercestable.com.br')
  })
  it('honors an explicit environment', () => {
    expect(resolveBaseUrl('lojax', 'vtexcommercebeta')).toBe('https://lojax.vtexcommercebeta.com.br')
  })
  it('rejects an empty account', () => {
    expect(() => resolveBaseUrl('')).toThrow(/account/i)
  })
})

describe('buildQuery', () => {
  it('returns empty string for no params', () => {
    expect(buildQuery()).toBe('')
    expect(buildQuery({})).toBe('')
  })
  it('serializes scalars and skips undefined/null', () => {
    expect(buildQuery({ page: 1, q: 'a b', skip: undefined, none: null }))
      .toBe('?page=1&q=a+b')
  })
  it('repeats array values', () => {
    expect(buildQuery({ id: [1, 2] })).toBe('?id=1&id=2')
  })
})
