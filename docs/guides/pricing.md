# Pricing

Facade: `vtex.pricing` · Generated: `vtex.raw.pricingAPI` · Reference: [Pricing API](../api-reference/pricing-api.md) ·
Official: [developers.vtex.com](https://developers.vtex.com/docs/api-reference/pricing-api)

The generated Pricing API calls `api.vtex.com/{account}/pricing/...`, the host its reference documents. The
facade keeps the account-host path (`/api/pricing/prices/...`) that VTEX also serves.

## Read prices

The generated methods type SKU ids as numbers (as the reference does); the facade takes a string.

```ts
// Base price, list price, cost and fixed prices of one SKU
const price = await vtex.pricing.getPrice('1001')

// The price the storefront would compute for each price table
const computed = await vtex.raw.pricingAPI.pricesAndFixedPrices.getPricingPricesByItemIdComputed({ itemId: 1001 })
const forTable = await vtex.raw.pricingAPI.pricesAndFixedPrices.getComputedPricebypricetable({
  itemId: 1001,
  priceTableId: '1',
  categoryIds: 12,
  brandId: 2000001,
  quantity: 1,
})
```

## Write prices

```ts
declare const body: Parameters<typeof vtex.raw.pricingAPI.pricesAndFixedPrices.createUpdatePriceOrFixedPrice>[0]['body']

// PUT replaces the SKU's price: repeating it gives the same result, so it is retried like a GET
await vtex.pricing.setPrice('1001', body)
await vtex.raw.pricingAPI.pricesAndFixedPrices.createUpdatePriceOrFixedPrice({ itemId: 1001, body })
```

`setPrice` takes any body; the generated method types it from the reference. A body that VTEX rejects comes
back as `VtexValidationError` (400/422) with VTEX's message in `err.body`.

## Price tables

```ts
const tables = await vtex.raw.pricingAPI.priceTables.listpricetables()
const rules = await vtex.raw.pricingAPI.priceTables.getrulesforapricetable({ priceTableId: 'wholesale' })
const config = await vtex.raw.pricingAPI.pricingConfiguration.getPricingConfig()
```
