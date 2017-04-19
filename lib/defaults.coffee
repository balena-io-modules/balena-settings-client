###
Copyright 2016 Resin.io

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###

path = require('path')
userHome = require('home-or-tmp')
hidepath = require('hidepath')

###*
# @summary Default settings
# @namespace defaults
# @protected
###
module.exports =

	###*
	# @property {String} resinUrl - Resin.io url
	# @memberof defaults
	###
	resinUrl: 'resin.io'

	###*
	# @property {Function} apiUrl - Resin.io API url
	# @memberof defaults
	###
	apiUrl: ->
		return "https://api.#{@resinUrl}"

	###*
	# @property {Function} vpnUrl - Resin.io VPN url
	# @memberof defaults
	###
	vpnUrl: ->
		return "vpn.#{@resinUrl}"

	###*
	# @property {Function} registryUrl - Resin.io Registry url
	# @memberof defaults
	###
	registryUrl: ->
		return "registry.#{@resinUrl}"

	###*
	# @property {Function} imageMakerUrl - Resin.io Image Maker url
	# @memberof defaults
	###
	imageMakerUrl: ->
		return "https://img.#{@resinUrl}"

	###*
	# @property {Function} deltaUrl - Resin.io Delta url
	# @memberof defaults
	###
	deltaUrl: ->
		return "https://delta.#{@resinUrl}"

	###*
	# @property {Function} dashboardUrl - Resin.io dashboard url
	# @memberof defaults
	###
	dashboardUrl: ->
		return "https://dashboard.#{@resinUrl}"

	###*
	# @property {Function} proxyUrl - Resin.io Proxy url
	# @memberof defaults
	###
	proxyUrl: ->
		if @resinUrl is 'resin.io'
			return 'resindevice.io'
		return "devices.#{@resinUrl}"

	###*
	# @property {String} dataDirectory - data directory path
	# @memberof defaults
	###
	dataDirectory: path.join(userHome, hidepath('resin'))

	###*
	# @property {String} projectsDirectory - projects directory path
	# @memberof defaults
	###
	projectsDirectory: path.join(userHome, 'ResinProjects')

	###*
	# @property {Function} cacheDirectory - cache directory path
	# @memberof defaults
	###
	cacheDirectory: ->
		return path.join(@dataDirectory, 'cache')

	###*
	# @property {Function} binDirectory - binary directory path
	# @memberof defaults
	###
	binDirectory: ->
		return path.join(@dataDirectory, 'bin')

	###*
	# @property {Number} imageCacheTime - image cache time
	# @memberof defaults
	###
	imageCacheTime: 1 * 1000 * 60 * 60 * 24 * 7 # 1 week in milliseconds

	###*
	# @property {Number} tokenRefreshInterval - token refresh interval
	# @memberof defaults
	###
	tokenRefreshInterval: 1 * 1000 * 60 * 60 # 1 hour in milliseconds

	###*
	# @property {String} apiKeyVariable - api key environment variable
	# @memberof defaults
	###
	apiKeyVariable: 'RESIN_API_KEY'
