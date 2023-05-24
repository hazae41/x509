import { Integer, Sequence, Triplet } from "@hazae41/asn1";
import { Bytes } from "@hazae41/bytes";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor, ASN1Error } from "libs/asn1/cursor.js";
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
    const publicExponent = Bytes.toHex(Bytes.fromBigInt(this.publicExponent.value))
    const modulus = Bytes.toHex(Bytes.fromBigInt(this.modulus.value))

    return { publicExponent, modulus } satisfies RsaPublicKeyJSON
  }

  static fromJSON(json: RsaPublicKeyJSON) {
    const publicExponent = Integer.create(Bytes.toBigInt(Bytes.fromHexSafe(json.publicExponent)))
    const modulus = Integer.create(Bytes.toBigInt(Bytes.fromHexSafe(json.modulus)))

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