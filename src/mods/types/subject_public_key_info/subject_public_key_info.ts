import { BitString, ObjectIdentifier, Sequence, Triplet } from "@hazae41/asn1";
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

  toASN1(): Sequence<readonly [Sequence<readonly [ObjectIdentifier, Triplet]> | Sequence<readonly [ObjectIdentifier]>, BitString]> {
    return Sequence.create([
      this.algorithm.toASN1(),
      this.subjectPublicKey
    ] as const)
  }

  static fromASN1(triplet: Sequence<readonly [Sequence<readonly [ObjectIdentifier, Triplet]> | Sequence<readonly [ObjectIdentifier]>, BitString]>) {
    const [algorithm, subjectPublicKey] = triplet.triplets

    const algorithm2 = AlgorithmIdentifier.fromASN1(algorithm)
    return new SubjectPublicKeyInfo(algorithm2, subjectPublicKey)
  }

  tryReadPublicKey(): Result<SubjectPublicKey, Error> {
    if (this.algorithm.algorithm.value.inner === RsaPublicKey.oid)
      return X509Types.tryReadFromBytes(this.subjectPublicKey.bytes, RsaPublicKey)

    return Err.error(`Unknown ${this.#class.name} algorithm OID`)
  }

  static tryResolveFromASN1(triplet: Triplet): Result<SubjectPublicKeyInfo, Error> {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw()
      const algorithm = cursor.tryReadAndConvert(AlgorithmIdentifier).throw()
      const subjectPublicKey = cursor.tryReadAndCast(BitString).throw()

      return new Ok(new this(algorithm, subjectPublicKey))
    }, Error)
  }

}