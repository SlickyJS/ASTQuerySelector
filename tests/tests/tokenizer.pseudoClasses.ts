import {Tokenizer, TokenType} from '../../src';
import {expect} from 'chai';


describe('#Tokenizer.pseudoClasses', () => {

	describe('tokenize()', () => {

		it('should tokenize :empty', () => {
			let tokens = Tokenizer.createFromString(':empty').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'empty',
				},
			]);
		});

		it('should tokenize :first-child', () => {
			let tokens = Tokenizer.createFromString(':first-child').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'first-child',
				},
			]);
		});

		it('should tokenize :first-of-type', () => {
			let tokens = Tokenizer.createFromString(':first-of-type').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'first-of-type',
				},
			]);
		});

		it('should tokenize :last-child', () => {
			let tokens = Tokenizer.createFromString(':last-child').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'last-child',
				},
			]);
		});

		it('should tokenize :last-of-type', () => {
			let tokens = Tokenizer.createFromString(':last-of-type').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'last-of-type',
				},
			]);
		});

		it('should tokenize :not pseudo class', () => {
			let tokens = Tokenizer.createFromString(':not(div)').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'not',
				},
				{
					type: TokenType.Punctuation,
					value: '(',
				},
				{
					type: TokenType.Name,
					value: 'div',
				},
				{
					type: TokenType.Punctuation,
					value: ')',
				},
			]);
		});

	});

});
