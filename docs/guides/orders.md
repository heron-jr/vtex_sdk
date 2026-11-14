# Orders (OMS)

Facade: `vtex.orders` · Generated: `vtex.raw.ordersAPI` · Reference: [Orders API](../api-reference/orders-api.md) ·
Official: [developers.vtex.com](https://developers.vtex.com/docs/api-reference/orders-api)

The API key needs the OMS resources for what you call (for example *OMS - Full access* or the narrower view/edit roles).

## Get one order

```ts
const order = await vtex.orders.get('1234567890123-01')
```

`orderId` is path-encoded, so an id such as `../x` cannot point the call at another endpoint.

## List orders without losing any

`vtex.orders.list()` pages for you. VTEX serves at most 30 pages per query, so when more orders match, the
iterator throws `VtexPaginationLimitError` **after** yielding page 30 instead of silently stopping. Iterate in
time windows that stay under the limit:

```ts
import { VtexPaginationLimitError } from 'vtex-sdk'

declare function upsertOrderSummary(summary: unknown): Promise<void>

async function syncDay(dayStartIso: string, dayEndIso: string): Promise<void> {
  const orders = vtex.orders.list({
    f_creationDate: `creationDate:[${dayStartIso} TO ${dayEndIso}]`,
    orderBy: 'creationDate,asc',
    perPage: 100,
  })
  try {
    for await (const summary of orders) await upsertOrderSummary(summary)
  } catch (err) {
    // More than 30 × 100 orders in this window: split it (for example per hour) and run again.
    if (err instanceof VtexPaginationLimitError) throw new Error(`Window ${dayStartIso} is too large`, { cause: err })
    throw err
  }
}
```

Write the summaries idempotently (upsert by `orderId`): a retry or a split window yields some orders again.

Filters are passed through as query parameters (`f_status`, `f_creationDate`, `q`, `orderBy`, …; see
`orders.listOrders` in the [reference](../api-reference/orders-api.md)). `status` is a shortcut for `f_status`.
`page` and `per_page` are rejected because the iterator owns paging; use `perPage` (1–100).

## Order workflow

```ts
const orderId = '1234567890123-01'

await vtex.raw.ordersAPI.orders.startHandling({ orderId })

declare const invoice: Parameters<typeof vtex.raw.ordersAPI.invoice.invoiceNotification>[0]['body']
await vtex.raw.ordersAPI.invoice.invoiceNotification({ orderId, body: invoice })

declare const reason: Parameters<typeof vtex.raw.ordersAPI.orders.cancelOrder>[0]['body']
await vtex.raw.ordersAPI.orders.cancelOrder({ orderId, body: reason })
```

These are POSTs, so a timeout or 5xx is reported instead of retried: VTEX may already have applied it. Read
the order back before deciding to send it again.

## Feed v3: react to order changes

The feed is a queue you poll and acknowledge. Configure it once, then read and commit in a loop:

```ts
declare const feedConfig: Parameters<typeof vtex.raw.ordersAPI.feedV3.feedConfiguration>[0]['body']
await vtex.raw.ordersAPI.feedV3.feedConfiguration({ body: feedConfig })

declare function handleFeedItem(item: unknown): Promise<void>

async function drainFeed(): Promise<void> {
  for (;;) {
    // The OpenAPI document types maxlot as a string
    const items = await vtex.raw.ordersAPI.feedV3.getfeedorderstatus1({ maxlot: '10' })
    if (!Array.isArray(items) || items.length === 0) return
    const handles: string[] = []
    for (const item of items) {
      await handleFeedItem(item)
      if (typeof item.handle === 'string') handles.push(item.handle)
    }
    await vtex.raw.ordersAPI.feedV3.commititemfeedorderstatus({ body: { handles } })
  }
}
```

Commit only what you processed: uncommitted items come back after their visibility timeout. The hook variant
(`orderHook.hookConfiguration`) pushes the same events to your HTTPS endpoint instead.

## Types

```ts
import type { OrdersApiTypes } from 'vtex-sdk'

const filter: OrdersApiTypes.HookFilter = { type: 'FromWorkflow', status: ['ready-for-handling', 'invoiced'] }
```
