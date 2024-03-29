import { DER, DERTriplet, DERable } from "@hazae41/asn1";
import { Base16 } from "@hazae41/base16";
import { Readable, Writable } from "@hazae41/binary";
import { Utf8 } from "libs/utf8/utf8.js";
import { InvalidFormatError } from "mods/errors.js";
import { DirectoryString } from "mods/types/directory_string/directory_string.js";

function escape(match: string) {
  const bytes = Utf8.encoder.encode(match)
  const hex = Base16.get().tryEncode(bytes).unwrap()
  return hex.replaceAll(/../g, m => "\\" + m)
}

function unescape(match: string) {
  const hex = match.replaceAll("\\", "")
  const bytes = Base16.get().tryPadStartAndDecode(hex).unwrap().copyAndDispose()
  return Utf8.decoder.decode(bytes)
}

export interface StringCreator<T extends DERTriplet> {
  create(type: undefined, value: string): DERable<T>
}

export class KnownAttributeValue {

  constructor(
    readonly inner: DirectoryString
  ) { }

  toDER(): DERTriplet {
    return this.inner.inner
  }

  static fromASN1(inner: DirectoryString.Inner) {
    return new KnownAttributeValue(DirectoryString.fromASN1(inner))
  }

  toX501() {
    let x501 = this.inner.inner.value
      .replaceAll("\\", "\\\\")
      .replaceAll("\"", "\\\"")
      .replaceAll("#", "\\#")
      .replaceAll("+", "\\+")
      .replaceAll(",", "\\,")
      .replaceAll(";", "\\;")
      .replaceAll("<", "\\<")
      .replaceAll("=", "\\=")
      .replaceAll(">", "\\>")
      .replaceAll(/[\p{Cc}\p{Cn}\p{Cs}]+/gu, escape)

    if (x501.startsWith(" "))
      x501 = "\\ " + x501.slice(1)

    if (x501.endsWith(" "))
      x501 = x501.slice(0, -1) + "\\ "

    return x501
  }

  static fromX501<T extends DirectoryString.Inner>(x501: string, creator: StringCreator<T>) {
    const value = x501
      .replaceAll("\\ ", " ")
      .replaceAll("\\\"", "\"")
      .replaceAll("\\#", "#")
      .replaceAll("\\+", "+")
      .replaceAll("\\,", ",")
      .replaceAll("\\;", ";")
      .replaceAll("\\<", "<")
      .replaceAll("\\=", "=")
      .replaceAll("\\>", ">")
      .replaceAll("\\\\", "\\")
      .replaceAll(/(\\[0-9A-Fa-f]{2})+/g, unescape)

    const inner = creator.create(undefined, value).toDER()
    const string = new DirectoryString(inner)

    return new KnownAttributeValue(string)
  }

}

export class UnknownAttributeValue<T extends DERTriplet = DERTriplet> {

  constructor(
    readonly inner: T
  ) { }

  toDER(): DERTriplet {
    return this.inner
  }

  static fromASN1<T extends DERTriplet>(inner: T) {
    return new this(inner)
  }

  toX501OrThrow() {
    const bytes = Writable.writeToBytesOrThrow(this.inner)
    const hex = Base16.get().encodeOrThrow(bytes)

    return `#${hex}`
  }

  static fromX501OrThrow(hex: string) {
    if (!hex.startsWith("#"))
      throw new InvalidFormatError(`AttributeValue not preceded by hash`)

    const bytes = Base16.get().tryPadStartAndDecode(hex.slice(1)).unwrap().copyAndDispose()
    const triplet = Readable.readFromBytesOrThrow(DER, bytes)

    return new UnknownAttributeValue(triplet)
  }

}

export type AttributeValue =
  | KnownAttributeValue
  | UnknownAttributeValue

export namespace AttributeValue { }