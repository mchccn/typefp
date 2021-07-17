import { ExtendedIdentifier } from "./types";

export default function params(input: string[][]) {
    let raw = input.flat().join("");

    const output = [] as ExtendedIdentifier[];

    while (raw.length) {
        const index = raw.indexOf(":");

        const separator = raw.indexOf(",");

        const [identifier, value] = [raw.slice(0, index).trim(), raw.slice(index + 1, separator !== -1 ? separator : undefined).trim()];

        raw = raw.slice(separator !== -1 ? separator + 1 : raw.length);

        output.push({ type: "extended_identifier", name: identifier, data: { type: "extends", data: value } });
    }

    return output;
}
