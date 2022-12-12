import { BitString, Triplet } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { TBSCertificate } from "mods/types/tbs_certificate/tbs_certificate.js";

export class Certificate {
  readonly #class = Certificate

  constructor(
    readonly tbsCertificate: TBSCertificate,
    readonly algorithmIdentifier: AlgorithmIdentifier,
    readonly signatureValue: BitString
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)
    const tbsCertificate = reader.readType(TBSCertificate)
    const algorithmIdentifier = reader.readType(AlgorithmIdentifier)
    const signatureValue = reader.readBitString()

    return new this(tbsCertificate, algorithmIdentifier, signatureValue)
  }
}