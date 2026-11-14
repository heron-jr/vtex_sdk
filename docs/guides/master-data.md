# Master Data

Facade: `vtex.masterData` · Generated: `vtex.raw.masterDataAPIV2` (v2), `vtex.raw.masterDataAPIV1` (v1, v10.2) ·
Reference: [v2](../api-reference/master-data-api-v2.md), [v1](../api-reference/master-data-api-v1.md) ·
Official: [v2](https://developers.vtex.com/docs/api-reference/master-data-api-v2), [v1](https://developers.vtex.com/docs/api-reference/masterdata-api)

Master Data holds the customer (`CL`) and address (`AD`) entities and any custom entity. These records are
personal data: request only the fields you need, and keep them out of logs.

## Read a document

```ts
const customer = await vtex.masterData.get('CL', 'b5f2b6e4-0000-0000-0000-000000000000', { fields: ['id', 'email', 'firstName'] })
```

Entity names must match `^[A-Za-z0-9_-]{1,64}$`; anything else throws `VtexUsageError` before a request is sent.

## Search (small result sets)

`search` returns at most a few thousand rows and pages with the `REST-Range` header:

```ts
const { data, headers } = await vtex.requestRaw<unknown[]>({
  method: 'GET',
  path: '/api/dataentities/CL/search',
  query: { _where: 'isNewsletterOptIn=true', _fields: 'id,email', _sort: 'createdIn DESC' },
  headers: { 'REST-Range': 'resources=0-99' },
})
const total = headers.get('REST-Content-Range') // e.g. "resources 0-99/1234"
```

Or with the generated method, which types the header:

```ts
const page = await vtex.raw.masterDataAPIV2.search.searchdocuments({
  dataEntityName: 'CL',
  'REST-Range': 'resources=0-99',
  _where: 'isNewsletterOptIn=true',
  _fields: 'id,email',
})
```

## Scroll (whole entities)

```ts
declare function exportRow(row: unknown): Promise<void>

for await (const row of vtex.masterData.scroll('CL', { fields: ['id', 'email'], size: 1000, query: 'isNewsletterOptIn=true' })) {
  await exportRow(row)
}
```

The scroll token expires after 20 minutes without a request, and that includes your processing time between
rows. The SDK never restarts a scroll by itself (it would yield duplicates): on an expired token, start a new one.

## Writes

```ts
declare const doc: Parameters<typeof vtex.raw.masterDataAPIV2.documents.createnewdocument>[0]['body']
const created = await vtex.raw.masterDataAPIV2.documents.createnewdocument({ dataEntityName: 'CL', body: doc })

// Partial update of one document: PATCH, so it is not retried after a timeout
declare const changes: Parameters<typeof vtex.raw.masterDataAPIV2.documents.updatepartialdocument>[0]['body']
await vtex.raw.masterDataAPIV2.documents.updatepartialdocument({ dataEntityName: 'CL', id: 'customer-id', body: changes })

// Setting the same fields twice gives the same result, so this PATCH can opt in to retries
await vtex.raw.masterDataAPIV2.documents.updatepartialdocument(
  { dataEntityName: 'CL', id: 'customer-id', body: changes },
  { idempotent: true },
)
```

Only mark a write `idempotent` when repeating it cannot change the outcome: a create without an id, or a
counter increment, is not idempotent.

## v1 (v10.2) Accept header

Some v1 operations declare `Accept: application/vnd.vtex.ds.v10+json`. The SDK sends `application/json` by
default; pass the header when an endpoint needs it:

```ts
await vtex.masterData.get('CL', 'customer-id', { headers: { Accept: 'application/vnd.vtex.ds.v10+json' } })
```
