import { describe, it, expect } from 'vitest'
import { normalizeServer, pickServer, trimBasePathOverlap } from '../../scripts/codegen/servers.js'
import { DEFAULT_SERVER } from '../../src/core/url.js'

const stable = { environment: { default: 'vtexcommercestable' } }

describe('normalizeServer', () => {
  it('keeps account/environment templates', () => {
    expect(normalizeServer({ url: 'https://{accountName}.{environment}.com.br', variables: stable })).toBe(
      'https://{accountName}.{environment}.com.br',
    )
  })
  it('bakes the myvtex environment', () => {
    expect(
      normalizeServer({ url: 'https://{accountName}.{environment}.com', variables: { environment: { default: 'myvtex' } } }),
    ).toBe('https://{accountName}.myvtex.com')
  })
  it('treats {account} as an alias of {accountName}', () => {
    expect(normalizeServer({ url: 'https://api.vtex.com/{account}/pricing' })).toBe(
      'https://api.vtex.com/{accountName}/pricing',
    )
  })
  it('upgrades http and trims trailing slashes', () => {
    expect(normalizeServer({ url: 'http://api.vtex.com/' })).toBe('https://api.vtex.com')
  })
  it.each([
    'https://{providerApiEndpoint}',
    'https://{storeDomain}/api',
    'https://{workspace}--{accountName}.myvtex.com',
    'https://api-retail-media.newtail.com.br',
    'https://auth.pickingnpacking.com/prod',
    'https://entelperu.{environment}.com.br/api/catalog_system',
    'http://example.com/.{environment}.com.br/api/rnb',
  ])('rejects %s', (url) => {
    expect(normalizeServer({ url, variables: stable })).toBeUndefined()
  })
  it.each([
    'https://portal.{environment}.com.br',
    'https://rnb.{environment}.com.br/api/pricing/pvt',
    'https://{accountName}.pcs.vtexcommercestable.com.br',
    'https://sp.vtex.com/event-api/v1/{accountName}',
  ])('accepts VTEX service host %s', (url) => {
    expect(normalizeServer({ url, variables: stable })).toBe(url)
  })
})

describe('pickServer', () => {
  const doc = [{ url: 'https://{accountName}.{environment}.com.br' }]

  it('prefers operation over path over document servers', () => {
    expect(pickServer([[{ url: 'https://api.vtex.com/{accountName}' }], [{ url: 'https://{accountName}.myvtex.com' }], doc])).toBe(
      'https://api.vtex.com/{accountName}',
    )
    expect(pickServer([undefined, [{ url: 'https://{accountName}.myvtex.com' }], doc])).toBe('https://{accountName}.myvtex.com')
    expect(pickServer([undefined, undefined, doc])).toBe('https://{accountName}.{environment}.com.br')
  })
  it('takes the first resolvable entry within a level', () => {
    expect(pickServer([[{ url: 'https://{storeDomain}' }, { url: 'https://{accountName}.myvtex.com' }]])).toBe(
      'https://{accountName}.myvtex.com',
    )
  })
  it('does not fall back to outer levels when the declaring level is unresolvable', () => {
    expect(pickServer([[{ url: 'https://{providerApiEndpoint}' }], undefined, doc])).toBeUndefined()
  })
  it('defaults to the account host when nothing declares servers', () => {
    expect(pickServer([undefined, undefined, undefined])).toBe(DEFAULT_SERVER)
  })
})

describe('trimBasePathOverlap', () => {
  it('drops a base-path segment repeated at the start of the path', () => {
    expect(trimBasePathOverlap('https://api.vtex.com/{accountName}/pricing', '/pricing/tables')).toBe(
      'https://api.vtex.com/{accountName}',
    )
  })
  it('leaves non-overlapping templates alone', () => {
    expect(trimBasePathOverlap('https://{accountName}.{environment}.com.br/api', '/giftcards')).toBe(
      'https://{accountName}.{environment}.com.br/api',
    )
    expect(trimBasePathOverlap('https://{accountName}.{environment}.com.br', '/api/x')).toBe(
      'https://{accountName}.{environment}.com.br',
    )
  })
})
