import { Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
import { RelativeDistinguishedName } from "mods/types/relative_distinguished_name/relative_distinguished_name.js";

const UNESCAPED_COMMA_REGEX = /[^\\],/g

export class RDNSequence {

  constructor(
    readonly triplets: RelativeDistinguishedName[]
  ) { }

  toX501() {
    return this.triplets.map(it => it.toX501()).reverse().join(",")
  }

  static fromX501(x501: string) {
    return new this(x501.replaceAll(UNESCAPED_COMMA_REGEX, ([c]) => `${c},,`).split(",,").reverse().map(it => RelativeDistinguishedName.fromX501(it)))
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