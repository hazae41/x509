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

  toX501() {
    const type = this.type.toShortName()

    if (type === undefined) {
      const type = this.type.inner.value
      const value = DER.toBuffer(this.value.inner)
      return `${type}=#${value.toString("hex")}`
    }

    return `${type}=${this.value.toDirectoryString().toX501()}`
  }

  static fromX501(x501: string) {
    const [type, value] = x501.split("=")

    const type2 = AttributeType.fromX501(type)
    const dstring = DirectoryString.fromX501(value, UTF8String)
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