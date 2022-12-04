import { Type } from "mods/asn1/type/type.js"

export interface ASN1 {
  type: Type

  toString(): string
}