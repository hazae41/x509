import { Binary } from "libs/binary/binary.js";
import { Integer } from "mods/asn1/integer/integer.js";
import { Length } from "mods/asn1/length/length.js";
import { ASN1 } from "mods/asn1/object.js";
import { Sequence } from "mods/asn1/sequence/sequence.js";
import { Type } from "mods/asn1/type/type.js";
import { Unknown } from "mods/asn1/unknown/unknown.js";

export function read(binary: Binary): ASN1 {
  const start = binary.offset

  const type = Type.read(binary)
  const length = Length.read(binary)

  const content = binary.offset
  binary.offset = start

  if (type.equals(Sequence.type))
    return Sequence.read(binary, read)
  if (type.equals(Integer.type))
    return Integer.read(binary)

  binary.offset = content
  binary.offset += length.value

  return new Unknown(type)
}