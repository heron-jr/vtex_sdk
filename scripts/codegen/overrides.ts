/**
 * Targeted corrections for VTEX schema quirks the generic generator cannot detect,
 * such as a literal property name used to mean "any key". Each override checks that the
 * node still has the known-bad shape, and codegen fails when a pointer no longer resolves
 * or the shape changed, so a schema re-pin surfaces stale overrides instead of
 * silently overwriting a schema VTEX has fixed.
 */
export interface SchemaOverride {
  /** Schema file name under schemas/. */
  file: string
  /** RFC 6901 JSON pointer to the node to replace. */
  pointer: string
  /** True while the node still has the known-bad shape; false fails codegen. */
  matches: (node: any) => boolean
  /** Returns the replacement node; `undefined` deletes the node. */
  transform: (node: any) => unknown
  /** Why VTEX's schema is wrong; quoted in the failure message. */
  reason: string
}

const sameKeys = (obj: unknown, keys: string[]): boolean =>
  typeof obj === 'object' && obj !== null && JSON.stringify(Object.keys(obj).sort()) === JSON.stringify([...keys].sort())

const isEntelperuServers = (node: unknown): boolean =>
  Array.isArray(node) &&
  node.length > 0 &&
  node.every((s) => typeof s?.url === 'string' && s.url.startsWith('https://entelperu.'))

export const OVERRIDES: readonly SchemaOverride[] = [
  {
    file: 'VTEX - Orders API.json',
    pointer: '/components/schemas/Headers',
    matches: (n) => sameKeys(n?.properties, ['key']) && n.additionalProperties === undefined,
    transform: () => ({ title: 'Headers', type: 'object', additionalProperties: { type: 'string' } }),
    reason: 'Order-hook headers are a header-name to value map; the schema shows a literal "key" property.',
  },
  {
    file: 'VTEX - Orders API.json',
    pointer: '/paths/~1api~1orders~1hook~1config/post/responses/200/content/application~1json/schema',
    matches: (n) => sameKeys(n, ['$ref']) && n.$ref === '#/components/schemas/HookConfiguration',
    transform: () => ({}),
    reason:
      'The documented 200 schema is HookConfiguration, the hook notification payload (Domain, OrderId, State...); ' +
      'the real configuration response is undocumented.',
  },
  {
    file: 'VTEX - Promotions & Taxes API.json',
    pointer:
      '/paths/~1api~1rnb~1pvt~1coupon~1usage~1{couponCode}/get/responses/200/content/application~1json/schema/properties/profileUsages',
    matches: (n) => sameKeys(n?.properties, ['profileId']) && typeof n.properties.profileId === 'object',
    transform: (node) => ({
      type: 'object',
      description: node.description,
      additionalProperties: { ...node.properties.profileId, description: 'Coupon usage for one profile ID.' },
    }),
    reason: 'profileUsages is keyed by profile id; the schema shows a literal "profileId" property.',
  },
  {
    file: 'VTEX - Search API.json',
    pointer: '/paths/~1api~1catalog_system~1pub~1products~1crossselling~1showtogether~1{productId}/get/servers',
    matches: isEntelperuServers,
    transform: () => undefined,
    reason:
      'The operation-level server was copied from another store (entelperu) and even hard-codes the ' +
      '/crossselling/accessories path; use the account host.',
  },
  {
    file: 'VTEX - Search API.json',
    pointer: '/paths/~1api~1catalog_system~1pub~1products~1crossselling~1accessories~1{productId}/get/servers',
    matches: isEntelperuServers,
    transform: () => undefined,
    reason: 'The operation-level server was copied from another store (entelperu); use the account host.',
  },
]

/** Segments that would walk into or replace prototypes instead of JSON data. */
const UNSAFE_SEGMENTS = new Set(['__proto__', 'constructor', 'prototype'])

function decodeSegment(segment: string): string {
  return segment.replace(/~1/g, '/').replace(/~0/g, '~')
}

function isContainer(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Applies every override registered for `file` to `doc` in place and returns how many were
 * applied (0 for a file with no overrides; the caller compares the total with OVERRIDES.length).
 * Only own properties are followed, so a pointer can never reach a prototype.
 */
export function applyOverrides(file: string, doc: unknown, overrides: readonly SchemaOverride[] = OVERRIDES): number {
  let applied = 0
  for (const override of overrides) {
    if (override.file !== file) continue
    const fail = (cause?: unknown) =>
      new Error(`Schema override for ${file} no longer applies: ${override.pointer} (${override.reason})`, { cause })
    if (!override.pointer.startsWith('/')) throw fail()
    const segments = override.pointer.split('/').slice(1).map(decodeSegment)
    const last = segments.pop()
    let parent: unknown = doc
    for (const segment of segments) {
      if (UNSAFE_SEGMENTS.has(segment) || !isContainer(parent) || !Object.hasOwn(parent, segment)) throw fail()
      parent = parent[segment]
    }
    if (last === undefined || UNSAFE_SEGMENTS.has(last) || !isContainer(parent) || !Object.hasOwn(parent, last)) {
      throw fail()
    }
    if (Array.isArray(parent)) throw fail() // overrides replace object members only
    const node = parent[last]
    if (!override.matches(node)) throw fail()
    let next: unknown
    try {
      next = override.transform(node)
    } catch (err) {
      throw fail(err)
    }
    if (next === undefined) delete parent[last]
    else parent[last] = next
    applied++
  }
  return applied
}
