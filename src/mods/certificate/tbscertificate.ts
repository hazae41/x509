import { Integer, Triplet, Type } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";
import { AlgorithmIdentifier } from "mods/algorithm/algorithm.js";
import { Name } from "mods/name/name.js";

export class TBSCertificate {
  readonly #class = TBSCertificate

  constructor(
    readonly version = new TBSCertificateVersion(1),
    readonly serialNumber: Integer,
    readonly signature: AlgorithmIdentifier,
    readonly issuer: Name,
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)
    const version = reader.tryReadType(TBSCertificateVersion)
    const serialNumber = reader.readInteger()
    const signature = reader.readType(AlgorithmIdentifier)
    const issuer = reader.readType(Name)

    return new this(version, serialNumber, signature, issuer)
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
