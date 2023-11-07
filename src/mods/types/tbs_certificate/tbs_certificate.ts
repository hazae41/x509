import { DERCursor, DERTriplet, Integer, Sequence } from "@hazae41/asn1";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { Name } from "mods/types/name/name.js";
import { SubjectPublicKeyInfo } from "mods/types/subject_public_key_info/subject_public_key_info.js";
import { TBSCertificateVersion } from "mods/types/tbs_certificate/tbs_certificate_version.js";
import { Validity } from "mods/types/validity/validity.js";

export class TBSCertificate {

  constructor(
    readonly version = new TBSCertificateVersion(),
    readonly serialNumber: Integer,
    readonly signature: AlgorithmIdentifier,
    readonly issuer: Name,
    readonly validity: Validity,
    readonly subject: Name,
    readonly subjectPublicKeyInfo: SubjectPublicKeyInfo,
    readonly rest: DERTriplet[]
  ) { }

  toASN1(): DERTriplet {
    return Sequence.create(undefined, [
      this.version.toASN1(),
      this.serialNumber,
      this.signature.toASN1(),
      this.issuer.toASN1(),
      this.validity.toASN1(),
      this.subject.toASN1(),
      this.subjectPublicKeyInfo.toASN1(),
      ...this.rest
    ] as const).toDER()
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)
    const version = TBSCertificateVersion.resolve(cursor)
    const serialNumber = cursor.readAsOrThrow(Integer.DER)
    const signature = AlgorithmIdentifier.resolveOrThrow(cursor)
    const issuer = Name.resolveOrThrow(cursor)
    const validity = Validity.resolveOrThrow(cursor)
    const subject = Name.resolveOrThrow(cursor)
    const subjectPublicKeyInfo = SubjectPublicKeyInfo.resolveOrThrow(cursor)
    const rest = cursor.after

    return new TBSCertificate(version, serialNumber, signature, issuer, validity, subject, subjectPublicKeyInfo, rest)
  }

}
