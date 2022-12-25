import { Triplet } from "@hazae41/asn1";
import { DirectoryString } from "mods/types/directory_string/directory_string.js";

export class AttributeValue {

  constructor(
    readonly inner: Triplet
  ) { }

  toDirectoryString() {
    return DirectoryString.fromASN1(this.inner)
  }

  static fromDirectoryString(dstring: DirectoryString) {
    return new this(dstring.toASN1())
  }
}