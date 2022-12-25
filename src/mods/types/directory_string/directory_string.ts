import { IA5String, PrintableString, Triplet, UTF8String } from "@hazae41/asn1"

export class DirectoryString {

  constructor(
    readonly inner: UTF8String | PrintableString | IA5String
  ) { }

  toASN1() {
    return this.inner
  }

  static fromASN1(triplet: Triplet) {
    if (triplet instanceof UTF8String)
      return new this(triplet)
    if (triplet instanceof PrintableString)
      return new this(triplet)
    if (triplet instanceof IA5String)
      return new this(triplet)
    throw new Error(`Cannot convert ${triplet} to a DirectoryString`)
  }
}