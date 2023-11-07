import { DERCursor, DERTriplet, Sequence, UTCTime } from "@hazae41/asn1";

export type Time =
  | UTCTime.DER
// | GeneralizedTime.DER

export interface ValidityJSON {
  notBefore: string,
  notAfter: string
}

export class Validity {

  constructor(
    readonly notBefore: Time,
    readonly notAfter: Time
  ) { }

  static generate(days: number) {
    const notBefore = new Date()
    const notAfter = new Date()

    notAfter.setDate(notAfter.getDate() + days)

    const notBefore2 = UTCTime.create(undefined, notBefore).toDER()
    const notAfter2 = UTCTime.create(undefined, notAfter).toDER()

    return new this(notBefore2, notAfter2)
  }

  toDER(): DERTriplet {
    return Sequence.create(undefined, [
      this.notBefore,
      this.notAfter
    ] as const).toDER()
  }

  toJSON() {
    const notBefore = this.notBefore.value.toJSON()
    const notAfter = this.notAfter.value.toJSON()

    return { notBefore, notAfter }
  }

  static fromJSON(json: ValidityJSON) {
    const notBefore = UTCTime.create(undefined, new Date(json.notBefore)).toDER()
    const notAfter = UTCTime.create(undefined, new Date(json.notAfter)).toDER()

    return new Validity(notBefore, notAfter)
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)
    const notBefore = cursor.readAsOrThrow(UTCTime.DER)
    const notAfter = cursor.readAsOrThrow(UTCTime.DER)

    return new Validity(notBefore, notAfter)
  }

}