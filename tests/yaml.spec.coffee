m = require('mochainon')
yaml = require('../lib/yaml')

describe 'YAML:', ->

	describe '.parse()', ->

		it 'should throw an error if invalid input', ->
			m.chai.expect ->
				result = yaml.parse('hello;world\n- foo')
			.to.throw('Invalid YAML: hello;world\n- foo')

		it 'should be able to parse strings', ->
			result = yaml.parse '''
				hello: 'world'
				foo: 'bar'
			'''

			m.chai.expect(result).to.deep.equal
				hello: 'world'
				foo: 'bar'

		it 'should be able to parse numbers', ->
			result = yaml.parse '''
				phone: 12345
			'''

			m.chai.expect(result).to.deep.equal
				phone: 12345

		it 'should be able to parse lists', ->
			result = yaml.parse '''
				list:
				- foo
				- bar
				- baz
			'''

			m.chai.expect(result).to.deep.equal
				list: [ 'foo', 'bar', 'baz' ]
