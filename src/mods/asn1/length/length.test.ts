import { assert } from "libs/assert/assert.js";
import { Binary } from "libs/binary/binary.js";
import { Length } from "mods/asn1/length/length.js";
import { relative, resolve } from "node:path";
import { test } from "uvu";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname.replace(".cjs", ".ts")))
})

function hexToLength(hex: string) {
  const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex")
  return Length.fromDER(new Binary(buffer)).value
}

test("Read", async () => {
  assert(hexToLength("82 01 7F") === 383)
  assert(hexToLength("82 04 92") === 1170)
})

test.run()