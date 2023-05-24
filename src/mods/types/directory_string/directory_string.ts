import { PrintableString, Triplet, UTF8String, Unimplemented } from "@hazae41/asn1"
import { Err, Ok, Result } from "@hazae41/result"
import { ASN1Error } from "libs/asn1/cursor.js"

export type DirectoryStringInner =
  | UTF8String
  | PrintableString
// | BMPString
// | TeletexString
// | UniversalString

export class DirectoryString<T extends DirectoryStringInner = DirectoryStringInner> {

  constructor(
    readonly inner: T
  ) { }

  toASN1(): T {
    return this.inner
  }

  static fromASN1<T extends DirectoryStringInner>(inner: T) {
    return new DirectoryString(inner)
  }

  static tryResolve(triplet: Triplet): Result<DirectoryString, ASN1Error | Unimplemented> {
    if (triplet instanceof UTF8String)
      return new Ok(DirectoryString.fromASN1(triplet))

    if (triplet instanceof PrintableString)
      return new Ok(DirectoryString.fromASN1(triplet))

    return new Err(new Unimplemented(`DirectoryString for ${triplet.type}`))
  }

}