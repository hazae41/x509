import { IA5String, PrintableString, Triplet, UTF8String } from "@hazae41/asn1";

export class DirectoryString {
  // TODO
}

export class AttributeValue {

  constructor(
    readonly inner: Triplet
  ) { }

  toDirectoryString() {
    if (this.inner instanceof UTF8String)
      return this.inner
    if (this.inner instanceof PrintableString)
      return this.inner
    if (this.inner instanceof IA5String)
      return this.inner

    throw new Error(`Cannot convert ${this.inner} to a DirectoryString`)
  }

  toString() {
    return this.toDirectoryString().value
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
}