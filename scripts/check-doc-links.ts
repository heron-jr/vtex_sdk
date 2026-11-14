/**
 * Checks that every developer-portal link used by docs/api-reference resolves (HTTP 200).
 * Run after re-pinning schemas: `npm run check-doc-links`. Network access, no credentials.
 */
import { readFile } from 'node:fs/promises'
import { parseSchemaLock } from './codegen/integrity.js'
import { portalUrl } from './codegen/docs.js'

const lock = parseSchemaLock(JSON.parse(await readFile('scripts/schemas.lock.json', 'utf8')))
let failed = 0
for (const file of Object.keys(lock.files).sort()) {
  const url = portalUrl(file)
  if (!url) {
    console.log(`skip  ${file} (no portal page)`)
    continue
  }
  const res = await fetch(url, { method: 'GET', redirect: 'manual' })
  await res.body?.cancel()
  if (res.status === 200) {
    console.log(`ok    ${file} -> ${url}`)
  } else {
    failed++
    console.log(`FAIL  ${file} -> ${url} (HTTP ${res.status}); fix PORTAL_SLUG_OVERRIDES in scripts/codegen/docs.ts`)
  }
}
if (failed > 0) process.exit(1)
