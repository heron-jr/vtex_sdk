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
    'https://otherstore.{environment}.com.br/api/catalog_system',
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
  it.each([
    // hostile hosts
    'https://vtexcommercestable.com.br.evil.com',
    'https://evil-vtexcommercestable.com.br',
    'https://{accountName}vtex.com',
    'https://API.VTEX.COM',
    'https://api.vtex.com.',
    'https://ápi.vtex.com',
    // userinfo, port, query, fragment, other schemes, relative
    'https://user@api.vtex.com',
    'https://api.vtex.com:443',
    'https://api.vtex.com?',
    'https://api.vtex.com#',
    'ftp://api.vtex.com',
    'HTTPS://api.vtex.com',
    '/api/catalog',
    // parser differentials: the raw first label is not the runtime one
    'https:/xapi.myvtex.com',
    'https:xx{accountName}.myvtex.com',
    'https:/e{accountName}.vtexcommercestable.com.br',
    // dot segments and escapes that rewrite the path
    'https://api.vtex.com/{accountName}/%2e%2e/otherstore/pricing',
    'https://api.vtex.com/{accountName}/../otherstore/pricing',
    'https://{accountName}.myvtex.com\\@evil.com',
    'https://api.vtex.com/a b',
    // stray braces
    'https://{}.myvtex.com',
    'https://{accountName.myvtex.com',
    'https://x}.myvtex.com',
    // hard-coded accounts and shared labels outside the commerce domains
    'https://otherstore.myvtex.com',
    'https://otherstore.vtexpayments.com.br',
    'https://x{accountName}.myvtex.com',
    'https://api.myvtex.com',
    'https://rnb.myvtex.com',
    'https://portal.vtexpayments.com.br',
    // VTEX IO app routes run third-party code
    'https://app.io.vtex.com',
    'https://app.io.vtex.com/{accountName}',
  ])('rejects unsafe template %s', (url) => {
    expect(normalizeServer({ url, variables: stable })).toBeUndefined()
  })
  it('ignores enum and default values that point elsewhere', () => {
    expect(
      normalizeServer({
        url: 'https://{accountName}.{environment}.com.br',
        variables: { accountName: { default: 'otherstore', enum: ['evil.com'] }, environment: { default: 'evil.com#' } },
      }),
    ).toBe('https://{accountName}.{environment}.com.br')
  })
  it.each(['exampleParameterValue', 'DefaultParameterValue'])('keeps {environment} for a junk default (%s)', (d) => {
    expect(normalizeServer({ url: 'https://rnb.{environment}.com.br/api/pricing/pvt', variables: { environment: { default: d } } })).toBe(
      'https://rnb.{environment}.com.br/api/pricing/pvt',
    )
  })
  it('rejects a myvtex default on a .com.br template', () => {
    expect(
      normalizeServer({ url: 'https://{accountName}.{environment}.com.br', variables: { environment: { default: 'myvtex' } } }),
    ).toBeUndefined()
  })
  it('returns undefined for malformed entries', () => {
    expect(normalizeServer({ url: 123 } as never)).toBeUndefined()
    expect(normalizeServer(null as never)).toBeUndefined()
    expect(normalizeServer({} as never)).toBeUndefined()
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
  it('lets an empty servers list fall through to the next level', () => {
    expect(pickServer([[], undefined, doc])).toBe('https://{accountName}.{environment}.com.br')
  })
  it('treats a non-array servers value as declared and unresolvable', () => {
    expect(pickServer([{ url: 'https://evil.com' } as never, undefined, doc])).toBeUndefined()
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
  it('never drops a templated segment', () => {
    expect(trimBasePathOverlap('https://api.vtex.com/{accountName}', '/{accountName}/x')).toBe(
      'https://api.vtex.com/{accountName}',
    )
  })
  it('drops the only base segment when it overlaps', () => {
    expect(trimBasePathOverlap('https://rnb.{environment}.com.br/pricing', '/pricing/x')).toBe(
      'https://rnb.{environment}.com.br',
    )
  })
})
