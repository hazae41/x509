import { Binary } from "libs/binary/binary.js";
import { Type } from "mods/asn1/type/type.js";

export class PEM {
  readonly class = PEM

  static header = `-----BEGIN CERTIFICATE-----`
  static footer = `-----END CERTIFICATE-----`

  constructor(
    readonly certificate: Certificate
  ) { }

  static from(text: string) {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(this.header))
      throw new Error(`Missing PEM header`)
    if (!text.endsWith(this.footer))
      throw new Error(`Missing PEM footer`)

    const body = text.slice(this.header.length, -this.footer.length)
    const binary = new Binary(Buffer.from(body, "base64"))
    const certificate = Certificate.read(binary)

    return new this(certificate)
  }
}

export class Certificate {
  readonly class = Certificate

  static type = new Type(0, true, 16)

  constructor(
    // readonly tbsCertificate: TBSCertificate,
    // readonly algorithmIdentifier: AlgorithmIdentifier,
    // readonly signatureValue: Buffer0
  ) { }

  static read(binary: Binary) {
    const type = Type.read(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    return new this()
  }
}