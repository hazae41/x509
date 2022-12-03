export class Bitset {
  readonly class = Bitset

  constructor(
    public value: number,
    public length: number
  ) { }

  unsigned() {
    return this.value >>> 0
  }

  get(index: number) {
    if (index < 0)
      throw new Error(`Index is negative`)
    if (index > this.length)
      throw new Error(`Index is too big`)

    return (this.value & (1 << index)) !== 0
  }

  not() {
    for (let i = 0; i < this.length; i++)
      this.toggle(i)
    return this
  }

  toggle(index: number) {
    if (index < 0)
      throw new Error(`Index is negative`)
    if (index > this.length)
      throw new Error(`Index is too big`)

    this.value ^= (1 << index)

    return this
  }

  enable(index: number) {
    if (index < 0)
      throw new Error(`Index is negative`)
    if (index > this.length)
      throw new Error(`Index is too big`)

    this.value |= (1 << index)

    return this
  }

  disable(index: number) {
    if (index < 0)
      throw new Error(`Index is negative`)
    if (index > this.length)
      throw new Error(`Index is too big`)

    this.value &= ~(1 << index)

    return this
  }

  set(index: number, value: boolean) {
    if (value)
      return this.enable(index)
    else
      return this.disable(index)
  }

  first(count: number) {
    if (count < 0)
      throw new Error(`Count is negative`)
    if (count > this.length)
      throw new Error(`Count is too big`)

    return this.value >> (this.length - count)
  }

  last(count: number) {
    if (count < 0)
      throw new Error(`Count is negative`)
    if (count > this.length)
      throw new Error(`Count is too big`)

    return this.value & ((1 << count) - 1)
  }
}