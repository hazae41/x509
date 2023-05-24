import { ObjectIdentifier, Sequence, Triplet } from "@hazae41/asn1"
import { Ok, Result } from "@hazae41/result"
import { ASN1Cursor, ASN1Error } from "libs/asn1/cursor.js"

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

  static tryResolve(triplet: Triplet): Result<AlgorithmIdentifier, ASN1Error> {
    return Result.unthrowSync(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw(t)
      const algorithm = cursor.tryReadAndCast(ObjectIdentifier).throw(t)
      const parameters = cursor.tryRead().ok().get()

      return new Ok(new AlgorithmIdentifier(algorithm, parameters))
    })
  }
}