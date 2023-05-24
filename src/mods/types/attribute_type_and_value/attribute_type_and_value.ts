import { ObjectIdentifier, Sequence, Triplet, UTF8String } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { AttributeType, KnownAttributeType, UnknownAttributeType } from "mods/types/attribute_type/attribute_type.js";
import { KnownAttributeValue, UnknownAttributeValue } from "mods/types/attribute_value/attribute_value.js";
import { DirectoryString, DirectoryStringInner } from "mods/types/directory_string/directory_string.js";

export class KnownAttributeTypeAndValue {

  constructor(
    readonly type: KnownAttributeType,
    readonly value: KnownAttributeValue
  ) { }

  tryToX501(): Result<string, never> {
    return new Ok(`${this.type.toX501()}=${this.value.toX501()}`)
  }

  toASN1(): Triplet {
    return Sequence.create([
      this.type.inner,
      this.value.inner.toASN1()
    ] as const)
  }
}

export class UnknownAttributeTypeAndValue<T extends Triplet = Triplet> {

  constructor(
    readonly type: UnknownAttributeType,
    readonly value: UnknownAttributeValue<T>
  ) { }

  tryToX501(): Result<string, unknown> {
    return this.value.tryToX501().mapSync(value => `${this.type.toX501()}=${value}`)
  }

  toASN1(): Sequence<readonly [ObjectIdentifier, Triplet]> {
    return Sequence.create([
      this.type.inner,
      this.value.inner
    ] as const)
  }

}

export type AttributeTypeAndValue =
  | KnownAttributeTypeAndValue
  | UnknownAttributeTypeAndValue

export namespace AttributeTypeAndValue {

  export function fromASN1(triplet: Sequence<readonly [ObjectIdentifier, DirectoryStringInner]>) {
    const [type, value] = triplet.triplets

    const type2 = AttributeType.fromASN1(type)

    if (type2.isKnown()) {
      const value2 = KnownAttributeValue.fromASN1(value)
      return new KnownAttributeTypeAndValue(type2, value2)
    }

    const value2 = UnknownAttributeValue.fromASN1(value)
    return new UnknownAttributeTypeAndValue(type2, value2)
  }

  export function tryResolveFromASN1(triplet: Triplet): Result<AttributeTypeAndValue, Error> {
    return Result.unthrowSync<AttributeTypeAndValue, Error>(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw(t)

      const oid = cursor.tryReadAndCast(ObjectIdentifier).throw(t)
      const type = AttributeType.fromASN1(oid)

      if (type.isKnown()) {
        const string = cursor.tryReadAndResolve(DirectoryString).throw(t)
        const value = new KnownAttributeValue(string)

        return new Ok(new KnownAttributeTypeAndValue(type, value))
      }

      const inner = cursor.tryRead().throw(t)
      const value = new UnknownAttributeValue(inner)

      return new Ok(new UnknownAttributeTypeAndValue(type, value))
    })
  }

  export function tryFromX501(x501: string): Result<AttributeTypeAndValue, Error> {
    return Result.unthrowSync<AttributeTypeAndValue, Error>(t => {
      const [rawType, rawValue] = x501.split("=")

      const type = AttributeType.tryFromX501(rawType).throw(t)

      if (type.isKnown()) {
        const value = KnownAttributeValue.fromX501(rawValue, UTF8String)
        return new Ok(new KnownAttributeTypeAndValue(type, value))
      }

      const value = UnknownAttributeValue.tryFromX501(rawValue).throw(t)
      return new Ok(new UnknownAttributeTypeAndValue(type, value))
    })
  }

}