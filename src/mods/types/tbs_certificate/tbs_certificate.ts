import { Integer, Sequence, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
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
    return Sequence.create([
      this.version.toASN1(),
      this.serialNumber,
      this.signature.toASN1(),
      this.issuer.toASN1(),
      this.validity.toASN1(),
      this.subject.toASN1(),
      this.subjectPublicKeyInfo.toASN1(),
      ...this.rest
    ] as const)
  }

  static tryResolveFromASN1(triplet: Triplet) {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw()
      const version = cursor.tryReadAndResolve(TBSCertificateVersion).ok().inner
      const serialNumber = cursor.tryReadAndCast(Integer).throw()
      const signature = cursor.tryReadAndResolve(AlgorithmIdentifier).throw()
      const issuer = cursor.tryReadAndResolve(Name).throw()
      const validity = cursor.tryReadAndResolve(Validity).throw()
      const subject = cursor.tryReadAndResolve(Name).throw()
      const subjectPublicKeyInfo = cursor.tryReadAndResolve(SubjectPublicKeyInfo).throw()
      const rest = cursor.after

      return new Ok(new this(version, serialNumber, signature, issuer, validity, subject, subjectPublicKeyInfo, rest))
    }, Error)
  }

}
