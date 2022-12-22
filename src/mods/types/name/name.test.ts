import { test } from "@hazae41/phobos";
import { relative, resolve } from "path";
import { Name } from "./name.js";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".cjs", ".ts")))

test("Name", async () => {
  const name = Name.fromNameObject({ commonName: "www.dsjnhfubu.com" })

  console.log(name.toNameObject())
})