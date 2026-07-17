import { describe, it, expect } from 'vitest'
import * as sdk from '../src/index.js'

describe('public exports', () => {
  it('exports the client, factory, and errors', () => {
    expect(typeof sdk.VtexClient).toBe('function')
    expect(typeof sdk.createVtexFactory).toBe('function')
    expect(typeof sdk.VtexRequestError).toBe('function')
    expect(typeof sdk.VtexRateLimitError).toBe('function')
  })
})
