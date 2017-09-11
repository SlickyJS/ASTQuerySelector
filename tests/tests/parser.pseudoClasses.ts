import {Parser, ASTQuery, ASTRulesSet, ASTSelector, ASTPseudoClass, ASTElement} from '../../src';
import {expect} from 'chai';


describe('#Parser.pseudoClasses', () => {

	describe('parse()', () => {

		it('should parse element query', () => {
			let ast = Parser.createFromString(':first-child:active').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTPseudoClass('first-child'),
							new ASTPseudoClass('active'),
						])
					),
				]),
			);
		});

		it('should parse :not pseudo class', () => {
			let ast = Parser.createFromString(':not(div)').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTPseudoClass(
								'not',
								new ASTSelector(
									new ASTRulesSet([
										new ASTElement('div'),
									])
								)
							),
						])
					),
				]),
			);
		});

	});

});
