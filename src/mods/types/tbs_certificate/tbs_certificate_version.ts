import { Constructed, Integer, Triplet, Type } from "@hazae41/asn1";
import { ASN1Cursor } from "libs/asn1/cursor.js";

export class TBSCertificateVersion {
  readonly #class = TBSCertificateVersion

  static type = new Type(
    Type.clazzes.CONTEXT,
    Type.wraps.CONSTRUCTED,
    0)

  constructor(
    readonly value = Integer.new(BigInt(1))
  ) { }

  toASN1(): Triplet {
    return new Constructed(this.#class.type, [this.value])
  }

  static fromASN1(triplet: Triplet) {
    const cursor = ASN1Cursor.fromAsTyped(triplet, Constructed, this.type)
    const value = cursor.readAs(Integer)

    return new this(value)
  }

  toNumber() {
    return Number(this.value.value)
  }

  static fromNumber(value: number) {
    return new this(Integer.new(BigInt(value)))
  }
}