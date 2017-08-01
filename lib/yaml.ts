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

import * as jsYaml from 'js-yaml';
import * as _ from 'lodash';

/**
 * @summary Parse a YAML string
 * @function
 * @protected
 *
 * @param {String} string - input string
 * @returns {Object} parsed yaml
 *
 * @throws Will throw if input is not valid YAML.
 *
 * @example
 * object = yaml.parse('foo: bar')
 * console.log(object.foo)
 * > bar
 */
export const parse = (yaml: string): object => {
	const result = jsYaml.safeLoad(yaml);
	if (_.isString(result)) {
		throw new Error(`Invalid YAML: ${yaml}`);
	}
	return result;
};
