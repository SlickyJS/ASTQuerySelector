import {Tokenizer, TokenType} from '../../src';
import {expect} from 'chai';


describe('#Tokenizer', () => {

	describe('tokenize()', () => {

		it('should squash whitespaces', () => {
			let tokens = Tokenizer.createFromString('div    span').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Name,
					value: 'div',
				},
				{
					type: TokenType.Whitespace,
					value: '    ',
				},
				{
					type: TokenType.Name,
					value: 'span',
				},
			]);
		});

		it('should tokenize query', () => {
			let tokens = Tokenizer.createFromString('div:first-child, span[title], table td > a.btn.btn-success').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Name,
					value: 'div',
				},
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'first-child',
				},
				{
					type: TokenType.Punctuation,
					value: ',',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'span',
				},
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'title',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
				{
					type: TokenType.Punctuation,
					value: ',',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'table',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'td',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Operator,
					value: '>',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'a',
				},
				{
					type: TokenType.Punctuation,
					value: '.',
				},
				{
					type: TokenType.Name,
					value: 'btn',
				},
				{
					type: TokenType.Punctuation,
					value: '.',
				},
				{
					type: TokenType.Name,
					value: 'btn-success',
				},
			]);
		});

	});

});
