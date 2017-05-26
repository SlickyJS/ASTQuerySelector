import {Parser, ASTQuery, ASTRulesSet, ASTSelector, ASTElement} from '../../src';
import {expect} from 'chai';


describe('#Parser.element', () => {

	describe('parse()', () => {

		it('should parse element query', () => {
			let ast = Parser.createFromString('div').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTElement('div'),
						])
					),
				]),
			);
		});

	});

});
