import { Binary } from "libs/binary/binary.js";
import { Integer } from "mods/asn1/integer/integer.js";
import { Length } from "mods/asn1/length/length.js";
import { Type } from "mods/asn1/type/type.js";
import { AlgorithmIdentifier } from "mods/x509/algorithm/algorithm.js";

export class TBSCertificate {
  readonly class = TBSCertificate

  static type = new Type(Type.clazzes.universal, true, Type.tags.sequence)

  constructor(
    readonly version: TBSCertificateVersion,
    readonly serialNumber: Integer,
    readonly algorithm: AlgorithmIdentifier
  ) { }

  static read(binary: Binary) {
    const type = Type.read(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.read(binary)
    const content = binary.offset

    const version = TBSCertificateVersion.read(binary)
    const serialNumber = Integer.read(binary)
    const algorithm = AlgorithmIdentifier.read(binary)

    return new this(version, serialNumber, algorithm)
  }
}

class TBSCertificateVersion {
  readonly class = TBSCertificateVersion

  static type = new Type(Type.clazzes.context, true, 0)

  constructor(
    readonly inner = new Integer(BigInt(1))
  ) { }

  static read(binary: Binary) {
    const start = binary.offset

    const type = Type.read(binary)

    if (!this.type.equals(type)) {
      binary.offset = start
      return new this()
    }

    const length = Length.read(binary)
    const content = binary.offset

    const inner = Integer.read(binary)

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(inner)
  }
}