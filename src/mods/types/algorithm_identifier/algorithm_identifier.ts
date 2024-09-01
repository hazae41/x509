import { DERCursor, DERTriplet, ObjectIdentifier, Sequence } from "@hazae41/asn1"
import { Nullable } from "libs/nullable/index.js"

export class AlgorithmIdentifier {

  constructor(
    readonly algorithm: ObjectIdentifier.DER,
    readonly parameters: Nullable<DERTriplet>
  ) { }

  toDER(): DERTriplet {
    return Sequence.create(undefined, [
      this.algorithm,
      this.parameters
    ] as const).toDER()
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)
    const algorithm = cursor.readAsOrThrow(ObjectIdentifier.DER)
    const parameters = cursor.read()

    return new AlgorithmIdentifier(algorithm, parameters)
  }
}