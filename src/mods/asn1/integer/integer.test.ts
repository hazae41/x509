import { assert } from "libs/assert/assert.js";
import { Binary } from "libs/binary/binary.js";
import { Integer } from "mods/asn1/integer/integer.js";
import { relative, resolve } from "node:path";
import { test } from "uvu";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname.replace(".cjs", ".ts")))
})

function hexToInteger(hex: string) {
  const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex")
  return Integer.read(new Binary(buffer)).value
}

test("Read", async () => {
  assert(hexToInteger("02 01 00") === BigInt(0))
  assert(hexToInteger("02 02 30 39") === BigInt(12345))
  assert(hexToInteger("02 12 03 D4 15 31 8E 2C 57 1D 29  05 FC 3E 05 27 68 9D 0D 09") === BigInt("333504890676592408951587385614406537514249"))
  assert(hexToInteger("02 01 64") === BigInt(100))
  assert(hexToInteger("02 01 9C") === BigInt(-100))
  assert(hexToInteger("02 02 00 FF") == BigInt(255))
  assert(hexToInteger("02 01 80") == BigInt(-128))
  assert(hexToInteger("02 05 80 00 00 00 01") === BigInt("-549755813887"))
})

test.run()
