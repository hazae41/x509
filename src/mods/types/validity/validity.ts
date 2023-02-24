import { Sequence, Triplet, UTCTime } from "@hazae41/asn1";
import { ASN1Cursor } from "libs/asn1/cursor.js";

export type Time =
  | UTCTime
// | GeneralizedTime

export class Validity {

  constructor(
    readonly notBefore: Time,
    readonly notAfter: Time
  ) { }

  static generate(days: number) {
    const notBefore = new Date()
    const notAfter = new Date()

    notAfter.setDate(notAfter.getDate() + days)

    const notBefore2 = UTCTime.new(notBefore)
    const notAfter2 = UTCTime.new(notAfter)

    return new this(notBefore2, notAfter2)
  }

  toASN1(): Triplet {
    return Sequence.new([this.notBefore, this.notAfter])
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAs(triplet, Sequence)
    const notBefore = cursor.readAs(UTCTime)
    const notAfter = cursor.readAs(UTCTime)

    return new this(notBefore, notAfter)
  }
}