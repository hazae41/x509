
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

    return Buffer.from(body, "base64")
  }

  export function stringify(buffer: Buffer) {
    let result = `${header}\n`
    let body = buffer.toString("base64")

    while (body) {
      result += `${body.slice(0, 64)}\n`
      body = body.slice(64)
    }

    result += `${footer}\n`
    return result
  }
}
