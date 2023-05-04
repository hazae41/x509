import { PrintableString, Triplet, UTF8String } from "@hazae41/asn1"
import { Bytes } from "@hazae41/bytes"
import { Err, Ok, Result } from "@hazae41/result"

function escape(match: string) {
  const hex = Bytes.toHex(Bytes.fromUtf8(match))
  return hex.replaceAll(/../g, m => "\\" + m)
}

function unescape(match: string) {
  const hex = match.replaceAll("\\", "")
  return Bytes.toUtf8(Bytes.fromHex(hex))
}

export type DirectoryStringType =
  | UTF8String
  | PrintableString
// | BMPString
// | TeletexString
// |UniversalString

export interface Creator<T> {
  create(value: string): T
}

export class DirectoryString<T extends DirectoryStringType = DirectoryStringType> {

  constructor(
    readonly inner: T
  ) { }

  toASN1(): T {
    return this.inner
  }

  static fromASN1<T extends DirectoryStringType>(inner: T) {
    return new DirectoryString(inner)
  }

  static tryRead(triplet: Triplet): Result<DirectoryString, Error> {
    if (triplet instanceof UTF8String)
      return new Ok(new DirectoryString(triplet))
    if (triplet instanceof PrintableString)
      return new Ok(new DirectoryString(triplet))
    return new Err(new Error(`Cannot convert ${triplet} to a DirectoryString`))
  }

  toX501() {
    let x501 = this.inner.value
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

  static fromX501<T extends DirectoryStringType>(x501: string, creator: Creator<T>) {
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

    return new DirectoryString(inner)
  }
}