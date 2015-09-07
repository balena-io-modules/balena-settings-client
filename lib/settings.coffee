###
The MIT License

Copyright (c) 2015 Resin.io, Inc. https://resin.io.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
###

###*
# This module attempts to retrieve configuration from the following places:
#
# **UNIX:**
#
# - Default settings.
# - `$HOME/.resinrc.yml`.
# - `$PWD/.resinrc.yml`.
# - Environment variables matching `RESINRC_<SETTING_NAME>`.
#
# **Windows:**
#
# - Default settings.
# - `%UserProfile%\_resinrc.yml`.
# - `%cd%\_resinrc.yml`.
# - Environment variables matching `RESINRC_<SETTING_NAME>`.
#
# The values from all locations are merged together, with sources listed below taking precedence.
#
# For example:
#
# ```sh
#	$ cat $HOME/.resinrc.yml
#	resinUrl: 'resinstaging.io'
#	projectsDirectory: '/opt/resin'
#
#	$ cat $PWD/.resinrc.yml
#	projectsDirectory: '/Users/resin/Projects'
#	dataDirectory: '/opt/resin-data'
#
#	$ echo $RESINRC_DATA_DIRECTORY
#	/opt/cache/resin
# ```
#
# That specific environment will have the following configuration:
#
# ```yaml
#	resinUrl: 'resinstaging.io'
#	projectsDirectory: '/Users/resin/Projects'
#	dataDirectory: '/opt/cache/resin'
# ```
#
# @module settings
###

fs = require('fs')

defaults = require('./defaults')
environment = require('./environment')
yaml = require('./yaml')
utils = require('./utils')
config = require('./config')

readConfigFile = (file) ->
	try

		# We read the config files synchronously since
		# other modules rely on Resin Settings Client
		# to be ready for usage as soon as possible.
		return yaml.parse(fs.readFileSync(file, encoding: 'utf8'))

	catch error
		return {} if error.code is 'ENOENT'
		throw error

settings = utils.mergeObjects.apply null, [
	defaults
	readConfigFile(config.paths.user)
	readConfigFile(config.paths.project)
	environment.parse(process.env)
]

###*
# @summary Get a setting
# @function
# @public
#
# @param {String} name - setting name
# @return {*} setting value
#
# @example
# settings.get('dataDirectory')
###
exports.get = (name) ->
	return utils.evaluateSetting(settings, name)
