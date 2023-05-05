import { Set, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { AttributeTypeAndValue } from "mods/types/attribute_type_and_value/attribute_type_and_value.js";

const UNESCAPED_PLUS_REGEX = /[^\\]\+/g

export class RelativeDistinguishedName {

  constructor(
    readonly triplets: AttributeTypeAndValue[]
  ) { }

  toASN1(): Triplet {
    return Set.create(this.triplets.map(it => it.toASN1()))
  }

  tryToX501(): Result<string, Error> {
    return Result.unthrowSync(() => {
      return new Ok(this.triplets.map(it => it.tryToX501().throw()).join("+"))
    }, Error)
  }

  static tryFromX501(x501: string): Result<RelativeDistinguishedName, Error> {
    return Result.unthrowSync(() => {
      const triplets = x501
        .replaceAll(UNESCAPED_PLUS_REGEX, ([c]) => `${c}++`)
        .split("++")
        .map(it => AttributeTypeAndValue.tryFromX501(it).throw())
      return new Ok(new this(triplets))
    }, Error)
  }

  static tryResolveFromASN1(triplet: Triplet): Result<RelativeDistinguishedName, Error> {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Set).throw()

      const triplets = new Array<AttributeTypeAndValue>(cursor.inner.triplets.length)

      for (let i = 0; i < triplets.length; i++)
        triplets[i] = cursor.tryReadAndResolve(AttributeTypeAndValue).throw()

      return new Ok(new this(triplets))
    }, Error)
  }

}