import { DERable } from "@hazae41/asn1";
import { Writable } from "@hazae41/binary";
import { Bytes } from "libs/bytes/index.js";

export function writeToBytesOrThrow(type: DERable): Bytes {
  return Writable.writeToBytesOrThrow(type.toDER())
}