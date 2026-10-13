import { createHash } from 'node:crypto'

/** Git blob SHA-1 of `content`, the value GitHub's contents API reports as `sha`. */
export function gitBlobSha(content: Uint8Array): string {
  return createHash('sha1').update(`blob ${content.byteLength}\0`).update(content).digest('hex')
}

/** Only raw.githubusercontent.com over https is accepted as a schema download source. */
export function assertSchemaDownloadUrl(downloadUrl: string): URL {
  const url = new URL(downloadUrl)
  if (url.protocol !== 'https:' || url.hostname !== 'raw.githubusercontent.com') {
    throw new Error(`Refusing to download a schema from ${url.origin}`)
  }
  return url
}
