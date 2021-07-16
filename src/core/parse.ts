import { stripIndent } from "common-tags";
import { Grammar, Parser } from "nearley";
import grammar from "./typefp";

export default function parse(content: string) {
    const parser = new Parser(Grammar.fromCompiled(grammar));

    //@ts-ignore
    parser.reportError = function (token) {
        const message = stripIndent`
            ${this.lexer.formatError(token, "invalid syntax")}Unexpected ${token.type ? token.type + "token: " : ""}${JSON.stringify(
            token.value !== undefined ? token.value : token
        )}`;

        return message;
    };

    parser.feed(content);

    return parser.results;
}
