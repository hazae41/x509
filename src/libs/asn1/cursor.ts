import { Triplet, Type } from "@hazae41/asn1"

type Class<T> = new (...params: any[]) => T

export interface ASN1Readable<T> {
  fromASN1(triplet: Triplet): T
}

export interface ASN1Typed {
  type: Type
}

export interface ANS1Holder {
  triplets: Triplet[]
}

export class ASN1Cursor {

  offset = 0

  constructor(
    readonly triplets: Triplet[]
  ) { }

  static from(holder: ANS1Holder) {
    return new this(holder.triplets)
  }

  static fromAs<C extends Class<ANS1Holder>>(holder: unknown, clazz: C) {
    if (!(holder instanceof clazz))
      throw new Error(`Expected class ${clazz.name}`)

    return this.from(holder)
  }

  static fromAsTyped<C extends Class<ANS1Holder & ASN1Typed>>(holder: unknown, clazz: C, type: Type) {
    if (!(holder instanceof clazz))
      throw new Error(`Expected class ${clazz.name}`)

    if (!holder.type.equals(type))
      throw new Error(`Expected type ${type.toDER().byte}`)

    return this.from(holder)
  }

  get before() {
    return this.triplets.slice(0, this.offset)
  }

  get after() {
    return this.triplets.slice(this.offset)
  }

  get() {
    const triplet = this.triplets.at(this.offset)

    if (triplet === undefined)
      throw new Error(`Expected triplet but got undefined`)

    return triplet
  }

  read() {
    const triplet = this.get()
    this.offset++
    return triplet
  }

  tryRead() {
    const offset = this.offset

    try {
      return this.read()
    } catch (e: unknown) {
      this.offset = offset
    }
  }

  readAs<T, C extends Class<T>>(...clazzes: C[]) {
    const triplet = this.read()

    for (const clazz of clazzes)
      if (triplet instanceof clazz)
        return triplet as InstanceType<C>

    throw new Error(`Expected class ${clazzes.map(it => it.name).join(" or ")}`)
  }

  readAndConvert<T>(readable: ASN1Readable<T>) {
    return readable.fromASN1(this.read())
  }

  tryReadAndConvert<T>(readable: ASN1Readable<T>) {
    const offset = this.offset

    try {
      return this.readAndConvert(readable)
    } catch (e: unknown) {
      this.offset = offset
    }
  }
}
