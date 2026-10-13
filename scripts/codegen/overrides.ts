/**
 * Targeted corrections for VTEX schema quirks the generic generator cannot detect,
 * such as a literal property name used to mean "any key". Codegen fails when a
 * pointer no longer resolves, so a schema re-pin surfaces stale overrides.
 */
export interface SchemaOverride {
  /** Schema file name under schemas/. */
  file: string
  /** RFC 6901 JSON pointer to the node to replace. */
  pointer: string
  /** Returns the replacement node; `undefined` deletes the node. */
  transform: (node: any) => unknown
  reason: string
}

export const OVERRIDES: SchemaOverride[] = [
  {
    file: 'VTEX - Orders API.json',
    pointer: '/components/schemas/Headers',
    transform: () => ({ title: 'Headers', type: 'object', additionalProperties: { type: 'string' } }),
    reason: 'Order-hook headers are a header-name to value map; the schema shows a literal "key" property.',
  },
  {
    file: 'VTEX - Orders API.json',
    pointer: '/paths/~1api~1orders~1hook~1config/post/responses/200/content/application~1json/schema',
    transform: () => ({}),
    reason: 'The documented 200 schema is the hook notification payload, not the configuration response.',
  },
  {
    file: 'VTEX - Promotions & Taxes API.json',
    pointer:
      '/paths/~1api~1rnb~1pvt~1coupon~1usage~1{couponCode}/get/responses/200/content/application~1json/schema/properties/profileUsages',
    transform: (node) => {
      if (!node?.properties?.profileId) throw new Error('profileUsages.properties.profileId not found')
      return { type: 'object', description: node.description, additionalProperties: node.properties.profileId }
    },
    reason: 'profileUsages is keyed by profile id; the schema shows a literal "profileId" property.',
  },
  {
    file: 'VTEX - Search API.json',
    pointer: '/paths/~1api~1catalog_system~1pub~1products~1crossselling~1showtogether~1{productId}/get/servers',
    transform: () => undefined,
    reason: 'The operation-level server was copied from another store (entelperu); use the account host.',
  },
  {
    file: 'VTEX - Search API.json',
    pointer: '/paths/~1api~1catalog_system~1pub~1products~1crossselling~1accessories~1{productId}/get/servers',
    transform: () => undefined,
    reason: 'The operation-level server was copied from another store (entelperu); use the account host.',
  },
]

function decodeSegment(segment: string): string {
  return segment.replace(/~1/g, '/').replace(/~0/g, '~')
}

/** Applies every override registered for `file` to `doc` in place and returns how many were applied. */
export function applyOverrides(file: string, doc: any, overrides: SchemaOverride[] = OVERRIDES): number {
  let applied = 0
  for (const override of overrides) {
    if (override.file !== file) continue
    const fail = () => new Error(`Schema override for ${file} no longer applies: ${override.pointer} (${override.reason})`)
    const segments = override.pointer.split('/').slice(1).map(decodeSegment)
    const last = segments.pop()
    let parent = doc
    for (const segment of segments) {
      parent = parent?.[segment]
      if (parent === null || typeof parent !== 'object') throw fail()
    }
    if (last === undefined || !(last in parent)) throw fail()
    const next = override.transform(parent[last])
    if (next === undefined) delete parent[last]
    else parent[last] = next
    applied++
  }
  return applied
}
