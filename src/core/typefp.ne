@preprocessor typescript
@builtin "whitespace.ne"

@{% import params from "./params"; %}

main -> statements statement {% ([statements, statement]) => [...statements.flat(Infinity), statement] %}

statements -> (statement newline):* {% (data) => data %}    

statement -> (define | comment | empty) {% (data) => ({ type: "statement", data: data[0][0] }) %}    

identifier -> [a-zA-Z0-9_]:+ {% (data) => ({ type: "identifier", name: data.flat(Infinity).join("") }) %}

LIST[PATTERN] -> .:* {% (data) => ({ type: "list", data: params(data) }) %}

extended_identifier -> identifier empty extends:? {% (data) => ({ type: "extended_identifier", name: data[0].name, data: data[2] }) %}

extends -> ":" empty [^ \n\t\v<>]:+ {% (data) => ({ type: "extends", data: data[2].flat(Infinity).join("").trim() }) %}

define ->
        ("exdef" | "def") __ identifier (empty | _ "(" _ LIST[extended_identifier] _ ")") "\n"
        (__ return | __ if)
        {% (data) => ({ type: "define", exported: data[0][0].startsWith("ex"), name: data[2], params: data[3].slice(1 + 1, -1)[1], body: data[5].filter(($: any) => $ !== null) }) %}

if ->
        "if" _ "(" _ is _ ")" "\n"
        (__ return | __ if)
        _ else:?
        {% (data) => ({ type: "if", condition: data[4], body: data[8], else: data[10] }) %}

is -> identifier __ "is" __ value {% (data) => ({ type: "is", identifier: data[0], value: data[4] }) %}

else ->
        "else" "\n"
        (__ return | __ if)
        {% (data) => ({ type: "else", data: data[2][1] }) %}

return -> __ "return" __ value "\n" empty {% (data) => ({ type: "return", data: data[3] }) %}

value -> [^\n\t\v]:+ ",":? {% (data) => ({ type: "value", data: data.flat(Infinity).join("").trim() }) %}

comment -> "#" [^\n]:* {% (data) => ({ type: "comment", raw: data.flat(Infinity).join("") }) %}    

empty -> [ \t\v]:* {% (data) => null %}

newline -> [\n] {% (data) => null %}