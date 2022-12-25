import { IA5String, PrintableString, Triplet, UTF8String } from "@hazae41/asn1"

export type DirectoryStringInner =
  InstanceType<DirectoryStringInnerType>

export type DirectoryStringInnerType =
  | typeof UTF8String
  | typeof PrintableString
  | typeof IA5String

function escape(match: string) {
  const hex = Buffer.from(match, "utf8").toString("hex")
  return hex.replaceAll(/../g, m => "\\" + m)
}

function unescape(match: string) {
  const hex = match.replaceAll("\\", "")
  return Buffer.from(hex, "hex").toString("utf8")
}

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

  static fromX501<C extends DirectoryStringInnerType>(x501: string, clazz: C) {
    let value = x501
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

    const inner = new clazz(value)

    return new this(inner)
  }
}