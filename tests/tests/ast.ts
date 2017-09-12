import {Parser} from '../../src';
import {expect} from 'chai';



describe('#Parser.ast', () => {

	describe('render()', () => {

		it('should re-render query', () => {
			let ast = Parser.createFromString('a:not(:last-child), b::after, div > span.bold.alert i').parse();

			expect(ast.render()).to.be.equal('a:not(:last-child), b::after, div > span.bold.alert i');
		});

	});

});
