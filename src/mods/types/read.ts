import { DER, DERCursor } from "@hazae41/asn1";
import { Readable } from "@hazae41/binary";
import { BytesLike } from "libs/bytes/index.js";
import { Resolvable } from "./resolve.js";

export function readAndResolveFromBytesOrThrow<T>(resolvable: Resolvable<T>, bytes: BytesLike): T {
  const triplet = Readable.readFromBytesOrThrow(DER, bytes)
  const cursor = new DERCursor([triplet])

  return resolvable.resolveOrThrow(cursor)
}