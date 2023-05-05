import { ObjectIdentifier, Sequence, Set, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { RelativeDistinguishedName } from "mods/types/relative_distinguished_name/relative_distinguished_name.js";
import { DirectoryStringInner } from "../index.js";

const UNESCAPED_COMMA_REGEX = /[^\\],/g

export class RDNSequence {

  constructor(
    readonly triplets: RelativeDistinguishedName[]
  ) { }

  toASN1(): Sequence<Set<Sequence<readonly [ObjectIdentifier, DirectoryStringInner]>[]>[]> {
    return Sequence.create(this.triplets.map(it => it.toASN1()))
  }

  static fromASN1(triplet: Sequence<Set<Sequence<readonly [ObjectIdentifier, DirectoryStringInner]>[]>[]>) {
    return new this(triplet.triplets.map(triplet => RelativeDistinguishedName.fromASN1(triplet)))
  }

  tryToX501(): Result<string, Error> {
    return Result.unthrowSync(() => {
      return new Ok(this.triplets.map(it => it.tryToX501().throw()).reverse().join(","))
    }, Error)
  }

  static tryFromX501(x501: string): Result<RDNSequence, Error> {
    return Result.unthrowSync(() => {
      const triplets = x501
        .replaceAll(UNESCAPED_COMMA_REGEX, ([c]) => `${c},,`)
        .split(",,")
        .reverse()
        .map(it => RelativeDistinguishedName.tryFromX501(it).throw())
      return new Ok(new this(triplets))
    }, Error)
  }

  static tryResolveFromASN1(triplet: Triplet): Result<RDNSequence, Error> {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw()

      const triplets = new Array<RelativeDistinguishedName>(cursor.inner.triplets.length)

      for (let i = 0; i < triplets.length; i++)
        triplets[i] = cursor.tryReadAndResolve(RelativeDistinguishedName).throw()

      return new Ok(new this(triplets))
    }, Error)
  }
}