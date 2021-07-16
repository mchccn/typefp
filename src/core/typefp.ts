// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
  return d[0];
}

interface NearleyToken {
  value: any;
  [key: string]: any;
}

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
}

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
}

type NearleySymbol =
  | string
  | { literal: any }
  | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
}

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    { name: "_$ebnf$1", symbols: [] },
    {
      name: "_$ebnf$1",
      symbols: ["_$ebnf$1", "wschar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "_",
      symbols: ["_$ebnf$1"],
      postprocess: function (d) {
        return null;
      },
    },
    { name: "__$ebnf$1", symbols: ["wschar"] },
    {
      name: "__$ebnf$1",
      symbols: ["__$ebnf$1", "wschar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "__",
      symbols: ["__$ebnf$1"],
      postprocess: function (d) {
        return null;
      },
    },
    { name: "wschar", symbols: [/[ \t\n\v\f]/], postprocess: id },
    {
      name: "main",
      symbols: ["statements", "statement"],
      postprocess: ([statements, statement]) => [
        ...statements.flat(Infinity),
        statement,
      ],
    },
    {
      name: "ending_statement",
      symbols: ["statement"],
      postprocess: (data) => data,
    },
    { name: "statements$ebnf$1", symbols: [] },
    {
      name: "statements$ebnf$1$subexpression$1",
      symbols: ["statement", "newline"],
    },
    {
      name: "statements$ebnf$1",
      symbols: ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "statements",
      symbols: ["statements$ebnf$1"],
      postprocess: (data) => data,
    },
    { name: "statement$subexpression$1", symbols: ["define"] },
    { name: "statement$subexpression$1", symbols: ["comment"] },
    { name: "statement$subexpression$1", symbols: ["empty"] },
    {
      name: "statement",
      symbols: ["statement$subexpression$1"],
      postprocess: (data) => ({ type: "statement", data: data[0][0] }),
    },
    { name: "identifier$ebnf$1", symbols: [/[a-zA-Z0-9_]/] },
    {
      name: "identifier$ebnf$1",
      symbols: ["identifier$ebnf$1", /[a-zA-Z0-9_]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "identifier",
      symbols: ["identifier$ebnf$1"],
      postprocess: (data) => ({
        type: "identifier",
        name: data.flat(Infinity).join(""),
      }),
    },
    {
      name: "extended_identifier$ebnf$1",
      symbols: ["extends"],
      postprocess: id,
    },
    {
      name: "extended_identifier$ebnf$1",
      symbols: [],
      postprocess: () => null,
    },
    {
      name: "extended_identifier",
      symbols: ["identifier", "empty", "extended_identifier$ebnf$1"],
      postprocess: (data) => ({
        type: "extended_identifier",
        name: data[0].name,
        data: data[2],
      }),
    },
    { name: "extends$ebnf$1", symbols: [/[^ \n\t\v<>]/] },
    {
      name: "extends$ebnf$1",
      symbols: ["extends$ebnf$1", /[^ \n\t\v<>]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "extends",
      symbols: [{ literal: ":" }, "empty", "extends$ebnf$1"],
      postprocess: (data) => ({
        type: "extends",
        data: data[2].flat(Infinity).join("").trim(),
      }),
    },
    {
      name: "define$string$1",
      symbols: [
        { literal: "d" },
        { literal: "e" },
        { literal: "f" },
        { literal: "i" },
        { literal: "n" },
        { literal: "e" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "define$subexpression$1", symbols: ["empty"] },
    {
      name: "define$subexpression$1$macrocall$2",
      symbols: ["extended_identifier"],
    },
    {
      name: "define$subexpression$1$macrocall$1$ebnf$1",
      symbols: ["define$subexpression$1$macrocall$2"],
      postprocess: id,
    },
    {
      name: "define$subexpression$1$macrocall$1$ebnf$1",
      symbols: [],
      postprocess: () => null,
    },
    {
      name: "define$subexpression$1$macrocall$1",
      symbols: ["define$subexpression$1$macrocall$1$ebnf$1"],
      postprocess: (data) => ({ type: "list", data: data[0] }),
    },
    {
      name: "define$subexpression$1",
      symbols: [
        "__",
        { literal: "<" },
        "_",
        "define$subexpression$1$macrocall$1",
        "_",
        { literal: ">" },
      ],
    },
    {
      name: "define$string$2",
      symbols: [
        { literal: "r" },
        { literal: "e" },
        { literal: "t" },
        { literal: "u" },
        { literal: "r" },
        { literal: "n" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "define$ebnf$1", symbols: [/[^\n\t\v]/] },
    {
      name: "define$ebnf$1",
      symbols: ["define$ebnf$1", /[^\n\t\v]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "define",
      symbols: [
        "define$string$1",
        "__",
        "identifier",
        "define$subexpression$1",
        { literal: "\n" },
        "__",
        "define$string$2",
        "__",
        "define$ebnf$1",
      ],
      postprocess: (data) => ({
        type: "define",
        name: data[2],
        params: data[3].slice(1 + 1, -1)[1],
        return: data[8].flat(Infinity).join(""),
      }),
    },
    { name: "comment$ebnf$1", symbols: [] },
    {
      name: "comment$ebnf$1",
      symbols: ["comment$ebnf$1", /[^\n]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "comment",
      symbols: [{ literal: "#" }, "comment$ebnf$1"],
      postprocess: (data) => ({
        type: "comment",
        raw: data.flat(Infinity).join(""),
      }),
    },
    { name: "empty$ebnf$1", symbols: [] },
    {
      name: "empty$ebnf$1",
      symbols: ["empty$ebnf$1", /[ \t\v]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    { name: "empty", symbols: ["empty$ebnf$1"], postprocess: (data) => null },
    { name: "newline", symbols: [/[\n]/], postprocess: (data) => null },
  ],
  ParserStart: "main",
};

export default grammar;
