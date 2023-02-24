import { BitString, DER, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { TBSCertificate } from "mods/types/tbs_certificate/tbs_certificate.js";

export interface CertificateObject { }

export class Certificate {
  readonly #class = Certificate

  constructor(
    readonly tbsCertificate: TBSCertificate,
    readonly algorithmIdentifier: AlgorithmIdentifier,
    readonly signatureValue: BitString
  ) { }

  toASN1(): Triplet {
    return Sequence.new([
      this.tbsCertificate.toASN1(),
      this.algorithmIdentifier.toASN1(),
      this.signatureValue
    ])
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Sequence)
    const tbsCertificate = cursor.readAndConvert(TBSCertificate)
    const algorithmIdentifier = cursor.readAndConvert(AlgorithmIdentifier)
    const signatureValue = cursor.readAs(BitString)

    return new this(tbsCertificate, algorithmIdentifier, signatureValue)
  }

  toObject() {
    return {} as CertificateObject
  }

  static fromObject(object: CertificateObject): Certificate {
    throw new Error("Unimplemented")
  }

  toBytes() {
    return DER.toBytes(this.toASN1())
  }

  static fromBytes(bytes: Uint8Array) {
    return this.fromASN1(DER.fromBytes(bytes))
  }
}