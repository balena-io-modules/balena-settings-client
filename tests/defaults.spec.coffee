m = require('mochainon')
path = require('path')
url = require('url')
utils = require('../lib/utils')
defaults = require('../lib/defaults')

describe 'Defaults:', ->

	describe '.resinUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'resinUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should not contain a protocol', ->
			setting = utils.evaluateSetting(defaults, 'resinUrl')
			m.chai.expect(url.parse(setting).protocol).to.not.exist

	describe '.apiUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'apiUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should contain an https protocol', ->
			setting = utils.evaluateSetting(defaults, 'apiUrl')
			m.chai.expect(url.parse(setting).protocol).to.equal('https:')

	describe '.vpnUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'vpnUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should not contain a protocol', ->
			setting = utils.evaluateSetting(defaults, 'vpnUrl')
			m.chai.expect(url.parse(setting).protocol).to.not.exist

	describe '.registryUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'registryUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should not contain a protocol', ->
			setting = utils.evaluateSetting(defaults, 'registryUrl')
			m.chai.expect(url.parse(setting).protocol).to.not.exist

	describe '.imageMakerUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'imageMakerUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should contain an https protocol', ->
			setting = utils.evaluateSetting(defaults, 'imageMakerUrl')
			m.chai.expect(url.parse(setting).protocol).to.equal('https:')

	describe '.deltaUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'deltaUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should contain an https protocol', ->
			setting = utils.evaluateSetting(defaults, 'deltaUrl')
			m.chai.expect(url.parse(setting).protocol).to.equal('https:')

	describe '.dashboardUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'dashboardUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should contain an https protocol', ->
			setting = utils.evaluateSetting(defaults, 'dashboardUrl')
			m.chai.expect(url.parse(setting).protocol).to.equal('https:')

	describe '.proxyUrl', ->

		it 'should be a valid url', ->
			setting = utils.evaluateSetting(defaults, 'proxyUrl')
			m.chai.expect ->
				url.parse(setting)
			.to.not.throw(Error)

		it 'should not contain a protocol', ->
			setting = utils.evaluateSetting(defaults, 'proxyUrl')
			m.chai.expect(url.parse(setting).protocol).to.not.exist

	describe '.dataDirectory', ->

		it 'should be an absolute path', ->
			setting = utils.evaluateSetting(defaults, 'dataDirectory')
			isAbsolute = setting is path.resolve(setting)
			m.chai.expect(isAbsolute).to.be.true

	describe '.projectsDirectory', ->

		it 'should be an absolute path', ->
			setting = utils.evaluateSetting(defaults, 'projectsDirectory')
			isAbsolute = setting is path.resolve(setting)
			m.chai.expect(isAbsolute).to.be.true

	describe '.cacheDirectory', ->

		it 'should be an absolute path', ->
			setting = utils.evaluateSetting(defaults, 'cacheDirectory')
			isAbsolute = setting is path.resolve(setting)
			m.chai.expect(isAbsolute).to.be.true

	describe '.imageCacheTime', ->

		it 'should be a number', ->
			setting = utils.evaluateSetting(defaults, 'imageCacheTime')
			m.chai.expect(setting).to.be.a('number')

		it 'should be a positive number', ->
			setting = utils.evaluateSetting(defaults, 'imageCacheTime')
			m.chai.expect(setting > 0).to.be.true

	describe '.tokenRefreshInterval', ->

		it 'should be a number', ->
			setting = utils.evaluateSetting(defaults, 'tokenRefreshInterval')
			m.chai.expect(setting).to.be.a('number')

		it 'should be a positive number', ->
			setting = utils.evaluateSetting(defaults, 'tokenRefreshInterval')
			m.chai.expect(setting > 0).to.be.true

		it 'should be an integer', ->
			setting = utils.evaluateSetting(defaults, 'tokenRefreshInterval')
			m.chai.expect(setting % 1).to.equal(0)

	describe '.apiKeyVariable', ->

		it 'should be a string', ->
			setting = utils.evaluateSetting(defaults, 'apiKeyVariable')
			m.chai.expect(setting).to.be.a('string')

		it 'should not be empty', ->
			setting = utils.evaluateSetting(defaults, 'apiKeyVariable')
			m.chai.expect(setting.trim().length).to.not.equal(0)
