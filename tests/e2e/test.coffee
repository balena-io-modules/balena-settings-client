m = require('mochainon')
_ = require('lodash')
path = require('path')
fs = require('fs')
Promise = require('bluebird')
child_process = Promise.promisifyAll(require('child_process'))
wary = require('wary')
config = require('../../lib/config')
environment = require('../../lib/environment')

getSetting = (setting) ->
	script = path.join(__dirname, 'get.coffee')
	child_process.execAsync("coffee #{script} #{setting}", encoding: 'utf8').spread (stdout, stderr) ->
		if not _.isEmpty(stderr)
			throw new Error(stderr)
		return stdout.replace(/\n$/, '')

getAll = ->
	script = path.join(__dirname, 'get-all.coffee')
	child_process.execAsync("coffee #{script}", encoding: 'utf8').spread (stdout, stderr) ->
		if not _.isEmpty(stderr)
			throw new Error(stderr)
		return JSON.parse(stdout.replace(/\n$/, ''))

wary.it 'should override defaults given a user configuration that points to staging', {}, ->
	fs.writeFileSync config.paths.user, '''
		resinUrl: resinstaging.io/
	'''
	Promise.props
		resinUrl: getSetting('resinUrl')
		apiUrl: getSetting('apiUrl')
		dashboardUrl: getSetting('dashboardUrl')
		vpnUrl: getSetting('vpnUrl')
		registryUrl: getSetting('registryUrl')
	.then (settings) ->
		m.chai.expect(settings.resinUrl).to.equal('resinstaging.io/')
		m.chai.expect(settings.apiUrl).to.equal('https://api.resinstaging.io/')
		m.chai.expect(settings.dashboardUrl).to.equal('https://dashboard.resinstaging.io/')
		m.chai.expect(settings.vpnUrl).to.equal('vpn.resinstaging.io/')
		m.chai.expect(settings.registryUrl).to.equal('registry.resinstaging.io/')

wary.it 'should give precedence to project configuration', {}, ->
	fs.writeFileSync config.paths.user, '''
		resinUrl: resinstaging.io/
	'''
	fs.writeFileSync config.paths.project, '''
		resinUrl: resin.custom.com/
	'''
	Promise.props
		resinUrl: getSetting('resinUrl')
		apiUrl: getSetting('apiUrl')
		dashboardUrl: getSetting('dashboardUrl')
		vpnUrl: getSetting('vpnUrl')
		registryUrl: getSetting('registryUrl')
	.then (settings) ->
		m.chai.expect(settings.resinUrl).to.equal('resin.custom.com/')
		m.chai.expect(settings.apiUrl).to.equal('https://api.resin.custom.com/')
		m.chai.expect(settings.dashboardUrl).to.equal('https://dashboard.resin.custom.com/')
		m.chai.expect(settings.vpnUrl).to.equal('vpn.resin.custom.com/')
		m.chai.expect(settings.registryUrl).to.equal('registry.resin.custom.com/')

wary.it 'should give predecende to environment variable configuration', {}, ->
	fs.writeFileSync config.paths.user, '''
		resinUrl: resinstaging.io/
	'''
	fs.writeFileSync config.paths.project, '''
		resinUrl: resin.custom.com/
	'''
	process.env.RESINRC_RESIN_URL = 'resindev.custom.com/'
	m.chai.expect(getSetting('resinUrl')).to.eventually.equal('resindev.custom.com/')

wary.it 'should be able to return all settings', {}, ->
	process.env.RESINRC_PROJECTS_DIRECTORY = '/usr/src/projects'
	process.env.RESINRC_DATA_DIRECTORY = '/opt'
	m.chai.expect(getAll()).to.eventually.become
		resinUrl: 'resindev.custom.com/'
		apiUrl: 'https://api.resindev.custom.com/'
		vpnUrl: 'vpn.resindev.custom.com/'
		registryUrl: 'registry.resindev.custom.com/'
		imageMakerUrl: 'https://img.resindev.custom.com/'
		dashboardUrl: 'https://dashboard.resindev.custom.com/'
		dataDirectory: '/opt'
		cacheDirectory: path.join('/opt', 'cache')
		projectsDirectory: '/usr/src/projects'
		imageCacheTime: 604800000
		tokenRefreshInterval: 3600000
		apiKeyVariable: 'RESIN_API_KEY'

wary.run().catch (error) ->
	console.error("ERROR: #{error.message}")
	process.exit(1)
.finally ->
	try
		fs.unlinkSync(config.paths.user)
		fs.unlinkSync(config.paths.project)
		process.env = _.omit(process.env, environment.isSettingVariable)
