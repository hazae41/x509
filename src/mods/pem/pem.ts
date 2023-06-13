import { Bytes } from "@hazae41/bytes"
import { Err, Ok, Result } from "@hazae41/result"

export namespace PEM {
  export const header = `-----BEGIN CERTIFICATE-----`
  export const footer = `-----END CERTIFICATE-----`

  export class MissingHeaderError extends Error {
    readonly #class = MissingHeaderError
    readonly name = this.#class.name

    constructor() {
      super(`Missing PEM header`)
    }
  }

  export class MissingFooterError extends Error {
    readonly #class = MissingFooterError
    readonly name = this.#class.name

    constructor() {
      super(`Missing PEM footer`)
    }
  }

  export function tryParse(text: string): Result<Bytes, MissingHeaderError | MissingFooterError> {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(header))
      return new Err(new MissingHeaderError())
    if (!text.endsWith(footer))
      return new Err(new MissingFooterError())

    const body = text.slice(header.length, -footer.length)

    return new Ok(Bytes.fromBase64(body))
  }

  export function stringify(bytes: Bytes) {
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
