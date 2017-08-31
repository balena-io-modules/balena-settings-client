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
			const setting = environment.getSettingName('RESINRC_HELLO');
			m.chai.expect(setting).to.equal('hello');
		});

		it('should return the correct setting for a double word variable', () => {
			const setting = environment.getSettingName('RESINRC_HELLO_WORLD');
			m.chai.expect(setting).to.equal('helloWorld');
		});

		it('should return the correct setting for a triple word variable', () => {
			const setting = environment.getSettingName('RESINRC_HELLO_WORLD_FOO');
			m.chai.expect(setting).to.equal('helloWorldFoo');
		});

		it('should return the correct setting for a double word lowercase variable', () => {
			const setting = environment.getSettingName('resinrc_hello_world_foo');
			m.chai.expect(setting).to.equal('helloWorldFoo');
		});
	});

	describe('.isSettingVariable()', () => {
		it('should return true if it starts with RESINRC_', () =>
			m.chai
				.expect(environment.isSettingVariable('RESINRC_HELLO'))
				.to.equal(true));

		it('should return true if it starts with resinrc_', () =>
			m.chai
				.expect(environment.isSettingVariable('resinrc_hello'))
				.to.equal(true));

		it('should return false if it starts with RESIN_', () =>
			m.chai
				.expect(environment.isSettingVariable('RESIN_HELLO'))
				.to.equal(false));

		it('should return false if it equals RESINRC_', () =>
			m.chai.expect(environment.isSettingVariable('RESINRC_')).to.equal(false));

		it('should return false if it equals RESINRC', () =>
			m.chai.expect(environment.isSettingVariable('RESINRC')).to.equal(false));

		it('should return false if it equals RESIN', () =>
			m.chai.expect(environment.isSettingVariable('RESIN')).to.equal(false));

		it('should return false if it starts with RESINRC but dont contain an underscore', () =>
			m.chai
				.expect(environment.isSettingVariable('RESINRCHELLO'))
				.to.equal(false));
	});

	describe('.parse()', () => {
		describe('given an environment containing a single RESINRC variable', () => {
			it('should parse an empty environment', () => {
				const result = environment.parse({});
				m.chai.expect(result).to.deep.equal({});
			});

			it('should parse an environment with one resin variable', () => {
				const result = environment.parse({
					RESINRC_HELLO_WORLD: 'foo'
				});

				m.chai.expect(result).to.deep.equal({
					helloWorld: 'foo'
				});
			});

			it('should parse an environment with one lowercase resin variable', () => {
				const result = environment.parse({
					resinrc_hello_world: 'foo'
				});

				m.chai.expect(result).to.deep.equal({
					helloWorld: 'foo'
				});
			});

			it('should parse an environment with multiple resin variables', () => {
				const result = environment.parse({
					RESINRC_HELLO_WORLD: 'foo',
					RESINRC_BAR: 'baz'
				});

				m.chai.expect(result).to.deep.equal({
					helloWorld: 'foo',
					bar: 'baz'
				});
			});

			it('should parse an environment with no resin variables', () => {
				const result = environment.parse({
					RESIN: 'true',
					RESINRC: 'true',
					RESIN_SALUTE: 'Hola!',
					EDITOR: 'vim',
					SHELL: 'zsh'
				});

				m.chai.expect(result).to.deep.equal({});
			});

			it('should parse an environment with a resin variable and more', () => {
				const result = environment.parse({
					RESINRC_HELLO: 'world',
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
