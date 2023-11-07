export * from "./algorithm_identifier/algorithm_identifier.js";
export * from "./attribute_type/attribute_type.js";
export * from "./attribute_type_and_value/attribute_type_and_value.js";
export * from "./attribute_value/attribute_value.js";
export * from "./certificate/certificate.js";
export * from "./directory_string/directory_string.js";
export * from "./name/name.js";
export * from "./rdn_sequence/rdn_sequence.js";
export * from "./relative_distinguished_name/relative_distinguished_name.js";
export * from "./subject_public_key_info/subject_public_key_info.js";
export * from "./tbs_certificate/tbs_certificate.js";
export * from "./tbs_certificate/tbs_certificate_version.js";
export * from "./validity/validity.js";

import { DER, DERCursor, DERable } from "@hazae41/asn1";
import { ReadError, Readable, Writable, WriteError } from "@hazae41/binary";
import { Result } from "@hazae41/result";

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

export function resolveOrThrow<T>(resolvable: Resolvable<T>, cursor: DERCursor): T {
  return resolvable.resolveOrThrow(cursor)
}

export function tryResolve<T>(resolvable: Resolvable<T>, cursor: DERCursor): Result<T, ResolveError> {
  return Result.runAndWrapSync(() => {
    return resolvable.resolveOrThrow(cursor)
  }).mapErrSync(ResolveError.from)
}

export function readFromBytesOrThrow<T>(resolvable: Resolvable<T>, bytes: Uint8Array): T {
  const triplet = Readable.readFromBytesOrThrow(DER, bytes)
  const cursor = new DERCursor([triplet])

  return resolvable.resolveOrThrow(cursor)
}

export function tryReadFromBytes<T>(resolvable: Resolvable<T>, bytes: Uint8Array): Result<T, ReadError | ResolveError> {
  return Result.unthrowSync(t => {
    const triplet = Readable.tryReadFromBytes(DER, bytes).throw(t)
    const cursor = new DERCursor([triplet])

    return tryResolve(resolvable, cursor)
  })
}

export function writeToBytesOrThrow(type: DERable<Writable>): Uint8Array {
  return Writable.writeToBytesOrThrow(type.toDER())
}

export function tryWriteToBytes(type: DERable<Writable>): Result<Uint8Array, WriteError> {
  return Writable.tryWriteToBytes(type.toDER())
}