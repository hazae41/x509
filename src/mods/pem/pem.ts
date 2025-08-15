import { Base64 } from "@hazae41/base64"
import { Bytes, BytesLike } from "libs/bytes/index.js"

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

  export function decodeOrThrow(text: string): Bytes {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(header))
      throw new MissingHeaderError()
    if (!text.endsWith(footer))
      throw new MissingFooterError()

    const body = text.slice(header.length, -footer.length)

    return Base64.decodePaddedOrThrow(body)
  }

  export function encodeOrThrow(bytes: BytesLike): string {
    let result = `${header}\n`

    let body = Base64.encodePaddedOrThrow(bytes)

    while (body) {
      result += `${body.slice(0, 64)}\n`
      body = body.slice(64)
    }

    result += `${footer}\n`

    return result
  }
}
