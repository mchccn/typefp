export interface Statement {
    type: "statement";
    data: ParseData | ParseData[];
}

export interface Define {
    type: "define";
    name: Identifier;
    params: List<ExtendedIdentifier> | undefined;
    body: Body;
    data: undefined;
    exported: boolean;
}

export interface List<T> {
    type: "list";
    data: T[];
}

export type Body = [Return | If];

export interface If {
    type: "if";
    condition: Is;
    body: Body;
    else: Else | undefined;
}

export interface Else {
    type: "else";
    data: Body[0];
}

export interface Is {
    type: "is";
    identifier: Identifier;
    value: Value;
}
export interface Return {
    type: "return";
    data: Value;
}

export interface Value {
    type: "value";
    data: string;
}

export interface Identifier {
    type: "identifier";
    name: string;
}

export interface ExtendedIdentifier {
    type: "extended_identifier";
    name: string;
    data: Extends | undefined;
}

export interface Extends {
    type: "extends";
    data: string;
}

export interface Comment {
    type: "comment";
    raw: string;
    data: undefined;
}

export type ParseData = Statement | Define | Comment;
