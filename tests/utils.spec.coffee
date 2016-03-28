m = require('mochainon')
utils = require('../lib/utils')

describe 'Utils:', ->

	describe '.mergeObjects()', ->

		it 'should be able to merge many objects', ->
			first =
				hello: 'world'
				foo: 'bar'

			second =
				hello: 'world!'
				foo: 'baz'

			third =
				hello: 'world'

			result = utils.mergeObjects(first, second, third)
			m.chai.expect(result).to.deep.equal
				hello: 'world'
				foo: 'baz'

		it 'should be able to merge function properties', ->
			first =
				foo: -> return 'first'

			second =
				foo: -> return 'second'

			third =
				foo: -> return 'third'

			result = utils.mergeObjects(first, second, third)
			m.chai.expect(result.foo()).to.equal('third')

	describe '.evaluateSetting()', ->

		it 'should throw an error if the setting is not found', ->
			m.chai.expect ->
				utils.evaluateSetting({}, 'foo')
			.to.throw('Setting not found: foo')

		it 'should throw an error if the settings object is not defined', ->
			m.chai.expect ->
				utils.evaluateSetting(null, 'foo')
			.to.throw('Setting not found: foo')

		it 'should return the setting if it is a string', ->
			setting = utils.evaluateSetting
				foo: 'bar'
			, 'foo'

			m.chai.expect(setting).to.equal('bar')

		it 'should return the setting if it is a number', ->
			setting = utils.evaluateSetting
				foo: 3
			, 'foo'

			m.chai.expect(setting).to.equal(3)

		it 'should return the setting if it is an array', ->
			setting = utils.evaluateSetting
				foo: [ 1, 2, 3 ]
			, 'foo'

			m.chai.expect(setting).to.deep.equal([ 1, 2, 3 ])

		it 'should evaluate deep settings', ->
			setting = utils.evaluateSetting
				foo: bar: baz: 'qux'
			, 'foo.bar.baz'

			m.chai.expect(setting).to.equal('qux')

		it 'should evaluate the result of a function', ->
			setting = utils.evaluateSetting
				foo: -> return 'bar'
			, 'foo'

			m.chai.expect(setting).to.equal('bar')

		it 'should evaluate the result of a function using the settings as context', ->
			setting = utils.evaluateSetting
				greeting: 'Hola'
				foo: ->
					return "#{@greeting} from Resin!"
			, 'foo'

			m.chai.expect(setting).to.equal('Hola from Resin!')
