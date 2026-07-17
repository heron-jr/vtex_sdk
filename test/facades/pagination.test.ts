import { describe, it, expect } from 'vitest'
import { paginate } from '../../src/facades/pagination.js'

describe('paginate', () => {
  it('yields items across pages until hasMore is false', async () => {
    const pages: Record<number, { items: number[]; hasMore: boolean }> = {
      1: { items: [1, 2], hasMore: true },
      2: { items: [3], hasMore: false },
    }
    const out: number[] = []
    for await (const n of paginate<number>(async (p) => pages[p])) out.push(n)
    expect(out).toEqual([1, 2, 3])
  })

  it('stops immediately on an empty first page', async () => {
    const out: number[] = []
    for await (const n of paginate<number>(async () => ({ items: [], hasMore: false }))) out.push(n)
    expect(out).toEqual([])
  })
})
