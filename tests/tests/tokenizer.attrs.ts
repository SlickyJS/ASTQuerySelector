import {Tokenizer, TokenType} from '../../src';
import {expect} from 'chai';


describe('#Tokenizer.attrs', () => {

	describe('tokenize()', () => {

		it('should tokenize attribute', () => {
			let tokens = Tokenizer.createFromString('[title]').tokenize();

			expect(tokens).to.be.eql([
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
			]);
		});

		it('should tokenize attribute with exact value', () => {
			let tokens = Tokenizer.createFromString('[title="hello"]').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'title',
				},
				{
					type: TokenType.Operator,
					value: '=',
				},
				{
					type: TokenType.String,
					value: 'hello',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
			]);
		});

		it('should tokenize attribute with list', () => {
			let tokens = Tokenizer.createFromString('[title~="hello"]').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'title',
				},
				{
					type: TokenType.Operator,
					value: '~=',
				},
				{
					type: TokenType.String,
					value: 'hello',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
			]);
		});

		it('should tokenize attribute matching language code', () => {
			let tokens = Tokenizer.createFromString('[lang|="cs"]').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'lang',
				},
				{
					type: TokenType.Operator,
					value: '|=',
				},
				{
					type: TokenType.String,
					value: 'cs',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
			]);
		});

		it('should tokenize attribute matching beginning', () => {
			let tokens = Tokenizer.createFromString('[href^="#"]').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'href',
				},
				{
					type: TokenType.Operator,
					value: '^=',
				},
				{
					type: TokenType.String,
					value: '#',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
			]);
		});

		it('should tokenize attribute matching end', () => {
			let tokens = Tokenizer.createFromString('[href$=".cn"]').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'href',
				},
				{
					type: TokenType.Operator,
					value: '$=',
				},
				{
					type: TokenType.String,
					value: '.cn',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
			]);
		});

		it('should tokenize attribute matching substring', () => {
			let tokens = Tokenizer.createFromString('[href*="example"]').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'href',
				},
				{
					type: TokenType.Operator,
					value: '*=',
				},
				{
					type: TokenType.String,
					value: 'example',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
			]);
		});

		it('should read case insensitive attribute', () => {
			let tokens = Tokenizer.createFromString('[type="email" i]').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '[',
				},
				{
					type: TokenType.Name,
					value: 'type',
				},
				{
					type: TokenType.Operator,
					value: '=',
				},
				{
					type: TokenType.String,
					value: 'email',
				},
				{
					type: TokenType.Whitespace,
					value: ' ',
				},
				{
					type: TokenType.Name,
					value: 'i',
				},
				{
					type: TokenType.Punctuation,
					value: ']',
				},
			]);
		});

	});

});
