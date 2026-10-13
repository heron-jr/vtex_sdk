/**
 * Optional check against a real VTEX account. Never runs in CI. Every request is a GET,
 * and only HTTP statuses and counts are printed (never credentials or response data).
 *
 *   npx tsx --env-file=.env scripts/live-check.ts
 *
 * with VTEX_ACCOUNT, VTEX_APP_KEY and VTEX_APP_TOKEN in .env (gitignored), so the secrets
 * stay out of shell history.
 *
 * A 403 means the route exists but the key lacks the role. A 401 means the credentials
 * were rejected, and a 404 on a route that should exist means the SDK calls the wrong URL;
 * both count as failures.
 */
import { VtexAuthError, VtexClient, VtexNotFoundError } from '../src/index.js'

const account = process.env.VTEX_ACCOUNT
const appKey = process.env.VTEX_APP_KEY
const appToken = process.env.VTEX_APP_TOKEN
if (!account || !appKey || !appToken) {
  console.error('Set VTEX_ACCOUNT, VTEX_APP_KEY and VTEX_APP_TOKEN to run the live check.')
  process.exit(2)
}

const vtex = new VtexClient({ account, appKey, appToken, maxRetries: 1 })
let failures = 0
const unique = () => `live-check-${Date.now().toString(36)}`

async function check(name: string, run: () => Promise<string>): Promise<void> {
  try {
    console.log(`ok    ${name}: ${await run()}`)
  } catch (err) {
    if (err instanceof VtexAuthError && err.status === 403) {
      console.log(`ok    ${name}: route exists (HTTP 403, key lacks the role)`)
      return
    }
    failures++
    if (err instanceof VtexAuthError) {
      console.log(`FAIL  ${name}: credentials rejected (HTTP ${err.status})`)
      return
    }
    console.log(`FAIL  ${name}: ${(err as Error).name}: ${(err as Error).message}`)
  }
}

/** Runs a GET that should 404 for a made-up id; a 404 proves the route (and host) is right. */
async function expect404(run: () => Promise<unknown>): Promise<string> {
  try {
    await run()
    return 'unexpectedly found'
  } catch (err) {
    if (err instanceof VtexNotFoundError) return '404 as expected'
    throw err
  }
}

await check('list orders (1 item)', async () => {
  const res = await vtex.requestRaw<{ list?: unknown[] }>({ method: 'GET', path: '/api/oms/pvt/orders', query: { per_page: 1 } })
  return `HTTP ${res.status}, ${res.data.list?.length ?? 0} item(s)`
})

await check('get a made-up coupon (expects 404)', () =>
  expect404(() => vtex.raw.promotionsTaxesAPI.coupons.getbycouponcode({ couponCode: unique() })),
)

await check('get a made-up gift card on /api (expects 404)', () =>
  expect404(() => vtex.raw.giftcardAPI.giftCard.getGiftCardbyID({ giftCardId: unique() })),
)

await check('pricing config on api.vtex.com/{account}', async () => {
  const res = await vtex.requestRaw({ method: 'GET', path: '/pricing/config', server: 'https://api.vtex.com/{accountName}' })
  return `HTTP ${res.status}`
})

process.exit(failures === 0 ? 0 : 1)
