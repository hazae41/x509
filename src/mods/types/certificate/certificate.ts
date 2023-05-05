import { BitString, Sequence, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { TBSCertificate } from "mods/types/tbs_certificate/tbs_certificate.js";

export class Certificate {

  constructor(
    readonly tbsCertificate: TBSCertificate,
    readonly algorithmIdentifier: AlgorithmIdentifier,
    readonly signatureValue: BitString
  ) { }

  toASN1(): Triplet {
    return Sequence.create([
      this.tbsCertificate.toASN1(),
      this.algorithmIdentifier.toASN1(),
      this.signatureValue
    ] as const)
  }

  static tryResolveFromASN1(triplet: Triplet): Result<Certificate, Error> {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw()
      const tbsCertificate = cursor.tryReadAndResolve(TBSCertificate).throw()
      const algorithmIdentifier = cursor.tryReadAndResolve(AlgorithmIdentifier).throw()
      const signatureValue = cursor.tryReadAndCast(BitString).throw()

      return new Ok(new this(tbsCertificate, algorithmIdentifier, signatureValue))
    }, Error)
  }

}