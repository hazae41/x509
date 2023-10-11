import { Base64 } from "@hazae41/base64"
import { Box, Copied } from "@hazae41/box"
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

  export function tryDecode(text: string): Result<Uint8Array, MissingHeaderError | MissingFooterError | Base64.DecodeError> {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(header))
      return new Err(new MissingHeaderError())
    if (!text.endsWith(footer))
      return new Err(new MissingFooterError())

    const body = text.slice(header.length, -footer.length)

    return Base64.get().tryDecodePadded(body).mapSync(x => x.copyAndDispose().bytes)
  }

  export function tryEncode(bytes: Uint8Array): Result<string, Base64.EncodeError> {
    return Result.unthrowSync(t => {
      let result = `${header}\n`
      let body = Base64.get().tryEncodePadded(new Box(new Copied(bytes))).throw(t)

      while (body) {
        result += `${body.slice(0, 64)}\n`
        body = body.slice(64)
      }

      result += `${footer}\n`
      return new Ok(result)
    })
  }
}
