import { IA5String, PrintableString, Triplet, UTF8String } from "@hazae41/asn1"

export type DirectoryStringInner =
  InstanceType<DirectoryStringInnerType>

export type DirectoryStringInnerType =
  | typeof UTF8String
  | typeof PrintableString
  | typeof IA5String

export class DirectoryString {

  constructor(
    readonly inner: DirectoryStringInner
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

  toString() {
    return this.inner.value
      .replaceAll("\\", "\\5C")
      .replaceAll(" ", "\\20")
      .replaceAll("\"", "\\22")
      .replaceAll("#", "\\23")
      .replaceAll("+", "\\2B")
      .replaceAll(",", "\\2C")
      .replaceAll(";", "\\3B")
      .replaceAll("<", "\\3C")
      .replaceAll("=", "\\3D")
      .replaceAll(">", "\\3E")
  }

  static fromString<C extends DirectoryStringInnerType>(string: string, clazz: C) {
    const inner = new clazz(string
      .replaceAll("\\3E", ">")
      .replaceAll("\\3D", "=")
      .replaceAll("\\3C", "<")
      .replaceAll("\\3B", ";")
      .replaceAll("\\2C", ",")
      .replaceAll("\\2B", "+")
      .replaceAll("\\23", "#")
      .replaceAll("\\22", "\"")
      .replaceAll("\\20", " ")
      .replaceAll("\\5C", "\\"))

    return new this(inner)
  }
}