import { BitString, DER, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";
import { RsaPublicKey } from "mods/keys/rsa/public.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";

export class SubjectPublicKeyInfo {
  readonly #class = SubjectPublicKeyInfo

  constructor(
    readonly algorithm: AlgorithmIdentifier,
    readonly subjectPublicKey: BitString
  ) { }

  getPublicKey() {
    if (this.algorithm.algorithm.value === RsaPublicKey.oid)
      return RsaPublicKey.fromBytes(this.subjectPublicKey.bytes)

    throw new Error(`Unknown ${this.#class.name} algorithm OID`)
  }

  toASN1() {
    return new Sequence([
      this.algorithm.toASN1(),
      this.subjectPublicKey
    ])
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)
    const algorithm = reader.readType(AlgorithmIdentifier)
    const subjectPublicKey = reader.readClass(BitString)

    return new this(algorithm, subjectPublicKey)
  }

  toBytes() {
    return DER.toBytes(this.toASN1())
  }

  static fromBytes(bytes: Uint8Array) {
    return this.fromASN1(DER.fromBytes(bytes))
  }
}