
export class PEM {
  readonly class = PEM

  static header = `-----BEGIN CERTIFICATE-----`
  static footer = `-----END CERTIFICATE-----`

  static parse(text: string) {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(this.header))
      throw new Error(`Missing PEM header`)
    if (!text.endsWith(this.footer))
      throw new Error(`Missing PEM footer`)

    const body = text.slice(this.header.length, -this.footer.length)

    return Buffer.from(body, "base64")
  }

  static stringify(buffer: Buffer) {
    let result = `${this.header}\n`
    let body = buffer.toString("base64")

    while (body) {
      result += `${body.slice(0, 64)}\n`
      body = body.slice(64)
    }

    result += `${this.footer}\n`
    return result
  }
}
