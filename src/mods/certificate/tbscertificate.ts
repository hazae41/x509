import { Integer, Triplet, Type } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";

export class TBSCertificate {
  readonly #class = TBSCertificate

  constructor(
    readonly version = new TBSCertificateVersion(1),
    readonly serialNumber: Integer,
    // readonly algorithm: AlgorithmIdentifier
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)
    const version = reader.tryReadType(TBSCertificateVersion)
    const serialNumber = reader.readInteger()

    return new this(version, serialNumber)
  }
}

class TBSCertificateVersion {
  readonly #class = TBSCertificateVersion

  static type = new Type(
    Type.clazzes.CONTEXT,
    Type.wraps.CONSTRUCTED,
    0)

  constructor(
    readonly value: number
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromConstructed(triplet, this.type)
    const value = Number(reader.readInteger().value)

    return new this(value)
  }
}
