import {Tokenizer, TokenType} from '../../src';
import {expect} from 'chai';


describe('#Tokenizer.combinators', () => {

	describe('tokenize()', () => {

		it('should tokenize adjacent sibling selector', () => {
			let tokens = Tokenizer.createFromString('li + li').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Name,
					value: 'li',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Operator,
					value: '+',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'li',
				},
			]);
		});

		it('should tokenize general sibling selector', () => {
			let tokens = Tokenizer.createFromString('p ~ span').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Name,
					value: 'p',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Operator,
					value: '~',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'span',
				},
			]);
		});

		it('should tokenize child selector', () => {
			let tokens = Tokenizer.createFromString('div > span').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Name,
					value: 'div',
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
					value: 'span',
				},
			]);
		});

		it('should tokenize descendant selector with whitespace', () => {
			let tokens = Tokenizer.createFromString('div span').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Name,
					value: 'div',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'span',
				},
			]);
		});

	});

});
