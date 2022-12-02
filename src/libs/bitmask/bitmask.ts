export class Bitmask {
  readonly class = Bitmask

  constructor(
    public n: number
  ) { }

  get(i: number) {
    return (this.n & (1 << i)) !== 0
  }

  toggle(i: number) {
    this.n ^= (1 << i)

    return this
  }

  enable(i: number) {
    this.n |= (1 << i)

    return this
  }

  disable(i: number) {
    this.n &= ~(1 << i)

    return this
  }

  set(i: number, x: boolean) {
    if (x)
      return this.enable(i)
    else
      return this.disable(i)
  }

  export() {
    return this.n >>> 0
  }
}