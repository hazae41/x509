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
  assert(hexToInteger("02 01 00") === 0)
  assert(hexToInteger("02 02 30 39") === 12345)
})

test.run()