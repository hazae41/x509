import { DERCursor, DERTriplet, ObjectIdentifier, Sequence } from "@hazae41/asn1"

export class AlgorithmIdentifier {

  constructor(
    readonly algorithm: ObjectIdentifier.DER,
    readonly parameters?: DERTriplet
  ) { }

  toDER(): DERTriplet {
    if (this.parameters)
      return Sequence.create(undefined, [this.algorithm, this.parameters] as const).toDER()
    else
      return Sequence.create(undefined, [this.algorithm] as const).toDER()
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)
    const algorithm = cursor.readAsOrThrow(ObjectIdentifier.DER)
    const parameters = cursor.read()

    return new AlgorithmIdentifier(algorithm, parameters)
  }
}