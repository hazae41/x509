import { BitString, DER, Sequence, Triplet } from "@hazae41/asn1";
import { ASN1Cursor } from "libs/asn1/cursor.js";
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

  toASN1(): Triplet {
    return Sequence.new([
      this.algorithm.toASN1(),
      this.subjectPublicKey
    ])
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Sequence)
    const algorithm = cursor.readAndConvert(AlgorithmIdentifier)
    const subjectPublicKey = cursor.readAs(BitString)

    return new this(algorithm, subjectPublicKey)
  }

  toBytes() {
    return DER.toBytes(this.toASN1())
  }

  static fromBytes(bytes: Uint8Array) {
    return this.fromASN1(DER.fromBytes(bytes))
  }
}