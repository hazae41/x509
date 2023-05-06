import { BitString, Sequence, Triplet } from "@hazae41/asn1";
import { Err, Ok, Result } from "@hazae41/result";
import { ASN1Cursor } from "libs/asn1/cursor.js";
import { RsaPublicKey } from "mods/keys/rsa/public.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { X509Types } from "../types.js";

export type SubjectPublicKey =
  | RsaPublicKey

export class SubjectPublicKeyInfo {
  readonly #class = SubjectPublicKeyInfo

  constructor(
    readonly algorithm: AlgorithmIdentifier,
    readonly subjectPublicKey: BitString
  ) { }

  toASN1(): Triplet {
    return Sequence.create([
      this.algorithm.toASN1(),
      this.subjectPublicKey
    ] as const)
  }

  tryReadPublicKey(): Result<SubjectPublicKey, Error> {
    if (this.algorithm.algorithm.value.inner === RsaPublicKey.oid)
      return X509Types.tryReadFromBytes(this.subjectPublicKey.bytes, RsaPublicKey)

    return Err.error(`Unknown ${this.#class.name} algorithm OID`)
  }

  static tryResolveFromASN1(triplet: Triplet): Result<SubjectPublicKeyInfo, Error> {
    return Result.unthrowSync(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw(t)
      const algorithm = cursor.tryReadAndResolve(AlgorithmIdentifier).throw(t)
      const subjectPublicKey = cursor.tryReadAndCast(BitString).throw(t)

      return new Ok(new this(algorithm, subjectPublicKey))
    })
  }

}