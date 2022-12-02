import { relative, resolve } from 'node:path';
import { test } from 'uvu';

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname))
})

test("Read", async () => {

})

test.run()