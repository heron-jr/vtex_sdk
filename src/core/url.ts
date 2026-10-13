import { VtexUsageError } from './errors.js'
import type { VtexEnvironment } from './types.js'

/** Default server template: the account host. */
export const DEFAULT_SERVER = 'https://{accountName}.{environment}.com.br'

export const VTEX_ENVIRONMENTS: readonly VtexEnvironment[] = Object.freeze(['vtexcommercestable', 'vtexcommercebeta'] as const)

/** Registrable domains the SDK may send credentials to. Frozen, because it is the core of host safety. */
export const VTEX_DOMAIN_ALLOWLIST: readonly string[] = Object.freeze([
  'vtexcommercestable.com.br',
  'vtexcommercebeta.com.br',
  'myvtex.com',
  'vtex.com',
  'vtexpayments.com.br',
])

const ACCOUNT_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i
const HOSTNAME_RE = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i

/** Validates a VTEX account name (a single ASCII DNS label) and lowercases it. */
export function normalizeAccount(account: unknown): string {
  if (typeof account !== 'string' || account === '') throw new VtexUsageError('VTEX account is required')
  if (!ACCOUNT_RE.test(account)) {
    throw new VtexUsageError(`Invalid VTEX account name ${JSON.stringify(account)}: use letters, digits and hyphens only`)
  }
  return account.toLowerCase()
}

/** Validates a VTEX environment name; defaults to vtexcommercestable. */
export function validateEnvironment(environment: unknown = 'vtexcommercestable'): VtexEnvironment {
  if (typeof environment !== 'string' || !(VTEX_ENVIRONMENTS as readonly string[]).includes(environment)) {
    throw new VtexUsageError(
      `Invalid VTEX environment ${JSON.stringify(environment)}: expected one of ${VTEX_ENVIRONMENTS.join(', ')}`,
    )
  }
  return environment as VtexEnvironment
}

/** True when a parsed URL hostname is an allowlisted VTEX domain or a subdomain of one. */
export function isAllowlistedHost(hostname: string): boolean {
  if (typeof hostname !== 'string' || !HOSTNAME_RE.test(hostname)) return false
  const host = hostname.toLowerCase()
  return VTEX_DOMAIN_ALLOWLIST.some((domain) => host === domain || host.endsWith(`.${domain}`))
}

export interface ResolvedServer {
  /** e.g. "https://acme.vtexcommercestable.com.br" */
  readonly origin: string
  /** Path prefix without a trailing slash, e.g. "/api" or "" */
  readonly basePath: string
}

/** Fills a server template with a validated account and environment, then checks the resulting host. */
export function resolveServer(template: string, account: string, environment: VtexEnvironment): ResolvedServer {
  if (typeof template !== 'string') throw new VtexUsageError(`Server template must be a string (got ${typeof template})`)
  const accountName = normalizeAccount(account)
  const env = validateEnvironment(environment)
  const filled = template.replaceAll('{accountName}', () => accountName).replaceAll('{environment}', () => env)
  if (/[{}]/.test(filled)) throw new VtexUsageError(`Unresolved variable in server template ${JSON.stringify(template)}`)
  let url: URL
  try {
    url = new URL(filled)
  } catch {
    throw new VtexUsageError(`Invalid server template ${JSON.stringify(template)}`)
  }
  if (url.protocol === 'http:') url.protocol = 'https:'
  if (url.protocol !== 'https:') throw new VtexUsageError(`Server template must use https: ${JSON.stringify(template)}`)
  if (url.username || url.password || url.port || url.search || url.hash) {
    throw new VtexUsageError(
      `Server template must not contain credentials, a port, a query or a fragment: ${JSON.stringify(template)}`,
    )
  }
  if (!isAllowlistedHost(url.hostname)) {
    throw new VtexUsageError(`Refusing to send VTEX credentials to non-VTEX host ${JSON.stringify(url.hostname)}`)
  }
  return { origin: url.origin, basePath: url.pathname.replace(/\/+$/, '') }
}

/** Encodes one path segment; rejects missing, non-finite and dot-segment values. */
export function encodePathParam(value: string | number): string {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new VtexUsageError(`Invalid path parameter ${String(value)}`)
  } else if (typeof value !== 'string') {
    throw new VtexUsageError('Path parameter must be a string or a finite number')
  }
  const text = String(value)
  if (text === '' || text === '.' || text === '..') throw new VtexUsageError(`Invalid path parameter ${JSON.stringify(text)}`)
  try {
    return encodeURIComponent(text)
  } catch {
    throw new VtexUsageError('Path parameter contains an unpaired surrogate')
  }
}

/** Serializes query parameters, skipping undefined/null and repeating array values. */
export function buildQuery(query?: Record<string, unknown>): string {
  if (!query) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, String(v))
    } else {
      params.append(key, String(value))
    }
  }
  const s = params.toString()
  return s ? `?${s}` : ''
}

/**
 * Joins server, path and query. Refuses paths that are not strings, are relative,
 * carry their own query/fragment, contain dot segments or characters the URL parser
 * would rewrite, and any result that is not https on an allowlisted host or that
 * changes the server's origin. Paths must be pre-encoded (see encodePathParam).
 */
export function buildRequestUrl(server: ResolvedServer, path: string, query?: Record<string, unknown>): string {
  if (typeof path !== 'string') throw new VtexUsageError(`Request path must be a string (got ${typeof path})`)
  if (!path.startsWith('/')) throw new VtexUsageError(`Request path must start with "/": ${JSON.stringify(path)}`)
  if (/[?#\\]/.test(path)) throw new VtexUsageError(`Request path must not contain "?", "#" or "\\": ${JSON.stringify(path)}`)
  const rawPath = server.basePath + path
  let url: URL
  try {
    url = new URL(server.origin + rawPath)
  } catch {
    throw new VtexUsageError(`Invalid request URL for path ${JSON.stringify(path)}`)
  }
  if (
    url.protocol !== 'https:' ||
    url.port !== '' ||
    !isAllowlistedHost(url.hostname) ||
    url.origin !== server.origin ||
    url.pathname !== rawPath
  ) {
    throw new VtexUsageError(`Request path is not normalized or escapes the server: ${JSON.stringify(path)}`)
  }
  return url.origin + url.pathname + buildQuery(query)
}
