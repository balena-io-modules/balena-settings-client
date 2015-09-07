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
