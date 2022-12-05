import { Sequence } from "@hazae41/asn1";
import { TBSCertificate } from "mods/x509/certificate/tbscertificate.js";

export class Certificate {
  readonly class = Certificate

  constructor(
    readonly tbsCertificate: TBSCertificate,
    // readonly algorithmIdentifier: AlgorithmIdentifier,
    // readonly signatureValue: Buffer0
  ) { }

  static fromASN1(sequence: Sequence) {
    // TODO
  }
}