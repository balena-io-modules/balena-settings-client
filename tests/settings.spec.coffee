m = require('mochainon')
path = require('path')
settings = require('../lib/settings')

describe 'Settings:', ->

	describe 'given default values', ->

		beforeEach ->

			# Manually restore defaults
			settings._data = settings._options.default

		describe 'remoteUrl', ->

			it 'should be able to get remoteUrl', ->
				remoteUrl = settings.get('remoteUrl')
				m.chai.expect(remoteUrl).to.equal('https://api.resin.io')

		describe 'dashboardUrl', ->

			it 'should be able to get dashboardUrl', ->
				remoteUrl = settings.get('dashboardUrl')
				m.chai.expect(remoteUrl).to.equal('https://dashboard.resin.io')

		describe 'dataDirectory', ->

			it 'should be an absolute path', ->
				dataDirectory = settings.get('dataDirectory')
				isAbsolute = dataDirectory is path.resolve(dataDirectory)
				m.chai.expect(isAbsolute).to.be.true

		describe 'cacheDirectory', ->

			it 'should be an absolute path', ->
				cacheDirectory = settings.get('cacheDirectory')
				isAbsolute = cacheDirectory is path.resolve(cacheDirectory)
				m.chai.expect(isAbsolute).to.be.true

		describe 'imageCacheTime', ->

			it 'should be a number', ->
				m.chai.expect(settings.get('imageCacheTime')).to.be.a('number')

			it 'should be a positive number', ->
				m.chai.expect(settings.get('imageCacheTime') > 0).to.be.true
