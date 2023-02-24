import { DER, ObjectIdentifier, Sequence, Triplet, UTF8String } from "@hazae41/asn1";
import { Bytes } from "@hazae41/bytes";
import { ASN1Cursor } from "libs/asn1/cursor.js";
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
      const value = DER.toBytes(this.value.inner)
      return `${type}=#${Bytes.toHex(value)}`
    }

    return `${type}=${this.value.toDirectoryString().toX501()}`
  }

  static fromX501(x501: string) {
    const [rawType, rawValue] = x501.split("=")

    const shortType = AttributeType.fromShortName(rawType)

    if (shortType !== undefined) {
      const dstring = DirectoryString.fromX501(rawValue, UTF8String)
      const value = AttributeValue.fromDirectoryString(dstring)

      return new this(shortType, value)
    }

    const oid = ObjectIdentifier.new(rawType)
    const oidType = new AttributeType(oid)

    if (!rawValue.startsWith("#"))
      throw new Error(`AttributeValue not preceded by hash`)

    const bytes = Bytes.fromHex(rawValue.slice(1))
    const triplet = DER.fromBytes(bytes)
    const value = new AttributeValue(triplet)

    return new this(oidType, value)
  }

  toASN1(): Triplet {
    return Sequence.new([
      this.type.inner,
      this.value.inner
    ])
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Sequence)
    const type = new AttributeType(cursor.readAs(ObjectIdentifier))
    const value = new AttributeValue(cursor.read())

    return new this(type, value)
  }
}