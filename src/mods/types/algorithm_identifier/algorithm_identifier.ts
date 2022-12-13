import { ObjectIdentifier, Sequence, Triplet } from "@hazae41/asn1"
import { Reader } from "libs/reader/reader.js"

export class AlgorithmIdentifier {
  readonly #class = AlgorithmIdentifier

  constructor(
    readonly algorithm: ObjectIdentifier,
    readonly parameters: Triplet
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.from(triplet, Sequence)
    const algorithm = reader.readClass(ObjectIdentifier)
    const parameters = reader.readTriplet()

    return new this(algorithm, parameters)
  }
}