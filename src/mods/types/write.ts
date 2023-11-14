import { DERable } from "@hazae41/asn1";
import { Writable, WriteError } from "@hazae41/binary";
import { Result } from "@hazae41/result";

export function writeToBytesOrThrow(type: DERable): Uint8Array {
  return Writable.writeToBytesOrThrow(type.toDER())
}

export function tryWriteToBytes(type: DERable): Result<Uint8Array, WriteError> {
  return Writable.tryWriteToBytes(type.toDER())
}