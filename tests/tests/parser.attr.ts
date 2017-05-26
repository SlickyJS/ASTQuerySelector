import {Parser, ASTQuery, ASTRulesSet, ASTSelector, ASTAttribute} from '../../src';
import {expect} from 'chai';


describe('#Parser.attr', () => {

	describe('parse()', () => {

		it('should parse attribute query', () => {
			let ast = Parser.createFromString('[title]').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTAttribute('title'),
						])
					),
				]),
			);
		});

		it('should parse attribute query with namespace', () => {
			let ast = Parser.createFromString('[s:title]').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTAttribute('s:title'),
						])
					),
				]),
			);
		});

		 it('should parse attribute query with value', () => {
			let ast = Parser.createFromString('[title~="hello"]').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTAttribute('title', '~=', 'hello'),
						])
					),
				]),
			);
		});

		it('should parse case insensitive attribute query', () => {
			let ast = Parser.createFromString('[title~="hello" i]').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTAttribute('title', '~=', 'hello', false),
						])
					),
				]),
			);
		});

	});

});
