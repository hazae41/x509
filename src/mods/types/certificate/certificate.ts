import { BitString, DER, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
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

  toASN1() {
    return new Sequence([
      this.tbsCertificate.toASN1(),
      this.algorithmIdentifier.toASN1(),
      this.signatureValue
    ])
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)
    const tbsCertificate = reader.readType(TBSCertificate)
    const algorithmIdentifier = reader.readType(AlgorithmIdentifier)
    const signatureValue = reader.readClass(BitString)

    return new this(tbsCertificate, algorithmIdentifier, signatureValue)
  }

  toObject() {
    return {} as CertificateObject
  }

  static fromObject(object: CertificateObject): Certificate {
    throw new Error("Unimplemented")
  }

  toBuffer() {
    return DER.toBuffer(this.toASN1())
  }

  static fromBuffer(buffer: Buffer) {
    return this.fromASN1(DER.fromBuffer(buffer))
  }
}