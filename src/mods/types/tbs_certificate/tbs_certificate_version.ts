import { Constructed, Integer, Triplet, Type } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";

export class TBSCertificateVersion {
  readonly #class = TBSCertificateVersion

  static type = new Type(
    Type.clazzes.CONTEXT,
    Type.wraps.CONSTRUCTED,
    0)

  constructor(
    readonly value = new Integer(BigInt(1))
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromTagged(triplet, Constructed, this.type)
    const value = reader.readClass(Integer)

    return new this(value)
  }

  toNumber() {
    return Number(this.value.value)
  }

  static fromNumber(value: number) {
    return new this(new Integer(BigInt(value)))
  }
}