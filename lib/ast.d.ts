export declare abstract class ASTNode {
    abstract render(): string;
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
    render(): string;
}
export declare class ASTSelector extends ASTNode {
    parts: ASTSelectorPart;
    constructor(parts: ASTSelectorPart);
    render(): string;
}
export declare class ASTQuery extends ASTNode {
    selectors: Array<ASTSelector>;
    constructor(selectors: Array<ASTSelector>);
    render(): string;
}
export declare class ASTElement extends ASTRule {
    name: string;
    constructor(name: string);
    render(): string;
}
export declare class ASTClass extends ASTRule {
    name: string;
    constructor(name: string);
    render(): string;
}
export declare class ASTId extends ASTRule {
    name: string;
    constructor(name: string);
    render(): string;
}
export declare class ASTPseudoClass extends ASTRule {
    name: string;
    fn: ASTSelector;
    constructor(name: string, fn?: ASTSelector);
    render(): string;
}
export declare class ASTPseudoElement extends ASTRule {
    name: string;
    constructor(name: string);
    render(): string;
}
export declare class ASTAttribute extends ASTRule {
    caseSensitive: boolean;
    name: string;
    operator: string;
    value: string;
    constructor(name: string, operator?: string, value?: string, caseSensitive?: boolean);
    render(): string;
}
export declare class ASTDescendant extends ASTCombinator {
    render(): string;
}
export declare class ASTChild extends ASTCombinator {
    render(): string;
}
export declare class ASTAdjacentSibling extends ASTCombinator {
    render(): string;
}
export declare class ASTGeneralSibling extends ASTCombinator {
    render(): string;
}
