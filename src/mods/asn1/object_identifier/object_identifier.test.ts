import { Binary } from "libs/binary/binary.js";
import { ObjectIdentifier, VLQ } from "mods/asn1/object_identifier/object_identifier.js";
import { assert } from "node:console";
import { relative, resolve } from "node:path";
import { test } from "uvu";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname.replace(".cjs", ".ts")))
})

function hexToOID(hex: string) {
  const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex")
  return ObjectIdentifier.fromDER(new Binary(buffer)).value
}

function hexToVLQ(hex: string) {
  const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex")
  return VLQ.read(new Binary(buffer))
}

test("Read", async () => {
  assert(hexToVLQ("00") === 0)
  assert(hexToVLQ("7F") === 127)
  assert(hexToVLQ("81 00") === 128)
  assert(hexToVLQ("C0 00") === 8192)
  assert(hexToVLQ("FF 7F") === 16383)
  assert(hexToVLQ("81 80 00") === 16384)
  assert(hexToVLQ("FF FF 7F") === 2097151)
  assert(hexToVLQ("81 80 80 00") === 2097152)
  assert(hexToVLQ("C0 80 80 00") === 134217728)
  assert(hexToVLQ("FF FF FF 7F") === 268435455)
})

test.run()