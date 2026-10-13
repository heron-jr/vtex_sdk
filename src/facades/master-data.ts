import type { VtexHttpClient } from '../core/http.js'
import type { CallOptions } from '../core/types.js'
import { encodePathParam, withCall } from '../core/call.js'
import { VtexUnexpectedResponseError, VtexUsageError } from '../core/errors.js'

export interface ScrollOptions {
  fields?: string[]
  /** Page size, 1–1000. */
  size?: number
  /** Master Data `_where` expression. */
  query?: string
  sort?: string
}

export interface MasterDataGetOptions extends CallOptions {
  fields?: string[]
}

const ENTITY_RE = /^[A-Za-z0-9_-]{1,64}$/
const MAX_SCROLL_SIZE = 1000

function entitySegment(dataEntity: string): string {
  if (!ENTITY_RE.test(dataEntity)) throw new VtexUsageError(`Invalid Master Data entity ${JSON.stringify(dataEntity)}`)
  return encodePathParam(dataEntity)
}

export class MasterDataFacade {
  constructor(private readonly http: VtexHttpClient) {}

  get(dataEntity: string, id: string, opts?: MasterDataGetOptions): Promise<unknown> {
    const { fields, ...call } = opts ?? {}
    const query = fields?.length ? { _fields: fields.join(',') } : undefined
    const path = `/api/dataentities/${entitySegment(dataEntity)}/documents/${encodePathParam(id)}`
    return this.http.request(withCall({ method: 'GET', path, query }, call))
  }

  /**
   * Iterates a whole data entity with the scroll API.
   *
   * VTEX expires the scroll token after 20 minutes without a request, and that idle time
   * includes your processing between rows. An expired token surfaces as VTEX's error after
   * earlier rows were already yielded. The scroll is never restarted automatically, because
   * restarting would yield duplicate rows; start a new scroll instead.
   */
  scroll(dataEntity: string, opts: ScrollOptions = {}, call?: CallOptions): AsyncGenerator<unknown> {
    const entity = entitySegment(dataEntity)
    // Copy the options so later mutation can't bypass validation.
    const { fields, size, query, sort } = opts
    if (size !== undefined && (!Number.isInteger(size) || size < 1 || size > MAX_SCROLL_SIZE)) {
      throw new VtexUsageError(`size must be an integer between 1 and ${MAX_SCROLL_SIZE} (got ${String(size)})`)
    }
    return this.#scroll(entity, { fields: fields ? [...fields] : undefined, size, query, sort }, call)
  }

  async *#scroll(entity: string, opts: ScrollOptions, call: CallOptions | undefined): AsyncGenerator<unknown> {
    let token: string | undefined
    for (;;) {
      const query: Record<string, unknown> = {}
      if (opts.fields?.length) query['_fields'] = opts.fields.join(',')
      if (opts.size) query['_size'] = opts.size
      if (opts.query) query['_where'] = opts.query
      if (opts.sort) query['_sort'] = opts.sort
      if (token) query['_token'] = token
      const { data, headers } = await this.http.requestRaw<unknown>(
        withCall({ method: 'GET', path: `/api/dataentities/${entity}/scroll`, query }, call),
      )
      if (data === undefined && token) {
        throw new VtexUnexpectedResponseError('Master Data scroll returned an empty body in the middle of a scroll', data)
      }
      const rows = data ?? []
      if (!Array.isArray(rows)) throw new VtexUnexpectedResponseError('Master Data scroll returned a non-array body', data)
      for (const row of rows) yield row
      if (rows.length === 0) return
      const next = headers.get('X-VTEX-MD-TOKEN')
      if (next) token = next
      // Without a token the next request would restart the scroll and yield the same rows forever.
      if (!token) {
        throw new VtexUnexpectedResponseError(
          'Master Data scroll returned rows without an X-VTEX-MD-TOKEN header; refusing to restart the scroll',
          undefined,
        )
      }
    }
  }
}
