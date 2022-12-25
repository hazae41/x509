import { DER, ObjectIdentifier, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
import { AttributeType } from "mods/types/attribute_type/attribute_type.js";
import { AttributeValue } from "mods/types/attribute_value/attribute_value.js";


export class AttributeTypeAndValue {
  readonly #class = AttributeTypeAndValue

  constructor(
    readonly type: AttributeType,
    readonly value: AttributeValue
  ) { }

  toString() {
    const type = this.type.getShortName()

    if (!type) {
      const type = this.type.inner.value
      const value = DER.toBuffer(this.value.inner)
      return `${type}=#${value.toString("hex")}`
    }

    return `${type}=${this.value.toString()}`
  }

  toASN1() {
    return new Sequence([
      this.type.inner,
      this.value.inner
    ])
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)
    const type = new AttributeType(reader.readClass(ObjectIdentifier))
    const value = new AttributeValue(reader.readTriplet())

    return new this(type, value)
  }
}