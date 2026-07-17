import { methodName } from './naming.js'
import { schemaToType } from './types.js'

interface Ctx {
  httpMethod: string
  path: string
  op: any
  refName: (ref: string) => string
}

function jsonContent(container: any): any | undefined {
  const content = container?.content
  if (!content) return undefined
  const key = Object.keys(content).find((k) => k.startsWith('application/json'))
  return key ? content[key].schema : undefined
}

function successSchema(op: any): any | undefined {
  const responses = op.responses ?? {}
  const code = Object.keys(responses).find((c) => c.startsWith('2')) // 200/201/202/204
  if (!code) return undefined
  return jsonContent(responses[code])
}

export function generateMethod(ctx: Ctx): string {
  const { httpMethod, path, op, refName } = ctx
  const name = methodName(op, httpMethod, path)
  const params: any[] = op.parameters ?? []
  const pathParams = params.filter((p) => p.in === 'path')
  const queryParams = params.filter((p) => p.in === 'query')
  const bodySchema = jsonContent(op.requestBody)
  const retSchema = successSchema(op)
  const retType = retSchema ? schemaToType(retSchema, refName) : 'unknown'

  // Options-object type
  const optionFields: string[] = []
  for (const p of [...pathParams, ...queryParams]) {
    const opt = p.required ? '' : '?'
    optionFields.push(`  ${p.name}${opt}: ${schemaToType(p.schema ?? {}, refName)}`)
  }
  if (bodySchema) optionFields.push(`  body: ${schemaToType(bodySchema, refName)}`)
  const optionsType = optionFields.length ? `{\n${optionFields.join('\n')}\n}` : 'Record<string, never>'

  // Interpolated path
  const tsPath = path.replace(/\{([^}]+)\}/g, (_m, g) => `\${params.${g}}`)

  const queryObj = queryParams.length
    ? `{ ${queryParams.map((p) => `${JSON.stringify(p.name)}: params.${p.name}`).join(', ')} }`
    : undefined

  const callFields = [
    `method: '${httpMethod.toUpperCase()}'`,
    `path: \`${tsPath}\``,
  ]
  if (queryObj) callFields.push(`query: ${queryObj}`)
  if (bodySchema) callFields.push(`body: params.body`)

  return [
    `  ${name}(params: ${optionsType}): Promise<${retType}> {`,
    `    return this.http.request<${retType}>({ ${callFields.join(', ')} })`,
    `  }`,
  ].join('\n')
}
