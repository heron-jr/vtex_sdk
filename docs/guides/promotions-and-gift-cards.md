# Promotions, coupons and gift cards

## Coupons and promotions

Generated: `vtex.raw.promotionsTaxesAPI` · Reference: [Promotions & Taxes API](../api-reference/promotions-taxes-api.md) ·
Official: [developers.vtex.com](https://developers.vtex.com/docs/api-reference/promotions-and-taxes-api)

```ts
import { VtexNotFoundError } from 'vtex-sdk'

async function findCoupon(couponCode: string): Promise<unknown | undefined> {
  try {
    return await vtex.raw.promotionsTaxesAPI.coupons.getbycouponcode({ couponCode })
  } catch (err) {
    if (err instanceof VtexNotFoundError) return undefined
    throw err
  }
}

const usage = await vtex.raw.promotionsTaxesAPI.coupons.getusage({ couponCode: 'WELCOME10' })
```

`createOrUpdateCoupon` is an upsert keyed by the coupon code, so it is safe to opt in to retries:

```ts
declare const coupon: Parameters<typeof vtex.raw.promotionsTaxesAPI.coupons.createOrUpdateCoupon>[0]['body']

await vtex.raw.promotionsTaxesAPI.coupons.createOrUpdateCoupon({ body: coupon }, { idempotent: true })
```

`coupons.massiveGeneration` creates new random codes on every call: leave it non-idempotent.

```ts
const promotions = await vtex.raw.promotionsTaxesAPI.promotionsAndTaxes.getAllBenefits()
const found = await vtex.raw.promotionsTaxesAPI.promotionsAndTaxes.searchPromotion({ byName: 'Black Friday' })
```

## Gift cards

Generated: `vtex.raw.giftcardAPI` (under `/api` on the account host) · Reference: [Giftcard API](../api-reference/giftcard-api.md) ·
Official: [developers.vtex.com](https://developers.vtex.com/docs/api-reference/giftcard-api)

```ts
const card = await vtex.raw.giftcardAPI.giftCard.getGiftCardbyID({ giftCardId: '1234' })
console.log(card.balance, card.expiringDate)

const transactions = await vtex.raw.giftcardAPI.transactions.getGiftCardTransactions({ giftCardId: '1234' })
```

A gift card's `redemptionCode` works like cash: don't log it or return it to anyone but its owner.

Creating a card or a transaction is a POST that is **not** retried after a timeout, because a repeated debit
or credit changes the balance. Read the transactions back before sending it again:

```ts
declare const debit: Parameters<typeof vtex.raw.giftcardAPI.transactions.createGiftCardTransaction>[0]['body']

await vtex.raw.giftcardAPI.transactions.createGiftCardTransaction({ giftCardId: '1234', body: debit })
```

If you are the gift card *provider* (VTEX calls you), see the types-only
[Giftcard Provider Protocol](../api-reference/giftcard-provider-protocol.md).
