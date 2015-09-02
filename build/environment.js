
/*
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
 */
var _;

_ = require('lodash');


/**
 * @summary Get setting name from environment variable
 * @function
 * @protected
 *
 * @param {String} variable - environment variable
 * @returns {String} setting name
 *
 * @throws Will throw if variable is missing.
 *
 * @example
 * console.log(environment.getSettingName('RESINRC_HELLO_WORLD'))
 * > helloWorld
 */

exports.getSettingName = function(variable) {
  if (_.isEmpty(variable != null ? variable.trim() : void 0)) {
    throw new Error('Missing variable name');
  }
  return _.camelCase(variable.replace(/^RESINRC_/i, ''));
};


/**
 * @summary Determine if a variable is a configuration variable
 * @function
 * @protected
 *
 * @param {String} variable - environment variable
 * @returns {Boolean} is a configuration variable
 *
 * @example
 * console.log(environment.isSettingVariable('RESINRC_HELLO_WORLD'))
 * > true
 *
 * @example
 * console.log(environment.isSettingVariable('EDITOR'))
 * > false
 */

exports.isSettingVariable = function(variable) {
  return /^RESINRC_(.)+/i.test(variable);
};


/**
 * @summary Parse environment variables
 * @function
 * @protected
 *
 * @param {Object} environment - environment
 * @returns {Object} parsed environment variables
 *
 * @example
 * console.log(utils.parse({
 *		RESINRC_RESIN_URL: 'https://resin.io'
 *		EDITOR: 'vim'
 * }))
 * > {
 * > 	resinUrl: 'https://resin.io'
 * > }
 */

exports.parse = function(environment) {
  return _.chain(environment).pick(_.rearg(exports.isSettingVariable, 1)).mapKeys(_.rearg(exports.getSettingName, 1)).value();
};
