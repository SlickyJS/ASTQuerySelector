import {exists} from '@slicky/utils';
import {InputStream} from '@slicky/tokenizer';
import {Tokenizer, TokenType} from './tokenizer';
import * as _ from './ast';


const PSEUDO_ELEMENTS: Array<string> = [
	'before', 'after',
];


export class Parser
{


	private tokenizer: Tokenizer;


	constructor(tokenizer: Tokenizer)
	{
		this.tokenizer = tokenizer;
	}


	public static createFromString(input: string): Parser
	{
		return new Parser(new Tokenizer(new InputStream(input)));
	}


	public parse(): _.ASTQuery
	{
		let selectors: Array<_.ASTSelector> = [];

		while (!this.tokenizer.eof()) {
			selectors.push(this.parseSelector());

			if (this.tokenizer.isCurrentToken(TokenType.Punctuation, ',')) {
				this.tokenizer.matchToken(TokenType.Punctuation, ',');

				if (this.tokenizer.isCurrentToken(TokenType.Whitespace)) {
					this.tokenizer.matchToken(TokenType.Whitespace);
				}
			}
		}

		return new _.ASTQuery(selectors);
	}


	private parseSelector(): _.ASTSelector
	{
		return new _.ASTSelector(
			this.parseSelectorPart()
		);
	}


	private parseSelectorPart(): _.ASTSelectorPart
	{
		let whitespace = false;
		let rules = this.parseRulesSet();
		let combinator: _.ASTCombinator;

		if (this.tokenizer.isCurrentToken(TokenType.Whitespace)) {
			this.tokenizer.matchToken(TokenType.Whitespace);

			whitespace = true;
		}

		if (this.tokenizer.isCurrentToken(TokenType.Operator, '+', '~', '>')) {
			if (this.tokenizer.isCurrentToken(TokenType.Operator, '+')) {
				combinator = this.parseAdjacentSibling(rules);

			} else if (this.tokenizer.isCurrentToken(TokenType.Operator, '~')) {
				combinator = this.parseGeneralSibling(rules);

			} else if (this.tokenizer.isCurrentToken(TokenType.Operator, '>')) {
				combinator = this.parseChild(rules);
			}

		} else if (whitespace && !this.tokenizer.isCurrentToken(TokenType.Punctuation, ',')) {
			combinator = this.parseDescendant(rules);
		}

		return exists(combinator) ? combinator : rules;
	}


	private parseRulesSet(): _.ASTRulesSet
	{
		let rules = [
			this.parseRule(),
		];

		while (!this.tokenizer.eof()) {
			let rule = this.parseRule();

			if (!exists(rule)) {
				break;
			}

			rules.push(rule);
		}

		return new _.ASTRulesSet(rules);
	}


	private parseRule(): _.ASTRule
	{
		if (this.tokenizer.isCurrentToken(TokenType.Punctuation, '.')) {
			return this.parseClass();
		}

		if (this.tokenizer.isCurrentToken(TokenType.Punctuation, '#')) {
			return this.parseId();
		}

		if (this.tokenizer.isCurrentToken(TokenType.Punctuation, ':')) {
			return this.parsePseudoClassOrPseudoElement();
		}

		if (this.tokenizer.isCurrentToken(TokenType.Punctuation, '[')) {
			return this.parseAttribute();
		}

		if (this.tokenizer.isCurrentToken(TokenType.Name)) {
			return this.parseElement();
		}
	}


	private parseClass(): _.ASTClass
	{
		this.tokenizer.matchToken(TokenType.Punctuation, '.');
		return new _.ASTClass(this.tokenizer.matchToken(TokenType.Name).value);
	}


	private parseId(): _.ASTId
	{
		this.tokenizer.matchToken(TokenType.Punctuation, '#');
		return new _.ASTId(this.tokenizer.matchToken(TokenType.Name).value);
	}


	private parsePseudoClassOrPseudoElement(): _.ASTPseudoClass|_.ASTPseudoElement
	{
		this.tokenizer.matchToken(TokenType.Punctuation, ':');

		const isColon = this.tokenizer.isCurrentToken(TokenType.Punctuation, ':');

		if (isColon || this.tokenizer.isCurrentToken(TokenType.Name, ...PSEUDO_ELEMENTS)) {
			if (isColon) {
				this.tokenizer.matchToken(TokenType.Punctuation, ':');
			}

			return new _.ASTPseudoElement(this.tokenizer.matchToken(TokenType.Name).value);
		}

		const pseudoClass = new _.ASTPseudoClass(this.tokenizer.matchToken(TokenType.Name).value);

		if (this.tokenizer.isCurrentToken(TokenType.Punctuation, '(')) {
			this.tokenizer.matchToken(TokenType.Punctuation, '(');
			pseudoClass.fn = this.parseSelector();
			this.tokenizer.matchToken(TokenType.Punctuation, ')');
		}

		return pseudoClass;
	}


	private parseElement(): _.ASTElement
	{
		return new _.ASTElement(this.tokenizer.matchToken(TokenType.Name).value);
	}


	private parseAttribute(): _.ASTAttribute
	{
		this.tokenizer.matchToken(TokenType.Punctuation, '[');

		let name = this.tokenizer.matchToken(TokenType.Name).value;
		let operator: string;
		let value: string;
		let caseSensitive = true;

		if (this.tokenizer.isCurrentToken(TokenType.Punctuation, ':')) {
			name += this.tokenizer.matchToken(TokenType.Punctuation, ':').value;
			name += this.tokenizer.matchToken(TokenType.Name).value;
		}

		if (this.tokenizer.isCurrentToken(TokenType.Operator)) {
			operator = this.tokenizer.matchToken(TokenType.Operator).value;
			value = this.tokenizer.matchToken(TokenType.String).value;
		}

		if (this.tokenizer.isCurrentToken(TokenType.Whitespace)) {
			this.tokenizer.matchToken(TokenType.Whitespace);
			this.tokenizer.matchToken(TokenType.Name, 'i', 'I').value;

			caseSensitive = false;
		}

		this.tokenizer.matchToken(TokenType.Punctuation, ']');

		return new _.ASTAttribute(name, operator, value, caseSensitive);
	}


	private parseDescendant(left: _.ASTRulesSet): _.ASTDescendant
	{
		return new _.ASTDescendant(
			left,
			this.parseSelectorPart()
		);
	}


	private parseAdjacentSibling(left: _.ASTRulesSet): _.ASTAdjacentSibling
	{
		this.tokenizer.matchToken(TokenType.Operator, '+');

		if (this.tokenizer.isCurrentToken(TokenType.Whitespace)) {
			this.tokenizer.matchToken(TokenType.Whitespace);
		}

		return new _.ASTAdjacentSibling(
			left,
			this.parseSelectorPart()
		);
	}


	private parseGeneralSibling(left: _.ASTRulesSet): _.ASTGeneralSibling
	{
		this.tokenizer.matchToken(TokenType.Operator, '~');

		if (this.tokenizer.isCurrentToken(TokenType.Whitespace)) {
			this.tokenizer.matchToken(TokenType.Whitespace);
		}

		return new _.ASTGeneralSibling(
			left,
			this.parseSelectorPart()
		);
	}


	private parseChild(left: _.ASTRulesSet): _.ASTChild
	{
		this.tokenizer.matchToken(TokenType.Operator, '>');

		if (this.tokenizer.isCurrentToken(TokenType.Whitespace)) {
			this.tokenizer.matchToken(TokenType.Whitespace);
		}

		return new _.ASTChild(
			left,
			this.parseSelectorPart()
		);
	}

}
