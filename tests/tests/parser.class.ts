import {Parser, ASTQuery, ASTSelector, ASTRulesSet, ASTClass} from '../../src';
import {expect} from 'chai';


describe('#Parser.class', () => {

	describe('parse()', () => {

		it('should parse class query', () => {
			let ast = Parser.createFromString('.btn').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTClass('btn'),
						])
					),
				]),
			);
		});

	});

});
