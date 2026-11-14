# Checkout

Facade: `vtex.checkout` · Generated: `vtex.raw.checkoutAPI` · Reference: [Checkout API](../api-reference/checkout-api.md) ·
Official: [developers.vtex.com](https://developers.vtex.com/docs/api-reference/checkout-api)

Checkout's `pub` endpoints are built for shoppers' browsers. Calling them from a server with an app key acts
on behalf of the store, so never expose that client to a browser or forward a shopper's input as the `account`.

## Simulate a cart

Simulation reads prices, availability and delivery options without creating anything. It is a POST that behaves
like a read, so the facade retries it like a GET:

```ts
const simulation = await vtex.checkout.simulate({
  items: [{ id: '1001', quantity: 2, seller: '1' }],
  country: 'BRA',
  postalCode: '01310100',
})
```

The generated method types the body from the reference; mark it idempotent to get the same retry behavior:

```ts
await vtex.raw.checkoutAPI.shoppingCart.cartSimulation(
  { body: { items: [{ id: '1001', quantity: 2, seller: '1' }], country: 'BRA', postalCode: '01310100' } },
  { idempotent: true },
)
```

## Order forms

```ts
const orderFormId = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'
const cart = await vtex.checkout.getCart(orderFormId)

declare const items: Parameters<typeof vtex.raw.checkoutAPI.shoppingCart.items>[0]['body']
await vtex.raw.checkoutAPI.shoppingCart.items({ orderFormId, body: items })

declare const shipping: Parameters<typeof vtex.raw.checkoutAPI.cartAttachments.addShippingAddress>[0]['body']
await vtex.raw.checkoutAPI.cartAttachments.addShippingAddress({ orderFormId, body: shipping })

// Drop the shopper's personal data from a cart before reusing it
await vtex.raw.checkoutAPI.shoppingCart.removeallpersonaldata({ orderFormId })
```

## Placing an order

`orderPlacement.placeOrder` is a PUT, but it is a command: repeating it after a timeout can place a second
order. Disable the retry on 5xx and timeouts, and check for the order before trying again:

```ts
declare const order: Parameters<typeof vtex.raw.checkoutAPI.orderPlacement.placeOrder>[0]['body']

const placed = await vtex.raw.checkoutAPI.orderPlacement.placeOrder({ body: order }, { idempotent: false })
```
