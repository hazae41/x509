import { BitString, DERCursor, DERTriplet, Sequence } from "@hazae41/asn1";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { TBSCertificate } from "mods/types/tbs_certificate/tbs_certificate.js";

export class Certificate {

  constructor(
    readonly tbsCertificate: TBSCertificate,
    readonly algorithmIdentifier: AlgorithmIdentifier,
    readonly signatureValue: BitString.DER
  ) { }

  toDER(): DERTriplet {
    return Sequence.create(undefined, [
      this.tbsCertificate.toDER(),
      this.algorithmIdentifier.toDER(),
      this.signatureValue
    ] as const).toDER()
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)
    const tbsCertificate = TBSCertificate.resolveOrThrow(cursor)
    const algorithmIdentifier = AlgorithmIdentifier.resolveOrThrow(cursor)
    const signatureValue = cursor.readAsOrThrow(BitString.DER)

    return new Certificate(tbsCertificate, algorithmIdentifier, signatureValue)
  }

}