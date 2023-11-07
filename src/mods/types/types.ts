import { DER, DERCursor, DERTriplet } from "@hazae41/asn1"
import { ReadError, Readable, Writable, WriteError } from "@hazae41/binary"
import { Result } from "@hazae41/result"

export interface Resolvable<T> {
  resolveOrThrow(cursor: DERCursor): T
}

export class ResolveError extends Error {
  readonly #class = ResolveError
  readonly name = this.#class.name

  constructor(options: ErrorOptions) {
    super(`Could not resolve`, options)
  }

  static from(cause: unknown) {
    return new ResolveError({ cause })
  }

}

export function tryResolve<T>(resolvable: Resolvable<T>, cursor: DERCursor): Result<T, ResolveError> {
  return Result.runAndWrapSync(() => {
    return resolvable.resolveOrThrow(cursor)
  }).mapErrSync(ResolveError.from)
}


export interface ASN1able {
  toASN1(): DERTriplet
}

export function tryWriteToBytes(type: ASN1able): Result<Uint8Array, WriteError> {
  return Writable.tryWriteToBytes(type.toASN1())
}

export function tryReadFromBytes<T>(resolvable: Resolvable<T>, bytes: Uint8Array): Result<T, ReadError | ResolveError> {
  return Result.unthrowSync(t => {
    const triplet = Readable.tryReadFromBytes(DER, bytes).throw(t)
    const cursor = new DERCursor([triplet])

    return tryResolve(resolvable, cursor)
  })
}