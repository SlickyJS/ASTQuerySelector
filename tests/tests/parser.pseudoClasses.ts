import {Parser, ASTQuery, ASTRulesSet, ASTSelector, ASTPseudoClass} from '../../src';
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

	});

});
