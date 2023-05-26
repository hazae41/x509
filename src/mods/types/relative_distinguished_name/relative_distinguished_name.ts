import { ASN1Cursor, ASN1Error, DERReadError, Set, Triplet } from "@hazae41/asn1";
import { Ok, Result, Unimplemented } from "@hazae41/result";
import { InvalidFormatError } from "mods/errors.js";
import { AttributeTypeAndValue } from "mods/types/attribute_type_and_value/attribute_type_and_value.js";

const UNESCAPED_PLUS_REGEX = /[^\\]\+/g

export class RelativeDistinguishedName {

  constructor(
    readonly triplets: AttributeTypeAndValue[]
  ) { }

  toASN1(): Triplet {
    return Set.create(this.triplets.map(it => it.toASN1()))
  }

  tryToX501(): Result<string, unknown> {
    return Result.unthrowSync(t => {
      return new Ok(this.triplets.map(it => it.tryToX501().throw(t)).join("+"))
    })
  }

  static tryFromX501(x501: string): Result<RelativeDistinguishedName, ASN1Error | InvalidFormatError | DERReadError> {
    return Result.unthrowSync(t => {
      const triplets = x501
        .replaceAll(UNESCAPED_PLUS_REGEX, ([c]) => `${c}++`)
        .split("++")
        .map(it => AttributeTypeAndValue.tryFromX501(it).throw(t))
      return new Ok(new this(triplets))
    })
  }

  static tryResolve(triplet: Triplet): Result<RelativeDistinguishedName, ASN1Error | Unimplemented> {
    return Result.unthrowSync(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Set).throw(t)

      const triplets = new Array<AttributeTypeAndValue>(cursor.inner.triplets.length)

      for (let i = 0; i < triplets.length; i++)
        triplets[i] = cursor.tryReadAndResolve(AttributeTypeAndValue).throw(t)

      return new Ok(new this(triplets))
    })
  }

}