import { Bytes } from "libs/bytes/bytes.js"

export namespace PEM {
  export const header = `-----BEGIN CERTIFICATE-----`
  export const footer = `-----END CERTIFICATE-----`

  export function parse(text: string) {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(header))
      throw new Error(`Missing PEM header`)
    if (!text.endsWith(footer))
      throw new Error(`Missing PEM footer`)

    const body = text.slice(header.length, -footer.length)

    return Bytes.fromBase64(body)
  }

  export function stringify(bytes: Uint8Array) {
    let result = `${header}\n`
    let body = Bytes.toBase64(bytes)

    while (body) {
      result += `${body.slice(0, 64)}\n`
      body = body.slice(64)
    }

    result += `${footer}\n`
    return result
  }
}
