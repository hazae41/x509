import { Binary } from "libs/binary/binary.js";
import { Length } from "mods/asn1/length/length.js";
import { Type } from "mods/asn1/type/type.js";
import { TBSCertificate } from "mods/x509/certificate/tbscertificate.js";

export class Certificate {
  readonly class = Certificate

  static type = new Type(Type.clazzes.UNIVERSAL, true, Type.tags.SEQUENCE)

  constructor(
    readonly tbsCertificate: TBSCertificate,
    // readonly algorithmIdentifier: AlgorithmIdentifier,
    // readonly signatureValue: Buffer0
  ) { }

  static read(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)

    const tbscert = TBSCertificate.read(binary)

    return new this(tbscert)
  }
}