import { Sequence, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { RelativeDistinguishedName } from "mods/types/relative_distinguished_name/relative_distinguished_name.js";

const UNESCAPED_COMMA_REGEX = /[^\\],/g

export class RDNSequence {

  constructor(
    readonly triplets: RelativeDistinguishedName[]
  ) { }

  toASN1(): Triplet {
    return Sequence.create(this.triplets.map(it => it.toASN1()))
  }

  tryToX501(): Result<string, unknown> {
    return Result.unthrowSync(t => {
      return new Ok(this.triplets.map(it => it.tryToX501().throw(t)).reverse().join(","))
    })
  }

  static tryFromX501(x501: string): Result<RDNSequence, Error> {
    return Result.unthrowSync(t => {
      const triplets = x501
        .replaceAll(UNESCAPED_COMMA_REGEX, ([c]) => `${c},,`)
        .split(",,")
        .reverse()
        .map(it => RelativeDistinguishedName.tryFromX501(it).throw(t))
      return new Ok(new this(triplets))
    })
  }

  static tryResolveFromASN1(triplet: Triplet): Result<RDNSequence, Error> {
    return Result.unthrowSync(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw(t)

      const triplets = new Array<RelativeDistinguishedName>(cursor.inner.triplets.length)

      for (let i = 0; i < triplets.length; i++)
        triplets[i] = cursor.tryReadAndResolve(RelativeDistinguishedName).throw(t)

      return new Ok(new this(triplets))
    })
  }
}