import { Binary } from "libs/binary/binary.js";
import { Length } from "mods/asn1/length/length.js";
import { Type } from "mods/asn1/type/type.js";
import { TBSCertificate } from "mods/certificate/tbscertificate.js";

export class Certificate {
  readonly class = Certificate

  static type = new Type(Type.clazzes.universal, true, Type.tags.sequence)

  constructor(
    readonly tbsCertificate: TBSCertificate,
    // readonly algorithmIdentifier: AlgorithmIdentifier,
    // readonly signatureValue: Buffer0
  ) { }

  static read(binary: Binary) {
    const type = Type.read(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.read(binary)

    const tbscert = TBSCertificate.read(binary)

    return new this(tbscert)
  }
}