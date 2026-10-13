import { DEFAULT_SERVER, isAllowlistedHost } from '../../src/core/url.js'

export interface ServerObject {
  url: string
  variables?: Record<string, { default?: unknown; enum?: unknown[] }>
}

/** Domains where the first host label identifies an account (or a shared VTEX service). */
const ACCOUNT_SCOPED_DOMAINS = ['vtexcommercestable.com.br', 'vtexcommercebeta.com.br', 'myvtex.com', 'vtexpayments.com.br']
const SHARED_SERVICE_LABELS = new Set(['api', 'logistics', 'portal', 'prchub', 'rnb'])

/**
 * Normalizes an OpenAPI server into a template that only contains {accountName}
 * and/or {environment}, or returns undefined when the SDK must not call it.
 */
export function normalizeServer(server: ServerObject): string | undefined {
  let url = server.url.replaceAll('{account}', '{accountName}')
  const names = new Set([...url.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]))
  for (const name of names) {
    if (name === 'accountName') continue
    if (name === 'environment') {
      if (server.variables?.environment?.default === 'myvtex') url = url.replaceAll('{environment}', 'myvtex')
      continue
    }
    return undefined
  }
  if (url.startsWith('http://')) url = `https://${url.slice('http://'.length)}`
  url = url.replace(/\/+$/, '')
  let sample: URL
  try {
    sample = new URL(url.replaceAll('{accountName}', 'acme').replaceAll('{environment}', 'vtexcommercestable'))
  } catch {
    return undefined
  }
  if (sample.protocol !== 'https:' || sample.username || sample.password || sample.port || sample.search || sample.hash) {
    return undefined
  }
  if (!isAllowlistedHost(sample.hostname)) return undefined
  const accountScoped = ACCOUNT_SCOPED_DOMAINS.some((d) => sample.hostname === d || sample.hostname.endsWith(`.${d}`))
  if (accountScoped) {
    const firstLabel = url.slice('https://'.length).split('/')[0].split('.')[0]
    if (firstLabel !== '{accountName}' && !SHARED_SERVICE_LABELS.has(firstLabel)) return undefined
  }
  return url
}

/**
 * Picks the server for an operation: operation > path item > document. The first
 * level that declares servers decides; within it, the first resolvable entry wins.
 * When no level declares servers, the account host is used.
 */
export function pickServer(levels: Array<ServerObject[] | undefined>): string | undefined {
  for (const level of levels) {
    if (!Array.isArray(level) || level.length === 0) continue
    for (const server of level) {
      const template = normalizeServer(server)
      if (template) return template
    }
    return undefined
  }
  return DEFAULT_SERVER
}

/** Drops a base-path segment that the operation path repeats (e.g. ".../pricing" + "/pricing/tables"). */
export function trimBasePathOverlap(template: string, path: string): string {
  const pathStart = template.indexOf('/', 'https://'.length)
  if (pathStart === -1) return template
  const origin = template.slice(0, pathStart)
  const baseSegments = template.slice(pathStart).split('/').filter(Boolean)
  const firstPathSegment = path.split('/').filter(Boolean)[0]
  if (baseSegments.length === 0 || baseSegments[baseSegments.length - 1] !== firstPathSegment) return template
  baseSegments.pop()
  return baseSegments.length > 0 ? `${origin}/${baseSegments.join('/')}` : origin
}
