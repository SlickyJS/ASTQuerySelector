import {Tokenizer, TokenType} from '../../src';
import {expect} from 'chai';


describe('#Tokenizer.pseudoElements', () => {

	describe('tokenize()', () => {

		it('should tokenize :before', () => {
			let tokens = Tokenizer.createFromString(':before').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'before',
				},
			]);
		});

		it('should tokenize ::before', () => {
			let tokens = Tokenizer.createFromString('::before').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'before',
				},
			]);
		});

		it('should tokenize :after', () => {
			let tokens = Tokenizer.createFromString(':after').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'after',
				},
			]);
		});

		it('should tokenize ::after', () => {
			let tokens = Tokenizer.createFromString('::after').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Punctuation,
					value: ':',
				},
				{
					type: TokenType.Name,
					value: 'after',
				},
			]);
		});

	});

});
