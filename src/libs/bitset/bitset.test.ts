import { assert, throws } from "libs/assert/assert.js";
import { Bitset } from "libs/bitset/bitset.js";
import { relative, resolve } from "node:path";
import { test } from "uvu";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname))
})

function format(bitmask: Bitset, digits: number) {
  let s = bitmask.unsigned().toString(2)
  while (s.length < digits) s = "0" + s
  return s
}

test("Identity", async () => {
  const bitmask = new Bitset(0b00000000, 8)

  assert(bitmask.get(1) === false)
  assert(format(bitmask, 8) === "00000000")
})

test("Enable then disable", async () => {
  const bitmask = new Bitset(0b00000000, 8)

  bitmask.enable(1)
  assert(bitmask.get(1) === true)
  assert(format(bitmask, 8) === "00000010")

  bitmask.disable(1)
  assert(bitmask.get(1) === false)
  assert(format(bitmask, 8) === "00000000")
})

test("Toggle then toggle", async () => {
  const bitmask = new Bitset(0b00000000, 8)

  bitmask.toggle(1)
  assert(bitmask.get(1) === true)
  assert(format(bitmask, 8) === "00000010")

  bitmask.toggle(1)
  assert(bitmask.get(1) === false)
  assert(format(bitmask, 8) === "00000000")
})

test("Export Int32 to Uint32", async () => {
  const bitmask = new Bitset(Date.now(), 32)

  const n0 = bitmask.value
  const e0 = bitmask.unsigned()

  bitmask.toggle(32)

  const n1 = bitmask.value
  const e1 = bitmask.unsigned()

  assert(n0 > 0)
  assert(n1 < 0)

  assert(e0 > 0)
  assert(e1 > 0)

  const buffer = Buffer.from([0, 0, 0, 0])
  assert(throws(() => buffer.writeUInt32BE(bitmask.value, 0)))
  assert(!throws(() => buffer.writeUInt32BE(bitmask.unsigned(), 0)))
})

test("First", async () => {
  const bitmask = new Bitset(0b11100011, 8)

  assert(bitmask.first(2) === 3)
  assert(bitmask.first(3) === 7)
})

test("Last", async () => {
  const bitmask = new Bitset(0b11100111, 8)

  assert(bitmask.last(2) === 3)
  assert(bitmask.last(3) === 7)
})

test.run()