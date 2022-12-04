import { Binary } from "libs/binary/binary.js";
import { Constructed } from "mods/asn1/constructed/constructed.js";
import { Integer } from "mods/asn1/integer/integer.js";
import { Length } from "mods/asn1/length/length.js";
import { ToStringable, Typed } from "mods/asn1/object.js";
import { Sequence } from "mods/asn1/sequence/sequence.js";
import { Type } from "mods/asn1/type/type.js";
import { Unknown } from "mods/asn1/unknown/unknown.js";

export namespace DER {

  export function parse(binary: Binary): Typed & ToStringable {
    const start = binary.offset

    const type = Type.fromDER(binary)
    const length = Length.fromDER(binary)

    const content = binary.offset
    binary.offset = start

    if (type.equals(Sequence.type))
      return Sequence.fromDER(binary, parse)
    if (type.equals(Integer.type))
      return Integer.fromDER(binary)

    if (type.clazz === Type.clazzes.context) {
      if (type.constructed)
        return Constructed.fromDER(binary, parse)
    }

    binary.offset = content
    binary.offset += length.value

    return new Unknown(type)
  }

}