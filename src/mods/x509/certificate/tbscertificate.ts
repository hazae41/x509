import { Constructed, Integer, Sequence } from "@hazae41/asn1";
import { AlgorithmIdentifier } from "mods/x509/algorithm/algorithm.js";

export class TBSCertificate {
  readonly class = TBSCertificate

  constructor(
    readonly version: TBSCertificateVersion,
    readonly serialNumber: Integer,
    readonly algorithm: AlgorithmIdentifier
  ) { }

  static fromASN1(sequence: Sequence) {
    // TODO
  }
}

class TBSCertificateVersion {
  readonly class = TBSCertificateVersion

  constructor(

  ) { }

  static read(construct: Constructed) {
    // TODO
  }
}
