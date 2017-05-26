import {Parser, ASTQuery, ASTRulesSet, ASTSelector, ASTId} from '../../src';
import {expect} from 'chai';


describe('#Parser.id', () => {

	describe('parse()', () => {

		it('should parse id query', () => {
			let ast = Parser.createFromString('#header').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTId('header'),
						])
					),
				]),
			);
		});

	});

});
