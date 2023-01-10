import { DER, Integer, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
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

  toASN1() {
    return new Sequence([
      this.publicExponent,
      this.modulus
    ])
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)
    const publicExponent = reader.readClass(Integer)
    const modulus = reader.readClass(Integer)

    return new this(publicExponent, modulus)
  }

  toObject() {
    const publicExponent = this.publicExponent.value
    const modulus = this.modulus.value
    return { publicExponent, modulus } as RsaPublicKeyObject
  }

  static fromObject(object: RsaPublicKeyObject) {
    const publicExponent = new Integer(object.publicExponent)
    const modulus = new Integer(object.modulus)
    return new this(publicExponent, modulus)
  }

  toBytes() {
    return DER.toBytes(this.toASN1())
  }

  static fromBytes(bytes: Uint8Array) {
    return this.fromASN1(DER.fromBytes(bytes))
  }
}