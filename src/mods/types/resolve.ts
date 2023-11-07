import { DERCursor } from "@hazae41/asn1";
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