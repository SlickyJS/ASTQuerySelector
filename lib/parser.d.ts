import { Tokenizer } from './tokenizer';
import * as _ from './ast';
export declare class Parser {
    private tokenizer;
    constructor(tokenizer: Tokenizer);
    static createFromString(input: string): Parser;
    parse(): _.ASTQuery;
    private parseSelector();
    private parseSelectorPart();
    private parseRulesSet();
    private parseRule();
    private parseClass();
    private parseId();
    private parsePseudoClass();
    private parseElement();
    private parseAttribute();
    private parseDescendant(left);
    private parseAdjacentSibling(left);
    private parseGeneralSibling(left);
    private parseChild(left);
}
