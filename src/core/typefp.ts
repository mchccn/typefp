// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
  return d[0];
}
import params from "./params";
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
    { name: "dqstring$ebnf$1", symbols: [] },
    {
      name: "dqstring$ebnf$1",
      symbols: ["dqstring$ebnf$1", "dstrchar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "dqstring",
      symbols: [{ literal: '"' }, "dqstring$ebnf$1", { literal: '"' }],
      postprocess: function (d) {
        return d[1].join("");
      },
    },
    { name: "sqstring$ebnf$1", symbols: [] },
    {
      name: "sqstring$ebnf$1",
      symbols: ["sqstring$ebnf$1", "sstrchar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "sqstring",
      symbols: [{ literal: "'" }, "sqstring$ebnf$1", { literal: "'" }],
      postprocess: function (d) {
        return d[1].join("");
      },
    },
    { name: "btstring$ebnf$1", symbols: [] },
    {
      name: "btstring$ebnf$1",
      symbols: ["btstring$ebnf$1", /[^`]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "btstring",
      symbols: [{ literal: "`" }, "btstring$ebnf$1", { literal: "`" }],
      postprocess: function (d) {
        return d[1].join("");
      },
    },
    { name: "dstrchar", symbols: [/[^\\"\n]/], postprocess: id },
    {
      name: "dstrchar",
      symbols: [{ literal: "\\" }, "strescape"],
      postprocess: function (d) {
        return JSON.parse('"' + d.join("") + '"');
      },
    },
    { name: "sstrchar", symbols: [/[^\\'\n]/], postprocess: id },
    {
      name: "sstrchar",
      symbols: [{ literal: "\\" }, "strescape"],
      postprocess: function (d) {
        return JSON.parse('"' + d.join("") + '"');
      },
    },
    {
      name: "sstrchar$string$1",
      symbols: [{ literal: "\\" }, { literal: "'" }],
      postprocess: (d) => d.join(""),
    },
    {
      name: "sstrchar",
      symbols: ["sstrchar$string$1"],
      postprocess: function (d) {
        return "'";
      },
    },
    { name: "strescape", symbols: [/["\\/bfnrt]/], postprocess: id },
    {
      name: "strescape",
      symbols: [
        { literal: "u" },
        /[a-fA-F0-9]/,
        /[a-fA-F0-9]/,
        /[a-fA-F0-9]/,
        /[a-fA-F0-9]/,
      ],
      postprocess: function (d) {
        return d.join("");
      },
    },
    { name: "unsigned_int$ebnf$1", symbols: [/[0-9]/] },
    {
      name: "unsigned_int$ebnf$1",
      symbols: ["unsigned_int$ebnf$1", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "unsigned_int",
      symbols: ["unsigned_int$ebnf$1"],
      postprocess: function (d) {
        return parseInt(d[0].join(""));
      },
    },
    { name: "int$ebnf$1$subexpression$1", symbols: [{ literal: "-" }] },
    { name: "int$ebnf$1$subexpression$1", symbols: [{ literal: "+" }] },
    {
      name: "int$ebnf$1",
      symbols: ["int$ebnf$1$subexpression$1"],
      postprocess: id,
    },
    { name: "int$ebnf$1", symbols: [], postprocess: () => null },
    { name: "int$ebnf$2", symbols: [/[0-9]/] },
    {
      name: "int$ebnf$2",
      symbols: ["int$ebnf$2", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "int",
      symbols: ["int$ebnf$1", "int$ebnf$2"],
      postprocess: function (d) {
        if (d[0]) {
          return parseInt(d[0][0] + d[1].join(""));
        } else {
          return parseInt(d[1].join(""));
        }
      },
    },
    { name: "unsigned_decimal$ebnf$1", symbols: [/[0-9]/] },
    {
      name: "unsigned_decimal$ebnf$1",
      symbols: ["unsigned_decimal$ebnf$1", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1",
      symbols: [/[0-9]/],
    },
    {
      name: "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1",
      symbols: ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "unsigned_decimal$ebnf$2$subexpression$1",
      symbols: [
        { literal: "." },
        "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1",
      ],
    },
    {
      name: "unsigned_decimal$ebnf$2",
      symbols: ["unsigned_decimal$ebnf$2$subexpression$1"],
      postprocess: id,
    },
    { name: "unsigned_decimal$ebnf$2", symbols: [], postprocess: () => null },
    {
      name: "unsigned_decimal",
      symbols: ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"],
      postprocess: function (d) {
        return parseFloat(d[0].join("") + (d[1] ? "." + d[1][1].join("") : ""));
      },
    },
    { name: "decimal$ebnf$1", symbols: [{ literal: "-" }], postprocess: id },
    { name: "decimal$ebnf$1", symbols: [], postprocess: () => null },
    { name: "decimal$ebnf$2", symbols: [/[0-9]/] },
    {
      name: "decimal$ebnf$2",
      symbols: ["decimal$ebnf$2", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    { name: "decimal$ebnf$3$subexpression$1$ebnf$1", symbols: [/[0-9]/] },
    {
      name: "decimal$ebnf$3$subexpression$1$ebnf$1",
      symbols: ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "decimal$ebnf$3$subexpression$1",
      symbols: [{ literal: "." }, "decimal$ebnf$3$subexpression$1$ebnf$1"],
    },
    {
      name: "decimal$ebnf$3",
      symbols: ["decimal$ebnf$3$subexpression$1"],
      postprocess: id,
    },
    { name: "decimal$ebnf$3", symbols: [], postprocess: () => null },
    {
      name: "decimal",
      symbols: ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"],
      postprocess: function (d) {
        return parseFloat(
          (d[0] || "") + d[1].join("") + (d[2] ? "." + d[2][1].join("") : "")
        );
      },
    },
    {
      name: "percentage",
      symbols: ["decimal", { literal: "%" }],
      postprocess: function (d) {
        return d[0] / 100;
      },
    },
    { name: "jsonfloat$ebnf$1", symbols: [{ literal: "-" }], postprocess: id },
    { name: "jsonfloat$ebnf$1", symbols: [], postprocess: () => null },
    { name: "jsonfloat$ebnf$2", symbols: [/[0-9]/] },
    {
      name: "jsonfloat$ebnf$2",
      symbols: ["jsonfloat$ebnf$2", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    { name: "jsonfloat$ebnf$3$subexpression$1$ebnf$1", symbols: [/[0-9]/] },
    {
      name: "jsonfloat$ebnf$3$subexpression$1$ebnf$1",
      symbols: ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "jsonfloat$ebnf$3$subexpression$1",
      symbols: [{ literal: "." }, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"],
    },
    {
      name: "jsonfloat$ebnf$3",
      symbols: ["jsonfloat$ebnf$3$subexpression$1"],
      postprocess: id,
    },
    { name: "jsonfloat$ebnf$3", symbols: [], postprocess: () => null },
    {
      name: "jsonfloat$ebnf$4$subexpression$1$ebnf$1",
      symbols: [/[+-]/],
      postprocess: id,
    },
    {
      name: "jsonfloat$ebnf$4$subexpression$1$ebnf$1",
      symbols: [],
      postprocess: () => null,
    },
    { name: "jsonfloat$ebnf$4$subexpression$1$ebnf$2", symbols: [/[0-9]/] },
    {
      name: "jsonfloat$ebnf$4$subexpression$1$ebnf$2",
      symbols: ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "jsonfloat$ebnf$4$subexpression$1",
      symbols: [
        /[eE]/,
        "jsonfloat$ebnf$4$subexpression$1$ebnf$1",
        "jsonfloat$ebnf$4$subexpression$1$ebnf$2",
      ],
    },
    {
      name: "jsonfloat$ebnf$4",
      symbols: ["jsonfloat$ebnf$4$subexpression$1"],
      postprocess: id,
    },
    { name: "jsonfloat$ebnf$4", symbols: [], postprocess: () => null },
    {
      name: "jsonfloat",
      symbols: [
        "jsonfloat$ebnf$1",
        "jsonfloat$ebnf$2",
        "jsonfloat$ebnf$3",
        "jsonfloat$ebnf$4",
      ],
      postprocess: function (d) {
        return parseFloat(
          (d[0] || "") +
            d[1].join("") +
            (d[2] ? "." + d[2][1].join("") : "") +
            (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
        );
      },
    },
    {
      name: "main",
      symbols: ["statements", "statement"],
      postprocess: ([statements, statement]) => [
        ...statements.flat(Infinity),
        statement,
      ],
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
      name: "define$subexpression$1$string$1",
      symbols: [
        { literal: "e" },
        { literal: "x" },
        { literal: "d" },
        { literal: "e" },
        { literal: "f" },
      ],
      postprocess: (d) => d.join(""),
    },
    {
      name: "define$subexpression$1",
      symbols: ["define$subexpression$1$string$1"],
    },
    {
      name: "define$subexpression$1$string$2",
      symbols: [{ literal: "d" }, { literal: "e" }, { literal: "f" }],
      postprocess: (d) => d.join(""),
    },
    {
      name: "define$subexpression$1",
      symbols: ["define$subexpression$1$string$2"],
    },
    { name: "define$subexpression$2", symbols: ["empty"] },
    {
      name: "define$subexpression$2$macrocall$2",
      symbols: ["extended_identifier"],
    },
    { name: "define$subexpression$2$macrocall$1$ebnf$1", symbols: [] },
    {
      name: "define$subexpression$2$macrocall$1$ebnf$1",
      symbols: ["define$subexpression$2$macrocall$1$ebnf$1", /./],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "define$subexpression$2$macrocall$1",
      symbols: ["define$subexpression$2$macrocall$1$ebnf$1"],
      postprocess: (data) => ({ type: "list", data: params(data) }),
    },
    {
      name: "define$subexpression$2",
      symbols: [
        "_",
        { literal: "(" },
        "_",
        "define$subexpression$2$macrocall$1",
        "_",
        { literal: ")" },
      ],
    },
    { name: "define$subexpression$3", symbols: ["__", "return"] },
    { name: "define$subexpression$3", symbols: ["__", "if"] },
    {
      name: "define",
      symbols: [
        "define$subexpression$1",
        "__",
        "identifier",
        "define$subexpression$2",
        { literal: "\n" },
        "define$subexpression$3",
      ],
      postprocess: (data) => ({
        type: "define",
        exported: data[0][0].startsWith("ex"),
        name: data[2],
        params: data[3].slice(1 + 1, -1)[1],
        body: data[5].filter(($: any) => $ !== null),
      }),
    },
    {
      name: "if$string$1",
      symbols: [{ literal: "i" }, { literal: "f" }],
      postprocess: (d) => d.join(""),
    },
    { name: "if$subexpression$1", symbols: ["__", "return"] },
    { name: "if$subexpression$1", symbols: ["__", "if"] },
    { name: "if$ebnf$1", symbols: ["else"], postprocess: id },
    { name: "if$ebnf$1", symbols: [], postprocess: () => null },
    {
      name: "if",
      symbols: [
        "if$string$1",
        "_",
        { literal: "(" },
        "_",
        "is",
        "_",
        { literal: ")" },
        { literal: "\n" },
        "if$subexpression$1",
        "_",
        "if$ebnf$1",
      ],
      postprocess: (data) => ({
        type: "if",
        condition: data[4],
        body: data[8],
        else: data[10],
      }),
    },
    {
      name: "is$string$1",
      symbols: [{ literal: "i" }, { literal: "s" }],
      postprocess: (d) => d.join(""),
    },
    {
      name: "is",
      symbols: ["identifier", "__", "is$string$1", "__", "value"],
      postprocess: (data) => ({
        type: "is",
        identifier: data[0],
        value: data[4],
      }),
    },
    {
      name: "else$string$1",
      symbols: [
        { literal: "e" },
        { literal: "l" },
        { literal: "s" },
        { literal: "e" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "else$subexpression$1", symbols: ["__", "return"] },
    { name: "else$subexpression$1", symbols: ["__", "if"] },
    {
      name: "else",
      symbols: ["else$string$1", { literal: "\n" }, "else$subexpression$1"],
      postprocess: (data) => ({ type: "else", data: data[2][1] }),
    },
    {
      name: "return$string$1",
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
    {
      name: "return",
      symbols: [
        "__",
        "return$string$1",
        "__",
        "value",
        { literal: "\n" },
        "empty",
      ],
      postprocess: (data) => ({ type: "return", data: data[3] }),
    },
    { name: "value$ebnf$1", symbols: [/[^\n\t\v]/] },
    {
      name: "value$ebnf$1",
      symbols: ["value$ebnf$1", /[^\n\t\v]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    { name: "value$ebnf$2", symbols: [{ literal: "," }], postprocess: id },
    { name: "value$ebnf$2", symbols: [], postprocess: () => null },
    {
      name: "value",
      symbols: ["value$ebnf$1", "value$ebnf$2"],
      postprocess: (data) => ({
        type: "value",
        data: data.flat(Infinity).join("").trim(),
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
