import {Parser, ASTQuery, ASTRulesSet, ASTSelector, ASTPseudoElement} from '../../src';
import {expect} from 'chai';


describe('#Parser.pseudoElements', () => {

	describe('parse()', () => {

		it('should parse :after', () => {
			let ast = Parser.createFromString(':after').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTPseudoElement('after'),
						])
					),
				]),
			);
		});

		it('should parse ::after', () => {
			let ast = Parser.createFromString('::after').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTPseudoElement('after'),
						])
					),
				]),
			);
		});

		it('should parse :before', () => {
			let ast = Parser.createFromString(':before').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTPseudoElement('before'),
						])
					),
				]),
			);
		});

		it('should parse ::before', () => {
			let ast = Parser.createFromString('::before').parse();

			expect(ast).to.be.eql(
				new ASTQuery([
					new ASTSelector(
						new ASTRulesSet([
							new ASTPseudoElement('before'),
						])
					),
				]),
			);
		});

	});

});
