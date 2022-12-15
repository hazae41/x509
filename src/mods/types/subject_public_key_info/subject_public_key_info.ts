import { BitString, DER, Integer, Sequence, Triplet } from "@hazae41/asn1";
import { OID } from "libs/oids/oids.js";
import { ASN1Reader } from "libs/reader/reader.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";

export class SubjectPublicKeyInfo {
  readonly #class = SubjectPublicKeyInfo

  constructor(
    readonly algorithm: AlgorithmIdentifier,
    readonly subjectPublicKey: BitString
  ) { }

  getPublicKey() {
    if (this.algorithm.algorithm.value === OID.keys.rsaEncryption)
      return RsaPublicKey.fromBuffer(this.subjectPublicKey.buffer)
    throw new Error(`Unknown ${this.#class.name} algorithm OID`)
  }

  toASN1() {
    return new Sequence([this.algorithm.toASN1(), this.subjectPublicKey])
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)
    const algorithm = reader.readType(AlgorithmIdentifier)
    const subjectPublicKey = reader.readClass(BitString)

    return new this(algorithm, subjectPublicKey)
  }

  toBuffer() {
    return DER.toBuffer(this.toASN1())
  }

  static fromBuffer(buffer: Buffer) {
    return this.fromASN1(DER.fromBuffer(buffer))
  }
}

export interface RsaPublicKeyObject {
  publicExponent: bigint,
  modulus: bigint
}

export class RsaPublicKey {

  constructor(
    readonly publicExponent: Integer,
    readonly modulus: Integer
  ) { }

  toRsaPublicKeyObject() {
    const publicExponent = this.publicExponent.value
    const modulus = this.modulus.value
    return { publicExponent, modulus } as RsaPublicKeyObject
  }

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

  toBuffer() {
    return DER.toBuffer(this.toASN1())
  }

  static fromBuffer(buffer: Buffer) {
    return this.fromASN1(DER.fromBuffer(buffer))
  }
}