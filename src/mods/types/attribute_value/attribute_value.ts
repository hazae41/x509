import { ASN1Error, DER, DERReadError, Triplet } from "@hazae41/asn1";
import { Base16 } from "@hazae41/base16";
import { BinaryWriteError } from "@hazae41/binary";
import { Box, Copied } from "@hazae41/box";
import { Err, Ok, Result } from "@hazae41/result";
import { Utf8 } from "libs/utf8/utf8.js";
import { InvalidFormatError } from "mods/errors.js";
import { DirectoryString, DirectoryStringInner } from "mods/types/directory_string/directory_string.js";

function escape(match: string) {
  const bytes = new Box(new Copied(Utf8.encoder.encode(match)))
  const hex = Base16.get().tryEncode(bytes).unwrap()
  return hex.replaceAll(/../g, m => "\\" + m)
}

function unescape(match: string) {
  const hex = match.replaceAll("\\", "")
  const bytes = Base16.get().tryPadStartAndDecode(hex).unwrap().copyAndDispose().bytes
  return Utf8.decoder.decode(bytes)
}

export interface StringCreator<T> {
  create(value: string): T
}

export class KnownAttributeValue {

  constructor(
    readonly inner: DirectoryString
  ) { }

  toASN1(): Triplet {
    return this.inner.inner
  }

  static fromASN1(inner: DirectoryStringInner) {
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

  static fromX501<T extends DirectoryStringInner>(x501: string, creator: StringCreator<T>) {
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

    const inner = creator.create(value)
    const string = new DirectoryString(inner)

    return new KnownAttributeValue(string)
  }

}

export class UnknownAttributeValue<T extends Triplet = Triplet> {

  constructor(
    readonly inner: T
  ) { }

  toASN1(): Triplet {
    return this.inner
  }

  static fromASN1<T extends Triplet>(inner: T) {
    return new this(inner)
  }

  tryToX501(): Result<string, BinaryWriteError> {
    return DER.tryWriteToBytes(this.inner).mapSync(bytes => `#${Base16.get().tryEncode(new Box(new Copied(bytes))).unwrap()}`)
  }

  static tryFromX501(hex: string): Result<UnknownAttributeValue, ASN1Error | DERReadError | InvalidFormatError> {
    return Result.unthrowSync(t => {
      if (!hex.startsWith("#"))
        return new Err(new InvalidFormatError(`AttributeValue not preceded by hash`))

      const bytes = Base16.get().tryPadStartAndDecode(hex.slice(1)).unwrap().copyAndDispose().bytes
      const triplet = DER.tryReadFromBytes(bytes).throw(t)

      return new Ok(new UnknownAttributeValue(triplet))
    })
  }

}

export type AttributeValue =
  | KnownAttributeValue
  | UnknownAttributeValue

export namespace AttributeValue { }