import { VtexUsageError } from './errors.js'
import type { VtexEnvironment } from './types.js'

/** Default server template: the account host. */
export const DEFAULT_SERVER = 'https://{accountName}.{environment}.com.br'

export const VTEX_ENVIRONMENTS: readonly VtexEnvironment[] = ['vtexcommercestable', 'vtexcommercebeta']

/** Registrable domains the SDK may send credentials to. */
export const VTEX_DOMAIN_ALLOWLIST: readonly string[] = [
  'vtexcommercestable.com.br',
  'vtexcommercebeta.com.br',
  'myvtex.com',
  'vtex.com',
  'vtexpayments.com.br',
]

const ACCOUNT_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/

/** Lowercases and validates a VTEX account name (a single DNS label). */
export function normalizeAccount(account: unknown): string {
  if (typeof account !== 'string' || account === '') throw new VtexUsageError('VTEX account is required')
  const normalized = account.toLowerCase()
  if (!ACCOUNT_RE.test(normalized)) {
    throw new VtexUsageError(`Invalid VTEX account name ${JSON.stringify(account)}: use letters, digits and hyphens only`)
  }
  return normalized
}

export function validateEnvironment(environment: unknown = 'vtexcommercestable'): VtexEnvironment {
  if (typeof environment !== 'string' || !(VTEX_ENVIRONMENTS as readonly string[]).includes(environment)) {
    throw new VtexUsageError(
      `Invalid VTEX environment ${JSON.stringify(environment)}: expected one of ${VTEX_ENVIRONMENTS.join(', ')}`,
    )
  }
  return environment as VtexEnvironment
}

export function isAllowlistedHost(hostname: string): boolean {
  const host = hostname.toLowerCase()
  return VTEX_DOMAIN_ALLOWLIST.some((domain) => host === domain || host.endsWith(`.${domain}`))
}

export interface ResolvedServer {
  /** e.g. "https://acme.vtexcommercestable.com.br" */
  origin: string
  /** Path prefix without a trailing slash, e.g. "/api" or "" */
  basePath: string
}

/** Fills a server template with an already-validated account and environment, then checks the host. */
export function resolveServer(template: string, account: string, environment: VtexEnvironment): ResolvedServer {
  const filled = template.replaceAll('{accountName}', account).replaceAll('{environment}', environment)
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

/** Encodes one path segment; rejects values that would be empty or dot segments. */
export function encodePathParam(value: string | number): string {
  if (value === undefined || value === null) throw new VtexUsageError('Path parameter is required')
  const text = String(value)
  if (text === '' || text === '.' || text === '..') throw new VtexUsageError(`Invalid path parameter ${JSON.stringify(text)}`)
  return encodeURIComponent(text)
}

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
 * Joins server, path and query, refusing paths that are relative, carry their own
 * query/fragment, contain dot segments or would change the origin.
 */
export function buildRequestUrl(server: ResolvedServer, path: string, query?: Record<string, unknown>): string {
  if (!path.startsWith('/')) throw new VtexUsageError(`Request path must start with "/": ${JSON.stringify(path)}`)
  if (/[?#\\]/.test(path)) throw new VtexUsageError(`Request path must not contain "?", "#" or "\\": ${JSON.stringify(path)}`)
  const rawPath = server.basePath + path
  const url = new URL(server.origin + rawPath)
  if (url.origin !== server.origin || url.pathname !== rawPath) {
    throw new VtexUsageError(`Request path is not normalized or escapes the server: ${JSON.stringify(path)}`)
  }
  return url.origin + url.pathname + buildQuery(query)
}

/** Legacy helper used by the 0.1 transport until the transport rewrite. */
export function resolveBaseUrl(account: string, environment: VtexEnvironment = 'vtexcommercestable'): string {
  return resolveServer(DEFAULT_SERVER, normalizeAccount(account), validateEnvironment(environment)).origin
}
