import { DER, ObjectIdentifier, Sequence, Triplet, UTF8String } from "@hazae41/asn1";
import { Bytes } from "@hazae41/bytes";
import { Err, Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { AttributeType } from "mods/types/attribute_type/attribute_type.js";
import { AttributeValue } from "mods/types/attribute_value/attribute_value.js";
import { DirectoryString, DirectoryStringType } from "mods/types/directory_string/directory_string.js";

export class AttributeTypeAndValue {

  constructor(
    readonly type: AttributeType,
    readonly value: AttributeValue
  ) { }

  tryToX501(): Result<string, Error> {
    if (this.type.isKnown())
      return new Ok(`${this.type.toX501()}=${this.value.inner.toX501()}`)
    else
      return DER.tryWriteToBytes(this.value.inner.inner).mapSync(bytes => `${this.type.toX501()}=#${Bytes.toHex(bytes)}`)
  }

  static tryFromX501(x501: string): Result<AttributeTypeAndValue, Error> {
    return Result.unthrowSync(() => {
      const [rawType, rawValue] = x501.split("=")

      const type = AttributeType.fromX501(rawType)

      if (type.isKnown()) {
        const string = DirectoryString.fromX501(rawValue, UTF8String)
        const value = new AttributeValue(string)

        return new Ok(new AttributeTypeAndValue(type, value))
      }

      if (!rawValue.startsWith("#"))
        return Err.error(`AttributeValue not preceded by hash`)

      const bytes = Bytes.fromHex(rawValue.slice(1))
      const triplet = DER.tryReadFromBytes(bytes).throw()
      const string = DirectoryString.tryRead(triplet).throw()
      const value = new AttributeValue(string)

      return new Ok(new AttributeTypeAndValue(type, value))
    }, Error)
  }

  toASN1(): Sequence<readonly [ObjectIdentifier<string>, DirectoryStringType]> {
    return Sequence.create([
      this.type.inner,
      this.value.inner.toASN1()
    ] as const)
  }

  static fromASN1(triplet: Triplet) {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw()

      const oid = cursor.tryReadAndCast(ObjectIdentifier).throw()
      const type = AttributeType.fromASN1(oid)

      const string = cursor.tryReadAndConvert(DirectoryString).throw()
      const value = new AttributeValue(string)

      return new Ok(new AttributeTypeAndValue(type, value))
    }, Error)
  }
}