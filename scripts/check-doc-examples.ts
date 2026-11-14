/**
 * Type-checks every ```ts block in the guides, the README and CLAUDE.md against the current
 * source, so documented examples can't drift from the API. `npm run check-doc-examples`.
 *
 * Each block is compiled as its own module, with `vtex-sdk` mapped to src/index.ts. Blocks that
 * don't create a client get `declare const vtex: VtexClient` prepended. Inputs a block doesn't
 * define go either in the block as `declare const x: T`, or, to keep a short snippet readable,
 * in an HTML comment on the line right above the fence: `<!-- ts-prelude: declare const x: T -->`.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const OUT = '.doc-examples'
const PRELUDE_RE = /^<!-- ts-prelude: (.*) -->$/
const sources = [
  'README.md',
  'CLAUDE.md',
  ...(await readdir('docs/guides')).filter((f) => f.endsWith('.md')).sort().map((f) => `docs/guides/${f}`),
].filter((f) => existsSync(f))
const PRELUDE = "declare const vtex: import('vtex-sdk').VtexClient\n"

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

let count = 0
for (const source of sources) {
  const lines = (await readFile(source, 'utf8')).split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== '```ts') continue
    const extra = PRELUDE_RE.exec(lines[i - 1]?.trim() ?? '')?.[1] ?? ''
    const start = i + 1
    const body: string[] = []
    for (i = start; i < lines.length && lines[i].trim() !== '```'; i++) body.push(lines[i])
    const code = body.join('\n')
    const needsClient = !/\b(?:const|let|var)\s+vtex\b/.test(code)
    const name = `${source.replace(/[/\\.]/g, '_')}_L${start + 1}.ts`
    const prelude = `${needsClient ? PRELUDE : ''}${extra ? `${extra}\n` : ''}`
    await writeFile(join(OUT, name), `// ${source}:${start + 1}\n${prelude}${code}\nexport {}\n`)
    count++
  }
}

await writeFile(
  join(OUT, 'tsconfig.json'),
  JSON.stringify(
    {
      extends: '../tsconfig.json',
      compilerOptions: { noEmit: true, rootDir: '..', paths: { 'vtex-sdk': ['../src/index.ts'] }, noUnusedLocals: false },
      include: ['*.ts'],
    },
    null,
    2,
  ),
)

const tsc = createRequire(import.meta.url).resolve('typescript/bin/tsc')
const result = spawnSync(process.execPath, [tsc, '-p', join(OUT, 'tsconfig.json')], { stdio: 'inherit' })
if (result.status !== 0) {
  console.error(`\nDoc examples failed to type-check (files in ${OUT}/ start with their source line).`)
  process.exit(1)
}
console.log(`Type-checked ${count} doc examples from ${sources.length} files.`)
