import { DER, DERCursor } from "@hazae41/asn1";
import { Readable } from "@hazae41/binary";
import { Resolvable } from "./resolve.js";

export function readAndResolveFromBytesOrThrow<T>(resolvable: Resolvable<T>, bytes: Uint8Array): T {
  const triplet = Readable.readFromBytesOrThrow(DER, bytes)
  const cursor = new DERCursor([triplet])

  return resolvable.resolveOrThrow(cursor)
}