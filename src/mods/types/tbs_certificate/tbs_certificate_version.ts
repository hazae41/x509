import { Constructed, Integer, Triplet, Type } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";

export class TBSCertificateVersion {
  readonly #class = TBSCertificateVersion

  static type = new Type(
    Type.clazzes.CONTEXT,
    Type.wraps.CONSTRUCTED,
    0)

  constructor(
    readonly value = Integer.create(BigInt(1))
  ) { }

  toASN1(): Triplet {
    return new Constructed(this.#class.type, [this.value] as const)
  }

  toNumber() {
    return Number(this.value.value)
  }

  static fromNumber(value: number) {
    return new this(Integer.create(BigInt(value)))
  }

  static tryResolveFromASN1(triplet: Triplet): Result<TBSCertificateVersion, Error> {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Constructed, this.type).throw()
      const value = cursor.tryReadAndCast(Integer).throw()

      return new Ok(new this(value))
    }, Error)
  }

}