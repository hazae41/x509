import { DERCursor, PrintableString, UTF8String } from "@hazae41/asn1"
import { Unimplemented } from "@hazae41/result"

export namespace DirectoryString {
  export type Inner =
    | UTF8String.DER
    | PrintableString.DER
  // | BMPString
  // | TeletexString
  // | UniversalString
}

export class DirectoryString<T extends DirectoryString.Inner = DirectoryString.Inner> {

  constructor(
    readonly inner: T
  ) { }

  toASN1(): T {
    return this.inner
  }

  static fromASN1<T extends DirectoryString.Inner>(inner: T) {
    return new DirectoryString(inner)
  }

  static resolveOrThrow(parent: DERCursor) {
    const triplet = parent.readOrThrow()

    if (triplet instanceof UTF8String.DER)
      return DirectoryString.fromASN1(triplet)

    if (triplet instanceof PrintableString.DER)
      return DirectoryString.fromASN1(triplet)

    throw new Unimplemented({ cause: `DirectoryString for ${triplet.type}` })
  }

}