import { assert, test } from "@hazae41/phobos";
import { relative, resolve } from "path";
import { Name } from "./name.js";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".cjs", ".ts")))

test("Name", async () => {
  const name = Name.fromObject({ commonName: "www.dsjnhfubu.com" })

  assert(name.toObject().commonName === "www.dsjnhfubu.com")
})