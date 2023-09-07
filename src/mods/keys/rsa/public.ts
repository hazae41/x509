import { ASN1Cursor, ASN1Error, Integer, Sequence, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { OIDs } from "mods/oids/oids.js";

export interface RsaPublicKeyJSON {
  publicExponent: string,
  modulus: string
}

export class RsaPublicKey {

  static oid = OIDs.keys.rsaEncryption

  constructor(
    readonly publicExponent: Integer,
    readonly modulus: Integer
  ) { }

  toASN1(): Triplet {
    return Sequence.create([this.publicExponent, this.modulus] as const)
  }

  toJSON() {
    const publicExponent = this.publicExponent.value.toString(16)
    const modulus = this.modulus.value.toString(16)

    return { publicExponent, modulus } satisfies RsaPublicKeyJSON
  }

  static fromJSON(json: RsaPublicKeyJSON) {
    const publicExponent = Integer.create(BigInt("0x" + json.publicExponent))
    const modulus = Integer.create(BigInt("0x" + json.modulus))

    return new this(publicExponent, modulus)
  }

  static tryResolve(triplet: Triplet): Result<RsaPublicKey, ASN1Error> {
    return Result.unthrowSync(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw(t)
      const publicExponent = cursor.tryReadAndCast(Integer).throw(t)
      const modulus = cursor.tryReadAndCast(Integer).throw(t)

      return new Ok(new RsaPublicKey(publicExponent, modulus))
    })
  }

}