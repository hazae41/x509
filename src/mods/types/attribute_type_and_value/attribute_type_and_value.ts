import { IA5String, ObjectIdentifier, PrintableString, Triplet, UTF8String } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";

export class AttributeTypeAndValue {
  readonly #class = AttributeTypeAndValue

  constructor(
    readonly type: ObjectIdentifier,
    readonly value: Triplet
  ) { }

  getValueString() {
    if (this.value instanceof UTF8String)
      return this.value.value
    if (this.value instanceof PrintableString)
      return this.value.value
    if (this.value instanceof IA5String)
      return this.value.value
    throw new Error(`Cannot convert ${this.value} to string`)
  }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)
    const type = reader.readObjectIdentifier()
    const value = reader.readTriplet()

    return new this(type, value)
  }
}