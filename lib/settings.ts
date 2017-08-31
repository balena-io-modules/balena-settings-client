/*
Copyright 2016-17 Resin.io

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

/**
 * This module attempts to retrieve configuration from the following places:
 *
 * **UNIX:**
 *
 * - Default settings.
 * - `$HOME/.resinrc.yml`.
 * - `$PWD/resinrc.yml`.
 * - Environment variables matching `RESINRC_<SETTING_NAME>`.
 *
 * **Windows:**
 *
 * - Default settings.
 * - `%UserProfile%\_resinrc.yml`.
 * - `%cd%\resinrc.yml`.
 * - Environment variables matching `RESINRC_<SETTING_NAME>`.
 *
 * The values from all locations are merged together, with sources listed below taking precedence.
 *
 * For example:
 *
 * ```sh
 * 	$ cat $HOME/.resinrc.yml
 * 	resinUrl: 'resinstaging.io'
 * 	projectsDirectory: '/opt/resin'
 *
 * 	$ cat $PWD/.resinrc.yml
 * 	projectsDirectory: '/Users/resin/Projects'
 * 	dataDirectory: '/opt/resin-data'
 *
 * 	$ echo $RESINRC_DATA_DIRECTORY
 * 	/opt/cache/resin
 * ```
 *
 * That specific environment will have the following configuration:
 *
 * ```yaml
 * 	resinUrl: 'resinstaging.io'
 * 	projectsDirectory: '/Users/resin/Projects'
 * 	dataDirectory: '/opt/cache/resin'
 * ```
 *
 * @module settings
 */

import * as fs from 'fs';
import * as _ from 'lodash';

import config = require('./config');
import defaults = require('./defaults');
import * as environment from './environment';
import * as utils from './utils';
import * as yaml from './yaml';

const readConfigFile = (file: string): object => {
	let fileContents = null;

	try {
		// We read the config files synchronously since
		// other modules rely on Resin Settings Client
		// to be ready for usage as soon as possible.
		fileContents = fs.readFileSync(file, { encoding: 'utf8' });
	} catch (error) {
		if (error.code === 'ENOENT') {
			return {};
		}
		throw error;
	}

	try {
		return yaml.parse(fileContents);
	} catch (error) {
		throw new Error(`Error parsing config file ${file}: ${error.message}`);
	}
};

const getSettings = _.once((): { [k: string]: string } =>
	utils.mergeObjects(
		{},
		defaults,
		readConfigFile(config.paths.user),
		readConfigFile(config.paths.project),
		environment.parse(process.env)
	)
);

/**
 * @summary Get a setting
 * @function
 * @public
 *
 * @param {String} name - setting name
 * @return {*} setting value
 *
 * @example
 * settings.get('dataDirectory')
 */
export const get = <T>(name: string): T => {
	const settings = getSettings();
	return utils.evaluateSetting<T>(settings, name);
};

/**
 * @summary Get all settings
 * @function
 * @public
 *
 * @return {Object} all settings
 *
 * @example
 * settings.getAll()
 */
export const getAll = () => {
	const settings = getSettings();
	return _.mapValues(settings, (_setting, name) => get(name));
};
