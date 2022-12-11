import { ObjectIdentifier, Triplet } from "@hazae41/asn1"
import { Reader } from "libs/reader/reader.js"

export class AlgorithmIdentifier {
  readonly #class = AlgorithmIdentifier

  constructor(
    readonly algorith: ObjectIdentifier,
    readonly parameters: Triplet
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)
    const algorithm = reader.readObjectIdentifier()
    const parameters = reader.read()

    return new this(algorithm, parameters)
  }
}