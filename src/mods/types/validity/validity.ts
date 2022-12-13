import { Sequence, Triplet, UTCTime } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";

export type Time =
  | UTCTime
// | GeneralizedTime

export class Validity {

  constructor(
    readonly notBefore: Time,
    readonly notAfter: Time
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.from(triplet, Sequence)
    const notBefore = reader.readClass(UTCTime)
    const notAfter = reader.readClass(UTCTime)

    return new this(notBefore, notAfter)
  }
}