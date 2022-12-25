import { Triplet } from "@hazae41/asn1";
import { DirectoryString } from "mods/types/directory_string/directory_string.js";

export class AttributeValue {

  constructor(
    readonly inner: Triplet
  ) { }

  toDirectoryString() {
    return DirectoryString.fromASN1(this.inner)
  }

  toString() {
    return this.toDirectoryString().inner.value
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