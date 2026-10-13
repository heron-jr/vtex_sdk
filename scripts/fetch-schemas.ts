/**
 * npm run fetch-schemas                    downloads the locked schemas into schemas/ (verified)
 * npm run fetch-schemas -- --update-lock <commit-sha>
 *                                          re-pins: rewrites scripts/schemas.lock.json from the
 *                                          GitHub listing at that commit; review the diff
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fetchSchemas, listSchemaLock } from './codegen/fetch.js'
import { parseSchemaLock } from './codegen/integrity.js'

const LOCK_FILE = 'scripts/schemas.lock.json'

async function main(args: string[]): Promise<void> {
  if (args[0] === '--update-lock') {
    if (!args[1]) throw new Error('Usage: npm run fetch-schemas -- --update-lock <commit-sha>')
    // Optional: avoids the anonymous GitHub API rate limit.
    const lock = await listSchemaLock({ ref: args[1], token: process.env.GITHUB_TOKEN })
    await writeFile(LOCK_FILE, `${JSON.stringify(lock, null, 2)}\n`)
    console.log(`Wrote ${LOCK_FILE}: ${Object.keys(lock.files).length} schemas at ${lock.ref}. Review the diff before committing.`)
    return
  }
  const lock = parseSchemaLock(JSON.parse(await readFile(LOCK_FILE, 'utf8')))
  const count = await fetchSchemas({ lock, outDir: 'schemas', log: (line) => console.log(line) })
  console.log(`\nDownloaded and verified ${count} API schemas from ${lock.repo}@${lock.ref}.`)
}

main(process.argv.slice(2)).catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
