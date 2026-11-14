# Guides

Worked examples for the VTEX systems you are most likely to integrate with. Every ```ts block in these
guides is type-checked against the SDK in CI (`npm run check-doc-examples`), so the method names, parameters
and option keys shown here exist.

Start with [Getting started](./getting-started.md): credentials, choosing a layer, errors and retries.

## Systems map

| System | What it covers | Guide | SDK entry points | API reference |
|---|---|---|---|---|
| Orders (OMS) | Orders, invoices, tracking, cancellation, feed and hook | [orders.md](./orders.md) | `vtex.orders`, `vtex.raw.ordersAPI` | [Orders API](../api-reference/orders-api.md) |
| Catalog | Products, SKUs, brands, categories, specifications | [catalog.md](./catalog.md) | `vtex.catalog`, `vtex.raw.catalogAPI` | [Catalog API](../api-reference/catalog-api.md) |
| Search | Intelligent Search (storefront search, autocomplete) | [catalog.md](./catalog.md#search) | `vtex.raw.intelligentSearchAPIV1` | [Intelligent Search v1](../api-reference/intelligent-search-api-v1.md) |
| Master Data | Customer (`CL`), address (`AD`) and custom entities | [master-data.md](./master-data.md) | `vtex.masterData`, `vtex.raw.masterDataAPIV2` | [v2](../api-reference/master-data-api-v2.md), [v1](../api-reference/master-data-api-v1.md) |
| Pricing | Base, fixed and computed prices, price tables | [pricing.md](./pricing.md) | `vtex.pricing`, `vtex.raw.pricingAPI` | [Pricing API](../api-reference/pricing-api.md) |
| Logistics | Warehouses, docks, inventory, reservations, holidays | [logistics.md](./logistics.md) | `vtex.logistics`, `vtex.raw.logisticsAPI` | [Logistics API](../api-reference/logistics-api.md) |
| Checkout | Cart simulation, order forms, placing orders | [checkout.md](./checkout.md) | `vtex.checkout`, `vtex.raw.checkoutAPI` | [Checkout API](../api-reference/checkout-api.md) |
| Promotions and coupons | Coupons, promotions, taxes | [promotions-and-gift-cards.md](./promotions-and-gift-cards.md) | `vtex.raw.promotionsTaxesAPI` | [Promotions & Taxes](../api-reference/promotions-taxes-api.md) |
| Gift cards | Gift cards and their transactions | [promotions-and-gift-cards.md](./promotions-and-gift-cards.md#gift-cards) | `vtex.raw.giftcardAPI` | [Giftcard API](../api-reference/giftcard-api.md) |
| Everything else | B2B, subscriptions, payments, VTEX ID, sessions, marketplace… | — | `vtex.raw.*` | [API reference index](../api-reference/README.md) |

## Three layers

1. **Facades** (`vtex.orders`, `vtex.catalog`, …): hand-written, with pagination and validation built in. Use them when they cover the call.
2. **Generated layer** (`vtex.raw.<api>.<namespace>.<method>`): every callable operation of the 62 APIs, typed from VTEX's OpenAPI documents. Look the call up in the [API reference](../api-reference/README.md).
3. **`vtex.request()` / `vtex.requestRaw()`**: for an endpoint the documents don't describe. Same host allowlist, retries and redirect rules; you encode path values yourself with `encodePathParam`.

The facade and generated methods return what VTEX returns: the generated types describe VTEX's documented shape, and nothing is validated at runtime. Check fields you depend on.
