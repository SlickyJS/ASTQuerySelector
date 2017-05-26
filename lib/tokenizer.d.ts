import { AbstractTokenizer, InputStream } from '@slicky/tokenizer';
export declare enum TokenType {
    Name = 0,
    String = 1,
    Punctuation = 2,
    Operator = 3,
    Whitespace = 4,
}
export interface Token {
    type: TokenType;
    value: string;
}
export declare class Tokenizer extends AbstractTokenizer<Token> {
    static createFromString(input: string): Tokenizer;
    isCurrentToken(type: TokenType, ...value: Array<string>): boolean;
    matchToken(type: TokenType, ...value: Array<string>): Token;
    protected doReadInput(input: InputStream): Token;
}
