import { DER, Integer, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { Name } from "mods/types/name/name.js";
import { SubjectPublicKeyInfo } from "mods/types/subject_public_key_info/subject_public_key_info.js";
import { TBSCertificateVersion } from "mods/types/tbs_certificate/tbs_certificate_version.js";
import { Validity } from "mods/types/validity/validity.js";

export class TBSCertificate {
  readonly #class = TBSCertificate

  constructor(
    readonly version = new TBSCertificateVersion(),
    readonly serialNumber: Integer,
    readonly signature: AlgorithmIdentifier,
    readonly issuer: Name,
    readonly validity: Validity,
    readonly subject: Name,
    readonly subjectPublicKeyInfo: SubjectPublicKeyInfo,
    readonly rest: Triplet[]
  ) { }

  toASN1() {
    return new Sequence([
      this.version.toASN1(),
      this.serialNumber,
      this.signature.toASN1(),
      this.issuer.toASN1(),
      this.validity.toASN1(),
      this.subject.toASN1(),
      this.subjectPublicKeyInfo.toASN1(),
      ...this.rest
    ])
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)
    const version = reader.tryReadType(TBSCertificateVersion)
    const serialNumber = reader.readClass(Integer)
    const signature = reader.readType(AlgorithmIdentifier)
    const issuer = reader.readType(Name)
    const validity = reader.readType(Validity)
    const subject = reader.readType(Name)
    const subjectPublicKeyInfo = reader.readType(SubjectPublicKeyInfo)
    const rest = reader.readTriplets()

    return new this(version, serialNumber, signature, issuer, validity, subject, subjectPublicKeyInfo, rest)
  }

  toBytes() {
    return DER.toBytes(this.toASN1())
  }

  static fromBytes(bytes: Uint8Array) {
    return this.fromASN1(DER.fromBytes(bytes))
  }
}
