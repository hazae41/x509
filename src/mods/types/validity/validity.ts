import { ASN1Cursor, ASN1Error, Sequence, Triplet, UTCTime } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";

export type Time =
  | UTCTime
// | GeneralizedTime

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

    const notBefore2 = UTCTime.create(notBefore)
    const notAfter2 = UTCTime.create(notAfter)

    return new this(notBefore2, notAfter2)
  }

  toASN1(): Triplet {
    return Sequence.create([this.notBefore, this.notAfter] as const)
  }

  toJSON() {
    const notBefore = this.notBefore.value.toJSON()
    const notAfter = this.notAfter.value.toJSON()

    return { notBefore, notAfter }
  }

  static fromJSON(json: ValidityJSON) {
    const notBefore = UTCTime.create(new Date(json.notBefore))
    const notAfter = UTCTime.create(new Date(json.notAfter))

    return new Validity(notBefore, notAfter)
  }

  static tryResolve(triplet: Triplet): Result<Validity, ASN1Error> {
    return Result.unthrowSync(t => {
      const cursor = ASN1Cursor.tryCastAndFrom(triplet, Sequence).throw(t)
      const notBefore = cursor.tryReadAndCast(UTCTime).throw(t)
      const notAfter = cursor.tryReadAndCast(UTCTime).throw(t)

      return new Ok(new Validity(notBefore, notAfter))
    })
  }

}