m = require('mochainon')
os = require('os')
path = require('path')
utils = require('../lib/utils')

describe 'Utils:', ->

	describe '.addHiddenPathPrefix()', ->

		it 'should throw an error if no path', ->
			m.chai.expect ->
				utils.addHiddenPathPrefix()
			.to.throw('Missing path')

		it 'should throw an error if the path is an empty string', ->
			m.chai.expect ->
				utils.addHiddenPathPrefix('')
			.to.throw('Missing path')

		it 'should throw an error if the path is a string containing only spaces', ->
			m.chai.expect ->
				utils.addHiddenPathPrefix('    ')
			.to.throw('Missing path')

		describe 'given Windows', ->

			beforeEach ->
				@osPlatformStub = m.sinon.stub(os, 'platform')
				@osPlatformStub.returns('win32')

			afterEach ->
				@osPlatformStub.restore()

			it 'should prefix the path with an underscore', ->
				result = utils.addHiddenPathPrefix('hello')
				m.chai.expect(result).to.equal('_hello')

			describe 'given an absolute path', ->

				it 'should only prefix the file', ->
					result = utils.addHiddenPathPrefix(path.join('C:', 'foo', 'bar', 'baz.txt'))
					m.chai.expect(result).to.equal(path.join('C:', 'foo', 'bar', '_baz.txt'))

			describe 'given a relative path', ->

				it 'should only prefix the file', ->
					result = utils.addHiddenPathPrefix(path.join('.', 'foo', 'bar', 'baz.txt'))
					m.chai.expect(result).to.equal(path.join('.', 'foo', 'bar', '_baz.txt'))

			describe 'given a path surrounded by spaces', ->

				it 'should trim the result', ->
					result = utils.addHiddenPathPrefix('   hello   ')
					m.chai.expect(result).to.equal('_hello')

		describe 'given Linux', ->

			beforeEach ->
				@osPlatformStub = m.sinon.stub(os, 'platform')
				@osPlatformStub.returns('linux')

			afterEach ->
				@osPlatformStub.restore()

			it 'should prefix the path with a period', ->
				result = utils.addHiddenPathPrefix('hello')
				m.chai.expect(result).to.equal('.hello')

			describe 'given an absolute path', ->

				it 'should only prefix the file', ->
					result = utils.addHiddenPathPrefix(path.join('/', 'foo', 'bar', 'baz.txt'))
					m.chai.expect(result).to.equal(path.join('/', 'foo', 'bar', '.baz.txt'))

			describe 'given a relative path', ->

				it 'should only prefix the file', ->
					result = utils.addHiddenPathPrefix(path.join('.', 'foo', 'bar', 'baz.txt'))
					m.chai.expect(result).to.equal(path.join('.', 'foo', 'bar', '.baz.txt'))

			describe 'given a path surrounded by spaces', ->

				it 'should trim the result', ->
					result = utils.addHiddenPathPrefix('   hello   ')
					m.chai.expect(result).to.equal('.hello')

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
