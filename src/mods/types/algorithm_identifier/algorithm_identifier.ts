import { ObjectIdentifier, Sequence, Triplet } from "@hazae41/asn1"
import { ASN1Cursor } from "libs/asn1/cursor.js"

export class AlgorithmIdentifier {
  readonly #class = AlgorithmIdentifier

  constructor(
    readonly algorithm: ObjectIdentifier,
    readonly parameters?: Triplet
  ) { }

  toASN1(): Triplet {
    const triplets = new Array<Triplet>()
    triplets.push(this.algorithm)
    if (this.parameters)
      triplets.push(this.parameters)
    return Sequence.new(triplets)
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Sequence)
    const algorithm = cursor.readAs(ObjectIdentifier)
    const parameters = cursor.tryRead()

    return new this(algorithm, parameters)
  }
}