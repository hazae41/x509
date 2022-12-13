import { ObjectIdentifier, Sequence, Triplet } from "@hazae41/asn1"
import { Reader } from "libs/reader/reader.js"

export class AlgorithmIdentifier {
  readonly #class = AlgorithmIdentifier

  constructor(
    readonly algorithm: ObjectIdentifier,
    readonly parameters?: Triplet
  ) { }

  toASN1() {
    const triplets = new Array<Triplet>()
    triplets.push(this.algorithm)
    if (this.parameters)
      triplets.push(this.parameters)
    return new Sequence(triplets)
  }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.from(triplet, Sequence)
    const algorithm = reader.readClass(ObjectIdentifier)
    const parameters = reader.tryReadTriplet()

    return new this(algorithm, parameters)
  }
}