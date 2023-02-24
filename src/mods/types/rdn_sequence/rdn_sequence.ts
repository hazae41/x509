import { Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Cursor } from "libs/asn1/cursor.js";
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

  toASN1(): Triplet {
    return Sequence.new(this.triplets.map(it => it.toASN1()))
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Sequence)

    const triplets = new Array<RelativeDistinguishedName>(cursor.triplets.length)

    for (let i = 0; i < triplets.length; i++)
      triplets[i] = cursor.readAndConvert(RelativeDistinguishedName)

    return new this(triplets)
  }
}