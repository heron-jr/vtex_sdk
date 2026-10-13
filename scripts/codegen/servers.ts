import { DEFAULT_SERVER, VTEX_DOMAIN_ALLOWLIST, isAllowlistedHost } from '../../src/core/url.js'

export interface ServerObject {
  url: string
  variables?: Record<string, { default?: unknown; enum?: unknown[] }>
}

/** Allowlisted domains whose hosts are not account-scoped. Every other allowlisted domain is (fail-closed). */
const SERVICE_DOMAINS = new Set(['vtex.com'])
/** Shared VTEX service hosts on the commerce domains, e.g. portal.vtexcommercestable.com.br. */
const SHARED_SERVICE_LABELS = new Set(['api', 'logistics', 'portal', 'prchub', 'rnb'])
const COMMERCE_DOMAINS = new Set(['vtexcommercestable.com.br', 'vtexcommercebeta.com.br'])
/**
 * VTEX IO app routes (app.io.vtex.com/{app}/...) run third-party app code, e.g. carriers'
 * apps in the Shipping Network protocol. The SDK never sends the merchant's credentials there.
 */
const IO_APP_DOMAIN = 'io.vtex.com'
/**
 * Canonical template: exact `https://` prefix, a host of letters, digits, dots, dashes and
 * placeholders, and plain path segments (no `%`, `\`, `?`, `#`, `@`, `:` or whitespace).
 */
const TEMPLATE_RE = /^https:\/\/[A-Za-z0-9.{}-]+(?:\/[A-Za-z0-9._~{}-]+)*$/

/**
 * Normalizes an OpenAPI server into a template that only contains {accountName}
 * and/or {environment}, or returns undefined when the SDK must not call it.
 */
export function normalizeServer(server: ServerObject): string | undefined {
  if (typeof server?.url !== 'string') return undefined
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
  if (!TEMPLATE_RE.test(url)) return undefined
  const filled = url.replaceAll('{accountName}', 'acme').replaceAll('{environment}', 'vtexcommercestable')
  if (/[{}]/.test(filled)) return undefined // stray or unclosed braces
  let sample: URL
  try {
    sample = new URL(filled)
  } catch {
    return undefined
  }
  // The parser must not have rewritten anything (case, IDNA, trailing dot, dot segments), so
  // the checks below, which read the raw template, see exactly the host and path used at runtime.
  const rawHost = filled.slice('https://'.length).split('/')[0]
  const rawPath = filled.slice('https://'.length + rawHost.length) || '/'
  if (sample.hostname !== rawHost || sample.pathname !== rawPath) return undefined
  if (!isAllowlistedHost(sample.hostname)) return undefined
  if (sample.hostname === IO_APP_DOMAIN || sample.hostname.endsWith(`.${IO_APP_DOMAIN}`)) return undefined
  const domain = VTEX_DOMAIN_ALLOWLIST.find((d) => sample.hostname === d || sample.hostname.endsWith(`.${d}`))
  if (domain === undefined) return undefined
  if (!SERVICE_DOMAINS.has(domain)) {
    const firstLabel = url.slice('https://'.length).split('/')[0].split('.')[0]
    const shared = COMMERCE_DOMAINS.has(domain) && SHARED_SERVICE_LABELS.has(firstLabel)
    if (firstLabel !== '{accountName}' && !shared) return undefined
  }
  return url
}

/**
 * Picks the server for an operation: operation > path item > document. The first
 * level that declares servers decides; within it, the first resolvable entry wins.
 * When no level declares servers, the account host is used. A level whose `servers`
 * is present but not an array counts as declared and unresolvable.
 */
export function pickServer(levels: Array<ServerObject[] | undefined>): string | undefined {
  for (const level of levels) {
    if (level === undefined || level === null) continue
    if (!Array.isArray(level)) return undefined
    if (level.length === 0) continue
    for (const server of level) {
      const template = normalizeServer(server)
      if (template) return template
    }
    return undefined
  }
  return DEFAULT_SERVER
}

/**
 * Drops a base-path segment that the operation path repeats (e.g. ".../pricing" + "/pricing/tables").
 * A templated segment such as {accountName} is never dropped, so the account always comes from config.
 */
export function trimBasePathOverlap(template: string, path: string): string {
  const pathStart = template.indexOf('/', 'https://'.length)
  if (pathStart === -1) return template
  const origin = template.slice(0, pathStart)
  const baseSegments = template.slice(pathStart).split('/').filter(Boolean)
  const firstPathSegment = path.split('/').filter(Boolean)[0]
  const last = baseSegments[baseSegments.length - 1]
  if (last === undefined || last !== firstPathSegment || /[{}]/.test(last)) return template
  baseSegments.pop()
  return baseSegments.length > 0 ? `${origin}/${baseSegments.join('/')}` : origin
}
