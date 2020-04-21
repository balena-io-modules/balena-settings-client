import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import * as yaml from '../lib/yaml';

describe('YAML:', () => {
	describe('.parse()', () => {
		it('should throw an error if invalid input', () =>
			expect(() => yaml.parse('hello;world\n- foo')).to.throw(
				'Invalid YAML: hello;world\n- foo',
			));

		it('should be able to parse strings', () => {
			const result = yaml.parse(stripIndent`
				hello: 'world'
				foo: 'bar'
			`);

			expect(result).to.deep.equal({
				hello: 'world',
				foo: 'bar',
			});
		});

		it('should be able to parse numbers', () => {
			const result = yaml.parse(stripIndent`
				phone: 12345
			`);

			expect(result).to.deep.equal({
				phone: 12345,
			});
		});

		it('should be able to parse lists', () => {
			const result = yaml.parse(stripIndent`
				list:
				- foo
				- bar
				- baz
			`);

			expect(result).to.deep.equal({
				list: ['foo', 'bar', 'baz'],
			});
		});
	});
});
