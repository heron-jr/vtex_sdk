import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, vi } from 'vitest'
import { DEFAULT_SERVER, resolveServer } from '../src/core/url.js'
import { VtexClient } from '../src/client.js'

const GENERATED_DIR = fileURLToPath(new URL('../src/generated/', import.meta.url))

function generatedServerTemplates(): string[] {
  const templates = new Set<string>([DEFAULT_SERVER])
  for (const entry of readdirSync(GENERATED_DIR, { withFileTypes: true })) {
    const index = join(GENERATED_DIR, entry.name, 'index.ts')
    if (!entry.isDirectory() || !existsSync(index)) continue
    for (const match of readFileSync(index, 'utf8').matchAll(/server: '([^']+)'/g)) templates.add(match[1])
  }
  return [...templates]
}

function client() {
  const fetchMock = vi.fn().mockImplementation(() =>
    Promise.resolve(new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })),
  )
  return { fetchMock, vtex: new VtexClient({ account: 'acme', appKey: 'K', appToken: 'T', fetch: fetchMock }) }
}

/** Every host template credentials may be sent to. A schema re-pin that changes this list needs review. */
const EXPECTED_TEMPLATES = [
  'https://api.vtex.com',
  'https://api.vtex.com/{accountName}',
  'https://api.{environment}.com.br',
  'https://logistics.{environment}.com.br/{accountName}',
  'https://portal.{environment}.com.br',
  'https://prchub.{environment}.com.br',
  'https://rnb.{environment}.com.br/api/pricing/pvt',
  'https://sp.vtex.com/event-api/v1/{accountName}',
  'https://{accountName}.myvtex.com',
  'https://{accountName}.myvtex.com/pickpack/bin-location',
  'https://{accountName}.myvtex.com/pickpack/warehouses',
  'https://{accountName}.pcs.vtexcommercestable.com.br',
  'https://{accountName}.vtexcommercestable.com.br',
  'https://{accountName}.vtexpayments.com.br',
  'https://{accountName}.{environment}.com.br',
  'https://{accountName}.{environment}.com.br/api',
  'https://{accountName}.{environment}.com.br/api/do',
  'https://{accountName}.{environment}.com.br/api/intelligent-search/v0',
  'https://{accountName}.{environment}.com.br/api/intelligent-search/v1',
  'https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search',
  'https://{accountName}.{environment}.com.br/vtex_pickandpack',
].sort()

describe('generated hosts', () => {
  it('uses exactly the reviewed set of server templates', () => {
    expect(generatedServerTemplates().sort()).toEqual(EXPECTED_TEMPLATES)
  })

  it('every generated server template resolves to an allowlisted https VTEX origin', () => {
    const templates = generatedServerTemplates()
    expect(templates.length).toBeGreaterThan(10)
    for (const template of templates) {
      expect(resolveServer(template, 'acme', 'vtexcommercestable').origin).toMatch(/^https:\/\//)
    }
  })

  it('creates gift cards on /api with the vendor content type and the body', async () => {
    const { fetchMock, vtex } = client()
    await vtex.raw.giftcardAPI.giftCard.createGiftCard({
      body: { relationName: 'loyalty', expiringDate: '2027-01-01T00:00:00.000', caption: 'club', profileId: 'p1' },
    })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://acme.vtexcommercestable.com.br/api/giftcards')
    expect(init.headers['Content-Type']).toBe('application/vnd.vtex.giftcard.v1+json')
    expect(JSON.parse(init.body)).toMatchObject({ profileId: 'p1' })
  })

  it('sends the typed REST-Range header param on gift card search', async () => {
    const { fetchMock, vtex } = client()
    await vtex.raw.giftcardAPI.giftCard.searchGiftCardsfromcartdata({ 'REST-Range': 'resources=0-9', body: {} as never })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://acme.vtexcommercestable.com.br/api/giftcards/_search')
    expect(init.headers['REST-Range']).toBe('resources=0-9')
  })

  it.each([
    ['pricing price', (v: VtexClient) => v.raw.pricingAPI.pricesAndFixedPrices.getPrice({ itemId: 42 }), 'https://api.vtex.com/acme/pricing/prices/42'],
    ['pricing config (overlap trimmed)', (v: VtexClient) => v.raw.pricingAPI.pricingConfiguration.getPricingConfig(), 'https://api.vtex.com/acme/pricing/config'],
    ['VTEX ID token validation', (v: VtexClient) => v.raw.vtexID.authentication.postApiVtexidCredentialValidate({ an: 'acme', body: { token: 't' } }), 'https://acme.vtexcommercestable.com.br/api/vtexid/credential/validate?an=acme'],
    ['coupon upsert', (v: VtexClient) => v.raw.promotionsTaxesAPI.coupons.createOrUpdateCoupon({ body: { utmSource: 's', couponCode: 'c', maxItemsPerClient: 0, expirationIntervalPerUse: '00:00:00' } }), 'https://acme.vtexcommercestable.com.br/api/rnb/pvt/coupon'],
    ['orders feed', (v: VtexClient) => v.raw.ordersAPI.feedV3.getfeedorderstatus1({ maxlot: '10' }), 'https://acme.vtexcommercestable.com.br/api/orders/feed?maxlot=10'],
    ['myvtex-hosted API', (v: VtexClient) => v.raw.reviewsAndRatingsAPI.review.getReviewbyReviewId({ reviewId: 'r1' }), 'https://acme.myvtex.com/reviews-and-ratings/api/review/r1'],
  ])('routes %s to the documented host', async (_name, call, expectedUrl) => {
    const { fetchMock, vtex } = client()
    await call(vtex)
    expect(fetchMock.mock.calls[0][0]).toBe(expectedUrl)
  })
})
