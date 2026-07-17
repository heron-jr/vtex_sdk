export async function* paginate<T>(
  fetchPage: (page: number) => Promise<{ items: T[]; hasMore: boolean }>,
  startPage = 1,
): AsyncGenerator<T> {
  let page = startPage
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { items, hasMore } = await fetchPage(page)
    for (const item of items) yield item
    if (!hasMore || items.length === 0) return
    page++
  }
}
