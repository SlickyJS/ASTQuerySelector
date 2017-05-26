import {Parser, ASTQuery, ASTRulesSet, ASTSelector, ASTElement, ASTClass, ASTDescendant, ASTAdjacentSibling, ASTGeneralSibling, ASTChild} from '../../src';
import {expect} from 'chai';


describe('#Parser', () => {

	describe('parse()', () => {

		it('should match simple descendant selector', () => {
			let ast = Parser.createFromString('div span').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTDescendant(
							new ASTRulesSet([
								new ASTElement('div'),
							]),
							new ASTRulesSet([
								new ASTElement('span'),
							])
						)
					),
				])
			);
		});

		it('should match selector with descendant node', () => {
			let ast = Parser.createFromString('div span.close i').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTDescendant(
							new ASTRulesSet([
								new ASTElement('div'),
							]),
							new ASTDescendant(
								new ASTRulesSet([
									new ASTElement('span'),
									new ASTClass('close'),
								]),
								new ASTRulesSet([
									new ASTElement('i'),
								])
							)
						)
					),
				])
			);
		});

		it('should match selector with adjacent sibling', () => {
			let ast = Parser.createFromString('div + span + i').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTAdjacentSibling(
							new ASTRulesSet([
								new ASTElement('div'),
							]),
							new ASTAdjacentSibling(
								new ASTRulesSet([
									new ASTElement('span'),
								]),
								new ASTRulesSet([
									new ASTElement('i'),
								])
							)
						)
					),
				])
			);
		});

		it('should match selector with sibling', () => {
			let ast = Parser.createFromString('div ~ span ~ i').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTGeneralSibling(
							new ASTRulesSet([
								new ASTElement('div'),
							]),
							new ASTGeneralSibling(
								new ASTRulesSet([
									new ASTElement('span'),
								]),
								new ASTRulesSet([
									new ASTElement('i'),
								])
							)
						)
					),
				])
			);
		});

		it('should match selector with child selector', () => {
			let ast = Parser.createFromString('div > span > i').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTChild(
							new ASTRulesSet([
								new ASTElement('div'),
							]),
							new ASTChild(
								new ASTRulesSet([
									new ASTElement('span'),
								]),
								new ASTRulesSet([
									new ASTElement('i'),
								])
							)
						)
					),
				])
			);
		});

	});

});
