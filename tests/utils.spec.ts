import * as m from 'mochainon';
import * as utils from '../lib/utils';

describe('Utils:', () => {
	describe('.mergeObjects()', () => {
		it('should be able to merge many objects', () => {
			const first = {
				hello: 'world',
				foo: 'bar'
			};

			const second = {
				hello: 'world!',
				foo: 'baz'
			};

			const third = { hello: 'world' };

			const result = utils.mergeObjects(first, second, third);
			m.chai.expect(result).to.deep.equal({
				hello: 'world',
				foo: 'baz'
			});
		});

		it('should be able to merge function properties', () => {
			const first = {
				foo() {
					return 'first';
				}
			};

			const second = {
				foo() {
					return 'second';
				}
			};

			const third = {
				foo() {
					return 'third';
				}
			};

			const result = utils.mergeObjects(first, second, third);
			m.chai.expect(result.foo()).to.equal('third');
		});
	});

	describe('.evaluateSetting()', () => {
		it('should throw an error if the setting is not found', () =>
			m.chai
				.expect(() => utils.evaluateSetting({}, 'foo'))
				.to.throw('Setting not found: foo'));

		it('should throw an error if the settings object is not defined', () =>
			m.chai
				.expect(() => utils.evaluateSetting(null, 'foo'))
				.to.throw('Setting not found: foo'));

		it('should return the setting if it is a string', () => {
			const setting = utils.evaluateSetting({ foo: 'bar' }, 'foo');

			m.chai.expect(setting).to.equal('bar');
		});

		it('should return the setting if it is a number', () => {
			const setting = utils.evaluateSetting({ foo: 3 }, 'foo');

			m.chai.expect(setting).to.equal(3);
		});

		it('should return the setting if it is an array', () => {
			const setting = utils.evaluateSetting({ foo: [1, 2, 3] }, 'foo');

			m.chai.expect(setting).to.deep.equal([1, 2, 3]);
		});

		it('should evaluate deep settings', () => {
			const setting = utils.evaluateSetting(
				{ foo: { bar: { baz: 'qux' } } },
				'foo.bar.baz'
			);

			m.chai.expect(setting).to.equal('qux');
		});

		it('should evaluate the result of a function', () => {
			const setting = utils.evaluateSetting(
				{
					foo() {
						return 'bar';
					}
				},
				'foo'
			);

			m.chai.expect(setting).to.equal('bar');
		});

		it('should evaluate the result of a function using the settings as context', () => {
			const setting = utils.evaluateSetting(
				{
					greeting: 'Hola',
					foo() {
						return `${this.greeting} from balena!`;
					}
				},
				'foo'
			);

			m.chai.expect(setting).to.equal('Hola from balena!');
		});
	});
});
