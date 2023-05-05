import { ObjectIdentifier, Sequence, Triplet } from "@hazae41/asn1"
import { Ok, Result } from "@hazae41/result"
import { ASN1Cursor } from "libs/asn1/cursor.js"

export class AlgorithmIdentifier {

  constructor(
    readonly algorithm: ObjectIdentifier,
    readonly parameters?: Triplet
  ) { }

  toASN1(): Triplet {
    if (this.parameters)
      return Sequence.create([this.algorithm, this.parameters] as const)
    else
      return Sequence.create([this.algorithm] as const)
  }

  static tryResolveFromASN1(triplet: Triplet): Result<AlgorithmIdentifier, Error> {
    return Result.unthrowSync(() => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw()
      const algorithm = cursor.tryReadAndCast(ObjectIdentifier).throw()
      const parameters = cursor.tryRead().ok().inner

      return new Ok(new AlgorithmIdentifier(algorithm, parameters))
    }, Error)
  }
}