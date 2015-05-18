path = require('path')
chai = require('chai')
expect = chai.expect
settings = require('../lib/settings')

describe 'Settings:', ->

	describe 'remoteUrl', ->

		it 'should be able to get remoteUrl', ->
			remoteUrl = settings.get('remoteUrl')
			expect(remoteUrl).to.equal('https://api.resin.io')

	describe 'dataDirectory', ->

		it 'should be an absolute path', ->
			dataDirectory = settings.get('dataDirectory')
			isAbsolute = dataDirectory is path.resolve(dataDirectory)
			expect(isAbsolute).to.be.true
