import { DER, DERCursor } from "@hazae41/asn1";
import { ReadError, Readable } from "@hazae41/binary";
import { Result } from "@hazae41/result";
import { Resolvable, ResolveError, tryResolve } from "./resolve.js";

export function readAndResolveFromBytesOrThrow<T>(resolvable: Resolvable<T>, bytes: Uint8Array): T {
  const triplet = Readable.readFromBytesOrThrow(DER, bytes)
  const cursor = new DERCursor([triplet])

  return resolvable.resolveOrThrow(cursor)
}

export function tryReadAndResolveFromBytes<T>(resolvable: Resolvable<T>, bytes: Uint8Array): Result<T, ReadError | ResolveError> {
  return Result.unthrowSync(t => {
    const triplet = Readable.tryReadFromBytes(DER, bytes).throw(t)
    const cursor = new DERCursor([triplet])

    return tryResolve(resolvable, cursor)
  })
}