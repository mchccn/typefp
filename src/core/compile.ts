import { readFile } from "fs/promises";

export default async function compile(file: string) {
    const content = await readFile(file, "utf8");

    return content;
}
