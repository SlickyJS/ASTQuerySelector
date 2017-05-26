import {Tokenizer, TokenType} from '../../src';
import {expect} from 'chai';


describe('#Tokenizer.simple', () => {

	describe('tokenize()', () => {

		it('should tokenize element name', () => {
			let tokens = Tokenizer.createFromString('div').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Name,
					value: 'div',
				},
			]);
		});

		it('should tokenize class', () => {
			let tokens = Tokenizer.createFromString('.alert').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '.',
				},
				{
					type: TokenType.Name,
					value: 'alert',
				},
			]);
		});

		it('should tokenize id', () => {
			let tokens = Tokenizer.createFromString('#box').tokenize();

			expect(tokens).to.be.eql([
				{
					type: TokenType.Punctuation,
					value: '#',
				},
				{
					type: TokenType.Name,
					value: 'box',
				},
			]);
		});

	});

});
