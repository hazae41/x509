import { assert } from "libs/assert/assert.js";
import { Binary } from "libs/binary/binary.js";
import { Type } from "mods/asn1/type/type.js";
import { Certificate } from "mods/certificate/certificate.js";
import { PEM } from "mods/pem/pem.js";
import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { test } from "uvu";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname.replace(".cjs", ".ts")))
})

test("Read", async () => {
  const text = await readFile("./test/cert.pem", "utf8")
  const type = Type.read(new Binary(PEM.parse(text)))
  assert(type.equals(Certificate.type))
})

test.run()