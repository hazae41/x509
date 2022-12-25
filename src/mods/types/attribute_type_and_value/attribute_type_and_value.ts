import { DER, ObjectIdentifier, Sequence, Triplet, UTF8String } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
import { AttributeType } from "mods/types/attribute_type/attribute_type.js";
import { AttributeValue } from "mods/types/attribute_value/attribute_value.js";
import { DirectoryString } from "mods/types/directory_string/directory_string.js";

export class AttributeTypeAndValue {
  readonly #class = AttributeTypeAndValue

  constructor(
    readonly type: AttributeType,
    readonly value: AttributeValue
  ) { }

  toString() {
    const type = this.type.toShortName()

    if (type === undefined) {
      const type = this.type.inner.value
      const value = DER.toBuffer(this.value.inner)
      return `${type}=#${value.toString("hex")}`
    }

    return `${type}=${this.value.toDirectoryString().toString()}`
  }

  static fromString(string: string) {
    const [type, value] = string.split("=")

    const type2 = AttributeType.fromString(type)
    const dstring = DirectoryString.fromString(value, UTF8String)
    const value2 = AttributeValue.fromDirectoryString(dstring)

    return new this(type2, value2)
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