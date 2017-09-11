export declare abstract class ASTNode {
}
export declare abstract class ASTRule extends ASTNode {
}
export declare abstract class ASTSelectorPart extends ASTNode {
}
export declare abstract class ASTCombinator extends ASTSelectorPart {
    left: ASTRulesSet;
    right: ASTSelectorPart;
    constructor(left: ASTRulesSet, right: ASTSelectorPart);
}
export declare class ASTRulesSet extends ASTSelectorPart {
    parts: Array<ASTRule>;
    constructor(parts: Array<ASTRule>);
}
export declare class ASTSelector extends ASTNode {
    parts: ASTSelectorPart;
    constructor(parts: ASTSelectorPart);
}
export declare class ASTQuery extends ASTNode {
    selectors: Array<ASTSelector>;
    constructor(selectors: Array<ASTSelector>);
}
export declare class ASTElement extends ASTRule {
    name: string;
    constructor(name: string);
}
export declare class ASTClass extends ASTRule {
    name: string;
    constructor(name: string);
}
export declare class ASTId extends ASTRule {
    name: string;
    constructor(name: string);
}
export declare class ASTPseudoClass extends ASTRule {
    name: string;
    constructor(name: string);
}
export declare class ASTPseudoElement extends ASTRule {
    name: string;
    constructor(name: string);
}
export declare class ASTAttribute extends ASTRule {
    caseSensitive: boolean;
    name: string;
    operator: string;
    value: string;
    constructor(name: string, operator?: string, value?: string, caseSensitive?: boolean);
}
export declare class ASTDescendant extends ASTCombinator {
}
export declare class ASTChild extends ASTCombinator {
}
export declare class ASTAdjacentSibling extends ASTCombinator {
}
export declare class ASTGeneralSibling extends ASTCombinator {
}
