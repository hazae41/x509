import { PrintableString, Triplet, UTF8String } from "@hazae41/asn1"
import { Err, Ok, Result } from "@hazae41/result"

export type DirectoryStringInner =
  | UTF8String
  | PrintableString
// | BMPString
// | TeletexString
// | UniversalString

export class NotDirectoryString extends Error {
  readonly #class = NotDirectoryString

  constructor(
    readonly triplet: Triplet
  ) {
    super(`${triplet} is not a DirectoryString`)
  }
}

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

  static tryResolveFromASN1(triplet: Triplet): Result<DirectoryString, Error> {
    if (triplet instanceof UTF8String)
      return new Ok(DirectoryString.fromASN1(triplet))

    if (triplet instanceof PrintableString)
      return new Ok(DirectoryString.fromASN1(triplet))

    return new Err(new NotDirectoryString(triplet))
  }

}