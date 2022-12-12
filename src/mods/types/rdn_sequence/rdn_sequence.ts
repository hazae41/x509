import { Triplet } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";
import { RelativeDistinguishedName } from "mods/types/relative_distinguished_name/relative_distinguished_name.js";

export class RDNSequence {

  constructor(
    readonly triplets: RelativeDistinguishedName[]
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)

    const triplets = new Array<RelativeDistinguishedName>(reader.triplets.length)

    for (let i = 0; i < triplets.length; i++)
      triplets[i] = reader.readType(RelativeDistinguishedName)

    return new this(triplets)
  }
}