import { DERable } from "@hazae41/asn1";
import { Writable } from "@hazae41/binary";

export function writeToBytesOrThrow(type: DERable): Uint8Array<ArrayBuffer> {
  return Writable.writeToBytesOrThrow(type.toDER())
}