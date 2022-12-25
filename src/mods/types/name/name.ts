import { Sequence, Triplet } from "@hazae41/asn1";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  toString() {
    return this.inner.toString()
  }

  static fromString(string: string) {
    return new this(RDNSequence.fromString(string))
  }

  toASN1(): Sequence {
    return this.inner.toASN1()
  }

  static fromASN1(triplet: Triplet) {
    return new this(RDNSequence.fromASN1(triplet))
  }
}
