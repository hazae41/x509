import { DERCursor, DERTriplet } from "@hazae41/asn1";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  toASN1(): DERTriplet {
    return this.inner.toASN1()
  }

  toX501OrThrow() {
    return this.inner.toX501OrThrow()
  }

  static fromX501OrThrow(x501: string) {
    return new Name(RDNSequence.fromX501OrThrow(x501))
  }

  static resolveOrThrow(cursor: DERCursor) {
    return new Name(RDNSequence.resolveOrThrow(cursor))
  }

}
