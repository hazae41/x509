import { Triplet } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";
import { AttributeTypeAndValue } from "mods/types/attribute_type_and_value/attribute_type_and_value.js";

export class RelativeDistinguishedName {

  constructor(
    readonly triplets: AttributeTypeAndValue[]
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSet(triplet)

    const triplets = new Array<AttributeTypeAndValue>(reader.triplets.length)

    for (let i = 0; i < triplets.length; i++)
      triplets[i] = reader.readType(AttributeTypeAndValue)

    return new this(triplets)
  }
}