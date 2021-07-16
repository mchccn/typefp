export interface Statement {
    type: "statement";
    data: ParseData | ParseData[];
}

export interface Define {
    type: "define";
    name: Identifier;
    params: List<ExtendedIdentifier> | undefined;
    return: string;
    data: undefined;
}

export interface List<T> {
    type: "list";
    data: T[];
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
