import { ASN1Cursor, ASN1Error, BitString, InvalidLengthError, InvalidTypeError, InvalidValueError, NotAnOID, Sequence, Triplet } from "@hazae41/asn1";
import { BinaryReadError } from "@hazae41/binary";
import { Err, Ok, Result, Unimplemented } from "@hazae41/result";
import { RsaPublicKey } from "mods/keys/rsa/public.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";
import { tryReadFromBytes } from "../types.js";

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

  tryReadPublicKey(): Result<SubjectPublicKey, ASN1Error | BinaryReadError | Unimplemented | InvalidTypeError | InvalidValueError | InvalidLengthError | NotAnOID> {
    if (this.algorithm.algorithm.value.inner === RsaPublicKey.oid)
      return tryReadFromBytes(RsaPublicKey, this.subjectPublicKey.bytes)

    return new Err(new Unimplemented(`AlgorithmIdentifier`))
  }

  static tryResolve(triplet: Triplet): Result<SubjectPublicKeyInfo, ASN1Error> {
    return Result.unthrowSync(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw(t)
      const algorithm = cursor.tryReadAndResolve(AlgorithmIdentifier).throw(t)
      const subjectPublicKey = cursor.tryReadAndCast(BitString).throw(t)

      return new Ok(new this(algorithm, subjectPublicKey))
    })
  }

}