import { Binary } from "libs/binary/binary.js";
import { BitString } from "mods/asn1/bitstring/bitstring.js";
import { Constructed } from "mods/asn1/constructed/constructed.js";
import { Integer } from "mods/asn1/integer/integer.js";
import { ObjectID } from "mods/asn1/objectid/objectid.js";
import { Sequence } from "mods/asn1/sequence/sequence.js";
import { Type } from "mods/asn1/type/type.js";
import { ToStringable } from "mods/asn1/types.js";
import { Unknown } from "mods/asn1/unknown/unknown.js";

export namespace DER {

  export function parse(binary: Binary): ToStringable {
    const start = binary.offset
    const type = Type.fromDER(binary)
    binary.offset = start

    if (type.equals(Integer.type))
      return Integer.fromDER(binary)
    if (type.equals(BitString.type))
      return BitString.fromDER(binary)
    if (type.equals(ObjectID.type))
      return ObjectID.fromDER(binary)
    if (type.equals(Sequence.type))
      return Sequence.fromDER(binary, parse)

    if (type.clazz === Type.clazzes.context) {
      if (type.constructed)
        return Constructed.fromDER(binary, parse)
    }

    return Unknown.fromDER(binary)
  }

}