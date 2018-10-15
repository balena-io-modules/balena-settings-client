import * as m from 'mochainon';
import * as environment from '../lib/environment';

describe('Environment:', () => {
	describe('getSettingName()', () => {
		it('should throw an error if no variable', () =>
			m.chai
				.expect(() => environment.getSettingName())
				.to.throw('Missing variable name'));

		it('should throw an error if variable is an empty string', () =>
			m.chai
				.expect(() => environment.getSettingName(''))
				.to.throw('Missing variable name'));

		it('should throw an error if variable is a string containing only spaces', () =>
			m.chai
				.expect(() => environment.getSettingName('     '))
				.to.throw('Missing variable name'));

		it('should return the correct setting for a single word variable', () => {
			const setting = environment.getSettingName('BALENARC_HELLO');
			m.chai.expect(setting).to.equal('hello');
		});

		it('should return the correct setting for a double word variable', () => {
			const setting = environment.getSettingName('BALENARC_HELLO_WORLD');
			m.chai.expect(setting).to.equal('helloWorld');
		});

		it('should return the correct setting for a triple word variable', () => {
			const setting = environment.getSettingName('BALENARC_HELLO_WORLD_FOO');
			m.chai.expect(setting).to.equal('helloWorldFoo');
		});

		it('should return the correct setting for a double word lowercase variable', () => {
			const setting = environment.getSettingName('balenarc_hello_world_foo');
			m.chai.expect(setting).to.equal('helloWorldFoo');
		});
	});

	describe('.isSettingVariable()', () => {
		it('should return true if it starts with BALENARC_', () =>
			m.chai
				.expect(environment.isSettingVariable('BALENARC_HELLO'))
				.to.equal(true));

		it('should return true if it starts with balenarc_', () =>
			m.chai
				.expect(environment.isSettingVariable('balenarc_hello'))
				.to.equal(true));

		it('should return false if it starts with BALENA_', () =>
			m.chai
				.expect(environment.isSettingVariable('BALENA_HELLO'))
				.to.equal(false));

		it('should return false if it equals BALENARC_', () =>
			m.chai
				.expect(environment.isSettingVariable('BALENARC_'))
				.to.equal(false));

		it('should return false if it equals BALENARC', () =>
			m.chai.expect(environment.isSettingVariable('BALENARC')).to.equal(false));

		it('should return false if it equals BALENA', () =>
			m.chai.expect(environment.isSettingVariable('BALENA')).to.equal(false));

		it('should return false if it starts with BALENARC but dont contain an underscore', () =>
			m.chai
				.expect(environment.isSettingVariable('BALENARCHELLO'))
				.to.equal(false));
	});

	describe('.parse()', () => {
		describe('given an environment containing a single BALENARC variable', () => {
			it('should parse an empty environment', () => {
				const result = environment.parse({});
				m.chai.expect(result).to.deep.equal({});
			});

			it('should parse an environment with one balena variable', () => {
				const result = environment.parse({
					BALENARC_HELLO_WORLD: 'foo'
				});

				m.chai.expect(result).to.deep.equal({
					helloWorld: 'foo'
				});
			});

			it('should parse an environment with one lowercase balena variable', () => {
				const result = environment.parse({
					balenarc_hello_world: 'foo'
				});

				m.chai.expect(result).to.deep.equal({
					helloWorld: 'foo'
				});
			});

			it('should parse an environment with multiple balena variables', () => {
				const result = environment.parse({
					BALENARC_HELLO_WORLD: 'foo',
					BALENARC_BAR: 'baz'
				});

				m.chai.expect(result).to.deep.equal({
					helloWorld: 'foo',
					bar: 'baz'
				});
			});

			it('should parse an environment with no balena variables', () => {
				const result = environment.parse({
					BALENA: 'true',
					BALENARC: 'true',
					BALENA_SALUTE: 'Hola!',
					EDITOR: 'vim',
					SHELL: 'zsh'
				});

				m.chai.expect(result).to.deep.equal({});
			});

			it('should parse an environment with a balena variable and more', () => {
				const result = environment.parse({
					BALENARC_HELLO: 'world',
					EDITOR: 'vim',
					SHELL: 'zsh'
				});

				m.chai.expect(result).to.deep.equal({
					hello: 'world'
				});
			});
		});
	});
});
