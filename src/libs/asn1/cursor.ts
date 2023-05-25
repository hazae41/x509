import { Triplet, Type } from "@hazae41/asn1"
import { Err, Ok, Result } from "@hazae41/result"
import { Class } from "libs/reflection/reflection.js"

export interface ASN1Resolvable<ResolveOutput = unknown, ResolveError = unknown> {
  tryResolve(triplet: Triplet): Result<ResolveOutput, ResolveError>
}

export namespace ASN1Resolvable {

  export type Infer<T extends ASN1Resolvable> = ASN1Resolvable<ResolveOutput<T>, ResolveError<T>>

  export type ResolveOutput<T extends ASN1Resolvable> = T extends ASN1Resolvable<infer ResolveOutput, unknown> ? ResolveOutput : never

  export type ResolveError<T extends ASN1Resolvable> = T extends ASN1Resolvable<unknown, infer ResolveError> ? ResolveError : never

}

export interface ANS1Holder {
  readonly triplets: Triplet[]
}

export type ASN1Error =
  | ASN1CastError
  | ASN1OverflowError

export class ASN1CastError extends Error {
  readonly #class = ASN1CastError
  readonly name = this.#class.name

  constructor(
    readonly triplet: Triplet,
    readonly clazzes: Class<unknown>[]
  ) {
    super(`Could not cast triplet to ${clazzes.map(clazz => clazz.name).join(",")}`)
  }
}

export class ASN1OverflowError extends Error {
  readonly #class = ASN1OverflowError
  readonly name = this.#class.name

  constructor() {
    super(`ASN1Cursor read overflow`)
  }
}

export class ASN1Cursor<T extends ANS1Holder> {

  offset = 0

  constructor(
    readonly inner: T
  ) { }

  static new<T extends ANS1Holder>(inner: T) {
    return new this(inner)
  }

  static tryCastAndFrom<T extends ANS1Holder>(holder: Triplet, clazz: Class<T>, type?: Type): Result<ASN1Cursor<T>, ASN1CastError> {
    if (holder instanceof clazz)
      if (type === undefined || holder.type.equals(type))
        return new Ok(new this(holder))

    return new Err(new ASN1CastError(holder, [clazz]))
  }

  get before() {
    return this.inner.triplets.slice(0, this.offset)
  }

  get after() {
    return this.inner.triplets.slice(this.offset)
  }

  tryGet(): Result<Triplet, ASN1OverflowError> {
    const triplet = this.inner.triplets.at(this.offset)

    if (triplet === undefined)
      return new Err(new ASN1OverflowError())

    return new Ok(triplet)
  }

  tryRead(): Result<Triplet, ASN1OverflowError> {
    return this.tryGet().inspectSync(() => this.offset++)
  }

  tryReadAndResolve<ResolveOutput, ResolveError>(readable: ASN1Resolvable<ResolveOutput, ResolveError>): Result<ResolveOutput, ResolveError | ASN1OverflowError> {
    return this.tryRead().andThenSync(triplet => readable.tryResolve(triplet))
  }

  tryReadAndCast<T>(...clazzes: Class<T>[]): Result<T, ASN1OverflowError | ASN1CastError> {
    const triplet = this.tryRead()

    if (triplet.isErr())
      return triplet

    for (const clazz of clazzes)
      if (triplet.inner instanceof clazz)
        return triplet as Ok<T>

    return new Err(new ASN1CastError(triplet.get(), clazzes))
  }

}
