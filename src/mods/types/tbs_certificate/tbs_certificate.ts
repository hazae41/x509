import { Integer, Sequence, Triplet, Type } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { Name } from "mods/types/name/name.js";
import { Validity } from "mods/types/validity/validity.js";

export class TBSCertificate {
  readonly #class = TBSCertificate

  constructor(
    readonly version = new TBSCertificateVersion(1),
    readonly serialNumber: Integer,
    readonly signature: AlgorithmIdentifier,
    readonly issuer: Name,
    readonly validity: Validity,
    readonly subject: Name,
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.from(triplet, Sequence)
    const version = reader.tryReadType(TBSCertificateVersion)
    const serialNumber = reader.readClass(Integer)
    const signature = reader.readType(AlgorithmIdentifier)
    const issuer = reader.readType(Name)
    const validity = reader.readType(Validity)
    const subject = reader.readType(Name)

    return new this(version, serialNumber, signature, issuer, validity, subject)
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
    const value = Number(reader.readClass(Integer).value)

    return new this(value)
  }
}
