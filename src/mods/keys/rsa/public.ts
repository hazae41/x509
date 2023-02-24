import { DER, Integer, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { OIDs } from "mods/oids/oids.js";

export interface RsaPublicKeyObject {
  publicExponent: bigint,
  modulus: bigint
}

export class RsaPublicKey {

  static oid = OIDs.keys.rsaEncryption

  constructor(
    readonly publicExponent: Integer,
    readonly modulus: Integer
  ) { }

  toASN1(): Triplet {
    return Sequence.new([
      this.publicExponent,
      this.modulus
    ])
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Sequence)
    const publicExponent = cursor.readAs(Integer)
    const modulus = cursor.readAs(Integer)

    return new this(publicExponent, modulus)
  }

  toObject() {
    const publicExponent = this.publicExponent.value
    const modulus = this.modulus.value
    return { publicExponent, modulus } as RsaPublicKeyObject
  }

  static fromObject(object: RsaPublicKeyObject) {
    const publicExponent = Integer.new(object.publicExponent)
    const modulus = Integer.new(object.modulus)
    return new this(publicExponent, modulus)
  }

  toBytes() {
    return DER.toBytes(this.toASN1())
  }

  static fromBytes(bytes: Uint8Array) {
    return this.fromASN1(DER.fromBytes(bytes))
  }
}