import { Triplet } from "@hazae41/asn1";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  static fromASN1(triplet: Triplet) {
    const inner = RDNSequence.fromASN1(triplet)

    return new this(inner)
  }
}
