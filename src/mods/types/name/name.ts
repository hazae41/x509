import { Triplet } from "@hazae41/asn1";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  toX501() {
    return this.inner.toX501()
  }

  static fromX501(x501: string) {
    return new this(RDNSequence.fromX501(x501))
  }

  toASN1(): Triplet {
    return this.inner.toASN1()
  }

  static fromASN1(triplet: Triplet) {
    return new this(RDNSequence.fromASN1(triplet))
  }
}
