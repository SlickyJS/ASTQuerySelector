import {Parser, ASTQuery, ASTSelector, ASTRulesSet, ASTDescendant, ASTElement, ASTPseudoClass, ASTClass, ASTAttribute, ASTChild} from '../../src';
import {expect} from 'chai';


describe('#Parser', () => {

	describe('parse()', () => {

		it('should parse two selectors in one query', () => {
			let ast = Parser.createFromString('div, span').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTElement('div'),
						])
					),
					new ASTSelector(
						new ASTRulesSet([
							new ASTElement('span'),
						])
					),
				])
			);
		});

		it('should parse query with space before comma', () => {
			let ast = Parser.createFromString('div , span').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTElement('div'),
						])
					),
					new ASTSelector(
						new ASTRulesSet([
							new ASTElement('span'),
						])
					),
				])
			);
		});

		it('should parse query', () => {
			let ast = Parser.createFromString('div:first-child, span[title], table td > a.btn.btn-success').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTElement('div'),
							new ASTPseudoClass('first-child'),
						])
					),
					new ASTSelector(
						new ASTRulesSet([
							new ASTElement('span'),
							new ASTAttribute('title'),
						])
					),
					new ASTSelector(
						new ASTDescendant(
							new ASTRulesSet([
								new ASTElement('table'),
							]),
							new ASTChild(
								new ASTRulesSet([
									new ASTElement('td'),
								]),
								new ASTRulesSet([
									new ASTElement('a'),
									new ASTClass('btn'),
									new ASTClass('btn-success'),
								])
							)
						)
					),
				])
			);
		});

	});

});
