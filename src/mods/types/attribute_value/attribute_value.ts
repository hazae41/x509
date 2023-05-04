import { DirectoryString } from "mods/types/directory_string/directory_string.js";

export class AttributeValue<T extends DirectoryString = DirectoryString> {

  constructor(
    readonly inner: T
  ) { }

}