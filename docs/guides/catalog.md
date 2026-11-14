# Catalog and search

Facade: `vtex.catalog` · Generated: `vtex.raw.catalogAPI` · Reference: [Catalog API](../api-reference/catalog-api.md) ·
Official: [developers.vtex.com](https://developers.vtex.com/docs/api-reference/catalog-api)

## Products and SKUs

```ts
const product = await vtex.catalog.getProduct(42)
const sku = await vtex.catalog.getSku(1001)

// By your own reference code
const byRef = await vtex.raw.catalogAPI.product.productbyRefId({ refId: 'SHIRT-001' })
const skuId = await vtex.raw.catalogAPI.sku.skuIdbyRefId({ refId: 'SHIRT-001-M' })

// All SKUs of a product, and the SKU context (images, prices, sellers, specifications)
const skus = await vtex.raw.catalogAPI.sku.skulistbyProductId({ productId: 42 })
const context = await vtex.raw.catalogAPI.sku.skuContext({ skuId: 1001 })
```

## Walking every SKU id

`sku.listallSKUIDs` is paged by `page` and `pagesize`; stop on an empty page:

```ts
async function* allSkuIds(pageSize = 1000): AsyncGenerator<number> {
  for (let page = 1; ; page++) {
    const ids = await vtex.raw.catalogAPI.sku.listallSKUIDs({ page, pagesize: pageSize })
    if (!Array.isArray(ids) || ids.length === 0) return
    yield* ids
  }
}

for await (const id of allSkuIds()) console.log(id)
```

## Creating and updating

```ts
declare const newProduct: Parameters<typeof vtex.raw.catalogAPI.product.postApiCatalogPvtProduct>[0]['body']
const created = await vtex.raw.catalogAPI.product.postApiCatalogPvtProduct({ body: newProduct })

declare const productUpdate: Parameters<typeof vtex.raw.catalogAPI.product.putApiCatalogPvtProductByProductId>[0]['body']
await vtex.raw.catalogAPI.product.putApiCatalogPvtProductByProductId({ productId: 42, body: productUpdate })
```

The POST is not retried after a timeout (it may have created the product); look it up by `RefId` before
creating it again. The PUT replaces the product and is retried like a GET.

## Search

Intelligent Search serves the storefront search. It runs on the account host and needs no app key for public
data, but the SDK sends the key you configured; use a client with a read-only key for storefront calls.

Reference: [Intelligent Search API v1](../api-reference/intelligent-search-api-v1.md)

```ts
const results = await vtex.raw.intelligentSearchAPIV1.productListPage.getProductSearchByFacets({
  facets: 'category-1/shirts',
  query: 'blue',
  page: 1,
  count: 24,
})

const suggestions = await vtex.raw.intelligentSearchAPIV1.autocomplete.getAutocompleteSuggestions({ query: 'shi' })
```
