m = require('mochainon')
path = require('path')
config = require('../lib/config')

describe 'Config:', ->

	describe '.paths', ->

		describe '.user', ->

			it 'should be an absolute path', ->
				isAbsolute = config.paths.user is path.resolve(config.paths.user)
				m.chai.expect(isAbsolute).to.be.true

		describe '.project', ->

			it 'should be an absolute path', ->
				isAbsolute = config.paths.project is path.resolve(config.paths.project)
				m.chai.expect(isAbsolute).to.be.true
