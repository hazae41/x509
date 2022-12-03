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

test("Read", async () => {
  const buffer = Buffer.from("02 01 00".replaceAll(" ", ""), "hex")
  const integer = Integer.read(new Binary(buffer))
  assert(integer.value === 0)
})

test.run()