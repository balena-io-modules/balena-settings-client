ConfJS = require('conf.js')
path = require('path')
userHome = require('user-home')

settings =
	remoteUrl: 'https://api.resin.io'
	dashboardUrl: 'https://dashboard.resin.io'
	dataDirectory: path.join(userHome, '.resin')

module.exports = new ConfJS
	userConfig: path.join(settings.dataDirectory, 'config')
	localConfig: '.resinconf'
	default: settings
