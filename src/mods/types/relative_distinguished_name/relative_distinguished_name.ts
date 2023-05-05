import { ObjectIdentifier, Sequence, Set, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { AttributeTypeAndValue } from "mods/types/attribute_type_and_value/attribute_type_and_value.js";
import { DirectoryStringInner } from "../index.js";

const UNESCAPED_PLUS_REGEX = /[^\\]\+/g

export class RelativeDistinguishedName {

  constructor(
    readonly triplets: AttributeTypeAndValue[]
  ) { }

  toASN1(): Set<Sequence<readonly [ObjectIdentifier<string>, DirectoryStringInner]>[]> {
    return Set.create(this.triplets.map(it => it.toASN1()))
  }

  static fromASN1(triplet: Set<Sequence<readonly [ObjectIdentifier, DirectoryStringInner]>[]>) {
    return new this(triplet.triplets.map(triplet => AttributeTypeAndValue.fromASN1(triplet)))
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
        triplets[i] = cursor.tryReadAndConvert(AttributeTypeAndValue).throw()

      return new Ok(new this(triplets))
    }, Error)
  }

}