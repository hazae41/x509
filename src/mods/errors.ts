export class InvalidFormatError extends Error {
  readonly #class = InvalidFormatError
  readonly name = this.#class.name
}