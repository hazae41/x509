import { Bytes } from "@hazae41/bytes"
import { Err, Ok, Result } from "@hazae41/result"

export namespace PEM {
  export const header = `-----BEGIN CERTIFICATE-----`
  export const footer = `-----END CERTIFICATE-----`

  export class ParseError extends Error {
    readonly #class = ParseError
  }

  export function tryParse(text: string): Result<Bytes, ParseError> {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(header))
      return new Err(new ParseError(`Missing PEM header`))
    if (!text.endsWith(footer))
      return new Err(new ParseError(`Missing PEM footer`))

    const body = text.slice(header.length, -footer.length)

    return new Ok(Bytes.fromBase64(body))
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
