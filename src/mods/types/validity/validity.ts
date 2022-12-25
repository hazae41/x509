import { Sequence, Triplet, UTCTime } from "@hazae41/asn1";
import { ASN1Reader } from "libs/reader/reader.js";

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

    const notBefore2 = new UTCTime(notBefore)
    const notAfter2 = new UTCTime(notAfter)

    return new this(notBefore2, notAfter2)
  }

  toASN1() {
    return new Sequence([this.notBefore, this.notAfter])
  }

  static fromASN1(triplet: Triplet) {
    const reader = ASN1Reader.from(triplet, Sequence)
    const notBefore = reader.readClass(UTCTime)
    const notAfter = reader.readClass(UTCTime)

    return new this(notBefore, notAfter)
  }
}