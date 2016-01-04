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

_ = require('lodash')
os = require('os')
url = require('url')
path = require('path')

###*
# @summary Add hidden prefix to path
# @function
# @protected
#
# @description
# This function adds `_` on Windows and '.' in UNIX based operating systems.
#
# @param {String} filePath - file path
# @returns {String} hidden file path
#
# @throws Will throw if no path.
#
# @example
# console.log(utils.addHiddenPathPrefix('foo'))
# > _path // On Windows
# > .path // On UNIX
#
# @example
# console.log(utils.addHiddenPathPrefix('/foo/bar/baz'))
# > /foo/bar/.baz
#
# @example
# console.log(utils.addHiddenPathPrefix('C:\\foo\\bar\\baz'))
# > C:\\foo\\bar\\_baz
###
exports.addHiddenPathPrefix = (filePath) ->
	filePath = filePath?.trim()

	if _.isEmpty(filePath)
		throw new Error('Missing path')

	if os.platform() is 'win32'
		delimiter = '_'
	else
		delimiter = '.'

	dirname = path.dirname(filePath)
	basename = path.basename(filePath)
	return path.join(dirname, "#{delimiter}#{basename}")

###*
# @summary Merge objects into one
# @function
# @protected
#
# @description
# The last passed objects have precedence over the first ones.
#
# @param {...Object} objects - input objects
# @returns {Object} merged object
#
# @example
# first = foo: 'bar'
# second = foo: 'baz'
# third = foo: 'qux'
#
# console.log(utils.mergeObjects(first, second, third))
# > { foo: 'qux' }
###

# Notice that this function equals `_.merge` and thus the latter
# could be used directly, making this function declaration unnecessary.
# However, we decided to create a new function for this in order to
# test specific behaviour that affects this module, like function
# merging.
exports.mergeObjects = _.merge

###*
# @summary Evaluate a setting property
# @function
# @protected
#
# @param {Object} [settings={}] - settings
# @param {String} property - period separated property
# @returns {*} setting value
#
# @throws Will throw if setting is not found.
#
# @example
# console.log(utils.evaluateSetting({ foo: 'bar' }, 'foo'))
# > 'bar'
#
# @example
# console.log(utils.evaluateSetting({
# 	foo:
# 		bar: 'baz'
# }, 'foo.bar'))
# > 'baz'
#
# @example
# console.log(utils.evaluateSetting({
# 	greeting: 'Hola'
# 	message: ->
# 		return "#{@greeting} World"
# }), 'message')
# > Hola World
###
exports.evaluateSetting = (settings = {}, property) ->
	value = _.get(settings, property)

	if not value?
		throw new Error("Setting not found: #{property}")

	if _.isFunction(value)

		# This enables nifty things like dynamic
		# settings that rely on other settings
		value = value.call(settings)

	return value
