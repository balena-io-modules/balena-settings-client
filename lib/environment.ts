/*
Copyright 2016-17 Balena

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as _ from 'lodash';

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
 * console.log(environment.getSettingName('BALENARC_HELLO_WORLD'))
 * > helloWorld
 */
export const getSettingName = (variable?: string) => {
	variable = variable != null ? variable.trim() : undefined;
	if (!variable) {
		throw new Error('Missing variable name');
	}
	return _.camelCase(
		variable
			.replace(/^(BALENARC|RESINRC)_/i, '')
			.replace(/(^|_)RESIN(_|$)/, '$1BALENA$2')
	);
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
 * console.log(environment.isSettingVariable('BALENARC_HELLO_WORLD'))
 * > true
 *
 * @example
 * console.log(environment.isSettingVariable('EDITOR'))
 * > false
 */
export const isSettingVariable = (variable: string) =>
	/^(BALENARC_|RESINRC_)(.)+/i.test(variable);

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
 * 	BALENARC_BALENA_URL: 'https://balena.io'
 * 	EDITOR: 'vim'
 * }))
 * > {
 * > 	balenaUrl: 'https://balena.io'
 * > }
 */
export const parse = (environment: { [k: string]: string | undefined }) =>
	_.chain(environment)
		.pickBy((v: string | undefined, k: string) => isSettingVariable(k) && !!v)
		.mapKeys((_v: string, k: string) => getSettingName(k))
		.value();
