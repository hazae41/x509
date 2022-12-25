import { Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
import { RelativeDistinguishedName } from "mods/types/relative_distinguished_name/relative_distinguished_name.js";

export class RDNSequence {

  constructor(
    readonly triplets: RelativeDistinguishedName[]
  ) { }

  toString() {
    return this.triplets.map(it => it.toString()).reverse().join(",")
  }

  static fromString(string: string) {
    return new this(string.split(",").reverse().map(it => RelativeDistinguishedName.fromString(it)))
  }

  toASN1() {
    return new Sequence(this.triplets.map(it => it.toASN1()))
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)

    const triplets = new Array<RelativeDistinguishedName>(reader.triplets.length)

    for (let i = 0; i < triplets.length; i++)
      triplets[i] = reader.readType(RelativeDistinguishedName)

    return new this(triplets)
  }
}