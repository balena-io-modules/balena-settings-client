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

import * as hidepath from 'hidepath';
import * as userHome from 'home-or-tmp';
import { join as joinPath } from 'path';

/**
 * @summary Configuration settings
 * @namespace config
 * @private
 */
export = {
	/**
	 * @summary Configuration paths
	 * @namespace paths
	 * @memberof config
	 */
	paths: {
		/**
		 * @property {String} user - path to user config
		 * @memberof paths
		 */
		user: joinPath(userHome, hidepath('balenarc.yml')),

		/**
		 * @property {String} user - path to legacy user config
		 * @memberof paths
		 */
		userLegacy: joinPath(userHome, hidepath('resinrc.yml')),

		/**
		 * @property {String} project - path to project config
		 * @memberof paths
		 */
		project: joinPath(process.cwd(), 'balenarc.yml'),

		/**
		 * @property {String} project - path to legacy project config
		 * @memberof paths
		 */
		projectLegacy: joinPath(process.cwd(), 'resinrc.yml')
	}
};
