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
      return RsaPublicKey.fromBuffer(this.subjectPublicKey.buffer)

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

  toBuffer() {
    return DER.toBuffer(this.toASN1())
  }

  static fromBuffer(buffer: Buffer) {
    return this.fromASN1(DER.fromBuffer(buffer))
  }
}