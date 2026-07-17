import type { VtexHttpClient } from '../core/http.js'

export interface ScrollOptions {
  fields?: string[]
  size?: number
  query?: string
  sort?: string
}

export class MasterDataFacade {
  constructor(private readonly http: VtexHttpClient) {}

  get(dataEntity: string, id: string): Promise<unknown> {
    return this.http.request({
      method: 'GET',
      path: `/api/dataentities/${dataEntity}/documents/${encodeURIComponent(id)}`,
    })
  }

  async *scroll(dataEntity: string, opts: ScrollOptions = {}): AsyncGenerator<unknown> {
    let token: string | undefined
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const query: Record<string, unknown> = {}
      if (opts.fields) query['_fields'] = opts.fields.join(',')
      if (opts.size) query['_size'] = opts.size
      if (opts.query) query['_where'] = opts.query
      if (opts.sort) query['_sort'] = opts.sort
      if (token) query['_token'] = token

      const { data, headers } = await this.http.requestRaw<unknown[] | undefined>({
        method: 'GET',
        path: `/api/dataentities/${dataEntity}/scroll`,
        query,
      })
      const rows = data ?? []
      for (const row of rows) yield row
      if (rows.length === 0) return
      token = headers.get('X-VTEX-MD-TOKEN') ?? token
    }
  }
}
