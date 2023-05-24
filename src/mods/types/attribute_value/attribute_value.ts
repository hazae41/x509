import { DER, InvalidLengthError, InvalidTypeError, InvalidValueError, NotAnOID, Triplet, Unimplemented } from "@hazae41/asn1";
import { BinaryReadError } from "@hazae41/binary";
import { Bytes } from "@hazae41/bytes";
import { Err, Ok, Result } from "@hazae41/result";
import { ASN1Error } from "libs/asn1/cursor.js";
import { InvalidFormatError } from "mods/errors.js";
import { DirectoryString, DirectoryStringInner } from "mods/types/directory_string/directory_string.js";

function escape(match: string) {
  const hex = Bytes.toHex(Bytes.fromUtf8(match))
  return hex.replaceAll(/../g, m => "\\" + m)
}

function unescape(match: string) {
  const hex = match.replaceAll("\\", "")
  return Bytes.toUtf8(Bytes.fromHex(hex))
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

  tryToX501(): Result<string, unknown> {
    return DER.tryWriteToBytes(this.inner).mapSync(bytes => `#${Bytes.toHex(bytes)}`)
  }

  static tryFromX501(hex: string): Result<UnknownAttributeValue, ASN1Error | InvalidFormatError | BinaryReadError | Unimplemented | InvalidTypeError | InvalidValueError | InvalidLengthError | NotAnOID> {
    return Result.unthrowSync(t => {
      if (!hex.startsWith("#"))
        return new Err(new InvalidFormatError(`AttributeValue not preceded by hash`))

      const bytes = Bytes.fromHex(hex.slice(1))
      const triplet = DER.tryReadFromBytes(bytes).throw(t)

      return new Ok(new UnknownAttributeValue(triplet))
    })
  }

}

export type AttributeValue =
  | KnownAttributeValue
  | UnknownAttributeValue

export namespace AttributeValue { }