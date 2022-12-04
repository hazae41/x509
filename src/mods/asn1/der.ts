import { Binary } from "libs/binary/binary.js";
import { BitString } from "mods/asn1/bit_string/bit_string.js";
import { Boolean } from "mods/asn1/boolean/boolean.js";
import { Constructed } from "mods/asn1/constructed/constructed.js";
import { Integer } from "mods/asn1/integer/integer.js";
import { Null } from "mods/asn1/null/null.js";
import { ObjectIdentifier } from "mods/asn1/object_identifier/object_identifier.js";
import { OctetString } from "mods/asn1/octet_string/octet_string.js";
import { PrintableString } from "mods/asn1/printable_string/printable_string.js";
import { Sequence } from "mods/asn1/sequence/sequence.js";
import { Set } from "mods/asn1/set/set.js";
import { Type } from "mods/asn1/type/type.js";
import { ToStringable } from "mods/asn1/types.js";
import { Unknown } from "mods/asn1/unknown/unknown.js";
import { UTCTime } from "mods/asn1/utc_time/utc_time.js";
import { UTF8String } from "mods/asn1/utf8_string/utf8_string.js";

export namespace DER {

  export function parse(binary: Binary): ToStringable {
    const start = binary.offset
    const type = Type.fromDER(binary)
    binary.offset = start

    if (type.equals(Boolean.type))
      return Boolean.fromDER(binary)
    if (type.equals(Integer.type))
      return Integer.fromDER(binary)
    if (type.equals(BitString.type))
      return BitString.fromDER(binary)
    if (type.equals(OctetString.type))
      return OctetString.fromDER(binary)
    if (type.equals(Null.type))
      return Null.fromDER(binary)
    if (type.equals(ObjectIdentifier.type))
      return ObjectIdentifier.fromDER(binary)
    if (type.equals(UTF8String.type))
      return UTF8String.fromDER(binary)
    if (type.equals(PrintableString.type))
      return PrintableString.fromDER(binary)
    if (type.equals(Sequence.type))
      return Sequence.fromDER(binary, parse)
    if (type.equals(Set.type))
      return Set.fromDER(binary, parse)
    if (type.equals(UTCTime.type))
      return UTCTime.fromDER(binary)

    if (type.clazz === Type.clazzes.UNIVERSAL)
      return Unknown.fromDER(binary) // TODO throw

    if (type.wrap)
      return Constructed.fromDER(binary, parse)

    return Unknown.fromDER(binary)
  }

}