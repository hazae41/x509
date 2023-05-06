import { Triplet, Type } from "@hazae41/asn1"
import { Err, Ok, Result } from "@hazae41/result"
import { Class } from "libs/reflection/reflection.js"

export interface ANS1Holder {
  triplets: Triplet[]
}

export interface ASN1Resolvable<T> {
  tryResolveFromASN1(triplet: Triplet): Result<T, Error>
}

export class ASN1CastError extends Error {
  readonly #class = ASN1CastError

  constructor(
    readonly triplet: Triplet,
    readonly clazzes: Class<unknown>[]
  ) {
    super(`Could not cast triplet to ${clazzes.map(clazz => clazz.name).join(",")}`)
  }
}

export class ASN1ReadOverflowError extends Error {
  readonly #class = ASN1ReadOverflowError

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

  tryGet(): Result<Triplet, ASN1ReadOverflowError> {
    const triplet = this.inner.triplets.at(this.offset)

    if (triplet === undefined)
      return new Err(new ASN1ReadOverflowError())

    return new Ok(triplet)
  }

  tryRead(): Result<Triplet, ASN1ReadOverflowError> {
    return this.tryGet().inspectSync(() => this.offset++)
  }

  tryReadAndResolve<T>(readable: ASN1Resolvable<T>): Result<T, Error> {
    return this.tryRead().andThenSync(triplet => readable.tryResolveFromASN1(triplet))
  }

  tryReadAndCast<T>(...clazzes: Class<T>[]): Result<T, ASN1ReadOverflowError | ASN1CastError> {
    const tripletRes = this.tryRead()

    if (tripletRes.isErr())
      return tripletRes

    for (const clazz of clazzes)
      if (tripletRes.inner instanceof clazz)
        return new Ok(tripletRes.inner as T)

    return new Err(new ASN1CastError(tripletRes.inner, clazzes))
  }

}
