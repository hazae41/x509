import { assert } from "libs/assert/assert.js";
import { Binary } from "libs/binary/binary.js";
import { Type } from "mods/asn1/type/type.js";
import { Certificate } from "mods/x509/certificate/certificate.js";
import { relative, resolve } from "node:path";
import { test } from "uvu";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname.replace(".cjs", ".ts")))
})

function hexToType(hex: string) {
  const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex")
  return Type.fromDER(new Binary(buffer))
}

test("Read", async () => {
  assert(hexToType("30").equals(Certificate.type))
})

test.run()