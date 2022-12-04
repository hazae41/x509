export namespace Buffers {

  export function toBinary(buffer: Buffer) {
    const bn = BigInt("0x" + buffer.toString("hex"))
    return bn.toString(2).padStart(buffer.length * 8, "0")
  }

}