# Logistics

Facade: `vtex.logistics` · Generated: `vtex.raw.logisticsAPI` · Reference: [Logistics API](../api-reference/logistics-api.md) ·
Official: [developers.vtex.com](https://developers.vtex.com/docs/api-reference/logistics-api)

## Warehouses and docks

```ts
const warehouses = await vtex.logistics.listWarehouses()
const warehouse = await vtex.raw.logisticsAPI.warehouses.warehouseById({ warehouseId: 'main' })
const docks = await vtex.raw.logisticsAPI.docks.allDocks()
```

## Inventory

```ts
// Every warehouse of one SKU
const inventory = await vtex.logistics.getInventoryBySku('1001')

// One SKU in one warehouse
const level = await vtex.raw.logisticsAPI.inventory.inventoryperwarehouse({ skuId: '1001', warehouseId: 'main' })
```

Setting the quantity is a PUT of the absolute value, so repeating it is harmless and it is retried like a GET.
Send absolute quantities, not deltas computed from a value you read earlier, or two workers can overwrite
each other:

```ts
declare const stock: Parameters<typeof vtex.raw.logisticsAPI.inventory.updateInventoryBySkuandWarehouse>[0]['body']

await vtex.raw.logisticsAPI.inventory.updateInventoryBySkuandWarehouse({ skuId: '1001', warehouseId: 'main', body: stock })
```

For large catalogs use the batch operations (`batchOperations.*`, on `logistics.{environment}.com.br`): create a
batch, commit it, then poll its status and errors.

## Reservations

```ts
declare const reservation: Parameters<typeof vtex.raw.logisticsAPI.reservations.createReservation>[0]['body']

// POST: not retried after a timeout, because the reservation may exist already
const created = await vtex.raw.logisticsAPI.reservations.createReservation({ body: reservation })
```

## Shipping configuration

```ts
const policies = await vtex.raw.logisticsAPI.shippingPolicies.getApiLogisticsPvtShippingPolicies()
const holidays = await vtex.raw.logisticsAPI.holidays.allHolidays()
const freight = await vtex.raw.logisticsAPI.freightValues.freightValues({ carrierId: 'carrier-1', postalcode: '01310100' })
```
