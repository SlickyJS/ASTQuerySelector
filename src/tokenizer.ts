import {AbstractTokenizer, InputStream} from '@slicky/tokenizer';


export enum TokenType
{
	Name,
	String,
	Punctuation,
	Operator,
	Whitespace,
}


export declare interface Token
{
	type: TokenType,
	value: string,
}


const PUNCTUATION = [
	'.', ',', ':', '#', '[', ']'
];

const OPERATORS = [
	'~=', '|=', '^=', '$=', '*=',
	'=', '~', '|', '^', '$', '*', '+', '>',
];


export class Tokenizer extends AbstractTokenizer<Token>
{


	public static createFromString(input: string): Tokenizer
	{
		return new Tokenizer(new InputStream(input));
	}


	public isCurrentToken(type: TokenType, ...value: Array<string>): boolean
	{
		if (!this.current() || this.current().type !== type) {
			return false;
		}

		if (!value.length) {
			return true;
		}

		return value.indexOf(this.current().value) >= 0;
	}


	public matchToken(type: TokenType, ...value: Array<string>): Token
	{
		if (!this.isCurrentToken(type, ...value)) {
			this.expected(TokenType[type], value.length ? value.join('|') : undefined);
		}

		return this.next();
	}


	protected doReadInput(input: InputStream): Token
	{
		let current = input.current();

		if (isStringStart(current)) {
			return {
				type: TokenType.String,
				value: readString(input),
			};
		}

		if (isWhitespace(current)) {
			return {
				type: TokenType.Whitespace,
				value: readWhitespace(input),
			};
		}

		if (isNameStart(current)) {
			return {
				type: TokenType.Name,
				value: readName(input),
			};
		}

		if (input.isSequenceFollowing(...PUNCTUATION)) {
			return {
				type: TokenType.Punctuation,
				value: input.matchSequence(...PUNCTUATION),
			};
		}

		if (input.isSequenceFollowing(...OPERATORS)) {
			return {
				type: TokenType.Operator,
				value: input.matchSequence(...OPERATORS),
			};
		}
	}

}


function isStringStart(ch: string): boolean
{
	return ch === '"' || ch === "'";
}


function isWhitespace(ch: string): boolean
{
	return ch === ' ';
}


function isNameStart(ch: string): boolean
{
	return /[a-z]/.test(ch);
}


function isName(ch: string): boolean
{
	return isNameStart(ch) || ch === '-';
}


function readString(input: InputStream): string
{
	return readEscaped(input, input.current());
}


function readWhitespace(input: InputStream): string
{
	return input.readWhile(isWhitespace);
}


function readName(input: InputStream): string
{
	return input.readWhile(isName);
}


function readEscaped(input: InputStream, end: string): string
{
	let escaped = false;
	let str = '';

	input.next();

	while (!input.eof()) {
		let ch = input.next();

		if (escaped) {
			str += ch;
			escaped = false;

		} else if (ch === '\\') {
			escaped = true;

		} else if (ch === end) {
			break;

		} else {
			str += ch;
		}
	}

	return str;
}
