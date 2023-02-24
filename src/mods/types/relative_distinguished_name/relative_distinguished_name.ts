import { Set, Triplet } from "@hazae41/asn1";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { AttributeTypeAndValue } from "mods/types/attribute_type_and_value/attribute_type_and_value.js";

const UNESCAPED_PLUS_REGEX = /[^\\]\+/g

export class RelativeDistinguishedName {

  constructor(
    readonly triplets: AttributeTypeAndValue[]
  ) { }

  toX501() {
    return this.triplets.map(it => it.toX501()).join("+")
  }

  static fromX501(x501: string) {
    return new this(x501.replaceAll(UNESCAPED_PLUS_REGEX, ([c]) => `${c}++`).split("++").map(it => AttributeTypeAndValue.fromX501(it)))
  }

  toASN1(): Triplet {
    return Set.new(this.triplets.map(it => it.toASN1()))
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Set)

    const triplets = new Array<AttributeTypeAndValue>(cursor.triplets.length)

    for (let i = 0; i < triplets.length; i++)
      triplets[i] = cursor.readAndConvert(AttributeTypeAndValue)

    return new this(triplets)
  }
}