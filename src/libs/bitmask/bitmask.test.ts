import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { Bitmask } from "./bitmask.js";

function format(bitmask: Bitmask, digits: number) {
  let s = bitmask.export().toString(2)
  while (s.length < digits) s = "0" + s
  return s
}

test("Identity", async () => {
  const bitmask = new Bitmask(0b00000000)

  assert.is(bitmask.get(1), false)
  assert.is(format(bitmask, 8), "00000000")
})

test("Enable then disable", async () => {
  const bitmask = new Bitmask(0b00000000)

  bitmask.enable(1)
  assert.is(bitmask.get(1), true)
  assert.is(format(bitmask, 8), "00000010")

  bitmask.disable(1)
  assert.is(bitmask.get(1), false)
  assert.is(format(bitmask, 8), "00000000")
})

test("Toggle then toggle", async () => {
  const bitmask = new Bitmask(0b00000000)

  bitmask.toggle(1)
  assert.is(bitmask.get(1), true)
  assert.is(format(bitmask, 8), "00000010")

  bitmask.toggle(1)
  assert.is(bitmask.get(1), false)
  assert.is(format(bitmask, 8), "00000000")
})

test("Export Int32 to Uint32", async () => {
  const bitmask = new Bitmask(Date.now())

  const n0 = bitmask.n
  const e0 = bitmask.export()

  bitmask.toggle(32)

  const n1 = bitmask.n
  const e1 = bitmask.export()

  assert.ok(n0 > 0)
  assert.ok(n1 < 0)

  assert.ok(e0 > 0)
  assert.ok(e1 > 0)

  const buffer = Buffer.from([0, 0, 0, 0])
  assert.throws(() => buffer.writeUInt32BE(bitmask.n, 0))
  assert.not.throws(() => buffer.writeUInt32BE(bitmask.export(), 0))
})

test.run()