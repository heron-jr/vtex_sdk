import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { assertSchemaDownloadUrl, gitBlobSha } from './codegen/integrity.js'

// Pin to a specific commit for reproducibility. Update deliberately.
const REF = '1ca3d11c8dfc9dd17484eabad051d364e767c50d'
const API = `https://api.github.com/repos/vtex/openapi-schemas/contents?ref=${REF}`
const SKIP = new Set(['config.json', 'package.json', 'package-lock.json', 'rating-config.json'])

async function main() {
  const headers: Record<string, string> = { 'User-Agent': 'vtex-sdk-codegen' }
  // Optional: avoids the anonymous GitHub API rate limit (e.g. in CI).
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(API, { headers })
  if (!res.ok) throw new Error(`GitHub listing failed: ${res.status}`)
  const entries = (await res.json()) as Array<{ name: string; download_url: string; sha: string }>
  const schemas = entries.filter((e) => e.name.endsWith('.json') && !SKIP.has(e.name))
  await mkdir('schemas', { recursive: true })
  for (const e of schemas) {
    const url = assertSchemaDownloadUrl(e.download_url)
    const raw = await fetch(url, { headers: { 'User-Agent': 'vtex-sdk-codegen' }, redirect: 'error' })
    if (!raw.ok) throw new Error(`Download failed for ${e.name}: ${raw.status}`)
    const content = new Uint8Array(await raw.arrayBuffer())
    const sha = gitBlobSha(content)
    if (sha !== e.sha) throw new Error(`Integrity check failed for ${e.name}: expected blob ${e.sha}, got ${sha}`)
    await writeFile(join('schemas', e.name), content)
    console.log(`saved ${e.name}`)
  }
  console.log(`\nDownloaded and verified ${schemas.length} API schemas (skipped ${SKIP.size} tooling files).`)
}

main().catch((err) => { console.error(err); process.exit(1) })
