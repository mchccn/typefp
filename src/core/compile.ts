import { readFile } from "fs/promises";
import { inspect } from "util";
import parse from "./parse";
import { ParseData } from "./types";

export default async function compile(file: string) {
    const content = await readFile(file, "utf8");

    const [raw] = parse(content) as any[][];

    const parsed = raw.filter(($) => $ !== null) as ParseData[];

    (function antinull(parsed: ParseData[]) {
        parsed.forEach(($) => {
            if ($ === null) return parsed.splice(parsed.indexOf($), 1);

            if ($.type === "statement" && $.data === null) return parsed.splice(parsed.indexOf($), 1);

            if (Array.isArray($.data)) antinull($.data);

            return (Object.keys($) as (keyof typeof $)[]).forEach((key) => {
                const v = $[key];

                if (v === null) Array.isArray($) ? $.splice($.indexOf($[key]), 1) : delete $[key];
                else if (Array.isArray(v)) antinull(v);
                else if (typeof v === "object") antinull([v]);
            });
        });
    })(parsed);

    const output = parsed
        .map(($) => {
            if ($.type === "statement") {
                if (Array.isArray($.data)) {
                } else {
                    if ($.data.type === "comment") {
                        return `//${$.data.raw.trimStart().slice(1)}`;
                    }

                    console.log(inspect($, false, Infinity, true));

                    if ($.data.type === "define") {
                        return `type ${$.data.name.name}${
                            $.data.params && $.data.params.data.length
                                ? "<" + $.data.params.data.map((p) => `${p.name}${p.data ? " extends " + p.data.data : ""}`).join(", ") + ">"
                                : ""
                        } = ${$.data.return};`; // ! fix
                    }
                }
            }

            return;
        })
        .join("\n");

    return output;
}
