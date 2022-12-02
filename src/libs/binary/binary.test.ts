import { Binary } from "libs/binary/binary.js";
import { relative, resolve } from "node:path";
import { test } from "uvu";
import * as assert from "uvu/assert";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname))
})

test("Allocation", async () => {
  for (let i = 0; i < 32; i++) {
    const binary = Binary.alloc(i)
    assert.is(binary.buffer.length, i)
    assert.is(binary.offset, 0)
  }

  for (let i = 0; i < 32; i++) {
    const binary = Binary.allocUnsafe(i)
    assert.is(binary.buffer.length, i)
    assert.is(binary.offset, 0)
  }
})

test("write then read", async () => {
  const buffer = Buffer.from([1, 2, 3, 4])
  const binary = Binary.allocUnsafe(buffer.length)

  binary.write(buffer)
  assert.is(binary.offset, buffer.length)
  assert.ok(binary.buffer.equals(buffer))

  binary.offset = 0

  const buffer2 = binary.read(buffer.length)
  assert.is(binary.offset, buffer.length)
  assert.ok(binary.buffer.equals(buffer2))

  assert.is(buffer.length, buffer2.length)
  assert.ok(buffer.equals(buffer2))
})

test("writeUint8 then readUint8", async () => {
  const binary = Binary.allocUnsafe(1)

  const n = 42

  binary.writeUint8(n)
  assert.is(binary.offset, 1)
  assert.is(binary.buffer.length, 1)
  assert.ok(binary.buffer.equals(Buffer.from([n])))

  binary.offset = 0

  const n2 = binary.readUint8()
  assert.is(binary.offset, 1)
  assert.is(binary.buffer.length, 1)
  assert.ok(binary.buffer.equals(Buffer.from([n])))

  assert.is(n, n2)

  binary.offset = 0

  assert.throws(() => binary.writeUint8(2 ** 8))
  assert.throws(() => binary.writeUint8(-1))
})

test("writeUint16 then readUint16", async () => {
  const binary = Binary.allocUnsafe(2)

  const n = 42

  binary.writeUint16(n)
  assert.is(binary.offset, 2)
  assert.is(binary.buffer.length, 2)

  binary.offset = 0

  const n2 = binary.readUint16()
  assert.is(binary.offset, 2)
  assert.is(binary.buffer.length, 2)

  assert.is(n, n2)

  binary.offset = 0

  assert.throws(() => binary.writeUint16(2 ** 16))
  assert.throws(() => binary.writeUint16(-1))
})

test("writeUint24 then readUint24", async () => {
  const binary = Binary.allocUnsafe(3)

  const n = 42

  binary.writeUint24(n)
  assert.is(binary.offset, 3)
  assert.is(binary.buffer.length, 3)

  binary.offset = 0

  const n2 = binary.readUint24()
  assert.is(binary.offset, 3)
  assert.is(binary.buffer.length, 3)

  assert.is(n, n2)

  binary.offset = 0

  assert.throws(() => binary.writeUint16(2 ** 24))
  assert.throws(() => binary.writeUint16(-1))
})

test("writeUint32 then readUint32", async () => {
  const binary = Binary.allocUnsafe(4)

  const n = 42

  binary.writeUint32(n)
  assert.is(binary.offset, 4)
  assert.is(binary.buffer.length, 4)

  binary.offset = 0

  const n2 = binary.readUint32()
  assert.is(binary.offset, 4)
  assert.is(binary.buffer.length, 4)

  assert.is(n, n2)

  binary.offset = 0

  assert.throws(() => binary.writeUint16(2 ** 32))
  assert.throws(() => binary.writeUint16(-1))
})

test.run()