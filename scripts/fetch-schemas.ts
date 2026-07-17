import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// Pin to a specific commit for reproducibility. Update deliberately.
const REF = '1ca3d11c8dfc9dd17484eabad051d364e767c50d'
const API = `https://api.github.com/repos/vtex/openapi-schemas/contents?ref=${REF}`
const SKIP = new Set(['config.json', 'package.json', 'package-lock.json', 'rating-config.json'])

async function main() {
  const res = await fetch(API, { headers: { 'User-Agent': 'vtex-sdk-codegen' } })
  if (!res.ok) throw new Error(`GitHub listing failed: ${res.status}`)
  const entries = (await res.json()) as Array<{ name: string; download_url: string }>
  const schemas = entries.filter((e) => e.name.endsWith('.json') && !SKIP.has(e.name))
  await mkdir('schemas', { recursive: true })
  let n = 0
  for (const e of schemas) {
    const raw = await fetch(e.download_url, { headers: { 'User-Agent': 'vtex-sdk-codegen' } })
    if (!raw.ok) throw new Error(`Download failed for ${e.name}: ${raw.status}`)
    await writeFile(join('schemas', e.name), await raw.text())
    n++
    console.log(`saved ${e.name}`)
  }
  console.log(`\nDownloaded ${n} API schemas (skipped ${SKIP.size} tooling files).`)
}

main().catch((err) => { console.error(err); process.exit(1) })
