import { Type } from "mods/asn1/type/type.js"

export interface Typed {
  type: Type
}

export interface ToStringable {
  toString(): string
}