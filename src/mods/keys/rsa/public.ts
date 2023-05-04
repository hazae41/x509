import { Integer, Sequence, Triplet } from "@hazae41/asn1";
import { Bytes } from "@hazae41/bytes";
import { Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
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

  toASN1() {
    return Sequence.create([this.publicExponent, this.modulus] as const)
  }

  static fromASN1(sequence: Sequence<[Integer, Integer]>) {
    const [publicExponent, modulus] = sequence.triplets

    return new RsaPublicKey(publicExponent, modulus)
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

  static tryRead(triplet: Triplet): Result<RsaPublicKey, Error> {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw()
      const publicExponent = cursor.tryReadAndCast(Integer).throw()
      const modulus = cursor.tryReadAndCast(Integer).throw()

      return new Ok(new RsaPublicKey(publicExponent, modulus))
    }, Error)
  }

}