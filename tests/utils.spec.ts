import { expect } from 'chai';
import * as utils from '../lib/utils';

describe('Utils:', () => {
	describe('.evaluateSetting()', () => {
		it('should throw an error if the setting is not found', () =>
			expect(() => utils.evaluateSetting({}, 'foo')).to.throw(
				'Setting not found: foo',
			));

		it('should throw an error if the settings object is not defined', () =>
			expect(() => utils.evaluateSetting(null, 'foo')).to.throw(
				'Setting not found: foo',
			));

		it('should return the setting if it is a string', () => {
			const setting = utils.evaluateSetting({ foo: 'bar' }, 'foo');

			expect(setting).to.equal('bar');
		});

		it('should return the setting if it is a number', () => {
			const setting = utils.evaluateSetting({ foo: 3 }, 'foo');

			expect(setting).to.equal(3);
		});

		it('should return the setting if it is an array', () => {
			const setting = utils.evaluateSetting({ foo: [1, 2, 3] }, 'foo');

			expect(setting).to.deep.equal([1, 2, 3]);
		});

		it('should evaluate deep settings', () => {
			const setting = utils.evaluateSetting(
				{ foo: { bar: { baz: 'qux' } } },
				'foo.bar.baz',
			);

			expect(setting).to.equal('qux');
		});

		it('should evaluate the result of a function', () => {
			const setting = utils.evaluateSetting(
				{
					foo() {
						return 'bar';
					},
				},
				'foo',
			);

			expect(setting).to.equal('bar');
		});

		it('should evaluate the result of a function using the settings as context', () => {
			const setting = utils.evaluateSetting(
				{
					greeting: 'Hola',
					foo() {
						// @ts-expect-error
						return `${this.greeting} from balena!`;
					},
				},
				'foo',
			);

			expect(setting).to.equal('Hola from balena!');
		});
	});
});
