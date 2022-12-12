import { ObjectIdentifier, Triplet } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";

export class AttributeTypeAndValue {
  readonly #class = AttributeTypeAndValue

  constructor(
    readonly type: ObjectIdentifier,
    readonly value: Triplet
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)
    const type = reader.readObjectIdentifier()
    const value = reader.read()

    return new this(type, value)
  }
}