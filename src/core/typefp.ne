@preprocessor typescript
@builtin "whitespace.ne"

main -> statements statement {% ([statements, statement]) => [...statements.flat(Infinity), statement] %}

ending_statement -> statement {% (data) => data %}

statements -> (statement newline):* {% (data) => data %}    

statement -> (define | comment | empty) {% (data) => ({ type: "statement", data: data[0][0] }) %}    

identifier -> [a-zA-Z0-9_]:+ {% (data) => ({ type: "identifier", name: data.flat(Infinity).join("") }) %}

LIST[PATTERN] -> $PATTERN:? {% (data) => ({ type: "list", data: data[0] }) %}

extended_identifier -> identifier empty extends:? {% (data) => ({ type: "extended_identifier", name: data[0].name, data: data[2] }) %}

extends -> ":" empty [^ \n\t\v<>]:+ {% (data) => ({ type: "extends", data: data[2].flat(Infinity).join("").trim() }) %}

define ->
        "define" __ identifier (empty | __ "<" _ LIST[extended_identifier] _ ">") "\n"
        __ "return" __ [^\n\t\v]:+
        {% (data) => ({ type: "define", name: data[2], params: data[3].slice(1 + 1, -1)[1], return: data[8].flat(Infinity).join("") }) %}

comment -> "#" [^\n]:* {% (data) => ({ type: "comment", raw: data.flat(Infinity).join("") }) %}    

empty -> [ \t\v]:* {% (data) => null %}

newline -> [\n] {% (data) => null %}